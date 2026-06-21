import React from 'react';

const ProjectComingSoonCard = ({ title, summary, toolLabel }) => {
  return (
    <div className="border border-dashed border-[#CBD5E1] rounded-lg p-4 bg-[#F8FAFC] w-full">
      <div className="flex items-center space-x-2">
        <div className="bg-[#F8FAFC] p-1.5 rounded-md border border-dashed border-[#94A3B8]">
          <span className="text-[#64748B] text-lg">
            <i className="ri-time-line"></i> {/* Assuming Remix Icon classes for clock */}
          </span>
        </div>
        <h3 className="text-base font-bold text-[#64748B]">{title}</h3>
      </div>
      <p className="text-sm text-[#64748B] mt-1">{summary}</p>
      <span className="inline-block px-2 py-1 text-xs font-bold rounded-md bg-gray-200 text-gray-800 mt-2">
        {toolLabel}
      </span>
      <p className="text-xs text-[#94A3B8] mt-2 italic">
        Proof project launching after class completion.
      </p>
    </div>
  );
};

export default ProjectComingSoonCard;