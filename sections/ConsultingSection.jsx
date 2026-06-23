import React from 'react';

const ConsultingSection = () => {
  return (
    <section className="py-24 bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Need ongoing analytics support?
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          Fractional data consultant from €2,000/month. Dashboards, pipelines, strategy.
        </p>
        <a href="https://calendly.com/your-username" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#0F172A] font-bold px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg">
          <i className="ri-calendar-line" /> Book a discovery call
        </a>
      </div>
    </section>
  );
};

export default ConsultingSection;
