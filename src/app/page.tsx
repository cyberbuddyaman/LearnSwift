import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, PlayCircle, Users, BookOpen } from 'lucide-react';
import { CourseCard } from '@/components/shared/CourseCard';
import { courses, testimonials } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-blue-50/50">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 text-primary font-semibold">Start Your Swift Journey Today</Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-foreground mb-6 leading-tight">
              Master Swift & iOS Development
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              Unlock your potential with expert-led courses. From beginner basics to advanced app architecture, we have a course for you.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="font-semibold">
                Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="font-semibold">
                Watch Intro <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-headline font-bold mb-2">Expert-Led Courses</h3>
                <p className="text-muted-foreground">Learn from industry professionals with real-world experience.</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-headline font-bold mb-2">Thriving Community</h3>
                <p className="text-muted-foreground">Join a community of learners and mentors to grow together.</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-headline font-bold mb-2">Project-Based Learning</h3>
                <p className="text-muted-foreground">Build a portfolio of real apps to showcase your new skills.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Courses Section */}
        <section className="py-16 bg-blue-50/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-10">Trending Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
             <div className="text-center mt-12">
              <Button variant="outline" className="font-semibold">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg font-headline">{testimonial.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">&ldquo;{testimonial.comment}&rdquo;</p>
                  </CardContent>
                   <CardFooter>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
