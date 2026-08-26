'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from './Button';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <div key={index} className="border border-border rounded-2xl overflow-hidden bg-card transition-all">
          <button
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            onClick={() => toggleItem(index)}
          >
            <span className="font-bold text-lg text-foreground">{item.title}</span>
            <ChevronDown 
              className={cn(
                "w-5 h-5 text-muted transition-transform duration-300",
                openIndex === index ? "rotate-180" : ""
              )} 
            />
          </button>
          <div 
            className={cn(
              "px-6 overflow-hidden transition-all duration-300 ease-in-out",
              openIndex === index ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="text-muted leading-relaxed">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
