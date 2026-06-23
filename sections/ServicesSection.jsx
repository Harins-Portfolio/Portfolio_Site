import { useState } from 'react';

const services = [
  {
    icon: 'ri-bar-chart-box-line',
    title: 'Data Analysis',
    description: 'Transform raw data into actionable insights. I uncover patterns, trends, and opportunities that drive business decisions.',
    color: 'from-brand-500 to-violet-500',
    bgColor: 'bg-brand-50',
    iconColor: 'text-brand-600',
  },
  {
    icon: 'ri-dashboard-line',
    title: 'Dashboard Development',
    description: 'Interactive dashboards that give you real-time visibility into your business performance. Built in Power BI or your preferred tool.',
    color: 'from-accent-500 to-emerald-500',
    bgColor: 'bg-accent-50',
    iconColor: 'text-accent-600',
  },
  {
    icon: 'ri-pie-chart-2-line',
    title: 'Power BI Solutions',
    description: 'End-to-end Power BI implementation — from data modeling and ETL to publishing and user training for your team.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: 'ri-line-chart-line',
    title: 'Forecasting',
    description: 'Predict future trends with statistical models. Forecast revenue, demand, churn, and more with measurable accuracy.',
    color: 'from-sky-500 to-blue-500',
    bgColor: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: 'ri-brush-4-line',
    title: 'Data Cleaning',
    description: 'Messy data costs time and money. I clean, standardize, and structure your datasets so they\'re ready for analysis.',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    icon: 'ri-lightbulb-line',
    title: 'Business Intelligence',
    description: 'Build a data-driven culture with KPI tracking, automated reporting, and decision-support systems tailored to your business.',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: 'ri-settings-3-line',
    title: 'Automation',
    description: 'Automate repetitive data workflows — report generation, data pipelines, email alerts — and reclaim hours every week.',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    icon: 'ri-user-heart-line',
    title: 'Fractional Analytics',
    description: 'Ongoing data support without hiring a full-time analyst. Get strategy, execution, and insights on a retainer basis.',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
];

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/20 to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="badge-brand mb-4">What I Deliver</span>
          <h2 className="section-title mb-4">
            Analytics Solutions That{' '}
            <span className="gradient-text">Drive Business Results</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Every project is scoped around your business outcomes — not just technical specifications.
            Here&apos;s how I can help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass-card rounded-2xl p-6 card-hover cursor-default"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 ${hoveredIndex === index ? 'scale-110' : ''}`}>
                <i className={`${service.icon} text-xl ${service.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
