'use client';
import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { DiscountBadge } from '@/components/ui/DiscountBadge';
import { MapPin, Clock, ChevronLeft, Info, AlertTriangle, TrendingDown, Star } from 'lucide-react';
import { getFoodWithRestaurantInfo } from '@/lib/data';
import { getCurrentPricing } from '@/lib/pricing';
import { DiscountTimeline } from '@/components/ui/DiscountTimeline';
import { PriceBreakdown } from '@/components/ui/PriceBreakdown';
import { CountdownTimer } from '@/components/ui/CountdownTimer';

export default function FoodDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const food = getFoodWithRestaurantInfo().find(f => f.id === resolvedParams.id);
  
  if (!food) {
    return (
      <>
        <Header />
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Deal Not Found</h1>
          <Link href="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const simulatedTime = "19:18"; // Mock time for demo consistency
  const pricing = getCurrentPricing(food.originalPrice, food.discountSchedule, simulatedTime);

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 pb-24">
        
        {/* Cover Image */}
        <div className="relative w-full h-64 md:h-96 bg-gray-900">
          <Image 
            src={food.imageUrl} 
            alt={food.name}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
          <div className="absolute top-6 left-4 md:left-8">
            <Link href="/explore" className="inline-flex items-center bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
            
            {/* Image Header */}
            <div className="relative h-64 md:h-96 w-full">
              <Image 
                src={food.imageUrl} 
                alt={food.name} 
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <DiscountBadge discountPercent={pricing.currentDiscount} className="text-sm px-3 py-1.5" />
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between gap-8">
                
                {/* Left Col - Details */}
                <div className="flex-1">
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-brand-orange font-bold text-sm bg-brand-orange/10 px-2 py-1 rounded-md flex items-center">
                        <Star className="w-3.5 h-3.5 mr-1 fill-brand-orange" /> {food.rating}
                      </span>
                      {food.preferences.map(pref => (
                        <span key={pref} className="text-green-700 bg-green-50 px-2 py-1 rounded-md text-sm font-medium border border-green-200">
                          {pref}
                        </span>
                      ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{food.name}</h1>
                    <p className="text-lg text-muted">{food.restaurantName}</p>
                  </div>

                  <div className="prose text-foreground mb-8">
                    <p>{food.description}</p>
                  </div>

                  <div className="space-y-4 text-sm text-foreground bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-muted shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Pickup Location</p>
                        <p className="text-muted">{food.location} • {food.distance} away</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-muted shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Pickup Window</p>
                        <p className="text-muted">{food.pickupStart} – {food.pickupEnd}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-muted shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Please bring your own bag</p>
                        <p className="text-muted">Help us reduce packaging waste.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Col - Checkout Box */}
                <div className="w-full md:w-80 shrink-0">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
                    <div className="text-center mb-6">
                      <p className="text-muted line-through mb-1">₹{food.originalPrice}</p>
                      <h2 className="text-4xl font-bold text-foreground mb-2">₹{pricing.currentPrice}</h2>
                      <p className="text-brand-orange font-medium text-sm">
                        Only {food.quantity} remaining
                      </p>
                    </div>

                    <Link href={`/checkout?id=${food.id}`} className="block w-full">
                      <Button size="lg" fullWidth className="text-lg shadow-md hover:shadow-lg">
                        Grab This Deal
                      </Button>
                    </Link>
                    
                    <p className="text-xs text-center text-muted mt-4">
                      By reserving, you agree to pick up within the specified window.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
