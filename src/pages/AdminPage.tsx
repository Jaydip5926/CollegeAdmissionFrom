import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter, 
  Download, 
  Search, 
  Eye, 
  CheckSquare, 
  XSquare,
  MessageSquare
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { AdmissionForm } from '../types';

// Mock applications data for demonstration
const mockApplications: AdmissionForm[] = [
  {
    id: 'APP12345',
    userId: 'user1',
    status: 'submitted',
    personalDetails: {
      fullName: 'John Smith',
      dateOfBirth: '2000-05-15',
      gender: 'Male',
      caste: 'General',
      subCaste: '',
      religion: 'Christianity',
      aadhaarNumber: '1234-5678-9012',
      mobileNumber: '9876543210',
      email: 'john.smith@example.com',
      permanentAddress: '123 Main St, City',
      correspondenceAddress: '123 Main St, City'
    },
    educationalDetails: {
      boardName: 'CBSE',
      yearOfPassing: '2023',
      percentage: '85',
      seatNumber: 'S12345',
    },
    courseSelection: {
      courseId: '4',
      specialization: 'Computer Science'
    },
    documentUploads: {
      photo: null,
      marksheet: null,
      domicileCertificate: null,
      aadhaarCard: null
    },
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-03-15T10:30:00Z'
  },
  {
    id: 'APP23456',
    userId: 'user2',
    status: 'under-review',
    personalDetails: {
      fullName: 'Sarah Johnson',
      dateOfBirth: '2001-08-21',
      gender: 'Female',
      caste: 'OBC',
      subCaste: 'XYZ',
      religion: 'Hinduism',
      aadhaarNumber: '2345-6789-0123',
      mobileNumber: '8765432109',
      email: 'sarah.johnson@example.com',
      permanentAddress: '456 Park Ave, Town',
      correspondenceAddress: '456 Park Ave, Town'
    },
    educationalDetails: {
      boardName: 'ICSE',
      yearOfPassing: '2023',
      percentage: '92',
      seatNumber: 'S23456',
      previousCollege: 'XYZ Junior College'
    },
    courseSelection: {
      courseId: '2',
    },
    documentUploads: {
      photo: null,
      marksheet: null,
      casteCertificate: null,
      domicileCertificate: null,
      aadhaarCard: null
    },
    createdAt: '2025-03-16T11:45:00Z',
    updatedAt: '2025-03-18T14:20:00Z'
  },
  {
    id: 'APP34567',
    userId: 'user3',
    status: 'approved',
    personalDetails: {
      fullName: 'Michael Lee',
      dateOfBirth: '2000-11-30',
      gender: 'Male',
      caste: 'General',
      subCaste: '',
      religion: 'Buddhism',
      aadhaarNumber: '3456-7890-1234',
      mobileNumber: '7654321098',
      email: 'michael.lee@example.com',
      permanentAddress: '789 Oak St, Village',
      correspondenceAddress: '789 Oak St, Village'
    },
    educationalDetails: {
      boardName: 'State Board',
      yearOfPassing: '2022',
      percentage: '78',
      seatNumber: 'S34567',
    },
    courseSelection: {
      courseId: '1',
    },
    documentUploads: {
      photo: null,
      marksheet: null,
      domicileCertificate: null,
      aadhaarCard: null
    },
    createdAt: '2025-03-14T09:15:00Z',
    updatedAt: '2025-03-19T16:30:00Z',
    remarks: 'All documents verified. Fee payment pending.'
  },
  {
    id: 'APP45678',
    userId: 'user4',
    status: 'rejected',
    personalDetails: {
      fullName: 'Emily Chen',
      dateOfBirth: '2002-02-14',
      gender: 'Female',
      caste: 'SC',
      subCaste: 'ABC',
      religion: 'Hinduism',
      aadhaarNumber: '4567-8901-2345',
      mobileNumber: '6543210987',
      email: 'emily.chen@example.com',
      permanentAddress: '101 Pine Rd, County',
      correspondenceAddress: '101 Pine Rd, County'
    },
    educationalDetails: {
      boardName: 'CBSE',
      yearOfPassing: '2023',
      percentage: '65',
      seatNumber: 'S45678',
    },
    courseSelection: {
      courseId: '3',
    },
    documentUploads: {
      photo: null,
      marksheet: null,
      casteCertificate: null,
      domicileCertificate: null,
      aadhaarCard: null
    },
    createdAt: '2025-03-17T13:00:00Z',
    updatedAt: '2025-03-20T10:45:00Z',
    remarks: 'Ineligible due to low percentage. Minimum requirement is 70%.'
  },
  {
    id: 'APP56789',
    userId: 'user5',
    status: 'submitted',
    personalDetails: {
      fullName: 'David Wilson',
      dateOfBirth: '2001-05-22',
      gender: 'Male',
      caste: 'General',
      subCaste: '',
      religion: 'Islam',
      aadhaarNumber: '5678-9012-3456',
      mobileNumber: '5432109876',
      email: 'david.wilson@example.com',
      permanentAddress: '202 Elm St, District',
      correspondenceAddress: '202 Elm St, District'
    },
    educationalDetails: {
      boardName: 'State Board',
      yearOfPassing: '2023',
      percentage: '82',
      seatNumber: 'S56789',
    },
    courseSelection: {
      courseId: '5',
    },
    documentUploads: {
      photo: null,
      marksheet: null,
      domicileCertificate: null,
      aadhaarCard: null
    },
    createdAt: '2025-03-18T15:30:00Z',
    updatedAt: '2025-03-18T15:30:00Z'
  }
];

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [applications, setApplications] = useState<AdmissionForm[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<AdmissionForm[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<AdmissionForm | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [remarks, setRemarks] = useState('');
  
  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      toast.error('You do not have permission to access this page');
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  // Load applications
  useEffect(() => {
    // In a real app, this would be an API call
    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...applications];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.personalDetails.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.personalDetails.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    // Course filter
    if (courseFilter !== 'all') {
      filtered = filtered.filter(app => app.courseSelection.courseId === courseFilter);
    }
    
    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter, courseFilter]);

  const handleViewApplication = (application: AdmissionForm) => {
    setSelectedApplication(application);
    setRemarks(application.remarks || '');
  };

  const handleUpdateStatus = (newStatus: 'under-review' | 'approved' | 'rejected') => {
    if (!selectedApplication) return;
    
    // Update application status
    const updatedApplications = applications.map(app => {
      if (app.id === selectedApplication.id) {
        return {
          ...app,
          status: newStatus,
          remarks: remarks,
          updatedAt: new Date().toISOString()
        };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    
    // Update selected application
    setSelectedApplication({
      ...selectedApplication,
      status: newStatus,
      remarks,
      updatedAt: new Date().toISOString()
    });
    
    toast.success(`Application ${selectedApplication.id} has been ${newStatus.replace('-', ' ')}`);
  };

  const handleExportData = () => {
    // In a real app, this would generate an Excel file
    toast.info('Export functionality would generate an Excel file in a real application');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <FileText size={12} className="mr-1" />
          Submitted
        </span>;
      case 'under-review':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          <Clock size={12} className="mr-1" />
          Under Review
        </span>;
      case 'approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle size={12} className="mr-1" />
          Approved
        </span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle size={12} className="mr-1" />
          Rejected
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
            <p className="text-gray-600">
              Manage admissions and review applications
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button onClick={handleExportData} variant="outline">
              <Download size={16} className="mr-2" />
              Export Data
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-4 border-b">
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Search size={16} className="text-gray-500 mr-2" />
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                      Search
                    </label>
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Name, ID, or Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                  </div>
                  <select
                    id="status"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="submitted">Submitted</option>
                    <option value="under-review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Filter size={16} className="text-gray-500 mr-2" />
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                      Course
                    </label>
                  </div>
                  <select
                    id="course"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                  >
                    <option value="all">All Courses</option>
                    <option value="1">Bachelor of Arts</option>
                    <option value="2">Bachelor of Science</option>
                    <option value="3">Bachelor of Commerce</option>
                    <option value="4">Bachelor of Technology</option>
                    <option value="5">Bachelor of Business Administration</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>Application Count</span>
                    <span className="font-medium text-gray-800">{filteredApplications.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>Pending Review</span>
                    <span className="font-medium text-gray-800">
                      {filteredApplications.filter(app => app.status === 'submitted').length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Completed</span>
                    <span className="font-medium text-gray-800">
                      {filteredApplications.filter(app => app.status === 'approved' || app.status === 'rejected').length}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            {selectedApplication ? (
              <Card>
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-800">Application Details</h2>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedApplication(null)}
                    size="sm"
                  >
                    Back to List
                  </Button>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-6 pb-4 border-b">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {selectedApplication.personalDetails.fullName}
                      </h3>
                      <p className="text-gray-600">
                        Application ID: {selectedApplication.id}
                      </p>
                      <div className="mt-2">
                        {getStatusBadge(selectedApplication.status)}
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-sm text-gray-500">Submitted on</p>
                      <p className="font-medium">
                        {formatDate(selectedApplication.createdAt)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Last updated</p>
                      <p className="font-medium">
                        {formatDate(selectedApplication.updatedAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Details</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{selectedApplication.personalDetails.fullName}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p className="font-medium">{selectedApplication.personalDetails.dateOfBirth}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Gender</p>
                            <p className="font-medium">{selectedApplication.personalDetails.gender}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Contact</p>
                            <p className="font-medium">{selectedApplication.personalDetails.mobileNumber}</p>
                            <p className="font-medium">{selectedApplication.personalDetails.email}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="font-medium">
                              {selectedApplication.personalDetails.caste}
                              {selectedApplication.personalDetails.subCaste && ` - ${selectedApplication.personalDetails.subCaste}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Educational Details</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <p className="text-sm text-gray-500">Board</p>
                            <p className="font-medium">{selectedApplication.educationalDetails.boardName}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Year of Passing</p>
                            <p className="font-medium">{selectedApplication.educationalDetails.yearOfPassing}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Percentage</p>
                            <p className="font-medium">{selectedApplication.educationalDetails.percentage}%</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Previous Institution</p>
                            <p className="font-medium">{selectedApplication.educationalDetails.previousCollege || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Course Details</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <p className="text-sm text-gray-500">Course Applied</p>
                            <p className="font-medium">
                              {selectedApplication.courseSelection.courseId === '1' && 'Bachelor of Arts'}
                              {selectedApplication.courseSelection.courseId === '2' && 'Bachelor of Science'}
                              {selectedApplication.courseSelection.courseId === '3' && 'Bachelor of Commerce'}
                              {selectedApplication.courseSelection.courseId === '4' && 'Bachelor of Technology'}
                              {selectedApplication.courseSelection.courseId === '5' && 'Bachelor of Business Administration'}
                            </p>
                          </div>
                          
                          {selectedApplication.courseSelection.specialization && (
                            <div>
                              <p className="text-sm text-gray-500">Specialization</p>
                              <p className="font-medium">{selectedApplication.courseSelection.specialization}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Documents</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-3">Required Documents</p>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm">
                            <span className="h-5 w-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-2">✓</span>
                            Photo ID
                          </li>
                          <li className="flex items-center text-sm">
                            <span className="h-5 w-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-2">✓</span>
                            12th Marksheet
                          </li>
                          <li className="flex items-center text-sm">
                            <span className="h-5 w-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-2">✓</span>
                            Aadhaar Card
                          </li>
                          {(selectedApplication.personalDetails.caste === 'SC' || 
                            selectedApplication.personalDetails.caste === 'ST' || 
                            selectedApplication.personalDetails.caste === 'OBC') && (
                            <li className="flex items-center text-sm">
                              <span className="h-5 w-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-2">✓</span>
                              Caste Certificate
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Admin Remarks</h3>
                    <textarea
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Add your remarks here..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 justify-end">
                    {selectedApplication.status === 'submitted' && (
                      <Button
                        variant="outline"
                        onClick={() => handleUpdateStatus('under-review')}
                      >
                        <Clock size={16} className="mr-2" />
                        Mark as Under Review
                      </Button>
                    )}
                    
                    {(selectedApplication.status === 'submitted' || selectedApplication.status === 'under-review') && (
                      <>
                        <Button
                          variant="danger"
                          onClick={() => handleUpdateStatus('rejected')}
                        >
                          <XSquare size={16} className="mr-2" />
                          Reject Application
                        </Button>
                        
                        <Button
                          onClick={() => handleUpdateStatus('approved')}
                        >
                          <CheckSquare size={16} className="mr-2" />
                          Approve Application
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="p-4 border-b">
                  <h2 className="text-lg font-bold text-gray-800">Applications</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applicant
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredApplications.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                            No applications found
                          </td>
                        </tr>
                      ) : (
                        filteredApplications.map((application) => (
                          <tr key={application.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                  <Users size={20} className="text-gray-500" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {application.personalDetails.fullName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {application.personalDetails.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {application.courseSelection.courseId === '1' && 'Bachelor of Arts'}
                                {application.courseSelection.courseId === '2' && 'Bachelor of Science'}
                                {application.courseSelection.courseId === '3' && 'Bachelor of Commerce'}
                                {application.courseSelection.courseId === '4' && 'Bachelor of Technology'}
                                {application.courseSelection.courseId === '5' && 'Bachelor of Business Administration'}
                              </div>
                              {application.courseSelection.specialization && (
                                <div className="text-sm text-gray-500">
                                  {application.courseSelection.specialization}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(application.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(application.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleViewApplication(application)}
                              >
                                <Eye size={16} className="mr-1" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;