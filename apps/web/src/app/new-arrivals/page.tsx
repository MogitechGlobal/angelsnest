// apps/web/src/app/new-arrivals/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Sparkles, ArrowRight, MessageCircle, Share2, Check } from 'lucide-react';
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

const NEW_ARRIVALS: NewArrivalProduct[] = [
  { id: 'n1', name: 'High Quality Cute Dress with Denim Jacket', fit: '4-8yrs', price: 'KES 3,800.00', category: 'Dresses', badge: 'Hot Seller', image: '/products/High quality cute dress with denim.jpeg' },
  { id: 'n2', name: 'Brooklyn Two Piece Cargo Pants Set', fit: '8-12yrs', price: 'KES 2,200.00', category: 'Girls', badge: 'New Arrival', image: '/products/Brooklyn two piece cargo pants.jpeg' },
  { id: 'n3', name: 'Cute Three Piece Set', fit: '3-9yrs', price: 'KES 2,400.00', category: 'Girls', badge: 'New', image: '/products/Cute three piece set.jpeg' },
  { id: 'n4', name: 'Clothing Art Urban 2pc Set', fit: '3-12yrs', price: 'KES 2,200.00', category: 'Boys', badge: 'Trending', image: '/products/Clothing art 2pc set.jpeg' },
  { id: 'n5', name: 'Beautiful Three Piece Set', fit: '6m-4yrs', price: 'KES 2,000.00', category: 'Sets', badge: 'New', image: '/products/Beautiful three piece.jpeg' },
  { id: 'n6', name: 'Girls Fluffy Dragonfly Warm Sweater', fit: '3-8yrs', price: 'KES 1,800.00', category: 'Tops', badge: 'Cozy', image: '/products/Girls warm sweater.jpeg' },
];

function getWhatsAppUrl(product: NewArrivalProduct): string {
  const fitText = product.fit ? ` (${product.fit})` : '';
  const message = `Hello Angeles Nest, I would like to order new arrival: ${product.name}${fitText} for ${product.price}`;
  return `https://wa.me/254742871599?text=${encodeURIComponent(message)}`;
}

export default function NewArrivalsPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wishlistItems, setWishlistItems] = useState<NewArrivalProduct[]>([]);
  const [cartItems, setCartItems] = useState<NewArrivalProduct[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
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

  const isWishlisted = (id: string) => wishlistItems.some((item) => item.id === id);

  const toggleWishlist = (product: NewArrivalProduct) => {
    let updated: NewArrivalProduct[];
    if (isWishlisted(product.id)) {
      updated = wishlistItems.filter((item) => item.id !== product.id);
    } else {
      updated = [...wishlistItems, product];
    }
    setWishlistItems(updated);
    localStorage.setItem('angelsnest_wishlist', JSON.stringify(updated));
  };

  const addToCart = (product: NewArrivalProduct) => {
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem('angelsnest_cart', JSON.stringify(updated));
    setNotification(`Added "${product.name}" to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleShare = async (product: NewArrivalProduct) => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} (${product.price}) at Angeles Nest Collections!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share dismissed or failed', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
      setCopiedId(product.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

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

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

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
              href="https://wa.me/254742871599?text=Hello%20Angeles%20Nest%2C%20I%20would%20like%20to%20inquire%20about%20new%20arrivals." 
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
          {filteredProducts.map((product) => {
            const wishlisted = isWishlisted(product.id);
            const isCopied = copiedId === product.id;
            return (
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
                  
                  {/* Badge */}
                  <span className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md z-10" style={{ backgroundColor: brand.blue }}>
                    {product.badge}
                  </span>
                  
                  {/* Action Buttons Top Right (Wishlist & Share) */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
                    <button
                      onClick={() => toggleWishlist(product)}
                      aria-label="Add to wishlist"
                      className="bg-white/90 backdrop-blur-md p-1.5 rounded-full transition-colors shadow-sm hover:bg-white"
                    >
                      <Heart className={`h-3.5 w-3.5 transition-colors ${wishlisted ? 'fill-[#e41575] text-[#e41575]' : 'text-slate-400 hover:text-[#e41575]'}`} />
                    </button>

                    <button
                      onClick={() => handleShare(product)}
                      aria-label="Share product"
                      className="bg-white/90 backdrop-blur-md p-1.5 rounded-full transition-colors shadow-sm hover:bg-white text-slate-400 hover:text-slate-900"
                      title="Share product"
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
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

                    {/* Action Buttons: Add to Cart & WhatsApp */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-[10px] font-bold py-2 px-1 rounded-xl shadow-sm flex items-center justify-center gap-1 transition-all"
                      >
                        <ShoppingBag className="h-3 w-3 shrink-0" />
                        <span>Add to Cart</span>
                      </button>

                      <a 
                        href={getWhatsAppUrl(product)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[10px] font-bold py-2 px-1 rounded-xl shadow-sm flex items-center justify-center gap-1 transition-all"
                      >
                        <MessageCircle className="h-3 w-3 fill-white shrink-0" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
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