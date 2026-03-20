import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', city: '', crop: '', query: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      const url = `/api/message?name=${formData.name}&city=${formData.city}&crop=${formData.crop}`;
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
    } catch (e) { alert("Syncing with satellite..."); }
    finally { setLoading(false); }
  };

  return (
    <div className="container">
      <header>
        <h1>🌱 AgriCloud Smart Portal</h1>
        <p>Real-Time Farming Suitability Index</p>
      </header>

      <div className="main-grid">
        <section className="card">
          <h3>👨‍🌾 Details</h3>
          <input placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input placeholder="City (e.g. Jalingo)" onChange={(e) => setFormData({...formData, city: e.target.value})} />
          <input placeholder="Crop" onChange={(e) => setFormData({...formData, crop: e.target.value})} />
          <button onClick={handleAction}>{loading ? "Calculating..." : "Analyze Suitability"}</button>
        </section>

        {result && (
          <section className="result-card">
            <div className="score-circle">
              <h2>{result.score}</h2>
              <span>Suitability</span>
            </div>
            <div className="details">
              <h3>Status: <span className={result.rating}>{result.rating}</span></h3>
              <p>🌡️ <strong>Temperature:</strong> {result.temp}</p>
              <p>💡 <strong>Advice:</strong> {result.advice}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
