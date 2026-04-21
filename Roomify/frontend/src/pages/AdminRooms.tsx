import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export const AdminRooms: React.FC = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any>(null);

  // Form State
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('Standard');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Available');

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/rooms', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const openNewRoomModal = () => {
    setEditingRoom(null);
    setRoomNumber('');
    setRoomType('Standard');
    setPrice('');
    setStatus('Available');
    setIsModalOpen(true);
  };

  const openEditModal = (room: any) => {
    setEditingRoom(room);
    setRoomNumber(room.room_number);
    setRoomType(room.type);
    setPrice(room.price_per_night);
    setStatus(room.status);
    setIsModalOpen(true);
  };

 const handleSaveRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = { 
        room_number: roomNumber, 
        type: roomType, 
        price_per_night: price, 
        status 
      };

      // If we are editing, hit the PUT route. If it's a new room, hit POST.
      const url = editingRoom 
        ? `http://localhost:5000/api/rooms/${editingRoom.room_id}`
        : 'http://localhost:5000/api/rooms';
        
      const method = editingRoom ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save room');

      setIsModalOpen(false);
      fetchRooms(); // Instantly refresh the table!
    } catch (err) {
      console.error(err);
      alert('Error saving room.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete');
      
      fetchRooms(); // Instantly refresh the table!
    } catch (err: any) {
      alert(err.message); // Shows our smart database protection message!
    }
  };
  return (
    <div className="flex-1 bg-white/40 backdrop-blur-3xl rounded-3xl p-10 border border-white/60 shadow-2xl overflow-y-auto h-[85vh]">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-headline font-black text-primary">Room Database</h2>
          <p className="text-on-surface-variant font-medium mt-1">Manage physical inventory, pricing, and maintenance.</p>
        </div>
        <button 
          onClick={openNewRoomModal}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-all shadow-lg active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add New Room
        </button>
      </div>

      {/* Database Table */}
      <div className="bg-white/70 rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-variant/30 text-primary/60 text-sm uppercase tracking-wider border-b border-outline-variant/20">
              <th className="p-5 font-bold">Room No.</th>
              <th className="p-5 font-bold">Type</th>
              <th className="p-5 font-bold">Price (₹)</th>
              <th className="p-5 font-bold">Status</th>
              <th className="p-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.room_id} className="border-b border-outline-variant/10 hover:bg-white transition-colors">
                <td className="p-5 font-black text-primary">Room {room.room_number}</td>
                <td className="p-5 font-medium text-on-surface-variant">{room.type}</td>
                <td className="p-5 font-bold text-secondary">₹{room.price_per_night}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold 
                    ${room.status === 'Available' || room.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' : 
                      room.status === 'Occupied' || room.status === 'OCCUPIED' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {room.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-5 flex justify-end gap-3">
                  <button onClick={() => openEditModal(room)} className="p-2 bg-surface-variant/50 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(room.room_id)} className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-white/40">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-primary/40 hover:text-red-500 transition-colors">
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-headline font-bold text-primary mb-6">
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary/60 uppercase mb-1">Room Number</label>
                <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} className="w-full bg-surface-variant/30 border border-primary/10 rounded-xl py-3 px-4 font-bold text-primary focus:ring-2 focus:ring-secondary/20 outline-none" placeholder="e.g., 105" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-primary/60 uppercase mb-1">Room Type</label>
                  <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full bg-surface-variant/30 border border-primary/10 rounded-xl py-3 px-4 font-bold text-primary outline-none appearance-none">
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary/60 uppercase mb-1">Price / Night</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-surface-variant/30 border border-primary/10 rounded-xl py-3 px-4 font-bold text-primary focus:ring-2 focus:ring-secondary/20 outline-none" placeholder="₹" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary/60 uppercase mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-surface-variant/30 border border-primary/10 rounded-xl py-3 px-4 font-bold text-primary outline-none appearance-none">
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied (Warning)</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <button onClick={handleSaveRoom} className="w-full mt-4 bg-primary hover:bg-primary-container text-white py-4 rounded-xl font-bold transition-all">
                {editingRoom ? 'Update Database' : 'Add to Database'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};