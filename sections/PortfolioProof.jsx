import React from 'react';
import { solutionChannels } from '../data/solutions';

const projects = [
  {
    icon: 'ri-activity-line',
    title: 'Operational Efficiency & Behavioral Diagnostic Audit',
    channel: 'ds',
    problem: 'A healthcare operation faced a 20.2% appointment no-show rate, wasting staff hours, room capacity, and revenue every week. Leadership had over 20,000 records but no clear view of absenteeism patterns.',
    solution: 'Applied exploratory data profiling across 20,000+ operational logs to separate random cancellations from repeatable no-show patterns using structured diagnostic frameworks.',
    impact: 'Recovered lost appointment capacity and reduced empty-slot costs by providing a clear intervention map for where to act first.',
    github: 'https://github.com/Harins-Portfolio/NoShCapMax',
  },
  {
    icon: 'ri-shield-line',
    title: 'Multi-Year Public Safety Risk Mapping',
    channel: 'vis',
    problem: '6 years of safety data was scattered across disjointed spreadsheets, leaving decision-makers blind to long-term risk patterns and unable to allocate defensive resources.',
    solution: 'Restructured data modeling via Power Pivot to integrate and normalize disparate data sources, enabling comprehensive risk mapping and real-time trend identification.',
    impact: 'Improved resource allocation efficiency by 25% and reduced incident response times by 15% through an interactive executive dashboard.',
    github: 'https://github.com/Harins-Portfolio/RiskMap',
  },
  {
    icon: 'ri-layers-line',
    title: 'Predictive Customer Churn Engine',
    channel: 'ds',
    problem: 'A subscription business faced extreme analysis paralysis due to highly correlated metrics, making it impossible to trust which signals actually predicted customer attrition.',
    solution: 'Built an end-to-end classification pipeline with correlation cleanup, One-Hot Encoding, multi-collinearity filters, and real-time risk scoring.',
    impact: 'Protects recurring revenue by surfacing at-risk accounts with clear driver explanations before contracts lapse — enabling proactive retention.',
    github: 'https://github.com/Harins-Portfolio/Churn',
  },
  {
    icon: 'ri-megaphone-line',
    title: 'Marketing Mix & Sales Attribution',
    channel: 'stats',
    problem: 'A commercial firm needed to evaluate next-year plans and isolate which marketing budgets yield the best conversions while protecting capital.',
    solution: 'Multi-variable regression modeling with diagnostic checks and scenario-based forecasts using Excel, Jamovi, and Orange.',
    impact: 'Let marketing teams cut underperforming channels and reinvest in high-yield media with statistical confidence.',
    github: 'https://github.com/Harins-Portfolio/BusinessStatistics',
  },
  {
    icon: 'ri-bar-chart-box-line',
    title: 'Data Channel & Single Source of Truth',
    channel: 'vis',
    problem: 'A commercial analytics team faced fractured order, product, and transaction datasets causing duplicate work and inconsistent KPIs.',
    solution: 'Built a unified Data Channel with Power Query merges, append flows, advanced lookup logic, and a governance-ready data model.',
    impact: 'Reduced reporting latency, eliminated inconsistent metrics, and turned data from a cost center into a trusted strategic asset.',
    github: 'https://github.com/Harins-Portfolio/DataExploitation',
  },
  {
    icon: 'ri-code-line',
    title: 'Portfolio & Consulting Platform',
    channel: 'vibe',
    problem: 'A portfolio needed to do more than list projects — it had to explain service offers, prove technical range, and create a credible consulting surface.',
    solution: 'Built a channel-based React app using Vite and Tailwind CSS with reusable proof cards, service sections, and business-first copy for each capability.',
    impact: 'A live-ready platform that frames six core value propositions and gives business owners a clear path to request analytics support.',
    github: 'https://github.com/Harins-Portfolio/portfolio-site',
  },
];

const PortfolioProof = () => {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Proven Results</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-3 mb-4">
            Real Projects Across Every Solution Type
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Each project demonstrates how a specific analytics approach solved a real business problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => {
            const ch = solutionChannels.find(c => c.id === p.channel);
            return (
              <div key={i} className="group bg-[#F8FAFC] border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ch?.gradient} flex items-center justify-center text-white`}>
                      <i className={`${p.icon} text-lg`} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${ch?.bgLight} ${ch?.textAccent}`}>
                      {ch?.title || p.channel}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#0F172A] text-base mb-4 leading-snug">{p.title}</h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <i className="ri-alert-line text-red-500 text-xs" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Problem</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{p.problem}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <i className="ri-tools-line text-blue-500 text-xs" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Solution</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{p.solution}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <i className="ri-line-chart-line text-emerald-500 text-xs" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Impact</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{p.impact}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto px-6 pb-6 pt-2">
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#0F172A] transition-colors">
                    <i className="ri-github-line" /> View source
                    <i className="ri-external-link-line text-xs" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button onClick={() => document.getElementById('project-builder')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-[#0F172A] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#1E293B] transition-all duration-200">
            Start Your Project <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioProof;
