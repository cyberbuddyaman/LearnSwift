
'use client';

import { CourseCard } from "@/components/shared/CourseCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/lib/data";
import { Award, Flame, Star, Trophy } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function StudentDashboard() {
  const { user, userData, loading } = useAuth();
  const enrolledCourses = courses.filter(c => c.isEnrolled);

  const gamification = {
    badges: [
      { id: 1, name: 'Swift Starter', icon: <Star className="h-6 w-6 text-yellow-400" />, date: '2023-10-05' },
      { id: 2, name: 'UI Pro', icon: <Award className="h-6 w-6 text-blue-500" />, date: '2023-11-12' },
      { id: 3, name: '5-Day Streak', icon: <Flame className="h-6 w-6 text-orange-500" />, date: '2023-11-18' },
    ],
    leaderboard: [
      { id: 1, name: 'Alex Johnson', points: 1250, avatar: 'https://i.pravatar.cc/150?u=alex' },
      { id: 2, name: 'You', points: 1100, avatar: userData?.avatar || `https://i.pravatar.cc/150?u=${user?.uid}` },
      { id: 3, name: 'Maria Garcia', points: 980, avatar: 'https://i.pravatar.cc/150?u=maria' },
    ]
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-1/2 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-80 w-full" />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if(!user) return null;


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Welcome Back, {userData?.name || user.displayName || 'Student'}!</h1>
          <p className="text-muted-foreground">Continue your learning journey and build something amazing today.</p>
        </div>
        <Link href="/courses">
          <Button>Browse New Courses</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-headline font-semibold mb-4">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
            {enrolledCourses.length === 0 && (
              <Card className="flex items-center justify-center h-80">
                <div className="text-center">
                  <p className="mb-4">You are not enrolled in any courses yet.</p>
                  <Link href="/courses">
                    <Button>Explore Courses</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><Trophy className="mr-2 h-5 w-5 text-yellow-500" /> Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {gamification.leaderboard.map((leaderboardUser, index) => (
                  <li key={leaderboardUser.id} className={`flex items-center justify-between p-2 rounded-md ${leaderboardUser.name === 'You' ? 'bg-primary/10' : ''}`}>
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-4">{index + 1}</span>
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={leaderboardUser.avatar} alt={leaderboardUser.name} />
                        <AvatarFallback>{leaderboardUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{leaderboardUser.name === 'You' ? (userData?.name || 'You') : leaderboardUser.name}</p>
                        <p className="text-sm text-muted-foreground">{leaderboardUser.points} XP</p>
                      </div>
                    </div>
                     {index < 3 && <Trophy className={`h-6 w-6 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-orange-400'}`} />}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><Award className="mr-2 h-5 w-5 text-blue-500" /> My Badges</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              {gamification.badges.map(badge => (
                <div key={badge.id} className="flex flex-col items-center p-2 rounded-md hover:bg-muted transition-colors">
                  <div className="p-3 rounded-full bg-primary/10 mb-2">{badge.icon}</div>
                  <p className="text-xs font-semibold">{badge.name}</p>
                   <p className="text-xs text-muted-foreground">{badge.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
