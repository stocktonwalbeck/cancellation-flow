import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useCancellation } from '../context/CancellationContext';
import CancelLayout from './CancelLayout';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { getOfferFor } from '../config/offers';
import { DASHBOARD_URL } from '../utils/env';
import { trackEvent, trackPage } from '../utils/analytics';

const TailoredOffer = () => {
  const navigate = useNavigate();
  const { cancellationData, updateCancellationData } = useCancellation();
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef(null);

  const currentOffer = getOfferFor(cancellationData.reason, 'tailored');

  useEffect(() => {
    document.title = 'Cancel CC360 – Step 3';
    trackPage('Cancellation – Step 3 (TailoredOffer)');
    if (headingRef.current) headingRef.current.focus();
  }, []);

  const handleAcceptOffer = () => {
    updateCancellationData({ 
      offersAccepted: [...cancellationData.offersAccepted, currentOffer.type]
    });
    trackEvent('cancellation_offer_accepted', { phase: 'tailored', type: currentOffer.type });
    alert(`Great! We'll process your ${currentOffer.type} offer. You'll receive an email shortly.`);
    window.location.assign(DASHBOARD_URL);
  };

  const handleRejectOffer = () => {
    updateCancellationData({ 
      offersShown: [...cancellationData.offersShown, currentOffer.type],
      currentStep: 4 
    });
    trackEvent('cancellation_offer_rejected', { phase: 'tailored', type: currentOffer.type });
    navigate('/cancel/step-4');
  };

  return (
    <CancelLayout step={3}>
      <motion.div 
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Offer Icon */}
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

        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4 focus:outline-none"
            tabIndex={-1}
            ref={headingRef}
          >
            {currentOffer.headline}
          </motion.h1>
          <motion.p 
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 font-subheading leading-relaxed"
          >
            {currentOffer.subCopy}
          </motion.p>
        </div>

        {/* Offer Highlight */}
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl mb-8"
        >
          <div className="text-center">
            <img 
              src={currentOffer.imageUrl} 
              alt={currentOffer.type}
              className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <button
            onClick={handleAcceptOffer}
            className="w-full bg-gradient-to-r from-cc360-primary to-cc360-blue hover:from-blue-600 hover:to-cc360-blue text-white font-heading font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {currentOffer.acceptCTA}
          </button>
          
          <button
            onClick={handleRejectOffer}
            className="w-full bg-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-800 font-body font-medium py-4 px-6 rounded-lg border border-gray-300 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>{currentOffer.rejectCTA}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </CancelLayout>
  );
};

export default TailoredOffer;