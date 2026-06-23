import React, { useState } from 'react';

const questions = [
  "What business problem are you solving?",
  "What data sources do you have?",
  "What outcome do you want?",
  "Who will use the results?",
  "What deliverable format do you need?",
  "What deadline do you need?",
];

const Step4 = ({ onNext }) => {
  const [showAssistant, setShowAssistant] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(''));
  const [specification, setSpecification] = useState(null);

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateSpecification();
    }
  };

  const generateSpecification = () => {
    const spec = {
      business_goal: answers[0],
      data_sources: answers[1],
      required_outputs: answers[2],
      success_metrics: answers[3],
      users: answers[4],
      deadline: answers[5],
      recommended_scope: "AI-generated scope will appear here.",
    };
    setSpecification(spec);
  };

  const handleAccept = () => {
    onNext({ specification });
  };

  if (specification) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Generated Project Specification</h1>
        <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg">
          {Object.entries(specification).map(([key, value]) => (
            <div key={key} className="mb-4">
              <h3 className="text-lg font-semibold capitalize">{key.replace('_', ' ')}</h3>
              <p className="text-gray-700">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <button onClick={handleAccept} className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
            Accept Specification
          </button>
          <button onClick={() => setSpecification(null)} className="ml-4 px-6 py-3 bg-yellow-500 text-white rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors">
            Edit
          </button>
          <button onClick={generateSpecification} className="ml-4 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Regenerate
          </button>
        </div>
      </div>
    );
  }

  if (showAssistant) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">{questions[currentQuestion]}</h1>
        <textarea
          value={answers[currentQuestion]}
          onChange={handleAnswerChange}
          className="w-1/2 h-40 p-4 border border-gray-300 rounded-lg mb-8"
          placeholder="Your answer..."
        />
        <button
          onClick={handleNextQuestion}
          disabled={!answers[currentQuestion]}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {currentQuestion < questions.length - 1 ? "Next" : "Generate Specification"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">AI Scoping Engine</h1>
      <button
        onClick={() => setShowAssistant(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        ✨ Help me structure my request
      </button>
    </div>
  );
};

export default Step4;
