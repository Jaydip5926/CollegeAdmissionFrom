import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-800">
            <span className="text-5xl font-bold">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button size="lg" variant="primary" className="mb-3 sm:mb-0">
              <Home size={18} className="mr-2" />
              Go to Homepage
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline">
              <Search size={18} className="mr-2" />
              Help & Support
            </Button>
          </Link>
        </div>
        <button 
          onClick={() => window.history.back()} 
          className="mt-8 inline-flex items-center text-blue-800 hover:text-blue-600"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;