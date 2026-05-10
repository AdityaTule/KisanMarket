import React from 'react';

const Home = ({ onSellClick, onBuyClick, userName }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 flex flex-col items-center p-6">
      <div className="w-full max-w-md flex justify-between items-center mb-6 mt-4">
        <h1 className="text-3xl font-black text-green-800 italic">KisanMarket</h1>
        <button 
          onClick={() => { localStorage.clear(); window.location.reload(); }} 
          className="text-xs font-black text-white bg-red-500 px-4 py-2 rounded-full shadow-md active:scale-90 transition-all"
        >
          LOGOUT (बाहेर पडा)
        </button>
      </div>
      
      <div className="w-full max-w-md mb-8 bg-white/50 p-4 rounded-3xl border-2 border-white shadow-inner text-center">
        <p className="text-2xl font-bold text-green-900 tracking-tight">Namaste, {userName || 'Farmer'}! 👋</p>
      </div>

      <div className="w-full max-w-md space-y-6 flex-1">
        <button 
          onClick={onSellClick} 
          className="w-full bg-green-600 py-12 rounded-[45px] shadow-[0_12px_0_0_#1a3a16] active:shadow-none active:translate-y-2 transition-all flex flex-col items-center justify-center border-t-2 border-green-400"
        >
          <span className="text-7xl mb-2">🚜</span>
          <span className="text-white text-4xl font-black uppercase">Sell Crops</span>
          <span className="text-green-100 font-bold">माल विका / माल बेचें</span>
        </button>

        <button 
          onClick={onBuyClick} 
          className="w-full bg-orange-500 py-12 rounded-[45px] shadow-[0_12px_0_0_#9a3412] active:shadow-none active:translate-y-2 transition-all flex flex-col items-center justify-center border-t-2 border-orange-300"
        >
          <span className="text-7xl mb-2">🛒</span>
          <span className="text-white text-4xl font-black uppercase">Buy Crops</span>
          <span className="text-orange-100 font-bold">खरेदी करा / खरीदें</span>
        </button>
      </div>

      <div className="mt-8 mb-4 flex flex-col items-center opacity-70">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white animate-pulse">🎤</div>
        <p className="mt-2 font-black text-blue-700">VOICE ENABLED</p>
      </div>
    </div>
  );
};

export default Home;