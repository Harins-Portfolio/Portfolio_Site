import React, { useState, useEffect } from 'react';
import { db, PROJ_STATUS } from '../lib/database';

const statusColors = {
  [PROJ_STATUS.SUBMITTED]: 'bg-blue-100 text-blue-800 border-blue-200',
  [PROJ_STATUS.ACCEPTED]: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  [PROJ_STATUS.IN_PROGRESS]: 'bg-amber-100 text-amber-800 border-amber-200',
  [PROJ_STATUS.COMPLETED]: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  [PROJ_STATUS.DELIVERED]: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  [PROJ_STATUS.PAID]: 'bg-green-100 text-green-800 border-green-200',
};

const nextStatus = {
  [PROJ_STATUS.SUBMITTED]: { label: 'Accept →', status: PROJ_STATUS.ACCEPTED },
  [PROJ_STATUS.ACCEPTED]: { label: 'Start work →', status: PROJ_STATUS.IN_PROGRESS },
  [PROJ_STATUS.IN_PROGRESS]: { label: 'Complete →', status: PROJ_STATUS.COMPLETED },
  [PROJ_STATUS.COMPLETED]: { label: 'Mark delivered →', status: PROJ_STATUS.DELIVERED },
  [PROJ_STATUS.DELIVERED]: null,
  [PROJ_STATUS.PAID]: null,
};

const AdminDashboard = ({ onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selected, setSelected] = useState(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await db.listProjects();
      setProjects(data);
    } catch (e) {
      console.error('Failed to load projects', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProjects(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await db.updateProject(id, { status: newStatus });
      setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
      if (selected?.id === id) setSelected(prev => ({ ...prev, status: newStatus }));
    } catch (e) {
      console.error('Failed to update status', e);
    }
  };

  const filtered = activeTab === 'all' ? projects : projects.filter(p => p.status === activeTab);

  const tabs = [
    { id: 'all', label: 'All', count: projects.length },
    ...Object.values(PROJ_STATUS).map(s => ({
      id: s,
      label: s.charAt(0) + s.slice(1).toLowerCase(),
      count: projects.filter(p => p.status === s).length,
    })),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <i className="ri-loader-2-line animate-spin text-3xl text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Admin header */}
      <div className="bg-[#0F172A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <i className="ri-shield-user-line text-white text-sm" />
          </div>
          <span className="text-white font-bold">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={loadProjects} className="text-gray-400 hover:text-white text-sm transition-colors">
            <i className="ri-refresh-line mr-1" />Refresh
          </button>
          <button onClick={onLogout} className="text-gray-400 hover:text-white text-sm transition-colors">
            <i className="ri-logout-box-r-line mr-1" />Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${activeTab === tab.id ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Project list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-inbox-line text-gray-400 text-2xl" />
            </div>
            <p className="font-bold text-[#0F172A]">No projects</p>
            <p className="text-sm text-gray-500">Projects will appear here when clients submit them.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(project => (
              <div key={project.id}
                onClick={() => setSelected(selected?.id === project.id ? null : project)}
                className={`bg-white border-2 rounded-2xl p-5 cursor-pointer transition-all ${selected?.id === project.id ? 'border-[#0F172A] shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${statusColors[project.status] || 'bg-gray-100 text-gray-800'}`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-gray-400">{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <p className="font-bold text-[#0F172A] text-sm mb-2 line-clamp-2">{project.problem_description || 'No description'}</p>
                <p className="text-xs text-gray-500">{project.client_name || 'Anonymous'} · €{project.budget || 0}</p>

                {selected?.id === project.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                    <div className="text-xs text-gray-600 space-y-1">
                      <p><span className="font-bold text-[#0F172A]">Email:</span> {project.client_email}</p>
                      <p><span className="font-bold text-[#0F172A]">Timeline:</span> {project.timeline}</p>
                      {project.ai_spec && <p><span className="font-bold text-[#0F172A]">Goal:</span> {project.ai_spec.business_goal}</p>}
                    </div>

                    {nextStatus[project.status] && (
                      <button onClick={(e) => { e.stopPropagation(); handleStatusChange(project.id, nextStatus[project.status].status); }}
                        className="w-full bg-[#0F172A] text-white font-bold py-2 rounded-xl text-sm hover:bg-[#1E293B] transition-colors">
                        {nextStatus[project.status].label}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
