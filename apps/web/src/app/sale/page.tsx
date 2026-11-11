// apps/web/src/app/sale/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Tag, MessageCircle, Check, Search, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SaleProduct {
  id: string;
  name: string;
  fit?: string;
  price: string;
  originalPrice: string;
  category: string;
  discountPercentage: number;
  image: string;
}

const SALE_PRODUCTS: SaleProduct[] = [
  { id: '1s', name: '3pc Soft Jeans Shorts Set', fit: '1–4 yrs', price: 'KES 1,440.00', originalPrice: 'KES 1,800.00', discountPercentage: 20, category: 'Boys', image: '/products/3pc soft jeans short set.jpeg' },
  { id: '2s', name: 'Cute Three Piece Set', fit: '3–9 yrs', price: 'KES 1,920.00', originalPrice: 'KES 2,400.00', discountPercentage: 20, category: 'Girls', image: '/products/Cute three piece set.jpeg' },
  { id: '3s', name: 'Ankle Length Wide Leg Jeans', fit: '8–13 yrs', price: 'KES 1,260.00', originalPrice: 'KES 1,800.00', discountPercentage: 30, category: 'Girls', image: '/products/Ankle length wide Leg Pant and t-shirt.jpeg' },
  { id: '4s', name: 'Fits 6m-2yrs 3pc Denim Set', fit: '6m–2 yrs', price: 'KES 1,360.00', originalPrice: 'KES 1,700.00', discountPercentage: 20, category: 'Sets', image: '/products/Fits 6m-2yrs.jpeg' },
  { id: '5s', name: 'Cute White Dress with Denim Vest', fit: '6m–5 yrs', price: 'KES 1,330.00', originalPrice: 'KES 1,900.00', discountPercentage: 30, category: 'Dresses', image: '/products/Cute white dress comes with the kabag.jpeg' },
  { id: '6s', name: 'Quality Khaki Cargo Pants', fit: '3–10 yrs', price: 'KES 1,120.00', originalPrice: 'KES 1,400.00', discountPercentage: 20, category: 'Pants', image: '/products/Quality khaki pants.jpeg' },
];

