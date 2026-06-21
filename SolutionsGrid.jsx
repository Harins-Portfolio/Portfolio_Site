import React from 'react';
import SolutionGridCard from './SolutionGridCard';

const SolutionsGrid = () => {
  return (
    <div className="flex flex-col items-start w-full">
      <h1 className="text-3xl font-extrabold text-[#0F172A]">What I Offer</h1>
      <p className="text-base text-[#475569] mb-6">
        Explore my operational frameworks, classroom core theory revisions, and strategic analytics applications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-16">
        <SolutionGridCard title="1. Data/ML" description="Business solutions with predictive modeling." icon="code-s-slash" channelId="DS" />
        <SolutionGridCard title="2. Statistics" description="Hypothesis testing, variance mapping, and removing systemic risks through mathematical certainty." icon="calculator" channelId="STATS" />
        <SolutionGridCard title="3. Data exploitation, communication and visualization" description="Establishing a Single Source of Truth with Power Query, Power Pivot and executive reporting workflows." icon="bar-chart-box" channelId="VIS" />
        <SolutionGridCard title="4. AI-Based Business Strategies" description="Architecting and deploying autonomous systems, custom agents, and predictive toolkits into active sales networks." icon="cpu" channelId="AI" />
        <SolutionGridCard title="5. Digital Transformation" description="Auditing architecture and engineering core database integrations using enterprise ERP frameworks." icon="refresh" channelId="DX" />
        <SolutionGridCard title="6. Vibe Coding" description="Deploying advanced software architectures and reactive web tools at the absolute speed of natural language." icon="code-s" channelId="VIBE" />
      </div>
    </div>
  );
};

export default SolutionsGrid;