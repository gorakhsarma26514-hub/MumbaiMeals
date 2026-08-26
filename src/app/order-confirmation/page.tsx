'use client';
import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, QrCode } from 'lucide-react';
import { getFoodWithRestaurantInfo } from '@/lib/data';

export default function OrderConfirmationPage() {
  const food = getFoodWithRestaurantInfo()[0]; 
  const orderNumber = "50F-" + Math.floor(1000 + Math.random() * 9000);

  if (!food) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-gray-50 flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white p-12 rounded-3xl border border-gray-100 shadow-sm max-w-md mx-4">
            <h1 className="text-2xl font-bold mb-3">No Order Found</h1>
            <p className="text-muted mb-8">Your orders will appear here after you grab a deal.</p>
            <Link href="/explore">
              <Button>Explore Deals</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-sm text-center border border-border">
            <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Your Deal Is Confirmed! 🎉</h1>
            <p className="text-muted mb-8">Order #{orderNumber}</p>
            
            <div className="bg-gray-50 rounded-xl p-4 text-left mb-8 space-y-3 border border-gray-100">
              <div>
                <p className="text-xs text-muted font-medium">Food</p>
                <p className="font-bold">1x {food.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">Restaurant</p>
                <p className="font-bold">{food.restaurantName}</p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">Pickup Window</p>
                <p className="font-bold text-brand-green">{food.pickupStart} – {food.pickupEnd}</p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">Address</p>
                <p className="font-medium text-sm">{food.restaurantAddress}</p>
              </div>
            </div>

            <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl mb-8 flex flex-col items-center">
              <p className="text-sm font-medium text-muted mb-4">Show this code at the counter</p>
              <QrCode className="w-24 h-24 mb-4 text-foreground" />
              <p className="text-4xl font-mono font-bold tracking-widest text-foreground">{orderNumber.split('-')[1]}</p>
            </div>

            <div className="space-y-3">
              <Button fullWidth>View Order Status</Button>
              <Link href="/explore">
                <Button fullWidth variant="outline">Back to Deals</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
