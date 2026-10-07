'use client';

import { useState } from 'react';
import { ShoppingBag, Heart, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface NewArrivalProduct {
  id: string;
  name: string;
  fit?: string;
  price: string;
  category: string;
  image: string;
  badge: string;
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
  tops: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80',
};

const NEW_ARRIVALS: NewArrivalProduct[] = [
  { id: 'n1', name: 'Premium Velvet Party Dress', fit: '4-10yrs', price: 'KES 3,200.00', category: 'Dresses', badge: 'New', image: placeHolders.dresses },
  { id: 'n2', name: 'Urban Streetwear Boys Set', fit: '5-12yrs', price: 'KES 2,600.00', category: 'Boys', badge: 'New', image: placeHolders.boys },
  { id: 'n3', name: 'Floral Spring Collection Set', fit: '2-7yrs', price: 'KES 2,100.00', category: 'Sets', badge: 'Just Dropped', image: placeHolders.girls },
  { id: 'n4', name: 'Signature Cotton Graphic Tee', fit: '3-13yrs', price: 'KES 950.00', category: 'Tops', badge: 'New', image: placeHolders.tops },
  { id: 'n5', name: 'Luxury Knit Sweater Two-Piece', fit: '1-5yrs', price: 'KES 2,800.00', category: 'Sets', badge: 'Trending', image: placeHolders.sets },
  { id: 'n6', name: 'Designer Inspired Tulle Skirt Set', fit: '3-9yrs', price: 'KES 2,400.00', category: 'Girls', badge: 'New', image: placeHolders.girls },
];

export default function NewArrivalsPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = NEW_ARRIVALS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.fit && product.fit.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 w-full overflow-x-hidden">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-5 max-w-[1600px] mx-auto space-y-6">
        
        {/* Minimized, Sleek Compact Hero Banner */}
        <div className="relative rounded-2xl text-white px-6 py-4 sm:py-5 overflow-hidden shadow-sm w-full flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: brand.blue }}>
          <div className="relative z-10 space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/30">
              <Sparkles className="h-3 w-3" /> Fresh Drops &bull; Angeles Nest
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
              The Latest &amp; Greatest Kids Fashion
            </h1>
            <p className="text-white/90 text-xs font-medium">
              Discover fresh seasonal styles and trending sets just added to the store.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 shrink-0">
            <a 
              href="https://wa.me/254742871599" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 text-white whitespace-nowrap bg-emerald-600 flex items-center gap-1.5"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Order via WhatsApp
            </a>
          </div>
          
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-20 bg-white" />
        </div>

        {/* Results Info & Title */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 pt-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Newly Added Items</h2>
          <div className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
          </div>
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

                {/* Badge */}
                <span className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md z-10" style={{ backgroundColor: brand.blue }}>
                  {product.badge}
                </span>
                
                <button
                  aria-label="Add to wishlist"
                  className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full text-slate-400 hover:text-[#e41575] transition-colors shadow-sm z-10"
                >
                  <Heart className="h-3.5 w-3.5" />
                </button>

                <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 px-3">
                  <button className="w-full bg-white/95 backdrop-blur-sm text-slate-900 text-[11px] font-bold py-2 rounded-lg shadow-lg flex items-center justify-center gap-1.5 hover:bg-slate-50">
                    <ShoppingBag className="h-3 w-3" /> Quick View
                  </button>
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
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-slate-200">
              <Sparkles className="h-10 w-10 text-slate-300 mb-3" />
              <h3 className="text-base font-bold text-slate-900">No new arrivals match your search</h3>
              <p className="text-slate-500 text-xs mt-1">Try clearing your search terms to see all fresh drops.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}