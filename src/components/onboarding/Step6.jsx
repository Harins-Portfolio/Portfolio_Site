import { useState } from 'react';

const Step6 = ({ onNext, onBack, collected, submitting }) => {
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!clientInfo.name.trim()) errs.name = 'Name is required';
    if (!clientInfo.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(clientInfo.email)) errs.email = 'Invalid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext({ ...clientInfo });
    }
  };

  const summaryItems = [
    { label: 'Project Type', value: collected.project_type, icon: 'ri-service-line' },
    { label: 'Business Goal', value: collected.ai_brief?.business_goal, icon: 'ri-flag-line' },
    { label: 'Current Data', value: collected.ai_brief?.current_data, icon: 'ri-database-2-line' },
    { label: 'Desired Outcome', value: collected.ai_brief?.desired_outcome, icon: 'ri-rocket-line' },
    { label: 'Success Definition', value: collected.ai_brief?.success_definition, icon: 'ri-check-double-line' },
    { label: 'Deadline', value: collected.ai_brief?.deadline, icon: 'ri-calendar-line' },
    { label: 'Files Uploaded', value: collected.files ? `${collected.files.length} file(s)` : 'None', icon: 'ri-upload-cloud-line' },
    { label: 'Budget', value: collected.budget ? `€${collected.budget}` : '', icon: 'ri-money-euro-circle-line' },
    { label: 'Timeline', value: collected.timeline, icon: 'ri-time-line' },
    { label: 'Urgency', value: collected.urgency, icon: 'ri-flashlight-line' },
    { label: 'Call Booking', value: collected.booking?.type === 'none' ? 'Skipped' : collected.booking?.type === 'discovery' ? '15-min Discovery' : '30-min Consulting', icon: 'ri-chat-1-line' },
  ].filter(item => item.value);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-brand-50/30">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-3xl w-full animate-fadeInUp">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100/80 rounded-full text-accent-700 text-sm font-medium mb-4 border border-accent-200/50">
              <i className="ri-checkbox-circle-line" />
              Step 6 of 6 — Final Review
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Review & Submit
            </h1>
            <p className="text-lg text-gray-500">
              Please review your project details and provide your contact information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Project Summary
              </h3>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                {summaryItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-4">
                    <i className={`${item.icon} text-brand-500 mt-0.5`} />
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-gray-400 uppercase">{item.label}</div>
                      <div className="text-sm text-gray-900 mt-0.5 capitalize">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Your Contact Details
              </h3>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Smith"
                    className={`input-field ${errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-500/20' : ''}`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@company.com"
                    className={`input-field ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-500/20' : ''}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    value={clientInfo.company}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Acme Corp"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={onBack} className="btn-ghost" disabled={submitting}>
              <i className="ri-arrow-left-line" />
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary text-base px-10 py-4 shadow-lg shadow-brand-500/25"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <i className="ri-rocket-line text-lg" />
                  Submit Project
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6;
