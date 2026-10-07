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
    <footer className="w-full bg-white border-t border-slate-200/80 text-slate-700 pt-12 pb-8 mt-16 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg text-slate-900">
              <img 
                src="/android-chrome-192x192.png" 
                alt="Angeles Nest Logo" 
                className="w-9 h-9 object-contain" 
              />
              <span>Angeles Nest <span style={{ color: brand.pink }}>Collections</span></span>
            </Link>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Dressing your little ones (6 months to 13 years) in comfort, vibrant style, and honest quality across Kenya.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://wa.me/254742871599" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-white shadow-sm hover:opacity-90 transition-all bg-emerald-600 flex items-center justify-center"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a 
                href="tel:+254742871599" 
                className="p-2.5 rounded-full text-white shadow-sm hover:opacity-90 transition-all flex items-center justify-center"
                style={{ backgroundColor: brand.pink }}
                title="Call Us"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Quick Navigation</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/shop" className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-[#62c6e6]" /> Shop Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-[#62c6e6]" /> About Our Store
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-[#62c6e6]" /> Contact &amp; Location
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-[#62c6e6]" /> View Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Location & Hours */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Showroom &amp; Hours</h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: brand.blue }} />
                <span>Biashara Street, Zanna Exhibition, 1st Floor, Shop M7, Nairobi</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 shrink-0 mt-0.5" style={{ color: brand.pink }} />
                <a href="tel:+254742871599" className="hover:text-slate-900 font-semibold">+254 742 871599</a>
              </div>
              <div className="pt-1 border-t border-slate-100 text-[11px] space-y-1">
                <p className="font-semibold text-slate-900">Working Hours:</p>
                <p>Mon - Fri: 8:00 AM - 7:00 PM</p>
                <p className="text-rose-600 font-medium">Sat &amp; Sun: Closed</p>
              </div>
            </div>
          </div>

          {/* Instant Help Widget Box */}
          <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: brand.pink }}>
              <Sparkles className="h-3 w-3" /> Instant Support
            </span>
            <h3 className="text-sm font-bold text-slate-900">Need Quick Sizing Help?</h3>
            <p className="text-slate-600 text-xs">
              Chat instantly with our customer care representative on WhatsApp for immediate assistance.
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white shadow-sm transition-all hover:opacity-95 flex items-center justify-center gap-2 bg-emerald-600"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Open WhatsApp Chatbot
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {year} Angeles Nest Collections. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-xl hover:bg-emerald-700 transition-all group animate-bounce"
          >
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <MessageCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Chat with Us</span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all">
            
            {/* Chat Header */}
            <div className="p-4 text-white flex items-center justify-between" style={{ backgroundColor: brand.blue }}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-slate-900 shadow-sm overflow-hidden p-1">
                    <img src="/android-chrome-192x192.png" alt="Angeles Nest" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900">Angeles Nest Assistant</h4>
                  <p className="text-[10px] text-slate-800 font-medium">Typically replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-slate-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-50 space-y-3 h-64 overflow-y-auto text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  AN
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-slate-700 space-y-1.5 max-w-[85%]">
                  <p className="font-semibold text-slate-900">Hello! 👋 Welcome to Angeles Nest Collections.</p>
                  <p>How can we assist you with kids&apos; clothing sizes, orders, or visiting our Biashara Street shop today?</p>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleWhatsAppSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your question here..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#62c6e6] focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl text-white shadow-sm hover:opacity-95 transition-all flex items-center justify-center shrink-0 bg-emerald-600"
                title="Send via WhatsApp"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="px-3 pb-2 bg-white text-center">
              <span className="text-[10px] text-slate-400">Powered by WhatsApp Instant Connect</span>
            </div>

          </div>
        )}
      </div>

    </footer>
  );
}