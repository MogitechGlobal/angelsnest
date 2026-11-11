// apps/web/src/app/account/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  MapPin,
  Phone,
  ShoppingBag,
  Heart,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Lock,
  LogOut,
  Mail,
  Loader2,
  AlertCircle,
  Plus,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://angelsnest-blond.vercel.app';

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  default_location: string;
}

interface AddressItem {
  id: string;
  recipient_name: string;
  phone: string;
  country: string;
  city: string;
  street_address: string;
  preferred_agent_or_courier?: string;
  postal_code?: string;
}

interface OrderItem {
  id: string;
  order_reference: string;
  total_amount: number | string;
  shipping_method: string;
  payment_method: string;
  status: string;
  created_at: string;
  items: any[];
}

export default function AccountPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  // Customer Data
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');

  // Auth Inputs
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Edit Profile States
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Add Address Modal / Form States
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newAgent, setNewAgent] = useState('');

  // 1. Initial Load & Session Verification
  useEffect(() => {
    const savedToken = localStorage.getItem('angelsnest_auth_token');
    if (savedToken) {
      setToken(savedToken);
      fetchAccountData(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAccountData = async (jwt: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/account/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCustomer(data.user);
        setAddresses(data.addresses || []);
        setOrders(data.orders || []);
        setEditName(data.user.name);
        setEditPhone(data.user.phone);
        setEditLocation(data.user.default_location || '');
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error('Error fetching account data', err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Authentication Handlers
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSubmitting(true);

    const endpoint = authMode === 'signin' ? 'auth/login' : 'auth/register';
    const payload =
      authMode === 'signin'
        ? { email: authEmail, password: authPassword }
        : { name: authName, email: authEmail, phone: authPhone, password: authPassword };

    try {
      const res = await fetch(`${API_BASE}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Authentication failed. Please check your credentials.');
        setAuthSubmitting(false);
        return;
      }

      localStorage.setItem('angelsnest_auth_token', data.token);
      setToken(data.token);
      await fetchAccountData(data.token);
    } catch (err) {
      setAuthError('Connection error. Please try again in a few moments.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('angelsnest_auth_token');
    setToken(null);
    setCustomer(null);
    setAddresses([]);
    setOrders([]);
  };

  // 3. Profile Update Handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/account/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editName,
          phone: editPhone,
          defaultLocation: editLocation,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCustomer(data.user);
        setIsEditing(false);
        setActionSuccess('Profile updated successfully!');
        setTimeout(() => setActionSuccess(''), 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Address Creation Handler
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/account/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipientName: newRecipient,
          phone: newPhone,
          country: 'Kenya',
          city: newCity,
          streetAddress: newStreet,
          preferredAgent: newAgent,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAddresses([data.address, ...addresses]);
        setShowAddressForm(false);
        setNewRecipient('');
        setNewPhone('');
        setNewCity('');
        setNewStreet('');
        setNewAgent('');
        setActionSuccess('New delivery address saved!');
        setTimeout(() => setActionSuccess(''), 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFA] text-stone-900 antialiased selection:bg-stone-200">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Header Strip */}
      <section className="border-b border-stone-200/80 bg-stone-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-stone-200/80 text-[10px] font-bold tracking-wide uppercase">
              <Sparkles className="h-3 w-3" style={{ color: brand.blue }} /> Customer Area
            </div>
            <h1 className="text-xl sm:text-2xl font-serif tracking-tight text-stone-900">
              {customer ? `Welcome back, ${customer.name}` : 'Customer Portal'}
            </h1>
            <p className="text-xs text-stone-500">
              {customer
                ? 'Manage your personal account, saved delivery destinations, and verified orders.'
                : 'Sign in or create your Angeles Nest customer profile to continue.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/shop"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs whitespace-nowrap"
            >
              Shop Catalog
            </Link>
            <a
              href="https://wa.me/254742871599?text=Hello%20Angeles%20Nest%2C%20I%20need%20assistance%20with%20my%20account."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
              style={{ backgroundColor: brand.pink }}
            >
              <MessageCircle className="h-3 w-3 text-white" /> WhatsApp Support
            </a>
          </div>
        </div>
      </section>

      {/* Main Content View */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {actionSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {actionSuccess}
          </div>
        )}

        {/* LOADING STATE */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3 text-stone-500">
            <Loader2 className="w-6 h-6 animate-spin text-stone-700" />
            <p className="text-xs font-medium">Securing session...</p>
          </div>
        ) : !customer ? (
          /* AUTHENTICATION VIEW: SIGN IN / CREATE ACCOUNT */
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="text-center space-y-1">
              <div
                className="w-10 h-10 rounded-full mx-auto flex items-center justify-center text-white mb-2"
                style={{ backgroundColor: brand.blue }}
              >
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                {authMode === 'signin' ? 'Sign into your account' : 'Create customer account'}
              </h2>
              <p className="text-xs text-stone-500">
                {authMode === 'signin'
                  ? 'Access your profile and saved WhatsApp orders'
                  : 'Join to save your addresses and streamline checkout'}
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Mwangi"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0712 345 678"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={authSubmitting}
                className="w-full py-3 rounded-full text-xs font-semibold text-white shadow-2xs transition-all hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
                style={{ backgroundColor: brand.pink }}
              >
                {authSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : authMode === 'signin' ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-stone-500 border-t border-stone-100">
              {authMode === 'signin' ? (
                <p>
                  Don&apos;t have an account yet?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setAuthError('');
                    }}
                    className="font-bold underline text-stone-900 hover:text-stone-700 cursor-pointer"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('signin');
                      setAuthError('');
                    }}
                    className="font-bold underline text-stone-900 hover:text-stone-700 cursor-pointer"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>
          </div>
        ) : (
          /* AUTHENTICATED USER PORTAL VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-stone-900 text-stone-50 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <User
                  className="h-3.5 w-3.5"
                  style={{ color: activeTab === 'profile' ? brand.blue : undefined }}
                />
                Profile Details
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-stone-900 text-stone-50 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <ShoppingBag
                  className="h-3.5 w-3.5"
                  style={{ color: activeTab === 'orders' ? brand.blue : undefined }}
                />
                Orders ({orders.length})
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-stone-900 text-stone-50 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <MapPin
                  className="h-3.5 w-3.5"
                  style={{ color: activeTab === 'addresses' ? brand.blue : undefined }}
                />
                Saved Locations ({addresses.length})
              </button>

              <div className="pt-2 border-t border-stone-100 space-y-1">
                <Link
                  href="/wishlist"
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                >
                  <Heart className="h-3.5 w-3.5" style={{ color: brand.pink }} />
                  Saved Wishlist
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </button>
              </div>
            </aside>

            {/* Panel Area */}
            <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs">
              {/* 1. Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div>
                      <h2 className="text-base font-serif font-semibold text-stone-900">
                        Personal Details
                      </h2>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Your verified details stored on the server for quick dispatch
                      </p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-3.5 py-1 rounded-full text-xs font-semibold border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          WhatsApp Phone
                        </label>
                        <input
                          type="tel"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Preferred Pickup / Destination
                        </label>
                        <input
                          type="text"
                          value={editLocation}
                          onChange={(e) => setEditLocation(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-full text-xs font-semibold text-white shadow-2xs hover:opacity-95 transition-opacity cursor-pointer"
                          style={{ backgroundColor: brand.pink }}
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 rounded-full text-xs font-semibold border border-stone-300 text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Account Name
                        </span>
                        <p className="text-xs font-semibold text-stone-900">{customer.name}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          WhatsApp Contact
                        </span>
                        <p className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-emerald-600" /> {customer.phone}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Verified Email
                        </span>
                        <p className="text-xs font-semibold text-stone-900">{customer.email}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Default Pickup
                        </span>
                        <p className="text-xs font-semibold text-stone-900">
                          {customer.default_location || 'Showroom Pickup'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="border-b border-stone-100 pb-3">
                    <h2 className="text-base font-serif font-semibold text-stone-900">Order History</h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Your orders synced across WhatsApp and online checkout
                    </p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center bg-stone-50 rounded-2xl border border-stone-200/70 p-6 space-y-3">
                      <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-emerald-600 shadow-2xs">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-stone-900">No placed orders yet</h3>
                        <p className="text-[11px] text-stone-500 max-w-sm leading-relaxed">
                          Once you check out via WhatsApp, your order record and dispatch references will appear here.
                        </p>
                      </div>
                      <Link
                        href="/shop"
                        className="mt-2 px-4 py-2 rounded-full font-semibold text-xs text-white shadow-2xs transition-opacity hover:opacity-95 inline-flex items-center gap-1.5"
                        style={{ backgroundColor: brand.blue }}
                      >
                        Shop Now <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-stone-100">
                      {orders.map((o) => (
                        <div key={o.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                          <div>
                            <span className="font-bold text-stone-900">Ref: #{o.order_reference}</span>
                            <p className="text-[11px] text-stone-500">
                              {o.shipping_method} &bull; {new Date(o.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-stone-900 block">
                              KES {Number(o.total_amount).toLocaleString()}
                            </span>
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {o.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 3. Saved Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div>
                      <h2 className="text-base font-serif font-semibold text-stone-900">
                        Delivery &amp; Pickup Locations
                      </h2>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Saved estates, Pick Up Mtaani agents, or upcountry drop points
                      </p>
                    </div>
                    {!showAddressForm && (
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-95 inline-flex items-center gap-1.5 cursor-pointer"
                        style={{ backgroundColor: brand.blue }}
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Location
                      </button>
                    )}
                  </div>

                  {showAddressForm && (
                    <form
                      onSubmit={handleSaveAddress}
                      className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3 max-w-lg mb-4"
                    >
                      <h4 className="text-xs font-bold text-stone-800">Add New Destination</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          required
                          placeholder="Recipient Name"
                          value={newRecipient}
                          onChange={(e) => setNewRecipient(e.target.value)}
                          className="bg-white border border-stone-200 rounded-lg p-2 text-xs"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Contact Phone"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="bg-white border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Street, Estate, House/Office Number"
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          required
                          placeholder="City / Town (e.g. Nairobi)"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="bg-white border border-stone-200 rounded-lg p-2 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Pick Up Mtaani Agent / Courier"
                          value={newAgent}
                          onChange={(e) => setNewAgent(e.target.value)}
                          className="bg-white border border-stone-200 rounded-lg p-2 text-xs"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white cursor-pointer"
                          style={{ backgroundColor: brand.pink }}
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddressForm(false)}
                          className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-stone-300 text-stone-600 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Default Showroom Pickup Card */}
                    <div className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: brand.blue }}>
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Central Showroom (Free Pickup)</span>
                      </div>
                      <h4 className="font-semibold text-xs text-stone-900">Biashara Street Showroom</h4>
                      <p className="text-[11px] text-stone-500 leading-relaxed">
                        Zanna Exhibition, 1st Floor, Shop M7, Nairobi CBD.
                      </p>
                    </div>

                    {/* Customer's Added Locations */}
                    {addresses.map((addr) => (
                      <div key={addr.id} className="p-4 rounded-xl border border-stone-200/80 bg-white space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
                          <MapPin className="h-3.5 w-3.5" style={{ color: brand.pink }} />
                          <span>{addr.city}, Kenya</span>
                        </div>
                        <h4 className="font-semibold text-xs text-stone-900">{addr.recipient_name}</h4>
                        <p className="text-[11px] text-stone-500 leading-relaxed">{addr.street_address}</p>
                        {addr.preferred_agent_or_courier && (
                          <p className="text-[10px] text-stone-400">Agent: {addr.preferred_agent_or_courier}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}