import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CancellationProvider } from './context/CancellationContext';
import LossFrame from './components/LossFrame';
import QuickReason from './components/QuickReason';
import TailoredOffer from './components/TailoredOffer';
import SecondChanceOffer from './components/SecondChanceOffer';
import GoodbyePage from './components/GoodbyePage';
import ConfirmationPage from './components/ConfirmationPage';

function App() {
  return (
    <CancellationProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <Routes>
            <Route path="/" element={<Navigate to="/cancel/step-1" replace />} />
            <Route path="/cancel/step-1" element={<LossFrame />} />
            <Route path="/cancel/step-2" element={<QuickReason />} />
            <Route path="/cancel/step-3" element={<TailoredOffer />} />
            <Route path="/cancel/step-4" element={<SecondChanceOffer />} />
            <Route path="/cancel/step-5" element={<GoodbyePage />} />
            <Route path="/cancel/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </div>
      </Router>
    </CancellationProvider>
  );
}

export default App;