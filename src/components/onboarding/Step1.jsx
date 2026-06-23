import React from 'react';

const Step1 = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">What do you need help with?</h1>
      <button
        onClick={onNext}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Start Project
      </button>
    </div>
  );
};

export default Step1;
