const FinalCTA = ({ onStartProject }) => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fadeInUp">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 text-balance">
            Ready to Turn Your Data<br />
            <span className="text-brand-200">Into Business Decisions?</span>
          </h2>
          <p className="text-lg sm:text-xl text-brand-100/80 mb-10 max-w-2xl mx-auto">
            Submit your project in minutes. The AI assistant will help you scope everything out.
            No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartProject}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-all duration-200 shadow-lg shadow-black/10"
            >
              <i className="ri-rocket-line text-lg" />
              Start Your Project
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              <i className="ri-play-circle-line text-lg" />
              See How It Works
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-brand-200">
            <span className="flex items-center gap-1.5">
              <i className="ri-shield-check-line" /> No-risk submission
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-300/50" />
            <span className="flex items-center gap-1.5">
              <i className="ri-time-line" /> 48-hour response
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-300/50" />
            <span className="flex items-center gap-1.5">
              <i className="ri-lock-line" /> Secure & confidential
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
