'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  { id: 1,  src: '/assets/pizza.jpg',         alt: 'Cheese Pizza' },
  { id: 3,  src: '/assets/salad.jpg',          alt: 'Fresh Salad' },
  { id: 4,  src: '/assets/chicken.jpg',        alt: 'Spicy Chicken' },
  { id: 5,  src: '/assets/roll.jpg',           alt: 'Kathi Roll' },
  { id: 6,  src: '/assets/halffry.jpg',        alt: 'Egg Half Fry' },
  { id: 7,  src: '/assets/lolipop.jpg',        alt: 'Chicken Lollipop' },
  { id: 8,  src: '/assets/avacado-toast.jpg',  alt: 'Avocado Toast' },
  { id: 9,  src: '/assets/burg.jpg',           alt: 'Juicy Burger' },
  { id: 10, src: '/assets/creamroll.jpg',      alt: 'Cream Roll' },
  { id: 11, src: '/assets/creamy-noodles.jpg', alt: 'Creamy Noodles' },
  { id: 12, src: '/assets/crossant.jpg',       alt: 'Buttery Croissant' },
  { id: 13, src: '/assets/dessert.jpg',        alt: 'Sweet Dessert' },
  { id: 14, src: '/assets/donut.jpg',          alt: 'Fresh Donut' },
  { id: 15, src: '/assets/momo.png',           alt: 'Steamed Momos' },
  { id: 16, src: '/assets/omlet.jpg',          alt: 'Fluffy Omelette' },
  { id: 17, src: '/assets/pasta.jpg',          alt: 'Italian Pasta' },
  { id: 18, src: '/assets/sandwich.jpg',       alt: 'Club Sandwich' },
];

// Triplicate for seamless infinite loop
const allItems = [...images, ...images, ...images];

export function ShowcaseSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  const SPEED = 1.2; // px per frame

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const track = trackRef.current;
    if (!track) return;

    const getSetWidth = () => {
      const child = track.children[0] as HTMLElement | null;
      if (!child) return 0;
      const itemWidth = child.offsetWidth;
      const gap = 24; // gap-6 = 24px
      return images.length * (itemWidth + gap);
    };

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        const setWidth = getSetWidth();
        if (setWidth > 0 && posRef.current >= setWidth) {
          posRef.current -= setWidth;
        }
        if (track) {
          track.style.transform = `translateX(-${posRef.current}px)`;
        }
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const wrapper = wrapperRef.current;
    const pause = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };

    wrapper?.addEventListener('mouseenter', pause);
    wrapper?.addEventListener('mouseleave', resume);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      wrapper?.removeEventListener('mouseenter', pause);
      wrapper?.removeEventListener('mouseleave', resume);
    };
  }, [mounted]);

  return (
    <section className="relative w-full py-16 md:py-24 bg-background border-t border-border overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[600px] bg-brand-green/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] bg-brand-orange/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Heading */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mb-10 md:mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tighter">
          Discover. <span className="text-brand-green">Taste.</span> Save.
        </h2>
        <p className="text-lg md:text-xl text-muted font-medium">
          Premium food from your favorite spots, without the waste.
        </p>
      </div>

      {/* Carousel wrapper with edge fade */}
      <div
        ref={wrapperRef}
        className="relative z-30 w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        {/* Sliding track */}
        <div
          ref={trackRef}
          className="flex gap-6 pb-4"
          style={{ width: 'max-content', willChange: 'transform' }}
        >
          {allItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="relative shrink-0 overflow-hidden rounded-3xl shadow-lg border border-border bg-card group"
              style={{
                width: 'clamp(200px, 22vw, 300px)',
                aspectRatio: '4/5',
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 200px, 300px"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
