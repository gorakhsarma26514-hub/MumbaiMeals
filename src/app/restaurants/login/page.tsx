'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Store } from 'lucide-react';

export default function RestaurantLoginPage() {
  return (
    <div className="min-h-screen bg-foreground flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="text-3xl font-bold tracking-tight text-white">
            50% Food<span className="text-brand-green">.</span>
          </Link>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-gray-800">
            <Store className="w-8 h-8 text-brand-green" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Restaurant Partner Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Manage your inventory and see your revenue grow.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1a1a1a] py-8 px-4 shadow-xl border border-gray-800 sm:rounded-3xl sm:px-10">
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email or Phone</label>
              <input
                id="email"
                type="text"
                required
                className="block w-full appearance-none rounded-xl bg-black/50 border border-gray-700 text-white px-3 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-xs text-brand-green hover:underline">Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                required
                className="block w-full appearance-none rounded-xl bg-black/50 border border-gray-700 text-white px-3 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm"
              />
            </div>

            <div>
              <Link href="/restaurants/dashboard">
                <Button fullWidth variant="primary" size="lg">Login to Dashboard</Button>
              </Link>
            </div>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-400">Don't have an account? </span>
            <Link href="/signup" className="font-medium text-brand-green hover:underline">
              Register Restaurant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
