'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users } from 'lucide-react';
import CircularProgressBar from './CircularProgressBar';
import { Button } from '../ui/button';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 transform group-hover:-translate-y-1 shadow-md hover:shadow-primary/20 overflow-hidden">
        <CardHeader className="p-0 relative">
          <Image
            src={course.thumbnail}
            alt={course.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="online course programming"
          />
           {course.progress !== undefined && course.progress > 0 && course.progress < 100 && (
             <div className="absolute top-3 right-3">
              <CircularProgressBar progress={course.progress} size={40} strokeWidth={4} />
            </div>
           )}
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <Badge variant="secondary" className="mb-2 text-primary font-semibold">{course.category}</Badge>
          <CardTitle className="text-lg font-headline leading-tight mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 border-t mt-auto">
          <div className="flex justify-between items-center w-full">
             <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">{course.instructor}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold text-foreground">{course.rating}</span>
                <span className="text-xs text-muted-foreground">({course.reviewCount})</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
