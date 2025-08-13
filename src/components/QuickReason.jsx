import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useCancellation } from '../context/CancellationContext';
import CancelLayout from './CancelLayout';
import { ArrowRight } from 'lucide-react';
import { REASONS } from '../config/reasons';
import { trackEvent, trackPage } from '../utils/analytics';

const QuickReason = () => {
  const navigate = useNavigate();
  const { updateCancellationData } = useCancellation();
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [randomizedReasons, setRandomizedReasons] = useState([]);
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef(null);

  const reasonOptions = useMemo(() => REASONS.filter(r => r.code !== 'OTHER'), []);

  // Randomize reasons on component mount to avoid chronology bias
  useEffect(() => {
    document.title = 'Cancel CC360 – Step 2';
    trackPage('Cancellation – Step 2 (QuickReason)');
    const shuffled = [...reasonOptions].sort(() => Math.random() - 0.5);
    setRandomizedReasons(shuffled);
    if (headingRef.current) headingRef.current.focus();
  }, [reasonOptions]);

  const handleNext = () => {
    if (!selectedReason) return;
    
    updateCancellationData({ 
      reason: selectedReason,
      customReason: selectedReason === 'OTHER' ? customReason : '',
      currentStep: 3 
    });
    trackEvent('cancellation_reason_selected', { reasonCode: selectedReason, hasCustom: !!customReason });
    navigate('/cancel/step-3');
  };

  const handleReasonSelect = (code) => {
    setSelectedReason(code);
  };

  return (
    <CancelLayout step={2}>
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4 focus:outline-none"
            tabIndex={-1}
            ref={headingRef}
          >
            Two clicks, tops: why are you thinking of leaving?
          </motion.h1>
          <motion.p 
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 font-subheading"
          >
            Pick the one that fits best. We'll fix it or get out of your way in under a minute.
          </motion.p>
        </div>

        {/* Reason Options */}
        <motion.fieldset 
          role="radiogroup"
          aria-label="Cancellation reason"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 mb-8"
        >
          {randomizedReasons.map((r, index) => (
            <motion.label
              key={r.code}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.5 + index * 0.1 }}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                selectedReason === r.code
                  ? 'border-cc360-primary bg-cc360-primary/10 text-cc360-blue'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="reason"
                value={r.code}
                checked={selectedReason === r.code}
                onChange={() => handleReasonSelect(r.code)}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedReason === r.code
                    ? 'border-cc360-primary bg-cc360-primary'
                    : 'border-gray-300'
                }`}>
                  {selectedReason === r.code && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className="font-body font-medium">{r.label}</span>
              </div>
            </motion.label>
          ))}

          {/* Other Option */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.5 + randomizedReasons.length * 0.1 }}
          >
            <label
              className={`w-full block p-4 text-left rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                selectedReason === 'OTHER'
                  ? 'border-cc360-primary bg-cc360-primary/10 text-cc360-blue'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="reason"
                value="OTHER"
                checked={selectedReason === 'OTHER'}
                onChange={() => handleReasonSelect('OTHER')}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedReason === 'OTHER'
                    ? 'border-cc360-primary bg-cc360-primary'
                    : 'border-gray-300'
                }`}>
                  {selectedReason === 'OTHER' && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className="font-body font-medium">Other (type in box)</span>
              </div>
            </label>
            
            {selectedReason === 'OTHER' && (
              <motion.textarea
                initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cc360-primary focus:border-transparent font-body"
                placeholder="Please tell us more..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                rows={3}
              />
            )}
          </motion.div>
        </motion.fieldset>

        {/* Next Button */}
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.0 }}
        >
          <button
            onClick={handleNext}
            disabled={!selectedReason || (selectedReason === 'OTHER' && !customReason.trim())}
            className={`w-full py-4 px-6 rounded-lg font-heading font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${
              selectedReason && (selectedReason !== 'OTHER' || customReason.trim())
                ? 'bg-gradient-to-r from-cc360-primary to-cc360-blue hover:from-blue-600 hover:to-cc360-blue text-white transform hover:scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </CancelLayout>
  );
};

export default QuickReason;