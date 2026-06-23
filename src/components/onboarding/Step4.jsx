import { useState } from 'react';

const urgencyOptions = [
  { value: 'low', label: 'No rush — within a month', icon: 'ri-calendar-line', color: 'text-green-500 bg-green-50 border-green-200' },
  { value: 'medium', label: 'Standard — within 2 weeks', icon: 'ri-time-line', color: 'text-blue-500 bg-blue-50 border-blue-200' },
  { value: 'high', label: 'Urgent — within a week', icon: 'ri-flashlight-line', color: 'text-orange-500 bg-orange-50 border-orange-200' },
  { value: 'critical', label: 'ASAP — as fast as possible', icon: 'ri-alarm-line', color: 'text-red-500 bg-red-50 border-red-200' },
];

const Step4 = ({ onNext, onBack, initialBudget }) => {
  const [budget, setBudget] = useState(initialBudget?.budget || '');
  const [timeline, setTimeline] = useState(initialBudget?.timeline || '');
  const [urgency, setUrgency] = useState(initialBudget?.urgency || '');

  const handleSubmit = () => {
    onNext({ budget: Number(budget), timeline, urgency });
  };

  const isValid = budget >= 100 && timeline.trim();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-brand-50/30">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full animate-fadeInUp">
          <div className="text-center mb-10">

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Budget & Timeline
            </h1>
            <p className="text-lg text-gray-500">
              Set your expectations. Projects generally start at <strong className="text-gray-700">&euro;100</strong>.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Budget (EUR)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">€</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., 500"
                  min="100"
                  className="input-field pl-8 text-lg font-semibold"
                />
              </div>
              {budget && budget < 100 && (
                <p className="text-xs text-orange-500 mt-1.5">
                  <i className="ri-information-line mr-1" />
                  Minimum project budget is €100
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Timeline
              </label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g., 2 weeks, end of next month"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Project Urgency
              </label>
              <div className="grid grid-cols-2 gap-3">
                {urgencyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setUrgency(option.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      urgency === option.value
                        ? option.color + ' shadow-sm'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <i className={`${option.icon} text-lg`} />
                    <div className="text-sm font-medium text-gray-900 mt-1">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
              <div className="flex items-start gap-3">
                <i className="ri-information-line text-brand-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brand-800">Pricing Guidance</p>
                  <p className="text-sm text-brand-600 mt-0.5">
                    Most projects range from <strong>€100</strong> to <strong>€2,500+</strong> depending on complexity.
                    You&apos;ll receive a fixed-price quote before any work begins.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button onClick={onBack} className="btn-ghost">
              <i className="ri-arrow-left-line" />
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className="btn-primary text-base px-8 py-3"
            >
              Continue
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
