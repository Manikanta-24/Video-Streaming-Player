// src/App.jsx
import React from 'react';
import { Home, Settings, Search } from 'lucide-react';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Kabban</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Home size={40} color="blue" />
        <Settings size={40} color="green" />
        <Search size={40} color="red" />
      </div>
    </div>
  );
}

export default App;
