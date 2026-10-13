// apps/web/src/app/wishlist/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  fit?: string;
  description?: string;
  price: string;
  originalPrice?: string;
  category: string;
  badge?: string;
  image: string;
}

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

function getWhatsAppUrl(product: Product): string {
  const fitText = product.fit ? ` (${product.fit})` : '';
  const message = `Hello Angeles Nest, I would like to order from my wishlist: ${product.name}${fitText} for ${product.price}`;
  return `https://wa.me/254742871599?text=${encodeURIComponent(message)}`;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Load wishlist from localStorage
    const saved = localStorage.getItem('angelsnest_wishlist');
    if (saved) {
      try {
        setWishlistItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const removeFromWishlist = (id: string) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem('angelsnest_wishlist', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 w-full overflow-x-hidden">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-5 max-w-[1600px] mx-auto space-y-6">
        
        {/* Minimized, Sleek Compact Hero Banner */}
        <div className="relative rounded-2xl text-white px-6 py-4 sm:py-5 overflow-hidden shadow-sm w-full flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: brand.pink }}>
          <div className="relative z-10 space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/30">
              <Heart className="h-3 w-3 fill-white" /> Saved Favorites &bull; Angeles Nest
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
              Your Personal Wishlist ({wishlistItems.length} items)
            </h1>
            <p className="text-white/90 text-xs font-medium">
              Keep track of your favorite kids&apos; outfits and check out instantly via WhatsApp.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 shrink-0">
            <Link 
              href="/shop" 
              className="px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 bg-slate-900 text-white whitespace-nowrap flex items-center gap-1.5"
            >
              Continue Shopping <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-20 bg-white" />
        </div>

        {/* Wishlist Grid or Empty State */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {wishlistItems.map((product) => (
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

                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md z-10" style={{ backgroundColor: brand.blue }}>
                      {product.badge}
                    </span>
                  )}
                  
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full text-rose-500 hover:bg-rose-50 transition-colors shadow-sm z-10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="uppercase tracking-wider font-bold" style={{ color: brand.blue }}>{product.category}</span>
                      {product.fit && (
                        <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium text-[9px]">{product.fit}</span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {product.price}
                      </span>
                    </div>

                    <a 
                      href={getWhatsAppUrl(product)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[11px] font-bold py-2 px-2 rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-white shrink-0" />
                      <span>Order via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-2xl mx-auto p-8 space-y-4">
            <div className="p-4 rounded-full bg-rose-50 text-[#e41575]">
              <Heart className="h-10 w-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">Your Wishlist is Empty</h3>
              <p className="text-slate-500 text-xs max-w-md">
                Explore our collection and click the heart icon on any outfit to save your favorite items here for quick access.
              </p>
            </div>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-xl font-bold text-xs text-white shadow-md transition-all hover:opacity-95 flex items-center gap-2"
              style={{ backgroundColor: brand.pink }}
            >
              Explore Catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}