import React from 'react';
import { useGlobalState } from './GlobalState';
import ServiceOfferSection from './ServiceOfferSection';
import ProjectProofCard from './ProjectProofCard';
import ProjectComingSoonCard from './ProjectComingSoonCard';

const VisualizationChannel = () => {
  const { setActiveChannel } = useGlobalState();
  const visRepo = "https://github.com/Harins-Portfolio/DataExploitation";

  return (
    <div className="flex flex-col items-start w-full">
      <button
        onClick={() => setActiveChannel("Grid")}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      >
        ← Back to Solutions Hub
      </button>
      <h1 className="text-3xl font-extrabold text-[#0F172A]">Data Exploitation, Dashboards & Executive Reporting</h1>
      <p className="text-base text-[#475569] mb-6">
        I help businesses escape spreadsheet chaos — connecting scattered files, databases, and reports into one clear view your leadership team can act on.
      </p>

      <div className="bg-[#F8FAFC] p-4 border border-[#E2E8F0] rounded-lg mb-5 w-full">
        <h2 className="text-base font-extrabold text-[#0F172A]">Executive CVP: Data exploitation, communication and visualization as a Strategic Asset</h2>
        <p className="text-sm text-[#475569] leading-relaxed mt-2">
          A Data exploitation, communication and visualization is not an IT project. It is a revenue-enabling operating asset that creates a Single Source of Truth, eliminates reporting friction, and unlocks faster, more confident executive decisions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-3">
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">The Why</h3>
            <p className="text-xs text-[#475569] leading-relaxed">Fragmented, siloed, and manual data processes create decision latency, unreliable reporting, and wasted operational hours.</p>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">The Solution</h3>
            <p className="text-xs text-[#475569] leading-relaxed">Implement a Data Channel that delivers a Single Source of Truth, automated refreshes, and live executive insight without creating yet another reporting silo.</p>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg">
            <h3 className="text-sm font-extrabold text-[#0F172A]">ROI Focus</h3>
            <p className="text-xs text-[#475569] leading-relaxed">Efficiency: -60% report preparation time. Accuracy: -80% manual errors. Agility: decisions shifted from weekly to daily.</p>
          </div>
        </div>
      </div>

      <ServiceOfferSection
        title="How I Deliver This For Your Business"
        subtitle="From messy files to decision-ready dashboards — without forcing you to replace everything you already use."
        offers={[
          [
            "STEP 01",
            "Audit Your Data Landscape",
            "You get a honest map of where your numbers live and what is blocking fast decisions.",
            [
              "Review of Excel files, exports, SQL databases, and manual reports",
              "List of duplicate data, broken lookups, and reporting bottlenecks",
              "Agreed priority: what leadership needs to see first",
            ],
          ],
          [
            "STEP 02",
            "Build the Pipeline & Model",
            "You get automated refresh paths instead of copy-paste every Monday morning.",
            [
              "Power Query flows to combine or append multi-source data",
              "SQL queries or Power Pivot models for clean business logic",
              "Validated metrics your team trusts (one version of the truth)",
            ],
          ],
          [
            "STEP 03",
            "Communicate & Hand Off",
            "You get visuals and summaries executives understand — not raw tables.",
            [
              "Pivot tables, Power BI dashboards, or Excel reporting packs",
              "Plain-language answers to your top business questions",
              "Documented workflow your team can maintain after delivery",
            ],
          ],
        ]}
      />

      <hr className="border-t border-[#E2E8F0] my-6 w-full" />

      <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Proof: Projects Built With This Approach</h2>
      <p className="text-sm text-[#64748B] mb-4">
        Structured from UNIE Explotación, Visualización y Comunicación de Datos Empresariales coursework. GitHub links will point to your repo as you publish each project.
      </p>
      <p className="text-sm text-[#64748B] mb-4">Badge legend: gray = demo dataset, orange = curated dataset. These labels make dataset provenance transparent for each proof card.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-16">
        <ProjectProofCard
          icon="server"
          title="Data Channel Audit & Single Source of Truth"
          summary="A unified Data Channel blueprint using Power Query, Power Pivot, and Excel governance to turn fragmented reports into one trusted business asset."
          badges={[["Demo Dataset", "gray"], ["Data Channel", "purple"], ["Power Query", "blue"]]}
          github_url={visRepo}
          situation="A commercial analytics team needed fast answers but faced fractured order, product, and transaction datasets."
          problem="Multiple disconnected reports caused duplicate work, inconsistent KPIs, and slow weekly reconciliations."
          execution="Built a Data Channel around Power Query merges, append flows, advanced lookup logic, and a governance-ready data model."
          actionable="A reproducible Data Channel that supports live executive reporting and self-service analysis."
          roi="Reduces reporting latency, eliminates inconsistent metrics, and turns data from a cost center into a trusted strategic asset."
        />
        <ProjectProofCard
          icon="git-merge"
          title="Power Query — Multi-Table Order Intelligence"
          summary="Merged clients, products, and orders into one query-driven table with pivot-ready logistics metrics."
          badges={[["Curated Dataset", "orange"], ["Power Query", "blue"], ["Combinar", "orange"]]}
          github_url={`${visRepo}/tree/main/power-query-combinar`}
          situation="A distribution business tracked clients, products, and orders in three separate Excel files with no unified view."
          problem="Leadership could not answer basic questions: top products by units, order volume by city, or cubic meter load per region."
          execution="Power Query merge of lb_clientes, lb_productos, and lb_pedidos with a calculated m³ metric and pivot analysis."
          actionable="One refreshed table answering product rankings, Valladolid/Barcelona/Vigo order patterns, and total volume in millions of m³."
          roi="Turns disconnected spreadsheets into a repeatable sales and logistics reporting engine."
        />
        <ProjectProofCard
          icon="shield"
          title="Multi-Year Road Safety Risk Matrix"
          summary="Appended seven years of Uruguay traffic fatality records into a single analytical workbook with risk segmentation."
          badges={[["Curated Dataset", "orange"], ["Power Query", "blue"], ["Annexar", "orange"], ["Risk Analysis", "red"]]}
          github_url={`${visRepo}/tree/main/power-query-road-safety`}
          situation="Public safety stakeholders needed a longitudinal view of road fatalities, not isolated yearly files."
          problem="Seven yearly CSV files (2013–2019) sat in separate tabs with no combined trend, age, vehicle, or location analysis."
          execution="Power Query append into a Total table, date/time extraction, descriptive analysis tab, and documented answers tab."
          actionable="Year-over-year accident counts, vehicle/role breakdowns, high-risk segments, peak months, and most dangerous localities."
          roi="Supports policy and prevention decisions with evidence instead of anecdote — matches your dashboard 'Descriptive Log 02' case."
        />
        <ProjectProofCard
          icon="database"
          title="SQL Business Data Consulting Layer"
          summary="Enterprise SQL queries across customers, sales, products, and channels — filtering, grouping, and multi-table joins."
          badges={[["Curated Dataset", "orange"], ["SQL", "purple"], ["Consulting Exercise", "blue"]]}
          github_url={`${visRepo}/tree/main/sql-data-consulting`}
          situation="A retail analytics team needed trusted answers from a relational database without waiting on IT for every report."
          problem="Business questions — Asia country counts, credit-limit segments, top products by quantity, promotion filters — required ad hoc SQL."
          execution="10 structured consulting queries on SH schema tables (COUNTRIES, CUSTOMERS, SALES, PRODUCTS, CHANNELS) with documented answers."
          actionable="Reusable query patterns for segmentation, aggregation, ordering, and inner joins leadership can request on demand."
          roi="Proves you can sit between business owners and the database — translating questions into precise SQL fast."
        />
        <ProjectProofCard
          icon="layout-grid"
          title="Power Pivot Dimensional Modeling"
          summary="Star-schema data model in Excel linking fact and dimension tables for interactive slice-and-dice analysis."
          badges={[["Curated Dataset", "orange"], ["Power Pivot", "indigo"], ["In Progress", "gray"]]}
          github_url={`${visRepo}/tree/main/power-pivot-modeling`}
          situation="A finance or operations team had flat Excel tables but needed drill-down analysis like a real BI system."
          problem="Standard pivot tables could not handle relationships across multiple business entities without manual prep."
          execution="Power Pivot model built from Modelo de datos_inicio.xlsx through tabla_Excel_con_PP.xlsx (Clase 7 coursework)."
          actionable="Linked dimensional model ready for KPI exploration by region, product, time, or customer segment."
          roi="Bridges Excel comfort with enterprise-grade modeling before a full Power BI rollout."
        />
        <ProjectComingSoonCard
          title="Power BI Executive Dashboards"
          summary="Live-connected dashboards for leadership — next module after Power Pivot completion."
          toolLabel="Power BI — Coming Soon"
        />
      </div>
    </div>
  );
};

export default VisualizationChannel;