'use client';
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from './Button';

interface CountdownTimerProps {
  targetMinutes: number; // For demo purposes, we pass minutes to countdown
  className?: string;
}

export function CountdownTimer({ targetMinutes, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(targetMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={cn("flex items-center space-x-1.5 text-brand-green font-mono font-medium bg-brand-green/10 px-2.5 py-1 rounded-md", className)}>
      <Clock className="w-4 h-4" />
      <span>
        {hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
