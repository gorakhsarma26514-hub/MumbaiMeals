'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { MapPin, Clock, ArrowRight, Store, TrendingDown, Leaf, CheckCircle2, ChevronRight, Search, Heart, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/components/ui/Button';

// Internal component for the interactive timeline
function InteractivePriceDrop() {
  const [activeTimeIndex, setActiveTimeIndex] = useState(0);
  const schedule = [
    { time: '6:00 PM', price: 500, discount: 0 },
    { time: '7:00 PM', price: 450, discount: 10 },
    { time: '8:00 PM', price: 400, discount: 20 },
    { time: '9:00 PM', price: 350, discount: 30 },
    { time: '10:00 PM', price: 250, discount: 50 },
  ];

  // Auto-cycle for demo purposes, pausing on hover
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimeIndex((prev) => (prev + 1) % schedule.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [schedule.length]);

  return (
    <div className="bg-card rounded-3xl p-6 md:p-12 shadow-2xl shadow-border/50 border border-border w-full max-w-5xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <div className="w-full md:flex-1 relative">
          <div className="aspect-square relative rounded-3xl overflow-hidden shadow-lg border border-border group">
            <Image 
              src="/assets/pizza.jpg" 
              alt="Delicious Example Meal" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Price Overlay */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-card/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <p className="text-xs md:text-sm font-bold text-muted uppercase tracking-wider mb-1">Example Meal</p>
                <div className="flex items-baseline gap-2 md:gap-3">
                  <span className="text-3xl md:text-4xl font-black text-foreground">₹{schedule[activeTimeIndex].price}</span>
                  {schedule[activeTimeIndex].discount > 0 && (
                    <span className="text-base md:text-lg text-muted line-through font-medium">₹500</span>
                  )}
                </div>
              </div>
              <div className="text-left sm:text-right">
                {schedule[activeTimeIndex].discount > 0 ? (
                  <span className="inline-flex bg-brand-green/10 text-brand-green font-black text-xl px-4 py-2 rounded-xl">
                    {schedule[activeTimeIndex].discount}% OFF
                  </span>
                ) : (
                  <span className="inline-flex bg-background border border-border text-muted font-bold text-lg px-4 py-2 rounded-xl">
                    Original
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full space-y-4 relative">
          <div className="absolute left-6 top-6 bottom-6 w-1 bg-border rounded-full"></div>
          
          {schedule.map((slot, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveTimeIndex(idx)}
              className={cn(
                "relative z-10 w-full flex items-center p-4 rounded-2xl transition-all duration-300 text-left border-2",
                activeTimeIndex === idx 
                  ? "bg-card border-brand-green shadow-xl scale-105 ml-2" 
                  : "bg-transparent border-transparent hover:bg-muted opacity-60"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6 transition-colors shadow-sm shrink-0",
                activeTimeIndex === idx ? "bg-brand-green text-white" : "bg-card text-foreground border border-border"
              )}>
                {idx + 1}
              </div>
              <div>
                <h4 className={cn("text-xl font-bold transition-colors", activeTimeIndex === idx ? "text-brand-green" : "text-foreground")}>
                  {slot.time}
                </h4>
                <p className="font-medium text-muted">
                  {slot.discount > 0 ? `Price drops to ₹${slot.price}` : 'Standard Menu Price'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      
      <main className="flex-1 pt-20 bg-background overflow-hidden">
        
        {/* SECTION 1: LARGE HERO */}
        <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-20 w-full">
              <h1 className="text-4xl sm:text-5xl lg:text-[5.5rem] font-black tracking-tight text-foreground mb-6 leading-[1.1] md:leading-[1.05]">
                Great Food.<br/>
                <span className="text-brand-green">Better Prices.</span><br/>
                Less Waste.
              </h1>
              <p className="text-xl md:text-2xl text-muted mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Discover quality food from restaurants around Mumbai at better prices — with discounts that can increase as the day goes on.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/explore">
                  <Button size="lg" className="w-full sm:w-auto px-10 py-6 text-xl shadow-2xl shadow-brand-green/20 hover:shadow-brand-green/30 transition-all font-bold rounded-2xl">
                    Explore Today's Deals
                  </Button>
                </Link>
                <Link href="/restaurants/partner">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg hover:-translate-y-1 transition-transform border-gray-200 hover:bg-gray-50 rounded-2xl font-bold">
                    For Restaurants
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Media Composition */}
            <div className="flex-1 w-full max-w-2xl relative mt-12 lg:mt-0">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-100">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="object-cover w-full h-full animate-image-drift"
                >
                  <source src="/assets/banner-video2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute top-4 left-4 md:top-12 md:-left-12 bg-card/95 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-border animate-float-slow flex items-center space-x-2 md:space-x-3">
                <div className="w-10 h-10 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Available Today</p>
                  <p className="text-xs text-muted">Freshly prepared</p>
                </div>
              </div>

              <div className="absolute bottom-8 right-2 md:bottom-32 md:-right-12 bg-card/95 backdrop-blur-md p-3 md:p-5 rounded-2xl shadow-xl border border-border animate-float-medium">
                <p className="font-black text-3xl text-brand-green mb-1">30% OFF</p>
                <p className="text-sm font-bold text-muted flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> Pickup by 10 PM
                </p>
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max md:translate-x-0 md:-bottom-6 md:left-12 bg-foreground text-background p-3 md:p-4 rounded-2xl shadow-2xl animate-float-fast flex items-center space-x-2 md:space-x-3">
                <AlertCircle className="w-5 h-5 text-brand-orange" />
                <p className="font-bold text-sm">Only 4 portions left</p>
              </div>
            </div>

          </div>
          
          {/* Background Soft Glows */}
          <div className="absolute top-0 right-0 w-[150vw] h-[150vw] max-w-[800px] max-h-[800px] bg-brand-green/5 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[120vw] h-[120vw] max-w-[600px] max-h-[600px] bg-brand-orange/5 rounded-full blur-[60px] md:blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        </section>

        {/* SECTION 2: THE MAIN IDEA */}
        <section className="py-16 md:py-32 bg-card relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 leading-[1.1]">
                  The Later It Gets,<br/>
                  <span className="text-brand-green text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-lime-500">The Better The Deal.</span>
                </h2>
                
                {/* Horizontal Timeline Concept rendered vertically/flex */}
                <div className="bg-background border border-border rounded-3xl p-8 mb-8 relative">
                  <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
                    {[
                      { t: '6 PM', d: '10%' },
                      { t: '7 PM', d: '20%' },
                      { t: '8 PM', d: '30%' },
                      { t: '9 PM', d: '40%' },
                      { t: '10 PM', d: '50%' },
                    ].map((item, idx, arr) => (
                      <React.Fragment key={idx}>
                        <div className="text-center bg-card p-4 rounded-2xl shadow-sm border border-border flex-1 min-w-[100px]">
                          <p className="font-bold text-muted mb-2">{item.t}</p>
                          <p className="font-black text-2xl text-foreground">{item.d} <span className="text-sm">OFF</span></p>
                        </div>
                        {idx < arr.length - 1 && (
                          <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex items-start bg-blue-50 text-blue-800 p-4 rounded-2xl border border-blue-100/50">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 mr-3 text-blue-500" />
                  <p className="text-sm font-medium">
                    <strong>Important:</strong> Discount schedules are set by individual restaurants and may vary. These numbers are examples of the mechanism, not real restaurant data.
                  </p>
                </div>
              </div>

              <div className="relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image 
                  src="/assets/salad.jpg" 
                  alt="Evening meal ready for pickup" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                  <p className="text-white text-xl font-bold tracking-wide">Freshly prepared, ready for pickup.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FOOD DISCOVERY */}
        <section className="py-16 md:py-32 bg-background border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div className="w-full">
                <h2 className="text-3xl md:text-5xl font-black mb-4">What's Waiting For You Today?</h2>
                <p className="text-xl text-muted font-medium">Discover fresh, high-quality meals rescued from waste.</p>
              </div>
              <Link href="/explore">
                <Button size="lg" className="rounded-full px-8 py-6 font-bold shadow-md hover:shadow-lg flex items-center">
                  Explore Deals <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Enhanced Deal Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { id: 1, title: 'Fresh Salad Bowl',     restaurant: 'Green Bites',    price: 150, original: 300, img: '/assets/salad.jpg',     discount: '50% OFF', rating: '4.6', reviews: 120, distance: '1.2 km', pickup: '15 min', urgencyBadge: '🔥 Popular', onlyLeft: null },
                { id: 2, title: 'Gourmet Pizza',         restaurant: 'Pizza Milano',   price: 250, original: 500, img: '/assets/pizza.jpg',     discount: '50% OFF', rating: '4.8', reviews: 340, distance: '0.8 km', pickup: '20 min', urgencyBadge: null,           onlyLeft: 'Only 3 left' },
                { id: 3, title: 'Spicy Chicken Roll',   restaurant: 'Wrap It Up',     price: 100, original: 200, img: '/assets/roll.jpg',      discount: '50% OFF', rating: '4.4', reviews: 89,  distance: '1.5 km', pickup: '10 min', urgencyBadge: '⏰ Ends in 2h', onlyLeft: null },
                { id: 4, title: 'Avocado Toast',         restaurant: 'Café Greens',    price: 120, original: 240, img: '/assets/avacado-toast.jpg', discount: '50% OFF', rating: '4.5', reviews: 67, distance: '2.1 km', pickup: '12 min', urgencyBadge: null,       onlyLeft: null },
                { id: 5, title: 'Creamy Pasta',          restaurant: 'La Cucina',      price: 180, original: 360, img: '/assets/pasta.jpg',      discount: '50% OFF', rating: '4.7', reviews: 210, distance: '0.5 km', pickup: '18 min', urgencyBadge: null,           onlyLeft: 'Only 2 left' },
                { id: 6, title: 'Club Sandwich',         restaurant: 'Deli House',     price: 130, original: 260, img: '/assets/sandwich.jpg',   discount: '50% OFF', rating: '4.3', reviews: 54,  distance: '1.8 km', pickup: '8 min',  urgencyBadge: '🔥 Popular', onlyLeft: null },
              ].map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group">
                  {/* Image */}
                  <div className="aspect-[4/3] relative w-full overflow-hidden shrink-0">
                    <Image src={item.img} alt={item.title} fill loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Discount badge */}
                    <div className="absolute top-3 right-3 z-20 bg-brand-accent text-foreground text-xs font-black px-2.5 py-1 rounded-full shadow">
                      {item.discount}
                    </div>
                    {/* Urgency badge */}
                    {item.urgencyBadge && (
                      <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        {item.urgencyBadge}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col gap-3">
                    <h3 className="text-base font-bold text-foreground leading-tight">{item.title}</h3>

                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm text-muted font-medium flex items-center gap-1">
                        <Store className="w-3.5 h-3.5 shrink-0" /> {item.restaurant}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted font-medium">
                        <span className="flex items-center gap-1">⭐ {item.rating} ({item.reviews})</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.distance}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Ready in {item.pickup}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-2">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-brand-green">₹{item.price}</span>
                          <span className="text-xs text-muted line-through">₹{item.original}</span>
                        </div>
                        {item.onlyLeft && (
                          <span className="text-xs font-bold text-red-500">{item.onlyLeft}</span>
                        )}
                      </div>
                      <Link href="/explore" className="block w-full">
                        <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-md" style={{background:'#0F5132'}}>
                          Reserve
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View all deals */}
            <div className="flex justify-end mt-8">
              <Link href="/explore" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:underline underline-offset-4 transition-colors">
                View all deals <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE PRICE DROP */}
        <section className="py-16 md:py-32 bg-foreground text-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Watch The Price Drop.</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                As the evening progresses, participating restaurants increase their discounts to ensure their fresh food finds a home.
              </p>
            </div>
            
            <InteractivePriceDrop />
            
          </div>
        </section>

        {/* SECTION 5: FOR RESTAURANTS */}
        <section className="py-16 md:py-32 bg-card overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
              
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl order-2 lg:order-1 border border-gray-100">
                <Image 
                  src="/assets/chicken.jpg" 
                  alt="Restaurant partnership" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-brand-green/10 mix-blend-multiply"></div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange font-bold text-sm mb-6">
                  <Store className="w-4 h-4 mr-2" /> For Restaurants
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">Turn Unsold Food Into Revenue.</h2>
                <p className="text-xl text-muted mb-10 leading-relaxed font-medium">
                  List food that may otherwise remain unsold, set your own discount schedule and reach nearby customers instantly.
                </p>
                
                <ul className="space-y-6 mb-12">
                  {[
                    'Recover lost revenue',
                    'Reduce daily food waste',
                    'Reach thousands of new customers',
                    'Full control over availability',
                    'Set flexible, automated discounts'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center text-lg font-bold text-foreground">
                      <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center mr-4 shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-brand-green" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Link href="/restaurants/partner">
                  <Button size="lg" className="px-10 py-6 text-xl shadow-xl hover:-translate-y-1 transition-transform rounded-2xl w-full sm:w-auto">
                    Partner With 50% Food
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: FOOD WASTE / IMPACT */}
        <section className="py-16 md:py-32 bg-background overflow-hidden border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8">Good Food Deserves Another Chance.</h2>
            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed font-medium">
              50% Food connects restaurants with customers so that good food has a better chance of being enjoyed instead of going unsold.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 relative z-10 max-w-5xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-card rounded-full shadow-lg border border-border flex items-center justify-center mb-6">
                  <Store className="w-12 h-12 text-muted" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Unsold</h3>
              </div>
              
              <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="h-1 w-full bg-gradient-to-r from-gray-200 via-brand-green to-gray-200 relative">
                  <ArrowRight className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-300 w-8 h-8 translate-x-1/2" />
                </div>
              </div>
              <ArrowRight className="w-8 h-8 text-gray-300 md:hidden" />

              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-card rounded-full shadow-xl border-2 border-brand-green flex items-center justify-center mb-6 scale-110">
                  <TrendingDown className="w-12 h-12 text-brand-green" />
                </div>
                <h3 className="text-2xl font-bold text-brand-green">Discounted</h3>
              </div>

              <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="h-1 w-full bg-gradient-to-r from-brand-green via-brand-orange to-gray-200 relative">
                  <ArrowRight className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-300 w-8 h-8 translate-x-1/2" />
                </div>
              </div>
              <ArrowRight className="w-8 h-8 text-gray-300 md:hidden" />

              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-card rounded-full shadow-lg border border-brand-orange flex items-center justify-center mb-6">
                  <Heart className="w-12 h-12 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Enjoyed</h3>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: MUMBAI */}
        <section className="py-16 md:py-32 bg-card relative overflow-hidden">
          {/* Map-inspired background */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Good Deals, Around Mumbai.</h2>
            <p className="text-lg md:text-xl text-muted font-medium max-w-2xl mx-auto mb-10 md:mb-12">Discover what's available in your neighborhood.</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {['Bandra', 'Andheri', 'Powai', 'Lower Parel', 'BKC', 'Juhu'].map((area) => (
                <Link key={area} href={`/explore?area=${area}`}>
                  <span className="inline-block px-8 py-4 bg-background border border-border rounded-full text-lg font-bold text-foreground hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors shadow-sm cursor-pointer">
                    {area}
                  </span>
                </Link>
              ))}
            </div>

            <div className="bg-background border border-border rounded-[2rem] p-12 max-w-3xl mx-auto text-center shadow-sm">
              <MapPin className="w-12 h-12 text-muted mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-2">Deals will appear here as restaurants join 50% Food.</h3>
              <p className="text-muted font-medium">Select an area above to filter available options.</p>
            </div>
          </div>
        </section>

        {/* SECTION 8: CUSTOMER BENEFITS */}
        <section className="py-16 md:py-32 bg-background border-t border-border relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">The Smart Way To Eat.</h2>
              <p className="text-lg text-muted font-medium">Enjoy premium meals while making a positive impact.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">

              {/* Card 1 — Save More */}
              <div className="relative flex flex-col bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-6 shrink-0">
                  <TrendingDown className="w-5 h-5" style={{color:'#0F5132'}} />
                </div>
                <h3 className="text-[18px] font-bold uppercase tracking-tight text-foreground mb-3">SAVE MORE</h3>
                <p className="text-[15px] text-muted leading-[1.6] font-medium">Get better prices on high-quality, freshly prepared food.</p>
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-green-600 group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl" />
              </div>

              {/* Card 2 — Discover More */}
              <div className="relative flex flex-col bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-6 shrink-0">
                  <Search className="w-5 h-5" style={{color:'#0F5132'}} />
                </div>
                <h3 className="text-[18px] font-bold uppercase tracking-tight text-foreground mb-3">DISCOVER MORE</h3>
                <p className="text-[15px] text-muted leading-[1.6] font-medium">Find amazing food from top-rated restaurants around you.</p>
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-green-600 group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl" />
              </div>

              {/* Card 3 — Time It Right */}
              <div className="relative flex flex-col bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-6 shrink-0">
                  <Clock className="w-5 h-5" style={{color:'#0F5132'}} />
                </div>
                <h3 className="text-[18px] font-bold uppercase tracking-tight text-foreground mb-3">TIME IT RIGHT</h3>
                <p className="text-[15px] text-muted leading-[1.6] font-medium">Watch discounts increase throughout the evening.</p>
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-green-600 group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl" />
              </div>

              {/* Card 4 — Waste Less */}
              <div className="relative flex flex-col bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-6 shrink-0">
                  <Leaf className="w-5 h-5" style={{color:'#0F5132'}} />
                </div>
                <h3 className="text-[18px] font-bold uppercase tracking-tight text-foreground mb-3">WASTE LESS</h3>
                <p className="text-[15px] text-muted leading-[1.6] font-medium">Help local businesses reduce their daily food waste.</p>
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-green-600 group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl" />
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 9: FINAL CTA — Premium Redesign */}
        <section className="bg-background pt-16 md:pt-24 pb-0 overflow-hidden border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0">

            {/* Left Side: Stacked Card Composition */}
            <div className="flex-1 w-full relative flex items-center justify-center min-h-[340px] md:min-h-[520px]">
              {/* Warm radial glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div style={{background:'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(255,107,74,0.18) 0%, transparent 75%)'}} className="w-full h-full" />
              </div>

              {/* Card 1 — back left, -8deg */}
              <div className="absolute left-[5%] md:left-[8%] top-[10%] w-[42%] max-w-[190px] md:max-w-[220px] aspect-[3/4] rounded-[24px] overflow-hidden shadow-xl border-2 border-white/80" style={{transform:'rotate(-8deg)', zIndex:1}}>
                <Image src="/assets/sandwich.jpg" alt="Food" fill loading="lazy" className="object-cover" />
              </div>

              {/* Card 2 — front center, 0deg */}
              <div className="relative w-[44%] max-w-[200px] md:max-w-[240px] aspect-[3/4] rounded-[24px] overflow-hidden shadow-2xl border-2 border-white" style={{transform:'rotate(0deg)', zIndex:3}}>
                <Image src="/assets/pasta.jpg" alt="Food" fill loading="lazy" className="object-cover" />
              </div>

              {/* Card 3 — back right, +6deg */}
              <div className="absolute right-[5%] md:right-[8%] top-[10%] w-[42%] max-w-[190px] md:max-w-[220px] aspect-[3/4] rounded-[24px] overflow-hidden shadow-xl border-2 border-white/80" style={{transform:'rotate(6deg)', zIndex:2}}>
                <Image src="/assets/dessert.jpg" alt="Food" fill loading="lazy" className="object-cover" />
              </div>

              {/* Floating stat badge */}
              <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-10 bg-white rounded-2xl shadow-2xl px-4 py-2.5 flex items-center gap-2.5 whitespace-nowrap border border-orange-100">
                <span className="text-xl">🍽️</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium leading-none mb-0.5">Meals Saved</p>
                  <p className="text-sm font-black text-gray-800 leading-none">50,000+</p>
                </div>
              </div>
            </div>

            {/* Right Side: Text & CTA */}
            <div className="flex-1 w-full pb-16 md:py-16 md:pl-14 text-center md:text-left z-30">
              {/* Eyebrow label */}
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">Sustainable Eating</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 leading-tight tracking-tight">
                Ready to Eat Well,<br/>
                <span style={{color:'#FF6B4A'}}>Waste Less?</span>
              </h2>

              {/* Orange accent divider */}
              <div className="w-[60px] h-[3px] rounded-full mx-auto md:mx-0 mb-6" style={{background:'#FF6B4A'}} />

              <p className="text-base md:text-lg text-muted mb-8 max-w-md mx-auto md:mx-0 font-medium leading-relaxed">
                Join 10,000+ smart foodies rescuing fresh, delicious meals from 200+ partner restaurants — every single day, at up to 70% off.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 mb-6">
                <Link href="/explore">
                  <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-base font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{background:'linear-gradient(135deg,#FF6B4A 0%,#e8440f 100%)', boxShadow:'0 8px 24px rgba(255,107,74,0.35)'}}>
                    Find Deals Near You
                  </button>
                </Link>
                <Link href="/how-it-works" className="text-sm font-semibold text-foreground hover:text-brand-orange transition-colors underline-offset-4 hover:underline flex items-center gap-1">
                  See how it works <span aria-hidden>→</span>
                </Link>
              </div>

              {/* Trust line */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-muted font-medium">
                <span className="flex items-center gap-1"><span className="text-brand-green font-bold">✓</span> No signup fee</span>
                <span className="flex items-center gap-1"><span className="text-brand-green font-bold">✓</span> Cancel anytime</span>
                <span className="flex items-center gap-1"><span className="text-yellow-500">★</span> 4.8 rated</span>
              </div>
            </div>

          </div>
        </section>

      </main>
      
      <Footer />
    </>
  );
}
