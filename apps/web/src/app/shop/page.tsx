// apps/web/src/app/shop/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, ArrowUpDown, MessageCircle, Check, Search, ArrowRight } from 'lucide-react';
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

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '3pc Soft Jeans Short Set',
    fit: '1–4 yrs',
    description: 'Comfortable soft jeans short set with button-up shirt and bow tie',
    price: 'KES 1,800.00',
    category: 'Boys',
    badge: 'Popular',
    image: '/products/3pc soft jeans short set.jpeg',
  },
  {
    id: '2',
    name: '3pc Official Khaki Set',
    fit: '1–4 yrs',
    description: 'Vest, shirt and khaki pants',
    price: 'KES 2,000.00',
    category: 'Boys',
    badge: 'Best Seller',
    image: '/products/3pc Official Khaki.jpeg',
  },
  {
    id: '3',
    name: 'Cute Three Piece Set',
    fit: '3–9 yrs',
    description: 'Stylish three piece hoodie and sweatpants set',
    price: 'KES 2,400.00',
    category: 'Girls',
    image: '/products/Cute three piece set.jpeg',
  },
  {
    id: '4',
    name: 'High Quality Cute Dress with Denim Jacket',
    fit: '4–8 yrs',
    description: 'Elegant white dress paired with stylish lace collar denim jacket',
    price: 'KES 3,800.00',
    category: 'Dresses',
    badge: 'Signature',
    image: '/products/High quality cute dress with denim.jpeg',
  },
  {
    id: '5',
    name: 'Soft Denim Dress with White Ribbons',
    fit: '3–8 yrs',
    description: 'Sleeveless soft denim dress styled with charming white ribbon accents',
    price: 'KES 2,000.00',
    category: 'Dresses',
    image: '/products/Soft denim dress with white ribbons.jpeg',
  },
  {
    id: '6',
    name: 'Cute Denim 2pc Set',
    fit: '3–8 yrs',
    description: 'Chic denim vest top paired with wide leg denim trousers',
    price: 'KES 2,000.00',
    category: 'Girls',
    image: '/products/Cute denim 2 pc,3-8yrs.jpeg',
  },
  {
    id: '7',
    name: 'Brooklyn Two Piece Cargo Pants Set',
    fit: '8–12 yrs',
    description: 'Stylish Brooklyn printed long sleeve crop top with wide leg cargo pants',
    price: 'KES 2,200.00',
    category: 'Girls',
    image: '/products/Brooklyn two piece cargo pants.jpeg',
  },
  {
    id: '8',
    name: '3 Piece Skirt & Vest Set',
    fit: '3–8 yrs',
    description: 'Butterfly embellishment vest, white long sleeve blouse & pleated skirt',
    price: 'KES 2,000.00',
    category: 'Girls',
    image: '/products/3 piece skirt set,3-8yrs.jpeg',
  },
  {
    id: '9',
    name: 'Clothing Art Urban 2pc Set',
    fit: '3–12 yrs',
    description: 'Modern long sleeve athletic sweatshirt and matching relaxed track pants',
    price: 'KES 2,200.00',
    category: 'Boys',
    image: '/products/Clothing art 2pc set.jpeg',
  },
  {
    id: '10',
    name: 'Quality Khaki Cargo Pants',
    fit: '3–12 yrs',
    description: 'Durable utility cargo pants with side pockets (Available in black & olive)',
    price: 'KES 1,400.00',
    category: 'Pants',
    image: '/products/Quality khaki pants.jpeg',
  },
  {
    id: '11',
    name: 'Girls Fluffy Dragonfly Warm Sweater',
    fit: '3–8 yrs',
    description: 'Cozy and soft knit sweater with pearl dragonfly embroidery',
    price: 'KES 1,800.00',
    category: 'Tops',
    image: '/products/Girls warm sweater.jpeg',
  },
  {
    id: '12',
    name: 'Skirt Set',
    fit: '6m–3 yrs',
    description: 'Adorable skirt set with decorative bows and matching cardigan',
    price: 'KES 1,800.00',
    category: 'Girls',
    image: '/products/Skirt set.jpeg',
  },
  {
    id: '13',
    name: 'Ankle Length Wide Leg Pant and T-shirt',
    fit: '8–13 yrs',
    description: 'Stylish wide leg denim pants with matching bow t-shirt',
    price: 'KES 1,800.00',
    category: 'Girls',
    image: '/products/Ankle length wide Leg Pant and t-shirt.jpeg',
  },
  {
    id: '14',
    name: "Mama's Bestie Denim Set",
    fit: '6m–2 yrs',
    description: 'Cute denim pants with floral details and matching flutter sleeve top',
    price: 'KES 1,700.00',
    category: 'Sets',
    image: '/products/Fits 6m-2yrs.jpeg',
  },
  {
    id: '16',
    name: 'Trendy Tracksuit Set',
    fit: '3–10 yrs',
    description: 'Available in black, beige, green',
    price: 'KES 2,200.00',
    category: 'Boys',
    image: '/products/3 piece set boys.jpeg',
  },
  {
    id: '17',
    name: 'Beautiful Three Piece Set',
    fit: '6m–4 yrs',
    description: 'Available in yellow, cream and pink',
    price: 'KES 2,000.00',
    category: 'Sets',
    image: '/products/Beautiful three piece.jpeg',
  },
  {
    id: '18',
    name: 'Quality Cute Heart Print Dress with Denim Vest',
    fit: '3–8 yrs',
    description: 'Adorable heart pattern dress with stylish denim vest layer',
    price: 'KES 1,800.00',
    category: 'Dresses',
    image: '/products/Quality cute dress.jpeg',
  },
  {
    id: '19',
    name: 'Cute White Dress with Matching Floral Bag',
    fit: '6m–5 yrs',
    description: 'Elegant white dress with denim flower vest and matching purse',
    price: 'KES 1,900.00',
    category: 'Dresses',
    image: '/products/Cute white dress comes with the kabag.jpeg',
  },
];

const CATEGORIES = ['All', 'Dresses', 'Sets', 'Boys', 'Girls', 'Pants', 'Tops'] as const;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
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

  const parsePrice = (price: string): number => {
    return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  };

  const getWhatsAppUrl = (product: Product): string => {
    const imageUrl = `${baseUrl}${product.image}`;
    const fitText = product.fit ? ` (${product.fit})` : '';
    const message = `Hello Angeles Nest, I would like to order:\n\n• ${product.name}${fitText}\n• Price: ${product.price}\n• Photo: ${imageUrl}\n\nPlease confirm availability and dispatch!`;
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

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.fit && product.fit.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

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
          <div>
            <h1 className="text-xl sm:text-2xl font-serif tracking-tight text-stone-900">
              The Collection
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Curated everyday sets, dresses, and formal wear for kids (6m &ndash; 13yrs)
            </p>
          </div>

          <a
            href="https://wa.me/254742871599?text=Hello%20Angeles%20Nest%2C%20I%20would%20like%20to%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
          >
            <MessageCircle className="h-3 w-3 text-emerald-600" /> Order via WhatsApp
          </a>
        </div>
      </section>

      {/* Main Catalog View */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
        
        {/* Mobile Search Input */}
        <div className="sm:hidden relative">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search outfits, sets, jackets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-full pl-9 pr-4 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 shadow-2xs"
          />
        </div>

        {/* Filters & Sorting Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200/70">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-stone-50 font-semibold shadow-2xs'
                    : 'bg-white border border-stone-200/80 text-stone-600 hover:text-stone-900 hover:border-stone-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorter & Item Count */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-stone-500 shrink-0">
            <span>{filteredAndSortedProducts.length} items</span>

            <div className="relative flex items-center bg-white border border-stone-200/80 rounded-full px-2.5 py-1 shadow-2xs">
              <ArrowUpDown className="w-3 h-3 text-stone-400 mr-1.5 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-transparent text-xs text-stone-800 font-medium focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/70 p-8 space-y-2">
            <p className="text-sm font-medium text-stone-800">No items match your criteria</p>
            <p className="text-xs text-stone-500">Try choosing another category or clearing your search term.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold underline text-stone-700 hover:text-stone-900"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-10">
            {filteredAndSortedProducts.map((product) => {
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

                    {/* Hover Overlay Controls (Desktop) */}
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

                  {/* Mobile Actions (Always accessible on touch devices) */}
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

        {/* Footer Navigation Link */}
        <div className="pt-6 border-t border-stone-200/70 text-center">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900"
          >
            Review selected items in your cart <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}