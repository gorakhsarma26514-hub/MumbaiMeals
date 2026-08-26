'use client';
import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function RestaurantPartnerPage() {
  const steps = [
    { num: "1", title: "Add food", desc: "List what you have available at the end of the day." },
    { num: "2", title: "Enter original price", desc: "Set the standard retail price for the item." },
    { num: "3", title: "Set quantity", desc: "Specify exactly how many portions are left." },
    { num: "4", title: "Set pickup time", desc: "Define the window when customers must arrive." },
    { num: "5", title: "Configure schedule", desc: "Set the discount timeline. E.g., 6PM → 10%, 8PM → 30%." },
    { num: "6", title: "Automatic updates", desc: "Our platform automatically updates the customer-facing price." },
    { num: "7", title: "Customer orders", desc: "A customer reserves and pays for the food." },
    { num: "8", title: "Prepare pickup", desc: "Package the order and hand it over when they arrive." },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 pb-24">
        
        <div className="bg-foreground text-white py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">How It Works for Partners</h1>
            <p className="text-gray-400 text-lg">A simple, powerful way to manage your surplus inventory.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="space-y-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-8 h-8 shrink-0 bg-brand-green text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">STEP {step.num}: {step.title}</h3>
                      <p className="text-muted">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <Link href="/signup">
                  <Button size="lg" className="px-10">Become a Partner</Button>
                </Link>
              </div>
            </div>

            {/* Mock Dashboard Preview */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 sticky top-28">
              <div className="border-b border-gray-100 pb-4 mb-4">
                <h4 className="font-bold text-lg">Example Discount Schedule</h4>
                <p className="text-sm text-muted">You have full control over these metrics.</p>
              </div>
              
              <div className="space-y-4 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                {[
                  { t: '6:00 PM', d: '10% OFF' },
                  { t: '7:00 PM', d: '20% OFF' },
                  { t: '8:00 PM', d: '30% OFF' },
                  { t: '9:00 PM', d: '40% OFF' },
                  { t: '10:00 PM', d: '50% OFF' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-6 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-brand-green flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                    </div>
                    <div className="flex-1 flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="font-bold">{item.t}</span>
                      <span className="font-bold text-brand-green">{item.d}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 text-blue-900 p-4 rounded-xl text-sm font-medium">
                Our dynamic pricing engine handles everything else. Customers see the changing prices in real-time, driving urgency to purchase.
              </div>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
