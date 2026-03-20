import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', city: '', crop: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!formData.city || !formData.name) return alert("Please enter Name and City");
    setLoading(true);
    try {
      const url = `/api/message?name=${formData.name}&city=${formData.city}&crop=${formData.crop}`;
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="App">
      {/* 1. ATTENTION GRABBING HERO */}
      <div className="hero">
        <h1>AgriCloud <span style={{color:'#fff'}}>Intelligence</span></h1>
        <p>Harnessing satellite data and AI to give farmers 100% accurate planting suitability scores across Africa.</p>
      </div>

      <div className="dashboard-container">
        {/* 2. REGISTRATION CARD */}
        <section className="glass-card">
          <h3>🚀 Start Analysis</h3>
          <p style={{color:'#aaa', fontSize:'0.9rem'}}>Enter details to sync with satellite data.</p>
          <input placeholder="Farmer Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input placeholder="City Location (e.g. Jalingo)" onChange={(e) => setFormData({...formData, city: e.target.value})} />
          <input placeholder="Crop Type (e.g. Maize, Rice)" onChange={(e) => setFormData({...formData, crop: e.target.value})} />
          <button className="analyze-btn" onClick={handleAction}>
            {loading ? "📡 Syncing Satellite..." : "Analyze Farming Suitability"}
          </button>
        </section>

        {/* 3. DYNAMIC RESULT CARD */}
        <section className="glass-card score-section">
          {!result ? (
            <div style={{padding:'50px', color:'#555'}}>
              <p>Awaiting farmer data...</p>
              <p style={{fontSize:'0.8rem'}}>Results will appear here after analysis.</p>
            </div>
          ) : (
            <div className="fadeIn">
              <div className="suitability-circle">
                <h1 style={{margin:0, color:'#fff', fontSize:'3rem'}}>{result.score}</h1>
                <span style={{fontSize:'0.8rem'}}>SCORE</span>
              </div>
              <h2 className={result.rating}>{result.rating} Conditions</h2>
              <div style={{textAlign:'left', background:'rgba(0,0,0,0.2)', padding:'15px', borderRadius:'10px'}}>
                <p>📍 <strong>Location:</strong> {result.city}</p>
                <p>🌡️ <strong>Temp:</strong> {result.temp}</p>
                <p>💡 <strong>Expert Advice:</strong> {result.advice}</p>
              </div>
              <p style={{fontSize:'0.8rem', marginTop:'15px', color:'#74c69d'}}>✔ Farmer {result.farmer} registered successfully.</p>
            </div>
          )}
        </section>
      </div>
      
      <footer style={{textAlign:'center', color:'#444', paddingBottom:'40px'}}>
        AgriCloud Smart Systems © 2026 | Powered by Azure AI
      </footer>
    </div>
  );
}

export default App;
