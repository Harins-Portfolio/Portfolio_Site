import React from 'react';

const PortfolioProof = () => {
  return (
    <section id="work" className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img src="/dist/profile.jpg" alt="profile" className="w-40 h-40 rounded-full object-cover shadow" />
        <div>
          <h2 className="text-3xl font-bold">Trusted by business owners</h2>
          <p className="mt-2 text-gray-600">I help companies convert data into revenue-driving analytics and actionable strategy.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">Retail analytics — +12% margin</div>
            <div className="p-4 bg-white rounded shadow">SaaS growth model — 40% uplift</div>
            <div className="p-4 bg-white rounded shadow">Financial forecasting — 99% accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioProof;
