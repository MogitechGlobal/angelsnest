'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Filter, SlidersHorizontal, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  fit?: string;
  price: string;
  originalPrice?: string;
  category: 'Dresses' | 'Sets' | 'Boys' | 'Girls' | 'Pants' | 'Tops';
  badge?: string;
  image: string;
}

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

const placeHolders = {
  boys: 'https://images.unsplash.com/photo-1611428813653-aa606c998586?auto=format&fit=crop&w=600&q=80',
  girls: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80',
  dresses: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80',
  sets: 'https://images.unsplash.com/photo-1519238384236-9ab865764d8a?auto=format&fit=crop&w=600&q=80',
  pants: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&q=80',
  tops: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80',
};

const PRODUCTS: Product[] = [
  { id: '1', name: '3pc Soft Jeans Shorts Set', fit: '1-4yrs', price: 'KES 1,800.00', category: 'Boys', image: placeHolders.boys },
  { id: '2', name: '3pc Official Khaki Set', fit: '1-4yrs', price: 'KES 2,000.00', category: 'Boys', image: placeHolders.boys },
  { id: '3', name: 'Cute Three Piece Set', fit: '3-9yrs', price: 'KES 2,400.00', category: 'Girls', image: placeHolders.girls },
  { id: '4', name: 'Floral Skirt Set', fit: '6m-3yrs', price: 'KES 1,800.00', category: 'Girls', image: placeHolders.girls },
  { id: '5', name: 'Ankle Length Wide Leg Jeans', fit: '8-13yrs', price: 'KES 1,800.00', category: 'Girls', image: placeHolders.pants },
  { id: '6', name: '3pc Denim Jacket Set', fit: '6m-2yrs', price: 'KES 1,700.00', category: 'Sets', badge: 'Sale', originalPrice: 'KES 2,100.00', image: placeHolders.sets },
  { id: '8', name: 'White Dress with Denim Vest', fit: '6m-5yrs', price: 'KES 1,900.00', category: 'Dresses', image: placeHolders.dresses },
  { id: '10', name: 'Faux Leather Jacket & Skirt Set', fit: '3-10yrs', price: 'KES 2,200.00', category: 'Sets', image: placeHolders.sets },
  { id: '13', name: 'Quality Khaki Cargo Pants', fit: '3-10yrs', price: 'KES 1,400.00', category: 'Pants', image: placeHolders.pants },
  { id: '17', name: 'High Quality Cute Dress with Jacket', price: 'KES 3,800.00', category: 'Dresses', badge: 'Hot', image: placeHolders.dresses },
  { id: '18', name: 'Graphic Print Cotton Tee', fit: '2-8yrs', price: 'KES 900.00', category: 'Tops', image: placeHolders.tops },
  { id: '19', name: 'Classic Blue Denim Jeans', fit: '5-13yrs', price: 'KES 1,600.00', category: 'Pants', image: placeHolders.pants },
];

const CATEGORIES = ['All', 'Dresses', 'Sets', 'Boys', 'Girls', 'Pants', 'Tops'] as const;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.fit && product.fit.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 w-full overflow-x-hidden">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-5 max-w-[1600px] mx-auto space-y-6">
        
        {/* Minimized, Professional Compact Hero Section */}
        <div className="relative rounded-2xl text-white px-6 py-4 sm:py-5 overflow-hidden shadow-sm w-full flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: brand.blue }}>
          <div className="relative z-10 space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/30">
              <Sparkles className="h-3 w-3" /> Shop All Collections &bull; Angeles Nest Collections
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
              Discover Premium Kids&apos; Clothing &amp; Sets
            </h1>
            <p className="text-white/90 text-xs font-medium max-w-xl">
              Browse our complete range of stylish, comfortable, and affordable outfits tailored for kids from 6 months up to 13 years.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 shrink-0">
            <Link 
              href="/about" 
              className="px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 text-white flex items-center gap-1.5 whitespace-nowrap"
              style={{ backgroundColor: brand.pink }}
            >
              About Us <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a 
              href="https://wa.me/254742871599" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 text-slate-900 bg-white flex items-center gap-1.5 whitespace-nowrap"
            >
              <MessageCircle className="h-3.5 w-3.5" style={{ color: brand.pink }} /> WhatsApp Us
            </a>
          </div>
          
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-20 bg-white" />
        </div>

        {/* Toolbar: Categories & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none w-full mask-edges">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'text-white shadow-md'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                style={selectedCategory === cat ? { backgroundColor: brand.blue } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-600 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-4">
            <button className="flex items-center gap-2 hover:text-slate-900 transition-colors">
              <SlidersHorizontal className="h-4 w-4" /> Sort By
            </button>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <span><strong>{filteredProducts.length}</strong> items</span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {product.badge && (
                  <span className="absolute top-3 left-3 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md z-10" style={{ backgroundColor: product.badge === 'Sale' ? brand.pink : brand.blue }}>
                    {product.badge}
                  </span>
                )}
                
                <button
                  aria-label="Add to wishlist"
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full text-slate-400 hover:text-[#e41575] transition-colors shadow-sm z-10"
                >
                  <Heart className="h-4 w-4" />
                </button>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 px-4">
                  <button className="w-full bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold py-2.5 rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-slate-50">
                    <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
                  </button>
                </div>
              </div>

              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 mb-1.5">
                    <span className="uppercase tracking-wider font-bold" style={{ color: brand.blue }}>{product.category}</span>
                    {product.fit && (
                      <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{product.fit}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-[#62c6e6] transition-colors text-xs sm:text-sm line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                </div>

                <div className="pt-3 mt-2 flex items-end justify-between">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-[10px] sm:text-xs text-slate-400 line-through mb-0.5">{product.originalPrice}</span>
                    )}
                    <span className={`text-sm sm:text-base font-extrabold ${product.originalPrice ? 'text-[#e41575]' : 'text-slate-900'}`}>
                      {product.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-slate-200">
              <Filter className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No products found</h3>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your category or search term.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 px-6 py-2 rounded-full text-sm font-semibold text-white transition-all shadow-sm"
                style={{ backgroundColor: brand.blue }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}