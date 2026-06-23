import React, { useState } from 'react';

const faqs = [
  {
    q: 'How do I know which solution type to pick?',
    a: 'Each solution type has clear descriptions and example projects. Not sure? Pick "Predictive Analytics & ML" as a starting point — or use the AI Project Scoping Assistant to help define your project. You can also book a free 15-minute call and I\'ll help you figure it out.',
  },
  {
    q: 'What does pricing look like?',
    a: 'Projects start from €100 and are scoped based on complexity, data volume, and deliverables. You set your budget in the project builder. I review it and confirm whether it aligns with the scope. I reserve the right to reject projects significantly underpriced for the required effort.',
  },
  {
    q: 'How fast can you deliver?',
    a: 'Most projects are delivered within 24–72 hours after proposal approval. Complex projects (ML models, large-scale data engineering) may take 1–2 weeks. Your specific deadline is agreed upon before work begins.',
  },
  {
    q: 'How do you handle confidential data?',
    a: 'All client data is strictly confidential. Files are stored securely in Supabase with row-level security. I never share, reuse, or expose client data. Upon completion, you can request permanent deletion of your data from my systems. NDA available on request.',
  },
  {
    q: 'What if I need revisions?',
    a: 'Every project includes up to 2 rounds of revisions to ensure deliverables meet your expectations. Additional revisions can be scoped separately. The revision process is clearly outlined in the proposal before work starts.',
  },
  {
    q: 'How does payment work?',
    a: 'Payment is processed securely via Stripe. For projects under €500, full payment is required upfront. For larger projects, a 50% deposit starts the work, with the remaining 50% due upon delivery. All payments include a formal invoice for your records.',
  },
  {
    q: 'What if I need ongoing support instead of a one-off project?',
    a: 'I offer fractional data consulting from €2,000/month for businesses that need continuous analytics infrastructure, reporting, and strategy. Scroll down to the "Need Ongoing Analytics Support?" section to learn more.',
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
            Everything you need to know about working with me.
          </p>
        </div>

        <div className="space-y-3">
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
