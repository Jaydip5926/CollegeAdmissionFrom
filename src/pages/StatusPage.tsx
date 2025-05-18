import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Search, FileText, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

type ApplicationStatus = 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected' | null;

interface ApplicationStatusResult {
  id: string;
  applicantName: string;
  course: string;
  status: ApplicationStatus;
  lastUpdated: string;
  remarks?: string;
}

const StatusPage: React.FC = () => {
  const [applicationId, setApplicationId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusResult, setStatusResult] = useState<ApplicationStatusResult | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationId || !email) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setFormSubmitted(true);
    
    // Mock API call - simulating status check
    setTimeout(() => {
      const mockStatuses: ApplicationStatus[] = [
        'submitted', 'under-review', 'approved', 'rejected'
      ];
      
      // Using a deterministic way to pick a status based on the input
      // This is just for demo purposes to create consistent results
      const statusIndex = (applicationId.charCodeAt(0) + email.length) % mockStatuses.length;
      const status = mockStatuses[statusIndex];
      
      if (applicationId === '12345' && email === 'demo@example.com') {
        // Demo case for showing a rejected application
        setStatusResult({
          id: applicationId,
          applicantName: 'Demo Student',
          course: 'Bachelor of Science',
          status: 'rejected',
          lastUpdated: '2025-03-20',
          remarks: 'Incomplete documentation. Missing 12th marksheet and domicile certificate.'
        });
      } else if (applicationId === '67890' && email === 'demo@example.com') {
        // Demo case for showing an approved application
        setStatusResult({
          id: applicationId,
          applicantName: 'Demo Student',
          course: 'Bachelor of Arts',
          status: 'approved',
          lastUpdated: '2025-03-18',
          remarks: 'Congratulations! Please complete fee payment by April 15, 2025.'
        });
      } else {
        setStatusResult({
          id: applicationId,
          applicantName: 'John Doe',
          course: ['Bachelor of Technology', 'Bachelor of Commerce', 'Bachelor of Business Administration'][
            Math.floor(Math.random() * 3)
          ],
          status,
          lastUpdated: new Date().toISOString().split('T')[0],
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return <FileText size={24} className="text-blue-600" />;
      case 'under-review':
        return <Clock size={24} className="text-amber-500" />;
      case 'approved':
        return <CheckCircle size={24} className="text-green-600" />;
      case 'rejected':
        return <XCircle size={24} className="text-red-600" />;
      default:
        return <AlertTriangle size={24} className="text-gray-400" />;
    }
  };

  const getStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return 'Application Submitted';
      case 'under-review':
        return 'Under Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const getStatusBgColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100';
      case 'under-review':
        return 'bg-amber-100';
      case 'approved':
        return 'bg-green-100';
      case 'rejected':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusTextColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return 'text-blue-800';
      case 'under-review':
        return 'text-amber-800';
      case 'approved':
        return 'text-green-800';
      case 'rejected':
        return 'text-red-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Check Application Status</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your application ID and registered email to check the current status of your admission application.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Application ID"
                type="text"
                id="applicationId"
                placeholder="Enter your application ID (e.g. APP12345)"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                icon={<Search size={18} className="text-gray-400" />}
                required
              />

              <Input
                label="Registered Email"
                type="email"
                id="email"
                placeholder="Enter your registered email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="flex justify-end">
                <Button type="submit" isLoading={isLoading}>
                  Check Status
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {formSubmitted && (
          <div className="max-w-2xl mx-auto">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Checking application status...</p>
              </div>
            ) : statusResult ? (
              <Card className="p-6">
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">Application Status</h2>
                  <p className="text-gray-600">Application ID: {statusResult.id}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Applicant Name</p>
                    <p className="text-gray-800 font-medium">{statusResult.applicantName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Course Applied</p>
                    <p className="text-gray-800 font-medium">{statusResult.course}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                    <p className="text-gray-800 font-medium">{statusResult.lastUpdated}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(statusResult.status)} ${getStatusTextColor(statusResult.status)}`}>
                        {getStatusIcon(statusResult.status)}
                        <span className="ml-2">{getStatusText(statusResult.status)}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {statusResult.remarks && (
                  <div className={`p-4 rounded-lg ${
                    statusResult.status === 'approved' 
                      ? 'bg-green-50 border border-green-200' 
                      : statusResult.status === 'rejected'
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <h3 className="font-medium text-gray-800 mb-2">Remarks</h3>
                    <p className={`text-sm ${
                      statusResult.status === 'approved' 
                        ? 'text-green-700' 
                        : statusResult.status === 'rejected'
                        ? 'text-red-700'
                        : 'text-blue-700'
                    }`}>
                      {statusResult.remarks}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex flex-col md:flex-row gap-4">
                  {statusResult.status === 'approved' && (
                    <Button>
                      Proceed to Payment
                    </Button>
                  )}
                  
                  {statusResult.status === 'rejected' && (
                    <Button variant="outline">
                      Contact Admissions Office
                    </Button>
                  )}
                  
                  <Button 
                    variant={statusResult.status === 'approved' || statusResult.status === 'rejected' ? 'outline' : 'primary'}
                    onClick={() => {
                      setFormSubmitted(false);
                      setStatusResult(null);
                      setApplicationId('');
                      setEmail('');
                    }}
                  >
                    Check Another Application
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center">
                <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">Application Not Found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find any application with the provided ID and email. Please check your details and try again.
                </p>
                <Button
                  onClick={() => {
                    setFormSubmitted(false);
                  }}
                >
                  Try Again
                </Button>
              </Card>
            )}
          </div>
        )}

        <div className="max-w-3xl mx-auto mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Tip: Application Status Meanings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Submitted</h3>
                <p className="text-sm text-gray-600">Your application has been successfully submitted and is awaiting review.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Clock size={20} className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Under Review</h3>
                <p className="text-sm text-gray-600">Our admissions team is currently evaluating your application.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Approved</h3>
                <p className="text-sm text-gray-600">Congratulations! Your application has been approved. Please proceed with fee payment.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <XCircle size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Rejected</h3>
                <p className="text-sm text-gray-600">Your application has been rejected. Please check the remarks for more information.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;