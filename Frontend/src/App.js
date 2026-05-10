import React, { useState, useEffect } from 'react';
import Home from './Home';
import FarmerAdd from './FarmerAdd';
import BuyerBrowse from './BuyerBrowse';

function App() {
  // Check if user is already saved in the browser
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kisan_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [screen, setScreen] = useState('home');
  const [products, setProducts] = useState([]);
  const [loginData, setLoginData] = useState({ name: '', phone: '' });

  // Fetch products from server
  const fetchProducts = () => {
    fetch('https://kisan-market-api.onrender.com')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Server not found. Is app.py running?"));
  };

  useEffect(() => {
    if (user) fetchProducts();
  }, [screen, user]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.name || !loginData.phone) return alert("Please enter Name and Phone!");

    fetch('https://kisan-market-api.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(userData => {
      localStorage.setItem('kisan_user', JSON.stringify(userData));
      setUser(userData);
    })
    .catch(err => alert("Server Error! Make sure app.py is running in the terminal."));
  };

  const saveCrop = (newCrop) => {
    const finalData = { 
        ...newCrop, 
        farmer_id: user.id, 
        farmer_name: user.name, 
        farmer_phone: user.phone 
    };

    fetch('https://kisan-market-api.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData)
    })
    .then(() => setScreen('home'))
    .catch(err => alert("Could not save. Check server."));
  };

  // 1. LOGIN SCREEN
  if (!user) {
    return (
      <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-10">
        <h1 className="text-white text-5xl font-black mb-10 tracking-tighter">KisanMarket</h1>
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <input 
            required 
            type="text" 
            placeholder="Your Name (तुमचे नाव)" 
            className="w-full p-6 rounded-3xl text-2xl border-none shadow-xl focus:ring-4 ring-orange-300 outline-none" 
            onChange={e => setLoginData({...loginData, name: e.target.value})} 
          />
          <input 
            required 
            type="number" 
            placeholder="Phone (फोन नंबर)" 
            className="w-full p-6 rounded-3xl text-2xl border-none shadow-xl focus:ring-4 ring-orange-300 outline-none" 
            onChange={e => setLoginData({...loginData, phone: e.target.value})} 
          />
          <button type="submit" className="w-full bg-orange-500 text-white py-6 rounded-3xl text-3xl font-black shadow-2xl active:scale-95 transition-transform">
            START (सुरु करा)
          </button>
        </form>
      </div>
    );
  }

  // 2. MAIN APP SCREENS
  return (
    <div className="min-h-screen bg-gray-50">
      {screen === 'home' && (
        <Home 
          onSellClick={() => setScreen('sell')} 
          onBuyClick={() => setScreen('buy')} 
          userName={user.name} 
        />
      )}
      {screen === 'sell' && (
        <FarmerAdd 
          onBack={() => setScreen('home')} 
          onFinish={saveCrop} 
        />
      )}
      {screen === 'buy' && (
        <BuyerBrowse 
          onBack={() => setScreen('home')} 
          items={products} 
        />
      )}
    </div>
  );
}

export default App;