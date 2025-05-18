import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="College campus"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Your Journey to Success Begins Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Join our prestigious institution for quality education and a bright future. Applications for the academic year 2025-26 are now open.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/admission">
              <Button size="lg">Apply Now</Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="bg-blue-800 bg-opacity-30 border-white text-white hover:bg-blue-800 hover:bg-opacity-40">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-900 to-transparent"></div>
    </div>
  );
};

export default HeroSection;