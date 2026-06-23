import React, { useState, useRef } from 'react';
import AIScopingAssistant from './AIScopingAssistant';

const ACCEPTED_FILES = '.csv,.xlsx,.pdf,.zip,.pbix';

const ProjectForm = () => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    linkedin: '',
    title: '',
    description: '',
    deadline: '',
    budget: '',
  });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleAISpecInsert = (spec) => {
    setFormData(prev => ({ ...prev, description: spec }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const formatBudget = (value) => {
    const nums = value.replace(/[^0-9]/g, '');
    return nums ? `€${nums}` : '';
  };

  if (submitted) {
    return (
      <section id="request" className="py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-emerald-600 text-4xl" />
          </div>
          <h2 className="text-3xl font-black text-[#0F172A] mb-4">Request Submitted Successfully!</h2>
          <p className="text-lg text-gray-600 mb-2">Thank you, {formData.name}.</p>
          <p className="text-gray-500 mb-8">
            I've received your project request. You'll receive a confirmation email shortly with next steps.
            I'll review your requirements and get back to you within 24 hours.
          </p>
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 mb-8 text-left">
            <h4 className="font-bold text-[#0F172A] mb-3">What happens next?</h4>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0 mt-0.5">1</span>
                <span>I review your project details and check feasibility</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0 mt-0.5">2</span>
                <span>You'll receive a Calendly link to book a 15-min discovery call</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0 mt-0.5">3</span>
                <span>After the call, I send a formal proposal with pricing and timeline</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0 mt-0.5">4</span>
                <span>Once approved, I start working on your solution</span>
              </li>
            </ol>
          </div>
          <button
            onClick={() => { setSubmitted(false); setFormData({ company: '', name: '', email: '', linkedin: '', title: '', description: '', deadline: '', budget: '' }); setFile(null); }}
            className="text-[#0F172A] font-bold underline hover:text-gray-600 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-3 mb-4">
            Submit Your Project Request
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Tell me what you need, and I'll get back to you with a proposal within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-[#0F172A] mb-2">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0F172A] mb-2">Contact Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0F172A] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@acme.com"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0F172A] mb-2">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="linkedin.com/in/johnsmith"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-[#0F172A] mb-2">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Customer Churn Analysis Dashboard"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-[#0F172A]">Detailed Task Description</label>
              <button
                type="button"
                onClick={() => setShowAIAssistant(true)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
              >
                <i className="ri-sparkling-2-line" />
                Help Me Define My Project
              </button>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you need in detail. What data do you have? What questions do you want answered? What format should the output be in?"
              rows={6}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors resize-y"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-[#0F172A] mb-2">Upload Files</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#0F172A] hover:bg-gray-50 transition-all"
            >
              <i className="ri-upload-cloud-2-line text-3xl text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">
                {file ? file.name : 'Click to upload your data files'}
              </p>
              <p className="text-xs text-gray-400">CSV, XLSX, PDF, ZIP, PBIX accepted</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_FILES}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-[#0F172A] mb-2">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0F172A] mb-2">Budget</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: formatBudget(e.target.value) }))}
                placeholder="€500"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F172A] focus:outline-none transition-colors"
                required
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Projects starting from <strong>€100</strong>. I reserve the right to reject projects that are significantly underpriced.
              </p>
            </div>
          </div>

          <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="flex items-start gap-3">
              <i className="ri-calendar-line text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[#0F172A]">Want to discuss first?</p>
                <p className="text-sm text-gray-600">
                  You can also{' '}
                  <a
                    href="https://calendly.com/your-username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium underline hover:text-blue-700"
                  >
                    book a free 15-minute discovery call
                  </a>{' '}
                  before submitting your request.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F172A] text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-[#1E293B] transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            Submit Project Request
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>

      <AIScopingAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        onInsert={handleAISpecInsert}
      />
    </section>
  );
};

export default ProjectForm;
