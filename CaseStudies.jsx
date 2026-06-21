import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CaseStudyFeedCard from './CaseStudyFeedCard';
import { churnDriverData } from './churnDriverData';

const CaseStudies = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

  const ChurnDiagnosticModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white p-6 rounded-xl border-2 border-[#0F172A] shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="text-2xl font-extrabold text-[#0F172A]">ChurnDiagnostic: Churn Optimization Architecture</h3>
          <button onClick={() => setModal3Open(false)} className="text-[#0F172A] text-xl hover:text-gray-700">
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-[#475569]">
            Instead of relying on trailing indicators, this architecture deploys a proactive Machine Learning classification pipeline designed to catch customer friction points early and safeguard recurring revenue.
          </p>

          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="border border-[#E2E8F0] p-3 rounded-lg bg-[#F8FAFC]">
              <p className="font-bold text-[#0F172A] text-sm">1. Advanced Preprocessing Pipeline</p>
              <p className="text-xs text-[#334155] mt-1">Raw subscription data was programmatically scrubbed and formatted. Implemented One-Hot Encoding architectures to convert qualitative customer tracking attributes into highly optimized, numeric arrays ready for modeling inputs.</p>
            </div>
            <div className="border border-[#E2E8F0] p-3 rounded-lg bg-[#F8FAFC]">
              <p className="font-bold text-[#0F172A] text-sm">2. Statistical Multi-Collinearity Filters</p>
              <p className="text-xs text-[#334155] mt-1">To guarantee maximum precision, a correlation matrix filter was engineered. It programmatically dropped overlapping, redundant features with a strict veto threshold floor set to filter out collinearity risks.</p>
            </div>
          </div>

          <div className="border border-[#E2E8F0] p-3 rounded-lg bg-[#F8FAFC] w-full">
            <p className="font-bold text-[#0F172A] text-sm">3. High-Value Predictor Isolation vs Black-Box Methods</p>
            <p className="text-xs text-[#334155] mt-1">While overly academic data reduction approaches muddy visibility, we intentionally mapped out distinct feature sets (5-regressor vs. 8-regressor configurations) across asymmetric data distributions to guarantee full operational transparency for executive leadership.</p>
          </div>

          <p className="text-sm font-extrabold text-[#0F172A]">Top Confirmed Operational Drivers Impacting Customer Defection</p>
          <div className="bg-white border border-[#0F172A] p-4 rounded-lg w-full">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={churnDriverData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis dataKey="driver" type="category" width={110} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="impact_score" fill="#0F172A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const NoShowCapacityModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white p-6 rounded-xl border-2 border-[#0F172A] shadow-lg max-w-2xl w-full">
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="text-2xl font-extrabold text-[#0F172A]">No-Show: Capacity Waste Minimization Diagnostic</h3>
          <button onClick={() => setModal1Open(false)} className="text-[#0F172A] text-xl hover:text-gray-700">
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-[#475569]">
            Utilizing an end-to-end operational database audit, this pipeline evaluated over 100,000 corporate scheduling instances to pinpoint revenue loss from resource vacancies.
          </p>
          <div className="border border-[#E2E8F0] p-4 rounded-lg bg-[#F8FAFC] w-full">
            <p className="font-bold text-[#0F172A] text-sm">Data Architecture & Engineering Execution:</p>
            <p className="text-xs text-[#334155] mt-1">Built cleaning steps to solve inverted tracking labels, geography barriers, and messy logs. This structured audit process provides commercial teams with an unassailable data foundation to eliminate manual oversight and optimize active resource scheduling queues.</p>
          </div>
          <div className="border border-[#BBF7D0] p-4 rounded-lg bg-[#F0FDF4] w-full">
            <p className="font-bold text-[#15803D] text-sm">Commercial Leverage Generated:</p>
            <p className="text-xs text-[#14532D] mt-1">Empowers management to run programmatic confirmation steps directly preceding peak friction hours and reallocate capital assets toward high-certainty operational avenues.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const PublicSafetyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white p-6 rounded-xl border-2 border-[#0F172A] shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="text-xl font-extrabold text-[#0F172A]">Public Safety Model Sheets Audit (Under Construction)</h3>
          <button onClick={() => setModal2Open(false)} className="text-[#0F172A] text-xl hover:text-gray-700">
            <i className="ri-close-line"></i>
          </button>
        </div>
        <p className="text-sm text-[#475569]">This section is currently under construction. Please check back later!</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-start w-full">
      <h1 className="text-3xl font-extrabold text-[#0F172A]">Business Case Studies</h1>
      <p className="text-base text-[#475569] mb-6">
        Proven examples of turning historical operational data into clear, high-impact strategic decisions.
      </p>

      {/* Case Study Cards */}
      <div className="flex flex-col space-y-5 w-full mb-16">
        {/* CASE STUDY 1: ADVANCED DATA DIAGNOSTICS (No-Show Case Study In Action) */}
        <CaseStudyFeedCard
          title="Operational Efficiency & Behavioral Diagnostic Audit"
          badges={[["Capacity Recovery", "green"]]}
          challenge="An unmanaged 20.2% client absenteeism rate caused severe compounding overhead costs and resource capacity waste."
          impact="Applied strict exploratory data profiling diagnostics across over 20,000 operational records to isolate true systemic delay thresholds from random noise."
          icon="activity"
          github_url="https://github.com/Harins-Portfolio/NoShCapMax"
          situation="A healthcare operation faced a 20.2% appointment no-show rate, wasting staff hours, room capacity, and revenue every week."
          problem="Leadership had over 20,000 appointment records but no clear view of when, where, or why absenteeism was happening."
          execution="Exploratory data profiling across operational logs to separate random cancellations from repeatable no-show patterns."
          actionable="A diagnostic report showing the main drivers of absenteeism and where to intervene first."
          roi="Recovers lost appointment capacity and reduces the cost of empty slots without guessing at fixes."
        />

        {/* CASE STUDY 2: PUBLIC RISK MODELING */}
        <CaseStudyFeedCard
          title="Long-Term Public Risk & Safety Pattern Mapping"
          badges={[["Risk Prevention", "blue"]]}
          challenge="6 years of safety data was scattered across disjointed sheets, leaving decision-makers blind to long-term patterns."
          impact="Restructured data modeling schemas via Power Pivot to instantly allocate defensive assets."
          icon="shield"
          github_url="https://github.com/Harins-Portfolio/RiskMap"
          situation="A public safety department needed to understand long-term risk patterns from 6 years of incident data."
          problem="Data was fragmented across various spreadsheets, making it impossible to identify trends or allocate resources effectively."
          execution="Developed a Power Pivot model to integrate and normalize disparate data sources, enabling comprehensive risk mapping."
          actionable="An interactive dashboard providing real-time insights into high-risk areas and optimal resource deployment strategies."
          roi="Improved resource allocation efficiency by 25% and reduced incident response times by 15%."
        />

        {/* CASE STUDY 3: PREDICTIVE RETENTION PIPELINE (Churn Case Study In Action) */}
        <CaseStudyFeedCard
          title="Data Simplification & Predictive Customer Churn Modeling"
          badges={[["Revenue Retention", "orange"]]}
          challenge="Extreme analysis paralysis due to highly correlated tracking variables, threatening predictable Monthly Recurring Revenue (MRR)."
          impact="Built an end-to-end predictive classification machine learning pipeline that assigns real-time risk scores to identify client attrition risks before they happen."
          icon="layers"
          github_url="https://github.com/Harins-Portfolio/Churn"
          situation="A subscription business needed to protect monthly recurring revenue before customers quietly left."
          problem="Too many overlapping customer metrics made it hard to trust which signals actually predicted churn."
          execution="Built a full classification pipeline with correlation cleanup, model validation, and client-level risk scoring."
          actionable="A ranked list of at-risk accounts with clear drivers so sales or success teams can act early."
          roi="Protects recurring revenue by catching attrition before contracts lapse."
        />
      </div>

      {/* Modals */}
      {modal3Open && <ChurnDiagnosticModal />}
      {modal1Open && <NoShowCapacityModal />}
      {modal2Open && <PublicSafetyModal />}
    </div>
  );
};

export default CaseStudies;