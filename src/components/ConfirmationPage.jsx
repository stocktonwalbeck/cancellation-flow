import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, RotateCcw, ChevronLeft } from 'lucide-react';
import { useCancellation } from '../context/CancellationContext';
import ProgressBar from './ProgressBar';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { resetCancellationFlow } = useCancellation();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
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

  const handleGoHome = () => {
    window.location.href = 'https://app.coursecreator360.com';
  };

  return (
    <div className="min-h-screen p-4 bg-cc360-fade">
      {/* Progress Bar */}
      <ProgressBar currentStep={6} />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-cc360-site-white rounded-2xl shadow-xl p-8 text-center"
        >
        {/* Home Button */}
        <div className="mb-6">
          <button
            onClick={handleGoHome}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 font-body text-sm transition-all duration-200 rounded-lg hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
        {/* Success Icon */}
        <motion.div 
          initial={{ scale: 0 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
            Your account has been scheduled for cancellation successfully.
          </h1>
          
          <p className="text-gray-600 font-subheading mb-6">
            You will be redirected in <span className="font-bold text-cc360-primary">{countdown}</span> seconds.
          </p>

          {/* Loading Animation */}
          <motion.div 
            className="w-full bg-gray-200 rounded-full h-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-cc360-primary to-cc360-blue h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 10, ease: "linear" }}
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500 font-body mb-6"
          >
            Thank you for being part of Course Creator 360. We hope to see you again soon! 🚀
          </motion.p>

          {/* Testing Controls */}
          <motion.div
            initial={{ opacity: 0 }}
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
      </div>
    </div>
  );
};

export default ConfirmationPage;