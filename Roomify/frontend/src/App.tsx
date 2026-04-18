import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { GuestProfile } from './pages/GuestProfile';
import { Bookings } from './pages/Bookings';
import { Login } from './pages/Login';
import { ManageStaff } from './pages/ManageStaff';

// --- THE BOUNCER (Route Protection) ---
// This checks if the user has a badge (token) in their browser memory.
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  // If they have a token, let them see the page. If not, kick to /login.
  return token ? children : <Navigate to="/login" replace />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES (No login required) */}
        <Route path="/login" element={<Login />} />

        {/* DEFAULT ENTRY ROUTE (Redirects straight to login) */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PROTECTED WORKSPACE (Must be logged in to see these) */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }>
          {/* These pages render INSIDE the AppLayout sidebar */}
          <Route index element={<Dashboard />} />
          <Route path="guest" element={<GuestProfile />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="staff" element={<ManageStaff />} /> {/* <-- MOVED THIS HERE! */}
          
          {/* If they type a weird URL inside the dashboard, send them back to the main dash */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;