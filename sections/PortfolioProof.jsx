import React from 'react';

const projects = [
  {
    id: 1,
    icon: 'ri-activity-line',
    title: 'Operational Efficiency & Behavioral Diagnostic Audit',
    tags: ['Capacity Recovery'],
    tagColor: 'emerald',
    problem: 'An unmanaged 20.2% client absenteeism rate caused severe compounding overhead costs and resource capacity waste across a healthcare operation.',
    solution: 'Applied strict exploratory data profiling diagnostics across over 20,000 operational records to isolate true systemic delay thresholds from random noise using PECO hypothesis testing frameworks.',
    impact: 'Recovered lost appointment capacity and reduced the cost of empty slots by providing a diagnostic report showing the main drivers of absenteeism and where to intervene first.',
    github: 'https://github.com/Harins-Portfolio/NoShCapMax',
  },
  {
    id: 2,
    icon: 'ri-shield-line',
    title: 'Public Risk & Safety Pattern Mapping',
    tags: ['Risk Prevention'],
    tagColor: 'blue',
    problem: '6 years of safety data was scattered across disjointed spreadsheets, leaving decision-makers blind to long-term patterns and unable to allocate defensive resources effectively.',
    solution: 'Restructured data modeling schemas via Power Pivot to integrate and normalize disparate data sources, enabling comprehensive risk mapping and real-time trend identification.',
    impact: 'Improved resource allocation efficiency by 25% and reduced incident response times by 15% through an interactive executive dashboard.',
    github: 'https://github.com/Harins-Portfolio/RiskMap',
  },
  {
    id: 3,
    icon: 'ri-layers-line',
    title: 'Predictive Customer Churn Modeling',
    tags: ['Revenue Retention'],
    tagColor: 'orange',
    problem: 'Extreme analysis paralysis due to highly correlated tracking variables made it impossible to trust which signals actually predicted churn, threatening monthly recurring revenue.',
    solution: 'Built an end-to-end predictive classification pipeline with correlation cleanup, One-Hot Encoding, multi-collinearity filters, and model validation to assign real-time risk scores.',
    impact: 'Protects recurring revenue by catching attrition before contracts lapse, providing a ranked list of at-risk accounts with clear drivers for proactive intervention.',
    github: 'https://github.com/Harins-Portfolio/Churn',
  },
];

const PortfolioProof = () => {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Proven Results</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-3 mb-4">
            Real Projects, Real Impact
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Each case study demonstrates how raw data was transformed into clear, actionable business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group bg-[#F8FAFC] border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col">
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <i className={`${project.icon} text-xl`} />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`text-xs font-bold px-2 py-1 rounded-md ${
                        project.tagColor === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                        project.tagColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="font-bold text-[#0F172A] text-lg mb-4 leading-snug">{project.title}</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <i className="ri-alert-line text-red-500 text-sm" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Problem</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <i className="ri-tools-line text-blue-500 text-sm" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Solution</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{project.solution}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <i className="ri-line-chart-line text-emerald-500 text-sm" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Impact</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{project.impact}</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto px-6 pb-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0F172A] hover:text-blue-600 transition-colors"
                >
                  <i className="ri-github-line" />
                  View Source Code
                  <i className="ri-external-link-line text-xs" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioProof;
