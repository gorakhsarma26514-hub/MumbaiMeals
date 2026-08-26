import React from 'react';
import { cn } from './Button';

interface DiscountBadgeProps {
  discountPercent: number;
  className?: string;
}

export function DiscountBadge({ discountPercent, className }: DiscountBadgeProps) {
  // Determine color based on discount amount for visual hierarchy
  let bgColor = 'bg-brand-green';
  if (discountPercent >= 50) bgColor = 'bg-red-500';
  else if (discountPercent >= 30) bgColor = 'bg-brand-orange';

  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm',
        bgColor,
        className
      )}
    >
      {discountPercent}% OFF
    </div>
  );
}
