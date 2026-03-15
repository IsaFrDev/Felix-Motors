import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';

export default function AdminLogin() {
  const { adminLogin } = useApp();
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const ok = adminLogin(password);
      if (!ok) {
        setError(t('admin.login.error'));
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Logo size="lg" className="flex-col !gap-4" />
        </div>

        <div className="card-glass p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-felix-red/10 border border-felix-red/20 flex items-center justify-center">
              <Lock size={14} className="text-felix-red" />
            </div>
            <div>
              <p className="font-condensed text-xs text-gray-400 tracking-widest uppercase">{t('admin.login.title')}</p>
              <p className="font-body text-sm text-gray-900">{t('admin.sidebar.logout').toLowerCase() === 'chiqish' ? 'Admin tizimiga kirish' : 'Вход для администратора'}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-condensed text-xs text-gray-400 tracking-widest uppercase block mb-1.5">{t('admin.login.password')}</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="..."
                  className="input-field pr-10"
                  required
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors">
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-felix-red/5 border border-felix-red/10">
                <AlertCircle size={14} className="text-felix-red flex-shrink-0" />
                <p className="font-body text-xs text-felix-red">{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ...
                </span>
              ) : t('admin.login.submit')}
            </button>
          </form>

          <p className="font-body text-xs text-gray-400 text-center mt-4 uppercase tracking-tighter">Demo: felix2024</p>
        </div>
      </div>
    </div>
  );
}
