'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, Search, Filter, Heart, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  fit?: string;
  description?: string;
  price: string;
  originalPrice?: string;
  category: 'Dresses' | 'Sets' | 'Boys' | 'Girls' | 'Pants' | 'Tops';
  badge?: string;
  bgGradient: string;
}

const PRODUCTS: Product[] = [
  // Image 1
  { id: '1', name: '3pc Soft Jeans Shorts Set', fit: 'Fits 1-4yrs', price: 'KES 1,800.00', category: 'Boys', bgGradient: 'from-blue-100 to-indigo-200' },
  { id: '2', name: '3pc Official Khaki Set', description: 'Vest, shirt and khaki pants', fit: 'Fits 1-4yrs', price: 'KES 2,000.00', category: 'Boys', bgGradient: 'from-amber-100 to-yellow-200' },
  { id: '3', name: 'Cute Three Piece Set', fit: '3-9yrs', price: 'KES 2,400.00', category: 'Girls', bgGradient: 'from-pink-100 to-rose-200' },
  { id: '4', name: 'Skirt Set', fit: '6m-3yrs', price: 'KES 1,800.00', category: 'Girls', bgGradient: 'from-purple-100 to-pink-200' },

  // Image 2
  { id: '5', name: 'Ankle Length Wide Leg Jeans Set', fit: '8-13yrs', price: 'KES 1,800.00', category: 'Girls', bgGradient: 'from-sky-100 to-blue-200' },
  { id: '6', name: 'Fits 6m-2yrs 3pc Denim Set', fit: '6m-2yrs', price: 'KES 1,700.00', category: 'Girls', bgGradient: 'from-teal-100 to-cyan-200' },
  { id: '7', name: 'Cute Skirt & Top Peplum Set', fit: '3-7yrs', price: 'KES 2,300.00', category: 'Girls', bgGradient: 'from-rose-100 to-fuchsia-200' },
  { id: '8', name: 'Cute White Dress with Denim Vest', fit: 'Fits 6m-5yrs', price: 'KES 1,900.00', category: 'Dresses', bgGradient: 'from-blue-50 to-indigo-100' },
  { id: '9', name: '3 Piece Set Boys Sweatshirt & Pants', description: 'Very demure', price: 'KES 1,800.00', category: 'Boys', bgGradient: 'from-stone-200 to-zinc-300' },

  // Image 3
  { id: '10', name: 'Faux Leather Jacket & Skirt Set', description: 'Available in black & pink', fit: '3-10yrs', price: 'KES 2,200.00', category: 'Sets', bgGradient: 'from-pink-100 to-red-200' },
  { id: '11', name: 'Beautiful Three Piece Set', description: 'Available in yellow & white', fit: '6m-4yrs', price: 'KES 2,000.00', category: 'Sets', bgGradient: 'from-amber-100 to-orange-100' },
  { id: '12', name: 'Quality Cute Dress', fit: '3-8yrs', price: 'KES 1,800.00', category: 'Dresses', bgGradient: 'from-slate-100 to-blue-100' },
  { id: '13', name: 'Quality Khaki Cargo Pants', fit: 'Fits 3-10yrs', price: 'KES 1,400.00', category: 'Pants', bgGradient: 'from-emerald-100 to-green-200' },
  { id: '14', name: 'Girls Warm Sweater', fit: '3-10yrs', price: 'KES 1,800.00', category: 'Girls', bgGradient: 'from-rose-100 to-pink-100' },

  // Image 4
  { id: '15', name: 'Clothing Art 2pc Streetwear Set', description: "Don't miss this, very nice", price: 'KES 1,900.00', category: 'Sets', bgGradient: 'from-slate-200 to-zinc-400' },
  { id: '16', name: '3 Piece Skirt Set', fit: '3-8yrs', price: 'KES 2,400.00', category: 'Girls', bgGradient: 'from-stone-100 to-amber-100' },
  { id: '17', name: 'High Quality Cute Dress with Jacket', description: 'Selling out so fast', price: 'KES 3,800.00', category: 'Dresses', badge: 'Hot', bgGradient: 'from-blue-200 to-indigo-300' },
  { id: '18', name: 'Soft Denim Dress with Bows', price: 'KES 2,000.00', category: 'Dresses', bgGradient: 'from-sky-100 to-indigo-200' },
  { id: '19', name: 'Cute Denim 2pc Set', fit: '3-8yrs', price: 'KES 2,000.00', category: 'Sets', bgGradient: 'from-blue-100 to-cyan-200' },

  // Image 5
  { id: '20', name: 'Brooklyn Two Piece Set', fit: '8-12yrs', price: 'KES 2,200.00', category: 'Girls', bgGradient: 'from-violet-100 to-purple-200' },
  { id: '21', name: '2pc Wide Leg Cargo Pant Set', price: 'KES 1,900.00', category: 'Sets', bgGradient: 'from-slate-200 to-slate-400' },
  { id: '22', name: 'Girls Graphic T-Shirt', price: 'KES 800.00', category: 'Tops', badge: 'Bestseller', bgGradient: 'from-yellow-100 to-amber-200' },
  { id: '23', name: 'Beautiful Red Pinafore Dress', fit: '6m-3yrs', price: 'KES 2,000.00', category: 'Dresses', bgGradient: 'from-red-100 to-rose-200' },
  { id: '24', name: 'Cute Sweatshirt and Jeans Set', price: 'KES 2,500.00', category: 'Sets', bgGradient: 'from-blue-100 to-sky-200' },

  // Image 6
  { id: '25', name: 'Fancy Dress', fit: '3-8yrs', price: 'KES 1,800.00', category: 'Dresses', bgGradient: 'from-orange-100 to-amber-100' },
  { id: '26', name: 'Cute White Dress + Denim Vest', price: 'KES 1,900.00', category: 'Dresses', bgGradient: 'from-slate-100 to-blue-200' },
  { id: '27', name: '2pc Short and Top Set', description: 'Best for outdoor, Fun day out', price: 'KES 1,800.00', originalPrice: 'KES 2,000.00', category: 'Sets', badge: 'Sale', bgGradient: 'from-sky-100 to-teal-200' },
  { id: '28', name: 'Layered Skirt & Top Set', description: 'Available in 4 top styles', fit: 'Fits 3-10yrs', price: 'KES 2,200.00', category: 'Sets', bgGradient: 'from-amber-100 to-orange-200' },
  { id: '29', name: 'Denim Dress with Belt', description: 'Very demure 👌', price: 'KES 2,000.00', category: 'Dresses', bgGradient: 'from-blue-100 to-indigo-200' },

  // Image 7
  { id: '30', name: '2pc Fleece Sweatshirt Set', description: 'Good quality two piece', price: 'KES 2,200.00', category: 'Sets', bgGradient: 'from-stone-200 to-stone-400' },
  { id: '31', name: 'High Quality Double-Breasted Dress', description: 'Available in white and pink', price: 'KES 1,900.00', category: 'Dresses', bgGradient: 'from-rose-50 to-pink-100' },
  { id: '32', name: 'Unisex Wide Leg Pants', description: 'Unisex wide leg pants with side stripes', price: 'KES 1,300.00', category: 'Pants', bgGradient: 'from-zinc-200 to-slate-400' },
  { id: '33', name: 'Elegant Quality Bow Dress', description: 'Available in pink, black, brown', price: 'KES 1,800.00', category: 'Dresses', bgGradient: 'from-pink-100 to-rose-200' },
  { id: '34', name: 'Cute Girls Bow Accent Dress', description: 'Very good quality', price: 'KES 1,800.00', category: 'Dresses', bgGradient: 'from-amber-100 to-orange-200' },
];

