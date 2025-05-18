import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface AdmissionStepsProps {
  currentStep: number;
}

const AdmissionSteps: React.FC<AdmissionStepsProps> = ({ currentStep }) => {
  const steps: Step[] = [
    {
      id: 1,
      title: 'Personal Details',
      description: 'Fill in your personal and contact information',
    },
    {
      id: 2,
      title: 'Educational Details',
      description: 'Provide your academic history and qualifications',
    },
    {
      id: 3,
      title: 'Course Selection',
      description: 'Choose your preferred course and specialization',
    },
    {
      id: 4,
      title: 'Document Upload',
      description: 'Upload required documents and certificates',
    },
    {
      id: 5,
      title: 'Review & Submit',
      description: 'Review your application and submit',
    },
    {
      id: 6,
      title: 'Payment',
      description: 'Pay the application fee to complete your submission',
    },
  ];

  return (
    <div className="py-4 mb-8">
      <div className="flex flex-wrap items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id < currentStep
                    ? 'bg-green-100 text-green-700'
                    : step.id === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.id < currentStep ? (
                  <CheckCircle2 size={20} />
                ) : (
                  step.id
                )}
              </div>
              <div className="text-xs mt-2 text-center w-24 sm:w-32">
                <div
                  className={`font-medium ${
                    step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
                <div className="hidden sm:block text-gray-500 mt-1">
                  {step.description}
                </div>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdmissionSteps;