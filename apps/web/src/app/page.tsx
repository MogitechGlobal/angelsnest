'use client';

import { useState } from 'react';
import { ShoppingBag, Search, Heart, Sparkles, ShieldCheck, Truck, Headphones, Tag, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  fit?: string;
  description?: string;
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

const FEATURED_PRODUCTS: Product[] = [
  { id: '1', name: '3pc Soft Jeans Shorts Set', fit: 'Fits 1-4yrs', price: 'KES 1,800.00', category: 'Boys', image: placeHolders.boys },
  { id: '2', name: '3pc Official Khaki Set', fit: 'Fits 1-4yrs', price: 'KES 2,000.00', category: 'Boys', image: placeHolders.boys },
  { id: '3', name: 'Cute Three Piece Set', fit: '3-9yrs', price: 'KES 2,400.00', category: 'Girls', image: placeHolders.girls },
  { id: '4', name: 'Skirt Set', fit: '6m-3yrs', price: 'KES 1,800.00', category: 'Girls', image: placeHolders.girls },
  { id: '5', name: 'Ankle Length Wide Leg Jeans Set', fit: '8-13yrs', price: 'KES 1,800.00', category: 'Girls', image: placeHolders.pants },
  { id: '6', name: 'Fits 6m-2yrs 3pc Denim Set', fit: '6m-2yrs', price: 'KES 1,700.00', category: 'Sets', badge: 'Sale', originalPrice: 'KES 2,100.00', image: placeHolders.sets },
  { id: '8', name: 'Cute White Dress with Denim Vest', fit: 'Fits 6m-5yrs', price: 'KES 1,900.00', category: 'Dresses', image: placeHolders.dresses },
  { id: '17', name: 'High Quality Cute Dress with Jacket', price: 'KES 3,800.00', category: 'Dresses', badge: 'Hot', image: placeHolders.dresses },
];

const CATEGORIES = ['All', 'Dresses', 'Sets', 'Boys', 'Girls', 'Pants', 'Tops'] as const;

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
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
        
        {/* Minimized, Sleek Compact Hero Banner (Giving Priority to Products) */}
        <div className="relative rounded-2xl text-white px-6 py-4 sm:py-5 overflow-hidden shadow-sm w-full flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: brand.blue }}>
          <div className="relative z-10 space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/30">
              <Sparkles className="h-3 w-3" /> Angeles Nest Collections &bull; Nairobi
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
              Stylish &amp; Quality Outfits for Little Ones (6m - 13yrs)
            </h1>
            <p className="text-white/90 text-xs font-medium">
              What you see is what you get. Fast countrywide delivery &amp; Nairobi pickup.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 shrink-0">
            <Link 
              href="/shop" 
              className="px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 bg-slate-900 text-white whitespace-nowrap"
            >
              Shop Catalog
            </Link>
            <a 
              href="https://wa.me/254742871599" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 text-white whitespace-nowrap bg-emerald-600 flex items-center gap-1.5"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
          
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-20 bg-white" />
        </div>

        {/* Mobile Search Bar */}
        <div className="flex md:hidden items-center bg-white rounded-xl px-4 py-2.5 shadow-sm border border-slate-200">
          <Search className="h-4 w-4 mr-2 text-slate-400" />
          <input
            type="text"
            placeholder="Search kids clothing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-xs text-slate-800"
          />
        </div>

        {/* Category Navigation & Catalog Section (First Priority) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Featured Collections</h2>
            </div>
            
            <Link 
              href="/shop" 
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors hover:opacity-75 self-start sm:self-auto"
              style={{ color: brand.pink }}
            >
              View All Products <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                  selectedCategory === cat
                    ? 'text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                style={selectedCategory === cat ? { backgroundColor: brand.pink } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md z-10" style={{ backgroundColor: product.badge === 'Sale' ? brand.pink : brand.blue }}>
                      {product.badge}
                    </span>
                  )}
                  
                  <button
                    aria-label="Add to wishlist"
                    className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full text-slate-400 hover:text-[#e41575] transition-colors shadow-sm z-10"
                  >
                    <Heart className="h-3.5 w-3.5" />
                  </button>

                  <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 px-3">
                    <Link href="/shop" className="w-full bg-white/95 backdrop-blur-sm text-slate-900 text-[11px] font-bold py-2 rounded-lg shadow-lg flex items-center justify-center gap-1.5 hover:bg-slate-50">
                      <ShoppingBag className="h-3 w-3" /> Quick View
                    </Link>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="uppercase tracking-wider font-bold" style={{ color: brand.blue }}>{product.category}</span>
                      {product.fit && (
                        <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium text-[9px]">{product.fit}</span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-[#62c6e6] transition-colors text-xs line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-end justify-between">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through mb-0.5">{product.originalPrice}</span>
                      )}
                      <span className={`text-xs sm:text-sm font-extrabold ${product.originalPrice ? 'text-[#e41575]' : 'text-slate-900'}`}>
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Value Props Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="p-2.5 rounded-xl shrink-0 text-white shadow-sm" style={{ backgroundColor: brand.blue }}>
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs">Premium &amp; Honest Quality</h3>
              <p className="text-[11px] text-slate-500">What you see is what you get</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="p-2.5 rounded-xl shrink-0 text-white shadow-sm" style={{ backgroundColor: brand.pink }}>
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs">Countrywide Delivery</h3>
              <p className="text-[11px] text-slate-500">Fast &amp; reliable doorstep shipping</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="p-2.5 rounded-xl shrink-0 text-white shadow-sm bg-slate-900">
              <Headphones className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs">Friendly Support</h3>
              <p className="text-[11px] text-slate-500">Always ready to help with sizing</p>
            </div>
          </div>
        </div>

        {/* Visit Physical Store Banner */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border" style={{ color: brand.blue, borderColor: `${brand.blue}40`, backgroundColor: `${brand.blue}10` }}>
              <MapPin className="h-3.5 w-3.5" /> Physical Location
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">Visit Our Nairobi Showroom</h2>
            <p className="text-slate-600 text-xs max-w-xl leading-relaxed">
              Biashara Street, Zanna Exhibition, First Floor, Shop M7. Come feel the fabric quality firsthand!
            </p>
          </div>
          
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl font-bold text-xs text-white shadow-md transition-all hover:opacity-95 whitespace-nowrap"
            style={{ backgroundColor: brand.pink }}
          >
            Get Directions &amp; Contact
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}