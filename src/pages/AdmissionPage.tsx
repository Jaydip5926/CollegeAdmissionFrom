import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

import AdmissionSteps from '../components/admission/AdmissionSteps';
import PersonalDetailsForm from '../components/admission/PersonalDetailsForm';
import EducationalDetailsForm from '../components/admission/EducationalDetailsForm';
import CourseSelectionForm from '../components/admission/CourseSelectionForm';
import DocumentUploadForm from '../components/admission/DocumentUploadForm';
import ReviewForm from '../components/admission/ReviewForm';
import PaymentForm from '../components/admission/PaymentForm';

import Card from '../components/ui/Card';
import { PersonalDetails, EducationalDetails, CourseSelection, DocumentUploads, PaymentDetails, AdmissionForm } from '../types';

const AdmissionPage: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preselectedCourseId = queryParams.get('course');

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AdmissionForm>>({
    id: `APP${Math.floor(Math.random() * 90000) + 10000}`,
    userId: currentUser?.id || '',
    status: 'draft',
    courseSelection: preselectedCourseId ? { courseId: preselectedCourseId } : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info('Please login to continue with your application');
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  const handlePersonalDetailsSubmit = (data: PersonalDetails) => {
    setFormData(prevData => ({
      ...prevData,
      personalDetails: data,
      updatedAt: new Date().toISOString()
    }));
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handleEducationalDetailsSubmit = (data: EducationalDetails) => {
    setFormData(prevData => ({
      ...prevData,
      educationalDetails: data,
      updatedAt: new Date().toISOString()
    }));
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };

  const handleCourseSelectionSubmit = (data: CourseSelection) => {
    setFormData(prevData => ({
      ...prevData,
      courseSelection: data,
      updatedAt: new Date().toISOString()
    }));
    setCurrentStep(4);
    window.scrollTo(0, 0);
  };

  const handleDocumentUploadSubmit = (data: DocumentUploads) => {
    setFormData(prevData => ({
      ...prevData,
      documentUploads: data,
      updatedAt: new Date().toISOString()
    }));
    setCurrentStep(5);
    window.scrollTo(0, 0);
  };

  const handleReviewSubmit = () => {
    setFormData(prevData => ({
      ...prevData,
      status: 'submitted',
      updatedAt: new Date().toISOString()
    }));
    setCurrentStep(6);
    window.scrollTo(0, 0);
    
    // In a real application, this would be where you submit the form to your backend
    toast.success('Application submitted successfully! Please complete the payment.');
  };

  const handlePaymentSubmit = (data: PaymentDetails) => {
    setFormData(prevData => ({
      ...prevData,
      paymentDetails: data,
      updatedAt: new Date().toISOString()
    }));
    
    // In a real application, this is where you would handle payment processing
    // and redirect to a success page or application status page
    toast.success('Payment successful! Your application is complete.');
  };

  const handleStepBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo(0, 0);
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Admission Application</h1>
          <p className="text-lg text-gray-600">
            Complete all steps to submit your application for the academic year 2025-26.
          </p>
        </div>

        <div className="overflow-hidden">
          <AdmissionSteps currentStep={currentStep} />
        </div>

        <Card className="mb-12">
          <div className="p-6">
            {currentStep === 1 && (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Details</h2>
                <PersonalDetailsForm 
                  defaultValues={formData.personalDetails} 
                  onSubmit={handlePersonalDetailsSubmit} 
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Educational Details</h2>
                <EducationalDetailsForm 
                  defaultValues={formData.educationalDetails} 
                  onSubmit={handleEducationalDetailsSubmit}
                  onBack={handleStepBack}
                />
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Course Selection</h2>
                <CourseSelectionForm 
                  defaultValues={formData.courseSelection} 
                  onSubmit={handleCourseSelectionSubmit}
                  onBack={handleStepBack}
                />
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Document Upload</h2>
                <DocumentUploadForm 
                  defaultValues={formData.documentUploads} 
                  onSubmit={handleDocumentUploadSubmit}
                  onBack={handleStepBack}
                  requiredDocuments={{
                    casteCertificate: (formData.personalDetails?.caste !== 'General' && !!formData.personalDetails?.caste)
                  }}
                />
              </>
            )}

            {currentStep === 5 && (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Review & Submit</h2>
                <ReviewForm 
                  formData={formData} 
                  onSubmit={handleReviewSubmit}
                  onBack={handleStepBack}
                  onEdit={handleEditStep}
                />
              </>
            )}

            {currentStep === 6 && (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Payment</h2>
                <PaymentForm 
                  onSubmit={handlePaymentSubmit}
                  applicationFee={1000}
                  onBack={handleStepBack}
                />
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdmissionPage;