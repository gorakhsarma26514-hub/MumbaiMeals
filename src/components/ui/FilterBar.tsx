'use client';
import React from 'react';
import { cn } from './Button';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  options: FilterOption[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function FilterBar({ options, activeId, onSelect, className }: FilterBarProps) {
  return (
    <div className={cn("flex space-x-2 overflow-x-auto pb-2 scrollbar-hide", className)}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            activeId === option.id
              ? "bg-foreground text-background"
              : "bg-background border border-border text-muted hover:bg-muted hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
