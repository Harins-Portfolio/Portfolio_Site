import React, { useEffect, useState } from 'react';
import { db } from '../lib/database';

const ClientPortal = ({ projectId }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!projectId) return;
    let mounted = true;
    (async () => {
      try {
        const p = await db.getProject(projectId);
        if (mounted) setProject(p);
      } catch (err) {
        console.error('getProject', err);
      }
    })();
    return () => { mounted = false; };
  }, [projectId]);

  if (!projectId) {
    return <div className="p-8">No project selected.</div>;
  }

  if (!project) return <div className="p-8">Loading project…</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Request</h1>
      <div className="bg-white p-6 rounded shadow">
        <p><strong>ID:</strong> {project.id}</p>
        <p className="mt-2"><strong>Status:</strong> {project.status}</p>
        <p className="mt-2"><strong>Problem:</strong> {project.problem_description}</p>
        <p className="mt-2"><strong>Budget:</strong> ${project.budget}</p>
        <p className="mt-2"><strong>Timeline:</strong> {project.timeline}</p>
        <p className="mt-2"><strong>AI Spec:</strong> {project.ai_spec ? JSON.stringify(project.ai_spec) : '—'}</p>
      </div>
    </div>
  );
};

export default ClientPortal;
