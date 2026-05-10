import React, { useState } from 'react';

const BuyerBrowse = ({ onBack, items }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Wheat', 'Rice', 'Vegetable', 'Fruit', 'Pulse'];

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="p-6 bg-orange-600 text-white flex items-center shadow-lg sticky top-0 z-20">
        <button onClick={onBack} className="text-4xl mr-4 active:scale-75 transition-all">⬅️</button>
        <h1 className="text-3xl font-black uppercase italic">The Bazaar</h1>
      </div>

      {/* Horizontal Category Scroll */}
      <div className="flex overflow-x-auto p-4 gap-3 bg-white shadow-sm sticky top-[88px] z-10 no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-3 rounded-full font-black text-lg whitespace-nowrap transition-all ${
              filter === cat ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📭</p>
            <p className="text-2xl font-bold text-gray-400 italic">No crops found in this category.</p>
          </div>
        ) : (
          filteredItems.map((crop) => (
            <div key={crop.id} className="bg-white rounded-[40px] border-b-8 border-gray-200 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="p-6">
                 <div className="flex items-center">
                    <div className="text-6xl mr-6 bg-orange-50 w-24 h-24 flex items-center justify-center rounded-3xl shadow-inner">🌾</div>
                    <div>
                      <h2 className="text-4xl font-black text-gray-800 uppercase tracking-tighter">{crop.name}</h2>
                      <p className="text-2xl font-bold text-orange-600 italic">{crop.price} <span className="text-gray-400 text-lg">/ {crop.qty}</span></p>
                    </div>
                 </div>
                 <div className="mt-4 flex items-center bg-gray-50 p-3 rounded-2xl">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">👤</div>
                    <p className="text-gray-600 font-black italic">Farmer: {crop.farmer}</p>
                 </div>
              </div>
              <div className="flex border-t-4 border-gray-50">
                <a href={`tel:${crop.phone}`} className="flex-1 bg-green-600 text-white py-8 text-3xl font-black flex items-center justify-center gap-2 border-r-2 border-white active:bg-green-800">
                  📞 CALL
                </a>
                <a href={`https://wa.me/91${crop.phone}?text=Namaste! I saw your ${crop.name} on KisanMarket.`} className="flex-1 bg-blue-500 text-white py-8 text-3xl font-black flex items-center justify-center gap-2 active:bg-blue-800">
                  💬 CHAT
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BuyerBrowse;