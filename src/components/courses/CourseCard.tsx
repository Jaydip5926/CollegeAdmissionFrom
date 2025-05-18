import React from 'react';
import { Clock, BookOpen, Users, Calendar } from 'lucide-react';
import { Course } from '../../types';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card hoverable className="flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{course.name}</h3>
        <div className="text-sm bg-blue-100 text-blue-800 inline-block px-2 py-1 rounded mb-3">
          {course.degree}
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2 text-blue-800" />
            <span>Duration: {course.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen size={16} className="mr-2 text-blue-800" />
            <span>Eligibility: {course.eligibility}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users size={16} className="mr-2 text-blue-800" />
            <span>Seats Available: {course.seats}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4 mt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-blue-800">{formatCurrency(course.fees)}</div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>Per Year</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link to={`/courses/${course.id}`} className="flex-1">
            <Button variant="outline" fullWidth>
              View Details
            </Button>
          </Link>
          <Link to={`/admission?course=${course.id}`} className="flex-1">
            <Button fullWidth>
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;