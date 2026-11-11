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
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  const addToCart = (product: Product) => {
    const savedCart = localStorage.getItem('angelsnest_cart');
    let currentCart: Product[] = [];
    if (savedCart) {
      try {
        currentCart = JSON.parse(savedCart);
      } catch (e) {
        console.error(e);
      }
    }
    const updated = [...currentCart, product];
    localStorage.setItem('angelsnest_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFA] text-stone-900 antialiased selection:bg-stone-200">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Compact Clean Header Strip */}
      <section className="border-b border-stone-200/80 bg-stone-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-stone-200/80 text-[10px] font-bold tracking-wide uppercase">
              <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> Saved Favourites
            </div>
            <h1 className="text-xl sm:text-2xl font-serif tracking-tight text-stone-900">
              Your Personal Wishlist ({wishlistItems.length})
            </h1>
            <p className="text-xs text-stone-500">
              Keep track of outfits you love and order directly through WhatsApp or cart checkout
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/shop"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors shadow-2xs whitespace-nowrap"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-10">
            {wishlistItems.map((product) => (
              <div key={product.id} className="group flex flex-col space-y-2.5">
                
                {/* Photo Container */}
                <div className="relative aspect-[4/5] w-full rounded-xl bg-stone-100 overflow-hidden border border-stone-200/60 shadow-2xs">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Optional Badge */}
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-sm border border-stone-200/60 shadow-2xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove item from wishlist"
                    className="absolute top-2.5 right-2.5 bg-white/80 backdrop-blur-xs hover:bg-white p-1.5 rounded-full text-stone-400 hover:text-rose-600 transition-colors shadow-2xs cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Desktop Hover Controls */}
                  <div className="absolute inset-x-2 bottom-2 hidden sm:flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-white/95 backdrop-blur-xs hover:bg-white text-stone-800 text-[11px] font-semibold py-2 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 border border-stone-200/70 cursor-pointer"
                    >
                      <ShoppingBag className="h-3 w-3" />
                      <span>Add to Cart</span>
                    </button>

                    <a
                      href={getWhatsAppUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600/95 hover:bg-emerald-600 text-white p-2 rounded-lg shadow-sm transition-colors flex items-center justify-center cursor-pointer"
                      title="Direct order via WhatsApp"
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-white" />
                    </a>
                  </div>
                </div>

                {/* Metadata Block */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="uppercase tracking-wider text-[10px] text-stone-400 font-semibold">
                      {product.category}
                    </span>
                    {product.fit && <span>{product.fit}</span>}
                  </div>

                  <h3 className="font-medium text-xs sm:text-sm text-stone-900 line-clamp-1 group-hover:text-stone-700 transition-colors">
                    {product.name}
                  </h3>

                  <div className="pt-0.5">
                    <span className="text-xs sm:text-sm font-semibold text-stone-900 tracking-tight">
                      {product.price}
                    </span>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="sm:hidden grid grid-cols-5 gap-1.5 pt-1">
                  <button
                    onClick={() => addToCart(product)}
                    className="col-span-3 bg-stone-100 active:bg-stone-200 text-stone-800 text-[11px] font-medium py-1.5 px-2 rounded-lg border border-stone-200 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="h-3 w-3 text-stone-600" />
                    <span>Add</span>
                  </button>
                  <a
                    href={getWhatsAppUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 bg-emerald-50 active:bg-emerald-100 text-emerald-800 text-[11px] font-medium py-1.5 px-2 rounded-lg border border-emerald-200 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <MessageCircle className="h-3 w-3 text-emerald-600" />
                    <span>Order</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-stone-200/80 p-8 space-y-4 max-w-lg mx-auto shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Heart className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-serif font-semibold text-stone-900">Your wishlist is currently empty</h3>
              <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
                Save outfits you love by tapping the heart icon while exploring our catalog.
              </p>
            </div>
            <Link
              href="/shop"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors shadow-2xs"
            >
              Explore Shop <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Footer Navigation Link */}
        {wishlistItems.length > 0 && (
          <div className="pt-8 border-t border-stone-200/70 text-center">
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors"
            >
              Proceed to cart &amp; checkout <ArrowRight className="w-3.5 h-3.5" style={{ color: brand.pink }} />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}