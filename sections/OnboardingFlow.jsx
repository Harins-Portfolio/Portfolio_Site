import React, { useState } from 'react';
import Step1 from '../src/components/onboarding/Step1';
import Step2 from '../src/components/onboarding/Step2';
import Step3 from '../src/components/onboarding/Step3';
import Step4 from '../src/components/onboarding/Step4';
import { db } from '../lib/database';

const STEPS = {
  START: 1,
  PROBLEM: 2,
  DATA: 3,
  SCOPE: 4,
  BUDGET: 5,
  REVIEW: 6,
};

const OnboardingFlow = ({ onPortalOpen }) => {
  const [currentStep, setCurrentStep] = useState(STEPS.START);
  const [collected, setCollected] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const nextWith = (data = {}) => {
    setCollected(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const previous = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const handleSubmit = async (overrides = {}) => {
    const payload = { ...collected, ...overrides };
    try {
      setSubmitting(true);
      const project = await db.createProject({
        problem_description: payload.problem_description || '',
        data_types: payload.data_types || [],
        ai_spec: payload.specification || null,
        budget: payload.budget || 0,
        timeline: payload.timeline || '',
        client_name: payload.client_name || '',
        client_email: payload.client_email || '',
        company: payload.company || '',
        file_urls: payload.file_urls || [],
      });
      onPortalOpen(project.id);
    } catch (err) {
      console.error('createProject error', err);
      alert('There was an error submitting your request.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.START:
        return <Step1 onNext={() => nextWith()} />;
      case STEPS.PROBLEM:
        return <Step2 onNext={(data) => nextWith(data)} onBack={previous} />;
      case STEPS.DATA:
        return <Step3 onNext={(data) => nextWith(data)} onBack={previous} />;
      case STEPS.SCOPE:
        return <Step4 onNext={(data) => nextWith({ specification: data.specification })} onBack={previous} />;
      case STEPS.BUDGET:
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-4">Budget & Timeline</h1>
            <p className="text-gray-600 mb-4">Name the price you'd like to pay and an expected timeline.</p>
            <input
              type="number"
              placeholder="Your price (USD)"
              className="w-1/3 p-3 border rounded mb-4"
              value={collected.budget || ''}
              onChange={(e) => setCollected(prev => ({ ...prev, budget: Number(e.target.value) }))}
            />
            <input
              type="text"
              placeholder="Timeline (e.g. 2 weeks)"
              className="w-1/3 p-3 border rounded mb-4"
              value={collected.timeline || ''}
              onChange={(e) => setCollected(prev => ({ ...prev, timeline: e.target.value }))}
            />
            <div>
              <button onClick={previous} className="px-6 py-2 mr-4 bg-gray-200 rounded">Back</button>
              <button onClick={() => setCurrentStep(STEPS.REVIEW)} className="px-6 py-2 bg-blue-600 text-white rounded">Next</button>
            </div>
          </div>
        );
      case STEPS.REVIEW:
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-4">Review & Submit</h1>
            <div className="w-2/3 bg-white p-6 rounded shadow mb-4">
              <h3 className="font-semibold">Problem</h3>
              <p className="text-gray-700 mb-3">{collected.problem_description}</p>
              <h3 className="font-semibold">AI Specification</h3>
              <p className="text-gray-700 mb-3">{collected.specification ? JSON.stringify(collected.specification) : '—'}</p>
              <h3 className="font-semibold">Budget</h3>
              <p className="text-gray-700 mb-3">${collected.budget}</p>
              <h3 className="font-semibold">Timeline</h3>
              <p className="text-gray-700">{collected.timeline}</p>
            </div>
            <div>
              <button onClick={previous} className="px-6 py-2 mr-4 bg-gray-200 rounded">Back</button>
              <button onClick={() => handleSubmit()} disabled={submitting} className="px-6 py-2 bg-green-600 text-white rounded">{submitting ? 'Submitting…' : 'Submit Project'}</button>
            </div>
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="onboarding-flow">
      {renderStep()}
    </div>
  );
};

export default OnboardingFlow;
