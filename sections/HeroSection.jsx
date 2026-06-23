const trustIndicators = [
  'Power BI', 'Excel', 'SQL', 'Python', 'Machine Learning', 'Data Strategy'
];

const HeroSection = ({ onStartProject }) => {
  return (
    <section className="relative min-h-screen gradient-bg-subtle overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100/80 backdrop-blur-sm rounded-full text-brand-700 text-sm font-medium mb-6 border border-brand-200/50">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Data analytics consulting — accept new projects
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Turn Your Business Data{' '}
              <span className="gradient-text">Into Decisions.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-8 max-w-xl">
              Need a dashboard, report, forecast, analysis, automation, or data solution?
              Describe the problem and I&apos;ll build the answer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={onStartProject}
                className="btn-primary text-base px-8 py-4 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30"
              >
                <i className="ri-rocket-line text-lg" />
                Start a Project
              </button>
              <a
                href="#work"
                className="btn-secondary text-base px-8 py-4"
              >
                <i className="ri-eye-line text-lg" />
                See Previous Work
              </a>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Trusted Tools & Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {trustIndicators.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center animate-fadeInRight">
            <div className="relative">
              <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-2xl gradient-bg p-1 shadow-2xl shadow-brand-500/20">
                <div className="w-full h-full rounded-2xl bg-white overflow-hidden flex flex-col items-center justify-center">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <img
                        src="./Profile.pg.jpg"
                        alt="Nikhil Harins"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center pb-4 lg:pb-6">
                    <h3 className="text-3xl font-bold text-gray-900">Nikhil Harins</h3>
                    <p className="text-gray-500 text-lg">Data Analytics Consultant</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-float">
                <i className="ri-line-chart-line text-2xl" />
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <i className="ri-database-2-line text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
