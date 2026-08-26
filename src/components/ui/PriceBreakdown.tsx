import React from 'react';
import { cn } from './Button';

interface PriceBreakdownProps {
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  className?: string;
}

export function PriceBreakdown({ originalPrice, discountPercent, finalPrice, className }: PriceBreakdownProps) {
  const discountAmount = originalPrice - finalPrice;

  return (
    <div className={cn("bg-gray-50 rounded-xl p-4 border border-gray-100", className)}>
      <div className="flex justify-between text-sm mb-3">
        <span className="text-muted">Original Price</span>
        <span className="font-medium">₹{originalPrice}</span>
      </div>
      <div className="flex justify-between text-sm mb-3">
        <span className="text-brand-green">Discount ({discountPercent}%)</span>
        <span className="text-brand-green font-medium">-₹{discountAmount}</span>
      </div>
      <div className="border-t border-gray-200 pt-3 flex justify-between items-center mt-1">
        <span className="font-bold text-foreground">You Pay</span>
        <span className="font-bold text-xl text-foreground">₹{finalPrice}</span>
      </div>
    </div>
  );
}
