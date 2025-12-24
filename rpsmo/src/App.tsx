import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import sgbg2 from "./images/splash_bg.jpg";
import sgbg3 from "./images/scary man bg.jpg";
import shapes from "./images/shapes bg.png";
import Home from './pages/Home';
import Rules from './pages/Rules';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isRules = location.pathname === '/rules';

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div
        key={isRules ? 'rules-bg' : 'home-bg'}
        className={`fixed inset-0 bg-center bg-no-repeat transition-opacity duration-500 ${isRules ? 'scale-125 rotate-90 blur-[2px]' : 'scale-x-125 blur-[5px]'
          }` }
        style={{
          backgroundImage: `url(${isRules ? shapes : sgbg3})`,
          // Rules (sgbg2) stays at its natural size (997x702)
          // Home (sgbg3) uses your 50% zoom setting
          backgroundSize: isRules ? 'cover' : '50%',
        }}
      />

      <div className="fixed inset-0 bg-black/10" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-[min(95vw,1000px)] h-[min(90vh,700px)] flex flex-col items-center justify-center">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/rules" element={<Rules />} />
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