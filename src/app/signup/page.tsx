'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { User, Store } from 'lucide-react';

export default function SignupPage() {
  const [accountType, setAccountType] = useState<'customer' | 'restaurant'>('customer');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="text-3xl font-bold tracking-tight text-foreground">
            50% Food<span className="text-brand-green">.</span>
          </Link>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
          Join 50% Food
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Create an account to get started.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-border sm:rounded-3xl sm:px-10">
          
          {/* Account Type Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setAccountType('customer')}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                accountType === 'customer' 
                  ? 'border-brand-green bg-brand-green/5' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <User className={`w-8 h-8 mb-2 ${accountType === 'customer' ? 'text-brand-green' : 'text-gray-400'}`} />
              <span className={`font-semibold ${accountType === 'customer' ? 'text-brand-green' : 'text-muted'}`}>Customer</span>
            </button>
            <button
              onClick={() => setAccountType('restaurant')}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                accountType === 'restaurant' 
                  ? 'border-brand-green bg-brand-green/5' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <Store className={`w-8 h-8 mb-2 ${accountType === 'restaurant' ? 'text-brand-green' : 'text-gray-400'}`} />
              <span className={`font-semibold ${accountType === 'restaurant' ? 'text-brand-green' : 'text-muted'}`}>Restaurant</span>
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            
            {accountType === 'customer' ? (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="block w-full appearance-none rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    className="block w-full appearance-none rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email address (Optional)</label>
                  <input
                    id="email"
                    type="email"
                    className="block w-full appearance-none rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="r_name" className="block text-sm font-medium text-foreground mb-1">Restaurant Name</label>
                  <input
                    id="r_name"
                    type="text"
                    required
                    className="block w-full appearance-none rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="owner_name" className="block text-sm font-medium text-foreground mb-1">Owner Name</label>
                  <input
                    id="owner_name"
                    type="text"
                    required
                    className="block w-full appearance-none rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="r_phone" className="block text-sm font-medium text-foreground mb-1">Business Phone</label>
                  <input
                    id="r_phone"
                    type="tel"
                    required
                    className="block w-full appearance-none rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="r_email" className="block text-sm font-medium text-foreground mb-1">Business Email</label>
                  <input
                    id="r_email"
                    type="email"
                    required
                    className="block w-full appearance-none rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
                  />
                </div>
              </>
            )}

            <div className="pt-2">
              <Link href={accountType === 'customer' ? "/explore" : "/restaurants/dashboard"}>
                <Button fullWidth>{accountType === 'customer' ? 'Create Account' : 'Continue'}</Button>
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted">Already have an account? </span>
            <Link href={accountType === 'customer' ? "/login" : "/restaurants/login"} className="font-medium text-brand-green hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
