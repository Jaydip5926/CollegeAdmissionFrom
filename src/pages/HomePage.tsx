import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AnnouncementsList from '../components/home/AnnouncementsList';
import ImportantDates from '../components/home/ImportantDates';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, GraduationCap, Users } from 'lucide-react';

import { announcements, importantDates } from '../data/announcements';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* College Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome to College Portal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Excellence in Education Since 1985</h3>
              <p className="text-gray-600 mb-6">
                Our institution has been a cornerstone of quality education for over four decades. 
                We're committed to providing students with an exceptional learning environment, 
                modern facilities, and opportunities to excel in their chosen fields.
              </p>
              <p className="text-gray-600 mb-6">
                With a focus on academic rigor, practical skills, and character development, 
                we prepare our students not just for exams but for life's challenges.
              </p>
              <Link to="/about" className="text-blue-800 font-medium flex items-center hover:underline">
                Learn more about our legacy <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="College building" 
                className="rounded-lg shadow-md h-full w-full object-cover" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 bg-blue-50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <GraduationCap size={24} className="text-blue-800" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">50+ Courses</h3>
              <p className="text-gray-600">Wide range of undergraduate and postgraduate programs</p>
            </Card>

            <Card className="text-center p-6 bg-teal-50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-3">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Users size={24} className="text-teal-800" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">200+ Faculty</h3>
              <p className="text-gray-600">Experienced and dedicated teaching professionals</p>
            </Card>

            <Card className="text-center p-6 bg-amber-50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-3">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Award size={24} className="text-amber-800" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">95% Placement</h3>
              <p className="text-gray-600">Excellent career opportunities for our graduates</p>
            </Card>

            <Card className="text-center p-6 bg-purple-50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <BookOpen size={24} className="text-purple-800" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Modern Library</h3>
              <p className="text-gray-600">Extensive collection of books and digital resources</p>
            </Card>
          </div>
        </div>
        
        {/* Announcements and Important Dates */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          <div className="lg:col-span-4">
            <AnnouncementsList announcements={announcements} />
          </div>
          <div className="lg:col-span-3">
            <ImportantDates dates={importantDates} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;