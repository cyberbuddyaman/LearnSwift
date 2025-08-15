export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  duration: string;
  rating: number;
  reviewCount: number;
  price: number;
  thumbnail: string;
  progress?: number;
  lessons: { id: string; title: string; duration: string; isCompleted: boolean }[];
  isEnrolled?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  comment: string;
}

export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  joinedDate: string;
  status: 'active' | 'banned';
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface EngagementData {
  date: string;
  logins: number;
  completions: number;
}
