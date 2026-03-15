import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Mail as MailIcon, Send, Check } from 'lucide-react';
import { sendToTelegram } from '../utils/telegram';
import { useApp } from '../context/AppContext';

export default function ContactPage() {
  const { addInquiry, settings } = useApp();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const messageContent = `
<b>New Contact Inquiry</b>
<b>Name:</b> ${form.name}
<b>Email:</b> ${form.email}
<b>Subject:</b> ${form.subject}
<b>Message:</b> ${form.message}
    `;
    
    const ok = await sendToTelegram(messageContent);
    
    if (ok) {
      addInquiry({
        name: form.name,
        email: form.email,
        phone: 'N/A', // Form doesn't have phone, but inquiry system expects it
        subject: form.subject || 'General Inquiry',
        message: form.message
      });
      setSent(true);
      setTimeout(() => setSent(false), 5000);
      setForm({ name: '', email: '', subject: '', message: '' });
    } else {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-24 bg-gray-50 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 grid-lines" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="section-label">Reach Out</p>
          <h1 className="section-title text-gray-900 mb-6 font-light">
            Contact <span className="text-felix-red italic">Felix Motors</span>
          </h1>
          <p className="font-body text-gray-500 max-w-2xl mx-auto">
            Whether you're looking for your next vehicle, want to source a specific model, or have questions about our services, our team is at your side.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              {[
                { icon: Phone, label: 'Call Us', value: settings.phone, link: `tel:${settings.phone.replace(/\s+/g, '')}` },
                { icon: Mail, label: 'Email Us', value: settings.email, link: `mailto:${settings.email}` },
                { icon: MapPin, label: 'Visit Showroom', value: settings.address, link: '#' },
                { icon: Instagram, label: 'Follow Us', value: settings.instagram, link: `https://instagram.com/${settings.instagram.replace('@', '')}` },
              ].map(({ icon: Icon, label, value, link }) => (
                <a key={label} href={link} className="block group">
                  <div className="bg-gray-50 border border-gray-200 p-6 flex items-start gap-4 transition-all duration-300 group-hover:border-felix-red/30 group-hover:bg-white">
                    <div className="w-10 h-10 border border-felix-red/20 flex items-center justify-center group-hover:bg-felix-red group-hover:text-white transition-all">
                      <Icon size={18} className="text-felix-red group-hover:text-white" />
                    </div>
                    <div>
                      <p className="font-condensed text-xs text-gray-400 tracking-widest uppercase mb-1">{label}</p>
                      <p className="font-body text-sm text-gray-900 font-500">{value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card-glass p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-felix-red/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <h2 className="font-display text-3xl font-300 text-gray-900 mb-8">Send a <span className="text-felix-red italic">Message</span></h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-2">Your Name</label>
                      <input 
                        required 
                        type="text" 
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        placeholder="e.g. Alexander V." 
                        className="input-field" 
                      />
                    </div>
                    <div>
                      <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-2">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        placeholder="alex@email.com" 
                        className="input-field" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-2">Subject</label>
                    <input 
                      required 
                      type="text" 
                      value={form.subject}
                      onChange={e => setForm({...form, subject: e.target.value})}
                      placeholder="e.g. Sourcing Inquiry" 
                      className="input-field" 
                    />
                  </div>
                  <div>
                    <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-2">Message</label>
                    <textarea 
                      required 
                      rows={5} 
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      placeholder="How can we help you?" 
                      className="input-field resize-none" 
                    />
                  </div>
                  
                  <button type="submit" disabled={sent} className={`btn-primary w-full justify-center ${sent ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}>
                    {sent ? (
                      <span className="flex items-center gap-2">
                        <Check size={18} /> Message Sent
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} /> Send Message
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-gray-100 flex items-center justify-center border-y border-gray-200">
        <div className="text-center">
          <MapPin size={32} className="text-felix-red mx-auto mb-4 opacity-50" />
          <p className="font-display text-2xl font-300 text-gray-400">Felix Motors Showroom Map</p>
          <p className="font-body text-sm text-gray-400 mt-2">Chilanzar District, Tashkent</p>
        </div>
      </section>
    </div>
  );
}
