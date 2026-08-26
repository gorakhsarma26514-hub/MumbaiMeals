import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/assets/logo.png" 
                alt="50% Food Logo" 
                width={150} 
                height={50} 
                className="h-10 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Great Food. Better Prices. Less Waste. Discover delicious food from Mumbai’s best restaurants at discounts that get better as the day goes on.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/deals" className="text-gray-400 hover:text-white transition-colors text-sm">All Deals</Link></li>
              <li><Link href="/explore?location=bandra" className="text-gray-400 hover:text-white transition-colors text-sm">Bandra</Link></li>
              <li><Link href="/explore?location=andheri" className="text-gray-400 hover:text-white transition-colors text-sm">Andheri</Link></li>
              <li><Link href="/explore?location=powai" className="text-gray-400 hover:text-white transition-colors text-sm">Powai</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How it Works</Link></li>
              <li><Link href="/impact" className="text-gray-400 hover:text-white transition-colors text-sm">Sustainability</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">For Restaurants</h4>
            <ul className="space-y-3">
              <li><Link href="/restaurants/partner" className="text-gray-400 hover:text-white transition-colors text-sm">Partner with us</Link></li>
              <li><Link href="/restaurants/login" className="text-gray-400 hover:text-white transition-colors text-sm">Restaurant Login</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} 50% Food. Made for Mumbai.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
