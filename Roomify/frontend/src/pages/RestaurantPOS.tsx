import React, { useState, useEffect } from 'react';
import { Coffee, Utensils, Pizza, Plus, Minus, Receipt, CheckCircle2 } from 'lucide-react';

// Static menu for now (We will wire this to your MySQL `menu_items` table next!)
const MENU_CATEGORIES = ['All', 'Starters', 'Mains', 'Drinks'];
const MOCK_MENU = [
  { id: 1, name: 'Truffle Fries', category: 'Starters', price: 450, icon: Utensils },
  { id: 2, name: 'Caesar Salad', category: 'Starters', price: 350, icon: Utensils },
  { id: 3, name: 'Margherita Pizza', category: 'Mains', price: 850, icon: Pizza },
  { id: 4, name: 'Grilled Salmon', category: 'Mains', price: 1200, icon: Utensils },
  { id: 5, name: 'Artisan Burger', category: 'Mains', price: 750, icon: Pizza },
  { id: 6, name: 'Espresso', category: 'Drinks', price: 150, icon: Coffee },
  { id: 7, name: 'Fresh Lime Soda', category: 'Drinks', price: 180, icon: Coffee },
  { id: 8, name: 'Craft Mojito', category: 'Drinks', price: 350, icon: Coffee },
];

export const RestaurantPOS: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<any[]>([]);
  
  // --- The Core Logic for Walk-in vs Room ---
  const [orderType, setOrderType] = useState<'room' | 'walk-in'>('room');
  const [selectedRoom, setSelectedRoom] = useState('');
  
  const [occupiedRooms, setOccupiedRooms] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch only Occupied rooms for the dropdown
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://hotel-management-system-1-ejha.onrender.com/api/rooms', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setOccupiedRooms(data.filter((r: any) => r.status === 'Occupied' || r.status === 'OCCUPIED'));
      } catch (err) {
        console.error("Failed to fetch occupied rooms", err);
      }
    };
    fetchRooms();
  }, []);

  // Cart Logic
  const addToCart = (item: any) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id: number, delta: number) => {
    setCart(cart.map(c => {
      if (c.id === id) return { ...c, qty: Math.max(0, c.qty + delta) };
      return c;
    }).filter(c => c.qty > 0));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.05; // 5% Restaurant Tax
  const total = subtotal + tax;

 const handlePlaceOrder = async () => {
    if (cart.length === 0) return alert('Cart is empty!');
    if (orderType === 'room' && !selectedRoom) return alert('Please select a room to bill this to.');
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://hotel-management-system-1-ejha.onrender.com/api/restaurant/order', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderType, selectedRoom, cart, total })
      });

      if (!response.ok) {
        throw new Error('Failed to send order to backend');
      }
      
      // If the backend gives the thumbs up, show the success screen!
      setIsSuccess(true);
    } catch (err) {
      alert('Cannot connect to the secure server.');
      console.error(err);
    }
  };

  const filteredMenu = activeCategory === 'All' 
    ? MOCK_MENU 
    : MOCK_MENU.filter(item => item.category === activeCategory);

  // Success Screen
  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-white/40 shadow-xl h-[80vh]">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-headline font-bold text-primary mb-2">Order Confirmed!</h2>
        <p className="text-on-surface-variant font-medium mb-8 text-center max-w-md">
          {orderType === 'room' 
            ? `₹${total.toFixed(2)} has been successfully added to Room ${selectedRoom}'s tab.` 
            : `Walk-in order for ₹${total.toFixed(2)} has been recorded as paid.`}
        </p>
        <button 
          onClick={() => { setIsSuccess(false); setCart([]); setSelectedRoom(''); }}
          className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-container transition-all"
        >
          Start New Order
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[85vh] gap-6">
      
      {/* LEFT PANEL: Menu Grid (70% width) */}
      <div className="flex-[2] flex flex-col bg-white/40 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg overflow-hidden">
        
        {/* Categories Header */}
        <div className="p-6 bg-white/40 border-b border-white/40 flex gap-4 overflow-x-auto">
          {MENU_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white/60 text-primary/60 hover:bg-white hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar">
          {filteredMenu.map(item => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                onClick={() => addToCart(item)}
                className="bg-white/70 hover:bg-white p-6 rounded-2xl border border-white hover:border-secondary/30 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group active:scale-95"
              >
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary group-hover:text-secondary" />
                </div>
                <h4 className="font-bold text-primary mb-1">{item.name}</h4>
                <span className="text-secondary font-black font-headline">₹{item.price}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT PANEL: Cart & Checkout (30% width) */}
      <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-outline-variant/15 flex items-center gap-3">
          <Receipt className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-headline font-bold text-primary">Current Order</h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-primary/30">
              <Utensils className="w-12 h-12 mb-2 opacity-50" />
              <p className="font-medium">Tap items to add to order</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-xl border border-outline-variant/10 shadow-sm">
                <div>
                  <h4 className="font-bold text-sm text-primary">{item.name}</h4>
                  <span className="text-xs text-primary/60">₹{item.price} x {item.qty}</span>
                </div>
                <div className="flex items-center gap-3 bg-surface-variant/30 p-1 rounded-lg border border-outline-variant/10">
                  <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-white rounded-md transition-colors"><Minus className="w-4 h-4 text-primary" /></button>
                  <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-white rounded-md transition-colors"><Plus className="w-4 h-4 text-primary" /></button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Footer */}
        <div className="bg-white p-6 border-t border-outline-variant/15 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          
          {/* Order Type Toggle */}
          <div className="flex bg-surface-variant/50 rounded-xl p-1 mb-6 border border-outline-variant/20">
            <button 
              onClick={() => setOrderType('room')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${orderType === 'room' ? 'bg-white text-primary shadow-sm' : 'text-primary/50 hover:text-primary'}`}
            >
              Room Charge
            </button>
            <button 
              onClick={() => setOrderType('walk-in')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${orderType === 'walk-in' ? 'bg-white text-primary shadow-sm' : 'text-primary/50 hover:text-primary'}`}
            >
              Walk-in
            </button>
          </div>

          {/* Conditional Input based on toggle */}
          {orderType === 'room' && (
            <div className="mb-6">
              <select 
                value={selectedRoom} 
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full bg-surface-variant/30 border border-primary/10 rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-secondary/20 outline-none appearance-none font-medium"
              >
                <option value="">Select Occupied Room...</option>
                {occupiedRooms.map(room => (
                  <option key={room.room_id} value={room.room_number}>
                    Room {room.room_number}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Totals */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm text-primary/60 font-medium">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-primary/60 font-medium">
              <span>GST (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-headline font-black text-primary pt-2 border-t border-outline-variant/20">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handlePlaceOrder}
            className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg ${
              cart.length > 0 ? 'bg-secondary text-on-secondary hover:bg-secondary-container hover:scale-[1.02]' : 'bg-surface-variant text-on-surface-variant/50 cursor-not-allowed'
            }`}
          >
            {orderType === 'room' ? 'Send to Room Tab' : 'Process Payment'}
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};