import React, { useState, useRef, useEffect } from 'react';
import { db } from '../lib/database';

const ACCEPTED_FILES = '.csv,.xlsx,.pdf,.zip,.pbix';

const aiQuestions = [
  { key: 'problem', label: 'What business problem are you solving?', placeholder: 'e.g., Customer churn is increasing and we don\'t know why...' },
  { key: 'data', label: 'What data sources do you have?', placeholder: 'e.g., Monthly subscription logs, support tickets, CRM exports...' },
  { key: 'outcome', label: 'What outcome do you want?', placeholder: 'e.g., Reduce churn by 15% in the next quarter...' },
  { key: 'users', label: 'Who will use the results?', placeholder: 'e.g., Operations team, C-suite, sales managers...' },
  { key: 'format', label: 'What deliverable format do you need?', placeholder: 'e.g., Interactive dashboard, PDF report, Excel model...' },
  { key: 'deadline', label: 'What deadline do you have?', placeholder: 'e.g., 2 weeks, end of month...' },
];

const generateSpec = (answers) => {
  return {
    business_goal: answers.problem || '',
    data_sources: answers.data || '',
    required_outputs: answers.format || '',
    success_metrics: answers.outcome || '',
    users: answers.users || '',
    deadline: answers.deadline || '',
    recommended_scope: `Data collection & cleaning → ${answers.data ? 'Exploratory analysis of ' + answers.data : 'Analysis'} → ${answers.format ? answers.format.toLowerCase().includes('dashboard') ? 'Dashboard development' : 'Deliverable production' : 'Solution development'} → Review & hand-off with ${answers.users || 'your team'}. Estimated effort: ${answers.format?.toLowerCase().includes('dashboard') ? '3–5 days' : '1–2 weeks'}.`,
  };
};

