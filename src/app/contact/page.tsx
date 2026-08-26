'use client';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 pb-24">
        
        <div className="bg-foreground text-white py-16 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-400 text-lg">We'd love to hear from you.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Customer Support */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6">Customer Support</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-brand-green mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <p className="text-muted">support@50percentfood.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-brand-green mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Phone</h3>
                    <p className="text-muted">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-brand-green mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Office</h3>
                    <p className="text-muted">Bandra West, Mumbai, Maharashtra 400050</p>
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <h3 className="font-bold mb-2 border-t border-gray-100 pt-6">Send us a message</h3>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <textarea 
                  placeholder="How can we help?" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                ></textarea>
                <Button fullWidth>Send Message</Button>
              </form>
            </div>

            {/* Restaurant Partnerships */}
            <div className="bg-foreground text-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-2">Restaurant Partnerships</h2>
              <p className="text-gray-400 mb-8">Join the movement to reduce food waste and increase your revenue.</p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Restaurant Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Message (Optional)</label>
                  <textarea 
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                  ></textarea>
                </div>
                <Button variant="primary" fullWidth className="mt-4">Submit Enquiry</Button>
              </form>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
