import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  // 1. Set up state for inputs and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // 2. Set up the navigator to redirect after login
  const navigate = useNavigate();

  // 3. The function that talks to your backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page from refreshing
    setErrorMsg('');    // Clear old errors

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        
        // Decode the token to see who just logged in
        const decodedToken: any = jwtDecode(data.token);
        const userRole = decodedToken.role;

        // Redirect based on their role!
        if (userRole === 'Admin' || userRole === 'Manager') {
          navigate('/dashboard'); // Admins go to the main dashboard
        } else if (userRole === 'Restaurant') {
          navigate('/pos'); // Waiters go straight to the food ordering system
        } else if (userRole === 'Receptionist') {
          navigate('/dashboard'); // Reception goes straight to room bookings
        } else {
          navigate('/dashboard'); // Default fallback
        }
      }else {
        // Show backend error (e.g., "User not found")
        setErrorMsg(data.error || 'Login failed.');
      }
    } catch (err) {
      setErrorMsg('Cannot connect to the server. Is your backend running?');
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Layer 0: Full-bleed landscape background */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Lush forest landscape"
          className="w-full h-full object-cover scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtrEPgowv4n6VHz2AUOdHXtPvWW2gLKaXxj3Na2AWCsUvgviLQst-FHDrJtnNAkLB5mNEc76y9b12yc5pW9g_5RnBQb8F75yA9lgcgglFVCZ2nv8OMbaGoD6HKdUtN_AE_qCIzAq1dDufYCuOat5x-UeVNprIHoDTz57xbcy2YsgmSEKZ2MJ0mYZwf-B-VSYlesVR3-npPPKqDsxkEzglu21mTaCGtPH0tpQol_iqoPjpUTrv8rBXVv6dDbGQQwHPd1EBmUGT7JjA"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
      </div>

      {/* Login Container */}
      <main className="w-full max-w-md relative z-10">
        {/* Header / Logo Area */}
        <div className="flex flex-col items-center mb-10 space-y-2">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-lg flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-white text-4xl">spa</span>
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
            Organic Concierge
          </h1>
          <p className="text-white/80 font-medium tracking-wide">Grow Smart. Trade Fresh.</p>
        </div>

        {/* Central Element: Asymmetrical Glass Panel */}
        <div className="glass-panel rounded-lg p-10 pb-12 shadow-2xl relative overflow-hidden transform -rotate-1 md:rotate-0">
          {/* Decorative organic bloom inside glass */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <h2 className="font-headline text-2xl font-bold text-primary">Welcome Back</h2>
              <p className="text-on-surface-variant/70 text-sm mt-1">Please enter your credentials to access the living canvas.</p>
              
              {/* Dynamic Error Message Display */}
              {errorMsg && (
                <div className="mt-3 p-3 bg-red-100 text-red-600 rounded-md text-sm font-semibold border border-red-200">
                  {errorMsg}
                </div>
              )}
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="relative organic-glow rounded-lg bg-surface/50 transition-all duration-300">
                <input
                  id="email"
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="floating-label-input block w-full px-6 pt-7 pb-2 bg-transparent border-0 rounded-lg text-primary focus:ring-0 peer transition-all outline-none"
                />
                <label
                  htmlFor="email"
                  className="absolute text-on-surface-variant/60 duration-300 transform -translate-y-1/2 top-1/2 left-6 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-85 peer-focus:-translate-y-5 pointer-events-none"
                >
                  Email Address
                </label>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-primary/30">mail</span>
              </div>

              {/* Password Field */}
              <div className="relative organic-glow rounded-lg bg-surface/50 transition-all duration-300">
                <input
                  id="password"
                  type="password"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="floating-label-input block w-full px-6 pt-7 pb-2 bg-transparent border-0 rounded-lg text-primary focus:ring-0 peer transition-all outline-none"
                />
                <label
                  htmlFor="password"
                  className="absolute text-on-surface-variant/60 duration-300 transform -translate-y-1/2 top-1/2 left-6 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-85 peer-focus:-translate-y-5 pointer-events-none"
                >
                  Password
                </label>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-primary/30">lock</span>
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-xs font-semibold text-secondary hover:text-primary transition-colors duration-300">
                  Forgot Password?
                </a>
              </div>

              {/* Action Button (Changed to a submit button) */}
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-headline py-4 rounded-full shadow-[0_10px_30px_-10px_rgba(0,54,8,0.5)] transition-all duration-500 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 group block mt-6 text-center"
              >
                <span className="text-lg font-bold tracking-wide">Enter the Ecosystem</span>
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-10 text-center">
              <p className="text-on-surface-variant/60 text-sm">
                Don't have an account?
                <Link to="/register" className="text-primary font-bold ml-1 hover:underline underline-offset-4 decoration-secondary/30 transition-all">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Ambient Footer */}
        <div className="mt-8 flex justify-center space-x-6 opacity-60">
          <div className="flex items-center space-x-1">
            <span className="material-symbols-outlined text-xs text-white">shield</span>
            <span className="text-[10px] text-white font-medium uppercase tracking-widest">Secure Access</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="material-symbols-outlined text-xs text-white">public</span>
            <span className="text-[10px] text-white font-medium uppercase tracking-widest">Global Concierge</span>
          </div>
        </div>
      </main>

      {/* Visual Polish */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-secondary/40 rounded-full blur-sm z-0"></div>
      <div className="absolute bottom-1/3 right-20 w-3 h-3 bg-white/30 rounded-full blur-md z-0"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-primary-fixed/50 rounded-full z-0"></div>
    </div>
  );
};