const OnboardingFlow = ({ onPortalOpen }) => {
  const [step, setStep] = useState(0);
  const [projectId, setProjectId] = useState(null);

  // Step 2 - Problem
  const [problem, setProblem] = useState(localStorage.getItem('ob_problem') || '');

  // Step 3 - Data
  const [dataTypes, setDataTypes] = useState(JSON.parse(localStorage.getItem('ob_dataTypes') || '[]'));
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  // Step 4 - AI Scoping
  const [aiActive, setAiActive] = useState(false);
  const [aiQ, setAiQ] = useState(0);
  const [aiAnswers, setAiAnswers] = useState(JSON.parse(localStorage.getItem('ob_aiAnswers') || '{}'));
  const [aiSpec, setAiSpec] = useState(null);
  const [aiSpecAccepted, setAiSpecAccepted] = useState(false);

  // Step 5 - Budget & Timeline
  const [budget, setBudget] = useState(localStorage.getItem('ob_budget') || '');
  const [timeline, setTimeline] = useState(localStorage.getItem('ob_timeline') || '');

  // Step 6 - Contact
  const [company, setCompany] = useState(localStorage.getItem('ob_company') || '');
  const [name, setName] = useState(localStorage.getItem('ob_name') || '');
  const [email, setEmail] = useState(localStorage.getItem('ob_email') || '');
  const [linkedin, setLinkedin] = useState(localStorage.getItem('ob_linkedin') || '');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Persist each step to localStorage
  useEffect(() => { localStorage.setItem('ob_problem', problem); }, [problem]);
  useEffect(() => { localStorage.setItem('ob_dataTypes', JSON.stringify(dataTypes)); }, [dataTypes]);
  useEffect(() => { localStorage.setItem('ob_aiAnswers', JSON.stringify(aiAnswers)); }, [aiAnswers]);
  useEffect(() => { localStorage.setItem('ob_budget', budget); }, [budget]);
  useEffect(() => { localStorage.setItem('ob_timeline', timeline); }, [timeline]);
  useEffect(() => { localStorage.setItem('ob_company', company); }, [company]);
  useEffect(() => { localStorage.setItem('ob_name', name); }, [name]);
  useEffect(() => { localStorage.setItem('ob_email', email); }, [email]);
  useEffect(() => { localStorage.setItem('ob_linkedin', linkedin); }, [linkedin]);

  const clearStorage = () => {
    ['ob_problem','ob_dataTypes','ob_aiAnswers','ob_budget','ob_timeline','ob_company','ob_name','ob_email','ob_linkedin']
      .forEach(k => localStorage.removeItem(k));
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => { if (step > 0) setStep(s => s - 1); };

  const formatBudget = (v) => {
    const n = v.replace(/[^0-9]/g, '');
    return n ? `€${n}` : '';
  };

  // AI helpers
  const handleAiAnswer = (v) => setAiAnswers(p => ({ ...p, [aiQuestions[aiQ].key]: v }));
  const handleAiNext = () => {
    if (aiQ < aiQuestions.length - 1) setAiQ(q => q + 1);
    else setAiSpec(generateSpec(aiAnswers));
  };
  const handleAiBack = () => { if (aiQ > 0) setAiQ(q => q - 1); };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    setSubmitError('');
    try {
      const project = await db.createProject({
        problem_description: problem,
        data_types: dataTypes,
        ai_spec: aiSpec,
        budget: parseInt(budget.replace(/[^0-9]/g, '')) || 0,
        timeline,
        client_name: name,
        client_email: email,
        client_linkedin: linkedin,
        company,
      });

      if (file) {
        const url = await db.uploadFile('project-files', `${project.id}/${file.name}`, file);
        await db.updateProject(project.id, { file_urls: [url] });
      }

      setProjectId(project.id);
      clearStorage();
      onPortalOpen(project.id);
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const totalSteps = 6;

  const StepIndicator = () => (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm rounded-full px-4 py-2">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < step ? 'bg-emerald-500' : i === step ? 'bg-[#0F172A] scale-125' : 'bg-gray-200'}`} />
      ))}
      <span className="text-xs text-gray-400 ml-2 font-medium">Step {step + 1}/{totalSteps}</span>
    </div>
  );

  const BackButton = () => (
    step > 0 && (
      <button onClick={handleBack}
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#0F172A] hover:bg-white transition-all flex items-center gap-2">
        <i className="ri-arrow-left-line" /> Back
      </button>
    )
  );

  const renderStep = () => {
    switch (step) {
      /* ─── STEP 1: ENTRY ─── */
      case 0:
        return (
          <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
            <div className="text-center px-6 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Start your project in 6 steps</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
                What do you need help with?
              </h1>
              <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto">
                Describe the problem, upload your data, set your budget, and get a professional solution delivered.
              </p>
              <button onClick={handleNext}
                className="w-full sm:w-auto bg-white text-[#0F172A] font-bold px-10 py-4 rounded-xl text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:scale-[1.02] inline-flex items-center justify-center gap-2">
                Start Project <i className="ri-arrow-right-line" />
              </button>
              <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-500">
                <span>Projects from €100</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>48h avg. delivery</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>Stripe secure</span>
              </div>
            </div>
          </div>
        );

      /* ─── STEP 2: PROBLEM ─── */
      case 1:
        return (
          <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-3">Describe your business problem</h2>
              <p className="text-sm text-gray-400 mb-6">A single clear sentence is enough. You can add more detail later.</p>
              <textarea value={problem} onChange={e => setProblem(e.target.value)}
                placeholder="e.g., We're losing customers every month and don't know why. We need to identify the main drivers of churn before we lose more revenue."
                rows={5}
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg focus:border-[#0F172A] focus:outline-none transition-colors resize-none"
                autoFocus
              />
              <div className="flex items-center justify-end mt-6">
                <button onClick={handleNext} disabled={problem.trim().length < 10}
                  className={`font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 ${problem.trim().length >= 10 ? 'bg-[#0F172A] text-white hover:bg-[#1E293B]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                  Continue <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        );

      /* ─── STEP 3: DATA ─── */
      case 2:
        return (
          <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-3">What data do you have?</h2>
              <p className="text-sm text-gray-400 mb-6">Select formats and upload files.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['CSV', 'Excel', 'SQL', 'PDF', 'ZIP', 'PBIX'].map(t => (
                  <button key={t} onClick={() => setDataTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${dataTypes.includes(t) ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer hover:border-[#0F172A] hover:bg-gray-50 transition-all group">
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
                <button onClick={handleNext}
                  className="bg-[#0F172A] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1E293B] transition-all flex items-center gap-2">
                  Continue <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        );

      /* ─── STEP 4: AI SCOPING ─── */
      case 3:
        return (
          <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-3">Define your project scope</h2>
              <p className="text-sm text-gray-400 mb-6">Answer 6 quick questions and I'll generate a structured specification.</p>

              {!aiActive && !aiSpec && (
                <button onClick={() => setAiActive(true)}
                  className="w-full border-2 border-dashed border-blue-200 rounded-2xl p-10 text-center hover:border-blue-400 hover:bg-blue-50 transition-all group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="ri-sparkling-2-line text-white text-2xl" />
                  </div>
                  <p className="font-bold text-[#0F172A] text-lg mb-1">✨ Help me structure my request</p>
                  <p className="text-sm text-gray-500">Guided AI assistant will create a clear project specification</p>
                </button>
              )}

              {aiActive && !aiSpec && (
                <div className="border-2 border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-400">Question {aiQ + 1} of {aiQuestions.length}</span>
                    <button onClick={() => { setAiActive(false); setAiQ(0); setAiAnswers({}); }} className="text-sm text-gray-400 hover:text-gray-600">Cancel</button>
                  </div>
                  <div className="flex gap-1 mb-6">
                    {aiQuestions.map((_, i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= aiQ ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <label className="block text-lg font-bold text-[#0F172A] mb-3">{aiQuestions[aiQ].label}</label>
                  <textarea value={aiAnswers[aiQuestions[aiQ].key] || ''} onChange={e => handleAiAnswer(e.target.value)}
                    placeholder={aiQuestions[aiQ].placeholder} rows={3}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    autoFocus />
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

              {aiSpec && !aiSpecAccepted && (
                <div className="border-2 border-blue-200 bg-blue-50 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-file-text-line text-blue-600" />
                    <span className="font-bold text-[#0F172A]">Project specification</span>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-100 mb-4 text-sm space-y-2">
                    <p><span className="font-bold">Business goal:</span> {aiSpec.business_goal}</p>
                    <p><span className="font-bold">Data sources:</span> {aiSpec.data_sources}</p>
                    <p><span className="font-bold">Required outputs:</span> {aiSpec.required_outputs}</p>
                    <p><span className="font-bold">Success metrics:</span> {aiSpec.success_metrics}</p>
                    <p><span className="font-bold">Users:</span> {aiSpec.users}</p>
                    <p><span className="font-bold">Deadline:</span> {aiSpec.deadline}</p>
                    <p><span className="font-bold">Recommended scope:</span> {aiSpec.recommended_scope}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button onClick={() => { setAiSpecAccepted(true); }}
                      className="flex-1 bg-[#0F172A] text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-[#1E293B] transition-colors">
                      Accept Specification
                    </button>
                    <button onClick={() => setAiActive(true)}
                      className="flex-1 bg-white text-gray-700 font-medium px-4 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => { setAiQ(0); setAiAnswers({}); setAiSpec(null); setAiActive(true); }}
                      className="flex-1 bg-white text-gray-700 font-medium px-4 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                      Regenerate
                    </button>
                  </div>
                </div>
              )}

              {aiSpecAccepted && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                  <i className="ri-checkbox-circle-line text-emerald-500 text-3xl mb-2" />
                  <p className="font-bold text-[#0F172A]">Specification accepted</p>
                  <p className="text-sm text-gray-500 mt-1">Your project scope is defined and ready.</p>
                </div>
              )}

              <div className="flex items-center justify-end mt-6">
                <button onClick={handleNext}
                  className="bg-[#0F172A] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1E293B] transition-all flex items-center gap-2">
                  Continue <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        );

      /* ─── STEP 5: BUDGET & TIMELINE ─── */
      case 4:
        return (
          <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8">Budget & timeline</h2>

              <div className="mb-8">
                <label className="block text-sm font-bold text-[#0F172A] mb-2">What budget fits this project?</label>
                <input type="text" value={budget} onChange={e => setBudget(formatBudget(e.target.value))}
                  placeholder="€300"
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-2xl font-bold focus:border-[#0F172A] focus:outline-none transition-colors" />
                <p className="text-xs text-gray-400 mt-2">
                  Minimum <strong>€100</strong>. Final pricing may be adjusted based on complexity. Low-quality pricing may be rejected.
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
                    <button key={t.value} onClick={() => setTimeline(t.value === timeline ? '' : t.value)}
                      className={`py-4 rounded-xl text-sm font-bold border-2 transition-all ${timeline === t.value ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button onClick={handleNext} disabled={!budget || !timeline}
                  className={`font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 ${budget && timeline ? 'bg-[#0F172A] text-white hover:bg-[#1E293B]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                  Continue <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        );

      /* ─── STEP 6: REVIEW & SUBMIT ─── */
      case 5:
        return (
          <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8">Review your request</h2>

              <div className="space-y-3 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Problem</p>
                    <p className="text-sm text-gray-700 mt-1">{problem.slice(0, 100)}{problem.length > 100 ? '...' : ''}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-blue-600 text-sm font-medium hover:underline shrink-0 ml-4">Edit</button>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Data</p>
                    <p className="text-sm text-gray-700 mt-1">{dataTypes.length ? dataTypes.join(', ') : 'Not specified'}{file ? ` + ${file.name}` : ''}</p>
                  </div>
                  <button onClick={() => setStep(2)} className="text-blue-600 text-sm font-medium hover:underline shrink-0 ml-4">Edit</button>
                </div>
                {aiSpec && (
                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Scope</p>
                      <p className="text-sm text-gray-700 mt-1">{aiSpec.business_goal.slice(0, 80)}…</p>
                    </div>
                    <button onClick={() => setStep(3)} className="text-blue-600 text-sm font-medium hover:underline shrink-0 ml-4">Edit</button>
                  </div>
                )}
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Budget & Timeline</p>
                    <p className="text-sm text-gray-700 mt-1">{budget} · {timeline}</p>
                  </div>
                  <button onClick={() => setStep(4)} className="text-blue-600 text-sm font-medium hover:underline shrink-0 ml-4">Edit</button>
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
                  <input type="url" placeholder="LinkedIn (optional)" value={linkedin} onChange={e => setLinkedin(e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#0F172A] focus:outline-none" />
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
                <i className="ri-calendar-line text-purple-600 mt-0.5" />
                <div className="text-sm text-purple-800">
                  <p className="font-bold">Optional: Book a discovery call</p>
                  <p className="text-purple-700">15-min call helps align on scope. <a href="https://calendly.com/your-username" target="_blank" rel="noopener noreferrer" className="underline font-medium">Schedule here</a> or skip.</p>
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700 flex items-center gap-2">
                  <i className="ri-error-warning-line" /> {submitError}
                </div>
              )}

              <button onClick={handleSubmit} disabled={!name.trim() || !email.trim() || submitLoading}
                className={`w-full font-bold py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2 ${name.trim() && email.trim() && !submitLoading ? 'bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-lg hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                {submitLoading ? (
                  <><i className="ri-loader-2-line animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Project <i className="ri-arrow-right-line" /></>
                )}
              </button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <section id="onboarding">
      <StepIndicator />
      <BackButton />
      {renderStep()}
    </section>
  );
};

export default OnboardingFlow;
