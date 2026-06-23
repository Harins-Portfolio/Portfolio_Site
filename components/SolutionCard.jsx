import React from 'react';

const SolutionCard = ({ channel, selected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(channel.id)}
      className={`group relative text-left w-full border-2 rounded-2xl p-6 transition-all duration-300 ${
        selected
          ? 'border-[#0F172A] bg-[#F8FAFC] shadow-lg scale-[1.02]'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-[#0F172A] rounded-full flex items-center justify-center">
          <i className="ri-check-line text-white text-xs" />
        </div>
      )}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${channel.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <i className={`${channel.icon} text-white text-xl`} />
      </div>
      <h3 className="font-bold text-[#0F172A] text-lg mb-1">{channel.title}</h3>
      <p className="text-sm font-medium text-gray-500 mb-3">{channel.tagline}</p>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{channel.description}</p>
      <div className="space-y-1.5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">What you get:</p>
        {channel.deliverables.map((d, i) => (
          <div key={i} className="flex items-start gap-2">
            <i className={`ri-check-line ${channel.textAccent} text-sm mt-0.5 shrink-0`} />
            <span className="text-sm text-gray-600">{d}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Examples:</p>
        <div className="flex flex-wrap gap-1.5">
          {channel.examples.map((ex, i) => (
            <span key={i} className={`text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600 font-medium`}>
              {ex}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default SolutionCard;
