import React from 'react';
import { useGlobalState } from './GlobalState';
import LectureSectionBox from './LectureSectionBox';
import ServiceOfferSection from './ServiceOfferSection';
import ProjectProofCard from './ProjectProofCard';
import ProjectComingSoonCard from './ProjectComingSoonCard';

const VibeCodingChannel = () => {
  const { setActiveChannel } = useGlobalState();
  const portfolioRepo = "https://github.com/Harins-Portfolio/portfolio-site";

  return (
    <div className="flex flex-col items-start w-full">
      <button
        onClick={() => setActiveChannel("Grid")}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      >
        Back to Solutions Hub
      </button>
      <h1 className="text-3xl font-extrabold text-[#0F172A]">Vibe Coding & AI-Assisted Product Builds</h1>
      <p className="text-base text-[#475569] mb-6">
        I help founders, recruiters, and business teams turn rough ideas into usable digital products fast: clear scope, working frontend, clean copy, GitHub source, and a product story people can understand.
      </p>

      <div className="bg-[#F8FAFC] p-4 border border-[#E2E8F0] rounded-lg mb-5 w-full">
        <h2 className="text-base font-extrabold text-[#0F172A]">Executive CVP: From Idea to Working Product Faster</h2>
        <p className="text-sm text-[#475569] leading-relaxed mt-2">
          Vibe coding is not random prompting. It is a structured human-AI workflow for rapid prototyping: define the business problem, shape the user experience, build the interface, test the result, and document the implementation so it can keep improving.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-3">
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">The Problem</h3>
            <p className="text-xs text-[#475569] leading-relaxed">Many teams have ideas, spreadsheets, or service offers, but no usable product surface to show stakeholders, test demand, or generate leads.</p>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">My Solution</h3>
            <p className="text-xs text-[#475569] leading-relaxed">I use React, Vite, Tailwind, GitHub, and AI-assisted development loops to turn the idea into a working MVP with business-first copy and clean structure.</p>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">Business Result</h3>
            <p className="text-xs text-[#475569] leading-relaxed">A faster path to validation: a live-ready product, reusable codebase, sharper positioning, and a portfolio artifact that proves execution.</p>
          </div>
        </div>
      </div>

      <ServiceOfferSection
        title="How I Deliver This For Your Business"
        subtitle="A practical build workflow for MVPs, portfolio sites, internal tools, dashboards, and lead-generation pages."
        offers={[
          [
            "STEP 01",
            "Define the Product Intent",
            "You get a tight product brief before code starts moving.",
            [
              "Clarify the user, business goal, core workflow, and success metric",
              "Turn loose ideas into page sections, components, data needs, and calls to action",
              "Decide what should be built now versus parked for a later version",
            ],
          ],
          [
            "STEP 02",
            "Build the MVP Interface",
            "You get a working product surface, not a slide deck about one.",
            [
              "Implement responsive React components with Tailwind CSS",
              "Use AI-assisted coding to move quickly while keeping human review on structure and copy",
              "Connect reusable cards, dialogs, navigation, service sections, and project proof views",
            ],
          ],
          [
            "STEP 03",
            "Test, Package & Improve",
            "You get a codebase and story that can be shown to users, recruiters, or stakeholders.",
            [
              "Run local builds and fix JSX, import, and layout issues",
              "Document the project in GitHub with business context and technical stack",
              "Use feedback loops to refine positioning, usability, and the next feature sprint",
            ],
          ],
        ]}
      />

      <hr className="border-t border-[#E2E8F0] my-6 w-full" />

      <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Proof: Projects Built With This Approach</h2>
      <p className="text-sm text-[#64748B] mb-4">
        These case studies show the actual human-AI development strategy: business positioning, frontend implementation, GitHub source control, and iterative improvement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-16">
        <ProjectProofCard
          icon="window"
          title="Portfolio & Consulting Website"
          summary="A React, Vite, and Tailwind platform built to serve both recruiters and consulting leads across data, analytics, AI, and digital transformation."
          badges={[["GitHub Repo", "gray"], ["React / Vite", "blue"], ["AI-Assisted Build", "purple"]]}
          github_url={portfolioRepo}
          situation="A portfolio needed to do more than list projects. It had to explain service offers, prove technical range, and create a credible business-facing consulting surface."
          problem="The existing material was spread across coursework, projects, GitHub ideas, and service concepts with no unified product experience."
          execution="Built a channel-based React app using Vite and Tailwind CSS, reusable proof cards, service offer sections, dialogs, and business-first copy for each capability."
          actionable="A live-ready portfolio platform that frames six core value propositions: data science, statistics, visualization, AI strategy, digital transformation, and vibe coding."
          roi="Helps recruiters see capability fast and gives business owners a clearer path to request consulting support instead of just browsing a resume."
        />
        <ProjectComingSoonCard
          title="Rapid MVP Landing Page Sprint"
          summary="A one-week build package for founders or small teams who need a polished product page, lead form structure, and GitHub-backed implementation."
          toolLabel="MVP Sprint"
        />
        <ProjectComingSoonCard
          title="Internal Tool Prototype"
          summary="A lightweight React interface for turning repetitive operational work into a simple workflow, dashboard, or decision-support screen."
          toolLabel="Internal Tools"
        />
        <ProjectComingSoonCard
          title="AI Workflow Integration Demo"
          summary="A practical demo showing how AI can support copywriting, research synthesis, task routing, or repeatable business workflows."
          toolLabel="AI Workflow"
        />
      </div>

      <h2 className="text-xl font-extrabold text-[#0F172A] mb-4">Capability Core & Practical Method</h2>
      <div className="flex flex-col space-y-4 w-full mb-10">
        <LectureSectionBox
          sessionTitle="AI-Assisted Software Development"
          plainEnglish="Uses AI as a build partner while keeping human judgment on architecture, business logic, and final quality."
          technicalBullets={[
            "Prompting, reviewing, patching, and testing code in short development loops.",
            "Using React, Vite, Tailwind CSS, reusable components, and GitHub as the delivery base.",
          ]}
        />
        <LectureSectionBox
          sessionTitle="Rapid Prototyping & MVP Delivery"
          plainEnglish="Turns early business ideas into working product surfaces that stakeholders can click, evaluate, and fund."
          technicalBullets={[
            "Converting product intent into information architecture, UI sections, and implementation tasks.",
            "Prioritizing the smallest useful version before expanding into deeper integrations.",
          ]}
        />
        <LectureSectionBox
          sessionTitle="Human-AI Collaboration Workflow"
          plainEnglish="Combines speed with control: AI accelerates execution, but the final product remains clear, useful, and business-led."
          technicalBullets={[
            "Maintaining a feedback loop between user goals, code changes, build verification, and copy refinement.",
            "Documenting business context, methodology, stack, and impact so the project is easy to evaluate.",
          ]}
        />
      </div>
    </div>
  );
};

export default VibeCodingChannel;
