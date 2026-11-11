// apps/web/src/app/cart/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  MessageCircle,
  Tag,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Check,
  Lock,
  AlertCircle,
  Globe,
  Plane,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CartItem {
  id: string;
  name: string;
  price: string | number;
  fit?: string;
  size?: string;
  color?: string;
  image: string;
  quantity: number;
}

export interface ShippingOption {
  id: string;
  zone: string;
  label: string;
  deliveryTime?: string;
  areas: string;
  cost: number;
  category: 'pickup' | 'nairobi' | 'outside' | 'international';
  note?: string;
}

// 1. KENYA-ONLY SHIPPING OPTIONS
const KENYA_SHIPPING_OPTIONS: ShippingOption[] = [
  // Store Pickups (Free)
  {
    id: 'hq-pickup',
    zone: 'HQ Pick Up',
    label: 'KCS House, Mama Ngina Street, 8th Floor',
    deliveryTime: 'Ready in 2 hours',
    areas: 'Mama Ngina Street, CBD, Nairobi',
    cost: 0,
    category: 'pickup',
  },
  {
    id: 'platinum-plaza',
    zone: 'Platinum Plaza',
    label: 'Basement Shop B09',
    deliveryTime: 'Ready in 2 hours',
    areas: 'Biashara / Market Street, Nairobi CBD',
    cost: 0,
    category: 'pickup',
  },

  // Nairobi Zones
  {
    id: 'zone-a',
    zone: 'ZONE A',
    label: 'Within CBD',
    deliveryTime: 'Same Day Delivery',
    areas: 'City Centre, Railways, Koja, OTC, Ronald Ngala, Moi Avenue',
    cost: 150,
    category: 'nairobi',
  },
  {
    id: 'mtaani-agent',
    zone: 'Pick Up Mtaani',
    label: 'Agent Drop Off',
    deliveryTime: 'Next Day Collection',
    areas: 'All Pick Up Mtaani designated collection agents in Nairobi',
    cost: 220,
    category: 'nairobi',
    note: 'Indicate your location & preferred agent in the field above',
  },
  {
    id: 'super-metro',
    zone: 'Super Metro Parcel',
    label: 'Thika, Kikuyu, Ruiru, Juja, Ngong, Kitengela etc.',
    deliveryTime: 'Same Day Dispatch',
    areas: 'Thika, Kikuyu, Ruiru, Juja, Ngong, Kitengela and route stages',
    cost: 250,
    category: 'nairobi',
  },
  {
    id: 'zone-b',
    zone: 'ZONE B',
    label: 'Upperhill, Hurlingham & Surrounds',
    deliveryTime: 'Same Day Delivery',
    areas: 'Upperhill, Valley Road, Community, Hurlingham, Nairobi Hospital, Pangani, Ngara, KNH, Ojijo Road etc.',
    cost: 300,
    category: 'nairobi',
  },
  {
    id: 'zone-c',
    zone: 'ZONE C',
    label: 'Westlands, Kilimani & Parklands',
    deliveryTime: 'Same Day Delivery',
    areas: 'Riverside, Westlands, ABC, Kilimani, Kileleshwa, Westgate, General Mathenge, Parklands, MP-Shah, Aghakhan, Oshwal etc.',
    cost: 350,
    category: 'nairobi',
  },
  {
    id: 'zone-e',
    zone: 'ZONE E',
    label: 'South B/C & Mombasa Road Axis',
    deliveryTime: 'Same Day Delivery',
    areas: "South B/C, Mbagathi, Madaraka, Nairobi west, Lang'ata, carnivore, Nairobi West, Bellevue, NextGen Mall, Panari, Imara etc.",
    cost: 350,
    category: 'nairobi',
  },
  {
    id: 'zone-j',
    zone: 'ZONE J',
    label: 'Thika Road Corridor',
    deliveryTime: 'Same Day Delivery',
    areas: 'Roasters, Mountain Mall, Garden City, TRM, Lumumba Drive, USIU, Ngumba etc.',
    cost: 350,
    category: 'nairobi',
  },
  {
    id: 'zone-d',
    zone: 'ZONE D',
    label: 'Spring Valley & Lower Kabete',
    deliveryTime: 'Same Day Delivery',
    areas: 'Kangemi, Loresho, Mountain View, Spring Valley, Lower Kabete, Industrial Area',
    cost: 400,
    category: 'nairobi',
  },
  {
    id: 'zone-f',
    zone: 'ZONE F',
    label: 'Junction, Lavington & Dagoretti',
    deliveryTime: 'Same Day Delivery',
    areas: 'Junction Mall, Lavington, Kibra, Dagoretti Corner, Kawangware, Wanyee etc.',
    cost: 400,
    category: 'nairobi',
  },
  {
    id: 'zone-n',
    zone: 'ZONE N',
    label: 'Eastlands Central',
    deliveryTime: 'Same Day Delivery',
    areas: 'Donholm, Uhuru Estate, Buruburu, Fedha, Tassia, Savanah, Pipeline, Mtindwa, Lucky Summer',
    cost: 400,
    category: 'nairobi',
  },
  {
    id: 'zone-g',
    zone: 'ZONE G',
    label: 'Runda, Ruaka & Northern Bypass',
    deliveryTime: 'Same Day Delivery',
    areas: 'Ruaka, Runda, Nyari, Gigiri, UNEP, Muchatha, Muthaiga North, Fourways, Ridgeways, Komarock, Tassia etc.',
    cost: 450,
    category: 'nairobi',
  },
  {
    id: 'zone-m',
    zone: 'ZONE M',
    label: 'Kasarani & Kahawa Suburbs',
    deliveryTime: 'Same Day Delivery',
    areas: 'Mirema, Kahawa Sukari, Zimmerman, Kiambu road(Kmall), Githurai, Kahawa West, Kahawa Wendani, Clayworks etc.',
    cost: 450,
    category: 'nairobi',
  },
  {
    id: 'zone-h',
    zone: 'ZONE H',
    label: 'Syokimau & Satellite Suburbs',
    deliveryTime: 'Same / Next Day',
    areas: 'Gateway Mall, Syokimau, Kinoo, Ruiru Bypass, Kitusuru, Mwimuto',
    cost: 600,
    category: 'nairobi',
  },
  {
    id: 'zone-o',
    zone: 'Zone O',
    label: 'Karen & Outer Metro',
    deliveryTime: 'Same / Next Day',
    areas: 'Utawala, Karen, Ruiru Town',
    cost: 650,
    category: 'nairobi',
  },
  {
    id: 'zone-p',
    zone: 'ZONE P',
    label: 'Greater Metro Hubs',
    deliveryTime: 'Next Day Delivery',
    areas: 'Rongai, Kikuyu, Kiambu Town, Tatu City, Kenyattta road',
    cost: 800,
    category: 'nairobi',
  },
  {
    id: 'zone-r',
    zone: 'Zone R',
    label: 'Athi River & Environs',
    deliveryTime: 'Next Day Delivery',
    areas: 'Athi River, Thika Town, Kamulu, Kitengela',
    cost: 900,
    category: 'nairobi',
  },
  {
    id: 'zone-q',
    zone: 'Zone Q',
    label: 'Thika Town, Kamulu, Kitengela',
    deliveryTime: 'Dedicated Express',
    areas: 'Thika Town, Kamulu, Kitengela',
    cost: 1350,
    category: 'nairobi',
  },

  // Outside Nairobi (Kenya)
  {
    id: 'zone-k',
    zone: 'ZONE K',
    label: 'Outside Nairobi (Regional Courier)',
    deliveryTime: '1 - 2 business days',
    areas: 'All Kenyan towns outside Nairobi: Nakuru, Eldoret, Kisumu, Mombasa, Nyeri, Meru, etc.',
    cost: 400,
    category: 'outside',
    note: 'Indicate your town & preferred courier (e.g. 2NK, North Rift, Modern Coast) in the field above',
  },
];