export default function SalePage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wishlistItems, setWishlistItems] = useState<SaleProduct[]>([]);
  const [cartItems, setCartItems] = useState<SaleProduct[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>('https://angelesnest.co.ke');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }

    const savedWishlist = localStorage.getItem('angelsnest_wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error(e);
      }
    }

    const savedCart = localStorage.getItem('angelsnest_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const getWhatsAppUrl = (product: SaleProduct): string => {
    const imageUrl = `${baseUrl}${product.image}`;
    const fitText = product.fit ? ` (${product.fit})` : '';
    const message = `Hello Angeles Nest, I would like to order this sale item:\n\n• ${product.name}${fitText}\n• Sale Price: ${product.price} (Original: ${product.originalPrice})\n• Photo: ${imageUrl}\n\nPlease confirm availability and dispatch!`;
    return `https://wa.me/254742871599?text=${encodeURIComponent(message)}`;
  };

  const isWishlisted = (id: string) => wishlistItems.some((item) => item.id === id);

  const toggleWishlist = (product: SaleProduct) => {
    let updated: SaleProduct[];
    if (isWishlisted(product.id)) {
      updated = wishlistItems.filter((item) => item.id !== product.id);
    } else {
      updated = [...wishlistItems, product];
    }
    setWishlistItems(updated);
    localStorage.setItem('angelsnest_wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  const addToCart = (product: SaleProduct) => {
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem('angelsnest_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
    setNotification(`Added "${product.name}" to cart`);
    setTimeout(() => setNotification(null), 2500);
  };

  const filteredProducts = useMemo(() => {
    return SALE_PRODUCTS.filter((product) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        product.name.toLowerCase().includes(q) ||
        (product.fit && product.fit.toLowerCase().includes(q)) ||
        product.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFA] text-stone-900 antialiased selection:bg-stone-200">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-50 px-4 py-2.5 rounded-full text-xs font-medium shadow-2xl flex items-center gap-2 transition-all">
          <Check className="h-3.5 w-3.5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Compact Clean Header Strip */}
      <section className="border-b border-stone-200/80 bg-stone-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60 text-[10px] font-bold tracking-wide uppercase">
              <Tag className="h-3 w-3 text-rose-600" /> End of Season Offers
            </div>
            <h1 className="text-xl sm:text-2xl font-serif tracking-tight text-stone-900">
              Sale &amp; Special Prices
            </h1>
            <p className="text-xs text-stone-500">
              Limited-quantity seasonal discounts on curated kids sets and dresses
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/shop"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs whitespace-nowrap"
            >
              Full Catalog
            </Link>
            <a
              href="https://wa.me/254742871599?text=Hello%20Angeles%20Nest%2C%20I%20would%20like%20to%20inquire%20about%20sale%20items."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
            >
              <MessageCircle className="h-3 w-3 text-emerald-400" /> Order via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
        
        {/* Mobile Search Input */}
        <div className="sm:hidden relative">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search discounted pieces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-full pl-9 pr-4 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 shadow-2xs"
          />
        </div>

        {/* Counter & Navigation Link */}
        <div className="flex items-center justify-between pb-2 border-b border-stone-200/70 text-xs text-stone-500">
          <span>Showing <strong className="text-stone-900 font-semibold">{filteredProducts.length}</strong> discounted styles</span>
          <Link
            href="/new-arrivals"
            className="text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 font-medium transition-colors"
          >
            Check new arrivals <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/70 p-8 space-y-2">
            <p className="text-sm font-medium text-stone-800">No sale items match &quot;{searchQuery}&quot;</p>
            <p className="text-xs text-stone-500">Try checking with a different search term or view the full catalog.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs font-semibold underline text-stone-700 hover:text-stone-900 cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-10">
            {filteredProducts.map((product) => {
              const wishlisted = isWishlisted(product.id);
              return (
                <div key={product.id} className="group flex flex-col space-y-2.5">
                  
                  {/* Photo Container */}
                  <div className="relative aspect-[4/5] w-full rounded-xl bg-stone-100 overflow-hidden border border-stone-200/60 shadow-2xs">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Minimalist Discount Pill */}
                    <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-sm border border-rose-200/60 shadow-2xs">
                      -{product.discountPercentage}%
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      aria-label="Add to wishlist"
                      className="absolute top-2.5 right-2.5 bg-white/80 backdrop-blur-xs hover:bg-white p-1.5 rounded-full text-stone-400 hover:text-rose-600 transition-colors shadow-2xs"
                    >
                      <Heart className={`h-3.5 w-3.5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Hover Controls (Desktop) */}
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
                        className="bg-emerald-600/95 hover:bg-emerald-600 text-white p-2 rounded-lg shadow-sm transition-colors flex items-center justify-center"
                        title="Direct order via WhatsApp"
                      >
                        <MessageCircle className="h-3.5 w-3.5 fill-white" />
                      </a>
                    </div>
                  </div>

                  {/* Metadata Block */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="uppercase tracking-wider text-[10px] text-stone-400 font-semibold">{product.category}</span>
                      {product.fit && <span>{product.fit}</span>}
                    </div>

                    <h3 className="font-medium text-xs sm:text-sm text-stone-900 line-clamp-1 group-hover:text-stone-700 transition-colors">
                      {product.name}
                    </h3>

                    {/* Price and Original Price Display */}
                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="text-xs sm:text-sm font-semibold text-rose-700 tracking-tight">
                        {product.price}
                      </span>
                      <span className="text-[11px] text-stone-400 line-through">
                        {product.originalPrice}
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
                      className="col-span-2 bg-emerald-50 active:bg-emerald-100 text-emerald-800 text-[11px] font-medium py-1.5 px-2 rounded-lg border border-emerald-200 flex items-center justify-center gap-1"
                    >
                      <MessageCircle className="h-3 w-3 text-emerald-600" />
                      <span>Chat</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Navigation Link */}
        <div className="pt-8 border-t border-stone-200/70 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900"
          >
            Explore all regular collections <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}