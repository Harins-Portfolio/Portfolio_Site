import React from 'react';

const Navigation = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📊</div>
          <div>
            <div className="text-lg font-bold">Nikhil Harins</div>
            <div className="text-sm text-gray-500">Data Analytics & Consulting</div>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <a href="#work" className="text-gray-600 hover:text-gray-900">Work</a>
          <a href="#consulting" className="text-gray-600 hover:text-gray-900">Services</a>
          <a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
          <a href="#start" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Get Help</a>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
