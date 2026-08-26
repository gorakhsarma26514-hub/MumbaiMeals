'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [method, setMethod] = useState<'email' | 'phone'>('phone');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="text-3xl font-bold tracking-tight text-foreground">
            50% Food<span className="text-brand-green">.</span>
          </Link>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Login to discover great food deals.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-border sm:rounded-3xl sm:px-10">
          
          <div className="space-y-4 mb-6">
            <Button variant="outline" fullWidth className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-muted">OR</span>
            </div>
          </div>

          {/* Toggle Method */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${method === 'phone' ? 'bg-white shadow-sm text-foreground' : 'text-muted hover:text-foreground'}`}
              onClick={() => setMethod('phone')}
            >
              Phone Number
            </button>
            <button
              className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${method === 'email' ? 'bg-white shadow-sm text-foreground' : 'text-muted hover:text-foreground'}`}
              onClick={() => setMethod('email')}
            >
              Email
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {method === 'phone' ? (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-muted sm:text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    className="flex-1 block w-full rounded-none rounded-r-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
                    placeholder="98765 43210"
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email address</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-xl border border-gray-200 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                    <a href="#" className="text-xs text-brand-green hover:underline">Forgot password?</a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-xl border border-gray-200 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
                  />
                </div>
              </>
            )}

            <div>
              <Link href="/explore">
                <Button fullWidth>{method === 'phone' ? 'Send OTP' : 'Login'}</Button>
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted">Don't have an account? </span>
            <Link href="/signup" className="font-medium text-brand-green hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
