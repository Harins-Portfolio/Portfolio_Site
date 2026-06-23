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

const AIScopingAssistant = ({ isOpen, onClose, onInsert }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [spec, setSpec] = useState('');

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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <i className="ri-sparkling-2-line text-white text-lg" />
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A]">AI Project Scoping Assistant</h3>
              <p className="text-sm text-gray-500">Answer 6 questions to generate a structured project spec</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
            <i className="ri-close-line text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {!spec ? (
            <>
              <div className="flex items-center gap-2 mb-6">
                {questions.map((_, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? 'bg-[#0F172A]' : 'bg-gray-200'}`} />
                ))}
              </div>

              <div className="mb-8">
                <p className="text-sm font-medium text-gray-400 mb-2">Question {step + 1} of {questions.length}</p>
                <label className="block text-lg font-bold text-[#0F172A] mb-3">{questions[step].label}</label>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-[#0F172A] focus:outline-none transition-colors resize-none text-base"
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
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <i className="ri-file-text-line text-blue-600 text-xl" />
                  <h4 className="font-bold text-[#0F172A] text-lg">Your Project Specification</h4>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-mono bg-white/80 rounded-xl p-4 border border-blue-100">
                  {spec}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => {
                    onInsert(spec);
                    onClose();
                    handleReset();
                  }}
                  className="flex-1 bg-[#0F172A] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-2"
                >
                  <i className="ri-file-copy-line" />
                  Accept & Insert into Description
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Start Over
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIScopingAssistant;
