'use client';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Accordion } from '@/components/ui/Accordion';

export default function FAQPage() {
  const faqItems = [
    {
      title: "What is 50% Food?",
      content: "50% Food is a marketplace that connects customers with restaurants selling fresh, high-quality surplus food at a discount before closing time. Our goal is to reduce food waste while offering great meals at better prices."
    },
    {
      title: "Why are the prices discounted?",
      content: "Restaurants prepare fresh food every day. As closing time approaches, it's better for them to sell this perfectly good food at a discount rather than throw it away. You get a deal, the restaurant recovers costs, and less food goes to waste."
    },
    {
      title: "Is the food fresh?",
      content: "Yes, absolutely! The food listed on our platform is the exact same fresh, high-quality food that the restaurant sells at full price during normal hours. It's just what they have left over toward the end of the day."
    },
    {
      title: "How does dynamic pricing work?",
      content: "Restaurants set a schedule where the discount increases as time passes. For example, a meal might be 10% off at 6:00 PM, 30% off at 8:00 PM, and 50% off at 10:00 PM. You can choose to buy it early to guarantee you get it, or wait for a bigger discount and risk it selling out."
    },
    {
      title: "Can restaurants choose their own discount schedule?",
      content: "Yes. Every restaurant has full control over their own discount schedule, quantities, and pickup times."
    },
    {
      title: "When can I pick up my order?",
      content: "Each food item has a specific 'Pickup Window' listed on its page. You must pick up your food during this specified time. If you do not arrive during the window, the restaurant may dispose of the food."
    },
    {
      title: "Can I cancel my order?",
      content: "Because of the highly time-sensitive nature of surplus food, orders generally cannot be cancelled once placed. Please make sure you can make it to the pickup window before ordering."
    },
    {
      title: "How do restaurants join?",
      content: "If you own a restaurant, cafe, or bakery in Mumbai, you can list your business by clicking 'For Restaurants' in the navigation menu and signing up as a partner."
    },
    {
      title: "Is 50% the maximum discount?",
      content: "Not always! While 50% is our namesake, discounts can go up to 70% or more late at night, depending entirely on what the restaurant configures in their schedule."
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 pb-24">
        
        <div className="bg-foreground text-white py-16 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-400 text-lg">Everything you need to know about 50% Food.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Accordion items={faqItems} />
        </div>

      </main>
      <Footer />
    </>
  );
}
