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
            <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-md p-6 rounded-2xl shadow-xl flex justify-between items-end">
              <div>
                <p className="text-sm font-bold text-muted uppercase tracking-wider mb-1">Example Meal</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-foreground">₹{schedule[activeTimeIndex].price}</span>
                  {schedule[activeTimeIndex].discount > 0 && (
                    <span className="text-lg text-muted line-through font-medium">₹500</span>
                  )}
                </div>
              </div>
              <div className="text-right">
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

            {/* Empty State Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-card rounded-[2rem] p-8 border border-border shadow-sm text-center flex flex-col items-center justify-center aspect-[4/3]">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-6">
                    <Store className="w-8 h-8 text-muted" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Deals from restaurants near you will appear here.</h3>
                  <p className="text-muted text-sm max-w-xs mx-auto">Once local restaurants start listing their food, this section will be filled with delicious options.</p>
                </div>
              ))}
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Card 1 */}
              <div className="relative bg-card rounded-[2.5rem] p-10 border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-brand-green/10 transition-colors duration-500"></div>
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-brand-green/10 to-brand-green/5 rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 border border-brand-green/10 shadow-sm">
                  <TrendingDown className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="relative z-10 text-2xl font-black mb-3 tracking-tight text-foreground group-hover:text-brand-green transition-colors">SAVE MORE</h3>
                <p className="relative z-10 text-lg text-muted font-medium leading-relaxed">Get better prices on high-quality, freshly prepared food.</p>
                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-brand-green group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>

              {/* Card 2 */}
              <div className="relative bg-card rounded-[2.5rem] p-10 border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-blue-500/10 shadow-sm">
                  <Search className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="relative z-10 text-2xl font-black mb-3 tracking-tight text-foreground group-hover:text-blue-500 transition-colors">DISCOVER MORE</h3>
                <p className="relative z-10 text-lg text-muted font-medium leading-relaxed">Find amazing food from top-rated restaurants around you.</p>
                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-blue-500 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>

              {/* Card 3 */}
              <div className="relative bg-card rounded-[2.5rem] p-10 border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-brand-orange/10 transition-colors duration-500"></div>
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 border border-brand-orange/10 shadow-sm">
                  <Clock className="w-8 h-8 text-brand-orange" />
                </div>
                <h3 className="relative z-10 text-2xl font-black mb-3 tracking-tight text-foreground group-hover:text-brand-orange transition-colors">TIME IT RIGHT</h3>
                <p className="relative z-10 text-lg text-muted font-medium leading-relaxed">Watch discounts increase throughout the evening.</p>
                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-brand-orange group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>

              {/* Card 4 */}
              <div className="relative bg-card rounded-[2.5rem] p-10 border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-emerald-500/10 shadow-sm">
                  <Leaf className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="relative z-10 text-2xl font-black mb-3 tracking-tight text-foreground group-hover:text-emerald-500 transition-colors">WASTE LESS</h3>
                <p className="relative z-10 text-lg text-muted font-medium leading-relaxed">Help local businesses reduce their daily food waste.</p>
                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-emerald-500 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 9: FINAL CTA (Image Inspired Layout) */}
        <section className="bg-background pt-12 md:pt-20 overflow-hidden border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            
            {/* Left Side: Images & Arch */}
            <div className="flex-1 w-full relative h-[350px] md:h-[550px] flex items-end justify-center mb-12 md:mb-0">
              {/* Dark Green Arch */}
              <div className="absolute bottom-0 w-[90%] md:w-[80%] h-[80%] bg-[#1a4a40] rounded-t-full z-0"></div>
              
              {/* Floating Image 1 (Tilted Left) - Video */}
              <div className="absolute bottom-8 left-2 md:bottom-16 md:left-12 w-36 h-56 md:w-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-white -rotate-6 md:rotate-[-15deg] z-10 hover:rotate-[-5deg] transition-transform duration-500">
                <video autoPlay loop muted playsInline className="object-cover w-full h-full">
                  <source src="/assets/banner-video2.mp4" type="video/mp4" />
                </video>
              </div>
              
              {/* Floating Image 2 (Tilted Right) - Video */}
              <div className="absolute bottom-16 right-2 md:bottom-24 md:right-12 w-36 h-56 md:w-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-white rotate-6 md:rotate-[15deg] z-20 hover:rotate-[5deg] transition-transform duration-500">
                <video autoPlay loop muted playsInline className="object-cover w-full h-full">
                  <source src="/assets/vidoe2.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Right Side: Text & CTA */}
            <div className="flex-1 w-full pb-16 md:py-16 md:pl-16 text-center md:text-left z-30">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Ready to Eat Well,<br/> Waste Less?
              </h2>
              
              {/* Divider Line */}
              <div className="w-16 h-1 bg-foreground mx-auto md:mx-0 mb-6"></div>
              
              <p className="text-lg text-muted mb-8 max-w-md mx-auto md:mx-0 font-medium leading-relaxed">
                Join our community of smart foodies and sustainable restaurants rescuing delicious, fresh meals every single day.
              </p>
              
              <Link href="/explore">
                <Button size="lg" className="bg-[#00a651] hover:bg-[#008a43] text-white px-10 py-6 text-lg font-bold shadow-lg shadow-[#00a651]/30 rounded-lg">
                  Explore Deals Now
                </Button>
              </Link>
            </div>
            
          </div>
        </section>

      </main>
      
      <Footer />
    </>
  );
}
