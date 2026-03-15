import React from 'react';
import { useApp } from '../context/AppContext';
import { DollarSign, Car, TrendingUp, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminAnalytics() {
  const { cars } = useApp();
  const { t } = useTranslation();

  const totalValue = cars.reduce((sum, c) => sum + c.price, 0);
  const available = cars.filter(c => c.status === 'available');
  const sold = cars.filter(c => c.status === 'sold');
  const featured = cars.filter(c => c.featured);

  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  const categoryData = ['ultra-luxury', 'grand-tourer', 'sports', 'suv'].map(cat => ({
    name: cat.replace('-', ' '),
    count: cars.filter(c => c.category === cat).length,
    value: cars.filter(c => c.category === cat).reduce((sum, c) => sum + c.price, 0),
  }));

  const priceRanges = [
    { label: '< $100K', min: 0, max: 100000 },
    { label: '$100K–$200K', min: 100000, max: 200000 },
    { label: '$200K–$300K', min: 200000, max: 300000 },
    { label: '$300K+', min: 300000, max: Infinity },
  ].map(range => ({
    ...range,
    count: cars.filter(c => c.price >= range.min && c.price < range.max).length,
  }));

  const maxPriceCount = Math.max(...priceRanges.map(r => r.count), 1);

  const brandData = Object.entries(
    cars.reduce((acc, c) => { acc[c.brand] = (acc[c.brand] || 0) + 1; return acc; }, {})
  ).sort((a, b) => b[1] - a[1]);
  const maxBrandCount = Math.max(...brandData.map(([, c]) => c), 1);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-300 text-gray-900 mb-1">{t('admin.analytics.title')}</h1>
        <p className="font-body text-sm text-gray-400">{t('admin.analytics.subtitle')}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: t('admin.analytics.kpi.value'), value: formatPrice(totalValue), icon: DollarSign, color: 'text-felix-red', bg: 'bg-red-50 border-red-100' },
          { label: t('admin.analytics.kpi.available'), value: `${available.length} cars`, icon: Car, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
          { label: t('admin.analytics.kpi.sold'), value: `${sold.length} cars`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
          { label: t('admin.analytics.kpi.featured'), value: `${featured.length} cars`, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`bg-white border ${bg.split(' ')[1]} p-5 shadow-sm`}>
            <div className="flex items-start justify-between mb-3">
              <p className="font-condensed text-xs text-gray-400 tracking-widest uppercase">{label}</p>
              <Icon size={14} className={color} />
            </div>
            <p className={`font-display text-2xl font-300 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Price Distribution */}
        <div className="bg-white border border-gray-200 p-6 shadow-sm">
          <h2 className="font-condensed font-600 text-gray-900 tracking-wide uppercase text-xs mb-6">{t('admin.analytics.charts.price')}</h2>
          <div className="space-y-4">
            {priceRanges.map(range => (
              <div key={range.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-body text-xs text-gray-500">{range.label}</span>
                  <span className="font-condensed text-xs text-gray-400">{range.count} cars</span>
                </div>
                <div className="h-1.5 bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-felix-red transition-all duration-1000"
                    style={{ width: `${(range.count / maxPriceCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white border border-gray-200 p-6 shadow-sm">
          <h2 className="font-condensed font-600 text-gray-900 tracking-wide uppercase text-xs mb-6">{t('admin.analytics.charts.category')}</h2>
          <div className="space-y-4">
            {categoryData.map(cat => (
              <div key={cat.name} className="p-4 border border-gray-100 hover:border-gray-200 transition-colors bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-condensed text-sm text-gray-900 font-600 uppercase tracking-widest">{cat.name}</span>
                  <span className="font-condensed text-xs text-felix-red font-600">{cat.count} cars</span>
                </div>
                <p className="font-body text-xs text-gray-400">Portfolio value: {formatPrice(cat.value)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Distribution */}
      <div className="bg-white border border-gray-200 p-6 shadow-sm">
        <h2 className="font-condensed font-600 text-gray-900 tracking-wide uppercase text-xs mb-6">{t('admin.analytics.charts.brand')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandData.map(([brand, count]) => (
            <div key={brand} className="flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-body text-sm text-gray-600">{brand}</span>
                <span className="font-condensed text-xs text-gray-400">{count}</span>
              </div>
              <div className="h-1 bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-felix-red to-felix-red-light transition-all duration-700"
                  style={{ width: `${(count / maxBrandCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
