import React from 'react';

const FAQSection = () => {
  const faqs = [
    { q: 'How long do engagements take?', a: 'Typical tasks complete in 1–3 weeks depending on scope.' },
    { q: 'What data formats do you accept?', a: 'CSV, Excel, SQL exports, PDF, or links to dashboards.' },
    { q: 'How do payments work?', a: 'We agree a fixed price; I’ll send an invoice / Stripe link when accepted.' },
  ];

  return (
    <section id="faq" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold">FAQ</h2>
      <div className="mt-6 space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="p-4 bg-white rounded shadow">
            <div className="font-semibold">{f.q}</div>
            <div className="text-gray-600 mt-1">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
