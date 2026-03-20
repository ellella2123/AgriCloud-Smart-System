import React, { useState } from 'react';
import './App.css';

// Translation Dictionary
const translations = {
  en: { title: "AgriCloud Smart Portal", name: "Farmer Name", city: "City", crop: "Crop", btn: "Analyze Suitability", advice: "AI Advice", score: "Suitability Score", location: "Location" },
  ha: { title: "Dandalin Noma na AgriCloud", name: "Sunan Manomi", city: "Gari", crop: "Abun Shuka", btn: "Bincika Daidaito", advice: "Shawarar AI", score: "Makin Daidaito", location: "Wuri" },
  yo: { title: "AgriCloud Dashboard fun Agbe", name: "Orukọ Agbe", city: "Ilu", crop: "Irugbin", btn: "Ṣayẹwo Ibamu", advice: "Imọran AI", score: "Ipele Ibamu", location: "Ibugbe" },
  ig: { title: "AgriCloud Dashboard maka Ndị Ọrụ Ugbo", name: "Aha Onye Ọrụ Ugbo", city: "Obodo", crop: "Ihe Ịkụ", btn: "Nyochaa Nfu", advice: "Ndụmọdụ AI", score: "Akara Nfu", location: "Ebe" }
};

function App() {
  const [lang, setLang] = useState('en');
  const [formData, setFormData] = useState({ name: '', city: '', crop: '' });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]); // This is our "Database" for the demo
  const t = translations[lang];

  const handleAction = async () => {
    const url = `/api/message?name=${formData.name}&city=${formData.city}&crop=${formData.crop}`;
    const res = await fetch(url);
    const data = await res.json();
    setResult(data);
    setHistory([data, ...history]); // Add to the "Farmer History" list
  };

  return (
    <div className="App">
      {/* LANGUAGE TOGGLE */}
      <div className="lang-bar">
        <button onClick={() => setLang('en')}>English</button>
        <button onClick={() => setLang('ha')}>Hausa</button>
        <button onClick={() => setLang('yo')}>Yoruba</button>
        <button onClick={() => setLang('ig')}>Igbo</button>
      </div>

      <div className="hero">
        <h1>{t.title}</h1>
        <p>Climate-Smart Intelligence for African Food Security.</p>
      </div>

      <div className="dashboard-container">
        <section className="glass-card">
          <h3>🚀 {lang === 'en' ? "Farmer Registry" : t.btn}</h3>
          <input placeholder={t.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input placeholder={t.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
          <input placeholder={t.crop} onChange={(e) => setFormData({...formData, crop: e.target.value})} />
          <button className="analyze-btn" onClick={handleAction}>{t.btn}</button>
        </section>

        <section className="glass-card">
          {result ? (
            <div className="score-section">
               <div className="suitability-circle">
                <h1>{result.score}</h1>
                <span>{t.score}</span>
              </div>
              <h2 className={result.rating}>{result.rating}</h2>
              <p><strong>{t.advice}:</strong> {result.advice}</p>
            </div>
          ) : (
            <p>Ready for analysis...</p>
          )}
        </section>
      </div>

      {/* FARMER HISTORY (DATABASE DISPLAY) */}
      <div className="history-section glass-card">
        <h3>📋 Recent Farmer Registry (Database Persistence)</h3>
        <table>
          <thead>
            <tr><th>Name</th><th>Location</th><th>Crop</th><th>Credit Score</th></tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}><td>{item.farmer}</td><td>{item.city}</td><td>{item.crop}</td><td>{item.score}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
