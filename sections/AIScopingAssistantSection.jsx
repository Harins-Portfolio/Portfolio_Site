import React, { useState } from 'react';

const questions = [
  { key: 'problem', label: 'What problem are you trying to solve?', placeholder: 'e.g., Our customer churn rate is increasing and we don\'t know why...' },
  { key: 'data', label: 'What data do you currently have?', placeholder: 'e.g., Monthly subscription logs, support tickets, customer profiles...' },
  { key: 'outcome', label: 'What outcome are you hoping to achieve?', placeholder: 'e.g., Reduce churn by 15% in the next quarter...' },
  { key: 'users', label: 'Who will use the results?', placeholder: 'e.g., C-suite executives, operations managers, sales team...' },
  { key: 'format', label: 'What format should the deliverable be in?', placeholder: 'e.g., Interactive dashboard, PDF report, Excel model...' },
  { key: 'deadline', label: 'What deadline do you have?', placeholder: 'e.g., Within 2 weeks, by end of month...' },
];

const generateSpec = (answers) => {
  return [
    `**Business Goal**\n${answers.problem || 'Not specified'}`,
    `**Available Data**\n${answers.data || 'Not specified'}`,
    `**Deliverables Required**\n${answers.format || 'Not specified'}`,
    `**Success Criteria**\n${answers.outcome || 'Not specified'}`,
    `**End Users**\n${answers.users || 'Not specified'}`,
    `**Deadline**\n${answers.deadline || 'Not specified'}`,
    `**Recommended Scope**\nBased on your inputs, this project would involve: data collection & cleaning, exploratory analysis, ${answers.format ? answers.format.toLowerCase().includes('dashboard') ? 'interactive dashboard development' : 'deliverable production' : 'solution development'}, and a hand-off session with your ${answers.users || 'team'}.`,
  ].join('\n\n');
};

const AIScopingAssistantSection = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [spec, setSpec] = useState('');
  const [started, setStarted] = useState(false);

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [questions[step].key]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      const generated = generateSpec(answers);
      setSpec(generated);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setSpec('');
    setStarted(false);
  };

  const handleInsert = () => {
    navigator.clipboard?.writeText(spec);
    handleReset();
    document.getElementById('project-builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  const progressPct = started ? Math.round(((step + 1) / questions.length) * 100) : 0;

  return (
    <section id="ai-scoping" className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">AI-Powered</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-3 mb-4">
            Not Sure How to Describe Your Project?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Most business owners struggle to define analytics projects. Answer 6 quick questions and
            the AI assistant generates a structured specification you can use directly.
          </p>
        </div>

        {!started ? (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-10 text-center max-w-lg mx-auto shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-sparkling-2-line text-white text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-3">AI Project Scoping Assistant</h3>
            <p className="text-gray-500 mb-6">
              Transform vague business challenges into clear, structured project specifications.
              No technical knowledge required.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6 text-left text-sm">
              <div className="flex items-start gap-2">
                <i className="ri-check-circle-line text-emerald-500 mt-0.5" />
                <span className="text-gray-600">Guided 6-step process</span>
              </div>
              <div className="flex items-start gap-2">
                <i className="ri-check-circle-line text-emerald-500 mt-0.5" />
                <span className="text-gray-600">Structured specification</span>
              </div>
              <div className="flex items-start gap-2">
                <i className="ri-check-circle-line text-emerald-500 mt-0.5" />
                <span className="text-gray-600">Editable & customizable</span>
              </div>
              <div className="flex items-start gap-2">
                <i className="ri-check-circle-line text-emerald-500 mt-0.5" />
                <span className="text-gray-600">Copy-paste ready</span>
              </div>
            </div>
            <button
              onClick={() => setStarted(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <i className="ri-sparkling-2-line mr-2" />
              Start AI Scoping Assistant
            </button>
          </div>
        ) : (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
            {!spec ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <i className="ri-sparkling-2-line text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">Question {step + 1} of {questions.length}</p>
                      <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-1">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                      </div>
                    </div>
                  </div>
                  <button onClick={handleReset} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                    <i className="ri-refresh-line mr-1" />Start over
                  </button>
                </div>

                <div className="mb-8">
                  <label className="block text-xl font-bold text-[#0F172A] mb-3">{questions[step].label}</label>
                  <textarea
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:outline-none transition-colors resize-none text-base"
                    rows={4}
                    placeholder={questions[step].placeholder}
                    value={answers[questions[step].key] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${step === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    disabled={step === 0}
                  >
                    <i className="ri-arrow-left-line mr-1" /> Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-[#0F172A] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1E293B] transition-colors"
                  >
                    {step < questions.length - 1 ? 'Next Question' : 'Generate Specification'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <i className="ri-check-line text-emerald-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">Your Project Specification</h3>
                    <p className="text-sm text-gray-500">Review, edit, and copy this into your project request</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6 mb-6">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-mono bg-white/80 rounded-xl p-4 border border-blue-100">
                    {spec}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={handleInsert}
                    className="flex-1 bg-[#0F172A] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="ri-file-copy-line" />
                    Copy & Continue to Project Builder
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AIScopingAssistantSection;
