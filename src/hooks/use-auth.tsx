
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import type { User, UserRole } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<any>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAILS = ['diana@example.com', 'admin@learnswift.com'];

const AuthLayoutSkeleton = () => (
  <div className="flex min-h-screen">
    <div className="hidden md:block border-r p-4" style={{width: '16rem'}}>
      <div className="flex items-center gap-2 mb-8">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
    <main className="flex-1 p-6">
      <header className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </header>
      <Skeleton className="w-full h-[600px]" />
    </main>
  </div>
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const uData = userDoc.data() as User;
          setUserData(uData);
          setIsAdmin(uData.role === 'admin');
        } else {
          // This case might happen for users created before firestore logic
           const userRole = ADMIN_EMAILS.includes(user.email || '') ? 'admin' : 'student';
           setIsAdmin(userRole === 'admin');
        }
      } else {
        setUserData(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;
    
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
    const isAdminRoute = pathname.startsWith('/admin');
    const isStudentDashboard = pathname.startsWith('/dashboard');

    if (!user && (isAdminRoute || isStudentDashboard)) {
      router.push('/login');
    } else if (user) {
        if (isAuthRoute) {
            router.push(isAdmin ? '/admin/dashboard' : '/dashboard');
        } else if (isAdminRoute && !isAdmin) {
            router.push('/dashboard');
        } else if (isStudentDashboard && isAdmin) {
            router.push('/admin/dashboard');
        }
    }

  }, [user, loading, isAdmin, pathname, router]);

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signup = async (email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    if (user) {
      const userRole: UserRole = ADMIN_EMAILS.includes(user.email || '') ? 'admin' : 'student';
      const newUser: User = {
        id: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'New User',
        email: user.email!,
        role: userRole,
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'active',
        avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
      };
      await setDoc(doc(db, "users", user.uid), newUser);
      setUserData(newUser);
      setIsAdmin(userRole === 'admin');
    }
    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    userData,
    loading,
    login,
    signup,
    logout,
    isAdmin,
  };

  const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');
  if(loading && isProtectedRoute) {
    return <AuthLayoutSkeleton />;
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
