import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AdminGuard({ children }) {
  const { isAdminLoggedIn } = useApp();
  if (!isAdminLoggedIn) return <Navigate to="/admin" replace />;
  return children;
}
