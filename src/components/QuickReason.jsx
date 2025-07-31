import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCancellation } from '../context/CancellationContext';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import ProgressBar from './ProgressBar';

const QuickReason = () => {
  const navigate = useNavigate();
  const { updateCancellationData } = useCancellation();
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [randomizedReasons, setRandomizedReasons] = useState([]);

  const reasons = [
    "No time to use it",
    "I was just testing the platform", 
    "Hard To Learn / Too Complicated",
    "No sales yet / too costly",
    "Bugs or performance issues",
    "Poor customer service",
    "Missing a feature I need"
  ];

  // Randomize reasons on component mount to avoid chronology bias
  useEffect(() => {
    const shuffled = [...reasons].sort(() => Math.random() - 0.5);
    setRandomizedReasons(shuffled);
  }, []);

  const handleNext = () => {
    if (!selectedReason) return;
    
    updateCancellationData({ 
      reason: selectedReason,
      customReason: selectedReason === 'other' ? customReason : '',
      currentStep: 3 
    });
    navigate('/cancel/step-3');
  };

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  const handleGoHome = () => {
    window.location.href = 'https://app.coursecreator360.com';
  };

  return (
    <div className="min-h-screen p-4">
      {/* Progress Bar */}
      <ProgressBar currentStep={2} />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-cc360-site-white rounded-2xl shadow-xl p-8"
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
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"
          >
            Two clicks, tops: why are you thinking of leaving?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 font-subheading"
          >
            Pick the one that fits best. We'll fix it or get out of your way in under a minute.
          </motion.p>
        </div>

        {/* Reason Options */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 mb-8"
        >
          {randomizedReasons.map((reason, index) => (
            <motion.button
              key={reason}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onClick={() => handleReasonSelect(reason)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedReason === reason
                  ? 'border-cc360-primary bg-cc360-primary/10 text-cc360-blue'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedReason === reason
                    ? 'border-cc360-primary bg-cc360-primary'
                    : 'border-gray-300'
                }`}>
                  {selectedReason === reason && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className="font-body font-medium">{reason}</span>
              </div>
            </motion.button>
          ))}

          {/* Other Option */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + randomizedReasons.length * 0.1 }}
          >
            <button
              onClick={() => handleReasonSelect('other')}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedReason === 'other'
                  ? 'border-cc360-primary bg-cc360-primary/10 text-cc360-blue'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedReason === 'other'
                    ? 'border-cc360-primary bg-cc360-primary'
                    : 'border-gray-300'
                }`}>
                  {selectedReason === 'other' && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className="font-body font-medium">Other (type in box)</span>
              </div>
            </button>
            
            {selectedReason === 'other' && (
              <motion.textarea
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cc360-primary focus:border-transparent font-body"
                placeholder="Please tell us more..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                rows={3}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Next Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <button
            onClick={handleNext}
            disabled={!selectedReason || (selectedReason === 'other' && !customReason.trim())}
            className={`w-full py-4 px-6 rounded-lg font-heading font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${
              selectedReason && (selectedReason !== 'other' || customReason.trim())
                ? 'bg-gradient-to-r from-cc360-primary to-cc360-blue hover:from-blue-600 hover:to-cc360-blue text-white transform hover:scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuickReason;