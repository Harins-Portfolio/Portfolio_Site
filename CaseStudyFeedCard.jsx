import React from 'react';
import CaseStudyDialog from './CaseStudyDialog';
import GitHubSourceLink from './GitHubSourceLink';

const CaseStudyFeedCard = ({
  title,
  badges,
  challenge,
  impact,
  icon,
  github_url,
  situation,
  problem,
  execution,
  actionable,
  roi,
}) => {
  const analyticsBreakdownButton = (
    <button
      className="bg-[#0F172A] text-white font-bold py-2 px-4 rounded-md hover:bg-[#1E293B] transition-colors duration-200"
    >
      View Full Analytics Breakdown
    </button>
  );

  return (
    <div className="bg-white border-2 border-[#0F172A] rounded-xl p-6 shadow-[4px_4px_0px_#0F172A] w-full">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center space-x-3 flex-wrap">
            <h3 className="text-lg font-extrabold text-[#0F172A]">{title}</h3>
            {badges.map(([name, scheme], index) => (
              <span key={index} className={`px-2 py-1 text-xs font-bold rounded-md ${
                scheme === 'gray' ? 'bg-gray-200 text-gray-800' :
                scheme === 'green' ? 'bg-green-200 text-green-800' :
                scheme === 'purple' ? 'bg-purple-200 text-purple-800' :
                scheme === 'orange' ? 'bg-orange-200 text-orange-800' :
                scheme === 'blue' ? 'bg-blue-200 text-blue-800' : ''
              }`}>
                {name}
              </span>
            ))}
          </div>
          <p className="text-sm text-[#334155] mt-2"><span className="font-bold">The Challenge: </span>{challenge}</p>
          <p className="text-sm text-[#0F172A] mt-1"><span className="font-bold text-[#0F172A]">Business Impact: </span>{impact}</p>
          <div className="flex items-center justify-between w-full mt-4">
            <CaseStudyDialog {...{ title, situation, problem, execution, actionable, roi, github_url, trigger: analyticsBreakdownButton }} />
            <GitHubSourceLink url={github_url} />
          </div>
        </div>
        <div className="bg-[#F4F1DE] p-4 rounded-lg border border-[#0F172A]">
          <span className="text-[#0F172A] text-3xl">
            <i className={`ri-${icon}-line`}></i> {/* Assuming Remix Icon classes */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyFeedCard;