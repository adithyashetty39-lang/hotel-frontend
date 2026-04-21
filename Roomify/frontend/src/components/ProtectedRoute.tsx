import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role') || ''; // Empty string if missing

  // 1. Check if they are logged in at all
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Convert everything to lowercase so "Waiter", "waiter", and "WAITER" all work!
  const safeUserRole = userRole.toLowerCase();
  const safeAllowedRoles = allowedRoles.map(role => role.toLowerCase());

  // 2. Check if they have the right security clearance
  if (!safeAllowedRoles.includes(safeUserRole)) {
    console.warn(`SECURITY ALERT: User role '${userRole}' attempted to access restricted area.`);
    
    // If they aren't allowed on this page, push them to the POS screen 
    // instead of logging them out completely!
    return <Navigate to="/dashboard/pos" replace />;
  }

  // 3. If they pass the checks, let them in!
  return <>{children}</>;
};