import type { Course, Testimonial, User, RevenueData, EngagementData } from './types';

export const courses: Course[] = [
  {
    id: 'swift-for-beginners',
    title: 'Swift 5.9 Fundamentals',
    description: 'A comprehensive guide for complete beginners to master the basics of Swift.',
    longDescription: 'Dive into the world of iOS development with our Swift Fundamentals course. You will learn about variables, control flow, functions, and data structures. This course is designed to give you a solid foundation for building your first iOS app.',
    instructor: 'Jane Doe',
    instructorAvatar: 'https://i.pravatar.cc/150?u=jane',
    category: 'Beginner',
    duration: '10h 30m',
    rating: 4.8,
    reviewCount: 1250,
    price: 49.99,
    thumbnail: 'https://placehold.co/600x400/5377FF/FFFFFF.png',
    progress: 75,
    isEnrolled: true,
    lessons: [
      { id: 'l1', title: 'Introduction to Swift', duration: '15m', isCompleted: true },
      { id: 'l2', title: 'Variables and Constants', duration: '30m', isCompleted: true },
      { id: 'l3', title: 'Control Flow', duration: '45m', isCompleted: false },
    ]
  },
  {
    id: 'swiftui-masterclass',
    title: 'SwiftUI Masterclass',
    description: 'Build beautiful, declarative user interfaces for any Apple device.',
    longDescription: 'Learn to build modern, responsive UIs with SwiftUI. We cover everything from basic views and controls to complex animations and state management. By the end, you will have built several real-world applications.',
    instructor: 'John Smith',
    instructorAvatar: 'https://i.pravatar.cc/150?u=john',
    category: 'Intermediate',
    duration: '25h',
    rating: 4.9,
    reviewCount: 3480,
    price: 99.99,
    thumbnail: 'https://placehold.co/600x400/FF7A53/FFFFFF.png',
    progress: 30,
    isEnrolled: true,
    lessons: [
       { id: 'l1', title: 'Intro to SwiftUI', duration: '20m', isCompleted: true },
       { id: 'l2', title: 'Building Layouts', duration: '1h', isCompleted: true },
       { id: 'l3', title: 'State Management', duration: '1.5h', isCompleted: false },
    ]
  },
  {
    id: 'combine-essentials',
    title: 'Combine: Asynchronous Programming',
    description: 'Understand Apple\'s framework for processing values over time.',
    longDescription: 'This course will teach you how to handle asynchronous events in Swift using the Combine framework. You will learn about Publishers, Subscribers, and Operators to manage complex data flows in your applications.',
    instructor: 'Emily White',
    instructorAvatar: 'https://i.pravatar.cc/150?u=emily',
    category: 'Advanced',
    duration: '15h',
    rating: 4.7,
    reviewCount: 980,
    price: 79.99,
    thumbnail: 'https://placehold.co/600x400/000000/FFFFFF.png',
    progress: 0,
    isEnrolled: false,
     lessons: [
       { id: 'l1', title: 'What is Combine?', duration: '25m', isCompleted: false },
       { id: 'l2', title: 'Publishers and Subscribers', duration: '1.2h', isCompleted: false },
    ]
  },
    {
    id: 'arkit-adventures',
    title: 'ARKit Adventures',
    description: 'Bring your ideas to life with Augmented Reality.',
    longDescription: 'Explore the exciting world of Augmented Reality with ARKit. This project-based course will guide you through building interactive AR experiences, from simple 3D model placement to complex world-tracking apps.',
    instructor: 'Chris Green',
    instructorAvatar: 'https://i.pravatar.cc/150?u=chris',
    category: 'Advanced',
    duration: '18h',
    rating: 4.9,
    reviewCount: 1500,
    price: 119.99,
    thumbnail: 'https://placehold.co/600x400/34D399/FFFFFF.png',
    progress: 0,
    isEnrolled: false,
     lessons: [
       { id: 'l1', title: 'Getting Started with ARKit', duration: '40m', isCompleted: false },
    ]
  },
];

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Alex Johnson',
        handle: '@alexj',
        avatar: 'https://i.pravatar.cc/150?u=alex',
        comment: 'LearnSwift has completely transformed my career. The courses are practical, up-to-date, and the instructors are amazing. I landed my dream iOS developer job thanks to this platform!'
    },
    {
        id: 2,
        name: 'Maria Garcia',
        handle: '@mariag',
        avatar: 'https://i.pravatar.cc/150?u=maria',
        comment: 'The SwiftUI Masterclass is a must for any aspiring developer. The content is broken down so well, making complex topics easy to understand. The community is super helpful too.'
    },
    {
        id: 3,
        name: 'Sam Chen',
        handle: '@samc',
        avatar: 'https://i.pravatar.cc/150?u=sam',
        comment: 'I love the hands-on approach. Building real apps as part of the courses helped solidify my learning and gave me a great portfolio to show to employers.'
    },
]

export const users: User[] = [
  { id: 'usr_1', name: 'Alice', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=alice', role: 'student', joinedDate: '2023-01-15', status: 'active' },
  { id: 'usr_2', name: 'Bob', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=bob', role: 'student', joinedDate: '2023-02-20', status: 'active' },
  { id: 'usr_3', name: 'Charlie', email: 'charlie@example.com', avatar: 'https://i.pravatar.cc/150?u=charlie', role: 'instructor', joinedDate: '2023-03-10', status: 'active' },
  { id: 'usr_4', name: 'Diana', email: 'diana@example.com', avatar: 'https://i.pravatar.cc/150?u=diana', role: 'admin', joinedDate: '2023-01-01', status: 'active' },
  { id: 'usr_5', name: 'Eve', email: 'eve@example.com', avatar: 'https://i.pravatar.cc/150?u=eve', role: 'student', joinedDate: '2023-04-05', status: 'banned' },
];

export const revenueData: RevenueData[] = [
  { month: 'Jan', revenue: 2400 },
  { month: 'Feb', revenue: 1398 },
  { month: 'Mar', revenue: 9800 },
  { month: 'Apr', revenue: 3908 },
  { month: 'May', revenue: 4800 },
  { month: 'Jun', revenue: 3800 },
  { month: 'Jul', revenue: 4300 },
];

export const engagementData: EngagementData[] = [
  { date: '2023-07-01', logins: 120, completions: 30 },
  { date: '2023-07-02', logins: 150, completions: 35 },
  { date: '2023-07-03', logins: 130, completions: 28 },
  { date: '2023-07-04', logins: 180, completions: 45 },
  { date: '2023-07-05', logins: 160, completions: 40 },
  { date: '2023-07-06', logins: 200, completions: 55 },
  { date: '2023-07-07', logins: 190, completions: 50 },
];
