import React from 'react';
import { useGlobalState } from './GlobalState';
import LectureSectionBox from './LectureSectionBox';
import ServiceOfferSection from './ServiceOfferSection';
import ProjectComingSoonCard from './ProjectComingSoonCard';

const AIStrategiesChannel = () => {
  const { setActiveChannel } = useGlobalState();

  return (
    <div className="flex flex-col items-start w-full">
      <button
        onClick={() => setActiveChannel("Grid")}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      >
        ← Back to Solutions Hub
      </button>
      <h1 className="text-3xl font-extrabold text-[#0F172A]">AI-Based Strategies for Businesses</h1>
      <p className="text-base text-[#475569] mb-6">
        Leveraging artificial intelligence to unlock new growth opportunities, optimize operations, and gain a competitive edge.
      </p>

      <div className="bg-[#F8FAFC] p-4 border border-[#E2E8F0] rounded-lg mb-5 w-full">
        <h2 className="text-base font-extrabold text-[#0F172A]">Executive CVP: AI as a Strategic Imperative</h2>
        <p className="text-sm text-[#475569] leading-relaxed mt-2">
          AI is no longer a futuristic concept; it's a present-day necessity for businesses looking to scale, innovate, and stay relevant. My approach focuses on practical, implementable AI strategies that deliver measurable ROI.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-3">
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">The Why</h3>
            <p className="text-xs text-[#475569] leading-relaxed">Businesses need to automate, predict, and personalize at scale to meet evolving market demands and customer expectations.</p>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">The Solution</h3>
            <p className="text-xs text-[#475569] leading-relaxed">Design and deploy custom AI models and intelligent automation systems tailored to specific business challenges and opportunities.</p>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">ROI Focus</h3>
            <p className="text-xs text-[#475569] leading-relaxed">Increased efficiency, enhanced decision-making, new revenue streams, and improved customer experiences through intelligent systems.</p>
          </div>
        </div>
      </div>

      <ServiceOfferSection
        title="How I Implement AI for Your Business"
        subtitle="A structured approach to integrating AI, from concept to deployment and beyond."
        offers={[
          [
            "PHASE 01",
            "Strategy & Feasibility",
            "Identify high-impact AI opportunities and assess technical and business feasibility.",
            [
              "AI readiness assessment & use case identification",
              "Data infrastructure review for AI model training",
              "ROI projection & strategic roadmap development",
            ],
          ],
          [
            "PHASE 02",
            "Development & Prototyping",
            "Build and test AI models, ensuring alignment with business objectives.",
            [
              "Custom model development (e.g., predictive, generative AI)",
              "Proof-of-concept & rapid prototyping",
              "Performance benchmarking & iterative refinement",
            ],
          ],
          [
            "PHASE 03",
            "Integration & Scaling",
            "Seamlessly integrate AI solutions into existing workflows and scale for enterprise use.",
            [
              "API development for AI model deployment",
              "Integration with existing CRM/ERP systems",
              "Monitoring, maintenance, and continuous improvement plans",
            ],
          ],
        ]}
      />

      <hr className="border-t border-[#E2E8F0] my-6 w-full" />

      <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Proof: AI Projects & Concepts</h2>
      <p className="text-sm text-[#64748B] mb-4">Explore conceptual and implemented AI projects demonstrating strategic application.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-16">
        <ProjectComingSoonCard
          title="Predictive Sales Forecasting Engine"
          summary="Leveraging historical sales data and external factors to forecast future sales with high accuracy."
          toolLabel="Python (TensorFlow/PyTorch) — Coming Soon"
        />
        <ProjectComingSoonCard
          title="Customer Service Chatbot with NLP"
          summary="Developing an intelligent chatbot to automate customer support, improve response times, and reduce operational costs."
          toolLabel="Python (NLTK/SpaCy) — Coming Soon"
        />
        <ProjectComingSoonCard
          title="Dynamic Pricing Optimization"
          summary="Implementing an AI-driven system to adjust product pricing in real-time based on demand, competition, and inventory."
          toolLabel="Python (Reinforcement Learning) — Coming Soon"
        />
      </div>

      {/* --- ACADEMIC CORE & THEORETICAL CAPABILITIES --- */}
      <h2 className="text-xl font-extrabold text-[#0F172A] mb-4">Academic Core & Theoretical Capabilities</h2>
      <div className="flex flex-col space-y-4 w-full mb-10">
        <LectureSectionBox
          sessionTitle="Foundations of Machine Learning for Business"
          plainEnglish="Understanding core ML algorithms and their direct application to business problems like prediction, classification, and clustering."
          technicalBullets={[
            "Supervised vs. Unsupervised Learning paradigms.",
            "Regression, Classification (Logistic Regression, SVM, Decision Trees, Random Forests).",
            "Clustering (K-Means, Hierarchical Clustering) for market segmentation.",
          ]}
        />
        <LectureSectionBox
          sessionTitle="Deep Learning & Neural Networks in Enterprise"
          plainEnglish="Exploring advanced AI architectures for complex pattern recognition, natural language processing, and image analysis."
          technicalBullets={[
            "Introduction to Neural Networks and Deep Learning concepts.",
            "Convolutional Neural Networks (CNNs) for image recognition.",
            "Recurrent Neural Networks (RNNs) and Transformers for NLP tasks.",
          ]}
        />
      </div>
    </div>
  );
};

export default AIStrategiesChannel;