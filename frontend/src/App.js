import React, { useState, useEffect } from 'react';
import './App.css';

const translations = {
  en: { title: "AgriCloud Smart Portal", name: "Farmer Name", city: "City", crop: "Crop", btn: "Analyze Suitability", advice: "AI Advice", score: "Suitability Score" },
  ha: { title: "Dandalin Noma na AgriCloud", name: "Sunan Manomi", city: "Gari", crop: "Abun Shuka", btn: "Bincika Daidaito", advice: "Shawarar AI", score: "Makin Daidaito" },
  yo: { title: "AgriCloud Dashboard fun Agbe", name: "Orukọ Agbe", city: "Ilu", crop: "Irugbin", btn: "Ṣayẹwo Ibamu", advice: "Imọran AI", score: "Ipele Ibamu" },
  ig: { title: "AgriCloud Dashboard maka Ndị Ọrụ Ugbo", name: "Aha Onye Ọrụ Ugbo", city: "Obodo", crop: "Ihe Ịkụ", btn: "Nyochaa Nfu", advice: "Ndụmọdụ AI", score: "Akara Nfu" }
};

function App() {
  const [lang, setLang] = useState('en');
  const [formData, setFormData] = useState({ name: '', city: '', crop: '' });
  const [result, setResult] = useState(null);
  
  // LOAD DATA FROM "DATABASE" (LocalStorage) ON START
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("agriData");
    return saved ? JSON.parse(saved) : [];
  });

  const t = translations[lang];

  // SAVE DATA TO "DATABASE" WHENEVER HISTORY CHANGES
  useEffect(() => {
    localStorage.setItem("agriData", JSON.stringify(history));
  }, [history]);

  const handleAction = async () => {
    const url = `/api/message?name=${formData.name}&city=${formData.city}&crop=${formData.crop}`;
    const res = await fetch(url);
    const data = await res.json();
    setResult(data);
    setHistory([data, ...history]); 
  };

  const clearDatabase = () => {
    localStorage.removeItem("agriData");
    setHistory([]);
  };

  return (
    <div className="App">
      <div className="lang-bar">
        {['en', 'ha', 'yo', 'ig'].map(l => (
          <button key={l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
        ))}
      </div>

      <div className="hero">
        <h1>{t.title}</h1>
        <p>Providing Climate-Smart Digital Identity for African Farmers.</p>
      </div>

      <div className="dashboard-container">
        <section className="glass-card">
          <h3>🚀 Farmer Registry</h3>
          <input placeholder={t.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input placeholder={t.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
          <input placeholder={t.crop} onChange={(e) => setFormData({...formData, crop: e.target.value})} />
          <button className="analyze-btn" onClick={handleAction}>{t.btn}</button>
        </section>

        <section className="glass-card score-section">
          {result ? (
            <div>
              <div className="suitability-circle">
                <h1>{result.score}</h1>
                <span>{t.score}</span>
              </div>
              <h2 className={result.rating}>{result.rating}</h2>
              <p><strong>{t.advice}:</strong> {result.advice}</p>
            </div>
          ) : <p>Awaiting satellite data...</p>}
        </section>
      </div>

      <div className="history-section glass-card">
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <h3>📋 Farmer Credit Registry (Database)</h3>
            <button onClick={clearDatabase} style={{width:'auto', padding:'5px 10px', fontSize:'10px', background:'red'}}>Clear</button>
        </div>
        <table>
          <thead>
            <tr><th>Name</th><th>Location</th><th>Crop Type</th><th>Credit Score</th></tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.farmer}</td>
                <td>{item.city}</td>
                <td style={{color:'#74c69d', fontWeight:'bold'}}>{item.crop}</td> 
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
