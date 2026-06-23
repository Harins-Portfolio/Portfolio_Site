import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
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
          <button onClick={() => scrollTo('portfolio')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-[#0F172A] hover:bg-gray-100' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
            Examples
          </button>
          <button onClick={() => scrollTo('faq')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-[#0F172A] hover:bg-gray-100' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
            FAQ
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
