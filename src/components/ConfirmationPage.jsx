import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle, RotateCcw } from 'lucide-react';
import { useCancellation } from '../context/CancellationContext';
import CancelLayout from './CancelLayout';
import { trackEvent, trackPage } from '../utils/analytics';
import { pauseLocation } from '../utils/leadconnector';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { resetCancellationFlow } = useCancellation();
  const [countdown, setCountdown] = useState(10);
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef(null);

  useEffect(() => {
    // If configured, attempt to pause the location as final action
    (async () => {
      try {
        const token = import.meta?.env?.VITE_LEADCONNECTOR_TOKEN;
        const companyId = import.meta?.env?.VITE_COMPANY_ID;
        const locationId = import.meta?.env?.VITE_LOCATION_ID;
        if (token && companyId && locationId) {
          await pauseLocation({ accessToken: token, locationId, companyId, paused: true });
          trackEvent('leadconnector_pause_success', { locationId, companyId });
        }
      } catch (e) {
        trackEvent('leadconnector_pause_failed', { message: String(e?.message || e) });
      }
    })();
    document.title = 'Cancel CC360 – Confirmation';
    trackPage('Cancellation – Step 6 (Confirmation)');
    if (headingRef.current) headingRef.current.focus();
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // For testing, redirect back to step 1 instead of external site
          handleTryAgain();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTryAgain = () => {
    resetCancellationFlow();
    navigate('/cancel/step-1');
  };

  return (
    <CancelLayout step={6} maxWidth="max-w-lg">
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full text-center"
        >
        {/* Success Icon */}
        <motion.div 
          initial={prefersReducedMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-cc360-primary to-cc360-blue rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Confirmation Message */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4 focus:outline-none" tabIndex={-1} ref={headingRef}>
            Your account has been scheduled for cancellation successfully.
          </h1>
          
          <p className="text-gray-600 font-subheading mb-6" aria-live="polite">
            You will be redirected in <span className="font-bold text-cc360-primary">{countdown}</span> seconds.
          </p>

          {/* Loading Animation */}
          <motion.div 
            className="w-full bg-gray-200 rounded-full h-2 mb-4"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-cc360-primary to-cc360-blue h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: prefersReducedMotion ? 0 : 10, ease: "linear" }}
            />
          </motion.div>

          <motion.p 
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500 font-body mb-6"
          >
            Thank you for being part of Course Creator 360. We hope to see you again soon! 🚀
          </motion.p>

          {/* Testing Controls */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-4 border-t border-gray-200"
          >
            <p className="text-xs text-gray-400 font-body mb-3">Testing Mode:</p>
            <button
              onClick={handleTryAgain}
              className="flex items-center justify-center space-x-2 mx-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-body text-sm rounded-lg transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Flow Again</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </CancelLayout>
  );
};

export default ConfirmationPage;