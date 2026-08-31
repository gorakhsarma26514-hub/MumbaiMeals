'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FoodCard } from '@/components/ui/FoodCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { Search } from 'lucide-react';
import { getFoodWithRestaurantInfo } from '@/lib/data';

const ALL_MEDIA = [
  { src: '/assets/banner-video.mp4', title: 'Late Night Biryani', type: 'video' },
  { src: '/assets/banner-video2.mp4', title: 'Healthy Salads', type: 'video' },
  { src: '/assets/burger.mp4', title: 'Juicy Burgers', type: 'video' },
  { src: '/assets/cake.mp4', title: 'Sweet Cakes', type: 'video' },
  { src: '/assets/coffeee.mp4', title: 'Morning Coffee', type: 'video' },
  { src: '/assets/dessertt.mp4', title: 'Delicious Desserts', type: 'video' },
  { src: '/assets/donut.mp4', title: 'Fresh Donuts', type: 'video' },
  { src: '/assets/fries.mp4', title: 'Crispy Fries', type: 'video' },
  { src: '/assets/ice-cream-choclatedrip.mp4', title: 'Chocolate Drip', type: 'video' },
  { src: '/assets/pizzaaa.mp4', title: 'Woodfired Pizza', type: 'video' },
  { src: '/assets/video.mp4', title: '50% Off Fresh Pizza', type: 'video' },
  { src: '/assets/vidoe2.mp4', title: 'Dessert Specials', type: 'video' },
  { src: '/assets/chicken.jpg', title: 'Spicy Chicken', type: 'image' },
  { src: '/assets/food1.jpg', title: 'Gourmet Meal', type: 'image' },
  { src: '/assets/halffry.jpg', title: 'Egg Half Fry', type: 'image' },
  { src: '/assets/lolipop.jpg', title: 'Chicken Lollipop', type: 'image' },
  { src: '/assets/pizza.jpg', title: 'Cheese Pizza', type: 'image' },
  { src: '/assets/roll.jpg', title: 'Kathi Roll', type: 'image' },
  { src: '/assets/salad.jpg', title: 'Fresh Salad', type: 'image' }
];

const AREAS = [
  { id: 'all', label: 'All Mumbai' },
  { id: 'bandra', label: 'Bandra' },
  { id: 'andheri', label: 'Andheri' },
  { id: 'powai', label: 'Powai' },
  { id: 'bkc', label: 'BKC' },
  { id: 'lower_parel', label: 'Lower Parel' },
  { id: 'juhu', label: 'Juhu' },
  { id: 'colaba', label: 'Colaba' },
];

const PREFERENCES = [
  { id: 'all', label: 'All Categories' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'healthy', label: 'Healthy' },
];

export default function ExplorePage() {
  const [activeArea, setActiveArea] = useState('all');
  const [activePreference, setActivePreference] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allFood = getFoodWithRestaurantInfo();

  // Filter logic
  const filteredFood = allFood.filter(food => {
    // Area filter
    if (activeArea !== 'all' && food.location.toLowerCase() !== activeArea) return false;
    
    // Preference filter
    if (activePreference !== 'all') {
      const prefStr = activePreference.toLowerCase();
      if (!food.preferences.some(p => p.toLowerCase() === prefStr)) return false;
    }

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!food.name.toLowerCase().includes(q) && 
          !food.restaurantName.toLowerCase().includes(q) &&
          !food.cuisine.toLowerCase().includes(q)) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <>
      <Header />
      <main className="flex-1 bg-background min-h-screen pb-20">
        
        {/* Search Header */}
        <div className="bg-foreground text-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Explore Food Deals in Mumbai</h1>
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="Search food, restaurants, or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Trending Previews */}
        <div className="bg-background py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-black mb-6">Trending Deals Near You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {ALL_MEDIA.map((media, i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded-2xl overflow-hidden relative shadow-sm border border-border group hover:shadow-lg transition-all duration-300">
                  {media.type === 'video' ? (
                    <video autoPlay loop muted playsInline className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700">
                      <source src={media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image src={media.src} alt={media.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <p className="text-brand-green font-bold text-xs uppercase tracking-wider mb-1">Trending</p>
                    <p className="text-white font-bold text-sm sm:text-base leading-tight">{media.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border bg-background sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
            <FilterBar 
              options={AREAS} 
              activeId={activeArea} 
              onSelect={setActiveArea} 
            />
            <FilterBar 
              options={PREFERENCES} 
              activeId={activePreference} 
              onSelect={setActivePreference} 
            />
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <h2 className="text-lg sm:text-xl font-bold">{filteredFood.length} deals found</h2>
          </div>

          {filteredFood.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFood.map(food => (
                <a href={`/food/${food.id}`} key={food.id} className="block group">
                  <FoodCard {...food} simulatedTime="19:18" />
                </a>
              ))}
            </div>
          ) : allFood.length === 0 ? (
            <div className="text-center py-16 sm:py-32 px-4 bg-card rounded-3xl border border-border shadow-sm">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shrink-0">
                <Search className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground break-words">No active deals yet.</h3>
              <p className="text-muted text-sm sm:text-base max-w-md mx-auto break-words">
                Once restaurants start listing available food, deals will appear here. Check back later!
              </p>
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20 px-4 bg-card rounded-2xl border border-border">
              <h3 className="text-lg sm:text-xl font-bold mb-2 break-words">No matches found</h3>
              <p className="text-muted text-sm sm:text-base break-words">Try adjusting your filters or search query.</p>
              <button 
                className="mt-4 text-brand-green font-medium"
                onClick={() => { setActiveArea('all'); setActivePreference('all'); setSearchQuery(''); }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Minimal Auto-Scrolling Image Gallery */}
        <div className="bg-background pt-10 pb-16 border-t border-border mt-auto overflow-hidden">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
            .animate-marquee {
              animation: marquee 25s linear infinite;
            }
            .group-marquee:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="relative w-full flex group-marquee">
            {/* First Set */}
            <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 animate-marquee shrink-0 w-max">
              {ALL_MEDIA.filter(m => m.type === 'image').map((media, i) => (
                <div key={`gallery-1-${i}`} className="relative shrink-0 w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[300px] aspect-[4/3] rounded-3xl overflow-hidden group">
                  <Image 
                    src={media.src} 
                    alt="Gallery Image" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  />
                </div>
              ))}
            </div>
            {/* Second Set (Duplicate for seamless infinite scroll) */}
            <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 animate-marquee shrink-0 w-max" aria-hidden="true">
              {ALL_MEDIA.filter(m => m.type === 'image').map((media, i) => (
                <div key={`gallery-2-${i}`} className="relative shrink-0 w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[300px] aspect-[4/3] rounded-3xl overflow-hidden group">
                  <Image 
                    src={media.src} 
                    alt="Gallery Image" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
