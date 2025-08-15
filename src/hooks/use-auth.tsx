
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { doc, setDoc } from "firebase/firestore"; 

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<any>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAILS = ['diana@example.com', 'admin@learnswift.com'];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAdmin(user ? ADMIN_EMAILS.includes(user.email || '') : false);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;
    
    const isAdminRoute = pathname.startsWith('/admin');
    const isStudentDashboard = pathname.startsWith('/dashboard');

    if (!user && (isAdminRoute || isStudentDashboard)) {
      router.push('/login');
    } else if (user && isAdminRoute && !isAdmin) {
        router.push('/dashboard');
    } else if (user && isStudentDashboard && isAdmin) {
        router.push('/admin/dashboard');
    }

  }, [user, loading, isAdmin, pathname, router]);

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signup = async (email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    if (user) {
      const userRole = ADMIN_EMAILS.includes(user.email || '') ? 'admin' : 'student';
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || user.email?.split('@')[0] || 'New User',
        email: user.email,
        role: userRole,
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'active',
        avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
        id: user.uid
      });
    }
    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAdmin,
  };

  // Prevent rendering protected routes while loading to avoid flashing content
  const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');
  if(loading && isProtectedRoute) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
