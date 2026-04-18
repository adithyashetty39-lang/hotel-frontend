import React from 'react';
import { mockData } from '../data/mockData';

export const Bookings: React.FC = () => {
  const { bookings } = mockData;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-primary font-headline leading-tight">Master Directory</h2>
          <p className="text-primary/60 font-medium">Manage and review all active reservations.</p>
        </div>
        <button className="bg-primary text-white py-3 px-6 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">add</span>
          New Booking
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/60 backdrop-blur-3xl p-4 rounded-full border border-white/40 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">search</span>
          <input 
            className="w-full bg-white/40 border border-white/50 rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/40 text-sm transition-all outline-none" 
            placeholder="Search by ID, Guest, or Room..." 
            type="text"
          />
        </div>
        <div className="h-8 w-px bg-primary/10 hidden md:block"></div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <button className="px-5 py-2 rounded-full border border-primary/20 text-primary font-bold hover:bg-white/40 transition-all flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Any Dates
          </button>
          <button className="px-5 py-2 rounded-full border border-primary/20 text-primary font-bold hover:bg-white/40 transition-all flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">key</span>
            Room Type
          </button>
          <button className="px-5 py-2 rounded-full border border-primary/20 text-primary font-bold hover:bg-white/40 transition-all flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Status
          </button>
        </div>
      </div>

      {/* Bookings Table / Catalog */}
      <div className="bg-white/60 backdrop-blur-3xl rounded-[24px] border border-white/40 shadow-xl overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/40 border-b border-primary/10">
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest w-16">ID</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Guest</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Room</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Dates</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest text-right">Amount</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest text-right"></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking.id} className={`hover:bg-white/40 transition-colors ${idx !== bookings.length - 1 ? 'border-b border-primary/5' : ''}`}>
                  <td className="py-4 px-6 font-semibold text-primary/60 text-sm">{booking.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={booking.avatar} alt={booking.guestName} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                      <span className="font-bold text-primary">{booking.guestName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-primary">{booking.roomName}</td>
                  <td className="py-4 px-6 text-primary/70">{booking.checkIn} - {booking.checkOut}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'Confirmed' ? 'bg-secondary-container text-on-secondary-container' : 'bg-white text-primary border border-primary/20'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-black text-secondary text-right">${booking.amount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 rounded-full hover:bg-black/5 text-primary transition-all">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
