import { useState, useCallback } from 'react';
import Navigation from './components/Navigation';
import ClientPortal from './components/ClientPortal';
import AdminDashboard from './components/AdminDashboard';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import CaseStudiesSection from './sections/CaseStudiesSection';
import HowItWorksSection from './sections/HowItWorksSection';
import ConsultingSection from './sections/ConsultingSection';
import FAQSection from './sections/FAQSection';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';
import OnboardingFlow from './sections/OnboardingFlow';

const MODE = {
  LANDING: 'landing',
  ONBOARDING: 'onboarding',
  PORTAL: 'portal',
  ADMIN: 'admin',
};

function App() {
  const [mode, setMode] = useState(MODE.LANDING);
  const [projectId, setProjectId] = useState(null);

  const handleStartProject = useCallback(() => {
    setMode(MODE.ONBOARDING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePortalOpen = useCallback((id) => {
    setProjectId(id);
    setMode(MODE.PORTAL);
  }, []);

  const handleAdminToggle = useCallback(() => {
    setMode(prev => prev === MODE.ADMIN ? MODE.LANDING : MODE.ADMIN);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToLanding = useCallback(() => {
    setMode(MODE.LANDING);
    setProjectId(null);
  }, []);

  if (mode === MODE.ADMIN) {
    return <AdminDashboard onLogout={handleAdminToggle} />;
  }

  if (mode === MODE.PORTAL) {
    return <ClientPortal projectId={projectId} onLogout={handleBackToLanding} />;
  }

  if (mode === MODE.ONBOARDING) {
    return (
      <div>
        <button
          onClick={handleBackToLanding}
          className="fixed top-4 left-4 z-50 glass rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all flex items-center gap-2 shadow-sm"
        >
          <i className="ri-arrow-left-line" />
          Back
        </button>
        <OnboardingFlow active={true} onPortalOpen={handlePortalOpen} />
      </div>
    );
  }

  return (
    <div className="font-sans">
      <Navigation onStartProject={handleStartProject} />
      <HeroSection onStartProject={handleStartProject} />
      <ServicesSection />
      <CaseStudiesSection />
      <HowItWorksSection />
      <ConsultingSection onStartProject={handleStartProject} />
      <FAQSection />
      <FinalCTA onStartProject={handleStartProject} />
      <Footer />

      <button
        onClick={handleAdminToggle}
        className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl px-3 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        <i className="ri-shield-keyhole-line mr-1" />Admin
      </button>
    </div>
  );
}

export default App;
