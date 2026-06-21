import React, { useState } from 'react';

const SpearNarrative = ({ situation, problem, execution, actionable, roi }) => {
  return (
    <div className="flex flex-col space-y-3 mt-3 text-sm text-[#334155]">
      <p><span className="font-bold">S – Situation & Business Metric: </span>{situation}</p>
      <p><span className="font-bold">P – Problem (The Data Mess): </span>{problem}</p>
      <p><span className="font-bold">E – Execution & Tooling: </span>{execution}</p>
      <p><span className="font-bold">A – Actionable Deliverable: </span>{actionable}</p>
      <p><span className="font-bold">R – ROI / Commercial Takeaway: </span>{roi}</p>
    </div>
  );
};

const CaseStudyDialog = ({
  title,
  situation,
  problem,
  execution,
  actionable,
  roi,
  github_url,
  trigger,
  maxWidth = "550px",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {trigger}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-lg border-2 border-[#0F172A] shadow-lg" style={{ maxWidth }}>
            <h3 className="text-xl font-extrabold text-[#0F172A]">Case Study: {title}</h3>
            <SpearNarrative
              situation={situation}
              problem={problem}
              execution={execution}
              actionable={actionable}
              roi={roi}
            />
            <div className="flex justify-end space-x-3 mt-5">
              <a href={github_url} target="_blank" rel="noopener noreferrer" className="bg-[#0F172A] text-white font-bold py-2 px-4 rounded-md hover:bg-[#1E293B]">Open GitHub Codebase</a>
              <button onClick={() => setIsOpen(false)} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300">Close Window</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CaseStudyDialog;