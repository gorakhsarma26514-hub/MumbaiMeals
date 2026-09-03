'use client';
import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FilterBar } from '@/components/ui/FilterBar';
import { Search, MapPin, Clock, Store, ArrowRight, LayoutGrid, Leaf, Drumstick, Candy, CakeSlice, Croissant, IceCream, CupSoda } from 'lucide-react';

// ─── Trending: 1 banner video + 7 static images ─────────────────────────────
const TRENDING = [
  { src: '/assets/vdo-banner.mp4', title: 'Tasty Food', type: 'video' },
  { src: '/assets/burg.jpg', title: 'Juicy Burgers', type: 'image' },
  { src: '/assets/omlet.jpg', title: 'Morning Special', type: 'image' },
  { src: '/assets/donut.jpg', title: 'Fresh Donuts', type: 'image' },
  { src: '/assets/chicken.jpg', title: 'Spicy Chicken', type: 'image' },
  { src: '/assets/lolipop.jpg', title: 'Chicken Lollipop', type: 'image' },
  { src: '/assets/salad.jpg', title: 'Fresh Salad', type: 'image' },
];

// ─── Gallery: unique images only — duplicated once for CSS marquee ──────────
const GALLERY_IMAGES = [
  '/assets/pizza.jpg',
  '/assets/roll.jpg',
  '/assets/halffry.jpg',
  '/assets/avacado-toast.jpg',
  '/assets/burg.jpg',
  '/assets/creamroll.jpg',
  '/assets/creamy-noodles.jpg',
  '/assets/crossant.jpg',
  '/assets/dessert.jpg',
  '/assets/donut.jpg',
  '/assets/momo.png',
  '/assets/omlet.jpg',
  '/assets/pasta.jpg',
  '/assets/sandwich.jpg',
];

