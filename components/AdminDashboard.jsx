import { useEffect, useState, useCallback } from 'react';
import { db, PROJ_STATUS, STATUS_FLOW } from '../lib/database';

const STORAGE_BUCKET = 'deliverables';

const statusColor = (status) => {
  const found = STATUS_FLOW.find(s => s.key === status);
  return found || { label: status, icon: 'ri-question-line', color: 'text-gray-500 bg-gray-50 border-gray-200' };
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

const AdminDashboard = ({ onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [deliverableFiles, setDeliverableFiles] = useState([]);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const list = await db.listProjects();
      setProjects(list || []);
    } catch (err) {
      console.error('listProjects', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProjects(); }, [loadProjects]);

  const updateStatus = async (id, status) => {
    try {
      await db.updateProject(id, { status });
      await loadProjects();
    } catch (err) {
      console.error('updateProject', err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedProject) return;
    try {
      const existing = selectedProject.messages || [];
      const updated = [...existing, { from: 'admin', text: newMessage.trim(), date: new Date().toISOString() }];
      await db.updateProject(selectedProject.id, { messages: updated });
      setSelectedProject(prev => ({ ...prev, messages: updated }));
      setNewMessage('');
    } catch (err) {
      console.error('sendMessage', err);
    }
  };

  const handleDeliverableUpload = async (e) => {
    const files = Array.from(e.target.files);
    setDeliverableFiles(prev => [...prev, ...files]);
  };

  const uploadDeliverables = async () => {
    if (!selectedProject || deliverableFiles.length === 0) return;
    try {
      const uploaded = [];
      for (const file of deliverableFiles) {
        const path = `${selectedProject.id}/${Date.now()}_${file.name}`;
        const result = await db.uploadFile(STORAGE_BUCKET, path, file);
        uploaded.push({ name: file.name, path: result.path, size: `${(file.size / 1024).toFixed(1)} KB`, date: new Date().toISOString() });
      }
      const existing = selectedProject.deliverables || [];
      const updated = [...existing, ...uploaded];
      await db.updateProject(selectedProject.id, { deliverables: updated, status: PROJ_STATUS.COMPLETED });
      setSelectedProject(prev => ({ ...prev, deliverables: updated, status: PROJ_STATUS.COMPLETED }));
      setDeliverableFiles([]);
      await loadProjects();
    } catch (err) {
      console.error('uploadDeliverables', err);
      alert('Failed to upload deliverable files.');
    }
  };

  const generateInvoice = async () => {
    if (!selectedProject) return;
    const invoiceUrl = `https://example.com/invoice/${selectedProject.id}`;
    try {
      await db.updateProject(selectedProject.id, {
        invoice_url: invoiceUrl,
        status: PROJ_STATUS.AWAITING_PAYMENT,
      });
      setSelectedProject(prev => ({ ...prev, invoice_url: invoiceUrl, status: PROJ_STATUS.AWAITING_PAYMENT }));
      await loadProjects();
    } catch (err) {
      console.error('generateInvoice', err);
    }
  };

  const filteredProjects = statusFilter === 'ALL'
    ? projects
    : projects.filter(p => p.status === statusFilter);

  const statusCounts = {};
  projects.forEach(p => {
    statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
  });

  if (selectedProject) {
    const statusInfo = statusColor(selectedProject.status);
    const deliverables = selectedProject.deliverables || [];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xs">
                NH
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Admin Dashboard</div>
                <div className="text-xs text-gray-400">Project Management</div>
              </div>
            </div>
            <button onClick={() => setSelectedProject(null)} className="btn-ghost text-sm">
              <i className="ri-arrow-left-line" />
              Back to List
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex border-b border-gray-100">
                  {['overview', 'messages', 'deliverables'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? 'text-brand-600 border-b-2 border-brand-500'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab === 'overview' && <><i className="ri-file-text-line mr-1.5" />Overview</>}
                      {tab === 'messages' && <><i className="ri-chat-1-line mr-1.5" />Messages</>}
                      {tab === 'deliverables' && <><i className="ri-upload-cloud-line mr-1.5" />Deliverables</>}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{selectedProject.client_name || 'Unnamed'}</h2>
                          <p className="text-sm text-gray-400">{selectedProject.client_email}</p>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${statusInfo.color}`}>
                          <i className={`${statusInfo.icon} text-sm`} />
                          <span className="text-xs font-semibold">{statusInfo.label}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Project Info</div>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: 'Type', value: selectedProject.project_type },
                            { label: 'Budget', value: selectedProject.budget ? `€${selectedProject.budget}` : '—' },
                            { label: 'Timeline', value: selectedProject.timeline },
                            { label: 'Urgency', value: selectedProject.urgency },
                            { label: 'Company', value: selectedProject.company },
                            { label: 'Submitted', value: formatDate(selectedProject.created_at) },
                          ].map(item => (
                            <div key={item.label}>
                              <div className="text-xs text-gray-400">{item.label}</div>
                              <div className="text-sm font-medium text-gray-900 capitalize">{item.value || '—'}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedProject.ai_spec && (
                        <div>
                          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">AI Brief</div>
                          <div className="space-y-2">
                            {Object.entries(selectedProject.ai_spec).map(([key, value]) => (
                              <div key={key}>
                                <div className="text-xs font-medium text-brand-600">{key.replace(/_/g, ' ')}</div>
                                <div className="text-sm text-gray-700">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Actions</div>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => updateStatus(selectedProject.id, PROJ_STATUS.ACCEPTED)} className="px-4 py-2 bg-accent-500 text-white rounded-lg text-sm font-medium hover:bg-accent-600 transition-colors">
                            <i className="ri-check-double-line mr-1" />Accept
                          </button>
                          <button onClick={() => updateStatus(selectedProject.id, PROJ_STATUS.IN_PROGRESS)} className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
                            <i className="ri-loader-4-line mr-1" />In Progress
                          </button>
                          <button onClick={() => updateStatus(selectedProject.id, PROJ_STATUS.REJECTED)} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                            <i className="ri-close-line mr-1" />Reject
                          </button>
                          <button onClick={() => updateStatus(selectedProject.id, PROJ_STATUS.SUBMITTED)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
                            <i className="ri-arrow-go-back-line mr-1" />Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'messages' && (
                    <div>
                      <div className="h-[300px] overflow-y-auto mb-4 space-y-3 p-3 bg-gray-50 rounded-xl">
                        {(selectedProject.messages || []).length === 0 && (
                          <div className="text-center py-8">
                            <i className="ri-chat-1-line text-2xl text-gray-300 mb-2" />
                            <p className="text-sm text-gray-400">No messages yet</p>
                          </div>
                        )}
                        {(selectedProject.messages || []).map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.from === 'admin' ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
                              msg.from === 'admin'
                                ? 'bg-white border border-gray-100 text-gray-900'
                                : 'bg-brand-500 text-white'
                            }`}>
                              <div className="text-xs font-medium opacity-70 mb-0.5">
                                {msg.from === 'admin' ? 'You' : selectedProject.client_name} — {formatDate(msg.date)}
                              </div>
                              <div className="text-sm">{msg.text}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="Type a message..."
                          className="input-field flex-1"
                        />
                        <button onClick={sendMessage} disabled={!newMessage.trim()} className="btn-primary">
                          <i className="ri-send-plane-fill" />
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'deliverables' && (
                    <div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Deliverable Files
                        </label>
                        <input
                          type="file"
                          multiple
                          onChange={handleDeliverableUpload}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
                        />
                      </div>

                      {deliverableFiles.length > 0 && (
                        <div className="mb-4">
                          <div className="text-sm font-medium text-gray-700 mb-2">{deliverableFiles.length} file(s) selected</div>
                          <div className="space-y-1">
                            {deliverableFiles.map((file, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                <i className="ri-file-text-line" />
                                {file.name} ({(file.size / 1024).toFixed(1)} KB)
                              </div>
                            ))}
                          </div>
                          <button onClick={uploadDeliverables} className="btn-primary mt-3 text-sm">
                            <i className="ri-upload-cloud-line" />
                            Upload & Mark Complete
                          </button>
                        </div>
                      )}

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-3">
                          Current Deliverables ({deliverables.length})
                        </div>
                        {deliverables.length === 0 ? (
                          <p className="text-sm text-gray-400">No deliverables uploaded yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {deliverables.map((del, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <i className="ri-file-text-line text-brand-600" />
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900">{del.name}</div>
                                  <div className="text-xs text-gray-400">{del.size} • {formatDate(del.date)}</div>
                                </div>
                                <button
                                  onClick={async () => {
                                    try {
                                      await db.deleteFile(STORAGE_BUCKET, del.path);
                                      const updated = deliverables.filter((_, i) => i !== idx);
                                      await db.updateProject(selectedProject.id, { deliverables: updated });
                                      setSelectedProject(prev => ({ ...prev, deliverables: updated }));
                                    } catch (err) {
                                      alert('Failed to delete file');
                                    }
                                  }}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50"
                                >
                                  <i className="ri-delete-bin-line" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-start gap-3">
                          <i className="ri-information-line text-amber-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-amber-800">Payment & Handoff</p>
                            <p className="text-xs text-amber-600 mt-0.5">
                              After uploading deliverables, click &quot;Generate Invoice&quot; on the overview tab
                              to send the payment request. Deliverables unlock automatically after payment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  {selectedProject.status !== PROJ_STATUS.AWAITING_PAYMENT && (
                    <button onClick={generateInvoice} className="btn-primary w-full text-sm">
                      <i className="ri-file-paper-2-line" />
                      Generate Invoice
                    </button>
                  )}
                  {selectedProject.status === PROJ_STATUS.AWAITING_PAYMENT && (
                    <button onClick={() => updateStatus(selectedProject.id, PROJ_STATUS.PAID)} className="btn-primary w-full text-sm bg-accent-500 hover:bg-accent-600">
                      <i className="ri-money-euro-circle-line" />
                      Mark as Paid
                    </button>
                  )}
                  {selectedProject.status === PROJ_STATUS.PAID && (
                    <button onClick={() => updateStatus(selectedProject.id, PROJ_STATUS.DELIVERED)} className="btn-primary w-full text-sm bg-accent-500 hover:bg-accent-600">
                      <i className="ri-download-cloud-line" />
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Client Info</h2>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-400">Name</div>
                    <div className="text-sm font-medium">{selectedProject.client_name || '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Email</div>
                    <div className="text-sm font-medium">{selectedProject.client_email || '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Company</div>
                    <div className="text-sm font-medium">{selectedProject.company || '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Booking</div>
                    <div className="text-sm font-medium capitalize">{selectedProject.booking_type || 'None'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xs">
              NH
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Admin Dashboard</div>
              <div className="text-xs text-gray-400">Project Management</div>
            </div>
          </div>
          <button onClick={onLogout} className="btn-ghost text-sm">
            <i className="ri-arrow-left-line" />
            Exit Admin
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {STATUS_FLOW.filter(s => s.key !== PROJ_STATUS.REJECTED).map(status => (
            <div key={status.key} className={`bg-white rounded-xl border ${status.color} p-4 text-center card-hover`}>
              <div className={`text-2xl font-bold ${status.color.split(' ')[0]}`}>
                {statusCounts[status.key] || 0}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{status.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">All Projects</h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field w-auto text-sm py-2"
            >
              <option value="ALL">All Status</option>
              {STATUS_FLOW.map(s => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>

          {loading && (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-brand-300 border-t-brand-600 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-400">Loading projects...</p>
            </div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <i className="ri-inbox-line text-2xl text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">No projects found</p>
              <p className="text-sm text-gray-400 mt-1">Projects will appear here once clients submit them.</p>
            </div>
          )}

          {!loading && filteredProjects.length > 0 && (
            <div className="divide-y divide-gray-50">
              {filteredProjects.map(p => {
                const info = statusColor(p.status);
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-brand-50/30 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${info.color}`}>
                      <i className={`${info.icon} text-lg`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {p.client_name || 'Anonymous'} {p.company ? `— ${p.company}` : ''}
                      </div>
                      <div className="text-sm text-gray-400 truncate">
                        {p.project_type ? `${p.project_type} \u2022 ` : ''}
                        &euro;{p.budget || '\u2014'} \u2022 {formatDate(p.created_at)}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium ${info.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${info.color.split(' ')[0]}`} />
                        {info.label}
                      </span>
                    </div>
                    <i className="ri-arrow-right-s-line text-gray-300 text-xl" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
