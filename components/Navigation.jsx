import React from 'react';

const Navigation = ({ onStartProject }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xs shadow-sm">
              NH
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-gray-900">Nikhil Harins</div>
              <div className="text-xs text-gray-400">Data Analytics & Consulting</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <a href="#services" className="btn-ghost text-sm">Services</a>
            <a href="#work" className="btn-ghost text-sm">Case Studies</a>
            <a href="#how-it-works" className="btn-ghost text-sm">How It Works</a>
            <a href="#faq" className="btn-ghost text-sm">FAQ</a>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <button
              onClick={onStartProject}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Start a Project
            </button>
          </nav>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className={`text-xl text-gray-600 ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slideDown">
            <div className="flex flex-col gap-1">
              <a href="#services" className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-brand-600 hover:bg-brand-50" onClick={() => setMobileOpen(false)}>Services</a>
              <a href="#work" className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-brand-600 hover:bg-brand-50" onClick={() => setMobileOpen(false)}>Case Studies</a>
              <a href="#how-it-works" className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-brand-600 hover:bg-brand-50" onClick={() => setMobileOpen(false)}>How It Works</a>
              <a href="#faq" className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-brand-600 hover:bg-brand-50" onClick={() => setMobileOpen(false)}>FAQ</a>
              <div className="pt-2">
                <button
                  onClick={() => { setMobileOpen(false); onStartProject(); }}
                  className="btn-primary text-sm w-full"
                >
                  Start a Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
