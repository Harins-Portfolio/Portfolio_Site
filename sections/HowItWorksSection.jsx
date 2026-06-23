const steps = [
  {
    number: '01',
    icon: 'ri-file-add-line',
    title: 'Submit Project',
    description: 'Tell me what you need. The AI assistant helps you scope the problem in minutes.',
    color: 'bg-brand-500',
  },
  {
    number: '02',
    icon: 'ri-search-line',
    title: 'Define Scope',
    description: 'The AI asks targeted questions to build a structured project brief with clear deliverables.',
    color: 'bg-violet-500',
  },
  {
    number: '03',
    icon: 'ri-check-double-line',
    title: 'Project Accepted',
    description: 'I review your submission and accept with a confirmed timeline and fixed price.',
    color: 'bg-accent-500',
  },
  {
    number: '04',
    icon: 'ri-code-line',
    title: 'Work Begins',
    description: 'You get access to your client portal where you can track progress in real time.',
    color: 'bg-sky-500',
  },
  {
    number: '05',
    icon: 'ri-upload-cloud-line',
    title: 'Deliverables Uploaded',
    description: 'Completed work is uploaded to the portal. You\'ll see everything is ready.',
    color: 'bg-amber-500',
  },
  {
    number: '06',
    icon: 'ri-secure-payment-line',
    title: 'Payment',
    description: 'Pay securely via Stripe. Your deliverables remain locked until payment is confirmed.',
    color: 'bg-rose-500',
  },
  {
    number: '07',
    icon: 'ri-download-cloud-line',
    title: 'Download Results',
    description: 'Deliverables unlock instantly. Download your reports, dashboards, and files forever.',
    color: 'bg-emerald-500',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-subtle pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="badge-brand mb-4">The Process</span>
          <h2 className="section-title mb-4">
            From Problem to Solution in{' '}
            <span className="gradient-text">7 Simple Steps</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A transparent, guided process designed for busy decision makers.
            No back-and-forth emails, no confusion.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-accent-500 to-emerald-500 -translate-x-1/2 opacity-30" />

          <div className="space-y-8 lg:space-y-16">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${isLeft ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                    <div className={`max-w-md ${isLeft ? 'lg:ml-auto' : ''} animate-fadeInUp`} style={{ animationDelay: `${index * 0.15}s` }}>
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${step.color} text-white text-xs font-bold mb-2`}>
                        {step.number}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-brand-200 shadow-sm z-10 shrink-0">
                    <div className={`w-5 h-5 rounded-full ${step.color}`} />
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600">Average project turnaround: 3-7 business days</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
