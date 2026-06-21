import React from 'react';
import CaseStudyDialog from './CaseStudyDialog';
import GitHubSourceLink from './GitHubSourceLink';

const ProjectProofCard = ({
  icon,
  title,
  summary,
  badges,
  github_url,
  situation,
  problem,
  execution,
  actionable,
  roi,
}) => {
  const triggerContent = (
    <div className="flex flex-col items-start h-full">
      <div className="flex items-center space-x-2">
        <div className="bg-[#F4F1DE] p-1.5 rounded-md border border-[#0F172A]">
          <span className="text-[#0F172A] text-lg">
            <i className={`ri-${icon}-line`}></i> {/* Assuming Remix Icon classes */}
          </span>
        </div>
        <h3 className="text-base font-bold text-[#0F172A]">{title}</h3>
      </div>
      <p className="text-sm text-[#475569] mt-1">{summary}</p>
      <div className="flex flex-wrap space-x-2 mt-2">
        {badges.map(([name, scheme], index) => (
          <span key={index} className={`px-2 py-1 text-xs font-bold rounded-md ${
            scheme === 'gray' ? 'bg-gray-200 text-gray-800' :
            scheme === 'purple' ? 'bg-purple-200 text-purple-800' :
            scheme === 'orange' ? 'bg-orange-200 text-orange-800' :
            scheme === 'blue' ? 'bg-blue-200 text-blue-800' : ''
          }`}>
            {name}
          </span>
        ))}
      </div>
      <div className="flex-grow"></div> {/* Spacer */}
      <div className="flex items-center justify-between w-full mt-4">
        <span className="text-sm font-bold text-[#0F172A] underline">Launch Project View →</span>
        <GitHubSourceLink url={github_url} label="GitHub Source" />
      </div>
    </div>
  );

  return (
    <CaseStudyDialog
      {...{ title, situation, problem, execution, actionable, roi, github_url, trigger: triggerContent }}
    />
  );
};

export default ProjectProofCard;