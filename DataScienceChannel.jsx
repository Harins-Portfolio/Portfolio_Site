import React from 'react';
import { useGlobalState } from './GlobalState';
import LectureSectionBox from './LectureSectionBox';
import ServiceOfferSection from './ServiceOfferSection';
import ProjectProofCard from './ProjectProofCard';

const DataScienceChannel = () => {
  const { setActiveChannel } = useGlobalState();

  return (
    <div className="flex flex-col items-start w-full">
      <button
        onClick={() => setActiveChannel("Grid")}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      >
        ← Back to Solutions Hub
      </button>
      <h1 className="text-3xl font-extrabold text-[#0F172A]">Predictive Analytics & Data/ML Solutions</h1>
      <p className="text-base text-[#475569] mb-6">
        I help businesses stop guessing and start predicting — turning messy operational data into early warnings and revenue-saving decisions.
      </p>

      <div className="bg-[#F8FAFC] p-4 border border-[#E2E8F0] rounded-lg mb-5 w-full">
        <h2 className="text-base font-extrabold text-[#0F172A]">Business Value: Data exploitation, communication and visualization as a Competitive Asset</h2>
        <p className="text-sm text-[#475569] leading-relaxed mt-2">
          Data science should feed a unified analytics channel, not separate ad hoc experiments. The same Data Channel infrastructure that supports executive reporting also powers predictive models and operational alerts.
        </p>
      </div>

      <ServiceOfferSection
        title="How I Deliver This For Your Business"
        subtitle="A practical engagement model built for owners who need results, not jargon."
        offers={[
          [
            "STEP 01",
            "Discovery & Scope",
            "You get clarity on what question actually moves your revenue or cuts your costs.",
            [
              "30-minute business goal alignment session",
              "Defined success metric (cost saved, revenue protected, capacity recovered)",
              "Data audit checklist for your existing spreadsheets or systems",
            ],
          ],
          [
            "STEP 02",
            "Build & Validate",
            "You get a working model tested against your real business constraints — not a generic demo.",
            [
              "Clean, documented data pipeline from raw inputs to model-ready tables",
              "Predictive model with validation report you can read without a PhD",
              "Risk scoring or classification output tied to your KPI",
            ],
          ],
          [
            "STEP 03",
            "Deploy & Hand Off",
            "You get something your team can actually use after I leave.",
            [
              "Executive summary with recommended next actions",
              "GitHub repository or export your team can maintain",
              "Optional follow-up session to review early results",
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
          icon="activity"
          title="Operational Capacity Diagnostic Audit"
          summary="Isolating systemic client absenteeism trends across 20,000+ logs to reverse capacity waste."
          badges={[["Curated Dataset", "orange"], ["Proof of Concept", "gray"]]}
          github_url="https://github.com/Harins-Portfolio/NoShCapMax"
          situation="A healthcare operation faced a 20.2% appointment no-show rate, wasting staff hours, room capacity, and revenue every week."
          problem="Leadership had over 20,000 appointment records but no clear view of when, where, or why absenteeism was happening."
          execution="Exploratory data profiling across operational logs to separate random cancellations from repeatable no-show patterns."
          actionable="A diagnostic report showing the main drivers of absenteeism and where to intervene first."
          roi="Recovers lost appointment capacity and reduces the cost of empty slots without guessing at fixes."
        />
        <ProjectProofCard
          icon="layers"
          title="Predictive Customer Attrition Engine"
          summary="End-to-end ML classification pipeline to catch MRR erosion before clients leave."
          badges={[["Curated Dataset", "orange"], ["Production Script", "purple"]]}
          github_url="https://github.com/Harins-Portfolio/Churn"
          situation="A subscription business needed to protect monthly recurring revenue before customers quietly left."
          problem="Too many overlapping customer metrics made it hard to trust which signals actually predicted churn."
          execution="Built a full classification pipeline with correlation cleanup, model validation, and client-level risk scoring."
          actionable="A ranked list of at-risk accounts with clear drivers so sales or success teams can act early."
          roi="Protects recurring revenue by catching attrition before contracts lapse."
        />
      </div>

      {/* --- ACADEMIC CORE & THEORETICAL CAPABILITIES (CRISP-DM FRAMEWORKS) --- */}
      <h2 className="text-xl font-extrabold text-[#0F172A] mb-4">Academic Core & Theoretical Capabilities</h2>
      <div className="flex flex-col space-y-4 w-full mb-10">
        <LectureSectionBox
          sessionTitle="Lifecycle Architecture & Project Scoping (CRISP-DM)"
          plainEnglish="Ensures every technical model is directly tethered to a high-impact business objective, eliminating costly, directionless data projects."
          technicalBullets={[
            "Structured end-to-end analytical pipelines following the cross-industry standard process for data mining (CRISP-DM).",
            "Translated loose executive pain points into explicit statistical targets, defining clean operational bounds before a single line of code is deployed.",
            "Mapped predictive modeling lifecycles across business understanding, data preparation, modeling evaluation, and deployment tracks."
          ]}
        />
        <LectureSectionBox
          sessionTitle="Automated Data Sanitization, Ingestion & Quality Governance"
          plainEnglish="Eradicates the severe corporate risk of making critical strategic moves or training machine learning models on distorted, corrupt, or missing metrics."
          technicalBullets={[
            "Engineered robust multi-variable data conditioning pipelines featuring programmatic statistical median imputation to handle missing records without skewing structural distributions.",
            "Governed dataset restructuring protocols in full alignment with rigorous corporate data standards to convert chaotic tracking inputs into pristine tabular frameworks.",
            "Transformed complex, multi-tier categorical customer attributes into machine-readable mathematical validation matrices ready for classification training."
          ]}
        />
        <LectureSectionBox
          sessionTitle="Controlled Algorithmic Stability & Dimensional Stress Testing"
          plainEnglish="Guarantees that predictive forecasting engines remain structurally stable and highly accurate when exposed to shifting, real-world market distributions."
          technicalBullets={[
            "Benchmarked operational model stability by aggressively validating machine learning classifiers across asymmetrical training partitions (including 40/60 vs 75/25 distribution splits).",
            "Enforced rigorous feature-level multi-collinearity checks, applying a strict mathematical veto threshold to eliminate redundant, overlapping indicators.",
            "Optimized confusion matrix boundary metrics strictly against commercial parameters, explicitly minimizing costly False Negatives to protect monthly recurring revenue (MRR)."
          ]}
        />
      </div>
    </div>
  );
};

export default DataScienceChannel;