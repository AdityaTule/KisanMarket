import React, { useState } from 'react';

const FarmerAdd = ({ onBack, onFinish }) => {
  const [step, setStep] = useState(1);
  const [cropName, setCropName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Magic Voice Function
  const startListening = (fieldSetter) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice not supported on this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Set to Hindi/Marathi/English mix
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      fieldSetter(transcript);
    };
    recognition.start();
  };

  const handleComplete = () => {
    if(!cropName || !qty || !price) return alert("Please fill all details!");
    onFinish({ name: cropName, qty: qty, price: `₹${price}` });
    alert("माल यशस्वीरीत्या जमा झाला! (Posted Successfully!)");
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="text-4xl mr-4 bg-gray-100 p-2 rounded-full">⬅️</button>
        <h1 className="text-2xl font-black text-green-800 tracking-tight">UPLOAD {step}/3</h1>
      </div>

      {isListening && (
        <div className="fixed inset-0 bg-green-600/90 flex flex-col items-center justify-center z-50 text-white">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center animate-ping text-5xl">🎤</div>
          <p className="mt-10 text-3xl font-black italic text-center px-6">Listening... <br/> (बोला, मी ऐकत आहे...)</p>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col flex-1">
          <p className="text-3xl font-bold mb-6 text-center text-gray-700">What are you selling?</p>
          <div className="relative mb-10">
            <input 
              type="text" 
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="Wheat, Rice, etc." 
              className="w-full p-8 text-4xl rounded-3xl border-4 border-green-600 text-center shadow-inner" 
            />
            <button onClick={() => startListening(setCropName)} className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl bg-green-100 p-4 rounded-full shadow-md">🎤</button>
          </div>
          <button onClick={() => setStep(2)} className="w-full mt-auto bg-green-600 text-white py-8 rounded-3xl text-3xl font-black shadow-xl border-b-8 border-green-900">
            NEXT (पुढे जा)
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col flex-1">
          <p className="text-3xl font-bold mb-6 text-center text-gray-700">How much weight?</p>
          <div className="relative mb-10">
            <input 
              type="text" 
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="e.g. 100 kg" 
              className="w-full p-8 text-4xl rounded-3xl border-4 border-green-600 text-center shadow-inner" 
            />
            <button onClick={() => startListening(setQty)} className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl bg-green-100 p-4 rounded-full shadow-md">🎤</button>
          </div>
          <button onClick={() => setStep(3)} className="w-full mt-auto bg-green-600 text-white py-8 rounded-3xl text-3xl font-black shadow-xl border-b-8 border-green-900">
            NEXT (पुढे जा)
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col flex-1">
          <p className="text-3xl font-bold mb-6 text-center text-gray-700">Total Price?</p>
          <div className="relative mb-10">
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="₹ 0" 
              className="w-full p-8 text-5xl rounded-3xl border-4 border-orange-500 text-center text-orange-600 font-bold" 
            />
            <button onClick={() => startListening(setPrice)} className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl bg-orange-100 p-4 rounded-full shadow-md">🎤</button>
          </div>
          <button onClick={handleComplete} className="w-full mt-auto bg-orange-500 text-white py-10 rounded-3xl text-4xl font-black shadow-xl border-b-8 border-orange-800">
            FINISH (पूर्ण झाले)
          </button>
        </div>
      )}
    </div>
  );
};

export default FarmerAdd;