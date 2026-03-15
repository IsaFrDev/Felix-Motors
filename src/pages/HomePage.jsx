import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronDown, Star, Shield, RefreshCw, Search, Award,
  Instagram, Quote, Play, ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import CarCard from '../components/CarCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const heroImages = [
  'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&q=90',
  'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&q=90',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=90',
];

export default function HomePage() {
  const { t } = useTranslation();
  const { cars } = useApp();
  const featuredCars = cars.filter(c => c.featured).slice(0, 4);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const sectionRef = useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={sectionRef}>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Background Images */}
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1500"
            style={{ opacity: i === heroIndex ? 1 : 0, transitionDuration: '1500ms' }}
          >
            <img src={img} alt="" className="w-full h-full object-cover object-center" />
          </div>
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="absolute inset-0 grid-lines opacity-20" />

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className={`transition-all duration-1000 delay-300 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-felix-red" />
              <span className="section-label tracking-[0.4em] mb-0">Premium Dealership — Est. 2018</span>
            </div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-300 text-white leading-[0.9] mb-3 uppercase">
              {t('hero.title')}
            </h1>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-300 leading-[0.9] mb-8 uppercase">
              <span className="text-felix-red">{t('hero.subtitle')}</span>
            </h1>

            <p className="font-condensed text-xl md:text-2xl font-300 text-white/70 tracking-widest uppercase mb-12 max-w-lg">
              {t('hero.tagline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cars" className="btn-primary group">
                {t('hero.browse')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-condensed font-500 text-sm tracking-widest uppercase transition-all duration-300 hover:border-felix-red hover:text-felix-red">
                {t('hero.contact')}
              </Link>
            </div>
          </div>

          <div className={`absolute bottom-8 left-6 right-6 max-w-7xl flex items-center gap-6 md:gap-16 transition-all duration-1000 delay-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {[
              { value: '200+', label: t('stats.sold') },
              { value: '6+', label: t('stats.experience') },
              { value: '150+', label: t('stats.clients') },
              { value: '50+', label: t('stats.brands') },
            ].map(stat => (
              <div key={stat.label} className="hidden xs:block">
                <p className="font-display text-xl md:text-3xl font-300 text-felix-red leading-none">{stat.value}</p>
                <p className="font-condensed text-[10px] md:text-xs text-white/40 tracking-widest uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
          >
            <ChevronDown size={16} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* ─── FEATURED CARS ─────────────────────────────────────────────── */}
      <section id="featured" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="animate-on-scroll">
              <p className="section-label">Our Selection</p>
              <h2 className="section-title text-gray-900">
                {t('featured.title')}<br />
                <span className="text-gradient">{t('featured.subtitle')}</span>
              </h2>
            </div>
            <Link to="/cars" className="btn-ghost group mt-6 md:mt-0 animate-on-scroll delay-200">
              {t('featured.view_all')}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car, i) => (
              <div key={car.id} className="animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY FELIX ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-lines" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="section-label">Felix Motors</p>
            <h2 className="section-title text-gray-900">
              {t('promise.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: t('promise.premium'), desc: t('promise.premium_desc'), delay: 0 },
              { icon: RefreshCw, title: t('promise.tradein'), desc: t('promise.tradein_desc'), delay: 100 },
              { icon: Search, title: t('promise.sourcing'), desc: t('promise.sourcing_desc'), delay: 200 },
              { icon: Shield, title: t('promise.trusted'), desc: t('promise.trusted_desc'), delay: 300 },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <div key={title} className="animate-on-scroll card-glass p-8 group hover:border-felix-red/30 transition-all duration-500" style={{ transitionDelay: `${delay}ms` }}>
                <div className="w-12 h-12 border border-felix-red/30 flex items-center justify-center mb-6 group-hover:bg-felix-red/10 transition-colors duration-300">
                  <Icon size={20} className="text-felix-red" />
                </div>
                <h3 className="font-condensed font-600 text-gray-900 text-lg tracking-wide mb-3">{title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
