// apps/web/src/app/account/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, MapPin, Phone, ShoppingBag, Heart, MessageCircle, ShieldCheck, LogOut, ArrowRight, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

export default function AccountPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  
  // Simulated customer state (can be connected to local storage or auth later)
  const [customer, setCustomer] = useState({
    name: 'Parent / Shopper',
    phone: '+254 700 000000',
    email: 'shopper@angelsnest.co.ke',
    defaultLocation: 'Nairobi (Biashara Street Pickup)',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 w-full overflow-x-hidden">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* Compact Hero Banner */}
        <div className="relative rounded-2xl text-white px-6 py-5 overflow-hidden shadow-sm w-full flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: brand.pink }}>
          <div className="relative z-10 space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/30">
              <User className="h-3 w-3" /> Customer Portal &bull; Angeles Nest
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
              Welcome back, {customer.name}!
            </h1>
            <p className="text-white/90 text-xs font-medium">
              Manage your personal details, track your WhatsApp orders, and view pickup info.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 shrink-0">
            <a 
              href="https://wa.me/254742871599?text=Hello%20Angeles%20Nest%2C%20I%20need%20support%20with%20my%20account." 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 text-slate-900 bg-white whitespace-nowrap flex items-center gap-1.5"
            >
              <MessageCircle className="h-3.5 w-3.5" style={{ color: brand.pink }} /> WhatsApp Support
            </a>
          </div>
          
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-20 bg-white" />
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Profile updated successfully!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 h-fit">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'profile' ? 'text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
              style={activeTab === 'profile' ? { backgroundColor: brand.blue } : {}}
            >
              <User className="h-4 w-4" /> Profile &amp; Contact
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders' ? 'text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
              style={activeTab === 'orders' ? { backgroundColor: brand.blue } : {}}
            >
              <ShoppingBag className="h-4 w-4" /> WhatsApp Orders History
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'addresses' ? 'text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
              style={activeTab === 'addresses' ? { backgroundColor: brand.blue } : {}}
            >
              <MapPin className="h-4 w-4" /> Delivery &amp; Pickup Info
            </button>

            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/wishlist"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                <Heart className="h-4 w-4 text-[#e41575]" /> My Wishlist
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">Personal Information</h2>
                    <p className="text-xs text-slate-500">Update your contact details for smooth WhatsApp order processing.</p>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#62c6e6]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp)</label>
                      <input
                        type="text"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#62c6e6]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#62c6e6]"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all"
                        style={{ backgroundColor: brand.pink }}
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Full Name</span>
                      <p className="text-xs font-bold text-slate-900">{customer.name}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">WhatsApp Phone</span>
                      <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-emerald-600" /> {customer.phone}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Address</span>
                      <p className="text-xs font-bold text-slate-900">{customer.email}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Preferred Location</span>
                      <p className="text-xs font-bold text-slate-900">{customer.defaultLocation}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-base font-extrabold text-slate-900">WhatsApp Order History</h2>
                  <p className="text-xs text-slate-500">Orders placed directly through our WhatsApp checkout.</p>
                </div>

                <div className="py-12 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border border-slate-200/80 p-6 space-y-3">
                  <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">Ready to place your first order?</h3>
                    <p className="text-xs text-slate-500 max-w-md">
                      Browse our collection and click any &quot;Order via WhatsApp&quot; button to send your cart items instantly to our team.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all hover:opacity-95 inline-flex items-center gap-2"
                    style={{ backgroundColor: brand.blue }}
                  >
                    Start Shopping <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-base font-extrabold text-slate-900">Delivery &amp; Pickup Information</h2>
                  <p className="text-xs text-slate-500">Collect from our Nairobi showroom or choose countrywide doorstep delivery.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border-2 border-[#62c6e6]/40 bg-sky-50/40 space-y-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: brand.blue }}>
                      Physical Showroom
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">Nairobi Store Location</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Biashara Street, Zanna Exhibition, First Floor, Shop M7.<br />
                      Come feel the fabric quality firsthand!
                    </p>
                    <span className="text-[11px] font-bold text-slate-900 block pt-1">Tel: +254 742 871599</span>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-sm">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900">
                      Countrywide Shipping
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">Fast Doorstep Delivery</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We dispatch countrywide across Kenya via reliable courier services. Delivery fee calculated based on location during WhatsApp checkout.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}