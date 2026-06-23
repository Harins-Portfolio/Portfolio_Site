import { useState, useRef, useEffect, useCallback } from 'react';

const aiQuestions = [
  {
    id: 'business_goal',
    question: "What business problem are you trying to solve?",
    hint: "e.g., We&apos;re losing customers and don&apos;t know why",
  },
  {
    id: 'current_data',
    question: "What data do you currently have?",
    hint: "e.g., Sales data in Excel, Google Analytics, Shopify exports",
  },
  {
    id: 'desired_outcome',
    question: "What outcome are you hoping to achieve?",
    hint: "e.g., Reduce churn by 20%, build a real-time dashboard",
  },
  {
    id: 'audience',
    question: "Who will use the results?",
    hint: "e.g., C-suite executives, operations team, external clients",
  },
  {
    id: 'success_definition',
    question: "What does success look like?",
    hint: "e.g., Automated weekly report that saves 10 hours/week",
  },
  {
    id: 'deadline',
    question: "What deadline do you have in mind?",
    hint: "e.g., End of next month, as soon as possible, no rush",
  },
];

const Step2 = ({ onNext, onBack, initialSpec }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'ai', text: aiQuestions[0].question, hint: aiQuestions[0].hint },
  ]);
  const [specGenerated, setSpecGenerated] = useState(false);
  const [spec, setSpec] = useState(initialSpec || null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  useEffect(() => {
    if (!specGenerated) {
      inputRef.current?.focus();
    }
  }, [currentQ, specGenerated]);

  const generateSpec = useCallback((allAnswers) => {
    setIsTyping(true);
    setTimeout(() => {
      const generatedSpec = {
        business_goal: allAnswers.business_goal || '',
        current_data: allAnswers.current_data || '',
        desired_outcome: allAnswers.desired_outcome || '',
        audience: allAnswers.audience || '',
        success_definition: allAnswers.success_definition || '',
        deadline: allAnswers.deadline || '',
      };
      setSpec(generatedSpec);
      setSpecGenerated(true);
      setIsTyping(false);
    }, 800);
  }, []);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    setChatHistory(prev => [...prev, { type: 'user', text }]);
    setAnswers(prev => ({ ...prev, [aiQuestions[currentQ].id]: text }));
    setInputValue('');

    if (currentQ < aiQuestions.length - 1) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const nextQ = currentQ + 1;
          setCurrentQ(nextQ);
          setChatHistory(prev => [...prev, { type: 'ai', text: aiQuestions[nextQ].question, hint: aiQuestions[nextQ].hint }]);
          setIsTyping(false);
        }, 600);
      }, 300);
    } else {
      const newAnswers = { ...answers, [aiQuestions[currentQ].id]: text };
      generateSpec(newAnswers);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (specGenerated && spec) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-brand-50/30">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full animate-fadeInUp">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100/80 rounded-full text-brand-700 text-sm font-medium mb-4 border border-brand-200/50">
                <i className="ri-sparkling-line" />
                AI Project Brief Generated
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Project Brief
              </h1>
              <p className="text-gray-500">
                Based on our conversation, here&apos;s the project brief. Review, edit, or accept.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-1">
                {Object.entries(spec).map(([key, value]) => (
                  <div key={key} className="p-4 border-b border-gray-50 last:border-0">
                    <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
                      {key.replace(/_/g, ' ')}
                    </div>
                    <p className="text-gray-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => {
                  setSpecGenerated(false);
                  setSpec(null);
                  setCurrentQ(0);
                  setChatHistory([
                    { type: 'ai', text: aiQuestions[0].question, hint: aiQuestions[0].hint },
                  ]);
                  setAnswers({});
                }}
                className="btn-secondary"
              >
                <i className="ri-pencil-line" />
                Edit
              </button>
              <button
                onClick={() => onNext({ ai_brief: spec })}
                className="btn-primary"
              >
                Accept Brief
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-brand-50/30">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full animate-fadeInUp">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100/80 rounded-full text-violet-700 text-sm font-medium mb-4 border border-violet-200/50">
              <i className="ri-sparkling-2-line" />
              AI Assistant — Step 2 of 6
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Describe Your Problem
            </h1>
            <p className="text-gray-500">
              I&apos;ll ask a few questions to build a complete project brief.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-[400px] overflow-y-auto p-4 space-y-3">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-brand-500 text-white rounded-br-md'
                      : 'bg-gray-50 text-gray-900 rounded-bl-md border border-gray-100'
                  }`}>
                    <div className="text-sm leading-relaxed">{msg.text}</div>
                    {msg.type === 'ai' && msg.hint && currentQ === idx && !specGenerated && (
                      <div className="text-xs text-gray-400 mt-1 italic">{msg.hint}</div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="bg-gray-50 rounded-2xl rounded-bl-md px-4 py-3 border border-gray-100">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your answer..."
                  className="input-field flex-1"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="btn-primary px-5"
                >
                  <i className="ri-send-plane-fill" />
                </button>
              </div>
              <div className="flex justify-between mt-3">
                <button onClick={onBack} className="btn-ghost text-sm">
                  <i className="ri-arrow-left-line" />
                  Back
                </button>
                <span className="text-xs text-gray-400">
                  Question {Math.min(currentQ + 1, aiQuestions.length)} of {aiQuestions.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
