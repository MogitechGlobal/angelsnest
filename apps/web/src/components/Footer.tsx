'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, X, Send, Sparkles, ChevronRight } from 'lucide-react';

const brand = {
  blue: '#62c6e6',
  pink: '#e41575',
};

export default function Footer() {
  const [year, setYear] = useState<number | string>('2026');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const encoded = encodeURIComponent(chatMessage);
    window.open(`https://wa.me/254742871599?text=${encoded}`, '_blank');
    setChatMessage('');
  };

  return (
    <footer className="w-full bg-white border-t border-stone-200/80 text-stone-600 pt-10 sm:pt-14 pb-8 mt-16 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Top Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-2.5 font-serif font-bold text-lg text-stone-900 tracking-tight">
              <img 
                src="/android-chrome-192x192.png" 
                alt="Angeles Nest Logo" 
                className="w-8 h-8 object-contain" 
              />
              <span>Angeles Nest <span style={{ color: brand.pink }}>Collections</span></span>
            </Link>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
              Thoughtfully curated everyday sets, formal dresses, and durable streetwear for children aged 6 months to 13 years across Kenya.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a 
                href="https://wa.me/254742871599" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full text-white shadow-2xs hover:opacity-90 transition-opacity bg-emerald-600 flex items-center justify-center"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a 
                href="tel:+254742871599" 
                className="w-8 h-8 rounded-full text-white shadow-2xs hover:opacity-90 transition-opacity flex items-center justify-center"
                style={{ backgroundColor: brand.pink }}
                title="Call Us"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-900">Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shop" className="text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" style={{ color: brand.blue }} /> Shop Catalog
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" style={{ color: brand.blue }} /> New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" style={{ color: brand.pink }} /> Special Offers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" style={{ color: brand.blue }} /> About Our Store
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" style={{ color: brand.blue }} /> Contact &amp; Hours
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" style={{ color: brand.blue }} /> View Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Location & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-900">Showroom</h3>
            <div className="space-y-2.5 text-xs text-stone-500">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: brand.blue }} />
                <span className="leading-relaxed">Biashara St, Zanna Exhibition, 1st Floor, Shop M7, Nairobi</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: brand.pink }} />
                <a href="tel:+254742871599" className="hover:text-stone-900 font-medium text-stone-700">+254 742 871599</a>
              </div>
              <div className="pt-1.5 border-t border-stone-100 text-[11px] space-y-0.5">
                <p className="text-stone-700 font-semibold">Mon &ndash; Fri: 8:00 AM &ndash; 7:00 PM</p>
                <p className="text-stone-400">Sat &amp; Sun: Closed</p>
              </div>
            </div>
          </div>

          {/* Instant WhatsApp Support Card */}
          <div className="lg:col-span-3 space-y-2.5 p-4 rounded-xl bg-stone-50 border border-stone-200/80 shadow-2xs">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                color: brand.pink,
                backgroundColor: `${brand.pink}10`,
              }}
            >
              <Sparkles className="h-3 w-3" /> Quick Support
            </span>
            <h4 className="text-xs font-semibold text-stone-900">Have Sizing Questions?</h4>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Reach out to our customer care team on WhatsApp for immediate sizing help and order dispatch updates.
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-full py-2 rounded-lg font-semibold text-xs text-white transition-opacity hover:opacity-95 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              style={{ backgroundColor: brand.blue }}
            >
              <MessageCircle className="h-3.5 w-3.5" /> Quick Message
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-stone-400">
          <p>&copy; {year} Angeles Nest Collections. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/contact" className="hover:text-stone-700 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-stone-700 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-xs shadow-lg hover:bg-emerald-700 transition-all cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span>
            </span>
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Chat with Us</span>
          </button>
        ) : (
          <div className="w-76 sm:w-88 bg-white rounded-2xl shadow-xl border border-stone-200/90 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-3.5 bg-stone-900 text-stone-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden">
                  <img src="/android-chrome-192x192.png" alt="Angeles Nest" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white">Angeles Nest Care</h4>
                  <p className="text-[10px] text-emerald-400">Online &bull; WhatsApp Connect</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-3.5 bg-stone-50 space-y-2.5 h-44 overflow-y-auto text-xs">
              <div className="bg-white p-3 rounded-xl rounded-tl-xs shadow-2xs border border-stone-200/70 text-stone-600 space-y-1">
                <p className="font-semibold text-stone-900">Hello! 👋</p>
                <p className="text-[11px] leading-relaxed">
                  How can we help with fits, order status, or visiting our Biashara Street shop today?
                </p>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleWhatsAppSend} className="p-2.5 bg-white border-t border-stone-100 flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Type your question..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-stone-400"
              />
              <button
                type="submit"
                className="p-2 rounded-lg text-white shadow-2xs hover:bg-emerald-700 transition-colors shrink-0 bg-emerald-600 cursor-pointer"
                title="Send via WhatsApp"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

    </footer>
  );
}