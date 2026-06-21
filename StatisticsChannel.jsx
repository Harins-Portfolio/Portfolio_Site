import React from 'react';
import { useGlobalState } from './GlobalState';
import LectureSectionBox from './LectureSectionBox';
import ServiceOfferSection from './ServiceOfferSection';
import ProjectProofCard from './ProjectProofCard';

const StatisticsChannel = () => {
  const { setActiveChannel } = useGlobalState();

  return (
    <div className="flex flex-col items-start w-full">
      <button
        onClick={() => setActiveChannel("Grid")}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      >
        ← Back to Solutions Hub
      </button>
      <h1 className="text-3xl font-extrabold text-[#0F172A]">Business Statistics & Decision Testing</h1>
      <p className="text-base text-[#475569] mb-6">
        I help businesses prove which pricing, promotion, or marketing decision actually works — before they spend another euro on the wrong strategy.
      </p>

      <div className="bg-[#F8FAFC] p-4 border border-[#E2E8F0] rounded-lg mb-5 w-full">
        <h2 className="text-base font-extrabold text-[#0F172A]">Strategic Analytics Built on a Single Source of Truth</h2>
        <p className="text-sm text-[#475569] leading-relaxed mt-2">
          Strategic statistical analysis is only valuable when it is based on consistent, trusted data. The Data Channel approach ensures every comparative test comes from the same certified source rather than fragmented spreadsheets.
        </p>
      </div>

      <ServiceOfferSection
        title="How I Deliver This For Your Business"
        subtitle="Statistical proof packaged for decision-makers who need a yes/no answer with confidence."
        offers={[
          [
            "STEP 01",
            "Frame the Business Question",
            "You get a testable question tied to money — not an open-ended analysis that never ends.",
            [
              "Translate your decision into a clear hypothesis (e.g. 'Does discount pricing beat standard pricing?')",
              "Identify the data you already have vs. what is missing",
              "Agree on the confidence level and timeline upfront",
            ],
          ],
          [
            "STEP 02",
            "Test & Compare",
            "You get statistical evidence that separates real trends from random noise.",
            [
              "Regression, ANOVA, or group comparison testing as the situation requires",
              "Visual summaries showing which option wins and by how much",
              "Plain-language interpretation of p-values and effect sizes",
            ],
          ],
          [
            "STEP 03",
            "Recommend & Act",
            "You get a decision memo your leadership team can act on immediately.",
            [
              "Go / no-go recommendation with supporting numbers",
              "Scenario forecasts for budget or pricing changes",
              "Full methodology documented on GitHub for audit or review",
            ],
          ],
        ]}
      />

      <hr className="border-t border-[#E2E8F0] my-6 w-full" />

      <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Proof: Projects Built With This Approach</h2>
      <p className="text-sm text-[#64748B] mb-4">Click any project to see the full business breakdown. GitHub links open the technical source.</p>
      <p className="text-sm text-[#64748B] mb-4">Badge legend: gray = demo dataset, orange = curated dataset. These labels make dataset provenance transparent for each proof card.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-16">
        <ProjectProofCard
          icon="megaphone"
          title="Marketing Mix & Sales Attribution Modeling"
          summary="Isolating multi-variable platform spending across 200 campaign iterations to map the optimal revenue mix."
          badges={[["Demo Dataset", "gray"], ["Business Intelligence Tool", "blue"]]}
          github_url="https://github.com/Harins-Portfolio/BusinessStatistics/tree/main/02_descriptive_analytics_storytelling"
          situation="A commercial firm needed to evaluate next-year plans and isolate which marketing budgets yield the best conversions while protecting capital."
          problem="Patterns across 200 historical campaign runs were scattered between TV, Radio, and Newspaper with no unified view."
          execution="Modeled multi-variable regressions, diagnostic checks, and scenario-based forecasts using Excel, Jamovi, and Orange."
          actionable="A budget optimization view comparing Scenarios 1, 2, and 3 to expose allocation leaks."
          roi="Lets marketing teams cut underperforming channels and reinvest in high-yield media with confidence."
        />
        <ProjectProofCard
          icon="dollar-sign"
          title="Statistical Impact of Pricing Strategies"
          summary="Comparing standard vs. discount pricing across retail locations to find what actually drives growth."
          badges={[["Demo Dataset", "gray"], ["Price Strategy", "blue"]]}
          github_url="https://github.com/Harins-Portfolio/BusinessStatistics/tree/main/02_descriptive_analytics_storytelling"
          situation="A retail business needed to know whether discount pricing actually drove more growth than standard pricing."
          problem="Sales results across multiple locations looked mixed, with no proof of which pricing approach was winning."
          execution="Inferential statistical testing to compare sales growth between pricing strategies with proper controls."
          actionable="A clear recommendation on which pricing strategy delivers measurable growth."
          roi="Stops margin-destroying discounts where they do not pay off and doubles down where they do."
        />
        <ProjectProofCard
          icon="pie-chart"
          title="Cross-Sectional Consumer Survey Profile"
          summary="Extracting actionable customer segment rules from messy primary survey records."
          badges={[["Demo Dataset", "gray"], ["Data Science Learning", "teal"]]}
          github_url="https://github.com/Harins-Portfolio/BusinessStatistics/tree/main/02_descriptive_analytics_storytelling"
          situation="A business needed to turn raw survey data into concrete pricing thresholds for local product pipelines."
          problem="Highly overlapping survey responses hid pure purchase intentions behind noise and clutter."
          execution="Factor analysis and PCA in Jamovi to reduce responses down to dominant customer segments."
          actionable="Clean segment profiles mapping customer value vs. sensitivity to promotions."
          roi="Helps marketing teams tailor pricing to high-value spenders vs. deal hunters without guesswork."
        />
        <ProjectProofCard
          icon="trending-up"
          title="Promotional Campaign ANOVA Analysis"
          summary="Testing which bank promotion converts best for new account openings across branch incentives."
          badges={[["Demo Dataset", "gray"], ["Campaign Effectiveness", "red"]]}
          github_url="https://github.com/Harins-Portfolio/BusinessStatistics/tree/main/04_predictive_modeling_clustering"
          situation="A retail banking platform needed to know which branch promotion actually drove new account openings."
          problem="Four different incentives were running in parallel with no proof of which one converted best."
          execution="One-Way ANOVA and group comparison testing across promotion types to isolate the winning offer."
          actionable="A ranked promotion recommendation ready for branch rollout planning."
          roi="Eliminates wasted incentive spend and focuses budget on the promotion that actually converts."
        />
      </div>

      {/* --- ACADEMIC CORE & THEORETICAL CAPABILITIES --- */}
      <h2 className="text-xl font-extrabold text-[#0F172A] mb-4">Academic Core & Theoretical Capabilities</h2>
      <div className="flex flex-col space-y-4 w-full mb-10">
        <LectureSectionBox
          sessionTitle="Session 1: Core Hypothesis Formulation"
          plainEnglish="Proves with mathematical certainty whether a process shift is an actual trend or just random noise."
          technicalBullets={[
            "Formulating complete Null Hypothesis (H0) vs Alternative Hypothesis (H1) maps for variance parameters.",
            "Utilizing statistical engines to evaluate p-value metrics against alpha thresholds (a = 0.05)."
          ]}
        />
      </div>
    </div>
  );
};

export default StatisticsChannel;