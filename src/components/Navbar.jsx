import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.inventory'), path: '/cars' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const isHomePage = location.pathname === '/';
  const forceLight = !isHomePage;
  const isDarkText = scrolled || forceLight;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDarkText
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <Logo light={!isDarkText} size="md" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-condensed text-sm tracking-widest uppercase transition-colors duration-200 relative group ${
                  isDarkText
                    ? (isActive(link.path) ? 'text-gray-900 font-600' : 'text-gray-500 hover:text-gray-900')
                    : (isActive(link.path) ? 'text-white font-600' : 'text-white/70 hover:text-white')
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-felix-red transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* CTA + Admin + Lang */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 font-condensed text-xs tracking-widest uppercase transition-colors ${
                  isDarkText ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
                }`}
              >
                <Globe size={14} />
                {i18n.language.toUpperCase().split('-')[0]}
                <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-white border border-gray-200 shadow-xl py-2 flex flex-col items-center">
                  <button onClick={() => changeLanguage('uz')} className="w-full py-2 text-[10px] font-condensed tracking-widest uppercase text-gray-500 hover:text-gray-900 hover:bg-gray-50">O'zbek</button>
                  <button onClick={() => changeLanguage('ru')} className="w-full py-2 text-[10px] font-condensed tracking-widest uppercase text-gray-500 hover:text-gray-900 hover:bg-gray-50">Русский</button>
                </div>
              )}
            </div>

            <Link
              to="/admin"
              className={`font-condensed text-xs tracking-widest uppercase transition-colors ${
                isDarkText ? 'text-gray-400 hover:text-gray-600' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {t('nav.admin')}
            </Link>
            <Link to="/cars" className="btn-primary text-xs py-2.5 px-6">
              {t('featured.view_all')}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 ${isDarkText ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-white/98 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <div className={`relative h-full flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-4xl font-300 transition-colors duration-200 ${
                isActive(link.path) ? 'text-felix-red' : 'text-gray-900 hover:text-felix-red'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex gap-4 mt-4">
             <button onClick={() => changeLanguage('uz')} className={`px-4 py-2 font-condensed text-sm tracking-widest uppercase ${i18n.language === 'uz' ? 'text-felix-red border-b border-felix-red' : 'text-gray-400'}`}>UZ</button>
             <button onClick={() => changeLanguage('ru')} className={`px-4 py-2 font-condensed text-sm tracking-widest uppercase ${i18n.language === 'ru' ? 'text-felix-red border-b border-felix-red' : 'text-gray-400'}`}>RU</button>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            <Link to="/admin" className="text-gray-400 font-condensed text-sm tracking-widest uppercase">
              {t('nav.admin')}
            </Link>
            <Link to="/cars" className="btn-primary">
              {t('featured.view_all')}
            </Link>
          </div>
          <div className="absolute bottom-10 text-gray-300 font-condensed text-xs tracking-widest uppercase">
            FELIX MOTORS — PREMIUM SINCE 2018
          </div>
        </div>
      </div>
    </>
  );
}
