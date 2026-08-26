'use client';
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FoodCard } from '@/components/ui/FoodCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { Search } from 'lucide-react';
import { getFoodWithRestaurantInfo } from '@/lib/data';

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
        <div className="bg-foreground text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6">Explore Food Deals in Mumbai</h1>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">{filteredFood.length} deals found</h2>
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
            <div className="text-center py-32 bg-card rounded-3xl border border-border shadow-sm">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">No active deals yet.</h3>
              <p className="text-muted max-w-md mx-auto">
                Once restaurants start listing available food, deals will appear here. Check back later!
              </p>
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <h3 className="text-xl font-bold mb-2">No matches found</h3>
              <p className="text-muted">Try adjusting your filters or search query.</p>
              <button 
                className="mt-4 text-brand-green font-medium"
                onClick={() => { setActiveArea('all'); setActivePreference('all'); setSearchQuery(''); }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
