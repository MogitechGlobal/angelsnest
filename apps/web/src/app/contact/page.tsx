// apps/web/src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Navigation,
  ArrowRight,
  MessageSquareCode,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

const TEMPLATE_MESSAGES = [
  {
    label: 'Store Directions',
    subject: 'Wholesale / Shop Visit',
    text: 'Hello Angeles Nest team! I am planning to visit your Biashara Street shop. Could you please send me detailed landmark directions to Shop M7 on the 1st Floor?',
  },
  {
    label: 'Delivery Rates',
    subject: 'Countrywide Delivery Status',
    text: 'Hi! I would like to know the doorstep delivery fees and delivery timeframe for shipping items to my town outside Nairobi.',
  },
  {
    label: 'Sizing & Fit Help',
    subject: 'Sizing & Fit Assistance',
    text: 'Hello! I need help picking the right size for my child. Could you guide me on the measurements for 3-5 years sizes?',
  },
  {
    label: 'Bulk Orders',
    subject: 'Wholesale / Shop Visit',
    text: 'Hi Angeles Nest! I am interested in purchasing kids clothing sets in bulk. Do you offer wholesale pricing or discounts for large orders?',
  },
  {
    label: 'Wholesale & Reseller',
    subject: 'Wholesale / Shop Visit',
    text: 'Hello Angeles Nest! I run a boutique/reselling business and want to place a bulk order for 3pc sets & dresses. Could you share your wholesale catalog, MOQ, and tier discounts?',
  },
];

export default function ContactPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedWaTemplateIndex, setSelectedWaTemplateIndex] = useState<number>(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const applyTemplate = (template: typeof TEMPLATE_MESSAGES[0]) => {
    setFormData((prev) => ({
      ...prev,
      subject: template.subject,
      message: template.text,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.message) {
      setSubmitted(true);
    }
  };

  const getDynamicWhatsAppUrl = () => {
    let textToSend = TEMPLATE_MESSAGES[selectedWaTemplateIndex]?.text;
    if (formData.message && formData.message.trim().length > 0) {
      textToSend = `Hello Angeles Nest! ${formData.message}`;
    }
    return `https://wa.me/254742871599?text=${encodeURIComponent(textToSend)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFA] text-stone-900 antialiased selection:bg-stone-200">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Compact Clean Header Strip */}
      <section className="border-b border-stone-200/80 bg-stone-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-stone-200/80 text-[10px] font-bold tracking-wide uppercase">
              <Sparkles className="h-3 w-3" style={{ color: brand.blue }} /> Customer Service
            </div>
            <h1 className="text-xl sm:text-2xl font-serif tracking-tight text-stone-900">
              Get in Touch with Us
            </h1>
            <p className="text-xs text-stone-500">
              Sizing advice, countrywide dispatch queries, and Nairobi showroom directions
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/shop"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs whitespace-nowrap"
            >
              Shop Collection
            </Link>
            <a
              href={getDynamicWhatsAppUrl()}
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
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Quick Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex items-start gap-3 shadow-2xs">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: brand.blue }}
            >
              <MapPin className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-semibold text-stone-900">Our Location</h3>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Biashara St, Zanna Exhibition<br />
                1st Floor, Shop M7, Nairobi
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex items-start gap-3 shadow-2xs">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: brand.pink }}
            >
              <Phone className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-semibold text-stone-900">Phone &amp; WhatsApp</h3>
              <a
                href="tel:+254742871599"
                className="text-[11px] text-stone-800 hover:text-stone-900 font-medium block"
              >
                +254 742 871599
              </a>
              <p className="text-[10px] text-stone-400">Direct response via WhatsApp</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex items-start gap-3 shadow-2xs">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: brand.blue }}
            >
              <Clock className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-semibold text-stone-900">Working Hours</h3>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Mon &ndash; Fri: 8:00 AM &ndash; 7:00 PM<br />
                Sat &amp; Sun: Closed
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex items-start gap-3 shadow-2xs">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: brand.pink }}
            >
              <Navigation className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-semibold text-stone-900">Delivery Info</h3>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Same-day CBD &amp; Nairobi dispatch<br />
                Countrywide parcel shipping
              </p>
            </div>
          </div>
        </div>

        {/* Form and Showroom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-5">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-stone-900">Message Received</h3>
                <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
                  Thank you for reaching out. Our team will review your inquiry and contact you promptly via phone or WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="mt-2 text-xs font-semibold underline text-stone-700 hover:text-stone-900 cursor-pointer"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-stone-100 pb-3">
                  <h2 className="text-base sm:text-lg font-serif font-semibold text-stone-900">
                    Send an Inquiry
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Leave your contact details and message below
                  </p>
                </div>

                {/* Quick Message Templates */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                    <MessageSquareCode className="h-3 w-3" style={{ color: brand.pink }} /> Quick Prompt Topics
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {TEMPLATE_MESSAGES.map((tmpl) => (
                      <button
                        key={tmpl.label}
                        type="button"
                        onClick={() => applyTemplate(tmpl)}
                        className="text-[11px] font-medium bg-stone-50 hover:bg-stone-100 border border-stone-200/80 text-stone-600 px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-left"
                      >
                        {tmpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. Wanjiku Mwangi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="0712 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="subject" className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white cursor-pointer"
                  >
                    <option>General Inquiry</option>
                    <option>Sizing &amp; Fit Assistance</option>
                    <option>Countrywide Delivery Status</option>
                    <option>Wholesale / Shop Visit</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell us what you're looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full font-semibold text-xs text-white shadow-2xs hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
                  style={{ backgroundColor: brand.pink }}
                >
                  <Send className="h-3 w-3" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Showroom & Direct WhatsApp Hub */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
            <div className="space-y-3">
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                style={{
                  color: brand.blue,
                  backgroundColor: `${brand.blue}10`,
                  borderColor: `${brand.blue}25`,
                }}
              >
                <MapPin className="h-3 w-3" /> Physical Store
              </span>

              <h3 className="text-base sm:text-lg font-serif font-semibold text-stone-900">
                Nairobi CBD Showroom
              </h3>

              <p className="text-xs text-stone-500 leading-relaxed">
                Feel fabric weights, verify fits, and collect your reserved orders directly at our store.
              </p>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: brand.blue }}
                >
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Biashara Street, Zanna Exhibition</p>
                  <p className="text-[11px] text-stone-500">First Floor, Shop M7, Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Block */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-700 font-semibold flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> WhatsApp Instant Query
                </p>
                <span className="text-[10px] text-stone-400">Select template</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {TEMPLATE_MESSAGES.map((tmpl, idx) => (
                  <button
                    key={tmpl.label}
                    type="button"
                    onClick={() => setSelectedWaTemplateIndex(idx)}
                    className={`text-[10px] font-medium px-2.5 py-1.5 rounded-lg text-left border transition-all cursor-pointer ${
                      selectedWaTemplateIndex === idx
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>

              <a
                href={getDynamicWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full font-semibold text-xs text-white shadow-2xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 bg-emerald-600 cursor-pointer"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-white" /> Open Selected Chat
              </a>
            </div>
          </div>

        </div>

        {/* Footer Navigation Link */}
        <div className="pt-2 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors"
          >
            Ready to shop? Browse all outfits <ArrowRight className="w-3.5 h-3.5" style={{ color: brand.pink }} />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}