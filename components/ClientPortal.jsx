import { useEffect, useState, useCallback } from 'react';
import { db, PROJ_STATUS, STATUS_FLOW } from '../lib/database';
import { getStripe, formatPrice } from '../lib/stripe';

const STORAGE_BUCKET = 'deliverables';

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
};

const statusColor = (status) => {
  const found = STATUS_FLOW.find(s => s.key === status);
  return found || { label: status, icon: 'ri-question-line', color: 'text-gray-500 bg-gray-50 border-gray-200' };
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
};

const LoginScreen = ({ onLogin, onLogout, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logging, setLogging] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLogging(true);
    await onLogin(email.trim(), password);
    setLogging(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 animate-fadeInUp">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
              NH
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to track your project status
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Portal Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password set during submission"
                className="input-field"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                <i className="ri-error-warning-line mr-1.5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={logging || !email.trim() || !password.trim()}
              className="btn-primary w-full"
            >
              {logging ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <i className="ri-lock-line" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={onLogout} className="btn-ghost text-sm">
              <i className="ri-arrow-left-line" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientPortal = ({ projectId, portalEmail, onAuthenticated, onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [email, setEmail] = useState(portalEmail || '');
  const [loginError, setLoginError] = useState(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [bankTransferCopied, setBankTransferCopied] = useState(false);
  const [cryptoCopied, setCryptoCopied] = useState(false);

  const loadProject = useCallback(async (id) => {
    if (!id) return;
    try {
      setLoading(true);
      const p = await db.getProject(id);
      setSelectedProject(p);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId, loadProject]);

  const pollForUpdates = useCallback(() => {
    const interval = setInterval(async () => {
      if (!selectedProject?.id) return;
      try {
        const p = await db.getProject(selectedProject.id);
        setSelectedProject(p);
      } catch { }
    }, 15000);
    return () => clearInterval(interval);
  }, [selectedProject?.id]);

  useEffect(() => {
    const cleanup = pollForUpdates();
    return cleanup;
  }, [pollForUpdates]);

  const handleLogin = async (loginEmail, password) => {
    setLoginError(null);
    try {
      const pwdHash = await hashPassword(password);
      const results = await db.getProjectsByEmailAndPassword(loginEmail, pwdHash);
      if (results.length === 0) {
        setLoginError('No projects found with that email and password combination.');
        return;
      }
      setEmail(loginEmail);
      setProjects(results);
      if (onAuthenticated) {
        onAuthenticated(loginEmail);
      }
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please try again.');
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  const handleDownload = async (deliverable, index) => {
    setDownloading(index);
    try {
      const url = await db.getFileUrl(STORAGE_BUCKET, deliverable.path);
      const link = document.createElement('a');
      link.href = url;
      link.download = deliverable.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Failed to download file.');
    } finally {
      setDownloading(null);
    }
  };

  const handleStripePayment = async () => {
    try {
      const stripe = await getStripe();
      if (!stripe) {
        alert('Card payment is not configured yet. Please use bank transfer or crypto.');
        return;
      }
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: selectedProject.id,
          amount: selectedProject.budget,
          clientEmail: selectedProject.client_email,
          clientName: selectedProject.client_name,
        }),
      });
      if (!response.ok) throw new Error('Payment session creation failed');
      const session = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) throw error;
    } catch (err) {
      alert('Payment failed: ' + err.message);
    }
  };

  const handleBankTransfer = () => {
    const details = `Account Holder: Nikhil Harins\nIBAN: NL00BANK0123456789\nBIC/SWIFT: BANKNL2A\nReference: ${selectedProject?.id || ''}`;
    navigator.clipboard.writeText(details);
    setBankTransferCopied(true);
    setTimeout(() => setBankTransferCopied(false), 3000);
  };

  const handleCryptoPayment = () => {
    const addresses = `Bitcoin (BTC): bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh\nEthereum (ETH) / USDT (ERC-20): 0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18\nAmount: €${selectedProject?.budget || ''}`;
    navigator.clipboard.writeText(addresses);
    setCryptoCopied(true);
    setTimeout(() => setCryptoCopied(false), 3000);
  };

  const PaymentModal = () => {
    if (!showPaymentModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)}>
        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-fadeInUp" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Choose Payment Method</h2>
            <button onClick={() => setShowPaymentModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100">
              <i className="ri-close-line" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Total: <span className="font-bold text-gray-900 text-lg">&euro;{selectedProject?.budget}</span>
          </p>

          <div className="space-y-3">
            <button
              onClick={() => { setPaymentMethod('card'); handleStripePayment(); }}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === 'card' ? 'border-brand-500 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <i className="ri-bank-card-line text-xl text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Pay with Card</div>
                  <div className="text-sm text-gray-500">Credit / Debit card via Stripe</div>
                </div>
                <i className="ri-arrow-right-s-line text-gray-300 ml-auto text-xl" />
              </div>
            </button>

            <div className={`w-full p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === 'bank' ? 'border-brand-500 bg-brand-50' : 'border-gray-100'}`}>
              <button
                onClick={() => setPaymentMethod('bank')}
                className="w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                    <i className="ri-bank-line text-xl text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Bank Transfer</div>
                    <div className="text-sm text-gray-500">Pay directly from your bank account</div>
                  </div>
                  <i className={`ml-auto text-xl ${paymentMethod === 'bank' ? 'ri-radio-button-line text-brand-500' : 'ri-circle-line text-gray-300'}`} />
                </div>
              </button>
              {paymentMethod === 'bank' && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-gray-400 mb-1">Account Holder</div>
                    <div className="text-sm font-medium text-gray-900">Nikhil Harins</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-gray-400 mb-1">IBAN</div>
                    <div className="text-sm font-medium text-gray-900 font-mono">NL00BANK0123456789</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-gray-400 mb-1">BIC / SWIFT</div>
                    <div className="text-sm font-medium text-gray-900 font-mono">BANKNL2A</div>
                  </div>
                  <button
                    onClick={handleBankTransfer}
                    className="btn-primary w-full text-sm mt-2"
                  >
                    {bankTransferCopied ? (
                      <><i className="ri-check-line" /> Copied</>
                    ) : (
                      <><i className="ri-file-copy-line" /> Copy Account Details</>
                    )}
                  </button>
                  <p className="text-xs text-gray-400 mt-2">
                    Use your project ID (<span className="font-mono font-medium">{selectedProject?.id?.slice(0, 8)}...</span>) as the transfer reference. Payment will be confirmed manually within 1-2 business days.
                  </p>
                </div>
              )}
            </div>

            <div className={`w-full p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === 'crypto' ? 'border-brand-500 bg-brand-50' : 'border-gray-100'}`}>
              <button
                onClick={() => setPaymentMethod('crypto')}
                className="w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                    <i className="ri-currency-line text-xl text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Cryptocurrency</div>
                    <div className="text-sm text-gray-500">Pay with BTC, ETH, or USDT</div>
                  </div>
                  <i className={`ml-auto text-xl ${paymentMethod === 'crypto' ? 'ri-radio-button-line text-brand-500' : 'ri-circle-line text-gray-300'}`} />
                </div>
              </button>
              {paymentMethod === 'crypto' && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-gray-400 mb-1">Bitcoin (BTC)</div>
                    <div className="text-xs font-mono text-gray-900 break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-gray-400 mb-1">Ethereum (ETH) / USDT (ERC-20)</div>
                    <div className="text-xs font-mono text-gray-900 break-all">0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18</div>
                  </div>
                  <button
                    onClick={handleCryptoPayment}
                    className="btn-primary w-full text-sm"
                  >
                    {cryptoCopied ? (
                      <><i className="ri-check-line" /> Copied</>
                    ) : (
                      <><i className="ri-file-copy-line" /> Copy Wallet Addresses</>
                    )}
                  </button>
                  <p className="text-xs text-gray-400 mt-2">
                    Send the equivalent of <strong>&euro;{selectedProject?.budget}</strong> in your chosen cryptocurrency. Use your project ID as reference. Confirmed after 1 network confirmation.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              <i className="ri-shield-check-line mr-1" />
              Your payment information is processed securely. Bank transfers and crypto payments are confirmed manually.
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
            <i className="ri-error-warning-line text-2xl text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Project</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button onClick={onLogout} className="btn-primary">Back to Home</button>
        </div>
      </div>
    );
  }

  if (!projectId && !email && !onAuthenticated) {
    return <LoginScreen onLogin={handleLogin} onLogout={onLogout} error={loginError} />;
  }

  if (email && !selectedProject && projects.length === 0 && !loading) {
    return <LoginScreen onLogin={handleLogin} onLogout={onLogout} error={loginError} />;
  }

  if (email && !selectedProject && projects.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xs">
                NH
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Client Portal</div>
                <div className="text-xs text-gray-400">{email}</div>
              </div>
            </div>
            <button onClick={onLogout} className="btn-ghost text-sm">
              <i className="ri-logout-circle-line" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Projects</h1>
          <p className="text-gray-500 text-sm mb-8">{projects.length} project(s) found</p>

          <div className="space-y-4">
            {projects.map((project) => {
              const info = statusColor(project.status);
              return (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left hover:shadow-md hover:border-brand-100 transition-all card-hover"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${info.color}`}>
                      <i className={`${info.icon} text-xl`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900">
                        {project.project_type || 'General Project'}
                      </div>
                      <div className="text-sm text-gray-400">
                        Submitted {formatDate(project.created_at)} &bull; &euro;{project.budget || '—'}
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${info.color}`}>
                      {info.label}
                    </span>
                    <i className="ri-arrow-right-s-line text-gray-300 text-xl" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if ((loading || !selectedProject) && !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <i className="ri-loader-4-line text-xl text-brand-500 animate-spin" />
          </div>
          <p className="text-gray-500">Loading your project...</p>
        </div>
      </div>
    );
  }

  const statusInfo = statusColor(selectedProject.status);
  const deliverables = selectedProject.deliverables || [];
  const hasDeliverables = deliverables.length > 0;
  const isPaid = selectedProject.status === PROJ_STATUS.PAID || selectedProject.status === PROJ_STATUS.DELIVERED;
  const isAwaitingPayment = selectedProject.status === PROJ_STATUS.AWAITING_PAYMENT;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xs">
              NH
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Client Portal</div>
              <div className="text-xs text-gray-400">Project: {selectedProject.id?.slice(0, 8)}...</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {email && !projectId && (
              <button onClick={handleBackToProjects} className="btn-ghost text-sm">
                <i className="ri-list-check" />
                All Projects
              </button>
            )}
            <button onClick={onLogout} className="btn-ghost text-sm">
              <i className="ri-arrow-left-line" />
              {email ? 'Sign Out' : 'Back to Home'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeInUp">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Project Status</h1>
                  <p className="text-gray-500 text-sm">
                    Submitted {formatDate(selectedProject.created_at)}
                  </p>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${statusInfo.color}`}>
                  <i className={`${statusInfo.icon} text-lg`} />
                  <span className="text-sm font-semibold">{statusInfo.label}</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-100" />
                <div className="space-y-6 relative">
                  {STATUS_FLOW.filter(s => s.key !== PROJ_STATUS.REJECTED).map((step, idx) => {
                    const statusOrder = STATUS_FLOW.filter(s => s.key !== PROJ_STATUS.REJECTED).map(s => s.key);
                    const currentIdx = statusOrder.indexOf(selectedProject.status);
                    const stepIdx = statusOrder.indexOf(step.key);
                    const isComplete = stepIdx <= currentIdx;
                    const isCurrent = step.key === selectedProject.status;

                    if (step.key === PROJ_STATUS.REJECTED && selectedProject.status !== PROJ_STATUS.REJECTED) return null;

                    return (
                      <div key={step.key} className="flex items-start gap-4 pl-0">
                        <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isCurrent ? 'gradient-bg text-white shadow-md' :
                          isComplete ? 'bg-accent-500 text-white' :
                          'bg-gray-100 text-gray-300'
                        }`}>
                          {isComplete ? <i className="ri-check-line text-xs" /> : idx + 1}
                        </div>
                        <div className={`pt-0.5 ${isComplete ? '' : 'opacity-40'}`}>
                          <div className={`text-sm font-semibold ${isCurrent ? 'text-brand-700' : isComplete ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.label}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {isCurrent && selectedProject.status === PROJ_STATUS.SUBMITTED && "We're reviewing your project..."}
                            {isCurrent && selectedProject.status === PROJ_STATUS.UNDER_REVIEW && 'Currently being evaluated'}
                            {isCurrent && selectedProject.status === PROJ_STATUS.ACCEPTED && 'Project accepted — work will begin soon'}
                            {isCurrent && selectedProject.status === PROJ_STATUS.IN_PROGRESS && 'Work is underway'}
                            {isCurrent && selectedProject.status === PROJ_STATUS.COMPLETED && 'Work is complete, awaiting payment'}
                            {isCurrent && selectedProject.status === PROJ_STATUS.AWAITING_PAYMENT && 'Payment required to unlock deliverables'}
                            {isCurrent && selectedProject.status === PROJ_STATUS.PAID && 'Payment received — deliverables available'}
                            {isCurrent && selectedProject.status === PROJ_STATUS.DELIVERED && 'All deliverables have been provided'}
                            {isComplete && !isCurrent && 'Completed'}
                            {selectedProject.status === PROJ_STATUS.REJECTED && step.key === PROJ_STATUS.REJECTED && 'Project was not accepted'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {selectedProject.status === PROJ_STATUS.REJECTED && (
                    <div className="flex items-start gap-4 pl-0">
                      <div className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-red-500 text-white shadow-md">
                        <i className="ri-close-line text-xs" />
                      </div>
                      <div className="pt-0.5">
                        <div className="text-sm font-semibold text-red-700">Rejected</div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Unfortunately, this project was not accepted. Check messages for details.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Project Brief</h2>
              {selectedProject.ai_spec ? (
                <div className="space-y-4">
                  {Object.entries(selectedProject.ai_spec).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-0.5">
                        {key.replace(/_/g, ' ')}
                      </div>
                      <p className="text-sm text-gray-700">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No AI brief generated.</p>
              )}
            </div>

            {selectedProject.messages && selectedProject.messages.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Messages</h2>
                <div className="space-y-3">
                  {selectedProject.messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.from === 'admin' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
                        msg.from === 'admin'
                          ? 'bg-gray-50 border border-gray-100 text-gray-900'
                          : 'bg-brand-500 text-white'
                      }`}>
                        <div className="text-xs font-medium opacity-70 mb-0.5">
                          {msg.from === 'admin' ? 'Nikhil Harins' : 'You'} — {formatDate(msg.date)}
                        </div>
                        <div className="text-sm">{msg.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Project Details</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Type</div>
                  <div className="text-sm font-medium text-gray-900 capitalize">{selectedProject.project_type || '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Budget</div>
                  <div className="text-sm font-medium text-gray-900">&euro;{selectedProject.budget || '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Timeline</div>
                  <div className="text-sm font-medium text-gray-900">{selectedProject.timeline || '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Urgency</div>
                  <div className="text-sm font-medium text-gray-900 capitalize">{selectedProject.urgency || '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Contact</div>
                  <div className="text-sm font-medium text-gray-900">{selectedProject.client_name}</div>
                  <div className="text-xs text-gray-400">{selectedProject.client_email}</div>
                </div>
              </div>
            </div>

            {isAwaitingPayment && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Required</h2>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 mb-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-information-line text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">
                        &euro;{selectedProject.budget} due to unlock deliverables
                      </p>
                      <p className="text-xs text-orange-600 mt-0.5">
                        Choose your preferred payment method below.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="btn-primary w-full"
                >
                  <i className="ri-secure-payment-line" />
                  Pay Now &euro;{selectedProject.budget}
                </button>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className={`p-6 ${!isPaid && hasDeliverables ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Deliverables</h2>
                  {isAwaitingPayment && (
                    <span className="badge text-xs bg-orange-100 text-orange-700 border border-orange-200">
                      <i className="ri-lock-line mr-1" />Locked
                    </span>
                  )}
                  {isPaid && (
                    <span className="badge text-xs bg-accent-100 text-accent-700 border border-accent-200">
                      <i className="ri-lock-unlock-line mr-1" />Unlocked
                    </span>
                  )}
                </div>

                {!hasDeliverables && (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                      <i className="ri-box-3-line text-xl text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400">No deliverables yet</p>
                    <p className="text-xs text-gray-300 mt-1">Deliverables will appear here once the project is completed</p>
                  </div>
                )}

                {hasDeliverables && (
                  <div className="space-y-2">
                    {deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                          <i className="ri-file-text-line text-brand-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{del.name}</p>
                          <p className="text-xs text-gray-400">{del.size || ''} {formatDate(del.date)}</p>
                        </div>
                        {isPaid ? (
                          <button
                            onClick={() => handleDownload(del, idx)}
                            disabled={downloading === idx}
                            className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-brand-600 hover:border-brand-200 transition-colors"
                          >
                            {downloading === idx ? (
                              <span className="w-4 h-4 border-2 border-brand-300 border-t-brand-600 rounded-full animate-spin" />
                            ) : (
                              <i className="ri-download-line" />
                            )}
                          </button>
                        ) : (
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 text-gray-300">
                            <i className="ri-lock-line" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {isAwaitingPayment && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="flex items-start gap-3">
                      <i className="ri-information-line text-orange-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-orange-800">Deliverables Locked</p>
                        <p className="text-xs text-orange-600 mt-0.5">
                          Once payment is confirmed, all files will be available for download.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {isPaid && (
                  <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-100">
                    <div className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-line text-accent-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-accent-800">Deliverables Unlocked</p>
                        <p className="text-xs text-accent-600 mt-0.5">
                          All files are available for download. Thank you for your business!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedProject.invoice_url && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Invoice</h2>
                <a
                  href={selectedProject.invoice_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-sm"
                >
                  <i className="ri-file-text-line" />
                  View Invoice
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <PaymentModal />
    </div>
  );
};

export default ClientPortal;