// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main className="container mx-auto p-3">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;