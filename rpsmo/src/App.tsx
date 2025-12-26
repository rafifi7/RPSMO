import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import splash from "./images/splash_bg.jpg";
import sgbg3 from "./images/scary man bg.jpg";
import shapes from "./images/shapes bg.png";
import Home from './pages/Home';
import Rules from './pages/Rules';
import Singleplayer from './pages/Singleplayer';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isGameActive, setIsGameActive] = useState(false);

  // Determine which background to show
  const isSingleplayerPath = location.pathname === '/singleplayer';
  const isRulesPath = location.pathname === '/rules';

  useEffect(() => {
    if (location.pathname === '/') {
      setIsGameActive(false);
    }
  }, [location.pathname]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div
        key={isGameActive ? 'rules-bg' : 'home-bg'}
        className={`fixed inset-0 bg-center bg-no-repeat transition-opacity duration-500 ${isGameActive ? 'scale-150 rotate-90 ' : 'scale-x-125 blur-[5px]'
          }` }
        style={{
          backgroundImage: `url(${isGameActive ? splash : sgbg3})`,
          // Rules (sgbg2) stays at its natural size (997x702)
          // Home (sgbg3) uses your 50% zoom setting
          backgroundSize: isGameActive ? '32.5%' : '50%',
        }}
      />

      <div className="fixed inset-0 bg-black/10" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-[min(95vw,1000px)] h-[min(90vh,700px)] flex flex-col items-center justify-center">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/singleplayer" element={<Singleplayer setIsGameActive={setIsGameActive} />} />
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