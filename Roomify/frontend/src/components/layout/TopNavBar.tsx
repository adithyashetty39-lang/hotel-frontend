import React from 'react';

export const TopNavBar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 lg:left-[340px] right-0 z-40 flex justify-between items-center px-8 h-20 max-w-[1060px] mx-auto bg-white/60 backdrop-blur-3xl rounded-full mt-4 mx-8 lg:mx-auto shadow-[0_32px_64px_-15px_rgba(0,54,8,0.1)]">
      <div className="flex items-center gap-8 flex-1">
        <div className="text-xl font-bold tracking-tight text-primary font-headline hidden sm:block">
          Organic Concierge
        </div>
        <div className="relative w-full max-w-md hidden md:block">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">search</span>
          <input className="w-full bg-white/40 border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/40 text-sm transition-all" placeholder="Search guests, rooms, or events..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-3 rounded-full hover:bg-emerald-50/50 transition-all active:scale-90 text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-1 rounded-full hover:bg-emerald-50/50 transition-all active:scale-90 text-primary border border-white/40 bg-white/20">
          <img alt="User Profile" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqUyNZ1kLeuYvBaWBEQ9H9n4Z5FaclcRsly0YOeYa_j07PxIgel240-vKvYDmDd4H7EtENFCp6RTmlIdvwLUBgmTtM_6Mg74XVnhpMHvtSSI97rg9hFRvHOILmpA2-PBoZV0zj7f53-QOwu8DzQZYNy6tifAEd7KijT0O11BZaT8xWk78uCtoPY4DfHyQaLDWUIz4XTyiTe9cLB7IvrPTfXTfNBDUmiUflotIjrmU88k6YIGGxnRMMHb1ClVbTCO40tdExVAMar1o"/>
        </button>
      </div>
    </header>
  );
};
