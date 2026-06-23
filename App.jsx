import React, { useCallback } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import HowItWorks from './sections/HowItWorks';
import AIScopingAssistantSection from './sections/AIScopingAssistantSection';
import ProjectBuilder from './sections/ProjectBuilder';
import PortfolioProof from './sections/PortfolioProof';
import ConsultingSection from './sections/ConsultingSection';
import FAQSection from './sections/FAQSection';
import FinalCTA from './sections/FinalCTA';

function App() {
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="font-sans">
      <Navigation />
      <HeroSection onStartJourney={() => scrollToSection('how-it-works')} />
      <HowItWorks />
      <AIScopingAssistantSection />
      <ProjectBuilder />
      <PortfolioProof />
      <ConsultingSection />
      <FAQSection />
      <FinalCTA />

      <footer className="bg-[#0F172A] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Nikhil Harins. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/in/nikhilharins" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <i className="ri-linkedin-fill text-lg" />
            </a>
            <a href="https://github.com/Harins-Portfolio" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <i className="ri-github-fill text-lg" />
            </a>
            <a href="mailto:nikhil.harins@example.com" className="text-gray-500 hover:text-white transition-colors">
              <i className="ri-mail-fill text-lg" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