// ─── Demo deal cards with city/category mapping ──────────────────────────────
const DEMO_DEALS = [
  // Veg Meals
  { id: 'v1', title: 'Special Veg Thali', restaurant: 'Thali House', price: 150, original: 300, img: '/assets/paneer.jpg', discount: '50% OFF', rating: '4.7', reviews: 210, distance: '1.2 km', pickup: '15 min', urgencyBadge: '🔥 Popular', onlyLeft: null, city: 'andheri', category: 'veg-meals' },
  { id: 'v2', title: 'Dal Makhani Rice', restaurant: 'Punjab Grill', price: 120, original: 240, img: '/assets/daal.jpg', discount: '50% OFF', rating: '4.6', reviews: 180, distance: '2.5 km', pickup: '20 min', urgencyBadge: null, onlyLeft: 'Only 3 left', city: 'bandra', category: 'veg-meals' },
  { id: 'v3', title: 'Paneer Butter Masala', restaurant: 'Spice Symphony', price: 180, original: 360, img: '/assets/paneer.jpg', discount: '50% OFF', rating: '4.8', reviews: 340, distance: '0.8 km', pickup: '10 min', urgencyBadge: '⏰ Ends in 2h', onlyLeft: null, city: 'powai', category: 'veg-meals' },
  { id: 'v4', title: 'Rajma Chawal Bowl', restaurant: 'North Connect', price: 110, original: 220, img: '/assets/rajama-chawal.jpg', discount: '50% OFF', rating: '4.5', reviews: 150, distance: '1.5 km', pickup: '12 min', urgencyBadge: null, onlyLeft: null, city: 'juhu', category: 'veg-meals' },
  { id: 'v5', title: 'Veg Steam Momos', restaurant: 'Momo Street', price: 100, original: 200, img: '/assets/momo.png', discount: '50% OFF', rating: '4.9', reviews: 500, distance: '3.0 km', pickup: '25 min', urgencyBadge: '🔥 Popular', onlyLeft: 'Only 5 left', city: 'bkc', category: 'veg-meals' },
  { id: 'v6', title: 'Gourmet Pizza', restaurant: 'Pizza Milano', price: 250, original: 500, img: '/assets/pizza.jpg', discount: '50% OFF', rating: '4.8', reviews: 340, distance: '0.8 km', pickup: '20 min', urgencyBadge: null, onlyLeft: 'Only 3 left', city: 'andheri', category: 'veg-meals' },
  { id: 'v7', title: 'Veggie Burger', restaurant: 'Burger Hub', price: 150, original: 300, img: '/assets/burg.jpg', discount: '50% OFF', rating: '4.6', reviews: 180, distance: '1.2 km', pickup: '15 min', urgencyBadge: '🔥 Popular', onlyLeft: null, city: 'bandra', category: 'veg-meals' },
  { id: 'v8', title: 'Club Sandwich', restaurant: 'Deli House', price: 130, original: 260, img: '/assets/sandwich.jpg', discount: '50% OFF', rating: '4.3', reviews: 54, distance: '1.8 km', pickup: '8 min', urgencyBadge: null, onlyLeft: null, city: 'colaba', category: 'veg-meals' },
  { id: 'v9', title: 'Creamy Pasta', restaurant: 'La Cucina', price: 180, original: 360, img: '/assets/pasta.jpg', discount: '50% OFF', rating: '4.7', reviews: 210, distance: '0.5 km', pickup: '18 min', urgencyBadge: null, onlyLeft: 'Only 2 left', city: 'lower_parel', category: 'veg-meals' },
  { id: 'v10', title: 'Creamy Noodles', restaurant: 'Noodle Bowl', price: 160, original: 320, img: '/assets/creamy-noodles.jpg', discount: '50% OFF', rating: '4.5', reviews: 120, distance: '1.0 km', pickup: '15 min', urgencyBadge: '⏰ Ends in 2h', onlyLeft: null, city: 'powai', category: 'veg-meals' },
  { id: 'v11', title: 'Avocado Toast', restaurant: 'Café Greens', price: 120, original: 240, img: '/assets/avacado-toast.jpg', discount: '50% OFF', rating: '4.5', reviews: 67, distance: '2.1 km', pickup: '12 min', urgencyBadge: null, onlyLeft: null, city: 'juhu', category: 'veg-meals' },
  { id: 'v12', title: 'Fresh Salad Bowl', restaurant: 'Green Bites', price: 150, original: 300, img: '/assets/salad.jpg', discount: '50% OFF', rating: '4.6', reviews: 120, distance: '1.2 km', pickup: '15 min', urgencyBadge: '🔥 Popular', onlyLeft: null, city: 'bandra', category: 'veg-meals' },
  { id: 'v13', title: 'Aalu Vadi', restaurant: 'Maharashtrian Treat', price: 80, original: 160, img: '/assets/aadu-vadi.jpg', discount: '50% OFF', rating: '4.4', reviews: 90, distance: '1.3 km', pickup: '10 min', urgencyBadge: null, onlyLeft: null, city: 'andheri', category: 'veg-meals' },
  { id: 'v14', title: 'Roasted Bhutta', restaurant: 'Street Snack', price: 40, original: 80, img: '/assets/bhutta.jpg', discount: '50% OFF', rating: '4.2', reviews: 45, distance: '0.5 km', pickup: '5 min', urgencyBadge: null, onlyLeft: null, city: 'bandra', category: 'veg-meals' },
  { id: 'v15', title: 'Butter Roti Meal', restaurant: 'Punjabi Dhaba', price: 100, original: 200, img: '/assets/butter-roti.jpg', discount: '50% OFF', rating: '4.6', reviews: 130, distance: '2.0 km', pickup: '15 min', urgencyBadge: null, onlyLeft: null, city: 'powai', category: 'veg-meals' },
  { id: 'v16', title: 'Homestyle Chapati', restaurant: 'Ghar Ka Khana', price: 50, original: 100, img: '/assets/chapati.jpg', discount: '50% OFF', rating: '4.8', reviews: 200, distance: '1.1 km', pickup: '10 min', urgencyBadge: null, onlyLeft: null, city: 'bkc', category: 'veg-meals' },
  { id: 'v17', title: 'White Sauce Pasta', restaurant: 'Italian Bistro', price: 200, original: 400, img: '/assets/creemy-pasta.jpg', discount: '50% OFF', rating: '4.7', reviews: 180, distance: '1.8 km', pickup: '20 min', urgencyBadge: '🔥 Popular', onlyLeft: null, city: 'colaba', category: 'veg-meals' },
  { id: 'v18', title: 'Lachha Paratha', restaurant: 'North Indian Spice', price: 70, original: 140, img: '/assets/lachha-paratha.jpg', discount: '50% OFF', rating: '4.5', reviews: 110, distance: '1.5 km', pickup: '10 min', urgencyBadge: null, onlyLeft: null, city: 'lower_parel', category: 'veg-meals' },
  { id: 'v19', title: 'Fried Momos', restaurant: 'Dumpling Express', price: 110, original: 220, img: '/assets/momos.jpg', discount: '50% OFF', rating: '4.6', reviews: 250, distance: '1.2 km', pickup: '15 min', urgencyBadge: '⏰ Ends in 1h', onlyLeft: null, city: 'juhu', category: 'veg-meals' },
  { id: 'v20', title: 'Kanda Poha', restaurant: 'Breakfast Corner', price: 60, original: 120, img: '/assets/poha.jpg', discount: '50% OFF', rating: '4.4', reviews: 300, distance: '0.8 km', pickup: '5 min', urgencyBadge: 'Must Try', onlyLeft: null, city: 'andheri', category: 'veg-meals' },

  // Non-Veg Meals
  { id: 'nv1', title: 'Chicken Tandoori', restaurant: 'Tandoor Nights', price: 250, original: 500, img: '/assets/chicken-tandoori.jpg', discount: '50% OFF', rating: '4.8', reviews: 410, distance: '1.1 km', pickup: '20 min', urgencyBadge: null, onlyLeft: null, city: 'bandra', category: 'non-veg-meals' },
  { id: 'nv2', title: 'Chicken Tikka', restaurant: 'Grill House', price: 200, original: 400, img: '/assets/chicken-leg-tikka.jpg', discount: '50% OFF', rating: '4.7', reviews: 250, distance: '3.0 km', pickup: '25 min', urgencyBadge: '🔥 Popular', onlyLeft: 'Only 4 left', city: 'andheri', category: 'non-veg-meals' },
  { id: 'nv3', title: 'Egg Curry Rice', restaurant: 'Eggcellent', price: 130, original: 260, img: '/assets/egg-curry.jpg', discount: '50% OFF', rating: '4.4', reviews: 110, distance: '1.5 km', pickup: '10 min', urgencyBadge: '⏰ Ends in 2h', onlyLeft: null, city: 'powai', category: 'non-veg-meals' },
  { id: 'nv4', title: 'Crispy Fish Fry', restaurant: 'Coastal Catch', price: 180, original: 360, img: '/assets/fish.jpg', discount: '50% OFF', rating: '4.6', reviews: 89, distance: '0.9 km', pickup: '12 min', urgencyBadge: null, onlyLeft: 'Only 2 left', city: 'juhu', category: 'non-veg-meals' },
  { id: 'nv5', title: 'Spicy Chicken Roll', restaurant: 'Wrap It Up', price: 140, original: 280, img: '/assets/roll.jpg', discount: '50% OFF', rating: '4.4', reviews: 89, distance: '1.5 km', pickup: '10 min', urgencyBadge: '⏰ Ends in 2h', onlyLeft: null, city: 'powai', category: 'non-veg-meals' },
  { id: 'nv6', title: 'Chicken Lollipop', restaurant: 'Spice Route', price: 200, original: 400, img: '/assets/lolipop.jpg', discount: '50% OFF', rating: '4.7', reviews: 250, distance: '3.0 km', pickup: '25 min', urgencyBadge: '🔥 Popular', onlyLeft: 'Only 5 left', city: 'andheri', category: 'non-veg-meals' },
  { id: 'nv7', title: 'Roast Chicken', restaurant: 'Grill House', price: 350, original: 700, img: '/assets/chicken.jpg', discount: '50% OFF', rating: '4.8', reviews: 410, distance: '1.1 km', pickup: '20 min', urgencyBadge: null, onlyLeft: null, city: 'bkc', category: 'non-veg-meals' },
  { id: 'nv8', title: 'Cheese Omelette', restaurant: 'Eggcellent', price: 110, original: 220, img: '/assets/omlet.jpg', discount: '50% OFF', rating: '4.3', reviews: 90, distance: '0.9 km', pickup: '12 min', urgencyBadge: null, onlyLeft: null, city: 'bandra', category: 'non-veg-meals' },
  { id: 'nv9', title: 'Half Fry Eggs', restaurant: 'Morning Star', price: 90, original: 180, img: '/assets/halffry.jpg', discount: '50% OFF', rating: '4.2', reviews: 60, distance: '1.4 km', pickup: '10 min', urgencyBadge: null, onlyLeft: null, city: 'juhu', category: 'non-veg-meals' },
  { id: 'nv10', title: 'Sunny Side Up', restaurant: 'Breakfast Hub', price: 100, original: 200, img: '/assets/halfaegg.jpg', discount: '50% OFF', rating: '4.5', reviews: 80, distance: '1.0 km', pickup: '15 min', urgencyBadge: null, onlyLeft: null, city: 'colaba', category: 'non-veg-meals' },

  // Sweets & Mithai
  { id: 's1', title: 'Fresh Jalebi', restaurant: 'Mithaiwala', price: 80, original: 160, img: '/assets/jalebi.jpg', discount: '50% OFF', rating: '4.7', reviews: 220, distance: '1.5 km', pickup: '5 min', urgencyBadge: '🔥 Popular', onlyLeft: null, city: 'andheri', category: 'sweets' },
  { id: 's2', title: 'Steamed Modak', restaurant: 'Prabha Sweets', price: 120, original: 240, img: '/assets/modak.jpg', discount: '50% OFF', rating: '4.9', reviews: 310, distance: '2.0 km', pickup: '10 min', urgencyBadge: null, onlyLeft: 'Only 3 left', city: 'powai', category: 'sweets' },
  { id: 's3', title: 'Soft Rasgulla', restaurant: 'Bengal Sweets', price: 90, original: 180, img: '/assets/rossgulla.jpg', discount: '50% OFF', rating: '4.6', reviews: 140, distance: '1.0 km', pickup: '15 min', urgencyBadge: null, onlyLeft: null, city: 'bandra', category: 'sweets' },
  { id: 's4', title: 'Assorted Sweets', restaurant: 'Bikanerwala', price: 200, original: 400, img: '/assets/sweet.jpg', discount: '50% OFF', rating: '4.8', reviews: 400, distance: '2.5 km', pickup: '10 min', urgencyBadge: 'Must Try', onlyLeft: 'Only 2 left', city: 'juhu', category: 'sweets' },
  { id: 's5', title: 'Rasmalai', restaurant: 'Sweet Delights', price: 150, original: 300, img: '/assets/rasmalai.jpg', discount: '50% OFF', rating: '4.9', reviews: 320, distance: '1.8 km', pickup: '10 min', urgencyBadge: '🔥 Popular', onlyLeft: null, city: 'andheri', category: 'sweets' },
  { id: 's6', title: 'Gulab Jamun', restaurant: 'Mithaiwala', price: 100, original: 200, img: '/assets/gulabjamun.jpg', discount: '50% OFF', rating: '4.8', reviews: 250, distance: '1.5 km', pickup: '8 min', urgencyBadge: null, onlyLeft: 'Only 4 left', city: 'bandra', category: 'sweets' },
  { id: 's7', title: 'Special Mithai', restaurant: 'Bikanerwala', price: 250, original: 500, img: '/assets/dessyy1.jpg', discount: '50% OFF', rating: '4.7', reviews: 180, distance: '2.0 km', pickup: '15 min', urgencyBadge: 'Must Try', onlyLeft: null, city: 'powai', category: 'sweets' },

  // Cakes
  { id: 'c1', title: 'Chocolate Truffle Cake', restaurant: 'Cake Shop', price: 350, original: 700, img: '/assets/strawberry-chocy.jpg', discount: '50% OFF', rating: '4.8', reviews: 190, distance: '1.8 km', pickup: '20 min', urgencyBadge: '🔥 Popular', onlyLeft: 'Only 2 left', city: 'bkc', category: 'cakes' },
  { id: 'c2', title: 'Vanilla Cream Cake', restaurant: 'Sweet Delights', price: 250, original: 500, img: '/assets/dessert.jpg', discount: '50% OFF', rating: '4.7', reviews: 140, distance: '1.2 km', pickup: '15 min', urgencyBadge: null, onlyLeft: null, city: 'andheri', category: 'cakes' },
  { id: 'c3', title: 'Pastry Box (4 pcs)', restaurant: 'Daily Bake', price: 200, original: 400, img: '/assets/sweet.jpg', discount: '50% OFF', rating: '4.5', reviews: 85, distance: '2.0 km', pickup: '10 min', urgencyBadge: null, onlyLeft: 'Only 3 left', city: 'bandra', category: 'cakes' },
  { id: 'c4', title: 'Fruit Cake Slice', restaurant: 'Bake House', price: 80, original: 160, img: '/assets/donut.jpg', discount: '50% OFF', rating: '4.6', reviews: 110, distance: '0.9 km', pickup: '5 min', urgencyBadge: '⏰ Ends in 1h', onlyLeft: null, city: 'powai', category: 'cakes' },
  
  // Bakery
  { id: 'b1', title: 'Butter Croissant', restaurant: 'French Bakery', price: 60, original: 120, img: '/assets/crossant.jpg', discount: '50% OFF', rating: '4.6', reviews: 90, distance: '1.5 km', pickup: '8 min', urgencyBadge: null, onlyLeft: null, city: 'andheri', category: 'bakery' },
  { id: 'b2', title: 'Cream Roll', restaurant: 'Daily Bake', price: 40, original: 80, img: '/assets/creamroll.jpg', discount: '50% OFF', rating: '4.4', reviews: 75, distance: '0.8 km', pickup: '10 min', urgencyBadge: '⏰ Ends in 1h', onlyLeft: null, city: 'powai', category: 'bakery' },
  { id: 'b3', title: 'Glazed Donut', restaurant: 'Donut King', price: 80, original: 160, img: '/assets/donut.jpg', discount: '50% OFF', rating: '4.7', reviews: 220, distance: '1.5 km', pickup: '5 min', urgencyBadge: null, onlyLeft: null, city: 'bandra', category: 'bakery' },
  { id: 'b4', title: 'Fresh Cookies Pack', restaurant: 'Bake House', price: 100, original: 200, img: '/assets/jalebi.jpg', discount: '50% OFF', rating: '4.5', reviews: 130, distance: '2.1 km', pickup: '12 min', urgencyBadge: '🔥 Popular', onlyLeft: null, city: 'juhu', category: 'bakery' },
  { id: 'b5', title: 'Garlic Bread Loaf', restaurant: 'Morning Bakes', price: 70, original: 140, img: '/assets/avacado-toast.jpg', discount: '50% OFF', rating: '4.8', reviews: 210, distance: '1.1 km', pickup: '15 min', urgencyBadge: null, onlyLeft: 'Only 5 left', city: 'bkc', category: 'bakery' },

  // Desserts (Images changed to different ones based on request)
  { id: 'd1', title: 'Choco Lava Cup', restaurant: 'Sweet Tooth', price: 120, original: 240, img: '/assets/creamroll.jpg', discount: '50% OFF', rating: '4.8', reviews: 300, distance: '0.6 km', pickup: '5 min', urgencyBadge: 'Must Try', onlyLeft: 'Only 4 left', city: 'lower_parel', category: 'desserts' },
  { id: 'd2', title: 'Caramel Brownie', restaurant: 'Treat Street', price: 110, original: 220, img: '/assets/caremel.jpg', discount: '50% OFF', rating: '4.7', reviews: 180, distance: '1.4 km', pickup: '15 min', urgencyBadge: '🔥 Popular', onlyLeft: null, city: 'andheri', category: 'desserts' },
  { id: 'd3', title: 'Ice Cream Sundae', restaurant: 'Frosty Scoops', price: 140, original: 280, img: '/assets/falooda.jpg', discount: '50% OFF', rating: '4.6', reviews: 250, distance: '1.8 km', pickup: '10 min', urgencyBadge: '⏰ Ends in 2h', onlyLeft: null, city: 'bandra', category: 'desserts' },
  { id: 'd4', title: 'Mango Tartles', restaurant: 'Bake House', price: 150, original: 300, img: '/assets/mango-tartles.jpg', discount: '50% OFF', rating: '4.8', reviews: 210, distance: '2.0 km', pickup: '12 min', urgencyBadge: null, onlyLeft: null, city: 'bkc', category: 'desserts' },
  { id: 'd5', title: 'Rose Yogurt', restaurant: 'Dessert Hub', price: 90, original: 180, img: '/assets/yougurt-rose.jpg', discount: '50% OFF', rating: '4.5', reviews: 110, distance: '2.1 km', pickup: '10 min', urgencyBadge: null, onlyLeft: 'Only 2 left', city: 'juhu', category: 'desserts' },
  { id: 'd6', title: 'Special Dessert', restaurant: 'Sweet Delights', price: 200, original: 400, img: '/assets/dessyy1.jpg', discount: '50% OFF', rating: '4.9', reviews: 400, distance: '1.2 km', pickup: '15 min', urgencyBadge: '🔥 Popular', onlyLeft: null, city: 'powai', category: 'desserts' },
  { id: 'd7', title: 'Vanilla Cream', restaurant: 'Daily Bake', price: 130, original: 260, img: '/assets/dessert.jpg', discount: '50% OFF', rating: '4.6', reviews: 150, distance: '0.9 km', pickup: '8 min', urgencyBadge: null, onlyLeft: null, city: 'andheri', category: 'desserts' },
  { id: 'd8', title: 'Assorted Sweets', restaurant: 'Bikanerwala', price: 180, original: 360, img: '/assets/sweet.jpg', discount: '50% OFF', rating: '4.7', reviews: 310, distance: '1.5 km', pickup: '10 min', urgencyBadge: null, onlyLeft: 'Only 5 left', city: 'colaba', category: 'desserts' },
  { id: 'd9', title: 'Sweet Croissant', restaurant: 'French Bakery', price: 100, original: 200, img: '/assets/crossant.jpg', discount: '50% OFF', rating: '4.5', reviews: 180, distance: '2.5 km', pickup: '20 min', urgencyBadge: null, onlyLeft: null, city: 'bandra', category: 'desserts' },

  // Juices & Beverages
  { id: 'j1', title: 'Fresh Orange Juice', restaurant: 'Juice Corner', price: 80, original: 160, img: '/assets/juice1.jpg', discount: '50% OFF', rating: '4.8', reviews: 320, distance: '1.1 km', pickup: '5 min', urgencyBadge: '🔥 Popular', onlyLeft: null, city: 'bandra', category: 'beverages' },
  { id: 'j2', title: 'Watermelon Cooler', restaurant: 'Fresh Squeeze', price: 90, original: 180, img: '/assets/juice2.jpg', discount: '50% OFF', rating: '4.6', reviews: 210, distance: '0.8 km', pickup: '10 min', urgencyBadge: null, onlyLeft: 'Only 3 left', city: 'powai', category: 'beverages' },
  { id: 'j3', title: 'Mix Fruit Blast', restaurant: 'Juice Point', price: 100, original: 200, img: '/assets/juice3.jpg', discount: '50% OFF', rating: '4.7', reviews: 150, distance: '1.5 km', pickup: '5 min', urgencyBadge: '⏰ Ends in 1h', onlyLeft: null, city: 'andheri', category: 'beverages' },
  { id: 'j4', title: 'Healthy Green Juice', restaurant: 'Green Detox', price: 120, original: 240, img: '/assets/juice4.jpg', discount: '50% OFF', rating: '4.9', reviews: 400, distance: '2.0 km', pickup: '15 min', urgencyBadge: 'Must Try', onlyLeft: null, city: 'bkc', category: 'beverages' },
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

const CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: LayoutGrid, color: '#1a1a1a', bg: '#f3f4f6' },
  { id: 'veg-meals', label: 'Veg Meals', icon: Leaf, color: '#22c55e', bg: '#f0fdf4' },
  { id: 'non-veg-meals', label: 'Non-Veg Meals', icon: Drumstick, color: '#9f1239', bg: '#fff1f2' },
  { id: 'sweets', label: 'Sweets & Mithai', icon: Candy, color: '#E8A628', bg: '#fdf6e9' },
  { id: 'cakes', label: 'Cakes', icon: CakeSlice, color: '#f472b6', bg: '#fdf2f8' },
  { id: 'bakery', label: 'Bakery', icon: Croissant, color: '#A67C52', bg: '#f6f2ee' },
  { id: 'desserts', label: 'Desserts', icon: IceCream, color: '#a855f7', bg: '#faf5ff' },
  { id: 'beverages', label: 'Juices & Beverages', icon: CupSoda, color: '#84cc16', bg: '#f7fee7' },
];

function ExplorePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL State Synchronization
  const activeArea = searchParams.get('city') || 'all';
  const activePreference = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectArea = (areaId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (areaId === 'all') {
      params.delete('city');
    } else {
      params.set('city', areaId);
    }
    router.push(`/explore?${params.toString()}`);
  };

  const handleSelectPreference = (prefId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (prefId === 'all') {
      params.delete('category');
    } else {
      params.set('category', prefId);
    }
    router.push(`/explore?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    router.push('/explore');
  };

  // Simultaneous filter matching: deal.city === selectedCity && deal.category === selectedCategory
  const filtered = DEMO_DEALS.filter(d => {
    if (activeArea !== 'all' && d.city !== activeArea) return false;
    if (activePreference !== 'all' && d.category !== activePreference) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return d.title.toLowerCase().includes(q) || d.restaurant.toLowerCase().includes(q);
    }
    return true;
  });

  const getEmptyStateMessage = () => {
    if (activePreference === 'sweets') {
      return 'Be the first sweet shop to join — reduce mithai waste, reach new customers.';
    }
    if (activePreference === 'bakery') {
      return 'Have surplus cakes or pastries at closing time? Be our first bakery partner.';
    }
    if (activeArea !== 'all') {
      const areaLabel = AREAS.find(a => a.id === activeArea)?.label || activeArea;
      return `No deals in ${areaLabel} right now — try All Mumbai`;
    }
    return 'No deals matching these filters right now — try resetting filters';
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-background min-h-screen pb-20">

        {/* CSS transition for grid entry animation */}
        <style>{`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-slide {
            animation: fadeSlideIn 180ms ease-out forwards;
          }
        `}</style>

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
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
                placeholder="Search food, restaurants, or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Trending Previews — 4 videos + 4 images */}
        <div className="bg-background py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-black mb-6">Trending Deals Near You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {TRENDING.map((media, i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded-2xl overflow-hidden relative shadow-sm border border-border group hover:shadow-lg transition-all duration-300">
                  {media.type === 'video' ? (
                    <video autoPlay loop muted playsInline className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700">
                      <source src={media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image src={media.src} alt={media.title} fill loading="lazy" sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
            <FilterBar options={AREAS} activeId={activeArea} onSelect={handleSelectArea} />
            
            {/* Custom Category Filter */}
            <div className="flex gap-2 pb-2 max-w-full overflow-x-auto sm:flex-wrap sm:overflow-visible scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const isActive = activePreference === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectPreference(cat.id)}
                    style={{
                      backgroundColor: isActive ? cat.color : '#ffffff',
                      color: isActive ? '#ffffff' : '#6b7280',
                      borderColor: isActive ? cat.color : '#e5e5e5',
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all shrink-0 hover:-translate-y-0.5 shadow-sm`}
                  >
                    <Icon className="w-4 h-4" style={{ color: isActive ? '#ffffff' : cat.color }} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

          {/* Preview banner */}
          <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
            <span className="text-lg">🔔</span>
            Preview data — live restaurant listings coming soon
          </div>

          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold">{filtered.length} deals found</h2>
          </div>

          {filtered.length > 0 ? (
            <div
              key={`${activeArea}-${activePreference}-${searchQuery}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 animate-fade-slide"
            >
              {filtered.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group">
                  {/* Image */}
                  <div className="aspect-[4/3] relative w-full overflow-hidden shrink-0">
                    <Image src={item.img} alt={item.title} fill loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 right-3 z-20 bg-yellow-400 text-gray-900 text-xs font-black px-2.5 py-1 rounded-full shadow">
                      {item.discount}
                    </div>
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
                        <span>⭐ {item.rating} ({item.reviews})</span>
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
                      <button
                        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-md min-h-[44px]"
                        style={{ background: '#0F5132' }}
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto animate-fade-slide">
              <Search className="w-10 h-10 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-foreground">
                {getEmptyStateMessage()}
              </h3>
              <p className="text-muted text-sm mb-6">
                Try checking other locations or clear your category selection to see what is cooking!
              </p>
              <button
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 min-h-[44px]"
                style={{ background: '#0F5132' }}
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Auto-Scrolling Image Gallery — CSS marquee, 2 sets for seamless loop */}
        <div className="bg-background pt-10 pb-16 border-t border-border overflow-hidden">
          <div className="w-full overflow-hidden">
            <div className="marquee-track gap-5" style={{ gap: '20px' }}>
              {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((src, idx) => (
                <div
                  key={idx}
                  className="relative shrink-0 overflow-hidden rounded-3xl"
                  style={{ width: 'clamp(180px, 18vw, 260px)', aspectRatio: '4/3' }}
                >
                  <Image
                    src={src}
                    alt="Gallery"
                    fill
                    loading="lazy"
                    sizes="260px"
                    className="object-cover hover:scale-105 transition-transform duration-700"
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

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading Explore...</div>}>
      <ExplorePageContent />
    </Suspense>
  );
}
