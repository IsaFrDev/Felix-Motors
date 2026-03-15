import React, { useState } from 'react';
import { Instagram, MessageCircle, X, Phone } from 'lucide-react';

export default function FloatingButtons() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Options */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 ${
        open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <a
          href="https://instagram.com/felixmotors"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <span className="bg-white border border-gray-200 shadow-md px-3 py-1.5 text-gray-500 font-condensed text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Instagram
          </span>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
            <Instagram size={20} className="text-white" />
          </div>
        </a>

        <a
          href="https://wa.me/998901234567?text=Hello%20Felix%20Motors%2C%20I%27m%20interested%20in%20your%20vehicles."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <span className="bg-white border border-gray-200 shadow-md px-3 py-1.5 text-gray-500 font-condensed text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp
          </span>
          <div className="w-12 h-12 bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 pulse-red">
            <MessageCircle size={20} className="text-white fill-white" />
          </div>
        </a>

        <a
          href="tel:+998901234567"
          className="flex items-center gap-3 group"
        >
          <span className="bg-white border border-gray-200 shadow-md px-3 py-1.5 text-gray-500 font-condensed text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Call Us
          </span>
          <div className="w-12 h-12 bg-gray-100 border border-gray-200 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
            <Phone size={20} className="text-gray-700" />
          </div>
        </a>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 flex items-center justify-center shadow-2xl transition-all duration-300 ${
          open
            ? 'bg-gray-100 border border-gray-200 rotate-0'
            : 'bg-felix-red hover:bg-felix-red-dark'
        }`}
        aria-label="Contact options"
      >
        {open
          ? <X size={22} className="text-gray-700" />
          : <MessageCircle size={22} className="text-white" />
        }
      </button>
    </div>
  );
}
