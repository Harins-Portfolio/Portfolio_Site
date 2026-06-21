import React from 'react';

const StickyBookingFooter = () => {
  return (
    <div
      className="fixed bottom-0 left-[280px] w-[calc(100%-280px)] bg-[#0F172A] border-t-2 border-[#0F172A]
                 p-4 z-40 shadow-[0px_-4px_20px_rgba(15,23,42,0.15)] flex items-center justify-between"
    >
      <div className="flex items-center space-x-2">
        <span className="text-[#F4F1DE] text-lg">
          <i className="ri-calendar-line"></i> {/* Assuming Remix Icon classes */}
        </span>
        <p className="text-base font-extrabold text-white tracking-wide">Book a meeting now.</p>
      </div>
      <a
        href="https://calendly.com/your-username"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          className="bg-[#F4F1DE] text-[#0F172A] text-sm font-black py-2 px-4 rounded-md border border-[#0F172A]
                     hover:translate-y-[-1px] hover:bg-white transition-all duration-200"
        >
          LAUNCH CALENDLY SCHEDULER →
        </button>
      </a>
    </div>
  );
};

export default StickyBookingFooter;