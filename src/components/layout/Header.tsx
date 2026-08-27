'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../ui/Button';
import { ThemeToggle } from '../ThemeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/deals', label: 'Deals' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/restaurants', label: 'For Restaurants' },
    { href: '/impact', label: 'Impact' },
  ];

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center",
          isScrolled 
            ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border py-0" 
            : "bg-background border-b border-transparent py-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-full">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="transition-opacity hover:opacity-80">
                <Image 
                  src="/assets/logo.png" 
                  alt="50% Food Logo" 
                  width={150} 
                  height={50} 
                  className="h-10 md:h-12 w-auto object-contain" 
                  priority 
                />
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand-green",
                    pathname === link.href ? "text-brand-green" : "text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/explore" className="text-foreground hover:text-brand-green transition-colors">
                <Search className="w-5 h-5" />
              </Link>
              <Link href="/login" className="text-sm font-medium text-foreground hover:text-brand-green transition-colors">
                Login
              </Link>
              <Link href="/explore">
                <Button size="sm" className="shadow-sm">
                  Get Deals
                </Button>
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-4">
              <Link href="/explore" className="text-foreground">
                <Search className="w-5 h-5" />
              </Link>
              <button 
                className="text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <ThemeToggle />
            </div>
            
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-4 sm:px-6 flex flex-col lg:hidden overflow-y-auto">
          <nav className="flex flex-col space-y-6 mb-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={cn(
                  "text-2xl font-bold transition-colors",
                  pathname === link.href ? "text-brand-green" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/login" 
              className="text-2xl font-bold text-foreground transition-colors"
            >
              Login
            </Link>
          </nav>
          
          <div className="mt-auto pb-8 pt-6 border-t border-gray-100">
            <Link href="/explore" className="block w-full">
              <Button size="lg" fullWidth>
                Get Deals
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
