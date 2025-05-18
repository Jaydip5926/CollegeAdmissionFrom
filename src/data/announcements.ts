import { Announcement, ImportantDate } from '../types';

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Admission Open for Academic Year 2025-26',
    date: '2025-03-15',
    content: 'Applications are now being accepted for all undergraduate programs for the academic year 2025-26. Apply online through our admission portal.',
    important: true
  },
  {
    id: '2',
    title: 'Scholarship Program for Meritorious Students',
    date: '2025-03-20',
    content: 'The college is offering scholarships to students who have scored above 90% in their 12th standard examinations. See eligibility details on the scholarship page.',
    important: true
  },
  {
    id: '3',
    title: 'New B.Tech Specialization in AI and Machine Learning',
    date: '2025-03-22',
    content: 'We are excited to announce a new specialization in Artificial Intelligence and Machine Learning for B.Tech students starting this academic year.',
    important: false
  },
  {
    id: '4',
    title: 'Campus Tour for Prospective Students',
    date: '2025-04-05',
    content: 'Join us for a guided campus tour on April 5th, 2025. Register online to secure your spot.',
    important: false
  }
];

export const importantDates: ImportantDate[] = [
  {
    id: '1',
    title: 'Application Submission Deadline',
    date: '2025-06-15',
    description: 'Last date to submit admission applications for all undergraduate programs'
  },
  {
    id: '2',
    title: 'Entrance Examination',
    date: '2025-06-25',
    description: 'Entrance examination for B.Tech and other technical courses'
  },
  {
    id: '3',
    title: 'Document Verification',
    date: '2025-07-05 - 2025-07-15',
    description: 'Physical verification of documents for shortlisted candidates'
  },
  {
    id: '4',
    title: 'First Merit List',
    date: '2025-07-20',
    description: 'Announcement of first merit list for all programs'
  },
  {
    id: '5',
    title: 'Fee Payment Deadline (First Merit List)',
    date: '2025-07-30',
    description: 'Last date for fee payment for students in the first merit list'
  },
  {
    id: '6',
    title: 'Second Merit List',
    date: '2025-08-05',
    description: 'Announcement of second merit list (if seats available)'
  },
  {
    id: '7',
    title: 'Orientation Program',
    date: '2025-08-25',
    description: 'Orientation program for newly admitted students'
  },
  {
    id: '8',
    title: 'Commencement of Classes',
    date: '2025-09-01',
    description: 'First day of classes for the academic year 2025-26'
  }
];