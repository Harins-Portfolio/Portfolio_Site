import React from 'react';

const HeroSection = ({ onStartRequest }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0F172A] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`
      }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-sm font-medium">Available for new projects</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
          Get Your Data Problem Solved
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">in Days, Not Months</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your data, describe the task, choose your budget and receive a professional analytics solution.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartRequest}
            className="group inline-flex items-center gap-2 bg-white text-[#0F172A] font-bold px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:shadow-white/20 hover:scale-[1.02]"
          >
            Start Your Request
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium px-8 py-4 rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-200"
          >
            View Past Work
            <i className="ri-arrow-down-line" />
          </a>
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-16 border-t border-white/10">
          <div className="text-center">
            <p className="text-3xl font-black text-white">48h</p>
            <p className="text-sm text-gray-500">Avg. Turnaround</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-white">100%</p>
            <p className="text-sm text-gray-500">Delivery Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-white">€100+</p>
            <p className="text-sm text-gray-500">Starting Budget</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
