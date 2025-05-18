export interface Course {
  id: string;
  name: string;
  degree: string;
  duration: string;
  fees: number;
  description: string;
  eligibility: string;
  seats: number;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  important: boolean;
}

export interface ImportantDate {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  role: 'student' | 'admin';
  name?: string;
}

export interface PersonalDetails {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  caste: string;
  subCaste: string;
  religion: string;
  aadhaarNumber: string;
  mobileNumber: string;
  email: string;
  permanentAddress: string;
  correspondenceAddress: string;
}

export interface EducationalDetails {
  boardName: string;
  yearOfPassing: string;
  percentage: string;
  seatNumber: string;
  previousCollege?: string;
}

export interface CourseSelection {
  courseId: string;
  specialization?: string;
}

export interface DocumentUploads {
  photo: File | null;
  marksheet: File | null;
  casteCertificate?: File | null;
  domicileCertificate: File | null;
  aadhaarCard: File | null;
  signature: File | null;
  lcCertificate?: File | null;
  otherCertificates?: File[] | null;
}

export interface PaymentDetails {
  mode: 'UPI' | 'DebitCard' | 'CreditCard' | 'NetBanking';
  amount: number;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  date?: string;
}

export interface AdmissionForm {
  id: string;
  userId: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  personalDetails: PersonalDetails;
  educationalDetails: EducationalDetails;
  courseSelection: CourseSelection;
  documentUploads: DocumentUploads;
  paymentDetails?: PaymentDetails;
  createdAt: string;
  updatedAt: string;
  remarks?: string;
}