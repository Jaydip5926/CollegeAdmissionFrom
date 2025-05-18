import { Course } from '../types';

export const courses: Course[] = [
  {
    id: '1',
    name: 'Bachelor of Arts',
    degree: 'B.A.',
    duration: '3 Years',
    fees: 25000,
    description: 'A comprehensive arts program covering humanities, social sciences, and languages. Students develop critical thinking, analytical skills, and cultural awareness through diverse coursework.',
    eligibility: 'Minimum 50% in 12th standard from any recognized board',
    seats: 120
  },
  {
    id: '2',
    name: 'Bachelor of Science',
    degree: 'B.Sc.',
    duration: '3 Years',
    fees: 30000,
    description: 'A rigorous science program with specializations in Physics, Chemistry, Biology, Mathematics, and Computer Science. Strong emphasis on practical laboratory work and research methodology.',
    eligibility: 'Minimum 55% in 12th standard with Science stream',
    seats: 90
  },
  {
    id: '3',
    name: 'Bachelor of Commerce',
    degree: 'B.Com.',
    duration: '3 Years',
    fees: 28000,
    description: 'A business-focused program covering accounting, economics, business law, and management principles. Prepares students for careers in finance, accounting, and business administration.',
    eligibility: 'Minimum 50% in 12th standard from any recognized board',
    seats: 150
  },
  {
    id: '4',
    name: 'Bachelor of Technology',
    degree: 'B.Tech.',
    duration: '4 Years',
    fees: 85000,
    description: 'A comprehensive engineering program with specializations in Computer Science, Electronics, Mechanical, and Civil Engineering. Includes industry internships and capstone projects.',
    eligibility: 'Minimum 60% in 12th standard with PCM/PCB and qualifying entrance exam',
    seats: 60
  },
  {
    id: '5',
    name: 'Bachelor of Business Administration',
    degree: 'BBA',
    duration: '3 Years',
    fees: 45000,
    description: 'A management-focused program that develops leadership, entrepreneurship, and business strategy skills. Includes case studies, business simulations, and industry projects.',
    eligibility: 'Minimum 55% in 12th standard from any recognized board',
    seats: 60
  },
  {
    id: '6',
    name: 'Bachelor of Computer Applications',
    degree: 'BCA',
    duration: '3 Years',
    fees: 40000,
    description: 'A technical program focused on computer applications, programming languages, database management, and software development methodologies.',
    eligibility: 'Minimum 50% in 12th standard with Mathematics',
    seats: 90
  }
];