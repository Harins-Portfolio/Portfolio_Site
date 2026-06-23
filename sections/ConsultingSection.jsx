const ConsultingSection = ({ onStartProject }) => {
  return (
    <section id="consulting" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-bg p-1 shadow-2xl">
          <div className="rounded-3xl bg-white p-8 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fadeInLeft">
                <span className="badge-accent mb-4">Fractional Consulting</span>
                <h2 className="section-title mb-4">
                  Need Ongoing{' '}
                  <span className="gradient-text">Data Support?</span>
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-6">
                  Not ready for a full-time hire but need regular analytics help?
                  I act as your fractional data team — strategy, execution, and insights
                  delivered every month.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Monthly strategy calls and roadmap planning',
                    'Ongoing dashboard maintenance and updates',
                    'Ad-hoc analysis and reporting as needed',
                    'Priority response on project requests',
                    'Dedicated Slack channel for quick questions',
                  ].map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center shrink-0 mt-0.5">
                        <i className="ri-check-line text-accent-600 text-xs" />
                      </div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <button
                    onClick={onStartProject}
                    className="btn-primary text-base px-8 py-4"
                  >
                    <i className="ri-calendar-line text-lg" />
                    Book a Strategy Call
                  </button>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl font-bold gradient-text">€2,000</div>
                    <div className="text-sm text-gray-400">per month / starting rate</div>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex justify-center animate-fadeInRight">
                <div className="relative">
                  <div className="w-64 h-80 rounded-2xl gradient-bg p-1 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-gray-50 flex flex-col items-center justify-center p-8">
                      <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                        <i className="ri-team-line text-2xl text-brand-600" />
                      </div>
                      <h3 className="text-center font-bold text-gray-900 mb-2">Your Fractional<br />Data Team</h3>
                      <p className="text-center text-sm text-gray-500">Strategy + Execution</p>
                      <div className="mt-6 w-full space-y-2">
                        <div className="h-2 bg-brand-100 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-brand-500 to-violet-500 rounded-full" />
                        </div>
                        <div className="h-2 bg-brand-100 rounded-full overflow-hidden">
                          <div className="h-full w-1/2 bg-gradient-to-r from-brand-500 to-violet-500 rounded-full" />
                        </div>
                        <div className="h-2 bg-brand-100 rounded-full overflow-hidden">
                          <div className="h-full w-5/6 bg-gradient-to-r from-brand-500 to-violet-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                      <span className="text-sm font-medium text-gray-700">Available now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;
