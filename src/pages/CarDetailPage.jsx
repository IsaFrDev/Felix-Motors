import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ChevronLeft, ChevronRight, Heart, GitCompare,
  Fuel, Gauge, Zap, Settings, Phone, Calendar,
  Share2, ArrowRight, Star, Check, X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import CarCard from '../components/CarCard';
import { sendToTelegram } from '../utils/telegram';

export default function CarDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cars, favorites, toggleFavorite, compareList, toggleCompare, addInquiry } = useApp();
  
  const car = cars.find(c => String(c.id) === String(id));
  const [activeImg, setActiveImg] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', phone: '', date: '', message: '' });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="font-display text-4xl text-gray-300 mb-4">{t('inventory.not_found')}</h2>
          <Link to="/cars" className="btn-primary">{t('detail.back')}</Link>
        </div>
      </div>
    );
  }

  const isFav = favorites.includes(car.id);
  const inCompare = compareList.includes(car.id);
  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  const prevImg = () => setActiveImg(prev => (prev - 1 + car.images.length) % car.images.length);
  const nextImg = () => setActiveImg(prev => (prev + 1) % car.images.length);

  const handleBooking = async (e) => {
    e.preventDefault();
    
    const messageContent = `
<b>New Test Drive Booking</b>
<b>Car:</b> ${car.brand} ${car.model} (${car.year})
<b>Name:</b> ${bookingData.name}
<b>Phone:</b> ${bookingData.phone}
<b>Date:</b> ${bookingData.date}
<b>Message:</b> ${bookingData.message || 'N/A'}
    `;
    
    const ok = await sendToTelegram(messageContent);
    
    if (ok) {
      addInquiry({
        name: bookingData.name,
        email: 'N/A',
        phone: bookingData.phone,
        subject: `Booking: ${car.brand} ${car.model}`,
        message: `Date: ${bookingData.date}. ${bookingData.message || ''}`
      });
      setBookingSubmitted(true);
      setTimeout(() => {
        setBookingSubmitted(false);
        setShowBooking(false);
      }, 4000);
    } else {
      alert('Failed to send booking request. Please try again.');
    }
  };

  const relatedCars = cars.filter(c => String(c.id) !== String(car.id) && (c.brand === car.brand || c.category === car.category)).slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-condensed text-xs tracking-widest uppercase transition-colors">
            <ArrowLeft size={14} /> {t('detail.back')}
          </button>
          <span className="text-gray-300">/</span>
          <Link to="/cars" className="text-gray-500 hover:text-gray-900 font-condensed text-xs tracking-widest uppercase transition-colors">{t('nav.inventory')}</Link>
          <span className="text-gray-300">/</span>
          <span className="text-felix-red font-condensed text-xs tracking-widest uppercase">{car.brand} {car.model}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden group mb-3">
              {car.images.map((img, i) => (
                <img key={i} src={img} alt={`${car.brand} ${car.model}`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" style={{ opacity: i === activeImg ? 1 : 0 }} />
              ))}
              <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-felix-red">
                <ChevronLeft size={18} className="text-gray-700 group-hover:text-white" />
              </button>
              <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-felix-red">
                <ChevronRight size={18} className="text-gray-700 group-hover:text-white" />
              </button>
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 font-condensed text-xs text-white/80 tracking-widest">
                {activeImg + 1} / {car.images.length}
              </div>
              <div className={`absolute top-4 left-4 px-3 py-1.5 font-condensed text-xs font-600 tracking-widest uppercase ${
                car.status === 'available' ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30' : 'bg-felix-red/20 text-felix-red border border-felix-red/30'
              }`}>
                {car.status === 'available' ? `● ${t('card.available')}` : `● ${t('card.sold')}`}
              </div>
            </div>
            <div className="flex gap-2">
              {car.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`flex-1 aspect-video overflow-hidden border-2 transition-all ${
                  i === activeImg ? 'border-felix-red' : 'border-transparent opacity-50 hover:opacity-80'
                }`}><img src={img} alt="" className="w-full h-full object-cover" /></button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="section-label mb-2">{car.brand}</p>
            <h1 className="font-display text-4xl md:text-5xl font-300 text-gray-900 mb-2">{car.model}</h1>
            <p className="font-condensed text-gray-400 tracking-widest text-sm uppercase mb-6">{car.year} · {car.color}</p>
            <div className="bg-felix-red/5 border border-felix-red/20 p-6 mb-8">
              <p className="font-condensed text-xs text-felix-red/60 tracking-widest uppercase mb-1">{t('card.price')}</p>
              <p className="font-display text-5xl font-300 text-felix-red">{formatPrice(car.price)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Settings, label: 'Engine', value: car.engine },
                { icon: Zap, label: 'Power', value: car.power },
                { icon: Gauge, label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
                { icon: Fuel, label: 'Fuel', value: car.fuel },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-gray-50 border border-gray-200 p-4 flex items-start gap-3">
                  <Icon size={16} className="text-felix-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-condensed text-xs text-gray-400 tracking-wider uppercase">{label}</p>
                    <p className="font-body text-sm text-gray-900 font-500 mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-body text-gray-500 text-sm leading-relaxed mb-8">{car.description}</p>
            <div className="flex flex-col gap-3 mb-6">
              <button onClick={() => setShowBooking(true)} className="btn-primary w-full justify-center text-sm">
                <Calendar size={16} /> {t('detail.book')}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toggleFavorite(car.id)} className={`flex items-center gap-2 px-4 py-2.5 border font-condensed text-xs tracking-widest uppercase transition-all ${
                isFav ? 'border-felix-red text-felix-red bg-felix-red/5' : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
              }`}><Heart size={12} className={isFav ? 'fill-felix-red' : ''} /> {isFav ? 'Saved' : 'Save'}</button>
              <button onClick={() => toggleCompare(car.id)} className={`flex items-center gap-2 px-4 py-2.5 border font-condensed text-xs tracking-widest uppercase transition-all ${
                inCompare ? 'border-felix-red text-felix-red bg-felix-red/5' : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
              }`}><GitCompare size={12} /> Compare</button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 font-condensed text-xs tracking-widest uppercase transition-all"><Share2 size={12} /> Share</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12 mb-16">
          <h2 className="font-display text-3xl font-300 text-gray-900 mb-8">{t('detail.specs')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {[
              { label: 'Brand', value: car.brand }, { label: 'Model', value: car.model }, { label: 'Year', value: car.year },
              { label: 'Engine', value: car.engine }, { label: 'Power', value: car.power }, { label: 'Torque', value: car.torque },
              { label: 'Acceleration', value: car.acceleration }, { label: 'Top Speed', value: car.specs.topSpeed }, { label: 'Transmission', value: car.transmission },
              { label: 'Fuel Type', value: car.fuel }, { label: 'Mileage', value: `${car.mileage.toLocaleString()} km` }, { label: 'Color', value: car.color },
              { label: 'Doors', value: car.specs.doors }, { label: 'Seats', value: car.specs.seats }, { label: 'Weight', value: car.specs.weight },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white p-5 flex items-center justify-between">
                <span className="font-condensed text-xs text-gray-400 tracking-widest uppercase">{label}</span>
                <span className="font-body text-sm text-gray-900 font-500">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {relatedCars.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-3xl font-300 text-gray-900">{t('detail.related')}</h2>
              <Link to="/cars" className="btn-ghost group text-xs">{t('featured.view_all')} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCars.map(c => <CarCard key={c.id} car={c} />)}
            </div>
          </div>
        )}
      </div>

      {showBooking && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowBooking(false)}>
          <div className="bg-white border border-gray-200 shadow-xl w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
            {bookingSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"><Check size={24} className="text-emerald-500" /></div>
                <h3 className="font-display text-2xl font-300 text-gray-900 mb-3">{t('detail.form.success')}</h3>
                <p className="font-body text-sm text-gray-500 mb-6">{t('detail.form.success_desc')}</p>
                <button onClick={() => { setShowBooking(false); setBookingSubmitted(false); }} className="btn-primary w-full justify-center">Done</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div><p className="section-label mb-1">{t('detail.form.title')}</p><h3 className="font-display text-xl font-300 text-gray-900">{car.brand} {car.model}</h3></div>
                  <button onClick={() => setShowBooking(false)} className="text-gray-400 hover:text-gray-700"><X size={20}/></button>
                </div>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div><label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-1.5">{t('detail.form.name')}</label><input required type="text" placeholder="Your name" value={bookingData.name} onChange={e => setBookingData(p => ({ ...p, name: e.target.value }))} className="input-field" /></div>
                  <div><label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-1.5">{t('detail.form.phone')}</label><input required type="tel" placeholder="+998 90 ..." value={bookingData.phone} onChange={e => setBookingData(p => ({ ...p, phone: e.target.value }))} className="input-field" /></div>
                  <div><label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-1.5">{t('detail.form.date')}</label><input required type="date" min={new Date().toISOString().split('T')[0]} value={bookingData.date} onChange={e => setBookingData(p => ({ ...p, date: e.target.value }))} className="input-field" /></div>
                  <div><label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-1.5">{t('detail.form.message')}</label><textarea placeholder="Requirements..." value={bookingData.message} onChange={e => setBookingData(p => ({ ...p, message: e.target.value }))} className="input-field resize-none h-20" /></div>
                  <button type="submit" className="btn-primary w-full justify-center mt-2">{t('detail.form.submit')}</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
