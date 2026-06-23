import React, { useState, useRef } from 'react';
import ClientPortal from '../components/ClientPortal';

const ACCEPTED_FILES = '.csv,.xlsx,.pdf,.zip,.pbix';

const aiQuestions = [
  { key: 'problem', label: 'What problem are you trying to solve?', placeholder: 'e.g., Customer churn is increasing and we need to understand why...' },
  { key: 'data', label: 'What data do you currently have?', placeholder: 'e.g., Monthly subscription logs, support ticket history, customer profiles...' },
  { key: 'outcome', label: 'What outcome do you want?', placeholder: 'e.g., Reduce churn by 15% in the next quarter...' },
  { key: 'users', label: 'Who will use the results?', placeholder: 'e.g., Operations team, C-suite, sales managers...' },
  { key: 'format', label: 'What format should the deliverable be in?', placeholder: 'e.g., Interactive dashboard, PDF report, Excel model...' },
  { key: 'deadline', label: 'What deadline do you have?', placeholder: 'e.g., 2 weeks, end of month...' },
];

const generateSpec = (answers) => {
  return `Problem: ${answers.problem || 'Not specified'}
Data: ${answers.data || 'Not specified'}
Expected output: ${answers.format || 'Not specified'}
Success criteria: ${answers.outcome || 'Not specified'}
End users: ${answers.users || 'Not specified'}
Deadline: ${answers.deadline || 'Not specified'}
Estimated effort: ${answers.format?.toLowerCase().includes('dashboard') ? '3–5 days' : answers.data?.length > 50 ? '1–2 weeks' : '2–3 days'}`;
};

