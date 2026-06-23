import React from 'react';

const HeroSection = ({ onStartJourney }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0F172A] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-sm font-medium">Business problem solving through data analytics</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
          Describe Your Problem.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Upload Your Data. Name Your Budget.
          </span>
          <span className="block text-white/80">
            Book a Call. Receive Your Solution.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Not another portfolio. A straight path from your business problem to a working analytics solution.
          Pick what you need, describe the challenge, and get a professional deliverable — on your timeline, at your budget.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartJourney}
            className="group inline-flex items-center gap-2 bg-white text-[#0F172A] font-bold px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:shadow-white/20 hover:scale-[1.02]"
          >
            Start Your Journey
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#solutions"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium px-8 py-4 rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-200"
          >
            See What I Build
            <i className="ri-arrow-down-line" />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-16 border-t border-white/10">
          <div className="text-center">
            <div className="text-3xl font-black text-white">5</div>
            <p className="text-sm text-gray-500">Solution Types</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white">48h</div>
            <p className="text-sm text-gray-500">Avg. Turnaround</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white">€100+</div>
            <p className="text-sm text-gray-500">Starting Budget</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
