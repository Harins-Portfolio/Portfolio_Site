import React from 'react';

const steps = [
  { num: '01', icon: 'ri-edit-2-line', title: 'Describe the task', desc: 'Tell me what you need — from dashboards to predictive models.' },
  { num: '02', icon: 'ri-upload-cloud-2-line', title: 'Upload files', desc: 'Share your CSVs, Excel files, PDFs, ZIPs, or PBIX files.' },
  { num: '03', icon: 'ri-calendar-line', title: 'Select deadline', desc: 'Pick a realistic deadline based on project complexity.' },
  { num: '04', icon: 'ri-money-euro-circle-line', title: 'Set your budget', desc: 'Pay what fits — projects start from €100.' },
  { num: '05', icon: 'ri-video-chat-line', title: 'Book a call', desc: 'Schedule a quick call to align on scope and expectations.' },
  { num: '06', icon: 'ri-file-paper-2-line', title: 'Receive proposal', desc: 'Get a formal proposal with scope, timeline, and pricing.' },
  { num: '07', icon: 'ri-check-double-line', title: 'Receive completed work', desc: 'I deliver the finished solution with full documentation.' },
  { num: '08', icon: 'ri-lock-unlock-line', title: 'Pay & unlock deliverables', desc: 'Pay the invoice and instantly unlock all project files.' },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">The Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From request to delivery in 8 simple steps. No endless emails, no confusion.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="group relative bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 hover:border-[#0F172A] hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-black text-[#0F172A] opacity-10 group-hover:opacity-20 transition-opacity">{step.num}</span>
                <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <i className={`${step.icon} text-lg`} />
                </div>
              </div>
              <h3 className="font-bold text-[#0F172A] mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-gray-400">
            <i className="ri-flashlight-line text-blue-500" />
            Total turnaround: typically 24–72 hours after proposal approval
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