const StepFlow = () => {
  const [step, setStep] = useState(0);
  const [aiActive, setAiActive] = useState(false);
  const [aiQ, setAiQ] = useState(0);
  const [aiAnswers, setAiAnswers] = useState({});
  const [aiSpec, setAiSpec] = useState('');
  const [description, setDescription] = useState('');
  const [dataType, setDataType] = useState('');
  const [file, setFile] = useState(null);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const fileRef = useRef(null);

  const formatBudget = (v) => {
    const n = v.replace(/[^0-9]/g, '');
    return n ? `€${n}` : '';
  };

  const handleAiAnswer = (v) => {
    setAiAnswers(p => ({ ...p, [aiQuestions[aiQ].key]: v }));
  };

  const handleAiNext = () => {
    if (aiQ < aiQuestions.length - 1) {
      setAiQ(q => q + 1);
    } else {
      setAiSpec(generateSpec(aiAnswers));
    }
  };

  const handleAiBack = () => {
    if (aiQ > 0) setAiQ(q => q - 1);
  };

  const handleAiReset = () => {
    setAiQ(0);
    setAiAnswers({});
    setAiSpec('');
  };

  const handleSubmit = () => {
    setProjectId(`PROJ-${Date.now()}`);
    setSubmitted(true);
  };

  const totalSteps = 6;

  if (submitted) {
    return <ClientPortal projectId={projectId} />;
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="min-h-screen bg-[#0F172A] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Business problem solving through data</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
                What do you need built?
              </h1>
              <p className="text-lg text-gray-400 mb-10">
                Describe the problem, upload your data, get a professional solution in days.
              </p>
              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto bg-white text-[#0F172A] font-bold px-10 py-4 rounded-xl text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:scale-[1.02] inline-flex items-center justify-center gap-2"
              >
                Start Project <i className="ri-arrow-right-line" />
              </button>
              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
                <span>Starting at €100</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>48h avg. delivery</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>Stripe secure</span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Step 1 of {totalSteps}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8">
                What problem are you trying to solve?
              </h2>
              <p className="text-sm text-gray-400 mb-4">One clear description is enough.</p>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="e.g., Our e-commerce business has 50,000 monthly orders but we can't predict which customers will churn. We need a risk scoring model."
                rows={5}
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-[#0F172A] focus:outline-none transition-colors resize-none"
                autoFocus
              />
              <div className="flex items-center justify-end mt-6">
                <button
                  onClick={() => setStep(2)}
                  disabled={description.trim().length < 10}
                  className={`font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 ${description.trim().length >= 10 ? 'bg-[#0F172A] text-white hover:bg-[#1E293B]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  Continue <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Step 2 of {totalSteps}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8">
                What data do you have?
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {['CSV', 'Excel', 'SQL', 'Not sure'].map(t => (
                  <button
                    key={t}
                    onClick={() => setDataType(t === dataType ? '' : t)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${dataType === t ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer hover:border-[#0F172A] hover:bg-gray-50 transition-all group"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0F172A] group-hover:text-white transition-all">
                  <i className="ri-upload-cloud-2-line text-2xl text-gray-400 group-hover:text-white" />
                </div>
                <p className="font-bold text-[#0F172A] mb-1">{file ? file.name : 'Click to upload'}</p>
                <p className="text-sm text-gray-400">CSV, XLSX, PDF, ZIP, PBIX</p>
              </div>
              <input ref={fileRef} type="file" accept={ACCEPTED_FILES} onChange={e => { const f = e.target.files[0]; if (f) setFile(f); }} className="hidden" />
              {file && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <i className="ri-file-text-line text-emerald-600" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                  </div>
                  <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500"><i className="ri-close-line" /></button>
                </div>
              )}
              <div className="flex items-center justify-end mt-6">
                <button
                  onClick={() => setStep(3)}
                  className="bg-[#0F172A] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1E293B] transition-all flex items-center gap-2"
                >
                  Continue <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Step 3 of {totalSteps}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4">
                Describe your project scope
              </h2>
              <p className="text-gray-400 mb-6">Be specific about what you need delivered.</p>

              {!aiActive && !aiSpec && (
                <button
                  onClick={() => setAiActive(true)}
                  className="w-full border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all group mb-6"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <i className="ri-sparkling-2-line text-white text-2xl" />
                  </div>
                  <p className="font-bold text-[#0F172A] text-lg mb-1">Not sure how to structure this?</p>
                  <p className="text-sm text-gray-500">Let the AI assistant help you define your project</p>
                  <span className="inline-block mt-3 text-blue-600 font-bold text-sm group-hover:underline">✨ Help me structure this</span>
                </button>
              )}

              {aiActive && !aiSpec && (
                <div className="border-2 border-gray-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-400">Question {aiQ + 1} of {aiQuestions.length}</span>
                    <button onClick={() => { setAiActive(false); handleAiReset(); }} className="text-sm text-gray-400 hover:text-gray-600">Cancel</button>
                  </div>
                  <div className="flex gap-1 mb-6">
                    {aiQuestions.map((_, i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= aiQ ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <label className="block text-lg font-bold text-[#0F172A] mb-3">{aiQuestions[aiQ].label}</label>
                  <textarea
                    value={aiAnswers[aiQuestions[aiQ].key] || ''}
                    onChange={e => handleAiAnswer(e.target.value)}
                    placeholder={aiQuestions[aiQ].placeholder}
                    rows={3}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    autoFocus
                  />
                  <div className="flex items-center justify-between mt-4">
                    <button onClick={handleAiBack} disabled={aiQ === 0}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${aiQ === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
                      <i className="ri-arrow-left-line mr-1" /> Back
                    </button>
                    <button onClick={handleAiNext}
                      className="bg-[#0F172A] text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-[#1E293B] transition-colors">
                      {aiQ < aiQuestions.length - 1 ? 'Next' : 'Generate specification'}
                    </button>
                  </div>
                </div>
              )}

              {aiSpec && (
                <div className="border-2 border-blue-200 bg-blue-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="ri-file-text-line text-blue-600" />
                    <span className="font-bold text-[#0F172A]">Suggested project structure</span>
                  </div>
                  <pre className="text-sm text-gray-700 whitespace-pre-line font-sans bg-white rounded-xl p-4 border border-blue-100 mb-4">{aiSpec}</pre>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button onClick={() => { setDescription(prev => prev + '\n\n' + aiSpec); setAiSpec(''); setAiActive(false); handleAiReset(); }}
                      className="flex-1 bg-[#0F172A] text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-[#1E293B] transition-colors">
                      Use this version
                    </button>
                    <button onClick={() => { setAiActive(true); handleAiReset(); }}
                      className="flex-1 bg-white text-gray-700 font-medium px-4 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                      Edit manually
                    </button>
                  </div>
                </div>
              )}

              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the full scope. What data, what analysis, what output format..."
                rows={4}
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-base focus:border-[#0F172A] focus:outline-none transition-colors resize-none"
              />

              <div className="flex items-center justify-end mt-6">
                <button
                  onClick={() => setStep(4)}
                  disabled={description.trim().length < 10}
                  className={`font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 ${description.trim().length >= 10 ? 'bg-[#0F172A] text-white hover:bg-[#1E293B]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  Continue <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Step 4 of {totalSteps}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8">
                Budget & Timeline
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-bold text-[#0F172A] mb-2">What budget fits this project?</label>
                <input
                  type="text"
                  value={budget}
                  onChange={e => setBudget(formatBudget(e.target.value))}
                  placeholder="€300"
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-2xl font-bold focus:border-[#0F172A] focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Projects typically start at <strong>€100</strong>. Larger scope = higher price.
                  Final pricing depends on scope. I may reject underpriced projects.
                </p>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-[#0F172A] mb-3">Timeline</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: '48 hours', value: '48h' },
                    { label: '3–5 days', value: '3-5d' },
                    { label: '1–2 weeks', value: '1-2w' },
                  ].map(t => (
                    <button
                      key={t.value}
                      onClick={() => setTimeline(t.value === timeline ? '' : t.value)}
                      className={`py-4 rounded-xl text-sm font-bold border-2 transition-all ${timeline === t.value ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={() => setStep(5)}
                  disabled={!budget || !timeline}
                  className={`font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 ${budget && timeline ? 'bg-[#0F172A] text-white hover:bg-[#1E293B]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  Continue <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Final step</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8">
                Review your request
              </h2>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Problem</p>
                    <p className="text-sm text-gray-700 mt-1">{description.slice(0, 120)}{description.length > 120 ? '...' : ''}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-blue-600 text-sm font-medium hover:underline shrink-0">Edit</button>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Data</p>
                    <p className="text-sm text-gray-700 mt-1">{dataType || 'Not specified'}{file ? ` · ${file.name}` : ''}</p>
                  </div>
                  <button onClick={() => setStep(2)} className="text-blue-600 text-sm font-medium hover:underline shrink-0">Edit</button>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Budget & Timeline</p>
                    <p className="text-sm text-gray-700 mt-1">{budget} · {timeline}</p>
                  </div>
                  <button onClick={() => setStep(4)} className="text-blue-600 text-sm font-medium hover:underline shrink-0">Edit</button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Your contact</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" placeholder="Company name" value={company} onChange={e => setCompany(e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#0F172A] focus:outline-none" />
                  <input type="text" placeholder="Your name *" value={name} onChange={e => setName(e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#0F172A] focus:outline-none" required />
                  <input type="email" placeholder="Email *" value={email} onChange={e => setEmail(e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#0F172A] focus:outline-none" required />
                  <input type="url" placeholder="LinkedIn (optional)" value={company} onChange={e => setCompany(e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#0F172A] focus:outline-none" />
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
                <i className="ri-calendar-line text-purple-600 mt-0.5" />
                <div className="text-sm text-purple-800">
                  <p className="font-bold">Optional: Book a discovery call</p>
                  <p className="text-purple-700">A quick 15-min call helps align on scope. <a href="https://calendly.com/your-username" target="_blank" rel="noopener noreferrer" className="underline font-medium">Schedule here</a> or skip.</p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !email.trim()}
                className={`w-full font-bold py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2 ${name.trim() && email.trim() ? 'bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-lg hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Submit Project <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="step-flow">
      {/* Back button appears after step 0 */}
      {step > 0 && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setStep(s => s - 1)}
            className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#0F172A] hover:bg-white transition-all flex items-center gap-2"
          >
            <i className="ri-arrow-left-line" /> Back
          </button>
        </div>
      )}
      {renderStep()}
    </section>
  );
};

export default StepFlow;
