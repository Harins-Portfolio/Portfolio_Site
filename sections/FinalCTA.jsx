import React from 'react';

const FinalCTA = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-6">
          Ready to start your project?
        </h2>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
          Describe your problem, upload your data, set your budget, and get a professional solution delivered.
        </p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 bg-[#0F172A] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#1E293B] transition-all duration-200 shadow-lg">
          Start Your Project <i className="ri-arrow-right-line" />
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
