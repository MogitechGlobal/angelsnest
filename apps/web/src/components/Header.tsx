// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  const updateCounts = () => {
    // Load Cart Count
    const savedCart = localStorage.getItem('angelsnest_cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        const totalCartQty = cartItems.reduce(
          (sum: number, item: any) => sum + (item.quantity || 1),
          0
        );
        setCartCount(totalCartQty);
      } catch (e) {
        console.error('Error reading cart count', e);
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }

    // Load Wishlist Count
    const savedWishlist = localStorage.getItem('angelsnest_wishlist');
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        setWishlistCount(wishlistItems.length);
      } catch (e) {
        console.error('Error reading wishlist count', e);
        setWishlistCount(0);
      }
    } else {
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener('storage', updateCounts);
    window.addEventListener('cart-updated', updateCounts);
    window.addEventListener('wishlist-updated', updateCounts);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cart-updated', updateCounts);
      window.removeEventListener('wishlist-updated', updateCounts);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/70 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 -ml-1.5 text-stone-600 hover:text-stone-900 transition-colors" 
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <Link href="/" className="flex items-center gap-2 tracking-tight group">
            <img 
              src="/android-chrome-192x192.png" 
              alt="Angeles Nest" 
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain" 
            />
            <span className="font-serif font-bold text-base sm:text-lg text-stone-900 tracking-tight">
              Angeles Nest <span style={{ color: brand.pink }}>Collections</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600">
          <Link 
            href="/shop" 
            className="hover:text-stone-900 transition-colors py-1"
          >
            Shop
          </Link>
          <Link 
            href="/new-arrivals" 
            className="hover:text-stone-900 transition-colors py-1"
          >
            New Arrivals
          </Link>
          <Link 
            href="/sale" 
            className="transition-colors py-1 font-bold" 
            style={{ color: brand.pink }}
          >
            Sale
          </Link>
          <Link 
            href="/about" 
            className="hover:text-stone-900 transition-colors py-1"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="hover:text-stone-900 transition-colors py-1"
          >
            Contact
          </Link>
        </nav>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Subtle Desktop Search Pill */}
          <div className="hidden lg:flex items-center bg-stone-100/80 hover:bg-stone-100 rounded-full px-3 py-1.5 text-xs text-stone-700 border border-stone-200/60 focus-within:border-stone-400 focus-within:bg-white transition-all w-48 xl:w-56">
            <Search className="h-3.5 w-3.5 mr-2 text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-xs text-stone-800 placeholder-stone-400"
            />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-stone-700">
            {/* Account Icon */}
            <Link 
              href="/account" 
              aria-label="Account" 
              className="hidden sm:flex p-1.5 rounded-full hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <User className="h-4 w-4" />
            </Link>
            
            {/* Wishlist Icon */}
            <Link 
              href="/wishlist" 
              aria-label="Wishlist" 
              className="relative p-1.5 rounded-full hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors flex items-center"
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span 
                  className="absolute 0 top-0.5 right-0.5 text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: brand.pink }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Cart Icon */}
            <Link 
              href="/cart" 
              aria-label="Cart" 
              className="relative p-1.5 rounded-full hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors flex items-center"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span 
                  className="absolute top-0.5 right-0.5 text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: brand.blue }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

      </div>

      {/* Mobile Accordion Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200/80 bg-white/98 backdrop-blur-md px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-150 shadow-sm">
          
          {/* Mobile Search */}
          <div className="flex items-center bg-stone-100 rounded-lg px-3 py-2 text-xs border border-stone-200/80">
            <Search className="h-3.5 w-3.5 mr-2 text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="Search kids clothing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-xs text-stone-800 placeholder-stone-400"
            />
          </div>

          {/* Links */}
          <nav className="flex flex-col space-y-1 text-xs font-semibold text-stone-700 pt-1">
            <Link 
              href="/shop" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Shop All
            </Link>
            <Link 
              href="/new-arrivals" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 rounded-lg hover:bg-stone-50 transition-colors"
            >
              New Arrivals
            </Link>
            <Link 
              href="/sale" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 rounded-lg hover:bg-stone-50 font-bold transition-colors flex items-center justify-between"
              style={{ color: brand.pink }}
            >
              <span>Sale Collection</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-rose-50 border border-rose-200">Offers</span>
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 rounded-lg hover:bg-stone-50 transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Contact &amp; Hours
            </Link>
          </nav>

          {/* User Account / Wishlist Footer */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
            <Link 
              href="/account" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 py-1 text-stone-700 hover:text-stone-900"
            >
              <User className="h-3.5 w-3.5" /> My Account
            </Link>
            <Link 
              href="/wishlist" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 py-1 text-stone-700 hover:text-stone-900"
            >
              <Heart className="h-3.5 w-3.5" /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}