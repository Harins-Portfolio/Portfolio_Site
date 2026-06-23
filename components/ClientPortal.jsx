import { useEffect, useState, useCallback } from 'react';
import { db, PROJ_STATUS, STATUS_FLOW } from '../lib/database';

const STORAGE_BUCKET = 'deliverables';

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

const ClientPortal = ({ projectId, onLogout }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);
  const [error, setError] = useState(null);

  const loadProject = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const p = await db.getProject(projectId);
      setProject(p);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => { loadProject(); }, [loadProject]);

  const pollForUpdates = useCallback(() => {
    const interval = setInterval(async () => {
      if (!projectId) return;
      try {
        const p = await db.getProject(projectId);
        setProject(p);
      } catch { /* ignore polling errors */ }
    }, 15000);
    return () => clearInterval(interval);
  }, [projectId]);

  useEffect(() => {
    const cleanup = pollForUpdates();
    return cleanup;
  }, [pollForUpdates]);

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

  if (loading || !project) {
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

  const statusInfo = statusColor(project.status);
  const deliverables = project.deliverables || [];
  const hasDeliverables = deliverables.length > 0;
  const isPaid = project.status === PROJ_STATUS.PAID || project.status === PROJ_STATUS.DELIVERED;
  const isAwaitingPayment = project.status === PROJ_STATUS.AWAITING_PAYMENT;

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
              <div className="text-xs text-gray-400">Project: {project.id?.slice(0, 8)}...</div>
            </div>
          </div>
          <button onClick={onLogout} className="btn-ghost text-sm">
            <i className="ri-arrow-left-line" />
            Back to Home
          </button>
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
                    Submitted {formatDate(project.created_at)}
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
                    const currentIdx = statusOrder.indexOf(project.status);
                    const stepIdx = statusOrder.indexOf(step.key);
                    const isComplete = stepIdx <= currentIdx;
                    const isCurrent = step.key === project.status;

                    if (step.key === PROJ_STATUS.REJECTED && project.status !== PROJ_STATUS.REJECTED) return null;

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
                            {isCurrent && project.status === PROJ_STATUS.SUBMITTED && 'We\'re reviewing your project...'}
                            {isCurrent && project.status === PROJ_STATUS.UNDER_REVIEW && 'Currently being evaluated'}
                            {isCurrent && project.status === PROJ_STATUS.ACCEPTED && 'Project accepted — work will begin soon'}
                            {isCurrent && project.status === PROJ_STATUS.IN_PROGRESS && 'Work is underway'}
                            {isCurrent && project.status === PROJ_STATUS.COMPLETED && 'Work is complete, awaiting payment'}
                            {isCurrent && project.status === PROJ_STATUS.AWAITING_PAYMENT && 'Payment required to unlock deliverables'}
                            {isCurrent && project.status === PROJ_STATUS.PAID && 'Payment received — deliverables available'}
                            {isCurrent && project.status === PROJ_STATUS.DELIVERED && 'All deliverables have been provided'}
                            {isComplete && !isCurrent && 'Completed'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Project Brief</h2>
              {project.ai_spec ? (
                <div className="space-y-4">
                  {Object.entries(project.ai_spec).map(([key, value]) => (
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

            {project.messages && project.messages.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Messages</h2>
                <div className="space-y-3">
                  {project.messages.map((msg, idx) => (
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
                  <div className="text-sm font-medium text-gray-900 capitalize">{project.project_type || '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Budget</div>
                  <div className="text-sm font-medium text-gray-900">€{project.budget || '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Timeline</div>
                  <div className="text-sm font-medium text-gray-900">{project.timeline || '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Urgency</div>
                  <div className="text-sm font-medium text-gray-900 capitalize">{project.urgency || '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Contact</div>
                  <div className="text-sm font-medium text-gray-900">{project.client_name}</div>
                  <div className="text-xs text-gray-400">{project.client_email}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
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

            {project.invoice_url && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Invoice</h2>
                <a
                  href={project.invoice_url}
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
    </div>
  );
};

export default ClientPortal;
