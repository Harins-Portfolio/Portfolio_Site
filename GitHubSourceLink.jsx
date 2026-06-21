import React from 'react';

const GitHubSourceLink = ({ url, label = "GitHub" }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-[#475569] hover:text-[#0F172A] no-underline hover:underline"
    >
      <span className="text-base"><i className="ri-github-fill"></i></span> {/* GitHub icon */}
      <span className="text-sm font-semibold">{label}</span>
      <span className="text-xs"><i className="ri-external-link-line"></i></span> {/* External link icon */}
    </a>
  );
};

export default GitHubSourceLink;