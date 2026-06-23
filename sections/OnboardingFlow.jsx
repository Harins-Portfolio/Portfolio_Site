import React, { useState, useCallback } from 'react';
import Step1 from '../src/components/onboarding/Step1';
import Step2 from '../src/components/onboarding/Step2';
import Step3 from '../src/components/onboarding/Step3';
import Step4 from '../src/components/onboarding/Step4';
import Step5 from '../src/components/onboarding/Step5';
import Step6 from '../src/components/onboarding/Step6';
import { db } from '../lib/database';

const TOTAL_STEPS = 6;

const PROGRESS_LABELS = [
  'Service',
  'AI Brief',
  'Upload',
  'Budget',
  'Call',
  'Submit',
];

const OnboardingFlow = ({ onPortalOpen, active }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [collected, setCollected] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const next = useCallback((data = {}) => {
    setCollected(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  }, []);

  const back = useCallback(() => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  }, []);

  const handleSubmit = async (clientInfo) => {
    const payload = {
      ...collected,
      ...clientInfo,
    };
    try {
      setSubmitting(true);
      const project = await db.createProject({
        project_type: payload.project_type || '',
        problem_description: payload.ai_brief?.business_goal || '',
        data_types: payload.ai_brief?.current_data?.split(',').map(s => s.trim()) || [],
        ai_spec: payload.ai_brief || null,
        budget: payload.budget || 0,
        timeline: payload.timeline || '',
        urgency: payload.urgency || '',
        booking_type: payload.booking?.type || '',
        client_name: payload.name || '',
        client_email: payload.email || '',
        company: payload.company || '',
        password_hash: payload.password_hash || null,
        file_count: payload.files?.length || 0,
      });
      onPortalOpen(project.id);
    } catch (err) {
      console.error('createProject error', err);
      alert(err.message || 'There was an error submitting your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 onNext={next} />;
      case 2: return <Step2 onNext={next} onBack={back} initialSpec={collected.ai_brief} />;
      case 3: return <Step3 onNext={next} onBack={back} initialFiles={collected.files} />;
      case 4: return <Step4 onNext={next} onBack={back} initialBudget={collected} />;
      case 5: return <Step5 onNext={next} onBack={back} initialBooking={collected.booking} />;
      case 6: return <Step6 onNext={handleSubmit} onBack={back} collected={collected} submitting={submitting} />;
      default: return null;
    }
  };

  if (!active) return null;

  return (
    <div id="start" className="onboarding-flow">
      {currentStep >= 1 && currentStep <= TOTAL_STEPS && (
        <div className="fixed top-0 left-0 right-0 z-40 pt-14 md:pt-20">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-center gap-0">
              {PROGRESS_LABELS.map((label, idx) => {
                const stepNum = idx + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;
                return (
                  <React.Fragment key={label}>
                    <div className="flex-1 flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isActive ? 'gradient-bg text-white shadow-md' :
                        isCompleted ? 'bg-accent-500 text-white' :
                        'bg-gray-200 text-gray-400'
                      }`}>
                        {isCompleted ? <i className="ri-check-line text-xs" /> : stepNum}
                      </div>
                      <span className={`text-[10px] mt-1 font-medium ${
                        isActive ? 'text-brand-600' :
                        isCompleted ? 'text-accent-600' :
                        'text-gray-400'
                      }`}>
                        {label}
                      </span>
                    </div>
                    {idx < TOTAL_STEPS - 1 && (
                      <div className={`flex-1 h-0.5 mb-5 transition-colors duration-300 ${
                        isCompleted ? 'bg-accent-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {renderStep()}
    </div>
  );
};

export default OnboardingFlow;
