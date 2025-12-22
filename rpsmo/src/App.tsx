// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import sgbg from "./images/squidgame_bg.png"

import Home from './pages/Home';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main className="relative min-h-screen w-full overflow-hidden">
        {/* Background image with blur */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat blur-sm"
          style={{
            backgroundImage: `url(${sgbg})`
          }}
        />
        
        {/* Optional: Dark overlay for better readability */}
        <div className="fixed inset-0 bg-black/30" />

        <div className="relative z-10 container mx-auto p-3">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;