'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, Sparkles, Truck, Smile, ArrowRight, Tag, Headphones, MapPin, MessageCircle, Star, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

export default function AboutPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 w-full overflow-x-hidden">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-5 max-w-[1600px] mx-auto space-y-6">
        
        {/* Minimized, Professional Compact Hero Section */}
        <div className="relative rounded-2xl text-white px-6 py-5 sm:py-6 overflow-hidden shadow-sm w-full flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: brand.blue }}>
          <div className="relative z-10 space-y-1.5 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/30 shadow-sm">
              <Sparkles className="h-3 w-3" /> About Us &bull; Angeles Nest Collections
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Dressing Your Little Ones in Comfort &amp; Style
            </h1>
            <p className="text-white/90 text-xs sm:text-sm font-medium max-w-xl">
              Your trusted destination for stylish, comfortable, and affordable baby &amp; kids&apos; clothing. Selected with care for value and joy.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 shrink-0">
            <Link 
              href="/shop" 
              className="px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 text-white flex items-center gap-1.5 whitespace-nowrap"
              style={{ backgroundColor: brand.pink }}
            >
              Shop Collection <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a 
              href="https://wa.me/254742871599" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 text-slate-900 bg-white flex items-center gap-1.5 whitespace-nowrap"
            >
              <MessageCircle className="h-3.5 w-3.5" style={{ color: brand.pink }} /> WhatsApp Us
            </a>
          </div>
          
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-20 bg-white" />
        </div>

        {/* Brand Story Section with New Image & Revamped Aesthetics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 inline-flex items-center gap-1.5 border border-slate-200">
              <Award className="h-3 w-3" style={{ color: brand.pink }} /> Our Story &amp; Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Curated Fashion Made for Play, Parties, and Everyday Adventures
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              At Angeles Nest Collections, we believe children’s clothing should be as vibrant and dynamic as the kids who wear them. Whether it&apos;s a soft denim set for everyday play, an elegant dress for a family celebration, or sturdy cargo pants built for adventure, every piece in our catalog is handpicked for quality and comfort.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We know how fast kids grow and how demanding their day-to-day activities can be on fabrics. That&apos;s why we focus on breathable materials, durable stitching, and versatile fits that adjust seamlessly as your children grow from 6 months up to 13 years.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600 font-bold text-xs">✓</span>
                <span className="text-xs font-semibold text-slate-700">Skin-Friendly Fabrics</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-pink-600 font-bold text-xs">✓</span>
                <span className="text-xs font-semibold text-slate-700">Durable Stitches</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80"
                alt="Happy child in stylish clothing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-xs animate-fade-in">
              <div className="p-2.5 rounded-xl text-white shrink-0 shadow-sm" style={{ backgroundColor: brand.pink }}>
                <Heart className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Trusted by Parents</p>
                <p className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                  <span>100% Kid-Approved</span> <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Shop With Us Section */}
        <section className="space-y-4">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Why Parents Choose Angeles Nest</h2>
            <p className="text-slate-500 text-xs mt-1">We take pride in offering a seamless, transparent shopping experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 group">
              <div className="p-3 rounded-xl text-white shrink-0 shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: brand.blue }}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Premium &amp; Honest Quality</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  What you see is what you get. Our outfits use breathable fabrics designed to withstand countless washes.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 group">
              <div className="p-3 rounded-xl text-white shrink-0 shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: brand.pink }}>
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Affordable Prices</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Top-tier children&apos;s fashion priced fairly to give you excellent value for your hard-earned money.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 group">
              <div className="p-3 rounded-xl text-white shrink-0 shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: brand.pink }}>
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Countrywide Delivery</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Fast, reliable doorstep shipping or preferred pick-up station dispatch right across the country.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 group">
              <div className="p-3 rounded-xl text-white shrink-0 shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: brand.blue }}>
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Friendly Support</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Responsive customer service ready to assist you with sizing, outfit pairing, and order tracking.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 group">
              <div className="p-3 rounded-xl text-white shrink-0 shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: brand.pink }}>
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Regular New Arrivals</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Fresh styles and seasonal collections added frequently so your little ones are always ahead in fashion.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 group">
              <div className="p-3 rounded-xl text-white shrink-0 shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: brand.blue }}>
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Physical Location</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Visit our Nairobi shop on Biashara Street, Zanna Exhibition, First Floor, Shop M7 to inspect items firsthand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-2">
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: brand.blue }}>Top Quality</p>
            <p className="text-xs text-slate-600 font-medium mt-1">Curated Sets &amp; Outfits</p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: brand.pink }}>6m - 13y</p>
            <p className="text-xs text-slate-600 font-medium mt-1">Age Fits Covered</p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: brand.blue }}>100%</p>
            <p className="text-xs text-slate-600 font-medium mt-1">Honest Descriptions</p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: brand.pink }}>Fast</p>
            <p className="text-xs text-slate-600 font-medium mt-1">Nationwide Shipping</p>
          </div>
        </section>

        {/* CTA Section with Brand Gradient Background */}
        <section className="rounded-2xl text-white p-8 sm:p-10 text-center flex flex-col items-center justify-center gap-3.5 shadow-sm relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${brand.pink}, ${brand.blue})` }}>
          <Smile className="h-10 w-10 text-white relative z-10" />
          <h2 className="text-xl sm:text-2xl font-extrabold relative z-10">Ready to Refresh Your Child’s Wardrobe?</h2>
          <p className="text-white/95 text-xs sm:text-sm max-w-lg relative z-10 font-medium leading-relaxed">
            Explore our latest collections of dresses, two-piece sets, cargo pants, and streetwear today.
          </p>
          <Link
            href="/shop"
            className="mt-2 inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 bg-white px-6 py-3 rounded-xl transition-all shadow-lg hover:opacity-95 hover:scale-105 relative z-10"
          >
            Explore Collection <ArrowRight className="h-4 w-4" style={{ color: brand.pink }} />
          </Link>
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-20 bg-white" />
        </section>

      </main>

      <Footer />
    </div>
  );
}