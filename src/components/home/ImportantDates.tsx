import React from 'react';
import { Clock } from 'lucide-react';
import { ImportantDate } from '../../types';
import Card from '../ui/Card';

interface ImportantDatesProps {
  dates: ImportantDate[];
}

const ImportantDates: React.FC<ImportantDatesProps> = ({ dates }) => {
  // Format date helper function
  const formatDate = (dateString: string) => {
    // Handle date ranges (if dateString contains a hyphen)
    if (dateString.includes('-')) {
      const [start, end] = dateString.split('-').map(d => d.trim());
      const startFormatted = new Date(start).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const endFormatted = new Date(end).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return `${startFormatted} - ${endFormatted}`;
    }
    
    // Handle single dates
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Function to check if a date is in the future
  const isUpcoming = (dateString: string) => {
    // For date ranges, check the end date
    if (dateString.includes('-')) {
      const end = dateString.split('-')[1].trim();
      return new Date(end) > new Date();
    }
    return new Date(dateString) > new Date();
  };

  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <Clock className="text-blue-800 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Important Dates</h2>
      </div>
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dates.map((date) => (
            <Card 
              key={date.id} 
              className={`transition-all duration-300 ${isUpcoming(date.date) ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}
              hoverable
            >
              <div className="flex items-start">
                <div className="min-w-20 h-20 flex flex-col items-center justify-center bg-blue-800 text-white rounded mr-4">
                  <span className="text-sm font-medium">
                    {formatDate(date.date).split(' ')[0]}
                  </span>
                  <span className="text-xl font-bold">
                    {formatDate(date.date).split(' ')[1].replace(',', '')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{date.title}</h3>
                  <p className="text-gray-600 mt-1">{date.description}</p>
                  {isUpcoming(date.date) && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportantDates;