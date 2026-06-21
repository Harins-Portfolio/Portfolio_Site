import React from 'react';

const LectureSectionBox = ({ sessionTitle, plainEnglish, technicalBullets }) => {
  return (
    <div className="border border-[#E2E8F0] p-5 rounded-lg bg-white w-full">
      <h3 className="text-base font-extrabold text-[#0F172A]">{sessionTitle}</h3>
      <div className="bg-[#F4F1DE] px-3 py-2 rounded-md w-full my-2">
        <p className="text-sm text-[#0F172A]">
          <span className="font-bold">Commercial Impact: </span>
          {plainEnglish}
        </p>
      </div>
      <ul className="flex flex-col items-start space-y-1 w-full mt-2">
        {technicalBullets.map((bullet, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-[#64748B] text-base">
              <i className="ri-checkbox-blank-circle-fill"></i> {/* Assuming Remix Icon for dot */}
            </span>
            <p className="text-sm text-[#334155]">{bullet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LectureSectionBox;