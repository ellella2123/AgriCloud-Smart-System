import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [report, setReport] = useState(null);

  const getAgriData = async () => {
    const res = await fetch(`/api/message?city=${city}`);
    const data = await res.json();
    setReport(data);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f0fdf4', minHeight: '100vh' }}>
      <h1>🌱 AgriCloud Smart Dashboard</h1>
      <input onChange={(e) => setCity(e.target.value)} placeholder="Enter City..." style={{padding:'10px'}} />
      <button onClick={getAgriData} style={{padding:'10px', marginLeft:'5px', backgroundColor:'#22c55e', color:'white', border:'none'}}>Get Advice</button>
      {report && (
        <div style={{marginTop:'20px', border:'2px solid green', padding:'20px', display:'inline-block'}}>
          <h2>{report.city}</h2>
          <p>Advice: {report.advice}</p>
        </div>
      )}
    </div>
  );
}
export default App; 
