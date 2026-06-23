import React from 'react';

const faqs = [
  {
    q: 'How long do projects typically take?',
    a: 'Most projects are completed within 3–7 business days. Complex engagements may take longer, and the timeline is always agreed upfront before work begins.',
  },
  {
    q: 'What kind of data do you work with?',
    a: 'I work with all common formats — CSV, Excel, SQL databases, PDFs, JSON, APIs, and direct connections to tools like Shopify, Stripe, Google Analytics, and more.',
  },
  {
    q: 'How does pricing work?',
    a: 'Projects start at €100. After you submit your request, I review the scope and confirm a fixed price. No surprise fees, no hourly billing. You know the cost before work starts.',
  },
  {
    q: 'What if my project is rejected?',
    a: 'If a project doesn\'t fit my expertise or capacity, I\'ll let you know within 48 hours with a clear explanation. No hard feelings — and no charge.',
  },
  {
    q: 'Can I get ongoing support?',
    a: 'Yes. The Fractional Consulting plan (€2,000/month) gives you ongoing access for strategy calls, dashboard maintenance, ad-hoc analysis, and priority project handling.',
  },
  {
    q: 'How do deliverables work?',
    a: 'Completed work is uploaded to your secure client portal. Everything remains locked until payment is processed. Once paid, all files are available for immediate download.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-gray-50/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeInUp">
          <span className="badge-gray mb-4">FAQ</span>
          <h2 className="section-title mb-4">
            Questions?{' '}
            <span className="gradient-text">Answers.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know about working together.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 hover:border-brand-100"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <i className={`ri-arrow-down-s-line text-xl text-gray-400 transition-transform duration-200 shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 animate-slideDown">
                  <p className="text-gray-500 leading-relaxed">{faq.a}</p>
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
