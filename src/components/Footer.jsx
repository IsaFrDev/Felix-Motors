import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin, ChevronRight, Heart } from 'lucide-react';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t } = useTranslation();
  const { settings } = useApp();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="block mb-6">
              <Logo light={true} size="md" />
            </Link>
            <p className="text-gray-400 font-body text-sm leading-relaxed mb-6">
              {settings.tagline}
            </p>
            <div className="flex items-center gap-4">
              <a href={`https://instagram.com/${settings.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-gray-700 flex items-center justify-center text-gray-500 hover:border-felix-red hover:text-felix-red transition-all duration-300"><Instagram size={16} /></a>
              <a href={`mailto:${settings.email}`} className="w-9 h-9 border border-gray-700 flex items-center justify-center text-gray-500 hover:border-felix-red hover:text-felix-red transition-all duration-300"><Mail size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-condensed font-600 text-white tracking-widest text-sm uppercase mb-6">{t('footer.links')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('nav.home'), path: '/' },
                { label: t('nav.inventory'), path: '/cars' },
                { label: t('nav.about'), path: '/about' },
                { label: t('nav.contact'), path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="flex items-center gap-2 text-gray-400 hover:text-white font-body text-sm transition-colors duration-200 group">
                    <ChevronRight size={12} className="text-felix-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-condensed font-600 text-white tracking-widest text-sm uppercase mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {['Car Sales', 'Trade-In Service', 'Car Sourcing', 'Test Drive Booking'].map(service => (
                <li key={service} className="flex items-center gap-2 text-gray-400 font-body text-sm">
                  <span className="w-1 h-1 bg-felix-red rounded-full" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-condensed font-600 text-white tracking-widest text-sm uppercase mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-felix-red mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 font-body text-sm">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-felix-red flex-shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-gray-400 hover:text-white font-body text-sm transition-colors">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-felix-red flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-white font-body text-sm transition-colors">{settings.email}</a>
              </li>
            </ul>
            <div className="mt-6 p-4 border border-gray-700 bg-gray-800/50">
              <p className="font-condensed text-xs text-gray-500 tracking-wider uppercase mb-1">{t('footer.hours')}</p>
              <p className="text-gray-300 font-body text-sm">Mon–Sat: {settings.hoursWeekday}</p>
              <p className="text-gray-300 font-body text-sm">Sunday: {settings.hoursSunday}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-gray-500 font-body text-xs">© {new Date().getFullYear()} Felix Motors. All rights reserved.</p>
          <p className="text-gray-600 font-body text-xs flex items-center justify-center gap-1">Crafted with <Heart size={10} className="text-felix-red" /> for luxury</p>
        </div>
      </div>
    </footer>
  );
}
