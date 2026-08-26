'use client';
import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Trash2, Users, Settings } from 'lucide-react';

export default function RestaurantsLandingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-foreground text-white pb-24">
        
        <div className="py-24 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">Turn Unsold Food Into Revenue.</h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              List your fresh, end-of-day food and sell it at configurable discounts. Join Mumbai's growing network of sustainable restaurants.
            </p>
            <Link href="/restaurants/partner">
              <Button size="lg" className="px-10 text-lg">Partner With 50% Food</Button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 text-center hover:-translate-y-2 transition-transform">
              <TrendingUp className="w-12 h-12 text-brand-green mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3">Recover Revenue</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Turn sunk costs into profit by selling food that would otherwise be discarded.</p>
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 text-center hover:-translate-y-2 transition-transform">
              <Trash2 className="w-12 h-12 text-brand-green mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3">Reduce Waste</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Join the fight against climate change by ensuring your perfectly good food gets eaten.</p>
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 text-center hover:-translate-y-2 transition-transform">
              <Users className="w-12 h-12 text-brand-green mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3">Reach New Customers</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Attract local customers who might not have tried your restaurant at full price.</p>
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 text-center hover:-translate-y-2 transition-transform">
              <Settings className="w-12 h-12 text-brand-green mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3">Total Control</h3>
              <p className="text-gray-400 text-sm leading-relaxed">You set the quantities, the pickup windows, and the exact discount schedule.</p>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
