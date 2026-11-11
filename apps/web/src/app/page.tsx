// apps/web/src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, Sparkles, ShieldCheck, Truck, ArrowRight, MapPin, MessageCircle, Check } from 'lucide-react';
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

const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: '3pc Soft Jeans Short Set',
    fit: '1–4 yrs',
    description: 'Button-up shirt, bow tie and tailored soft denim shorts',
    price: 'KES 1,800.00',
    category: 'Boys',
    badge: 'Popular',
    image: '/products/3pc soft jeans short set.jpeg',
  },
  {
    id: '2',
    name: '3pc Official Khaki Set',
    fit: '1–4 yrs',
    description: 'Smart formal vest, collared shirt and tailored khaki trousers',
    price: 'KES 2,000.00',
    category: 'Boys',
    badge: 'Best Seller',
    image: '/products/3pc Official Khaki.jpeg',
  },
  {
    id: '3',
    name: 'Cute Three Piece Set',
    fit: '3–9 yrs',
    description: 'Cozy matching fleece hoodie, tee, and jogger bottoms',
    price: 'KES 2,400.00',
    category: 'Girls',
    image: '/products/Cute three piece set.jpeg',
  },
  {
    id: '4',
    name: 'Dress with Denim Jacket',
    fit: '4–8 yrs',
    description: 'Pleated white occasion dress with lace-trimmed denim jacket',
    price: 'KES 3,800.00',
    category: 'Dresses',
    badge: 'Signature',
    image: '/products/High quality cute dress with denim.jpeg',
  },
  {
    id: '5',
    name: 'Soft Denim Dress with White Ribbons',
    fit: '3–8 yrs',
    description: 'Lightweight sleeveless A-line denim dress with bow accents',
    price: 'KES 2,000.00',
    category: 'Dresses',
    image: '/products/Soft denim dress with white ribbons.jpeg',
  },
  {
    id: '6',
    name: 'Denim Vest & Trouser 2pc Set',
    fit: '3–8 yrs',
    description: 'Buttoned denim waistcoat with wide-leg utility trousers',
    price: 'KES 2,000.00',
    category: 'Girls',
    image: '/products/Cute denim 2 pc,3-8yrs.jpeg',
  },
  {
    id: '7',
    name: 'Brooklyn Cargo Pants Set',
    fit: '8–12 yrs',
    description: 'Relaxed cropped long-sleeve knit top with relaxed cargo bottoms',
    price: 'KES 2,200.00',
    category: 'Girls',
    image: '/products/Brooklyn two piece cargo pants.jpeg',
  },
  {
    id: '8',
    name: '3pc Pleated Skirt & Vest Set',
    fit: '3–8 yrs',
    description: 'Embellished knit vest, contrast puff-sleeve blouse and pleated skirt',
    price: 'KES 2,000.00',
    category: 'Girls',
    image: '/products/3 piece skirt set,3-8yrs.jpeg',
  },
  {
    id: '9',
    name: 'Urban Athleisure 2pc Set',
    fit: '3–12 yrs',
    description: 'Cotton-rich sweatshirt and tapered everyday track pants',
    price: 'KES 2,200.00',
    category: 'Boys',
    image: '/products/Clothing art 2pc set.jpeg',
  },
  {
    id: '10',
    name: 'Quality Khaki Cargo Pants',
    fit: '3–12 yrs',
    description: 'Durable utility bottoms with deep storage flap pockets',
    price: 'KES 1,400.00',
    category: 'Pants',
    image: '/products/Quality khaki pants.jpeg',
  },
  {
    id: '11',
    name: 'Fluffy Dragonfly Knit Sweater',
    fit: '3–8 yrs',
    description: 'Ultra-soft textured knit with delicate hand-stitched detailing',
    price: 'KES 1,800.00',
    category: 'Tops',
    image: '/products/Girls warm sweater.jpeg',
  },
  {
    id: '12',
    name: 'Petite Bow Skirt Set',
    fit: '6m–3 yrs',
    description: 'Soft knit cardigan with matching layered twirl skirt',
    price: 'KES 1,800.00',
    category: 'Girls',
    image: '/products/Skirt set.jpeg',
  },
  {
    id: '13',
    name: 'Wide Leg Trouser & Graphic Tee',
    fit: '8–13 yrs',
    description: 'High-waist relaxed fit denim paired with a soft combed cotton t-shirt',
    price: 'KES 1,800.00',
    category: 'Girls',
    image: '/products/Ankle length wide Leg Pant and t-shirt.jpeg',
  },
  {
    id: '14',
    name: "Mama's Bestie Denim Set",
    fit: '6m–2 yrs',
    description: 'Flutter sleeve blouse with gentle stretch floral denim bottoms',
    price: 'KES 1,700.00',
    category: 'Sets',
    image: '/products/Fits 6m-2yrs.jpeg',
  },
  {
    id: '16',
    name: 'Urban Monochromatic Tracksuit',
    fit: '3–10 yrs',
    description: 'Clean silhouette warm tracksuit for school breaks and travel',
    price: 'KES 2,200.00',
    category: 'Boys',
    image: '/products/3 piece set boys.jpeg',
  },
  {
    id: '17',
    name: 'Pastel Three Piece Set',
    fit: '6m–4 yrs',
    description: 'Cotton rib long sleeve, stretch trouser, and warm overlay vest',
    price: 'KES 2,000.00',
    category: 'Sets',
    image: '/products/Beautiful three piece.jpeg',
  },
  {
    id: '18',
    name: 'Heart Print Dress & Denim Vest',
    fit: '3–8 yrs',
    description: 'Airy print sundress finished with a cropped wash denim vest',
    price: 'KES 1,800.00',
    category: 'Dresses',
    image: '/products/Quality cute dress.jpeg',
  },
  {
    id: '19',
    name: 'Floral Bag & White Tiered Dress',
    fit: '6m–5 yrs',
    description: 'Crisp party dress accompanied by a matching mini shoulder bag',
    price: 'KES 1,900.00',
    category: 'Dresses',
    image: '/products/Cute white dress comes with the kabag.jpeg',
  },
];

