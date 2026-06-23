import React, { useState, useCallback } from 'react';
import OnboardingFlow from './sections/OnboardingFlow';
import ClientPortal from './components/ClientPortal';
import AdminDashboard from './components/AdminDashboard';
import Navigation from './components/Navigation';
import PortfolioProof from './sections/PortfolioProof';
import ConsultingSection from './sections/ConsultingSection';
import FAQSection from './sections/FAQSection';
import FinalCTA from './sections/FinalCTA';

const MODE = {
  ONBOARDING: 'onboarding',
  PORTAL: 'portal',
  ADMIN: 'admin',
};

function App() {
  const [mode, setMode] = useState(MODE.ONBOARDING);
  const [projectId, setProjectId] = useState(null);

  const handlePortalOpen = useCallback((id) => {
    setProjectId(id);
    setMode(MODE.PORTAL);
  }, []);

  const handleAdminToggle = useCallback(() => {
    setMode(prev => prev === MODE.ADMIN ? MODE.ONBOARDING : MODE.ADMIN);
  }, []);

  if (mode === MODE.ADMIN) {
    return <AdminDashboard onLogout={handleAdminToggle} />;
  }

  if (mode === MODE.PORTAL) {
    return (
      <div className="font-sans">
        <button
          onClick={() => setMode(MODE.ONBOARDING)}
          className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#0F172A] hover:bg-white transition-all flex items-center gap-2"
        >
          <i className="ri-arrow-left-line" /> New request
        </button>
        <ClientPortal projectId={projectId} />
      </div>
    );
  }

  return (
    <div className="font-sans">
      <Navigation />
      <button
        onClick={handleAdminToggle}
        className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl px-3 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        <i className="ri-shield-keyhole-line mr-1" />Admin
      </button>
      <OnboardingFlow onPortalOpen={handlePortalOpen} />
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
