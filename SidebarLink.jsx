import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from './GlobalState';

const SidebarLink = ({ icon, text, to }) => {
  const { currentPage, setCurrentPage } = useGlobalState();
  const isActive = currentPage === text;

  const handleClick = () => {
    setCurrentPage(text);
  };

  return (
    <Link to={to} onClick={handleClick} className={`
      flex items-center w-full p-3 rounded-lg transition-all duration-200 cursor-pointer
      ${isActive ? 'bg-[#F4F1DE] text-[#0F172A]' : 'text-white hover:bg-[#F4F1DE] hover:text-[#0F172A]'}
    `}>
      <span className={`mr-3 ${isActive ? 'text-[#0F172A]' : 'text-white group-hover:text-[#0F172A]'}`}>
        <i className={`ri-${icon}-line text-xl`}></i> {/* Assuming Remix Icon classes */}
      </span>
      <span className="text-[15px] font-bold">{text}</span>
    </Link>
  );
};

export default SidebarLink;