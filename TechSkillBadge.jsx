import React from 'react';

const TechSkillBadge = ({ name }) => {
  return (
    <div className="flex items-center space-x-2 bg-[#F4F1DE] border border-[#0F172A] px-3 py-2 rounded-md">
      <span className="text-[#0F172A] text-base">
        <i className="ri-check-line"></i> {/* Assuming Remix Icon classes */}
      </span>
      <span className="text-sm font-bold text-[#0F172A]">{name}</span>
    </div>
  );
};

export default TechSkillBadge;