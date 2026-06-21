import React from 'react';
import { useGlobalState } from './GlobalState';

const SolutionGridCard = ({ title, description, icon, channelId }) => {
  const { setActiveChannel } = useGlobalState();

  return (
    <div
      className="bg-white border-2 border-[#0F172A] rounded-xl p-6 shadow-[4px_4px_0px_#0F172A] cursor-pointer transition-all duration-150 ease-in-out
                 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0F172A]"
      onClick={() => setActiveChannel(channelId)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="bg-[#F4F1DE] p-2 rounded-lg border border-[#0F172A]">
          <span className="text-[#0F172A] text-2xl">
            <i className={`ri-${icon}-line`}></i> {/* Assuming Remix Icon classes */}
          </span>
        </div>
        <span className="text-[#64748B] text-lg">
          <i className="ri-arrow-right-line"></i> {/* Assuming Remix Icon classes */}
        </span>
      </div>
      <h3 className="text-lg font-extrabold text-[#0F172A] mt-3">{title}</h3>
      <p className="text-sm text-[#475569] leading-relaxed">{description}</p>
    </div>
  );
};

export default SolutionGridCard;