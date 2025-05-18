import React from 'react';
import { Bell, Calendar } from 'lucide-react';
import { Announcement } from '../../types';
import Card from '../ui/Card';

interface AnnouncementsListProps {
  announcements: Announcement[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({ announcements }) => {
  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <Bell className="text-blue-800 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Latest Announcements</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {announcements.map((announcement) => (
          <Card 
            key={announcement.id} 
            className={`transition-all duration-300 ${announcement.important ? 'border-l-4 border-amber-500' : ''}`}
            hoverable
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {announcement.title}
                  {announcement.important && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Important
                    </span>
                  )}
                </h3>
                <p className="text-gray-600">{announcement.content}</p>
              </div>
              <div className="flex items-center mt-3 md:mt-0 text-gray-500">
                <Calendar size={16} className="mr-1" />
                <span className="text-sm">{formatDate(announcement.date)}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsList;