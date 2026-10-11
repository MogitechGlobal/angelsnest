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

const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: '3pc Soft Jeans Short Set',
    fit: 'Fits 1-4yrs',
    description: 'Comfortable soft jeans short set with button-up shirt and bow tie',
    price: 'KES 1,800.00',
    category: 'Boys',
    badge: 'Best Seller',
    image: '/products/3pc soft jeans short set.jpeg',
  },
  {
    id: '2',
    name: '3pc Official Khaki Set',
    fit: 'Fits 1-4 yrs',
    description: 'Vest, shirt and khaki pants',
    price: 'KES 2,000.00',
    category: 'Boys',
    badge: 'Hot',
    image: '/products/3pc Official Khaki.jpeg',
  },
  {
    id: '3',
    name: 'Cute Three Piece Set',
    fit: '3-9yrs',
    description: 'Stylish three piece hoodie and sweatpants set',
    price: 'KES 2,400.00',
    category: 'Girls',
    badge: 'New',
    image: '/products/Cute three piece set.jpeg',
  },
  {
    id: '4',
    name: 'High Quality Cute Dress with Denim Jacket',
    fit: '4-8yrs',
    description: 'Elegant white dress paired with stylish lace collar denim jacket (Selling out fast!)',
    price: 'KES 3,800.00',
    category: 'Dresses',
    badge: 'Hot Seller',
    image: '/products/High quality cute dress with denim.jpeg',
  },
  {
    id: '5',
    name: 'Soft Denim Dress with White Ribbons',
    fit: '3-8yrs',
    description: 'Sleeveless soft denim dress styled with charming white ribbon accents',
    price: 'KES 2,000.00',
    category: 'Dresses',
    badge: 'Trending',
    image: '/products/Soft denim dress with white ribbons.jpeg',
  },
  {
    id: '6',
    name: 'Cute Denim 2pc Set',
    fit: '3-8yrs',
    description: 'Chic denim vest top paired with wide leg denim trousers',
    price: 'KES 2,000.00',
    category: 'Girls',
    badge: 'Popular',
    image: '/products/Cute denim 2 pc,3-8yrs.jpeg',
  },
  {
    id: '7',
    name: 'Brooklyn Two Piece Cargo Pants Set',
    fit: '8-12yrs',
    description: 'Stylish Brooklyn printed long sleeve crop top with wide leg cargo pants',
    price: 'KES 2,200.00',
    category: 'Girls',
    badge: 'New Arrival',
    image: '/products/Brooklyn two piece cargo pants.jpeg',
  },
  {
    id: '8',
    name: '3 Piece Skirt & Vest Set',
    fit: '3-8yrs',
    description: 'Butterfly embellishment vest, white long sleeve blouse & pleated skirt',
    price: 'KES 2,000.00',
    category: 'Girls',
    badge: 'Featured',
    image: '/products/3 piece skirt set,3-8yrs.jpeg',
  },
  {
    id: '9',
    name: 'Clothing Art Urban 2pc Set',
    fit: '3-12yrs',
    description: 'Modern long sleeve athletic sweatshirt and matching relaxed track pants',
    price: 'KES 2,200.00',
    category: 'Boys',
    badge: 'Trending',
    image: '/products/Clothing art 2pc set.jpeg',
  },
  {
    id: '10',
    name: 'Quality Khaki Cargo Pants',
    fit: '3-12yrs',
    description: 'Durable utility cargo pants with side pockets (Available in black & olive)',
    price: 'KES 1,800.00',
    category: 'Pants',
    badge: 'Must Have',
    image: '/products/Quality khaki pants.jpeg',
  },
  {
    id: '11',
    name: 'Girls Fluffy Dragonfly Warm Sweater',
    fit: '3-8yrs',
    description: 'Cozy and soft knit sweater with pearl dragonfly embroidery',
    price: 'KES 1,800.00',
    category: 'Tops',
    badge: 'Cozy',
    image: '/products/Girls warm sweater.jpeg',
  },
  {
    id: '12',
    name: 'Skirt Set',
    fit: '6m-3yrs',
    description: 'Adorable skirt set with decorative bows and matching cardigan',
    price: 'KES 1,800.00',
    category: 'Girls',
    badge: 'Popular',
    image: '/products/Skirt set.jpeg',
  },
  {
    id: '13',
    name: 'Ankle Length Wide Leg Pant and T-shirt',
    fit: '8-13yrs',
    description: 'Stylish wide leg denim pants with matching bow t-shirt',
    price: 'KES 1,800.00',
    category: 'Girls',
    badge: 'Trending',
    image: '/products/Ankle length wide Leg Pant and t-shirt.jpeg',
  },
  {
    id: '14',
    name: 'Mama\'s Bestie Denim Set',
    fit: '6m-2yrs',
    description: 'Cute denim pants with floral details and matching flutter sleeve top',
    price: 'KES 1,700.00',
    category: 'Sets',
    badge: 'Sale',
    image: '/products/Fits 6m-2yrs.jpeg',
  },
  {
    id: '16',
    name: 'Trendy Tracksuit Set',
    fit: '3-10yrs',
    description: 'Available in black, beige, green',
    price: 'KES 2,200.00',
    category: 'Boys',
    badge: 'Hot',
    image: '/products/3 piece set boys.jpeg',
  },
  {
    id: '17',
    name: 'Beautiful Three Piece Set',
    fit: '6m-4yrs',
    description: 'Available in yellow, cream and pink',
    price: 'KES 2,000.00',
    category: 'Sets',
    badge: 'New',
    image: '/products/Beautiful three piece.jpeg',
  },
  {
    id: '18',
    name: 'Quality Cute Heart Print Dress with Denim Vest',
    fit: '3-8yrs',
    description: 'Adorable heart pattern dress with stylish denim vest layer',
    price: 'KES 1,800.00',
    category: 'Dresses',
    badge: 'Best Seller',
    image: '/products/Quality cute dress.jpeg',
  },
  {
    id: '19',
    name: 'Cute White Dress with Matching Floral Bag',
    fit: 'Fits 6m-5yrs',
    description: 'Elegant white dress with denim flower vest and matching purse',
    price: 'KES 1,900.00',
    category: 'Dresses',
    badge: 'Popular',
    image: '/products/Cute white dress comes with the kabag.jpeg',
  },
];

const CATEGORIES = ['All', 'Dresses', 'Sets', 'Boys', 'Girls', 'Pants', 'Tops'] as const;

function getWhatsAppUrl(product: Product): string {
  const fitText = product.fit ? ` (${product.fit})` : '';
  const message = `Hello Angeles Nest, I would like to order: ${product.name}${fitText} for ${product.price}`;
  return `https://wa.me/254742871599?text=${encodeURIComponent(message)}`;
}

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
        
        {/* Minimized, Sleek Compact Hero Banner */}
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
              href="https://wa.me/254742871599?text=Hello%20Angeles%20Nest%2C%20I%20would%20like%20to%20place%20an%20order." 
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

        {/* Category Navigation & Catalog Section */}
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
                    <a 
                      href={getWhatsAppUrl(product)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-2 rounded-lg shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="h-3 w-3 fill-white" /> Order via WhatsApp
                    </a>
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
                    {product.description && (
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{product.description}</p>
                    )}
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