import React from 'react';
import Image from 'next/image';
import { MapPin, Clock, Star, TrendingDown } from 'lucide-react';
import { DiscountBadge } from './DiscountBadge';
import { Button } from './Button';
import { cn } from './Button';
import { DiscountStage, getCurrentPricing } from '@/lib/pricing';
import { CountdownTimer } from './CountdownTimer';

export interface FoodCardProps {
  id: string;
  restaurantName: string;
  name: string;
  cuisine: string;
  location: string;
  originalPrice: number;
  discountSchedule: DiscountStage[];
  distance: string;
  pickupStart: string;
  pickupEnd: string;
  quantity: number;
  rating: number;
  imageUrl: string;
  className?: string;
  simulatedTime?: string;
}

export function FoodCard({
  restaurantName,
  name,
  cuisine,
  location,
  originalPrice,
  discountSchedule,
  distance,
  pickupStart,
  pickupEnd,
  quantity,
  rating,
  imageUrl,
  className,
  simulatedTime = "19:18" // Hardcoded for demo purposes so it always looks good
}: FoodCardProps) {
  
  const pricing = getCurrentPricing(originalPrice, discountSchedule, simulatedTime);

  return (
    <div className={cn(
      "group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300",
      className
    )}>
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 shrink-0">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <DiscountBadge discountPercent={pricing.currentDiscount} />
        </div>
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
          <span className="text-xs font-bold">{rating}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-3">
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">{restaurantName}</p>
          <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-1">{name}</h3>
        </div>

        {/* Next Discount Info */}
        {pricing.nextDiscount && (
          <div className="bg-background rounded-lg p-2.5 mb-3 border border-border flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted font-semibold uppercase">Next Drop</span>
              <span className="text-sm font-bold text-brand-orange">{pricing.nextDiscount}% OFF at {pricing.nextDiscountTime}</span>
            </div>
            {pricing.countdownMinutes !== null && pricing.countdownMinutes > 0 && (
               <CountdownTimer targetMinutes={pricing.countdownMinutes} />
            )}
          </div>
        )}

        <div className="flex flex-col space-y-1.5 text-xs text-muted mb-4">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{location} ({distance})</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{pickupStart} – {pickupEnd}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-border">
          <div className="flex justify-between items-end mb-3">
            <div>
              <div className="text-xs text-muted line-through">₹{pricing.originalPrice}</div>
              <div className="text-xl font-bold text-foreground">₹{pricing.currentPrice}</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2 py-1 rounded-md">
                Only {quantity} left
              </span>
            </div>
          </div>
          <Button size="md" fullWidth>Grab Deal</Button>
        </div>
      </div>
    </div>
  );
}
