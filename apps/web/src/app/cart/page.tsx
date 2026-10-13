'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, MessageCircle, Tag, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

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

export default function CartPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('angelsnest_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Consolidate duplicate products into a single entry with aggregated quantities
        const consolidatedMap = new Map<string, CartItem>();

        parsed.forEach((item: any) => {
          const itemId = item.id;
          const qtyToAdd = item.quantity || 1;

          if (consolidatedMap.has(itemId)) {
            const existing = consolidatedMap.get(itemId)!;
            existing.quantity += qtyToAdd;
          } else {
            consolidatedMap.set(itemId, {
              ...item,
              quantity: qtyToAdd,
              size: item.size || item.fit || 'Standard Fit',
              color: item.color || 'As shown',
            });
          }
        });

        const consolidatedItems = Array.from(consolidatedMap.values());
        setCartItems(consolidatedItems);
        // Update local storage with clean consolidated items
        localStorage.setItem('angelsnest_cart', JSON.stringify(consolidatedItems));
      } catch (e) {
        console.error('Failed to load cart from localStorage', e);
      }
    }
  }, []);

  const updateCartStorage = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem('angelsnest_cart', JSON.stringify(updatedItems));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
    updateCartStorage(updated);
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    updateCartStorage(updated);
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'ANGELES10') {
      setDiscount(10);
      setPromoMessage('10% discount applied successfully!');
    } else {
      setPromoMessage('Invalid promo code. Try "ANGELES10"');
    }
  };

  // Helper to convert price string ("KES 1,800.00") or number to numeric value
  const getNumericPrice = (price: string | number): number => {
    if (typeof price === 'number') return price;
    const cleaned = price.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + getNumericPrice(item.price) * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const shippingFee = subtotal > 5000 ? 0 : 350; // Free shipping over KES 5,000
  const total = subtotal - discountAmount + (cartItems.length > 0 ? shippingFee : 0);

  // Generate WhatsApp Checkout URL
  const generateWhatsAppCheckout = () => {
    const itemList = cartItems
      .map(item => `- ${item.name} (${item.size}) x${item.quantity} @ ${typeof item.price === 'number' ? `KES ${item.price.toLocaleString()}` : item.price}`)
      .join('\n');
    
    const message = encodeURIComponent(
      `Hello Angeles Nest Collections! I would like to place an order for the following items:\n\n${itemList}\n\nSubtotal: KES ${subtotal.toLocaleString()}\nDiscount: KES ${discountAmount.toLocaleString()}\nShipping: KES ${shippingFee.toLocaleString()}\n*Total: KES ${total.toLocaleString()}*\n\nPlease advise on delivery and payment.`
    );

    return `https://wa.me/254742871599?text=${message}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 w-full overflow-x-hidden">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 max-w-[1600px] mx-auto space-y-6">
        
        {/* Compact Hero Header */}
        <div className="relative rounded-2xl text-white px-6 py-5 overflow-hidden shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: brand.blue }}>
          <div className="relative z-10 space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/30 shadow-sm">
              <ShoppingBag className="h-3 w-3" /> Your Shopping Bag &bull; Angeles Nest
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Review Your Selected Outfits
            </h1>
            <p className="text-white/90 text-xs font-medium max-w-lg">
              Check your sizes, quantities, and complete your order instantly via WhatsApp or checkout.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 shrink-0">
            <Link 
              href="/shop" 
              className="px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 text-slate-900 bg-white flex items-center gap-1.5 whitespace-nowrap"
            >
              Continue Shopping <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-20 bg-white" />
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-4 shadow-sm max-w-2xl mx-auto my-10">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 shadow-inner">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Your bag is empty</h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
              Explore our delightful collection of baby dresses, two-piece sets, and stylish outfits to fill your bag with joy!
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:opacity-95"
                style={{ backgroundColor: brand.pink }}
              >
                Start Shopping Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Items List (2 Columns) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
                <div className="p-4 sm:p-5 bg-slate-50/70 flex items-center justify-between">
                  <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>
                  <span className="text-xs text-slate-500 font-medium">Biashara St, Nairobi Shop</span>
                </div>

                {cartItems.map((item, index) => {
                  const itemPriceNum = getNumericPrice(item.price);
                  return (
                    <div key={`${item.id}-${index}`} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{item.name}</h3>
                          <p className="text-slate-500 text-[11px]">Size/Fit: <span className="font-semibold text-slate-700">{item.size}</span></p>
                          <p className="font-extrabold text-xs" style={{ color: brand.pink }}>
                            {typeof item.price === 'number' ? `KES ${item.price.toLocaleString()}` : item.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 text-xs font-extrabold text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="font-extrabold text-xs sm:text-sm text-slate-900 min-w-[80px] text-right">
                          KES {(itemPriceNum * item.quantity).toLocaleString()}
                        </p>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Perks Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                  <div className="p-2.5 rounded-xl text-white shrink-0" style={{ backgroundColor: brand.blue }}>
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Countrywide Delivery</h4>
                    <p className="text-[11px] text-slate-500">Free delivery on orders over KES 5,000</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                  <div className="p-2.5 rounded-xl text-white shrink-0" style={{ backgroundColor: brand.pink }}>
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">100% Honest Quality</h4>
                    <p className="text-[11px] text-slate-500">Inspect at our Nairobi Biashara St shop</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Column (1 Column) */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
                <h2 className="font-extrabold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" style={{ color: brand.pink }} /> Order Summary
                </h2>

                {/* Promo Code Input */}
                <form onSubmit={applyPromo} className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-500 flex items-center gap-1">
                    <Tag className="h-3 w-3" /> Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. ANGELES10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-sky-400"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all hover:opacity-95"
                      style={{ backgroundColor: brand.blue }}
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] font-semibold mt-1 ${discount > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {promoMessage}
                    </p>
                  )}
                </form>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">KES {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount ({discount}%)</span>
                      <span>- KES {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-slate-900">
                      {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `KES ${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 pt-3 border-t border-slate-100">
                    <span>Total</span>
                    <span style={{ color: brand.pink }}>KES {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* WhatsApp Quick Checkout Button */}
                <div className="pt-2 space-y-2">
                  <a
                    href={generateWhatsAppCheckout()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-lg transition-all hover:opacity-95 flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <MessageCircle className="h-4 w-4 fill-white" /> Checkout via WhatsApp
                  </a>
                  
                  <Link
                    href="/shop"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    Keep Shopping
                  </Link>
                </div>

                <p className="text-[10px] text-center text-slate-400 pt-1">
                  Secure checkout &bull; Pay via M-Pesa or Cash on Delivery/Pickup
                </p>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}