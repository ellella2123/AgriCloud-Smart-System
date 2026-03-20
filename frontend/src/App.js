import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', city: '', crop: '', query: '' });
  const [result, setResult] = useState(null);

  const handleAction = async () => {
    const url = `/api/message?name=${formData.name}&city=${formData.city}&crop=${formData.crop}&query=${formData.query}`;
    const res = await fetch(url);
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="container">
      <header>
        <h1>🌱 AgriCloud Smart Portal</h1>
        <p>Expert Advice for Modern Farmers</p>
      </header>

      <div className="main-grid">
        {/* Section 1: Farmer Registration */}
        <section className="card">
          <h3>👨‍🌾 Farmer Registration</h3>
          <input placeholder="Farmer Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input placeholder="City" onChange={(e) => setFormData({...formData, city: e.target.value})} />
          <input placeholder="Crop (e.g. Maize, Rice)" onChange={(e) => setFormData({...formData, crop: e.target.value})} />
        </section>

        {/* Section 2: AI Chatbot */}
        <section className="card">
          <h3>🤖 Agri-AI Assistant</h3>
          <input placeholder="Ask me: 'How to plant?'" onChange={(e) => setFormData({...formData, query: e.target.value})} />
          <button onClick={handleAction}>Consult AI & Register</button>
        </section>
      </div>

      {/* Section 3: Result Display */}
      {result && (
        <div className="result-area">
          <h2>Welcome, {result.farmer}!</h2>
          <div className="info-box">
            <p><strong>Location:</strong> {result.city}</p>
            <p><strong>Target Crop:</strong> {result.crop}</p>
            <p className="ai-text"><strong>AI Expert Advice:</strong> {result.ai_advice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