const CATEGORIES = ['All', 'Dresses', 'Sets', 'Boys', 'Girls', 'Pants', 'Tops'] as const;

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
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

  const getWhatsAppUrl = (product: Product): string => {
    const imageUrl = `${baseUrl}${product.image}`;
    const fitText = product.fit ? ` (${product.fit})` : '';
    const message = `Hello Angeles Nest, I would like to order:\n\n• ${product.name}${fitText}\n• Price: ${product.price}\n• Photo: ${imageUrl}\n\nPlease confirm availability and delivery!`;
    return `https://wa.me/254742871599?text=${encodeURIComponent(message)}`;
  };

  const isWishlisted = (id: string) => wishlistItems.some((item) => item.id === id);

  const toggleWishlist = (product: Product) => {
    let updated: Product[];
    if (isWishlisted(product.id)) {
      updated = wishlistItems.filter((item) => item.id !== product.id);
    } else {
      updated = [...wishlistItems, product];
    }
    setWishlistItems(updated);
    localStorage.setItem('angelsnest_wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  const addToCart = (product: Product) => {
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem('angelsnest_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
    setNotification(`Added "${product.name}" to cart`);
    setTimeout(() => setNotification(null), 2500);
  };

  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.fit && product.fit.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

      {/* Hero Section */}
      <section className="border-b border-stone-200/80 bg-stone-50/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-200/70 text-stone-700 text-[10px] font-bold tracking-wide uppercase shrink-0 self-center sm:self-auto">
              <Sparkles className="h-3 w-3 text-stone-500" /> Ages 6m – 13yrs
            </span>
            <p className="text-xs sm:text-sm font-medium text-stone-800">
              Thoughtfully tailored clothing for growing children &bull; <span className="text-stone-500 font-normal">Nairobi pickup &amp; countrywide delivery.</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/shop"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors shadow-2xs whitespace-nowrap"
            >
              Shop Catalog
            </Link>
            <a
              href="https://wa.me/254742871599?text=Hello%20Angeles%20Nest%2C%20I%20would%20like%20to%20inquire%20about%20your%20outfits."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <MessageCircle className="h-3 w-3 text-emerald-600" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">

        {/* Mobile Search Input */}
        <div className="sm:hidden relative">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search dresses, boys sets, sweaters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-full pl-9 pr-4 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 shadow-2xs"
          />
        </div>

        {/* Section Header & Minimal Category Filter */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200/80 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-stone-900 tracking-tight">Available Outfits</h2>
              <p className="text-xs text-stone-500 mt-0.5">Showing {filteredProducts.length} pieces ready for dispatch</p>
            </div>

            <Link
              href="/shop"
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 self-start sm:self-auto transition-colors"
            >
              View catalog <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Clean Understated Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${selectedCategory === cat
                    ? 'bg-stone-900 text-stone-50 font-semibold shadow-2xs'
                    : 'bg-white border border-stone-200/80 text-stone-600 hover:text-stone-900 hover:border-stone-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Streamlined, Breathable Product Grid (2 cols mobile, 3 tablet, 4 desktop) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/70 p-8 space-y-2">
            <p className="text-sm font-medium text-stone-800">No pieces match your search</p>
            <p className="text-xs text-stone-500">Try checking for a different category or clear the search field.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold underline text-stone-700 hover:text-stone-900"
            >
              Reset Filters
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

                    {/* Subtle Badge */}
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-sm border border-stone-200/60 shadow-2xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      aria-label="Add to wishlist"
                      className="absolute top-2.5 right-2.5 bg-white/80 backdrop-blur-xs hover:bg-white p-1.5 rounded-full text-stone-400 hover:text-rose-600 transition-colors shadow-2xs"
                    >
                      <Heart className={`h-3.5 w-3.5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Quick Add Overlay on Hover (Desktop) */}
                    <div className="absolute inset-x-2 bottom-2 hidden sm:flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-white/95 backdrop-blur-xs hover:bg-white text-stone-800 text-[11px] font-semibold py-2 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 border border-stone-200/70"
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

                  {/* Clean Metadata Block */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="uppercase tracking-wider text-[10px] text-stone-400 font-semibold">{product.category}</span>
                      {product.fit && <span>{product.fit}</span>}
                    </div>

                    <h3 className="font-medium text-xs sm:text-sm text-stone-900 line-clamp-1 group-hover:text-stone-700 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-baseline justify-between pt-0.5">
                      <span className="text-xs sm:text-sm font-semibold text-stone-900 tracking-tight">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-stone-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Mobile Actions (Visible on touch devices) */}
                  <div className="sm:hidden grid grid-cols-5 gap-1.5 pt-1">
                    <button
                      onClick={() => addToCart(product)}
                      className="col-span-3 bg-stone-100 active:bg-stone-200 text-stone-800 text-[11px] font-medium py-1.5 px-2 rounded-lg border border-stone-200 flex items-center justify-center gap-1"
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

        {/* Quiet Trust Signals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-stone-200/70">
          <div className="p-4 rounded-xl bg-white border border-stone-200/70 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-700 shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900">True-to-Picture Quality</h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-normal">
                Carefully selected fabrics that match the exact images shown.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/70 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-700 shrink-0">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900">Doorstep Delivery</h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-normal">
                Reliable Nairobi dispatch and countrywide parcel courier service.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/70 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-700 shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900">Physical Store Pickup</h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-normal">
                Biashara Street, Zanna Exhibition, 1st Floor, Shop M7.
              </p>
            </div>
          </div>
        </div>

        {/* Clean Showroom Callout */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Nairobi CBD</span>
            <h3 className="text-base sm:text-lg font-serif text-stone-900">Prefer inspecting sizing in person?</h3>
            <p className="text-xs text-stone-600 max-w-xl">
              Visit our showroom on Biashara Street to view fittings, feel fabric weights, or collect your online orders directly.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors whitespace-nowrap shadow-2xs"
          >
            Store Location &amp; Hours
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}