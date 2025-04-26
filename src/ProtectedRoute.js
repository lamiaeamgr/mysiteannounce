// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, roleRequired, user }) {
  if (!user || (roleRequired && (!user.role || user.role !== roleRequired))) {
    return <Navigate to="/signin" />;
  }
  return element;
  
}

export default ProtectedRoute;
