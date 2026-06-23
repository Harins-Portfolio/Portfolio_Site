import React, { useState } from 'react';

const ClientPortal = ({ projectId }) => {
  const [paid, setPaid] = useState(false);

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <i className="ri-check-line text-emerald-600 text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#0F172A]">Project Submitted</h1>
            <p className="text-sm text-gray-500">Reference: {projectId}</p>
          </div>
        </div>
        <p className="text-gray-500 mb-8">
          I'll review your request and respond within 24 hours with a proposal.
        </p>

        {/* Status Timeline */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Project Status</p>
          <div className="space-y-4">
            {[
              { label: 'Submitted', done: true, time: 'Just now' },
              { label: 'In review', done: false, time: 'Expected: 24h' },
              { label: 'In progress', done: false, time: '' },
              { label: 'Completed', done: false, time: '' },
              { label: 'Delivered', done: false, time: '' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.done ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                  {s.done ? <i className="ri-check-line text-emerald-600 text-sm" /> : <span className="w-2 h-2 bg-gray-300 rounded-full" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${s.done ? 'text-[#0F172A]' : 'text-gray-400'}`}>{s.label}</p>
                </div>
                {s.time && <p className="text-xs text-gray-400">{s.time}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Deliverables</p>
          {!paid ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-lock-line text-gray-400 text-xl" />
              </div>
              <p className="font-bold text-[#0F172A] mb-1">Locked until payment</p>
              <p className="text-sm text-gray-500 mb-4">Deliverables will be available once the invoice is paid.</p>
              <button
                onClick={() => setPaid(true)}
                className="inline-flex items-center gap-2 bg-[#0F172A] text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#1E293B] transition-colors"
              >
                <i className="ri-secure-payment-line" /> Pay Invoice (Demo)
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {['Final_Report.pdf', 'Dashboard.pbix', 'model.py', 'summary.pptx'].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <i className="ri-file-text-line text-emerald-600" />
                    <span className="text-sm font-medium text-[#0F172A]">{f}</span>
                  </div>
                  <button className="text-sm text-blue-600 font-medium hover:underline">
                    <i className="ri-download-line mr-1" />Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Invoice */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Invoice</p>
          {!paid ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#0F172A]">INV-{projectId}</p>
                <p className="text-sm text-gray-500">Due upon receipt</p>
              </div>
              <span className="text-lg font-black text-[#0F172A]">€300</span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line text-emerald-500 text-lg" />
                <div>
                  <p className="font-bold text-[#0F172A]">INV-{projectId}</p>
                  <p className="text-sm text-emerald-600">Paid</p>
                </div>
              </div>
              <span className="text-lg font-black text-emerald-600">€300</span>
            </div>
          )}
        </div>

        {/* Communication */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Updates</p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">NH</div>
              <div>
                <p className="text-sm font-bold text-[#0F172A]">Nikhil Harins</p>
                <p className="text-xs text-gray-400">Just now</p>
                <p className="text-sm text-gray-600 mt-1">Thanks for your submission! I'll review and get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPortal;
