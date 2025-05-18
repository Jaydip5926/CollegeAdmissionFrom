import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CourseCard from '../components/courses/CourseCard';
import { courses } from '../data/courses';
import Input from '../components/ui/Input';

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDegree, setSelectedDegree] = useState<string>('');
  
  // Get unique degrees for filter
  const degrees = Array.from(new Set(courses.map(course => course.degree)));
  
  // Filter courses based on search term and selected degree
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.degree.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDegree = selectedDegree ? course.degree === selectedDegree : true;
    
    return matchesSearch && matchesDegree;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Courses Offered</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Explore our wide range of undergraduate and postgraduate programs designed to help you achieve your academic and career goals.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <Input
            placeholder="Search courses by name, degree or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} className="text-gray-400" />}
            className="py-2"
          />
        </div>
        <div>
          <select
            className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
          >
            <option value="">All Degrees</option>
            {degrees.map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;