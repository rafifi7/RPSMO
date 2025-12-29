import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import splash from "./images/splash_bg.png";
import sgbg3 from "./images/scary man bg.jpg";
import Home from './pages/Home';
import Rules from './pages/Rules';
import Singleplayer from './pages/Singleplayer';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isGameActive, setIsGameActive] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (location.pathname === '/') {
      setIsGameActive(false);
    }
  }, [location.pathname]);

  // Add this effect to handle the fade
  useEffect(() => {
    setOpacity(0);
    const timer = setTimeout(() => setOpacity(1), 50);
    return () => clearTimeout(timer);
  }, [isGameActive]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div
        key={isGameActive ? 'active-game-bg' : 'static-menu-bg'}
        className="fixed inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${isGameActive ? splash : sgbg3})`,
          backgroundSize: isGameActive ? '32.5%' : '50%',
          transform: isGameActive ? 'scale(1.5) rotate(90deg)' : 'scaleX(1.25) rotate(0deg)',
          filter: isGameActive ? 'blur(0px)' : 'blur(5px)',
          opacity: opacity,
          transition: 'opacity 0.7s ease-in-out',
        }}
      />
      {/* rest of your code... */}

      <div className="fixed inset-0 bg-black/10" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-[min(95vw,1000px)] h-[min(90vh,700px)] flex flex-col items-center justify-center">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route
              path="/singleplayer"
              element={<Singleplayer setIsGameActive={setIsGameActive} />}
            />
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </main>
  );
};
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;