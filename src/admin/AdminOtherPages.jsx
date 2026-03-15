import React, { useState } from 'react';
import { MessageSquare, Check, Clock, Phone, Mail, Globe, MapPin, Instagram, MessageCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

export function AdminInquiries() {
  const { inquiries, updateInquiryStatus } = useApp();
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  const markReplied = (id) => {
    updateInquiryStatus(id, 'replied');
    if (selected?.id === id) {
      setSelected({ ...selected, status: 'replied' });
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-300 text-gray-900 mb-1">{t('admin.inquiries.title')}</h1>
        <p className="font-body text-sm text-gray-400">{inquiries.filter(i => i.status === 'new').length} {t('admin.dashboard.new_inquiries').toLowerCase()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3 lg:max-h-[70vh] lg:overflow-y-auto pr-2 custom-scrollbar">
          {inquiries.length === 0 ? (
            <div className="bg-white border border-gray-100 p-8 text-center">
               <p className="text-gray-400 font-body text-sm">{t('admin.inquiries.no_results')}</p>
            </div>
          ) : inquiries.map(inq => (
            <div
              key={inq.id}
              onClick={() => setSelected(inq)}
              className={`bg-white border cursor-pointer transition-all p-5 shadow-sm ${
                selected?.id === inq.id ? 'border-felix-red/40 bg-red-50/10' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-condensed text-sm text-gray-900 font-600">{inq.name}</p>
                  <p className="font-body text-xs text-gray-400 truncate max-w-[200px]">{inq.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${inq.status === 'new' ? 'bg-felix-red animate-pulse' : 'bg-emerald-500'}`} />
                  <span className="font-condensed text-[10px] text-gray-400 uppercase tracking-tighter">{t(`admin.inquiries.status.${inq.status}`)}</span>
                </div>
              </div>
              <p className="font-body text-xs text-gray-500 line-clamp-2">{inq.message}</p>
              <p className="font-body text-[10px] text-gray-300 mt-2 uppercase tracking-widest">{inq.date}</p>
            </div>
          ))}
        </div>

        {selected ? (
          <div className="bg-white border border-gray-200 p-6 shadow-sm sticky top-0">
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100">
              <div>
                <p className="font-condensed font-600 text-gray-900 tracking-wide uppercase text-sm">{selected.name}</p>
                <p className="font-body text-xs text-gray-400 mt-1">{selected.subject}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-300 hover:text-gray-900 transition-colors"><X size={16}/></button>
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-felix-red" />
                <a href={`tel:${selected.phone}`} className="font-body text-sm text-gray-600 hover:text-gray-900 font-500">{selected.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-felix-red" />
                <a href={`mailto:${selected.email}`} className="font-body text-sm text-gray-600 hover:text-gray-900 font-500">{selected.email}</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock size={14} />
                <span className="font-body text-sm">{selected.date}</span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 p-4 mb-6 relative overflow-hidden">
               <Quote size={40} className="absolute -top-2 -right-2 text-gray-100 rotate-180" />
              <p className="font-body text-sm text-gray-600 leading-relaxed relative z-10">"{selected.message}"</p>
            </div>

            <div className="flex gap-3">
              <a href={`mailto:${selected.email}`} className="btn-primary text-xs py-2.5 flex-1 justify-center">
                <Mail size={14} /> {t('admin.inquiries.mark_read')} by Email
              </a>
              {selected.status === 'new' && (
                <button
                  onClick={() => markReplied(selected.id)}
                  className="btn-outline text-xs py-2.5 px-4"
                >
                  <Check size={14} /> {t('admin.inquiries.mark_read')}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 flex items-center justify-center p-16 shadow-sm border-dashed">
            <div className="text-center">
              <MessageSquare size={32} className="text-gray-100 mx-auto mb-3" />
              <p className="font-body text-sm text-gray-300">{t('admin.inquiries.details')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Quote = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1.5 6 4.5 6" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c1 0 1 0 1 1v1c0 2.5 1.5 6 4.5 6" />
  </svg>
);

export function AdminSettings() {
  const { settings, updateSettings } = useApp();
  const { t } = useTranslation();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Label = ({ children }) => (
    <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-1.5">{children}</label>
  );

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8 font-light">
        <h1 className="font-display text-3xl text-gray-900 mb-1">{t('admin.settings.title')}</h1>
        <p className="font-body text-sm text-gray-400">{t('admin.settings.general')}</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {[
          { title: t('admin.settings.general'), fields: [
            { label: t('admin.settings.site_name'), key: 'siteName' }, { label: t('admin.settings.tagline'), key: 'tagline' },
          ]},
          { title: t('admin.settings.contact'), fields: [
            { label: t('admin.settings.phone'), key: 'phone' }, { label: t('admin.settings.email'), key: 'email' }, { label: t('admin.settings.address'), key: 'address' },
          ]},
          { title: 'Social', fields: [
            { label: t('admin.settings.instagram'), key: 'instagram' },
          ]},
          { title: t('admin.settings.working_hours'), fields: [
            { label: t('admin.settings.weekday'), key: 'hoursWeekday' }, { label: t('admin.settings.sunday'), key: 'hoursSunday' },
          ]},
        ].map(({ title, fields }) => (
          <div key={title} className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="font-condensed font-600 text-gray-900 tracking-wide uppercase text-xs mb-5 pb-4 border-b border-gray-100">{title}</h3>
            <div className="space-y-4">
              {fields.map(({ label, key }) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <input
                    type="text"
                    value={localSettings[key]}
                    onChange={e => setLocalSettings({...localSettings, [key]: e.target.value})}
                    className="input-field bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className={`btn-primary w-full justify-center transition-all ${saved ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}>
          {saved ? `✓ ${t('admin.settings.save_success')}!` : t('admin.form.save')}
        </button>
      </form>
    </div>
  );
}
