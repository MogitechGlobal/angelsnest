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

    // Listen to changes in other tabs
    window.addEventListener('storage', updateCounts);

    // Listen to custom dispatch events from current tab
    window.addEventListener('cart-updated', updateCounts);
    window.addEventListener('wishlist-updated', updateCounts);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cart-updated', updateCounts);
      window.removeEventListener('wishlist-updated', updateCounts);
    };
  }, []);

  return (
    <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between gap-4">
        
        {/* Mobile Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-600 hover:text-[#e41575] transition-colors p-1" 
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <Link href="/" className="flex items-center gap-2 font-bold text-xl sm:text-2xl tracking-tight" style={{ color: brand.blue }}>
            <img 
              src="/android-chrome-192x192.png" 
              alt="Angeles Nest Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain" 
            />
            <span className="hidden sm:inline-block">Angeles Nest</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/shop" className="hover:text-[#62c6e6] transition-colors">Shop All</Link>
          <Link href="/new-arrivals" className="hover:text-[#62c6e6] transition-colors">New Arrivals</Link>
          <Link href="/sale" className="text-[#e41575] hover:text-[#c91266] transition-colors font-semibold">Sale</Link>
          <Link href="/about" className="hover:text-[#62c6e6] transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-[#62c6e6] transition-colors">Contact</Link>
        </nav>

        {/* Desktop Search bar */}
        <div className="flex-1 max-w-sm hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 text-sm text-slate-600 border border-slate-200 focus-within:border-[#62c6e6] focus-within:bg-white transition-all ml-4">
          <Search className="h-4 w-4 mr-2 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search kids clothing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-sm text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* E-commerce Action Icons */}
        <div className="flex items-center gap-5 sm:gap-6 text-slate-600">
          <Link href="/account" aria-label="Account" className="hover:text-[#62c6e6] transition-colors hidden sm:block">
            <User className="h-5 w-5" />
          </Link>
          
          <Link href="/wishlist" aria-label="Wishlist" className="hover:text-[#e41575] transition-colors relative flex items-center group hidden sm:flex">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span 
                className="absolute -top-1.5 -right-2 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"
                style={{ backgroundColor: brand.pink }}
              >
                {wishlistCount}
              </span>
            )}
          </Link>
          
          <Link href="/cart" aria-label="Cart" className="hover:text-[#62c6e6] transition-colors relative flex items-center group">
            <ShoppingBag className="h-5 w-5" />
            <span 
              className="absolute -top-1.5 -right-2 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"
              style={{ backgroundColor: brand.pink }}
            >
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl px-6 py-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Search inside Menu */}
          <div className="flex md:hidden items-center bg-slate-100 rounded-xl px-3 py-2 text-sm border border-slate-200 mb-2">
            <Search className="h-4 w-4 mr-2 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search kids clothing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm text-slate-800"
            />
          </div>

          <Link 
            href="/shop" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-700 hover:text-[#62c6e6] py-2 border-b border-slate-100 transition-colors"
          >
            Shop All
          </Link>
          <Link 
            href="/new-arrivals" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-700 hover:text-[#62c6e6] py-2 border-b border-slate-100 transition-colors"
          >
            New Arrivals
          </Link>
          <Link 
            href="/sale" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold py-2 border-b border-slate-100 transition-colors"
            style={{ color: brand.pink }}
          >
            Sale Collection
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-700 hover:text-[#62c6e6] py-2 border-b border-slate-100 transition-colors"
          >
            About Us
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-700 hover:text-[#62c6e6] py-2 border-b border-slate-100 transition-colors"
          >
            Contact &amp; Location
          </Link>

          <div className="pt-2 flex items-center justify-between text-slate-600">
            <Link 
              href="/account" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium hover:text-[#62c6e6]"
            >
              <User className="h-4 w-4" /> My Account
            </Link>
            <Link 
              href="/wishlist" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium hover:text-[#e41575]"
            >
              <Heart className="h-4 w-4" /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}