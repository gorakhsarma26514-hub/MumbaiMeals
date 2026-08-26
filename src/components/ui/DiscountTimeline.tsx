import React from 'react';
import { DiscountStage, getCurrentPricing } from '@/lib/pricing';
import { cn } from './Button';

interface DiscountTimelineProps {
  schedule: DiscountStage[];
  originalPrice: number;
  simulatedTime?: string;
  className?: string;
}

export function DiscountTimeline({ schedule, originalPrice, simulatedTime = "19:18", className }: DiscountTimelineProps) {
  const pricing = getCurrentPricing(originalPrice, schedule, simulatedTime);
  
  // Find index of the currently active stage
  const activeIndex = schedule.findIndex(s => s.discount === pricing.currentDiscount);

  return (
    <div className={cn("w-full overflow-x-auto pb-4", className)}>
      <div className="flex items-start min-w-[500px]">
        {schedule.map((stage, index) => {
          const isPast = index < activeIndex;
          const isActive = index === activeIndex;
          const isFuture = index > activeIndex;

          const stagePrice = originalPrice - (originalPrice * stage.discount) / 100;
          
          // Format time to 12h
          const [h, m] = stage.time.split(':').map(Number);
          const displayTime = `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;

          return (
            <div key={index} className="flex-1 relative">
              {/* Connector line */}
              {index !== schedule.length - 1 && (
                <div className={cn(
                  "absolute top-3 left-1/2 w-full h-1 -z-10",
                  isPast || isActive ? "bg-brand-green" : "bg-gray-200"
                )} />
              )}
              
              <div className="flex flex-col items-center">
                {/* Node */}
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center border-2 z-10 bg-white",
                  isActive ? "border-brand-green scale-125 shadow-md" : 
                  isPast ? "border-brand-green bg-brand-green" : "border-gray-200"
                )}>
                  {isActive && <div className="w-2.5 h-2.5 bg-brand-green rounded-full" />}
                </div>
                
                {/* Text content */}
                <div className={cn(
                  "mt-3 text-center transition-all",
                  isActive ? "scale-110" : isActive || isPast ? "opacity-100" : "opacity-50"
                )}>
                  <p className="text-xs font-bold text-foreground mb-1">{displayTime}</p>
                  <div className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded text-white inline-block mb-1",
                    stage.discount >= 50 ? 'bg-red-500' : stage.discount >= 30 ? 'bg-brand-orange' : 'bg-brand-green'
                  )}>
                    {stage.discount}% OFF
                  </div>
                  <p className="text-sm font-bold text-foreground">₹{stagePrice}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
