import React from 'react';

const SidebarSocialIcon = ({ icon, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F4F1DE] hover:scale-110 transition-all duration-200">
      <span className="text-xl">
        <i className={`ri-${icon}-line`}></i> {/* Assuming Remix Icon classes */}
      </span>
    </a>
  );
};

export default SidebarSocialIcon;