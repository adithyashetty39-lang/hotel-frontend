import React from 'react';
import { mockData } from '../data/mockData';

export const GuestProfile: React.FC = () => {
  const guest = mockData.guestProfiles.sarah_jenkins;

  return (
    <div className="space-y-12">
      {/* Guest Hero Card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/30 transition-all rounded-3xl"></div>
        <div className="relative bg-white/60 backdrop-blur-3xl p-10 rounded-[24px] border border-white/40 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8">
          <img 
            src={guest.avatarUrl} 
            alt={guest.name} 
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white/50" 
          />
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h2 className="text-4xl font-extrabold text-primary font-headline">{guest.name}</h2>
              <span className="px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-sm font-bold shadow-sm whitespace-nowrap">
                {guest.status}
              </span>
            </div>
            <p className="text-primary/60 font-medium mb-8">Member since {guest.memberSince}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/40 p-4 rounded-xl border border-white/30 text-center md:text-left">
                <span className="text-xs uppercase tracking-widest text-primary/60 font-bold block mb-1">Total Spent</span>
                <span className="text-2xl font-black text-secondary">${guest.totalSpent.toLocaleString()}</span>
              </div>
              <div className="bg-white/40 p-4 rounded-xl border border-white/30 text-center md:text-left">
                <span className="text-xs uppercase tracking-widest text-primary/60 font-bold block mb-1">Nights Stayed</span>
                <span className="text-2xl font-black text-secondary">{guest.nightsStayed}</span>
              </div>
              <div className="bg-white/40 p-4 rounded-xl border border-white/30 text-center md:text-left">
                <span className="text-xs uppercase tracking-widest text-primary/60 font-bold block mb-1">Last Stay</span>
                <span className="text-2xl font-black text-secondary font-headline">{guest.lastStay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking History */}
      <section>
        <h3 className="text-2xl font-bold text-primary font-headline mb-6">Booking History</h3>
        <div className="bg-white/60 backdrop-blur-3xl rounded-[24px] border border-white/40 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/40 border-b border-primary/10">
                  <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Booking ID</th>
                  <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Suite</th>
                  <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Check-in</th>
                  <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Check-out</th>
                  <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Status</th>
                  <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {guest.history.map((booking, idx) => (
                  <tr key={booking.id} className={`hover:bg-white/40 transition-colors ${idx !== guest.history.length - 1 ? 'border-b border-primary/5' : ''}`}>
                    <td className="py-5 px-6 font-semibold text-primary">{booking.id}</td>
                    <td className="py-5 px-6 font-bold text-primary">{booking.room}</td>
                    <td className="py-5 px-6 text-primary/70">{booking.checkIn}</td>
                    <td className="py-5 px-6 text-primary/70">{booking.checkOut}</td>
                    <td className="py-5 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'Completed' ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-secondary-container text-on-secondary-container'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 font-black text-secondary text-right">${booking.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
