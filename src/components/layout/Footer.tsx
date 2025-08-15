
'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return null;
  }
    
  const footerLinks = {
    'Platform': [
      { href: '#', label: 'Courses' },
      { href: '#', label: 'Plans & Pricing' },
      { href: '#', label: 'For Business' },
    ],
    'Community': [
        { href: '#', label: 'Forums' },
        { href: '#', label: 'Discord' },
        { href: '#', label: 'Events' },
    ],
    'Company': [
      { href: '#', label: 'About Us' },
      { href: '#', label: 'Careers' },
      { href: '#', label: 'Contact' },
    ],
  };

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-2xl">LearnSwift</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              The best place to learn Swift and build amazing iOS applications.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
             {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-headline font-semibold mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LearnSwift, Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
