import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navigation } from './layout/navigation/Navigation';
import { Navigation as NavComponent } from './components/navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './layout/footer/Footer';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <NavComponent></NavComponent>
      </header>
      <main>
        <Navigation />
      </main>
      <Footer></Footer>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