// 2. OUTSIDE KENYA (INTERNATIONAL) SHIPPING OPTIONS
const OUTSIDE_KENYA_SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'nation-courier',
    zone: 'Nation Courier',
    label: 'Same Day Dispatch',
    deliveryTime: 'Same Day Dispatch',
    areas: 'Regional cross-border bus and courier delivery (Uganda, Tanzania, Rwanda, etc.)',
    cost: 1100,
    category: 'international',
    note: 'Dispatched same day via verified regional courier partners',
  },
  {
    id: 'fedex-priority',
    zone: 'FedEx International Priority®',
    label: 'Fastest Global Delivery',
    deliveryTime: '5 business days',
    areas: 'Door-to-door expedited air courier with real-time tracking worldwide',
    cost: 5257.34,
    category: 'international',
    note: 'Tracking number provided upon fulfillment',
  },
  {
    id: 'fedex-economy',
    zone: 'FedEx International Economy®',
    label: 'Cost-Effective Global Delivery',
    deliveryTime: '8 business days',
    areas: 'Reliable door-to-door international delivery worldwide',
    cost: 8793.90,
    category: 'international',
    note: 'Reliable customs clearance and tracking included',
  },
];

const COUNTRIES = [
  'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Burundi', 'South Sudan', 'Nigeria', 'Ghana', 'South Africa',
  'Algeria', 'Angola', 'Ascension Island', 'Australia', 'Bahrain', 'Benin', 'Botswana', 'British Indian Ocean Territory',
  'Burkina Faso', 'Cameroon', 'Canada', 'Cape Verde', 'Caribbean Netherlands', 'Central African Republic', 'Chad', 'China',
  'Comoros', 'Congo - Brazzaville', 'Congo - Kinshasa', 'Cyprus', 'Côte d’Ivoire', 'Denmark', 'Djibouti', 'Egypt',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'France', 'French Southern Territories', 'Gabon', 'Gambia',
  'Germany', 'Guinea', 'Guinea-Bissau', 'Hong Kong SAR', 'India', 'Indonesia', 'Japan', 'Kuwait', 'Lesotho', 'Liberia',
  'Libya', 'Madagascar', 'Malawi', 'Malaysia', 'Mali', 'Mauritania', 'Mauritius', 'Mayotte', 'Morocco', 'Mozambique',
  'Namibia', 'Netherlands', 'Niger', 'Portugal', 'Qatar', 'Réunion', 'São Tomé & Príncipe', 'Senegal', 'Seychelles',
  'Sierra Leone', 'Somalia', 'St. Helena', 'Sudan', 'Sweden', 'Togo', 'Tristan da Cunha', 'Tunisia', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Western Sahara', 'Zambia', 'Zimbabwe'
];

