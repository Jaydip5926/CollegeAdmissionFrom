import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Users, Calendar, CheckCircle } from 'lucide-react';
import { courses } from '../data/courses';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const course = courses.find(c => c.id === id);
  
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
        <p className="text-gray-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/courses">
          <Button>View All Courses</Button>
        </Link>
      </div>
    );
  }
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-blue-800 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        <span>Back to courses</span>
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{course.name}</h1>
              <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {course.degree}
              </span>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                <Clock size={20} className="text-blue-800 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{course.duration}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                <Calendar size={20} className="text-blue-800 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Fees</p>
                  <p className="font-medium">{formatCurrency(course.fees)} / year</p>
                </div>
              </div>
              
              <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                <BookOpen size={20} className="text-blue-800 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Eligibility</p>
                  <p className="font-medium">{course.eligibility}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                <Users size={20} className="text-blue-800 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Total Seats</p>
                  <p className="font-medium">{course.seats}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Course Structure</h2>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="border-b pb-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">First Year</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Foundation courses in core subjects</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Introduction to field-specific knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Basic practical training and laboratory work</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Second Year</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Advanced theoretical concepts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Specialized elective courses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Research methodology and project work</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Final Year</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Industry internship opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Capstone projects and presentations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Career preparation and placement assistance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Apply Now</h3>
            <p className="text-gray-600 mb-6">
              Applications for the academic year 2025-26 are now open. Secure your seat in this program today.
            </p>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Application Fee:</span>
                <span className="font-medium">₹1,000</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Course Fee (per year):</span>
                <span className="font-medium">{formatCurrency(course.fees)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Available Seats:</span>
                <span className="font-medium">{course.seats}</span>
              </div>
            </div>
            
            <Link to={`/admission?course=${course.id}`}>
              <Button fullWidth size="lg">
                Start Application
              </Button>
            </Link>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
              <p className="text-gray-600 text-sm mb-3">
                If you have any questions about this program or the application process, our admissions team is here to help.
              </p>
              <Link to="/contact" className="text-blue-800 text-sm font-medium hover:underline">
                Contact Admissions Office
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;