import React from 'react';

const MentorProfileBox = ({ name, title }) => {
  return (
    <div className="flex items-center space-x-3 p-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg w-full">
      <img
        src="/mentor_placeholder.jpg"
        alt={name}
        className="w-11 h-11 object-cover rounded-full border-2 border-[#0F172A]"
      />
      <div className="flex flex-col items-start space-y-0">
        <p className="text-sm font-extrabold text-[#0F172A]">{name}</p>
        <p className="text-xs text-[#64748B]">{title}</p>
      </div>
      <div className="flex-grow"></div> {/* Spacer */}
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-600 hover:text-[#0F172A] hover:underline"
      >
        Profile →
      </a>
    </div>
  );
};

export default MentorProfileBox;