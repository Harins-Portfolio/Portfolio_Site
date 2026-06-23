import React, { useState, useEffect } from 'react';
import { db, PROJ_STATUS } from '../lib/database';

const statusConfig = {
  [PROJ_STATUS.SUBMITTED]: { label: 'Submitted', color: 'bg-blue-100 text-blue-800', icon: 'ri-file-text-line' },
  [PROJ_STATUS.ACCEPTED]: { label: 'Accepted', color: 'bg-indigo-100 text-indigo-800', icon: 'ri-thumb-up-line' },
  [PROJ_STATUS.IN_PROGRESS]: { label: 'In progress', color: 'bg-amber-100 text-amber-800', icon: 'ri-loader-2-line' },
  [PROJ_STATUS.COMPLETED]: { label: 'Completed', color: 'bg-emerald-100 text-emerald-800', icon: 'ri-check-double-line' },
  [PROJ_STATUS.DELIVERED]: { label: 'Delivered', color: 'bg-emerald-100 text-emerald-800', icon: 'ri-checkbox-circle-line' },
  [PROJ_STATUS.PAID]: { label: 'Paid', color: 'bg-emerald-100 text-emerald-800', icon: 'ri-secure-payment-line' },
};

const ClientPortal = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    db.getProject(projectId)
      .then(setProject)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [projectId]);

  const handlePay = async () => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 1500));
    if (project) {
      await db.updateProject(project.id, { status: PROJ_STATUS.PAID });
      setProject(prev => ({ ...prev, status: PROJ_STATUS.PAID }));
    }
    setPaying(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-2-line animate-spin text-3xl text-gray-400" />
          <p className="text-sm text-gray-500 mt-3">Loading your project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-search-line text-gray-400 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-[#0F172A] mb-2">Project not found</h2>
          <p className="text-sm text-gray-500">Check your project link or contact support.</p>
        </div>
      </div>
    );
  }

  const status = statusConfig[project.status] || statusConfig.SUBMITTED;
  const isComplete = project.status === PROJ_STATUS.COMPLETED;
  const isDelivered = project.status === PROJ_STATUS.DELIVERED;
  const isPaid = project.status === PROJ_STATUS.PAID;

  const timelineSteps = [
    { label: 'Submitted', done: true },
    { label: 'Accepted', done: project.status !== PROJ_STATUS.SUBMITTED },
    { label: 'In progress', done: [PROJ_STATUS.IN_PROGRESS, PROJ_STATUS.COMPLETED, PROJ_STATUS.DELIVERED, PROJ_STATUS.PAID].includes(project.status) },
    { label: 'Completed', done: [PROJ_STATUS.COMPLETED, PROJ_STATUS.DELIVERED, PROJ_STATUS.PAID].includes(project.status) },
    { label: 'Delivered', done: [PROJ_STATUS.DELIVERED, PROJ_STATUS.PAID].includes(project.status) },
  ];

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0">NH</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-[#0F172A]">Project Dashboard</h1>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${status.color}`}>
                <i className={`${status.icon} mr-1 text-xs`} />{status.label}
              </span>
            </div>
            <p className="text-sm text-gray-500">ID: {project.id?.slice(0, 8) || projectId?.slice(0, 8)}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your request</p>
          <p className="text-gray-700">{project.problem_description}</p>
          {project.ai_spec && (
            <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 space-y-1">
              <p><span className="font-bold text-[#0F172A]">Goal:</span> {project.ai_spec.business_goal}</p>
              <p><span className="font-bold text-[#0F172A]">Data:</span> {project.ai_spec.data_sources}</p>
              <p><span className="font-bold text-[#0F172A]">Output:</span> {project.ai_spec.required_outputs}</p>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Progress</p>
          <div className="space-y-3">
            {timelineSteps.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.done ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                  {s.done ? <i className="ri-check-line text-emerald-600 text-sm" /> : <span className="w-2 h-2 bg-gray-300 rounded-full" />}
                </div>
                <p className={`text-sm font-medium ${s.done ? 'text-[#0F172A]' : 'text-gray-400'}`}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Deliverables</p>
          {!isComplete && !isDelivered && !isPaid ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-hourglass-line text-gray-400 text-xl" />
              </div>
              <p className="font-bold text-[#0F172A] mb-1">Work in progress</p>
              <p className="text-sm text-gray-500">Deliverables appear here once the project is completed.</p>
            </div>
          ) : !isPaid ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-lock-line text-amber-600 text-xl" />
              </div>
              <p className="font-bold text-[#0F172A] mb-1">Locked until payment</p>
              <p className="text-sm text-gray-500 mb-4">Pay the invoice to unlock and download your files.</p>
              <button onClick={handlePay} disabled={paying}
                className="inline-flex items-center gap-2 bg-[#0F172A] text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#1E293B] transition-colors disabled:opacity-50">
                {paying ? <><i className="ri-loader-2-line animate-spin" /> Processing...</> : <><i className="ri-secure-payment-line" /> Pay to unlock</>}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-lock-unlock-line text-emerald-600" />
                <span className="text-sm font-bold text-emerald-600">Unlocked</span>
              </div>
              {['Final_Report.pdf', 'Dashboard.pbix', 'analysis.ipynb', 'summary.pptx'].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <i className="ri-file-text-line text-emerald-600" />
                    <span className="text-sm font-medium text-[#0F172A]">{f}</span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline">
                    <i className="ri-download-line" /> Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Invoice</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-[#0F172A]">INV-{project.id?.slice(0, 8)}</p>
              <p className="text-sm text-gray-500">{isPaid ? 'Paid' : 'Due upon delivery'}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-[#0F172A]">€{project.budget || 300}</span>
              {isPaid ? (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Paid</span>
              ) : (
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">Pending</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Updates</p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">NH</div>
              <div>
                <p className="text-sm font-bold text-[#0F172A]">Nikhil Harins</p>
                <p className="text-xs text-gray-400">Just now</p>
                <p className="text-sm text-gray-600 mt-1">Thanks for your submission! I'll review and get back to you within 24 hours with a proposal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPortal;
