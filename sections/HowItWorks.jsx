import React, { useState } from 'react';
import { journeySteps } from '../data/solutions';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">The Journey</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-3 mb-4">
            Your Problem → Your Solution
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Five steps. No fluff. From describing your challenge to receiving your deliverable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {journeySteps.map((step, i) => (
            <div key={i} className="relative">
              <div
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                className={`relative bg-[#F8FAFC] border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 h-full ${
                  activeStep === i
                    ? 'border-[#0F172A] shadow-lg scale-[1.03]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-colors ${
                    activeStep === i ? 'bg-[#0F172A]' : 'bg-gray-400'
                  }`}>
                    <i className={`${step.icon} text-lg`} />
                  </div>
                  <span className={`text-2xl font-black transition-colors ${
                    activeStep === i ? 'text-[#0F172A]' : 'text-gray-200'
                  }`}>
                    {step.num}
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>

                {activeStep === i && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                    <p className="text-sm text-gray-600">{step.detail}</p>
                  </div>
                )}
              </div>

              {i < journeySteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                  <div className="w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-gray-400 text-sm" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-[#0F172A] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#1E293B] transition-all duration-200 shadow-lg"
          >
            Show Me What You Build
            <i className="ri-arrow-down-line" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
