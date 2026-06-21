import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import StickyBookingFooter from './StickyBookingFooter'; // Corrected path
import Dashboard from './Dashboard';
import MySolutions from './MySolutions';
import CaseStudies from './CaseStudies';
import About from './About';
import Contact from './Contact';
import { useGlobalState } from './GlobalState';

function App() {
  const { setCurrentPage } = useGlobalState();
  const location = useLocation();

  // Update global state based on current route
  React.useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    const pageName = path === '' ? 'Dashboard' : path.split('/')[0].replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    setCurrentPage(pageName);
  }, [location.pathname, setCurrentPage]);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />
      <div className="ml-[280px] p-12 w-[calc(100%-280px)] min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-solutions/*" element={<MySolutions />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about-me" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback for unknown routes */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
      <StickyBookingFooter />
    </div>
  );
}

export default App;