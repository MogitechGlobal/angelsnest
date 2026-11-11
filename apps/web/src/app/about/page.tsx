// apps/web/src/app/about/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Truck,
  ArrowRight,
  Tag,
  Headphones,
  MapPin,
  MessageCircle,
  Star,
  Award,
  Check,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Honest Quality',
    description: 'What you see is what you receive. Breathable fabrics tailored to endure active play and repeated washing.',
    accent: brand.blue,
  },
  {
    icon: Tag,
    title: 'Fair Pricing',
    description: 'Thoughtfully priced kids wear providing accessible, long-lasting value for your family budget.',
    accent: brand.pink,
  },
  {
    icon: Truck,
    title: 'Countrywide Delivery',
    description: 'Prompt doorstep dispatch across Nairobi and reliable courier delivery to every town in Kenya.',
    accent: brand.pink,
  },
  {
    icon: Headphones,
    title: 'Personalized Support',
    description: 'Direct sizing advice and style recommendations via WhatsApp whenever you need assistance.',
    accent: brand.blue,
  },
  {
    icon: Sparkles,
    title: 'Curated Drops',
    description: 'Fresh seasonal arrivals handpicked regularly so your little ones stay stylish and comfortable.',
    accent: brand.pink,
  },
  {
    icon: MapPin,
    title: 'Physical Showroom',
    description: 'Visit us at Biashara Street, Zanna Exhibition, 1st Floor, Shop M7 to inspect fittings firsthand.',
    accent: brand.blue,
  },
];

export default function AboutPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFA] text-stone-900 antialiased selection:bg-stone-200">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Compact Minimal Header Strip */}
      <section className="border-b border-stone-200/80 bg-stone-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-stone-200/80 text-[10px] font-bold tracking-wide uppercase">
              <Sparkles className="h-3 w-3" style={{ color: brand.blue }} /> About Angeles Nest
            </div>
            <h1 className="text-xl sm:text-2xl font-serif tracking-tight text-stone-900">
              Dressing Childhood in Comfort &amp; Joy
            </h1>
            <p className="text-xs text-stone-500">
              Selected with care for children aged 6 months to 13 years
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/shop"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs whitespace-nowrap"
            >
              View Collection
            </Link>
            <a
              href="https://wa.me/254742871599?text=Hello%20Angeles%20Nest%2C%20I%20would%20like%20to%20learn%20more."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
              style={{ backgroundColor: brand.pink }}
            >
              <MessageCircle className="h-3 w-3 text-white" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        
        {/* Brand Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 border"
              style={{
                color: brand.pink,
                backgroundColor: `${brand.pink}10`,
                borderColor: `${brand.pink}25`,
              }}
            >
              <Award className="h-3 w-3" /> Our Mission
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-stone-900 leading-snug">
              Curated clothing crafted for play, celebrations, and growing adventures.
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              At Angeles Nest Collections, we believe children&apos;s apparel should be as vibrant, comfortable, and resilient as the little ones wearing them. From soft denim sets and everyday cotton essentials to statement party dresses and durable cargo trousers, every piece is hand-selected with fit and fabric integrity in mind.
            </p>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We know children grow rapidly and daily routines put heavy demands on stitching and seams. That is why our catalog prioritizes breathable cotton blends, reliable elasticated waistbands, and honest sizing for every stage from 6 months up to 13 years.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-700 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px]"
                  style={{ backgroundColor: brand.blue }}
                >
                  <Check className="w-2.5 h-2.5" />
                </span>
                Skin-Friendly Breathable Cotton
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px]"
                  style={{ backgroundColor: brand.pink }}
                >
                  <Check className="w-2.5 h-2.5" />
                </span>
                Reinforced Double-Stitching
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80"
                alt="Smiling child wearing modern kids fashion"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Subtle Floating Trust Badge */}
            <div className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-stone-200/80 shadow-md flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: brand.pink }}
              >
                <Heart className="h-4 w-4 fill-white" />
              </div>
              <div className="pr-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Trusted by Parents</p>
                <p className="text-xs font-semibold text-stone-900 flex items-center gap-1">
                  100% Kid-Approved <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Performance Indicators */}
        <section className="rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-100 shadow-2xs">
          <div className="pt-2 md:pt-0">
            <p className="text-xl sm:text-2xl font-serif font-semibold text-stone-900" style={{ color: brand.blue }}>
              Top Quality
            </p>
            <p className="text-[11px] text-stone-500 mt-0.5">Handpicked Outfits</p>
          </div>
          <div className="pt-2 md:pt-0">
            <p className="text-xl sm:text-2xl font-serif font-semibold text-stone-900" style={{ color: brand.pink }}>
              6m &ndash; 13y
            </p>
            <p className="text-[11px] text-stone-500 mt-0.5">Age Fits Covered</p>
          </div>
          <div className="pt-2 md:pt-0">
            <p className="text-xl sm:text-2xl font-serif font-semibold text-stone-900" style={{ color: brand.blue }}>
              100% Honest
            </p>
            <p className="text-[11px] text-stone-500 mt-0.5">True-to-Picture Items</p>
          </div>
          <div className="pt-2 md:pt-0">
            <p className="text-xl sm:text-2xl font-serif font-semibold text-stone-900" style={{ color: brand.pink }}>
              Nationwide
            </p>
            <p className="text-[11px] text-stone-500 mt-0.5">Doorstep &amp; Courier Shipping</p>
          </div>
        </section>

        {/* Why Choose Us Values Grid */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: brand.blue }}
            >
              The Angeles Nest Standard
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900 tracking-tight">
              Why Parents Return to Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-5 rounded-xl bg-white border border-stone-200/80 space-y-2.5 transition-all hover:border-stone-300 shadow-2xs"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: val.accent }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900">{val.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Clean Physical Store Card */}
        <section className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-2xs">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: brand.blue }}>
              <MapPin className="h-3.5 w-3.5" />
              <span>Nairobi CBD Showroom</span>
            </div>
            <h3 className="text-base sm:text-lg font-serif text-stone-900">
              Prefer to inspect fabric and sizing in person?
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Visit us at Biashara Street, Zanna Exhibition, First Floor, Shop M7. Feel the fabric weight, test waistbands, or pick up your reserved online orders directly.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
            <Link
              href="/contact"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors shadow-2xs"
            >
              Get Directions
            </Link>
            <a
              href="https://wa.me/254742871599?text=Hello%20Angeles%20Nest%2C%20I%20am%20coming%20to%20your%20shop."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors inline-flex items-center gap-1.5"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> Confirm Hours
            </a>
          </div>
        </section>

        {/* Clean Footer Link */}
        <div className="pt-2 pb-6 border-t border-stone-200/70 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors"
          >
            Browse all our available outfits <ArrowRight className="w-3.5 h-3.5" style={{ color: brand.pink }} />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}