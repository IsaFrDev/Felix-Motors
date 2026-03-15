import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, GitCompare, Fuel, Gauge, Zap, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

export default function CarCard({ car, showCompare = false }) {
  const { t } = useTranslation();
  const { favorites, toggleFavorite, compareList, toggleCompare } = useApp();
  const isFav = favorites.includes(car.id);
  const inCompare = compareList.includes(car.id);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="car-card group relative bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="car-img w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 font-condensed text-xs font-600 tracking-widest uppercase ${
          car.status === 'available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-felix-red/20 text-felix-red border border-felix-red/30'
        }`}>
          {car.status === 'available' ? t('card.available') : t('card.sold')}
        </div>

        {/* Year Badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 font-condensed text-xs text-white/80 tracking-wider">
          {car.year}
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(car.id); }}
            className={`w-8 h-8 backdrop-blur-sm flex items-center justify-center transition-all ${
              isFav ? 'bg-felix-red' : 'bg-black/60 hover:bg-felix-red'
            }`}
          >
            <Heart size={13} className={isFav ? 'fill-white text-white' : 'text-white'} />
          </button>
          {showCompare && (
            <button
              onClick={(e) => { e.preventDefault(); toggleCompare(car.id); }}
              className={`w-8 h-8 backdrop-blur-sm flex items-center justify-center transition-all ${
                inCompare ? 'bg-felix-red' : 'bg-black/60 hover:bg-felix-red'
              }`}
            >
              <GitCompare size={13} className="text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <p className="font-condensed text-xs text-felix-red tracking-widest uppercase font-600 mb-1">{car.brand}</p>
          <h3 className="font-display text-xl font-300 text-gray-900 leading-tight">{car.model}</h3>
        </div>

        {/* Quick Specs */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Fuel size={12} className="text-felix-red" />
            <span className="font-body text-xs">{car.fuel}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Gauge size={12} className="text-felix-red" />
            <span className="font-body text-xs">{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Zap size={12} className="text-felix-red" />
            <span className="font-body text-xs">{car.transmission}</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-condensed text-xs text-gray-400 tracking-widest uppercase mb-0.5">{t('card.price')}</p>
            <p className="font-display text-2xl font-300 text-felix-red">{formatPrice(car.price)}</p>
          </div>
          <Link
            to={`/cars/${car.id}`}
            className="flex items-center gap-2 bg-gray-100 hover:bg-felix-red border border-gray-200 hover:border-felix-red px-4 py-2.5 text-gray-700 hover:text-white font-condensed text-xs tracking-widest uppercase transition-all duration-300 group/btn"
          >
            {t('card.view')}
            <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
