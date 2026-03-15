import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminCarsList from './AdminCarsList';
import AdminCarForm from './AdminCarForm';
import AdminAnalytics from './AdminAnalytics';
import { AdminInquiries, AdminSettings } from './AdminOtherPages';
import AdminLogin from './AdminLogin';

export default function AdminPanel() {
  const { isAdminLoggedIn } = useApp();

  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="cars" element={<AdminCarsList />} />
        <Route path="cars/new" element={<AdminCarForm />} />
        <Route path="cars/:id/edit" element={<AdminCarForm />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}
