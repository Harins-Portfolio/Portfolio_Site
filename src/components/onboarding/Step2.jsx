import React, { useState } from 'react';

const Step2 = ({ onNext }) => {
  const [problemDescription, setProblemDescription] = useState('');

  const handleNext = () => {
    onNext({ problem_description: problemDescription });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Describe your business problem</h1>
      <p className="text-lg text-gray-600 mb-8">One clear description is enough.</p>
      <textarea
        value={problemDescription}
        onChange={(e) => setProblemDescription(e.target.value)}
        className="w-1/2 h-40 p-4 border border-gray-300 rounded-lg mb-8"
        placeholder="Enter your description here..."
      />
      <button
        onClick={handleNext}
        disabled={!problemDescription}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
      >
        Continue
      </button>
    </div>
  );
};

export default Step2;
