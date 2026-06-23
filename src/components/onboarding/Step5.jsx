import { useState } from 'react';

const Step5 = ({ onNext, onBack, initialBooking }) => {
  const [booking, setBooking] = useState(initialBooking || { type: 'none' });

  const options = [
    {
      value: 'discovery',
      title: '15-Min Discovery Call',
      desc: 'Quick chat to clarify scope and feasibility',
      duration: '15 min',
      icon: 'ri-chat-1-line',
    },
    {
      value: 'consulting',
      title: '30-Min Consulting Call',
      desc: 'Deeper discussion on requirements and approach',
      duration: '30 min',
      icon: 'ri-team-line',
    },
    {
      value: 'none',
      title: 'Skip the Call',
      desc: 'I\'ll review your submission and respond within 48 hours',
      duration: '',
      icon: 'ri-mail-send-line',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-brand-50/30">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full animate-fadeInUp">
          <div className="text-center mb-10">

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Schedule a Call
            </h1>
            <p className="text-lg text-gray-500">
              Optional &mdash; choose a time to discuss your project, or skip and I&apos;ll review your submission.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => setBooking({ type: option.value, duration: option.duration })}
                className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                  booking.type === option.value
                    ? 'border-brand-500 bg-brand-50 shadow-md shadow-brand-500/10'
                    : 'border-gray-100 bg-white hover:border-brand-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    booking.type === option.value ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <i className={`${option.icon} text-xl`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{option.title}</div>
                    <div className="text-sm text-gray-500">{option.desc}</div>
                  </div>
                  {option.duration && (
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      booking.type === option.value ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {option.duration}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {booking.type !== 'none' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 animate-fadeInUp">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <i className="ri-calendar-line text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Calendly Integration</h3>
                  <p className="text-sm text-gray-500">
                    A Calendly embed will appear here when connected
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
                <i className="ri-calendar-schedule-line text-3xl text-gray-300 mb-2" />
                <p className="text-sm text-gray-400">
                  Connect your Calendly account or skip to submit
                </p>
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <i className="ri-information-line text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Project Review Notice</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  After submission, I will review your project details and either accept or decline
                  based on whether I believe I can deliver the results you need. If accepted, you'll
                  receive a fixed-price quote before work begins. You can track all status updates
                  in the Client Portal.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={onBack} className="btn-ghost">
              <i className="ri-arrow-left-line" />
              Back
            </button>
            <button
              onClick={() => onNext({ booking })}
              className="btn-primary text-base px-8 py-3"
            >
              {booking.type === 'none' ? 'Skip & Continue' : 'Continue'}
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
