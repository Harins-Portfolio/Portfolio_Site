import React, { useState } from 'react';

const faqs = [
  {
    q: 'What does pricing look like?',
    a: 'Projects start from €100 and are scoped based on complexity, data volume, and deliverable requirements. You set your budget in the request form, and I will confirm whether it aligns with the scope. I reserve the right to reject projects that are significantly underpriced to maintain quality standards.',
  },
  {
    q: 'How fast can you deliver?',
    a: 'Most projects are delivered within 24–72 hours after proposal approval. Complex projects involving machine learning or large-scale data engineering may take 1–2 weeks. A specific deadline is agreed upon before work begins.',
  },
  {
    q: 'How do you handle confidential data?',
    a: 'All client data is treated as strictly confidential. Files are stored securely in Supabase with row-level security. I never share, reuse, or expose client data. Upon project completion, you can request permanent deletion of your data from my systems.',
  },
  {
    q: 'What if I need revisions?',
    a: 'Every project includes up to 2 rounds of revisions to ensure the deliverables meet your expectations. Additional revision rounds can be scoped separately. The revision process is clearly outlined in the proposal before work starts.',
  },
  {
    q: 'How does payment work?',
    a: 'Payment is processed securely via Stripe. For projects under €500, full payment is required upfront. For larger projects, a 50% deposit is required to start, with the remaining 50% due upon delivery. All payments include a formal invoice for your records.',
  },
  {
    q: 'What types of projects do you take?',
    a: 'I work on a wide range of analytics projects: dashboards & visualizations, predictive models, data cleaning & ETL pipelines, statistical analysis, business intelligence setups, and automation scripts. If you\'re unsure whether your project fits, submit a request and I\'ll let you know.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Questions?</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Everything you need to know before submitting a project request.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-[#0F172A] pr-4">{faq.q}</span>
                <i className={`ri-${openIndex === i ? 'subtract' : 'add'}-line text-gray-400 text-xl shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
