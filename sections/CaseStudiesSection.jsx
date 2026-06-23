import { useState } from 'react';

const caseStudies = [
  {
    title: 'Retail Analytics Transformation',
    industry: 'Retail',
    icon: 'ri-shopping-bag-line',
    problem: 'A mid-size e-commerce retailer had chaotic, siloed data across Shopify, Google Analytics, and their warehouse system. They couldn\'t answer basic questions about customer lifetime value or product profitability.',
    approach: 'Built a unified data model in Power BI connecting all data sources. Created executive dashboards for real-time margin tracking, cohort-based customer analysis, and inventory turnover optimization.',
    impact: [
      { metric: '+12%', label: 'Gross margin improvement' },
      { metric: '40hrs', label: 'Saved per week in reporting' },
      { metric: '98%', label: 'Forecast accuracy achieved' },
    ],
    color: 'from-brand-500 to-violet-500',
    accent: 'bg-brand-50 border-brand-200',
  },
  {
    title: 'SaaS Growth Intelligence Platform',
    industry: 'SaaS',
    icon: 'ri-cloud-line',
    problem: 'A B2B SaaS company was flying blind on user behavior. They had subscription data, product analytics, and support tickets in separate tools with no connection between them.',
    approach: 'Developed an automated data pipeline that consolidated Stripe, Mixpanel, and Intercom data into a single analytics warehouse. Built churn prediction models and cohort dashboards.',
    impact: [
      { metric: '40%', label: 'Churn reduction identified' },
      { metric: '3x', label: 'Faster reporting cycle' },
      { metric: '$200K', label: 'Annual saving from churn insights' },
    ],
    color: 'from-accent-500 to-emerald-500',
    accent: 'bg-accent-50 border-accent-200',
  },
  {
    title: 'Financial Forecasting System',
    industry: 'Finance',
    icon: 'ri-bank-line',
    problem: 'A financial services firm relied on manual Excel-based forecasting that took two weeks to produce and was prone to errors. They needed a faster, more reliable approach.',
    approach: 'Built a Python-based forecasting engine with automated data ingestion from their ERP system. Integrated with Power BI for interactive scenario modeling and real-time projections.',
    impact: [
      { metric: '99%', label: 'Forecast accuracy' },
      { metric: '2wks→1hr', label: 'Time to generate forecasts' },
      { metric: '15+', label: 'Manual processes automated' },
    ],
    color: 'from-amber-500 to-orange-500',
    accent: 'bg-amber-50 border-amber-200',
  },
];

const CaseStudiesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section id="work" className="py-20 md:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="badge-accent mb-4">Case Studies</span>
          <h2 className="section-title mb-4">
            Real Results From{' '}
            <span className="gradient-text">Data-Driven Work</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Here&apos;s how past projects translated into measurable business outcomes.
            Every engagement is treated as a strategic partnership.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <div
              key={study.title}
              className={`bg-white rounded-2xl border ${study.accent} overflow-hidden transition-all duration-300 card-hover ${expandedIndex === index ? 'md:col-span-2 md:row-span-1' : ''}`}
              onMouseEnter={() => setExpandedIndex(index)}
              onMouseLeave={() => setExpandedIndex(null)}
            >
              <div className={`h-2 bg-gradient-to-r ${study.color}`} />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${study.accent.replace('bg-', 'bg-').replace('border-', '')} flex items-center justify-center`}>
                    <i className={`${study.icon} text-lg ${study.color.replace('from-', 'text-').split(' ')[0]}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{study.title}</h3>
                    <span className="text-sm text-gray-400">{study.industry}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Problem</span>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{study.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Approach</span>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{study.approach}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Impact</span>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {study.impact.map((item) => (
                        <div key={item.metric} className="text-center p-2 rounded-lg bg-gray-50">
                          <div className="text-lg font-extrabold gradient-text">{item.metric}</div>
                          <div className="text-xs text-gray-500">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
