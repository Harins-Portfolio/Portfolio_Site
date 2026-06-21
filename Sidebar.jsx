import React from 'react';
import SidebarLink from './SidebarLink';
import SidebarSocialIcon from './SidebarSocialIcon';

const Sidebar = () => {
  return (
    <div className="w-[280px] h-screen bg-[#0F172A] p-5 fixed left-0 top-0 z-50 flex flex-col">
      {/* Profile Frame */}
      <div className="flex flex-col items-center w-full py-4">
        <div className="flex justify-center w-full py-2">
          <img
            src="/profile.jpg"
            alt="Nikhil Harins"
            className="w-[110px] h-[110px] object-cover rounded-full border-4 border-[#F4F1DE] shadow-md"
          />
        </div>
        <h2 className="text-xl font-extrabold text-white text-center w-full">Nikhil Harins</h2>
        <p className="text-sm font-semibold text-[#F4F1DE] text-center w-full">Business Analyst</p>
      </div>

      <hr className="border-t border-gray-700 opacity-20 my-4" />

      {/* Navigation Link Stack */}
      <nav className="flex flex-col space-y-2 py-5">
        <SidebarLink icon="layout-dashboard" text="Dashboard" to="/" />
        <SidebarLink icon="lightbulb" text="My Solutions" to="/my-solutions" />
        <SidebarLink icon="briefcase" text="Case Studies" to="/case-studies" />
        <SidebarLink icon="user" text="About Me" to="/about-me" />
        <SidebarLink icon="mail" text="Contact" to="/contact" />
      </nav>

      <div className="flex-grow"></div> {/* Spacer */}

      {/* Social Footer Block */}
      <div className="flex flex-col w-full pb-2">
        <hr className="border-t border-gray-700 opacity-10 mb-4" />
        <div className="flex justify-center space-x-5 w-full">
          <SidebarSocialIcon icon="linkedin" url="https://linkedin.com/in/nikhilharins" />
          <SidebarSocialIcon icon="github" url="https://github.com" />
          <SidebarSocialIcon icon="mail" url="mailto:nikhil.harins@example.com" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
