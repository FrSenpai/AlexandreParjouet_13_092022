import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navigation } from './layout/navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        
      </header>
      <main>
        <Navigation />
      </main>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
