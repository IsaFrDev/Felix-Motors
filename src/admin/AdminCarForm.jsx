import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Save, ArrowLeft, Plus, X, Image, AlertCircle, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const defaultCar = {
  brand: '', model: '', year: new Date().getFullYear(), price: '',
  mileage: 0, fuel: 'Petrol', transmission: 'Automatic',
  engine: '', power: '', torque: '', acceleration: '',
  color: '', status: 'available', category: 'grand-tourer',
  featured: false, description: '',
  images: ['', '', ''],
  specs: { doors: 4, seats: 5, weight: '', topSpeed: '' },
};

const Label = ({ children }) => (
  <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-1.5">{children}</label>
);

const Input = ({ ...props }) => (
  <input {...props} className={`input-field bg-white ${props.className || ''}`} />
);

const Select = ({ children, ...props }) => (
  <div className="relative">
    <select {...props} className="select-field bg-white pr-10">{children}</select>
    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export default function AdminCarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, addCar, updateCar } = useApp();
  const { t } = useTranslation();
  const isEdit = Boolean(id);
  const existingCar = isEdit ? cars.find(c => c.id === parseInt(id)) : null;

  const [form, setForm] = useState(existingCar || defaultCar);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (existingCar) setForm(existingCar);
  }, [id]);

  const set = (key, value) => setForm(p => ({ ...p, [key]: value }));
  const setSpec = (key, value) => setForm(p => ({ ...p, specs: { ...p.specs, [key]: value } }));
  const setImage = (i, value) => {
    const imgs = [...form.images];
    imgs[i] = value;
    set('images', imgs);
  };

  const validate = () => {
    const e = {};
    if (!form.brand.trim()) e.brand = t('admin.form.errors.required');
    if (!form.model.trim()) e.model = t('admin.form.errors.required');
    if (!form.price || form.price <= 0) e.price = t('admin.form.errors.number');
    if (!form.engine.trim()) e.engine = t('admin.form.errors.required');
    if (!form.images[0].trim()) e.image0 = t('admin.form.errors.image');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const carData = { ...form, price: parseFloat(form.price), year: parseInt(form.year), mileage: parseInt(form.mileage) };
      if (isEdit) {
        updateCar(parseInt(id), carData);
      } else {
        addCar(carData);
      }
      setSaving(false);
      setSaved(true);
      setTimeout(() => { navigate('/admin/cars'); }, 800);
    }, 600);
  };

  const formSection = (title, children) => (
    <div className="bg-white border border-gray-200 p-6 mb-6 shadow-sm">
      <h3 className="font-condensed font-600 text-gray-900 tracking-wide uppercase text-xs mb-6 pb-4 border-b border-gray-100">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/cars')} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-condensed text-xs tracking-widest uppercase transition-colors">
          <ArrowLeft size={14} /> {t('admin.form.back')}
        </button>
        <div className="min-w-0">
          <h1 className="font-display text-2xl md:text-3xl font-300 text-gray-900 truncate">
            {isEdit ? t('admin.form.edit_title') : t('admin.form.add_title')}
          </h1>
          {isEdit && <p className="font-body text-sm text-gray-400 mt-1 truncate">{existingCar?.brand} {existingCar?.model}</p>}
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-100 p-4 mb-6 flex items-center gap-3">
          <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[10px]">✓</span>
          </div>
          <p className="font-body text-sm text-emerald-600">{t('admin.form.saved')}</p>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Basic Info */}
        {formSection(t('admin.form.basic_info'), (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>{t('admin.form.brand')} *</Label>
              <Input value={form.brand} onChange={e => set('brand', e.target.value)} placeholder="e.g. Rolls-Royce" />
              {errors.brand && <p className="text-felix-red text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.brand}</p>}
            </div>
            <div>
              <Label>{t('admin.form.model')} *</Label>
              <Input value={form.model} onChange={e => set('model', e.target.value)} placeholder="e.g. Phantom" />
              {errors.model && <p className="text-felix-red text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.model}</p>}
            </div>
            <div>
              <Label>{t('admin.form.year')}</Label>
              <Input type="number" value={form.year} onChange={e => set('year', e.target.value)} min="2000" max="2030" />
            </div>
            <div>
              <Label>{t('admin.form.price')} *</Label>
              <Input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. 450000" min="0" />
              {errors.price && <p className="text-felix-red text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.price}</p>}
            </div>
            <div>
              <Label>{t('admin.form.color')}</Label>
              <Input value={form.color} onChange={e => set('color', e.target.value)} placeholder="e.g. Midnight Black" />
            </div>
            <div>
              <Label>{t('admin.form.mileage')}</Label>
              <Input type="number" value={form.mileage} onChange={e => set('mileage', e.target.value)} min="0" />
            </div>
            <div>
              <Label>{t('admin.form.category')}</Label>
              <Select value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="ultra-luxury">{t('nav.luxury')}</option>
                <option value="grand-tourer">{t('nav.grand')}</option>
                <option value="sports">{t('nav.sports')}</option>
                <option value="suv">{t('nav.suv')}</option>
              </Select>
            </div>
            <div>
              <Label>{t('admin.form.status')}</Label>
              <Select value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="available">{t('admin.inventory.status.available')}</option>
                <option value="sold">{t('admin.inventory.status.sold')}</option>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label>{t('admin.form.description')}</Label>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                rows={3}
                placeholder="..."
                className="input-field bg-white resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => set('featured', !form.featured)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${form.featured ? 'bg-felix-red' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${form.featured ? 'translate-x-5' : ''}`} />
              </button>
              <Label>{t('admin.form.featured_label')}</Label>
            </div>
          </div>
        ))}

        {/* Engine & Performance */}
        {formSection(t('admin.form.performance'), (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>{t('admin.form.engine')} *</Label>
              <Input value={form.engine} onChange={e => set('engine', e.target.value)} placeholder="e.g. 6.75L V12" />
              {errors.engine && <p className="text-felix-red text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.engine}</p>}
            </div>
            <div><Label>{t('admin.form.power')}</Label><Input value={form.power} onChange={e => set('power', e.target.value)} placeholder="e.g. 563 hp" /></div>
            <div><Label>{t('admin.form.torque')}</Label><Input value={form.torque} onChange={e => set('torque', e.target.value)} placeholder="e.g. 900 Nm" /></div>
            <div><Label>{t('admin.form.acceleration')}</Label><Input value={form.acceleration} onChange={e => set('acceleration', e.target.value)} placeholder="e.g. 5.3s" /></div>
            <div>
              <Label>{t('admin.form.fuel')}</Label>
              <Select value={form.fuel} onChange={e => set('fuel', e.target.value)}>
                <option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option>
              </Select>
            </div>
            <div>
              <Label>{t('admin.form.transmission')}</Label>
              <Select value={form.transmission} onChange={e => set('transmission', e.target.value)}>
                <option>Automatic</option><option>PDK</option><option>Manual</option>
              </Select>
            </div>
          </div>
        ))}

        {/* Images */}
        {formSection(t('admin.form.images'), (
          <div className="space-y-4">
            {form.images.map((img, i) => (
              <div key={i}>
                <Label>{i === 0 ? t('admin.form.main_image') : `${t('admin.form.images')} ${i+1}`}</Label>
                <div className="flex gap-3">
                  <Input value={img} onChange={e => setImage(i, e.target.value)} placeholder="URL..." className="flex-1" />
                  {img && <div className="w-16 h-10 border border-gray-100 overflow-hidden shrink-0"><img src={img} alt="" className="w-full h-full object-cover" /></div>}
                </div>
              </div>
            ))}
            <button type="button" onClick={() => set('images', [...form.images, ''])} className="w-full py-2.5 border border-dashed border-gray-200 text-gray-400 font-condensed text-xs uppercase hover:border-gray-400 hover:text-gray-600 transition-all flex items-center justify-center gap-2">
              <Plus size={14} /> {t('admin.form.add_image')}
            </button>
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-8">
          <button type="button" onClick={() => navigate('/admin/cars')} className="btn-outline px-8 py-2.5 text-xs">
            {t('admin.form.back')}
          </button>
          <button type="submit" disabled={saving || saved} className="btn-primary min-w-[140px] justify-center px-8 py-2.5 text-xs">
            {saving ? t('admin.form.saving') : saved ? t('admin.form.saved') : t('admin.form.save')}
          </button>
        </div>
      </form>
    </div>
  );
}
