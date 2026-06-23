import React from 'react';

const ConsultingSection = () => {
  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-emerald-900/20" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">Ongoing Support</span>
        <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6">
          Need Ongoing Analytics Support?
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Not every problem is a one-off project. If your business needs continuous data infrastructure, reporting, or strategy — I offer fractional consulting on a monthly retainer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <i className="ri-database-2-line text-blue-400 text-lg" />
            </div>
            <h3 className="font-bold text-white mb-2">Data Infrastructure</h3>
            <p className="text-sm text-gray-400">Set up and maintain your data pipelines, warehouses, and ETL processes.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
              <i className="ri-bar-chart-box-line text-emerald-400 text-lg" />
            </div>
            <h3 className="font-bold text-white mb-2">Reporting & Dashboards</h3>
            <p className="text-sm text-gray-400">Weekly or monthly executive dashboards and KPI tracking systems.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <i className="ri-lightbulb-line text-purple-400 text-lg" />
            </div>
            <h3 className="font-bold text-white mb-2">Strategic Advisory</h3>
            <p className="text-sm text-gray-400">Fractional data leadership — helping you make better decisions with data.</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10 inline-block mx-auto">
          <p className="text-sm text-gray-400 mb-2">Fractional Data Consultant</p>
          <p className="text-5xl font-black text-white">€2,000<span className="text-2xl text-gray-400">/month</span></p>
          <p className="text-sm text-gray-500 mt-2">Starting price — scope discussed during discovery call</p>
        </div>

        <a
          href="https://calendly.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#0F172A] font-bold px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:shadow-white/20"
        >
          <i className="ri-calendar-line" />
          Book a 30-Minute Discovery Call
        </a>
      </div>
    </section>
  );
};

export default ConsultingSection;
