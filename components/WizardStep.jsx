import React from 'react';

const WizardStep = ({ currentStep, totalSteps, step, title, subtitle, children, onNext, onBack, canProceed = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-3xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i < currentStep ? 'bg-[#0F172A]' : i === currentStep ? 'bg-[#0F172A]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-400">
                {Math.round(((currentStep + 1) / totalSteps) * 100)}% complete
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-2">{title}</h2>
            {subtitle && <p className="text-lg text-gray-500">{subtitle}</p>}
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 md:p-10 shadow-sm">
            {children}
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={onBack}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              disabled={currentStep === 0}
            >
              <i className="ri-arrow-left-line mr-2" />
              Back
            </button>
            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 ${
                canProceed
                  ? 'bg-[#0F172A] text-white hover:bg-[#1E293B] hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep < totalSteps - 1 ? (
                <>Continue <i className="ri-arrow-right-line" /></>
              ) : (
                <>Submit Project Request <i className="ri-arrow-right-line" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardStep;
