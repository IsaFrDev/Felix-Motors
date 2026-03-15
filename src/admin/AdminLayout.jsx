import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, Car, BarChart3, MessageSquare, 
  Settings, X, ExternalLink, LogOut, Menu, ChevronRight 
} from 'lucide-react';
import Logo from '../components/Logo';

export default function AdminLayout({ children }) {
  const { adminLogout } = useApp();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menu = [
    { label: t('admin.sidebar.dashboard'), path: '/admin', icon: LayoutDashboard },
    { label: t('admin.sidebar.inventory'), path: '/admin/cars', icon: Car },
    { label: t('admin.sidebar.analytics'), path: '/admin/analytics', icon: BarChart3 },
    { label: t('admin.sidebar.inquiries'), path: '/admin/inquiries', icon: MessageSquare },
    { label: t('admin.sidebar.settings'), path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Staying Dark for better differentiation and premium look */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full flex flex-col p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
            <Logo light={true} size="sm" />
            <button onClick={() => setMobileOpen(false)} className="lg:hidden ml-auto text-white/40 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 space-y-1">
            {menu.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => `
                  flex items-center justify-between px-4 py-3 font-condensed text-xs tracking-widest uppercase transition-all group
                  ${isActive ? 'bg-felix-red text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}
                `}
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} />
                  {item.label}
                </div>
                <ChevronRight size={12} className={`opacity-0 group-hover:opacity-40 transition-opacity ${location.pathname === item.path ? 'opacity-40' : ''}`} />
              </NavLink>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="mt-auto space-y-1 pt-6 border-t border-white/5">
            {/* Language Switcher */}
            <div className="flex gap-2 px-4 py-3 mb-2">
              {['uz', 'ru'].map(lang => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`px-2 py-1 text-[10px] font-condensed tracking-widest uppercase border transition-all ${
                    i18n.language === lang ? 'bg-white text-gray-900 border-white' : 'text-white/40 border-white/10 hover:border-white/40'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <a 
              href="/" 
              target="_blank" 
              className="flex items-center gap-3 px-4 py-3 font-condensed text-xs text-white/40 hover:text-white tracking-widest uppercase transition-colors"
            >
              <ExternalLink size={16} />
              {t('admin.sidebar.view_site')}
            </a>
            <button
              onClick={() => { adminLogout(); navigate('/admin/login'); }}
              className="flex items-center gap-3 px-4 py-3 font-condensed text-xs text-white/40 hover:text-felix-red tracking-widest uppercase transition-colors w-full"
            >
              <LogOut size={16} />
              {t('admin.sidebar.logout')}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen relative flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
          </div>
          <button onClick={() => setMobileOpen(true)} className="p-2 text-gray-500 hover:text-gray-900">
            <Menu size={20} />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}
