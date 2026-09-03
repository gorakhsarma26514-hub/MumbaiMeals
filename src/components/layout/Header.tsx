'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../ui/Button';
import { ThemeToggle } from '../ThemeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Frosted-glass kicks in after 50px
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/explore', label: 'Deals' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/restaurants', label: 'For Restaurants' },
    { href: '/impact', label: 'Impact' },
  ];

  return (
    <>
      <header
        className={cn(
          'sticky top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center',
          isScrolled
            ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-md border-b border-gray-200/60 dark:border-gray-800/60'
            : 'bg-background border-b border-transparent'
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
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative text-sm font-medium transition-colors hover:text-brand-green pb-1 group',
                      isActive ? 'text-brand-green' : 'text-foreground'
                    )}
                  >
                    {link.label}
                    {/* Active indicator dot */}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-green transition-all duration-300',
                        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-75'
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Location pill */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-medium text-foreground hover:border-brand-green hover:text-brand-green transition-all duration-200 min-h-[36px]">
                <MapPin className="w-3.5 h-3.5 text-brand-green shrink-0" />
                Mumbai
              </button>

              <Link href="/explore" className="text-foreground hover:text-brand-green transition-colors" aria-label="Search deals">
                <Search className="w-5 h-5" />
              </Link>

              <Link href="/login" className="text-sm font-medium text-foreground hover:text-brand-green transition-colors">
                Login
              </Link>

              {/* Gradient Get Deals button */}
              <Link href="/explore">
                <button
                  className="inline-flex items-center justify-center px-5 text-sm font-bold text-white rounded-xl min-h-[44px] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #0F5132 0%, #083D26 100%)',
                    boxShadow: '0 4px 15px rgba(15,81,50,0.35)',
                  }}
                >
                  Get Deals
                </button>
              </Link>

              <ThemeToggle />
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-4">
              <Link href="/explore" className="text-foreground" aria-label="Search">
                <Search className="w-5 h-5" />
              </Link>
              <button
                className="text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
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
          {/* Location pill — mobile */}
          <div className="mb-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-foreground">
              <MapPin className="w-4 h-4 text-brand-green" />
              📍 Mumbai
            </button>
          </div>

          <nav className="flex flex-col space-y-6 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-2xl font-bold transition-colors flex items-center gap-3',
                  pathname === link.href ? 'text-brand-green' : 'text-foreground'
                )}
              >
                {pathname === link.href && (
                  <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
                )}
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
              <button
                className="w-full py-4 rounded-2xl text-lg font-bold text-white min-h-[52px] transition-all duration-200 hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #0F5132 0%, #083D26 100%)',
                  boxShadow: '0 4px 15px rgba(15,81,50,0.30)',
                }}
              >
                Get Deals
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
