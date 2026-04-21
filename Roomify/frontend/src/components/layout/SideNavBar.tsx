import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const SideNavBar: React.FC = () => {
  const navigate = useNavigate();

  // 1. Read the user's role from their secure badge
  let userRole = 'Staff'; 
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      userRole = decodedToken.role; // e.g., 'Admin', 'Receptionist', 'Waiter'
    }
  } catch (error) {
    console.error("Could not read token details.");
  }

  // 2. Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "flex items-center gap-4 py-3 px-4 rounded-2xl text-primary relative before:content-[''] before:absolute before:-left-4 before:w-1 before:h-6 before:bg-secondary before:rounded-full font-semibold transition-all translate-x-1"
      : "flex items-center gap-4 py-3 px-4 rounded-2xl text-primary/40 hover:text-primary transition-colors";
  };

  return (
    <nav className="fixed left-0 top-0 bottom-0 z-50 flex flex-col p-8 w-72 bg-white/70 backdrop-blur-2xl my-6 ml-6 rounded-[24px] shadow-[0_8px_32px_0_rgba(0,54,8,0.05)] hidden lg:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
        </div>
        <div>
          <h2 className="text-lg font-black text-primary font-headline leading-tight">The Living Canvas</h2>
          <p className="text-xs font-semibold text-primary/60 uppercase tracking-widest">{userRole} Portal</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 flex-1">
        {/* EVERYONE SEES THE DASHBOARD OVERVIEW */}
        <NavLink to="/dashboard" end className={getNavLinkClass}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-body">Overview</span>
        </NavLink>

        {/* ADMIN & RECEPTIONIST ONLY */}
        {(userRole === 'Admin' || userRole === 'Receptionist') && (
          <>
            <NavLink to="/dashboard/guest" className={getNavLinkClass}>
              <span className="material-symbols-outlined">group</span>
              <span className="font-body">Guests</span>
            </NavLink>
            <NavLink to="/dashboard/bookings" className={getNavLinkClass}>
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-body">Bookings</span>
            </NavLink>
          </>
        )}

        {/* ADMIN & RESTAURANT STAFF ONLY */}
        {(userRole === 'Admin' || userRole === 'Waiter') && (
          <NavLink to="/dashboard/pos" className={getNavLinkClass}>
            <span className="material-symbols-outlined">restaurant</span>
            <span className="font-body">Restaurant POS</span>
          </NavLink>
        )}

        {/* ADMIN ONLY (The Secure Registration Door) */}
        {userRole === 'Admin' && (
          <NavLink to="/dashboard/staff" className={getNavLinkClass}>
            <span className="material-symbols-outlined">badge</span>
            <span className="font-body">Manage Staff</span>
          </NavLink>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-auto flex flex-col gap-3">
        {/* Only Admins and Receptionists should be able to book rooms */}
        {(userRole === 'Admin' || userRole === 'Receptionist') && (
          <button 
            onClick={() => navigate('/dashboard/new-booking')} 
            className="bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">add_circle</span>
            New Booking
          </button>
        )}

        {/* LOGOUT BUTTON */}
        <button 
          onClick={handleLogout}
          className="bg-red-50 text-red-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">logout</span>
          Secure Logout
        </button>
      </div>
    </nav>
  );
};