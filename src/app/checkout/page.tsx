'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ChevronLeft } from 'lucide-react';
import { getFoodWithRestaurantInfo } from '@/lib/data';
import { getCurrentPricing } from '@/lib/pricing';

export default function CheckoutPage() {
  const router = useRouter();
  
  // Use a fixed item for the mock checkout flow, or handle empty state
  const food = getFoodWithRestaurantInfo()[0]; 
  const simulatedTime = "19:18";
  
  const handleConfirm = () => {
    // In a real app, this would submit the order to an API
    router.push('/order-confirmation');
  };

  if (!food) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-gray-50 flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white p-12 rounded-3xl border border-gray-100 shadow-sm max-w-md mx-4">
            <h1 className="text-2xl font-bold mb-3">No Order Details</h1>
            <p className="text-muted mb-8">It looks like there are no active deals to checkout right now.</p>
            <button 
              onClick={() => router.push('/explore')} 
              className="px-6 py-3 bg-foreground text-white rounded-xl font-medium"
            >
              Explore Deals
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const pricing = getCurrentPricing(food.originalPrice, food.discountSchedule, simulatedTime);

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-xl mx-auto px-4">
          <button 
            onClick={() => router.back()} 
            className="inline-flex items-center text-sm font-medium text-muted hover:text-foreground mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </button>
          
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-border mb-6">
            <h2 className="font-bold text-lg mb-4 border-b border-gray-100 pb-4">Order Summary</h2>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold">1x {food.name}</p>
                <p className="text-sm text-muted">{food.restaurantName}</p>
              </div>
              <p className="font-medium">₹{food.originalPrice}</p>
            </div>
            
            <div className="flex justify-between text-sm mb-4">
              <span className="text-brand-green">Discount ({pricing.currentDiscount}% OFF)</span>
              <span className="text-brand-green">-₹{food.originalPrice - pricing.currentPrice}</span>
            </div>
            
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Total to Pay</span>
              <span className="font-bold text-2xl">₹{pricing.currentPrice}</span>
            </div>

            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex items-start space-x-3 mb-6">
              <div>
                <p className="font-bold mb-1">Pickup Time: {food.pickupStart} – {food.pickupEnd}</p>
                <p>Please ensure you can pick up the food during this window. Food may be discarded after the window closes.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-border mb-8">
            <h2 className="font-bold text-lg mb-4">Payment Method</h2>
            <div className="flex items-center space-x-3 p-3 border border-brand-green bg-brand-green/5 rounded-xl cursor-pointer">
              <div className="w-4 h-4 rounded-full border-4 border-brand-green"></div>
              <span className="font-medium">Pay at Pickup</span>
            </div>
            <p className="text-xs text-muted mt-3 ml-1">More payment options coming soon.</p>
          </div>

          <Button size="lg" fullWidth onClick={handleConfirm}>
            Confirm Order
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
