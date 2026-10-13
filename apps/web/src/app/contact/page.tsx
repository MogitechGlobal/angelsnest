'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Send, CheckCircle2, MessageCircle, Sparkles, Navigation, ArrowRight, MessageSquareCode } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

const TEMPLATE_MESSAGES = [
  {
    label: '📍 Store Directions',
    subject: 'Wholesale / Shop Visit',
    text: 'Hello Angeles Nest team! I am planning to visit your Biashara Street shop. Could you please send me detailed landmark directions to Shop M7 on the 1st Floor?',
  },
  {
    label: '🚚 Delivery & Dispatch Rates',
    subject: 'Countrywide Delivery Status',
    text: 'Hi! I would like to know the doorstep delivery fees and delivery timeframe for shipping items to my town outside Nairobi.',
  },
  {
    label: '📐 Sizing & Fit Help',
    subject: 'Sizing & Fit Assistance',
    text: 'Hello! I need help picking the right size for my child. Could you guide me on the measurements for 3-5 years sizes?',
  },
  {
    label: '🛍️ Bulk & Wholesale Orders',
    subject: 'Wholesale / Shop Visit',
    text: 'Hi Angeles Nest! I am interested in purchasing kids clothing sets in bulk. Do you offer wholesale pricing or discounts for large orders?',
  },
  {
    label: '🛍️ Wholesale & Reseller Rates',
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

  // Build WhatsApp URL using the selected WhatsApp quick query or custom form message
  const getDynamicWhatsAppUrl = () => {
    let textToSend = TEMPLATE_MESSAGES[selectedWaTemplateIndex]?.text;

    // If form message exists and user typed custom content, send that instead
    if (formData.message && formData.message.trim().length > 0) {
      textToSend = `Hello Angeles Nest! ${formData.message}`;
    }

    return `https://wa.me/254742871599?text=${encodeURIComponent(textToSend)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 w-full overflow-x-hidden">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-5 max-w-[1600px] mx-auto space-y-6">

        {/* Minimized, Professional Compact Hero Section */}
        <div className="relative rounded-2xl text-white px-6 py-4 sm:py-5 overflow-hidden shadow-sm w-full flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: brand.blue }}>
          <div className="relative z-10 space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/30">
              <Sparkles className="h-3 w-3" /> Get in Touch &bull; Angeles Nest Collections
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
              We&apos;re Here to Help You &amp; Your Little Ones
            </h1>
            <p className="text-white/90 text-xs font-medium max-w-xl">
              Have questions about clothing sizes, countrywide delivery, or visiting our Nairobi store? Reach out to our friendly team anytime!
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
              href={getDynamicWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:opacity-95 text-slate-900 bg-white flex items-center gap-1.5 whitespace-nowrap"
            >
              <MessageCircle className="h-3.5 w-3.5" style={{ color: brand.pink }} /> WhatsApp Us
            </a>
          </div>

          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-20 bg-white" />
        </div>

        {/* Quick Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl text-white shrink-0 shadow-sm" style={{ backgroundColor: brand.blue }}>
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Our Location</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Biashara Street, Zanna Exhibition<br />
                1st Floor, Shop M7, Nairobi
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl text-white shrink-0 shadow-sm" style={{ backgroundColor: brand.pink }}>
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Phone &amp; WhatsApp</h3>
              <a href="tel:+254742871599" className="text-slate-600 hover:text-slate-900 text-xs font-semibold block transition-colors">
                +254 742 871599
              </a>
              <p className="text-slate-400 text-[10px] mt-0.5">Fast replies during business hours</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl text-white shrink-0 shadow-sm" style={{ backgroundColor: brand.blue }}>
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Working Hours</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Mon - Fri: 8:00 AM - 7:00 PM<br />
                Sat &amp; Sun: Closed
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl text-white shrink-0 shadow-sm" style={{ backgroundColor: brand.pink }}>
              <Navigation className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Delivery Info</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Countrywide shipping available<br />
                Same-day dispatch in Nairobi
              </p>
            </div>
          </div>
        </div>

        {/* Main Form & Interactive Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm">
            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed">
                  Thank you for reaching out. Our support team has received your message and will get back to you or call you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', subject: 'General Inquiry', message: '' }); }}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-md transition-all hover:opacity-95"
                  style={{ backgroundColor: brand.blue }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600 inline-block border border-slate-200 mb-2">
                    Quick Inquiry Form
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Send Us a Message</h2>
                  <p className="text-slate-500 text-xs mt-1">Have a question about sizing or order tracking? Drop us a note below.</p>
                </div>

                {/* Quick Template Selector */}
                <div className="space-y-2 pt-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                    <MessageSquareCode className="h-3.5 w-3.5" style={{ color: brand.pink }} /> Quick Template Messages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TEMPLATE_MESSAGES.map((tmpl) => (
                      <button
                        key={tmpl.label}
                        type="button"
                        onClick={() => applyTemplate(tmpl)}
                        className="text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 px-3 py-1.5 rounded-xl transition-all active:scale-95 text-left"
                      >
                        {tmpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Wanjiku Mwangi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#62c6e6] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="+254 7XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#62c6e6] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#62c6e6] focus:bg-white transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Sizing &amp; Fit Assistance</option>
                    <option>Countrywide Delivery Status</option>
                    <option>Wholesale / Shop Visit</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell us what you're looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#62c6e6] focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs text-white shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  style={{ backgroundColor: brand.pink }}
                >
                  <Send className="h-3.5 w-3.5" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Physical Location & Map Card (Clean White Surface with Brand Accents) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border" style={{ color: brand.blue, borderColor: `${brand.blue}40`, backgroundColor: `${brand.blue}10` }}>
                <MapPin className="h-3.5 w-3.5" /> Visit Our Store
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">Angeles Nest Nairobi Showroom</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We invite you to visit our physical shop to feel the fabric quality, check out exact sizes, and browse our newest arrivals in person.
              </p>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl text-white shadow-sm" style={{ backgroundColor: brand.blue }}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Biashara Street, Zanna Exhibition</p>
                    <p className="text-[11px] text-slate-500">First Floor, Shop M7, Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Template Option Selector for Immediate Chat */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> Choose a WhatsApp Chat Topic:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {TEMPLATE_MESSAGES.map((tmpl, idx) => (
                  <button
                    key={tmpl.label}
                    type="button"
                    onClick={() => setSelectedWaTemplateIndex(idx)}
                    className={`text-[10px] font-bold px-2.5 py-2 rounded-xl text-left border transition-all ${selectedWaTemplateIndex === idx
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
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
                className="w-full py-3.5 rounded-xl font-extrabold text-xs text-white shadow-md transition-all hover:opacity-95 flex items-center justify-center gap-2 bg-emerald-600 active:scale-95 mt-2"
              >
                <MessageCircle className="h-4 w-4 fill-white" /> Chat with Us on WhatsApp Now
              </a>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}