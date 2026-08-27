'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const baseItems = [
  { id: 1, src: '/assets/ice-cream-choclatedrip.mp4', alt: 'Ice Cream Chocolate Drip' },
  { id: 2, src: '/assets/burger.mp4', alt: 'Premium Burger' },
  { id: 3, src: '/assets/pizzaaa.mp4', alt: 'Fresh Pizza' },
  { id: 4, src: '/assets/donut.mp4', alt: 'Donut' },
  { id: 5, src: '/assets/coffeee.mp4', alt: 'Coffee' },
  { id: 6, src: '/assets/fries.mp4', alt: 'Fries' },
  { id: 7, src: '/assets/dessertt.mp4', alt: 'Dessert' },
  { id: 8, src: '/assets/cake.mp4', alt: 'Cake' },
  { id: 9, src: '/assets/banner-video.mp4', alt: 'Banner Deal' },
  { id: 10, src: '/assets/vidoe2.mp4', alt: 'Food Assortment' },
  { id: 11, src: '/assets/video.mp4', alt: 'Trending Meal' }
];

// Duplicate items to create a seamless infinite scrolling loop
const sliderItems = [...baseItems, ...baseItems.map(item => ({ ...item, id: item.id + 100 }))];

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-16 md:py-24 bg-background border-t border-border overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[600px] bg-brand-green/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] bg-brand-orange/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      {/* Heading Layer */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mb-10 md:mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tighter">
          Discover. <span className="text-brand-green">Taste.</span> Save.
        </h2>
        <p className="text-lg md:text-xl text-muted font-medium">
          Premium food from your favorite spots, without the waste.
        </p>
      </div>

      {/* Auto-scrolling Slider Container */}
      <div className="relative z-30 w-full overflow-hidden flex">
        <motion.div 
          className="flex gap-4 md:gap-8 px-2 md:px-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35 // 35 seconds for one loop, adjust if it's too fast/slow
          }}
        >
          {sliderItems.map((item) => (
            <div 
              key={item.id} 
              className="relative shrink-0 w-64 md:w-80 lg:w-96 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg border border-border bg-card group hover:scale-[1.02] transition-transform duration-500"
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="object-cover w-full h-full"
              >
                <source src={item.src} type="video/mp4" />
              </video>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 md:p-8 pointer-events-none">
                 <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                   <p className="text-brand-green font-bold text-xs uppercase tracking-wider mb-1">Featured</p>
                   <p className="text-white font-bold text-xl md:text-2xl">{item.alt}</p>
                 </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
    </section>
  );
}
