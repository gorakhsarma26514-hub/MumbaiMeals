'use client';
import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Store, TrendingDown, MapPin, Leaf, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background pb-24">
        
        <div className="bg-foreground text-background py-16 md:py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">How 50% Food Works</h1>
            <p className="text-lg md:text-xl opacity-80">The later it gets, the better the deal.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          
          <div className="space-y-16 md:space-y-24">
            
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-card rounded-3xl flex items-center justify-center border border-border">
                <Store className="w-10 h-10 text-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">1. Restaurants List Available Food</h3>
                <p className="text-muted leading-relaxed">
                  As closing time approaches, restaurants realize they have fresh, high-quality food that hasn't been sold. Instead of throwing it away, they list it on our platform and set a pickup window.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-brand-orange/10 rounded-3xl flex items-center justify-center border border-brand-orange/20">
                <TrendingDown className="w-10 h-10 text-brand-orange" />
              </div>
              <div className="w-full">
                <h3 className="text-2xl font-bold mb-3">2. Restaurants Set Discount Schedules</h3>
                <p className="text-muted leading-relaxed mb-6">
                  Each restaurant configures their own automatic discount schedule. The closer it gets to closing time, the cheaper the food gets. Here is an example of how a discount schedule might look:
                </p>
                <div className="bg-card rounded-2xl p-6 border border-border max-w-lg">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-muted mb-4">Example Timeline</h4>
                  <div className="space-y-4 relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border"></div>
                    {[
                      { t: '6:00 PM', d: '10% OFF', p: '₹315' },
                      { t: '7:00 PM', d: '20% OFF', p: '₹280' },
                      { t: '8:00 PM', d: '30% OFF', p: '₹245' },
                      { t: '9:00 PM', d: '40% OFF', p: '₹210' },
                      { t: '10:00 PM', d: '50% OFF', p: '₹175' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-4 md:space-x-6 relative z-10">
                        <div className="w-6 h-6 rounded-full bg-background border-2 border-brand-green flex items-center justify-center shrink-0">
                          <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                        </div>
                        <div className="flex-1 flex justify-between items-center bg-background p-2 md:p-3 rounded-xl shadow-sm border border-border text-sm md:text-base">
                          <span className="font-bold w-20 md:w-24">{item.t}</span>
                          <span className="font-bold text-brand-green">{item.d}</span>
                          <span className="font-bold text-muted w-14 md:w-16 text-right">{item.p}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted mt-4 text-center">
                    *Note: This is an example. Every restaurant sets their own unique timings and discounts.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-blue-50 rounded-3xl flex items-center justify-center border border-blue-100">
                <MapPin className="w-10 h-10 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">3. Customers Reserve & Pick Up</h3>
                <p className="text-muted leading-relaxed">
                  Customers can see the current price and exactly when the next discount will happen. They can choose to wait for a better deal (risking it selling out) or grab it immediately. They reserve the food on the app and pick it up during the specified window.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-brand-green/10 rounded-3xl flex items-center justify-center border border-brand-green/20">
                <Leaf className="w-10 h-10 text-brand-green" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">4. A Win-Win-Win Situation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 mr-3 shrink-0" />
                    <span><strong className="text-foreground">Customers</strong> get high-quality restaurant food at a fraction of the price.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 mr-3 shrink-0" />
                    <span><strong className="text-foreground">Restaurants</strong> recover costs and earn revenue instead of throwing good food away.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 mr-3 shrink-0" />
                    <span><strong className="text-foreground">The Planet</strong> benefits because we are reducing greenhouse gas emissions from food waste.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div className="mt-12 md:mt-20 text-center border-t border-border pt-10 md:pt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to grab a deal?</h2>
            <Link href="/explore">
              <Button size="lg">Explore Deals Near You</Button>
            </Link>
          </div>

        </div>

      </main>
      <Footer />
    </>
  );
}
