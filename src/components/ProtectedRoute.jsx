import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles, children }) {
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');

  if (!role || !email) {
    // Not logged in
    return <Navigate to="/unauthorized" />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in but unauthorized for this page
    return <Navigate to="/unauthorized" />;
  }

  // Authorized user
  return children;
}
