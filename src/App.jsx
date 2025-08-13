import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CancellationProvider, useCancellation } from './context/CancellationContext';
import RequireStep from './components/RequireStep';

const LossFrame = React.lazy(() => import('./components/LossFrame'));
const QuickReason = React.lazy(() => import('./components/QuickReason'));
const TailoredOffer = React.lazy(() => import('./components/TailoredOffer'));
const SecondChanceOffer = React.lazy(() => import('./components/SecondChanceOffer'));
const GoodbyePage = React.lazy(() => import('./components/GoodbyePage'));
const ConfirmationPage = React.lazy(() => import('./components/ConfirmationPage'));

// Simple reset component for testing
const ResetFlow = () => {
  const { resetCancellationFlow } = useCancellation();
  const navigate = useNavigate();
  React.useEffect(() => {
    resetCancellationFlow();
    navigate('/cancel/step-1', { replace: true });
  }, [resetCancellationFlow, navigate]);
  return <div>Resetting...</div>;
};

function App() {
  return (
    <CancellationProvider>
      <Router>
        <div className="min-h-screen bg-cc360-fade">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Navigate to="/cancel/step-1" replace />} />
              <Route path="/cancel/step-1" element={<LossFrame />} />
              <Route path="/cancel/step-2" element={
                <RequireStep minStep={2}>
                  <QuickReason />
                </RequireStep>
              } />
              <Route path="/cancel/step-3" element={
                <RequireStep minStep={3}>
                  <TailoredOffer />
                </RequireStep>
              } />
              <Route path="/cancel/step-4" element={
                <RequireStep minStep={4}>
                  <SecondChanceOffer />
                </RequireStep>
              } />
              <Route path="/cancel/step-5" element={
                <RequireStep minStep={5}>
                  <GoodbyePage />
                </RequireStep>
              } />
              <Route path="/cancel/confirmation" element={
                <RequireStep minStep={6}>
                  <ConfirmationPage />
                </RequireStep>
              } />
              <Route path="/cancel/reset" element={<ResetFlow />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </CancellationProvider>
  );
}

export default App;