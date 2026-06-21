import React from 'react';
import { useGlobalState } from './GlobalState';
import LectureSectionBox from './LectureSectionBox';
import ServiceOfferSection from './ServiceOfferSection';
import ProjectComingSoonCard from './ProjectComingSoonCard';

const DigitalTransformationChannel = () => {
  const { setActiveChannel } = useGlobalState();

  return (
    <div className="flex flex-col items-start w-full">
      <button
        onClick={() => setActiveChannel("Grid")}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      >
        Back to Solutions Hub
      </button>
      <h1 className="text-3xl font-extrabold text-[#0F172A]">Digital Transformation Strategy & Execution</h1>
      <p className="text-base text-[#475569] mb-6">
        I help businesses turn digital transformation from a vague technology project into a clear operating plan: better data, cleaner systems, measurable performance, and faster decisions.
      </p>

      <div className="bg-[#F8FAFC] p-4 border border-[#E2E8F0] rounded-lg mb-5 w-full">
        <h2 className="text-base font-extrabold text-[#0F172A]">Executive CVP: Digital Change That Pays Back</h2>
        <p className="text-sm text-[#475569] leading-relaxed mt-2">
          Digital transformation is not "buy software and hope." It is the redesign of how a business captures data, serves customers, controls performance, and connects systems like ERP, CRM, analytics, and workflows around one operating model.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-3">
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">The Problem</h3>
            <p className="text-xs text-[#475569] leading-relaxed">Most teams digitize tasks but never transform the business: manual handoffs stay, data remains trapped, and systems do not create better decisions.</p>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">My Solution</h3>
            <p className="text-xs text-[#475569] leading-relaxed">A practical transformation roadmap linking process redesign, data governance, systems architecture, customer value, and measurable adoption.</p>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">Business Result</h3>
            <p className="text-xs text-[#475569] leading-relaxed">Less waste, faster response cycles, cleaner customer visibility, stronger control, and a technology plan leadership can actually fund and monitor.</p>
          </div>
        </div>
      </div>

      <ServiceOfferSection
        title="How I Deliver This For Your Business"
        subtitle="A step-by-step transformation guide built from class concepts: impact, data-to-action, digital products, systems planning, control, ERP, and CRM."
        offers={[
          [
            "STEP 01",
            "Diagnose the Digital Gap",
            "You get a clear view of what is only digitized versus what is truly transformed.",
            [
              "Map current processes, systems, customer touchpoints, and data flows",
              "Identify bottlenecks, duplicated work, manual controls, and disconnected tools",
              "Prioritize high-impact problems by cost, risk, customer impact, and feasibility",
            ],
          ],
          [
            "STEP 02",
            "Design the Transformation Roadmap",
            "You get a practical operating model, not a wishlist of tools.",
            [
              "Define the target process, required data, ownership rules, and decision points",
              "Connect ERP, CRM, analytics, automation, and reporting needs into one plan",
              "Separate quick wins from structural changes that need budget and governance",
            ],
          ],
          [
            "STEP 03",
            "Control, Measure & Scale",
            "You get measurable adoption so the transformation survives after launch.",
            [
              "Set KPIs for efficiency, customer experience, data quality, and system usage",
              "Create control routines: dashboards, ownership checkpoints, and exception alerts",
              "Turn lessons learned into the next transformation cycle instead of a one-off project",
            ],
          ],
        ]}
      />

      <hr className="border-t border-[#E2E8F0] my-6 w-full" />

      <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Proof: Deliverables I Can Build From This Approach</h2>
      <p className="text-sm text-[#64748B] mb-4">
        Structured from UNIE Digital Transformation coursework. These are recruiter and stakeholder-facing assets that show how I would move from class theory to business execution.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-16">
        <ProjectComingSoonCard
          title="Digital Maturity & Process Audit"
          summary="A diagnostic report separating digitized tasks from true transformation opportunities across process, people, systems, data, and customer experience."
          toolLabel="Transformation Audit"
        />
        <ProjectComingSoonCard
          title="Data-to-Action Operating Model"
          summary="A blueprint showing how raw operational data becomes dashboards, decisions, automated actions, and measurable business outcomes."
          toolLabel="Data-to-Action"
        />
        <ProjectComingSoonCard
          title="Systems Master Plan"
          summary="A practical Plan Director de Sistemas connecting ERP, CRM, analytics, governance, integrations, and investment priorities."
          toolLabel="Systems Roadmap"
        />
        <ProjectComingSoonCard
          title="ERP & CRM Value Map"
          summary="A stakeholder map explaining how ERP improves internal control while CRM improves customer intelligence, retention, and commercial execution."
          toolLabel="ERP / CRM"
        />
      </div>

      <h2 className="text-xl font-extrabold text-[#0F172A] mb-4">Academic Core & Theoretical Capabilities</h2>
      <div className="flex flex-col space-y-4 w-full mb-10">
        <LectureSectionBox
          sessionTitle="Impact of Digital Transformation on Business"
          plainEnglish="Explains how digital change affects revenue models, operations, customer expectations, and competitive speed."
          technicalBullets={[
            "Distinguishing operational digitization from strategic business transformation.",
            "Mapping digital impact across process efficiency, customer value, data availability, and organizational change.",
          ]}
        />
        <LectureSectionBox
          sessionTitle="From Data to Action"
          plainEnglish="Turns information into decisions, controls, and repeatable action instead of passive reporting."
          technicalBullets={[
            "Designing the path from data capture to insight, decision, execution, and feedback.",
            "Defining ownership, quality checks, and KPI routines so data supports management action.",
          ]}
        />
        <LectureSectionBox
          sessionTitle="Systems, Control, ERP & CRM"
          plainEnglish="Connects technology choices to business control, customer management, and scalable execution."
          technicalBullets={[
            "Building systems planning around ERP, CRM, performance management, and methodical control.",
            "Using transformation governance to track adoption, risk, ROI, and continuous improvement.",
          ]}
        />
      </div>
    </div>
  );
};

export default DigitalTransformationChannel;
