import React from 'react';

const FinalCTA = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59,130,246,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(16,185,129,0.05) 0%, transparent 50%)`
      }} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8">
          <i className="ri-rocket-2-line text-blue-600 text-sm" />
          <span className="text-blue-700 text-sm font-medium">Ready to go?</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] leading-[1.1] mb-6">
          Your Data Has Answers.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Let's Find Them Together.</span>
        </h2>

        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Describe your problem, upload your data, name your budget, book a call, and receive your solution.
          That's it. No endless emails, no confusing process.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => document.getElementById('project-builder')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 bg-[#0F172A] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#1E293B] transition-all duration-200 shadow-xl hover:shadow-[#0F172A]/20 hover:scale-[1.02]">
            Start Building Your Project
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#faq"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0F172A] font-medium px-8 py-4 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-200">
            Read FAQs <i className="ri-arrow-down-line" />
          </a>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <i className="ri-shield-check-line text-2xl text-emerald-500 mb-2" />
              <p className="text-sm font-bold text-[#0F172A]">Confidential</p>
              <p className="text-xs text-gray-400">NDA available on request</p>
            </div>
            <div className="text-center">
              <i className="ri-flashlight-line text-2xl text-blue-500 mb-2" />
              <p className="text-sm font-bold text-[#0F172A]">Fast Turnaround</p>
              <p className="text-xs text-gray-400">Most projects in 48h</p>
            </div>
            <div className="text-center">
              <i className="ri-refund-line text-2xl text-purple-500 mb-2" />
              <p className="text-sm font-bold text-[#0F172A]">Revisions Included</p>
              <p className="text-xs text-gray-400">2 rounds free</p>
            </div>
            <div className="text-center">
              <i className="ri-secure-payment-line text-2xl text-emerald-500 mb-2" />
              <p className="text-sm font-bold text-[#0F172A]">Secure Payment</p>
              <p className="text-xs text-gray-400">Processed via Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
