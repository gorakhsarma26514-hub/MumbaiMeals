'use client';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Leaf, TrendingUp, Heart, Globe } from 'lucide-react';

export default function ImpactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background pb-24">
        
        <div className="bg-foreground text-white py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Good Food Shouldn't Go To Waste.</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Food waste is a major contributor to climate change. Together, we can make a difference—one meal at a time.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Impact Mission</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              We believe that perfectly good food should feed people, not landfills. 
              By connecting hungry customers with surplus restaurant meals, we are building a more sustainable food system.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm mb-24 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Impact Tracking Coming Soon</h3>
            <p className="text-muted text-lg max-w-xl mx-auto">
              As restaurants and customers join the 50% Food platform, we will display real-time metrics showing exactly how many meals we've rescued and how much CO2 emissions we've prevented.
            </p>
          </div>

          <div className="bg-gray-50 rounded-[3rem] p-10 lg:p-16 text-center border border-gray-100">
            <h2 className="text-3xl font-bold mb-6">Why it matters</h2>
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted">
              <p>
                Roughly one-third of the food produced in the world for human consumption every year gets lost or wasted.
              </p>
              <p>
                When we waste food, we also waste all the energy and water it takes to grow, harvest, transport, and package it. And if food goes to the landfill and rots, it produces methane—a greenhouse gas even more potent than carbon dioxide.
              </p>
              <p className="font-bold text-foreground">
                By choosing 50% Food, you are directly reducing waste, helping local businesses, and getting a great meal at a better price.
              </p>
            </div>
          </div>

        </div>

      </main>
      <Footer />
    </>
  );
}
