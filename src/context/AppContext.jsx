import React, { createContext, useContext, useState, useEffect } from 'react';
import { carsData } from '../data/cars';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem('felix_cars');
    return saved ? JSON.parse(saved) : carsData;
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('felix_admin') === 'true';
  });
  const [compareList, setCompareList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('felix_inquiries');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Alexander V.', phone: '+998 90 111 22 33', email: 'alex@email.com', subject: 'Rolls-Royce Phantom', message: 'I am interested in viewing the Phantom. Please schedule a test drive.', date: '2024-03-14', status: 'new' },
      { id: 2, name: 'Sarah Al-R.', phone: '+998 91 222 33 44', email: 'sarah@email.com', subject: 'Vehicle Inquiry', message: 'Do you have any Bentley Continental GT models available in white?', date: '2024-03-13', status: 'replied' },
    ];
  });
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('felix_settings');
    return saved ? JSON.parse(saved) : {
      siteName: 'Felix Motors',
      tagline: 'Premium Cars. Exceptional Drive.',
      phone: '+998 90 123 45 67',
      email: 'info@felixmotors.uz',
      address: 'Chilanzar District, Tashkent',
      instagram: '@felixmotors',
      hoursWeekday: '9:00 – 19:00',
      hoursSunday: '10:00 – 17:00',
    };
  });

  useEffect(() => {
    localStorage.setItem('felix_cars', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem('felix_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('felix_settings', JSON.stringify(settings));
  }, [settings]);

  const addInquiry = (inquiry) => {
    setInquiries(prev => [{ ...inquiry, id: Date.now(), status: 'new', date: new Date().toISOString().split('T')[0] }, ...prev]);
  };

  const updateInquiryStatus = (id, status) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const adminLogin = (password) => {
    if (password === 'felix2024') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('felix_admin', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('felix_admin');
  };

  const addCar = (car) => {
    const newCar = { ...car, id: Date.now() };
    setCars(prev => [...prev, newCar]);
  };

  const updateCar = (id, updates) => {
    setCars(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCar = (id) => {
    setCars(prev => prev.filter(c => c.id !== id));
  };

  const toggleCompare = (carId) => {
    setCompareList(prev => {
      if (prev.includes(carId)) return prev.filter(id => id !== carId);
      if (prev.length >= 3) return prev;
      return [...prev, carId];
    });
  };

  const toggleFavorite = (carId) => {
    setFavorites(prev =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  return (
    <AppContext.Provider value={{
      cars, addCar, updateCar, deleteCar,
      isAdminLoggedIn, adminLogin, adminLogout,
      compareList, toggleCompare,
      favorites, toggleFavorite,
      inquiries, addInquiry, updateInquiryStatus,
      settings, updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