export default function CartPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Mobile Accordion
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  // Delivery Modal State
  const [shippingModalOpen, setShippingModalOpen] = useState(false);
  const [zoneFilterTab, setZoneFilterTab] = useState<'all' | 'nairobi' | 'pickup' | 'outside'>('all');
  const [zoneSearch, setZoneSearch] = useState('');

  // Customer Form State
  const [email, setEmail] = useState('');
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [country, setCountry] = useState('Kenya');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mtaaniLocation, setMtaaniLocation] = useState('');
  const [address, setAddress] = useState('');
  const [townCourier, setTownCourier] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [saveInfo, setSaveInfo] = useState(true);
  const [selectedShippingId, setSelectedShippingId] = useState<string>('zone-a');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'delivery'>('mpesa');
  const [formError, setFormError] = useState('');

  const isKenya = country === 'Kenya';

  // Available options based on country
  const currentOptionsList = useMemo(() => {
    return isKenya ? KENYA_SHIPPING_OPTIONS : OUTSIDE_KENYA_SHIPPING_OPTIONS;
  }, [isKenya]);

  // When country switches between Kenya and Outside Kenya, update shipping selection automatically
  useEffect(() => {
    if (isKenya) {
      const existsInKenya = KENYA_SHIPPING_OPTIONS.some((o) => o.id === selectedShippingId);
      if (!existsInKenya) {
        setSelectedShippingId('zone-a');
      }
    } else {
      const existsOutside = OUTSIDE_KENYA_SHIPPING_OPTIONS.some((o) => o.id === selectedShippingId);
      if (!existsOutside) {
        setSelectedShippingId('nation-courier');
      }
    }
  }, [country, isKenya, selectedShippingId]);

  // Load Saved Cart & Profile
  useEffect(() => {
    const savedCart = localStorage.getItem('angelsnest_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
      } catch (e) {
        console.error(e);
      }
    }

    const savedProfile = localStorage.getItem('angelsnest_profile_v3');
    if (savedProfile) {
      try {
        const p = JSON.parse(savedProfile);
        if (p.email) setEmail(p.email);
        if (p.country) setCountry(p.country);
        if (p.firstName) setFirstName(p.firstName);
        if (p.lastName) setLastName(p.lastName);
        if (p.mtaaniLocation) setMtaaniLocation(p.mtaaniLocation);
        if (p.address) setAddress(p.address);
        if (p.townCourier) setTownCourier(p.townCourier);
        if (p.city) setCity(p.city);
        if (p.postalCode) setPostalCode(p.postalCode);
        if (p.phone) setPhone(p.phone);
        if (p.selectedShippingId) setSelectedShippingId(p.selectedShippingId);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const updateCartStorage = (updated: CartItem[]) => {
    setCartItems(updated);
    localStorage.setItem('angelsnest_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
    updateCartStorage(updated);
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((i) => i.id !== id);
    updateCartStorage(updated);
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ANGELES10') {
      setDiscount(10);
      setPromoMessage('10% discount applied successfully!');
    } else {
      setPromoMessage('Invalid coupon code. Try "ANGELES10"');
    }
  };

  const parsePrice = (price: string | number): number => {
    if (typeof price === 'number') return price;
    return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  };

  const selectedShipping =
    currentOptionsList.find((z) => z.id === selectedShippingId) || currentOptionsList[0];

  const subtotal = cartItems.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const shippingFee = cartItems.length > 0 ? selectedShipping.cost : 0;
  const total = subtotal - discountAmount + shippingFee;

  // Filtered Shipping Zones for Kenya Modal Picker
  const filteredZones = useMemo(() => {
    return KENYA_SHIPPING_OPTIONS.filter((zone) => {
      const matchesTab = zoneFilterTab === 'all' || zone.category === zoneFilterTab;
      const q = zoneSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        zone.zone.toLowerCase().includes(q) ||
        zone.label.toLowerCase().includes(q) ||
        zone.areas.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [zoneFilterTab, zoneSearch]);

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !address.trim() || !city.trim() || !phone.trim()) {
      setFormError('Please complete all required fields: First & Last Name, Address, City, and Phone Number.');
      return;
    }

    setFormError('');

    if (saveInfo) {
      localStorage.setItem(
        'angelsnest_profile_v3',
        JSON.stringify({
          email,
          country,
          firstName,
          lastName,
          mtaaniLocation,
          address,
          townCourier,
          city,
          postalCode,
          phone,
          selectedShippingId,
        })
      );
    }

    const itemsSummary = cartItems
      .map(
        (it) =>
          `• ${it.name} (${it.size || 'Standard'}) x${it.quantity} @ KES ${parsePrice(it.price).toLocaleString()}`
      )
      .join('\n');

    const paymentText =
      paymentMethod === 'mpesa'
        ? 'Lipa Na M-Pesa Paybill (Business No: 880100, A/c: 871599)'
        : 'Pay on Delivery / Store Pickup';

    const shippingText = `${selectedShipping.zone} - ${selectedShipping.label} (${
      selectedShipping.cost === 0 ? 'Free' : `KES ${selectedShipping.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
    })${selectedShipping.deliveryTime ? ` [${selectedShipping.deliveryTime}]` : ''}`;

    const text = `*NEW ORDER - CHECKOUT*\n\n*CUSTOMER DETAILS*\n- Name: ${firstName} ${lastName}\n- Phone: ${phone}\n- Email: ${email || 'N/A'}\n\n*DELIVERY LOCATION*\n- Destination: ${country}\n- Address: ${address}\n- City/Town: ${city}\n${mtaaniLocation ? `- Pick Up Mtaani Agent: ${mtaaniLocation}\n` : ''}${townCourier ? `- Outside Nairobi Courier: ${townCourier}\n` : ''}${postalCode ? `- Postal Code: ${postalCode}\n` : ''}\n*SHIPPING METHOD*\n- ${shippingText}\n\n*PAYMENT METHOD*\n- ${paymentText}\n\n*ORDER ITEMS*\n${itemsSummary}\n\nSubtotal: KES ${subtotal.toLocaleString()}\nDiscount: -KES ${discountAmount.toLocaleString()}\nShipping Fee: KES ${shippingFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}\n*TOTAL PAYABLE: KES ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}*\n\nPlease confirm availability and dispatch!`;

    window.open(`https://wa.me/254742871599?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfb] text-[#1c1b1b] antialiased selection:bg-slate-200">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* MOBILE SHOPIFY ORDER SUMMARY ACCORDION */}
      <div className="lg:hidden w-full bg-[#f6f6f6] border-b border-[#dfdfdf] sticky top-0 z-20 shadow-xs">
        <button
          type="button"
          onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-xs font-medium text-slate-800"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#005bd1] font-semibold flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              {mobileSummaryOpen ? 'Hide order summary' : 'Show order summary'}
              {mobileSummaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </div>
          <span className="font-extrabold text-sm text-slate-900">
            KES {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </button>

        {mobileSummaryOpen && (
          <div className="px-4 py-4 bg-[#fafafa] border-t border-[#dfdfdf] space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="divide-y divide-slate-200">
              {cartItems.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="relative w-12 h-12 rounded-lg bg-white border border-slate-200 shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-1 -right-1 bg-slate-700 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{item.name}</p>
                    <p className="text-slate-400 text-[11px]">{item.size || 'Standard Fit'}</p>
                  </div>
                  <span className="font-bold text-slate-900">
                    KES {(parsePrice(item.price) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-xs pt-3 border-t border-slate-200">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">KES {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount (10%)</span>
                  <span>-KES {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Shipping ({selectedShipping.zone})</span>
                <span className="font-semibold text-slate-900">
                  {shippingFee === 0
                    ? 'FREE'
                    : `KES ${shippingFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span>KES {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4 my-10 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your bag is empty</h2>
            <p className="text-xs text-slate-500">Add stylish baby collections and outfits to proceed to checkout.</p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-black transition-all shadow-md"
              >
                Return to Shop <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* LEFT COLUMN: SHOPIFY ONE-PAGE FORM */}
            <div className="lg:col-span-7 space-y-7">
              {/* CONTACT SECTION */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Contact</h2>
                </div>

                <div className="relative border border-slate-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pt-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 pb-2.5 pt-0.5 text-xs sm:text-sm font-medium text-slate-900 bg-transparent focus:outline-none"
                    autoComplete="shipping email"
                  />
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={emailMarketing}
                    onChange={(e) => setEmailMarketing(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900"
                  />
                  <span className="text-xs text-slate-600">Email me with news and offers</span>
                </label>
              </section>

              {/* DELIVERY SECTION */}
              <section className="space-y-3">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Delivery</h2>
                </div>

                <div className="space-y-3">
                  {/* Country/Region Selector */}
                  <div className="relative border border-slate-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-slate-900">
                    <label htmlFor="country" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pt-2">
                      Country/Region
                    </label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 pb-2.5 pt-0.5 text-xs sm:text-sm font-semibold text-slate-900 bg-transparent appearance-none focus:outline-none cursor-pointer pr-10"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 bottom-3 pointer-events-none" />
                  </div>

                  {/* International Notice Banner */}
                  {!isKenya && (
                    <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5 animate-in fade-in duration-200">
                      <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold">International delivery to {country}</span>
                        <p className="text-[11px] text-blue-800 leading-relaxed">
                          Your order will be fulfilled via international priority or regional courier routes. Review the updated shipping rates below.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative border border-slate-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-slate-900">
                      <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pt-2">
                        First name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        className="w-full px-3.5 pb-2.5 pt-0.5 text-xs sm:text-sm font-medium text-slate-900 bg-transparent focus:outline-none"
                        required
                      />
                    </div>
                    <div className="relative border border-slate-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-slate-900">
                      <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pt-2">
                        Last name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="w-full px-3.5 pb-2.5 pt-0.5 text-xs sm:text-sm font-medium text-slate-900 bg-transparent focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Pick Up Mtaani (Kenya only) */}
                  {isKenya && (
                    <div className="relative border border-slate-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-slate-900">
                      <label htmlFor="mtaani" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pt-2">
                        Pick Up Mtaani location &amp; agent (Pick Up Mtaani only)
                      </label>
                      <input
                        id="mtaani"
                        type="text"
                        value={mtaaniLocation}
                        onChange={(e) => setMtaaniLocation(e.target.value)}
                        placeholder="e.g. Roysambu Quickmart / Umoja 1 Agent"
                        className="w-full px-3.5 pb-2.5 pt-0.5 text-xs sm:text-sm font-medium text-slate-900 bg-transparent focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Address */}
                  <div className="relative border border-slate-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-slate-900">
                    <label htmlFor="address" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pt-2">
                      Address *
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Apartment, suite, estate, or street name"
                      className="w-full px-3.5 pb-2.5 pt-0.5 text-xs sm:text-sm font-medium text-slate-900 bg-transparent focus:outline-none"
                      required
                    />
                  </div>

                  {/* Town & preferred courier (Kenya only) */}
                  {isKenya && (
                    <div className="relative border border-slate-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-slate-900">
                      <label htmlFor="townCourier" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pt-2">
                        Town &amp; preferred courier (Outside Nairobi only)
                      </label>
                      <input
                        id="townCourier"
                        type="text"
                        value={townCourier}
                        onChange={(e) => setTownCourier(e.target.value)}
                        placeholder="e.g. Nakuru via 2NK / Kisumu via EasyCoach"
                        className="w-full px-3.5 pb-2.5 pt-0.5 text-xs sm:text-sm font-medium text-slate-900 bg-transparent focus:outline-none"
                      />
                    </div>
                  )}

                  {/* City & Postal Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative border border-slate-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-slate-900">
                      <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pt-2">
                        City *
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={isKenya ? 'Nairobi, Mombasa, Kisumu, etc.' : 'City / State / Province'}
                        className="w-full px-3.5 pb-2.5 pt-0.5 text-xs sm:text-sm font-medium text-slate-900 bg-transparent focus:outline-none"
                        required
                      />
                    </div>
                    <div className="relative border border-slate-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-slate-900">
                      <label htmlFor="postalCode" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pt-2">
                        Postal code (optional)
                      </label>
                      <input
                        id="postalCode"
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder={isKenya ? '00100' : 'Postal / Zip code'}
                        className="w-full px-3.5 pb-2.5 pt-0.5 text-xs sm:text-sm font-medium text-slate-900 bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <div className="relative border border-slate-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-slate-900">
                      <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pt-2">
                        Phone *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={isKenya ? '0712 345 678' : '+Country code phone number'}
                        className="w-full px-3.5 pb-2.5 pt-0.5 text-xs sm:text-sm font-medium text-slate-900 bg-transparent focus:outline-none"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 pl-1">
                      In case we need to contact you about your order
                    </p>
                  </div>

                  {/* Save info */}
                  <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900"
                    />
                    <span className="text-xs font-semibold text-slate-700">Save this information for next time</span>
                  </label>
                </div>
              </section>

              {/* SHIPPING METHOD SECTION */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Shipping method</h2>
                  <span className="text-xs text-slate-400 font-medium">
                    {isKenya ? 'Click to change zone' : 'Select carrier option'}
                  </span>
                </div>

                {/* OUTSIDE KENYA INTERFACE: CLEAN SHOPIFY RADIO TILES */}
                {!isKenya ? (
                  <div className="space-y-3">
                    {/* Shopify Notification Message */}
                    <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold">The shipping options have changed for your order.</strong>
                        <p className="text-[11px] text-amber-800">
                          Review your selection below for international delivery to {country}.
                        </p>
                      </div>
                    </div>

                    <div className="border border-slate-300 rounded-2xl bg-white divide-y divide-slate-200 overflow-hidden shadow-xs">
                      {OUTSIDE_KENYA_SHIPPING_OPTIONS.map((opt) => {
                        const isSelected = selectedShippingId === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => setSelectedShippingId(opt.id)}
                            className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                              isSelected ? 'bg-slate-50/90' : 'hover:bg-slate-50/50'
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0 pr-3">
                              <div
                                className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                                  isSelected ? 'border-slate-900' : 'border-slate-300'
                                }`}
                              >
                                {isSelected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
                              </div>
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-xs sm:text-sm text-slate-900">{opt.zone}</span>
                                  {opt.id.startsWith('fedex') && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                                      <Plane className="w-2.5 h-2.5" /> FedEx
                                    </span>
                                  )}
                                </div>
                                {opt.deliveryTime && (
                                  <p className="text-[11px] font-semibold text-slate-500">{opt.deliveryTime}</p>
                                )}
                                <p className="text-[11px] text-slate-400 line-clamp-1">{opt.areas}</p>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="font-extrabold text-xs sm:text-sm text-slate-900 block">
                                Ksh {opt.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* KENYA INTERFACE: RESPONSIVE COMPACT CARD + SEARCH MODAL (NO DROPDOWN OVERFLOW) */
                  <div
                    onClick={() => setShippingModalOpen(true)}
                    className="p-4 rounded-xl border border-slate-300 bg-white hover:border-slate-800 transition-all cursor-pointer shadow-xs group flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                          {selectedShipping.zone}
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 truncate">{selectedShipping.label}</h3>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{selectedShipping.areas}</p>
                      {selectedShipping.note && (
                        <p className="text-[11px] font-medium text-sky-700 pt-0.5">📌 {selectedShipping.note}</p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-extrabold text-sm text-slate-900 block">
                        {selectedShipping.cost === 0 ? 'FREE' : `Ksh ${selectedShipping.cost.toFixed(2)}`}
                      </span>
                      <span className="text-[11px] text-sky-600 font-semibold group-hover:underline inline-flex items-center gap-0.5 pt-1">
                        Change zone <ChevronDown className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                )}
              </section>

              {/* PAYMENT SECTION */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Payment</h2>

                <div className="border border-slate-300 rounded-2xl bg-white divide-y divide-slate-200 overflow-hidden shadow-xs">
                  <div
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                      paymentMethod === 'mpesa' ? 'bg-slate-50' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'mpesa' ? 'border-slate-900' : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'mpesa' && <div className="w-2 h-2 rounded-full bg-slate-900" />}
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-slate-900 block">Lipa Na M-Pesa (Paybill)</span>
                        <span className="text-[11px] text-slate-500">Business No: 880100 &bull; A/c: 871599</span>
                      </div>
                    </div>
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                  </div>

                  <div
                    onClick={() => setPaymentMethod('delivery')}
                    className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                      paymentMethod === 'delivery' ? 'bg-slate-50' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'delivery' ? 'border-slate-900' : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'delivery' && <div className="w-2 h-2 rounded-full bg-slate-900" />}
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                          Pay on Delivery / In-Store Pickup
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Pay cash or M-Pesa upon parcel collection
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                    {formError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-4 px-6 rounded-xl font-extrabold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer bg-[#25D366] hover:bg-[#20ba59]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" /> Complete Order via WhatsApp
                </button>
              </section>
            </div>

            {/* RIGHT COLUMN: DESKTOP ORDER SUMMARY (STICKY) */}
            <div className="hidden lg:block lg:col-span-5 sticky top-8">
              <aside className="border border-slate-200 rounded-2xl bg-white p-6 space-y-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Order summary</h2>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="relative w-14 h-14 bg-slate-50 rounded-xl border border-slate-200 shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1 -right-1 bg-slate-700 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 truncate">{item.name}</p>
                        <p className="text-slate-400 text-[11px]">{item.size || 'Standard Fit'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-[11px] text-slate-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 ml-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">
                        KES {(parsePrice(item.price) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={applyPromo} className="flex gap-2">
                  <div className="relative flex-1 border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-slate-900">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Discount code or gift card"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>

                {promoMessage && (
                  <p className={`text-xs font-semibold ${discount > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {promoMessage}
                  </p>
                )}

                {/* Totals Breakdown */}
                <div className="space-y-2 text-xs border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">KES {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount (10%)</span>
                      <span>-KES {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500">
                    <div>
                      <span>Shipping</span>
                      <p className="text-[10px] text-slate-400">{selectedShipping.zone}</p>
                    </div>
                    <span className="font-bold text-slate-900">
                      {shippingFee === 0
                        ? <span className="text-emerald-600">FREE</span>
                        : `KES ${shippingFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-base font-extrabold text-slate-900 pt-3 border-t border-slate-100">
                    <span>Total</span>
                    <span className="text-lg">
                      KES {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-around border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-600" /> Secure Checkout</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Quality Guarantee</span>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>

      {/* SEARCHABLE SHIPPING MODAL FOR KENYA (Solves mobile viewport overflow) */}
      {shippingModalOpen && isKenya && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-xl max-h-[85vh] sm:rounded-2xl rounded-t-2xl flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Choose Shipping Destination</h3>
                <p className="text-xs text-slate-500">Search by estate, mall, street, or town in Kenya</p>
              </div>
              <button
                type="button"
                onClick={() => setShippingModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-slate-100 bg-slate-50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={zoneSearch}
                  onChange={(e) => setZoneSearch(e.target.value)}
                  placeholder="Type your area (e.g. Donholm, Kilimani, Ruaka, Thika...)"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900"
                  autoFocus
                />
              </div>

              {/* Category Filter Tabs */}
              <div className="flex gap-1.5 pt-2.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
                <button
                  type="button"
                  onClick={() => setZoneFilterTab('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                    zoneFilterTab === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  All Options
                </button>
                <button
                  type="button"
                  onClick={() => setZoneFilterTab('nairobi')}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                    zoneFilterTab === 'nairobi'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Nairobi Zones
                </button>
                <button
                  type="button"
                  onClick={() => setZoneFilterTab('pickup')}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                    zoneFilterTab === 'pickup'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Pickups (Free)
                </button>
                <button
                  type="button"
                  onClick={() => setZoneFilterTab('outside')}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                    zoneFilterTab === 'outside'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Outside Nairobi
                </button>
              </div>
            </div>

            {/* Scrollable Zones List */}
            <div className="overflow-y-auto divide-y divide-slate-100 p-2 max-h-[50vh]">
              {filteredZones.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No shipping zones found matching &quot;{zoneSearch}&quot;.
                </div>
              ) : (
                filteredZones.map((zone) => {
                  const isSelected = selectedShippingId === zone.id;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => {
                        setSelectedShippingId(zone.id);
                        setShippingModalOpen(false);
                      }}
                      className={`p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected ? 'bg-slate-100/80 border border-slate-900' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                            {zone.zone}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{zone.label}</h4>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{zone.areas}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900 block">
                          {zone.cost === 0 ? 'Free' : `Ksh ${zone.cost.toFixed(2)}`}
                        </span>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 pt-0.5">
                            <Check className="w-3 h-3" /> Selected
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}