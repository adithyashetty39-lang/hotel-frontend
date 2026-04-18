import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavBar } from './TopNavBar';
import { SideNavBar } from './SideNavBar';

export const AppLayout: React.FC = () => {
  return (
    <div className="bg-landscape min-h-screen selection:bg-secondary-container selection:text-on-secondary-container relative">
      <TopNavBar />
      <SideNavBar />
      <main className="lg:ml-[340px] pt-32 px-8 pb-12 max-w-[1440px] mx-auto min-h-screen">
        <Outlet />
      </main>
      
      {/* FAB for quick actions (Contextual) */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center shadow-[0_16px_32px_rgba(0,107,92,0.3)] hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-3xl">edit_calendar</span>
        </button>
      </div>
    </div>
  );
};
