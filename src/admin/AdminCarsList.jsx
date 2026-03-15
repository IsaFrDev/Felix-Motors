import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, Plus, Star, Eye, Edit2, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminCarsList() {
  const { cars, updateCar, deleteCar } = useApp();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  const filtered = cars.filter(car => {
    const q = search.toLowerCase();
    const matchSearch = !search || car.brand.toLowerCase().includes(q) || car.model.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || car.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id) => {
    deleteCar(id);
    setConfirmDelete(null);
  };

  const toggleFeatured = (car) => updateCar(car.id, { featured: !car.featured });
  const toggleStatus = (car) => updateCar(car.id, { status: car.status === 'available' ? 'sold' : 'available' });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-300 text-gray-900 mb-1">{t('admin.inventory.title')}</h1>
          <p className="font-body text-sm text-gray-400">{cars.length} {t('admin.dashboard.total_cars')}</p>
        </div>
        <Link to="/admin/cars/new" className="btn-primary text-sm px-6 py-2.5">
          <Plus size={16} /> {t('admin.inventory.add_new')}
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('admin.inventory.search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-10 bg-white"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'available', 'sold'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 font-condensed text-xs tracking-widest uppercase transition-all ${
                statusFilter === s
                  ? 'bg-felix-red text-white'
                  : 'bg-white border border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-700'
              }`}
            >
              {s === 'all' ? t('admin.inventory.all_status') : t(`admin.inventory.status.${s}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left px-6 py-4 font-condensed text-xs text-gray-400 tracking-widest uppercase">{t('admin.inventory.table.vehicle')}</th>
                <th className="text-left px-4 py-4 font-condensed text-xs text-gray-400 tracking-widest uppercase hidden md:table-cell">{t('admin.form.year')}</th>
                <th className="text-left px-4 py-4 font-condensed text-xs text-gray-400 tracking-widest uppercase">{t('admin.inventory.table.price')}</th>
                <th className="text-left px-4 py-4 font-condensed text-xs text-gray-400 tracking-widest uppercase hidden lg:table-cell">{t('admin.inventory.table.category')}</th>
                <th className="text-left px-4 py-4 font-condensed text-xs text-gray-400 tracking-widest uppercase">{t('admin.inventory.table.status')}</th>
                <th className="text-left px-4 py-4 font-condensed text-xs text-gray-400 tracking-widest uppercase hidden sm:table-cell">{t('admin.inventory.featured')}</th>
                <th className="text-right px-6 py-4 font-condensed text-xs text-gray-400 tracking-widest uppercase">{t('admin.inventory.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((car, i) => (
                <tr key={car.id} className={`border-b border-gray-50 hover:bg-gray-50/80 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={car.images[0]} alt={car.model} className="w-14 h-10 object-cover flex-shrink-0 border border-gray-100" />
                      <div>
                        <p className="font-condensed text-sm text-gray-900 font-600">{car.brand}</p>
                        <p className="font-body text-xs text-gray-400">{car.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="font-body text-sm text-gray-600">{car.year}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-body text-sm text-felix-red font-500">{formatPrice(car.price)}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="font-condensed text-xs text-gray-400 tracking-wider capitalize">{car.category.replace('-', ' ')}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleStatus(car)}
                      className={`px-2.5 py-1 font-condensed text-xs font-600 tracking-widest uppercase transition-all ${
                        car.status === 'available'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100'
                          : 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100'
                      }`}
                    >
                      {t(`admin.inventory.status.${car.status}`)}
                    </button>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <button
                      onClick={() => toggleFeatured(car)}
                      className={`transition-colors ${car.featured ? 'text-amber-500 hover:text-amber-600' : 'text-gray-200 hover:text-gray-400'}`}
                      title={car.featured ? t('admin.inventory.not_featured') : t('admin.inventory.featured')}
                    >
                      <Star size={16} className={car.featured ? 'fill-amber-500' : ''} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        to={`/cars/${car.id}`}
                        target="_blank"
                        className="w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-400 hover:border-gray-300 hover:text-gray-900 transition-all"
                        title={t('card.view')}
                      >
                        <Eye size={13} />
                      </Link>
                      <Link
                        to={`/admin/cars/${car.id}/edit`}
                        className="w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all"
                        title={t('admin.inventory.edit')}
                      >
                        <Edit2 size={13} />
                      </Link>
                      <button
                        onClick={() => setConfirmDelete(car.id)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-400 hover:border-felix-red/50 hover:text-felix-red transition-all"
                        title={t('admin.inventory.edit')}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Search size={24} className="text-gray-200 mx-auto mb-3" />
            <p className="font-body text-sm text-gray-400">{t('admin.inventory.not_found')}</p>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white border border-gray-200 shadow-xl p-8 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-6">
              <Trash2 size={20} className="text-felix-red" />
            </div>
            <h3 className="font-display text-xl font-300 text-gray-900 text-center mb-2">{t('admin.inventory.table.actions')}?</h3>
            <p className="font-body text-sm text-gray-400 text-center mb-8">{t('admin.inventory.delete_confirm')}</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="btn-outline flex-1 justify-center text-xs py-2.5">
                {t('admin.form.back')}
              </button>
              <button onClick={() => handleDelete(confirmDelete)} className="btn-primary flex-1 justify-center text-xs py-2.5 bg-felix-red">
                {t('admin.inventory.table.actions')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
