import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, BedDouble, Filter, Plus } from 'lucide-react';

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        // We reuse the guests route because it contains the perfect JOIN of all tables!
        const response = await fetch('https://hotel-management-system-1-ejha.onrender.com/api/guests', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(b => 
    b.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.room_number.toString().includes(searchTerm) ||
    b.booking_id.toString().includes(searchTerm)
  );

  return (
    <div className="flex-1 bg-gradient-to-br from-surface-variant/40 to-white/20 backdrop-blur-3xl rounded-3xl p-10 border border-white/60 shadow-2xl overflow-y-auto h-[85vh]">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-headline font-black text-primary">Master Directory</h2>
          <p className="text-on-surface-variant font-medium mt-1">Manage and review all active reservations.</p>
        </div>
        
        {/* --- THE FIX: WIRED UP THE NEW BOOKING BUTTON --- */}
        <button 
          onClick={() => navigate('/dashboard/new-booking')}
          className="bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-primary-container transition-all shadow-lg active:scale-95"
        >
          <Plus className="w-5 h-5" />
          New Booking
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-primary/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, Guest, or Room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/30 shadow-sm font-medium text-primary placeholder:text-primary/40 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-3 bg-white/60 border border-white/40 rounded-2xl text-primary font-bold flex items-center gap-2 hover:bg-white transition-all"><Calendar className="w-4 h-4"/> Any Dates</button>
          <button className="px-4 py-3 bg-white/60 border border-white/40 rounded-2xl text-primary font-bold flex items-center gap-2 hover:bg-white transition-all"><BedDouble className="w-4 h-4"/> Room Type</button>
          <button className="px-4 py-3 bg-white/60 border border-white/40 rounded-2xl text-primary font-bold flex items-center gap-2 hover:bg-white transition-all"><Filter className="w-4 h-4"/> Status</button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white/70 rounded-3xl border border-white/60 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-variant/30 text-primary/50 text-xs uppercase tracking-widest border-b border-outline-variant/20">
              <th className="p-6 font-bold">ID</th>
              <th className="p-6 font-bold">Guest</th>
              <th className="p-6 font-bold">Room</th>
              <th className="p-6 font-bold">Dates</th>
              <th className="p-6 font-bold text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-10 text-center font-bold text-primary/50">Loading database...</td></tr>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b.booking_id} className="border-b border-outline-variant/10 hover:bg-white/80 transition-colors group">
                  <td className="p-6 font-medium text-primary/50 text-sm">BK-{b.booking_id.toString().padStart(4, '0')}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs uppercase">
                        {b.guest_name.substring(0, 2)}
                      </div>
                      <span className="font-bold text-primary">{b.guest_name}</span>
                    </div>
                  </td>
                  <td className="p-6 font-bold text-primary">{b.room_number} <span className="text-xs text-primary/50 font-medium block">{b.room_type}</span></td>
                  <td className="p-6 text-sm font-medium text-primary/70">
                    {new Date(b.check_in).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} 
                    <span className="mx-2 text-primary/30">→</span> 
                    {new Date(b.check_out).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="p-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider
                      ${b.status === 'Active' ? 'bg-cyan-100 text-cyan-800' : 
                        b.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                        'bg-surface-variant text-on-surface-variant'}`}>
                      {b.status === 'Active' ? 'Confirmed' : b.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-10 text-center font-medium text-primary/50">No bookings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};