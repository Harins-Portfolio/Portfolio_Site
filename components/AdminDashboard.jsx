import React, { useEffect, useState } from 'react';
import { db, PROJ_STATUS } from '../lib/database';

const AdminDashboard = ({ onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const list = await db.listProjects();
      setProjects(list || []);
    } catch (err) {
      console.error('listProjects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await db.updateProject(id, { status });
      await load();
    } catch (err) {
      console.error('updateProject', err);
      alert('Failed to update project status');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div>
          <button onClick={onLogout} className="px-3 py-2 bg-gray-200 rounded">Logout</button>
        </div>
      </div>

      {loading && <p>Loading projects…</p>}

      {!loading && projects.length === 0 && <p>No projects found.</p>}

      <div className="space-y-4">
        {projects.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{p.problem_description || '—'}</p>
                <p className="text-sm text-gray-500">ID: {p.id} • Status: {p.status}</p>
                <p className="mt-2">Budget: ${p.budget} • Timeline: {p.timeline}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateStatus(p.id, PROJ_STATUS.ACCEPTED)} className="px-3 py-2 bg-green-600 text-white rounded">Accept</button>
                <button onClick={() => updateStatus(p.id, PROJ_STATUS.SUBMITTED)} className="px-3 py-2 bg-yellow-500 text-white rounded">Hold</button>
                <button onClick={() => updateStatus(p.id, 'REJECTED')} className="px-3 py-2 bg-red-600 text-white rounded">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
