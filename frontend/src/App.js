import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', city: '', crop: '', query: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!formData.city || !formData.name) {
      alert("Please enter at least your Name and City!");
      return;
    }
    setLoading(true);
    try {
      // This sends all 4 pieces of data to your Python backend
      const url = `/api/message?name=${formData.name}&city=${formData.city}&crop=${formData.crop}&query=${formData.query}`;
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("System update in progress. Please try again in 1 minute.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🌱 AgriCloud Smart Dashboard</h1>
        <p>Your Personal Agricultural AI Assistant</p>
      </header>

      <div className="main-grid">
        <section className="card">
          <h3>👨‍🌾 Personal & Farm Details</h3>
          <input placeholder="Your Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input placeholder="Your City (for Weather Advice)" onChange={(e) => setFormData({...formData, city: e.target.value})} />
          <input placeholder="What crop are you planting?" onChange={(e) => setFormData({...formData, crop: e.target.value})} />
        </section>

        <section className="card">
          <h3>🤖 AI Expert Chat</h3>
          <p style={{fontSize: '0.9rem', color: '#666'}}>Ask things like: "How do I plant maize?" or "Best time for fertilizer?"</p>
          <input placeholder="Enter your question here..." onChange={(e) => setFormData({...formData, query: e.target.value})} />
          <button onClick={handleAction} disabled={loading}>
            {loading ? "Analyzing Data..." : "Get AI Advice & Weather"}
          </button>
        </section>
      </div>

      {result && (
        <div className="result-area">
          <h2>Hello, {result.farmer}!</h2>
          <div className="info-box">
            <p>📍 <strong>Location:</strong> {result.city}</p>
            <p>🌾 <strong>Crop Focus:</strong> {result.crop || "General Farming"}</p>
            <p>🌡️ <strong>Current Temperature:</strong> {result.weather_temp}</p>
            <div className="ai-text">
               <p><strong>💡 AI Agricultural Advice:</strong> {result.ai_advice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
