'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Store, TrendingUp, IndianRupee, ShoppingBag, Leaf, LogOut, Plus, Edit2, Clock } from 'lucide-react';
import { getFoodWithRestaurantInfo } from '@/lib/data';

export default function RestaurantDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Use mock data
  const myFood = getFoodWithRestaurantInfo().slice(0, 3); // Mocking items belonging to this restaurant

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-foreground text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-800">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white block mb-2">
            50% Food<span className="text-brand-green">.</span>
          </Link>
          <div className="flex items-center space-x-3 mt-6">
            <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-gray-800">
              <Store className="w-5 h-5 text-brand-green" />
            </div>
            <div>
              <p className="font-bold text-sm">The Daily Kitchen</p>
              <p className="text-xs text-brand-green">Partner</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'food', label: 'Food Listings', icon: ShoppingBag },
            { id: 'orders', label: 'Orders', icon: IndianRupee },
            { id: 'analytics', label: 'Impact Analytics', icon: Leaf },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id ? 'bg-[#1a1a1a] text-white border border-gray-800' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <Link href="/">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Log Out</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
            <Button className="flex items-center shadow-md">
              <Plus className="w-4 h-4 mr-2" /> Add New Food
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-muted mb-2">Today's Orders</p>
              <h3 className="text-3xl font-bold text-foreground mb-1">0</h3>
              <p className="text-xs text-muted font-medium">Waiting for first order</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-muted mb-2">Today's Revenue</p>
              <h3 className="text-3xl font-bold text-foreground mb-1">₹0</h3>
              <p className="text-xs text-muted font-medium">Add a listing to start</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-muted mb-2">Food Portions Sold</p>
              <h3 className="text-3xl font-bold text-foreground mb-1">0</h3>
              <p className="text-xs text-muted font-medium">0 remaining</p>
            </div>
            <div className="bg-brand-green/10 p-6 rounded-3xl border border-brand-green/20">
              <p className="text-sm font-medium text-brand-green mb-2">Food Saved (Monthly)</p>
              <h3 className="text-3xl font-bold text-brand-green mb-1">0 kg</h3>
              <p className="text-xs text-brand-green font-medium text-opacity-80">≈ 0 meals rescued</p>
            </div>
          </div>

          {/* Active Listings */}
          <h2 className="text-xl font-bold mb-6">Active Food Listings</h2>
          {myFood.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">No active listings</h3>
              <p className="text-muted max-w-sm mx-auto mb-6">You haven't listed any surplus food yet today. Add a new listing to start recovering revenue.</p>
              <Button className="flex items-center mx-auto shadow-sm">
                <Plus className="w-4 h-4 mr-2" /> Add New Food
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {myFood.map((food) => (
                <div key={food.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center">
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-foreground">{food.name}</h3>
                      <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">{food.quantity} left</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted mb-4">
                      <span>Original: ₹{food.originalPrice}</span>
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {food.pickupStart} – {food.pickupEnd}</span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Discount Schedule</p>
                      <div className="flex flex-wrap gap-4">
                        {food.discountSchedule.map((stage, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <span className="text-xs font-medium text-foreground mb-1">{stage.time}</span>
                            <span className="text-xs font-bold bg-white border border-gray-200 px-2 py-1 rounded text-brand-green">{stage.discount}% OFF</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex items-center justify-center">
                      <Edit2 className="w-4 h-4 mr-2" /> Edit Listing
                    </Button>
                    <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 flex items-center justify-center">
                      Stop Listing
                    </Button>
                  </div>
                  
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
