import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Car, DollarSign, Users, TrendingUp, Plus, Eye, ArrowRight, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const { cars } = useApp();
  const { t } = useTranslation();

  const totalValue = cars.reduce((sum, car) => sum + (car.price || 0), 0);
  const available = cars.filter(c => c.status === 'available').length;
  const avgPrice = cars.length ? Math.round(totalValue / cars.length) : 0;

  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  const brandCounts = cars.reduce((acc, car) => {
    acc[car.brand] = (acc[car.brand] || 0) + 1;
    return acc;
  }, {});

  const topBrands = Object.entries(brandCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxCount = Math.max(...topBrands.map(([, c]) => c));
  const recentCars = [...cars].reverse().slice(0, 5);

  const stats = [
    { label: t('admin.dashboard.total_vehicles'), value: cars.length, icon: Car, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
    { label: t('admin.dashboard.available'), value: available, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
    { label: t('admin.dashboard.total_value'), value: formatPrice(totalValue), icon: DollarSign, color: 'text-felix-red', bg: 'bg-red-50 border-red-100' },
    { label: t('admin.dashboard.avg_price'), value: formatPrice(avgPrice), icon: Users, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-300 text-gray-900 mb-1">{t('admin.dashboard.title')}</h1>
          <p className="font-body text-sm text-gray-400">{t('admin.dashboard.welcome')}</p>
        </div>
        <Link to="/admin/cars/new" className="btn-primary text-sm px-6 py-2.5 w-full md:w-auto justify-center">
          <Plus size={16} /> {t('admin.inventory.add_car')}
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`bg-white border ${bg.split(' ')[1]} p-5 shadow-sm`}>
            <div className="flex items-start justify-between mb-3">
              <p className="font-condensed text-xs text-gray-400 tracking-widest uppercase">{label}</p>
              <div className={`w-8 h-8 ${bg.split(' ')[0]} border ${bg.split(' ')[1]} flex items-center justify-center`}>
                <Icon size={14} className={color} />
              </div>
            </div>
            <p className={`font-display text-2xl md:text-3xl font-300 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cars */}
        <div className="lg:col-span-2 bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-condensed font-600 text-gray-900 tracking-wide uppercase text-xs">{t('admin.dashboard.recent_inquiries')}</h2>
            <Link to="/admin/cars" className="font-condensed text-xs text-felix-red tracking-widest uppercase hover:text-felix-red-light flex items-center gap-1">
              {t('admin.inventory.view_all')} <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentCars.map(car => (
              <div key={car.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors group border-b border-gray-50 last:border-0">
                <img src={car.images[0]} alt={car.model} className="w-16 h-11 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-condensed text-sm text-gray-900 font-600 truncate">{car.brand} {car.model}</p>
                  <div className="flex items-center gap-3">
                    <p className="font-body text-xs text-gray-400">{car.year}</p>
                    <span className={`text-xs font-condensed tracking-wider ${
                      car.status === 'available' ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {t(`admin.inventory.status.${car.status}`)}
                    </span>
                  </div>
                </div>
                <p className="font-body text-sm text-felix-red font-500 flex-shrink-0">{formatPrice(car.price)}</p>
                <Link to={`/admin/cars/${car.id}/edit`} className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye size={14} className="text-gray-400 hover:text-gray-700" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Breakdown */}
        <div className="bg-white border border-gray-200 p-6 shadow-sm">
          <h2 className="font-condensed font-600 text-gray-900 tracking-wide uppercase text-xs mb-6">{t('admin.analytics.brand_dist')}</h2>
          <div className="space-y-4">
            {topBrands.map(([brand, count]) => (
              <div key={brand}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-body text-xs text-gray-600 truncate pr-2">{brand}</p>
                  <p className="font-condensed text-xs text-gray-400">{count}</p>
                </div>
                <div className="h-1 bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-felix-red transition-all duration-700"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="font-condensed text-xs text-gray-400 tracking-widest uppercase mb-4">{t('admin.analytics.category_dist')}</h3>
            {['ultra-luxury', 'grand-tourer', 'sports', 'suv'].map(cat => {
              const count = cars.filter(c => c.category === cat).length;
              return (
                <div key={cat} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="font-body text-xs text-gray-500 capitalize">{t(`nav.${cat.split('-')[0]}`)}</span>
                  <span className="font-condensed text-xs text-gray-400">{count} {t('admin.sidebar.inventory').toLowerCase()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('admin.inventory.add_car'), path: '/admin/cars/new', icon: Plus, color: 'border-felix-red/20' },
          { label: t('admin.sidebar.inventory'), path: '/admin/cars', icon: Car, color: 'border-gray-200' },
          { label: t('admin.sidebar.analytics'), path: '/admin/analytics', icon: TrendingUp, color: 'border-gray-200' },
          { label: t('admin.sidebar.view_site'), path: '/', icon: Eye, color: 'border-gray-200' },
        ].map(({ label, path, icon: Icon, color }) => (
          <Link
            key={path}
            to={path}
            className={`bg-white border ${color} p-4 flex flex-col items-center gap-2 transition-all hover:bg-gray-50 shadow-sm text-center`}
          >
            <Icon size={18} className="text-gray-400" />
            <span className="font-condensed text-xs text-gray-500 tracking-widest uppercase">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
