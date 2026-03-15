import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import CarCard from '../components/CarCard';
import CompareBar from '../components/CompareBar';

const brands = ['All', 'Rolls-Royce', 'Bentley', 'Mercedes-Benz', 'Porsche', 'Lamborghini', 'BMW', 'Range Rover', 'Aston Martin'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissions = ['Automatic', 'PDK', 'Manual'];
const years = ['2024', '2023', '2022', '2021'];
const categories = ['ultra-luxury', 'grand-tourer', 'sports', 'suv'];

export default function CarsPage() {
  const { t } = useTranslation();
  const { cars } = useApp();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    brand: 'All', fuel: 'All', year: 'All',
    transmission: 'All', category: 'All',
    minPrice: '', maxPrice: '',
  });
  const [sort, setSort] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const sortOptions = [
    { value: 'default', label: t('inventory.sort') },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'year-desc', label: 'Newest First' },
    { value: 'mileage-asc', label: 'Lowest Mileage' },
  ];

  const filtered = useMemo(() => {
    let result = cars.filter(car => {
      const q = search.toLowerCase();
      const matchSearch = !search ||
        car.brand.toLowerCase().includes(q) ||
        car.model.toLowerCase().includes(q) ||
        car.engine.toLowerCase().includes(q);

      const matchBrand = filters.brand === 'All' || car.brand === filters.brand;
      const matchFuel = filters.fuel === 'All' || car.fuel === filters.fuel;
      const matchYear = filters.year === 'All' || car.year.toString() === filters.year;
      const matchTrans = filters.transmission === 'All' || car.transmission === filters.transmission;
      const matchCat = filters.category === 'All' || car.category === filters.category;
      const matchMin = !filters.minPrice || car.price >= parseInt(filters.minPrice);
      const matchMax = !filters.maxPrice || car.price <= parseInt(filters.maxPrice);

      return matchSearch && matchBrand && matchFuel && matchYear && matchTrans && matchCat && matchMin && matchMax;
    });

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'year-desc': result.sort((a, b) => b.year - a.year); break;
      case 'mileage-asc': result.sort((a, b) => a.mileage - b.mileage); break;
    }

    return result;
  }, [cars, search, filters, sort]);

  const setFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  const clearFilters = () => {
    setFilters({ brand: 'All', fuel: 'All', year: 'All', transmission: 'All', category: 'All', minPrice: '', maxPrice: '' });
    setSearch('');
  };

  const hasActiveFilters = Object.entries(filters).some(([k, v]) => v !== 'All' && v !== '') || search;

  return (
    <>
      <div className="min-h-screen bg-white pt-20">
        {/* Page Header */}
        <div className="relative py-16 bg-gray-50 border-b border-gray-200 overflow-hidden">
          <div className="absolute inset-0 grid-lines" />
          <div className="relative max-w-7xl mx-auto px-6">
            <p className="section-label">Felix Motors</p>
            <h1 className="section-title text-gray-900 mb-4">
              {t('inventory.title')} <span className="text-felix-red italic">{t('inventory.subtitle')}</span>
            </h1>
            <p className="font-body text-gray-500 max-w-xl">
              {t('inventory.desc')}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Search + Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('inventory.search')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-11"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-5 py-3 border font-condensed text-sm tracking-widest uppercase transition-all ${
                filtersOpen || hasActiveFilters
                  ? 'border-felix-red text-felix-red bg-felix-red/5'
                  : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
              }`}
            >
              <SlidersHorizontal size={14} />
              {t('inventory.filters')} {hasActiveFilters && `(${t('inventory.active')})`}
            </button>

            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="select-field pr-10 min-w-[180px]"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Filters Panel */}
          {filtersOpen && (
            <div className="bg-gray-50 border border-gray-200 p-6 mb-6 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                {/* Brand */}
                <div>
                  <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase mb-2 block">Brand</label>
                  <div className="relative">
                    <select value={filters.brand} onChange={e => setFilter('brand', e.target.value)} className="select-field pr-8">
                      {brands.map(b => <option key={b}>{b}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Year */}
                <div>
                  <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase mb-2 block">Year</label>
                  <div className="relative">
                    <select value={filters.year} onChange={e => setFilter('year', e.target.value)} className="select-field pr-8">
                       <option value="All">All</option>
                      {years.map(y => <option key={y}>{y}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Fuel */}
                <div>
                  <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase mb-2 block">Fuel</label>
                  <div className="relative">
                    <select value={filters.fuel} onChange={e => setFilter('fuel', e.target.value)} className="select-field pr-8">
                       <option value="All">All</option>
                      {fuelTypes.map(f => <option key={f}>{f}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase mb-2 block">Transmission</label>
                  <div className="relative">
                    <select value={filters.transmission} onChange={e => setFilter('transmission', e.target.value)} className="select-field pr-8">
                       <option value="All">All</option>
                      {transmissions.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Min Price */}
                <div>
                  <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase mb-2 block">Min Price ($)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={e => setFilter('minPrice', e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase mb-2 block">Max Price ($)</label>
                  <input
                    type="number"
                    placeholder="Any"
                    value={filters.maxPrice}
                    onChange={e => setFilter('maxPrice', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Category Tags */}
              <div className="flex items-center gap-3 flex-wrap border-t border-gray-200 pt-4">
                <span className="font-condensed text-xs text-gray-400 tracking-widest uppercase">Category:</span>
                <button
                    onClick={() => setFilter('category', 'All')}
                    className={`px-3 py-1 font-condensed text-xs tracking-widest uppercase transition-all ${
                      filters.category === 'All'
                        ? 'bg-felix-red text-white'
                        : 'border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                    }`}
                  >
                    All
                  </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter('category', cat)}
                    className={`px-3 py-1 font-condensed text-xs tracking-widest uppercase transition-all ${
                      filters.category === cat
                        ? 'bg-felix-red text-white'
                        : 'border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {cat.replace('-', ' ')}
                  </button>
                ))}

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="ml-auto flex items-center gap-1 text-felix-red font-condensed text-xs tracking-widest uppercase hover:text-felix-red-light"
                  >
                    <X size={12} />
                    {t('inventory.clear')}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-condensed text-xs text-gray-400 tracking-widest uppercase">
              {filtered.length} {t('inventory.found')}
            </p>
          </div>

          {/* Cars Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(car => (
                <CarCard key={car.id} car={car} showCompare />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mx-auto mb-6">
                <Search size={24} className="text-gray-300" />
              </div>
              <h3 className="font-display text-2xl font-300 text-gray-400 mb-3">{t('inventory.not_found')}</h3>
              <p className="font-body text-sm text-gray-400 mb-6">{t('inventory.try_adjust')}</p>
              <button onClick={clearFilters} className="btn-outline text-xs">{t('inventory.clear')}</button>
            </div>
          )}
        </div>
      </div>
      <CompareBar />
    </>
  );
}
