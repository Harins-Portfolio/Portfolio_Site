import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from './GlobalState';
import MentorProfileBox from './MentorProfileBox';

const Dashboard = () => {
  const { setCurrentPage } = useGlobalState();

  return (
    <div className="flex flex-col items-start w-full">
      {/* --- THE MASTHEAD (NEWSPAPER HEADER) --- */}
      <div className="flex flex-col w-full mb-5">
        <div className="flex justify-center w-full">
          <h1 className="text-5xl font-black text-[#0F172A] tracking-wider font-serif">
            THE BUSINESS LOGIC
          </h1>
        </div>
        <div className="flex items-center justify-between w-full border-y-4 border-double border-[#0F172A] py-1.5 mt-1.5">
          <p className="text-xs font-extrabold text-[#0F172A]">MADRID, ES</p>
          <div className="flex-grow"></div>
          <p className="text-xs font-extrabold text-[#64748B]">AUTOMATED STRATEGY & ANCHORED DATA</p>
          <div className="flex-grow"></div>
          <p className="text-xs font-extrabold text-[#0F172A]">VOL. I — NO. 2</p>
        </div>
      </div>

      {/* --- APPLICATION MANIFESTO (ABOUT THIS JOURNEY) --- */}
      <div className="bg-white p-5 border border-dashed border-[#0F172A] w-full mb-5">
        <p className="text-xs font-extrabold text-[#64748B] tracking-wider">READERS GUIDE / MISSION STATEMENT</p>
        <h2 className="text-lg font-extrabold text-[#0F172A] mt-1">Dismantling Complexity: The Navigation Manifesto</h2>
        <p className="text-sm text-[#334155] leading-relaxed">
          This digital platform operates as a transparent ledger of technical execution. As you navigate through the side channels, you will map a deliberate journey through my structural core capabilities: from rigorous classroom theory revisions and standalone practice diagnostics to production-ready market dashboards and real-world deployment operations. This architecture is custom-engineered to showcase data-driven insights and technical engineering protocols. I am actively positioning this network to secure corporate roles, mid-to-long-term freelance business contracts, and full-time consulting opportunities globally.
        </p>
      </div>

      {/* --- LEAD STORY: THESIS & ALL 6 MATRIX PREVIEW WINDOWS PLACEHOLDERS (FULL WIDTH) --- */}
      <div
        className="bg-white p-6 border-2 border-[#0F172A] w-full cursor-pointer hover:bg-[#F4F1DE] transition-colors duration-200 mb-5"
        onClick={() => setCurrentPage("My Solutions")}
      >
        <span className="inline-block px-2 py-1 text-xs font-bold rounded-md bg-gray-200 text-gray-800">EDITORIAL</span>
        <h2 className="text-2xl font-extrabold text-[#0F172A] leading-tight mt-1.5">
          Eliminating Corporate Guesswork: Moving From Gut Feeling to Data-Backed Certainty
        </h2>
        <p className="text-sm text-[#334155] leading-relaxed">
          Modern enterprise operations remain weighed down by speculative scheduling, fragmented spreadsheets, and unoptimized resource links. By deploying clean automated predictive models and structured statistical architectures, complexity is systematically dismantled. Explore the explicit breakdown of all six placeholder engineering channels aligned inside the master matrix:
        </p>

        {/* ALL 6 SOLUTION CHANNELS ENGRAVED AS FULL WIDTH PLACEHOLDERS (2 ROWS X 3 COLS) */}
        <div className="grid grid-cols-3 gap-3 w-full mt-3 mb-1.5">
          <div className="border border-dashed border-[#E2E8F0] p-3 bg-[#F8FAFC]">
            <p className="text-xs font-extrabold text-[#0F172A]">CH 1: Data Science</p>
            <p className="text-xs text-[#475569]">Predictive analytics pipelines, quantitative preprocessing, and algorithmic churn mitigation frameworks.</p>
          </div>
          <div className="border border-dashed border-[#E2E8F0] p-3 bg-[#F8FAFC]">
            <p className="text-xs font-extrabold text-[#0F172A]">CH 2: Business Statistics</p>
            <p className="text-xs text-[#475569]">Variance mapping matrices, strict null hypothesis configurations, and mathematical validation layers.</p>
          </div>
          <div className="border border-dashed border-[#E2E8F0] p-3 bg-[#F8FAFC]">
            <p className="text-xs font-extrabold text-[#0F172A]">CH 3: Exploitation & Visuals</p>
            <p className="text-xs text-[#475569]">Translating massive historical database sets directly into functional high-end executive dashboards.</p>
          </div>
          <div className="border border-dashed border-[#E2E8F0] p-3 bg-[#F8FAFC]">
            <p className="text-xs font-extrabold text-[#0F172A]">CH 4: AI Business Strategy</p>
            <p className="text-xs text-[#475569]">Architecting custom autonomous tools, predictive sales agents, and modern technical network layers.</p>
          </div>
          <div className="border border-dashed border-[#E2E8F0] p-3 bg-[#F8FAFC]">
            <p className="text-xs font-extrabold text-[#0F172A]">CH 5: Digital Transformation</p>
            <p className="text-xs text-[#475569]">Enterprise-grade architecture audits integrated seamlessly with robust relational database links.</p>
          </div>
          <div className="border border-dashed border-[#E2E8F0] p-3 bg-[#F8FAFC]">
            <p className="text-xs font-extrabold text-[#0F172A]">CH 6: Vibe Coding Engine</p>
            <p className="text-xs text-[#475569]">Real-time software deployment streams using advanced natural-language declarative code pipelines.</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 mt-2">
          <p className="text-xs font-extrabold text-[#0F172A]">OPEN MATRIX PLATFORM DISPATCHES</p>
          <span className="text-[#0F172A] text-sm"><i className="ri-arrow-right-line"></i></span>
        </div>
      </div>

      {/* --- FRONT PAGE DISPATCH: LIVE CASE STUDIES FEED (FULL WIDTH) --- */}
      <div
        className="bg-white p-6 border-2 border-[#0F172A] w-full cursor-pointer hover:bg-[#F4F1DE] transition-colors duration-200 mb-5"
        onClick={() => setCurrentPage("Case Studies")}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start space-y-0">
            <p className="text-xs font-extrabold text-[#64748B] tracking-wider">FRONT PAGE DISPATCH / PORTFOLIO LOGS</p>
            <h2 className="text-xl font-extrabold text-[#0F172A] leading-tight">Live Case Studies Feed: Analytics & Machine Learning In Production</h2>
          </div>
          <span className="inline-block px-2 py-1 text-xs font-bold rounded-md bg-indigo-600 text-white">3 Active Logs</span>
        </div>
        <hr className="border-t border-gray-300 my-2" />
        <p className="text-sm text-[#475569] leading-relaxed">
          Direct deployment logs charting real-world execution. These frameworks demonstrate raw data transformations, advanced dimensionality control, and automated classification systems designed to prevent operational losses.
        </p>

        <div className="flex flex-wrap space-x-2 space-y-2 mt-2 mb-2">
          <span className="px-2 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800">Predictive Attrition Pipeline</span>
          <span className="px-2 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800">One-Hot Encoding Schemas</span>
          <span className="px-2 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800">Correlation Noise Filters</span>
          <span className="px-2 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800">Jamovi Capacity Optimizers</span>
          <span className="px-2 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800">Power Pivot Risk Mapping</span>
          <span className="px-2 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800">Autonomous AI Strategy</span>
          <span className="px-2 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800">Odoo ERP Integration Engineering</span>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full mt-1.5 mb-1.5">
          <div className="border border-[#E2E8F0] p-3 bg-white rounded-md">
            <div className="flex items-center space-x-1">
              <span className="text-[#0F172A] text-sm"><i className="ri-activity-line"></i></span>
              <p className="text-xs font-extrabold">Diagnostic Log 01</p>
            </div>
            <p className="text-xs text-[#475569] mt-1">Healthcare Appointment No-Show Framework: Extracting operational friction via baseline PECO hypothesis testing.</p>
          </div>
          <div className="border border-[#E2E8F0] p-3 bg-white rounded-md">
            <div className="flex items-center space-x-1">
              <span className="text-[#0F172A] text-sm"><i className="ri-shield-line"></i></span>
              <p className="text-xs font-extrabold">Descriptive Log 02</p>
            </div>
            <p className="text-xs text-[#475569] mt-1">Multi-Year Road Safety Risk Matrix: Clean dimensional processing and cohort isolation built within Power Pivot models.</p>
          </div>
          <div className="border border-[#E2E8F0] p-3 bg-white rounded-md">
            <div className="flex items-center space-x-1">
              <span className="text-[#0F172A] text-sm"><i className="ri-layers-line"></i></span>
              <p className="text-xs font-extrabold">Predictive Log 03</p>
            </div>
            <p className="text-xs text-[#475569] mt-1">Algorithmic Revenue Churn Engine: Noise reduction via high-correlation heatmap filters to classify attrition threats early.</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 mt-1.5">
          <p className="text-xs font-extrabold text-[#0F172A]">ACCESS ALL DEPLOYED CASE STUDIES FEED</p>
          <span className="text-[#0F172A] text-sm"><i className="ri-arrow-right-line"></i></span>
        </div>
      </div>

      {/* --- EXPANDED INSTITUTIONAL CREDENTIALS INFRASTRUCTURE (FULL WIDTH) --- */}
      <div className="bg-white p-6 border border-[#0F172A] w-full mb-5">
        <p className="text-xs font-extrabold text-[#64748B] tracking-wider">INSTITUTIONAL METRICS & ACADEMIC GROUNDING</p>
        <div className="flex items-end space-x-2 mt-1">
          <h2 className="text-xl font-extrabold text-[#0F172A]">Master's Degree in Business Analytics</h2>
          <p className="text-base font-semibold text-[#475569]">— UNIE Universidad Internacional de la Empresa</p>
        </div>
        <p className="text-sm text-[#334155] mb-3">
          Rigorous curriculum tracking across 5 core operational dimensions, evaluating automated software design, mathematical validation metrics, and predictive deployment schemas.
        </p>

        <div className="grid grid-cols-5 gap-3 w-full">
          {/* Metric Boxes - shortened for brevity, follow pattern */}
          <div className="flex flex-col items-start space-y-0 border border-[#E2E8F0] p-3 bg-[#F8FAFC] w-full">
            <p className="text-xs text-[#64748B] font-extrabold">DATA SCIENCE PIPELINES</p>
            <p className="text-2xl font-black text-[#0F172A]">0.85 Filter</p>
            <p className="text-xs text-[#334155]">Correlation limit applied to drop multi-collinear variables.</p>
          </div>
          <div className="flex flex-col items-start space-y-0 border border-[#E2E8F0] p-3 bg-[#F8FAFC] w-full">
            <p className="text-xs text-[#64748B] font-extrabold">BUSINESS STATISTICS</p>
            <p className="text-2xl font-black text-[#0F172A]">α = 0.05</p>
            <p className="text-xs text-[#334155]">Strict hypothesis validation threshold using p-value limits.</p>
          </div>
          <div className="flex flex-col items-start space-y-0 border border-[#E2E8F0] p-3 bg-[#F8FAFC] w-full">
            <p className="text-xs text-[#64748B] font-extrabold">VISUALIZATION METRICS</p>
            <p className="text-2xl font-black text-[#0F172A]">5 Modules</p>
            <p className="text-xs text-[#334155]">Translating heavy operational data to clean UI components.</p>
          </div>
          <div className="flex flex-col items-start space-y-0 border border-[#E2E8F0] p-3 bg-[#F8FAFC] w-full">
            <p className="text-xs text-[#64748B] font-extrabold">AI CORE STRATEGIES</p>
            <p className="text-2xl font-black text-[#0F172A]">Autonomous</p>
            <p className="text-xs text-[#334155]">Architecting predictive tools for corporate sales networks.</p>
          </div>
          <div className="flex flex-col items-start space-y-0 border border-[#E2E8F0] p-3 bg-[#F8FAFC] w-full">
            <p className="text-xs text-[#64748B] font-extrabold">DIGITAL TRANSFORMATION</p>
            <p className="text-2xl font-black text-[#0F172A]">ERP Mapping</p>
            <p className="text-xs text-[#334155]">Auditing structures using robust database integrations.</p>
          </div>
        </div>
      </div>

      {/* --- REFACTORED AUTHORITY / MENTORSHIP PANEL (7 PROFILES MATRIX, FULL WIDTH) --- */}
      <div className="bg-white p-6 border border-[#0F172A] w-full mb-16">
        <p className="text-xs font-extrabold text-[#64748B] tracking-wider">MY MENTORS</p>
        <h2 className="text-xl font-extrabold text-[#0F172A]">Guided by Leading Enterprise Operators & Predictive Database Scholars</h2>

        <div className="grid grid-cols-3 gap-3 w-full mt-4">
          <MentorProfileBox name="Prof. [Scholar Name 1]" title="Predictive Modeling Field Researcher" />
          <MentorProfileBox name="Prof. [Scholar Name 2]" title="Enterprise Business Intelligence Architect" />
          <MentorProfileBox name="Dr. [Scholar Name 3]" title="Advanced Quantitative Pipeline Director" />
          <MentorProfileBox name="Director [Name 4]" title="FinTech Sales Operations Lead" />
          <MentorProfileBox name="Prof. [Scholar Name 5]" title="Machine Learning Dimension Systems Analyst" />
          <MentorProfileBox name="VP [Executive Name 6]" title="High-Ticket Commercial Pipeline Strategist" />
          <MentorProfileBox name="Dr. [Scholar Name 7]" title="Database Integration & Architecture Advisor" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;