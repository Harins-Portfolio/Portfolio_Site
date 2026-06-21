import React from 'react';
import TechSkillBadge from './TechSkillBadge';

const About = () => {
  return (
    <div className="flex flex-col items-start w-full">
      <h1 className="text-3xl font-extrabold text-[#0F172A]">About My Approach</h1>
      <p className="text-base text-[#475569] mb-6">
        A specialist in transforming raw complexity into strategic commercial growth.
      </p>

      <div className="bg-white p-8 border-2 border-[#0F172A] rounded-xl shadow-[5px_5px_0px_#0F172A] w-full mb-16">
        <div className="flex flex-col items-start">
          <h2 className="font-extrabold text-[#0F172A]">Philosophy:</h2>
          <p className="text-sm text-[#334155] leading-relaxed mt-1">
            I specialize in taking massive, unorganized datasets and distilling them into a single, actionable truth for stakeholders. My focus is always on cost reduction, risk mitigation, and operational transparency.
          </p>
          <hr className="border-t border-gray-300 my-4 w-full" />

          <h2 className="font-extrabold text-[#0F172A] mb-3">Technical Frameworks & Tooling Stack:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
            <TechSkillBadge name="Python (Scikit-Learn)" />
            <TechSkillBadge name="Advanced SQL Queries" />
            <TechSkillBadge name="Excel Power Query" />
            <TechSkillBadge name="Excel Power Pivot" />
            <TechSkillBadge name="Jamovi Statistical Engine" />
            <TechSkillBadge name="Predictive Data Pipelines" />
            <TechSkillBadge name="Principal Component Analysis" />
            <TechSkillBadge name="Executive Dashboarding" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;