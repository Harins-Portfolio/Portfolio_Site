import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Request', href: '#request' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Consulting', href: '#consulting' },
  { label: 'FAQ', href: '#faq' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a
          href="#"
          className={`font-black text-lg tracking-tight transition-colors ${isScrolled ? 'text-[#0F172A]' : 'text-white'}`}
        >
          NH<span className="text-blue-500">.</span>Analytics
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-[#0F172A] hover:bg-gray-100' : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleClick('#request')}
            className="ml-2 bg-[#0F172A] text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-[#1E293B] transition-colors"
          >
            Start Request
          </button>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            isScrolled ? 'text-[#0F172A] hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
        >
          <i className={`${isMobileOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`} />
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-[#0F172A] hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleClick('#request')}
              className="w-full bg-[#0F172A] text-white text-sm font-bold px-5 py-3 rounded-lg hover:bg-[#1E293B] transition-colors mt-2"
            >
              Start Your Request
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
