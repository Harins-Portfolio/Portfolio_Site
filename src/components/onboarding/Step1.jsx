import React from 'react';

const serviceTypes = [
  { id: 'dashboard', icon: 'ri-dashboard-line', title: 'Dashboard', desc: 'Interactive Power BI or web dashboard' },
  { id: 'reporting', icon: 'ri-file-chart-line', title: 'Reporting', desc: 'Automated reports & executive summaries' },
  { id: 'forecasting', icon: 'ri-line-chart-line', title: 'Forecasting', desc: 'Predictive models & trend analysis' },
  { id: 'cleaning', icon: 'ri-brush-4-line', title: 'Data Cleaning', desc: 'Clean, structure & standardize data' },
  { id: 'analytics', icon: 'ri-bar-chart-box-line', title: 'Analytics', desc: 'Deep analysis & actionable insights' },
  { id: 'automation', icon: 'ri-settings-3-line', title: 'Automation', desc: 'Automate workflows & data pipelines' },
  { id: 'consulting', icon: 'ri-user-heart-line', title: 'Consulting', desc: 'Strategy & fractional data support' },
  { id: 'other', icon: 'ri-more-line', title: 'Other', desc: 'Something else — describe it' },
];

const Step1 = ({ onNext }) => {
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-brand-50/30">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full animate-fadeInUp">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100/80 rounded-full text-brand-700 text-sm font-medium mb-4 border border-brand-200/50">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Step 1 of 6
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              What do you need help with?
            </h1>
            <p className="text-lg text-gray-500">
              Choose the category that best describes your project.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {serviceTypes.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelected(service.id)}
                className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                  selected === service.id
                    ? 'border-brand-500 bg-brand-50 shadow-md shadow-brand-500/10'
                    : 'border-gray-100 bg-white hover:border-brand-200 hover:shadow-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                  selected === service.id ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  <i className={`${service.icon} text-lg`} />
                </div>
                <div className="text-sm font-semibold text-gray-900">{service.title}</div>
                <div className="text-xs text-gray-400 mt-0.5 hidden sm:block">{service.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => onNext({ project_type: selected })}
              disabled={!selected}
              className="btn-primary text-base px-10 py-4"
            >
              Continue
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