const CATEGORIES = ['All', 'Dresses', 'Sets', 'Boys', 'Girls', 'Pants', 'Tops'] as const;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.fit && product.fit.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span>Angelsnest</span>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-2 text-sm text-slate-600 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white transition-all">
            <Search className="h-4 w-4 mr-2 text-slate-400" />
            <input
              type="text"
              placeholder="Search kids clothing, age fits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-xs text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              Admin Portal
            </Link>
            <Link
              href="/dashboard"
              className="text-xs sm:text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Banner Section */}
        <div className="relative rounded-3xl bg-slate-900 text-white p-8 md:p-12 mb-10 overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 text-xs font-semibold mb-4 border border-blue-500/30">
              Angelsnest Kids &amp; Teens Collection
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Stylish &amp; Quality Outfits for Every Age
            </h1>
            <p className="text-slate-300 text-sm md:text-base mb-6">
              Explore 30+ curated sets, dresses, pants, and streetwear for boys and girls aged 6 months to 13 years.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 self-end md:self-auto">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>Showing {filteredProducts.length} of {PRODUCTS.length} items</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Product Visual Box */}
              <div className={`relative h-56 w-full bg-gradient-to-tr ${product.bgGradient} flex flex-col items-center justify-center p-6 overflow-hidden`}>
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}
                {product.fit && (
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
                    {product.fit}
                  </span>
                )}
                <button
                  aria-label="Add to wishlist"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white backdrop-blur-md p-2 rounded-full text-slate-600 hover:text-red-500 transition-colors shadow-sm"
                >
                  <Heart className="h-4 w-4" />
                </button>
                
                <div className="group-hover:scale-110 transition-transform duration-300 text-slate-600/50">
                  <ShoppingBag className="h-16 w-16" />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="uppercase tracking-wider font-semibold text-blue-600">{product.category}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm line-clamp-1">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{product.description}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3">
                  <div>
                    <span className="text-base font-extrabold text-slate-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-2">{product.originalPrice}</span>
                    )}
                  </div>
                  <button className="inline-flex items-center gap-1 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                    <span>Order</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-slate-900 text-slate-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2026 Angelsnest Collections. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}