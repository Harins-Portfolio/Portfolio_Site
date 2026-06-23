import React, { useState, useRef } from 'react';
import { solutionChannels } from '../data/solutions';
import SolutionCard from '../components/SolutionCard';
import AIScopingAssistant from './AIScopingAssistant';

const ACCEPTED_FILES = '.csv,.xlsx,.pdf,.zip,.pbix';

const initialForm = {
  solutionType: '',
  description: '',
  deadline: '',
  budget: '',
  company: '',
  name: '',
  email: '',
  linkedin: '',
};

const ProjectBuilder = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [showAI, setShowAI] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const totalSteps = 6;

  const canProceed = () => {
    switch (step) {
      case 0: return !!form.solutionType;
      case 1: return form.description.trim().length >= 20;
      case 2: return true;
      case 3: return !!form.deadline && !!form.budget;
      case 4: return form.name.trim() && form.email.trim();
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => { if (canProceed() && step < totalSteps - 1) setStep(s => s + 1); };
  const handleBack = () => { if (step > 0) setStep(s => s - 1); };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const selectedChannel = solutionChannels.find(c => c.id === form.solutionType);

  const formatBudget = (value) => {
    const nums = value.replace(/[^0-9]/g, '');
    return nums ? `€${nums}` : '';
  };

  if (submitted) {
    return (
      <section id="project-builder" className="py-24 bg-gradient-to-br from-emerald-50 to-green-50 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-emerald-600 text-4xl" />
          </div>
          <h2 className="text-3xl font-black text-[#0F172A] mb-4">Project Request Submitted!</h2>
          <p className="text-lg text-gray-600 mb-2">Thank you, {form.name || 'there'}.</p>
          <p className="text-gray-500 mb-8">
            I've received your project request. You'll get a confirmation email shortly.
            I'll review your requirements and respond within 24 hours with a proposal.
          </p>
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 mb-8 text-left">
            <h4 className="font-bold text-[#0F172A] mb-4">Your Journey Summary</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">1</span>
                <div><span className="font-bold text-[#0F172A]">Solution:</span> <span className="text-gray-600">{selectedChannel?.title || 'Not specified'}</span></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">2</span>
                <div><span className="font-bold text-[#0F172A]">Budget:</span> <span className="text-gray-600">{form.budget || 'Not set'}</span></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">3</span>
                <div><span className="font-bold text-[#0F172A]">Deadline:</span> <span className="text-gray-600">{form.deadline || 'Not set'}</span></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">4</span>
                <div><span className="font-bold text-[#0F172A]">Next:</span> <span className="text-gray-600">I'll review and send a proposal within 24 hours</span></div>
              </div>
            </div>
          </div>
          <button onClick={() => { setSubmitted(false); setForm(initialForm); setFile(null); setStep(0); }}
            className="text-[#0F172A] font-bold underline hover:text-gray-600 transition-colors">
            Build Another Project
          </button>
        </div>
      </section>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <p className="text-sm text-gray-500 mb-6">Pick the type of analytics solution you need. Each option has predefined deliverables — so you know exactly what you're getting.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {solutionChannels.map(ch => (
                <SolutionCard key={ch.id} channel={ch} selected={form.solutionType === ch.id} onSelect={(id) => update('solutionType', id)} />
              ))}
            </div>
            {form.solutionType && selectedChannel && (
              <div className="mt-6 p-4 bg-[#0F172A] rounded-xl text-white flex items-start gap-3">
                <i className="ri-information-line mt-0.5" />
                <div>
                  <p className="font-bold text-sm">You selected: {selectedChannel.title}</p>
                  <p className="text-sm text-gray-300">Deliverables: {selectedChannel.deliverables.join(' · ')}</p>
                </div>
              </div>
            )}
          </>
        );

      case 1:
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">Describe your challenge in detail. Not sure where to start?</p>
              <button onClick={() => setShowAI(true)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50">
                <i className="ri-sparkling-2-line" /> Help Me Define
              </button>
            </div>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder={`Describe what you need. What business problem are you solving? What data do you have? What questions need answers?\n\nExample: "Our e-commerce business has 50,000 monthly orders but we can't predict which customers will churn. We have transaction logs, support tickets, and customer profiles in CSV format. We want a risk scoring model that flags at-risk accounts weekly."`}
              rows={8}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors resize-y"
            />
            <div className="flex items-center justify-between mt-3">
              <p className={`text-xs ${form.description.length >= 20 ? 'text-emerald-600' : 'text-gray-400'}`}>
                <i className={`ri-${form.description.length >= 20 ? 'checkbox-circle' : 'information'}-line mr-1`} />
                {form.description.length >= 20 ? 'Good detail level' : `Minimum 20 characters (${form.description.length}/20)`}
              </p>
              {form.description.length >= 20 && (
                <p className="text-xs text-green-600"><i className="ri-thumb-up-line mr-1" />Ready to proceed</p>
              )}
            </div>
            <AIScopingAssistant
              isOpen={showAI}
              onClose={() => setShowAI(false)}
              onInsert={(spec) => { update('description', spec); setShowAI(false); }}
            />
          </>
        );

      case 2:
        return (
          <>
            <p className="text-sm text-gray-500 mb-6">Upload the data files related to your project. All files are stored securely.</p>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-[#0F172A] hover:bg-gray-50 transition-all group"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0F172A] group-hover:text-white transition-all">
                <i className="ri-upload-cloud-2-line text-3xl text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <p className="font-bold text-[#0F172A] mb-1">
                {file ? file.name : 'Click to upload your data files'}
              </p>
              {!file && <p className="text-sm text-gray-400">or drag and drop</p>}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {ACCEPTED_FILES.split(',').map(ext => (
                  <span key={ext} className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600 font-mono">{ext}</span>
                ))}
              </div>
            </div>
            <input ref={fileRef} type="file" accept={ACCEPTED_FILES} onChange={(e) => { const f = e.target.files[0]; if (f) setFile(f); }} className="hidden" />
            {file && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="ri-file-text-line text-emerald-600" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <i className="ri-close-line" />
                </button>
              </div>
            )}
          </>
        );

      case 3:
        return (
          <>
            <p className="text-sm text-gray-500 mb-6">Set your preferred deadline and budget. Projects start from <strong>€100</strong>.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">Target Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => update('deadline', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">Your Budget</label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => update('budget', formatBudget(e.target.value))}
                  placeholder="€500"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors text-lg"
                />
              </div>
            </div>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <i className="ri-information-line text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-bold">Pricing Policy</p>
                  <p>Projects starting from <strong>€100</strong>. I reserve the right to reject projects that are significantly underpriced for the scope required. A fair price ensures quality delivery.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="flex items-start gap-3">
                <i className="ri-calendar-line text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-bold">Want to discuss pricing first?</p>
                  <p>You can <a href="https://calendly.com/your-username" target="_blank" rel="noopener noreferrer" className="underline font-medium">book a free 15-minute call</a> to discuss scope and budget before committing.</p>
                </div>
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <p className="text-sm text-gray-500 mb-6">Almost done! Tell me how to reach you and optionally book a quick call.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">Company Name</label>
                <input type="text" value={form.company} onChange={(e) => update('company', e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">Your Name *</label>
                <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
                  placeholder="John Smith"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">Email *</label>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                  placeholder="john@acme.com"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">LinkedIn (optional)</label>
                <input type="url" value={form.linkedin} onChange={(e) => update('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/johnsmith"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors" />
              </div>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
              <div className="flex items-start gap-3">
                <i className="ri-video-chat-line text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-[#0F172A] mb-1">Book a Discovery Call (Recommended)</p>
                  <p className="text-sm text-gray-600 mb-3">A quick 15-minute call helps align on scope and expectations before work begins.</p>
                  <a href="https://calendly.com/your-username" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-purple-600 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                    <i className="ri-calendar-line" /> Book 15-Min Call
                  </a>
                  <p className="text-xs text-gray-400 mt-2">Optional — you can skip and I'll reach out via email.</p>
                </div>
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <p className="text-sm text-gray-500 mb-6">Review everything before submitting. You can go back to any step.</p>
            <div className="space-y-4 mb-8">
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Solution Type</p>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedChannel?.gradient} flex items-center justify-center`}>
                    <i className={`${selectedChannel?.icon} text-white text-sm`} />
                  </div>
                  <p className="font-bold text-[#0F172A]">{selectedChannel?.title || 'Not selected'}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">Deliverables: {selectedChannel?.deliverables.join(', ')}</p>
              </div>

              <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Description</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-3">{form.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">File</p>
                  <p className="text-sm font-medium text-[#0F172A]">{file ? file.name : 'No file uploaded'}</p>
                </div>
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Deadline</p>
                  <p className="text-sm font-medium text-[#0F172A]">{form.deadline || 'Not set'}</p>
                </div>
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Budget</p>
                  <p className="text-sm font-medium text-[#0F172A]">{form.budget || 'Not set'}</p>
                </div>
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Contact</p>
                  <p className="text-sm font-medium text-[#0F172A]">{form.name} · {form.email}</p>
                  {form.company && <p className="text-sm text-gray-500">{form.company}</p>}
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  const stepTitles = [
    { title: 'What Do You Need Built?', subtitle: 'Choose the type of analytics solution that fits your challenge.' },
    { title: 'Describe Your Problem', subtitle: 'Tell me about your business challenge in detail.' },
    { title: 'Upload Your Data', subtitle: 'Share the files I need to work with.' },
    { title: 'Set Deadline & Budget', subtitle: 'Pick your timeline and set your budget.' },
    { title: 'Your Contact & Call', subtitle: 'How should I reach you?' },
    { title: 'Review & Submit', subtitle: 'Final review before submitting your request.' },
  ];

  const { title, subtitle } = stepTitles[step];

  return (
    <section id="project-builder" className="bg-[#F8FAFC]">
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center py-16 px-6">
          <div className="w-full max-w-4xl">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i < step ? 'bg-emerald-500' : i === step ? 'bg-[#0F172A]' : 'bg-gray-200'
                  }`} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">Step {step + 1} of {totalSteps}</span>
                <span className="text-sm font-medium text-gray-400">{Math.round(((step + 1) / totalSteps) * 100)}% complete</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                {step > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    <i className="ri-check-line" /> Step {step} complete
                  </span>
                )}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-2">{title}</h2>
              <p className="text-lg text-gray-500">{subtitle}</p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 md:p-10 shadow-sm">
              {renderStep()}
            </div>

            <div className="flex items-center justify-between mt-8">
              <button onClick={handleBack}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  step === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                }`}
                disabled={step === 0}>
                <i className="ri-arrow-left-line mr-2" />Back
              </button>
              {step < totalSteps - 1 ? (
                <button onClick={handleNext} disabled={!canProceed()}
                  className={`font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 ${
                    canProceed() ? 'bg-[#0F172A] text-white hover:bg-[#1E293B] hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}>
                  Continue <i className="ri-arrow-right-line" />
                </button>
              ) : (
                <button onClick={handleSubmit}
                  className="font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg">
                  <i className="ri-send-plane-line" />
                  Submit Project Request
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectBuilder;
