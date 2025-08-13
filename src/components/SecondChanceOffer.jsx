import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useCancellation } from '../context/CancellationContext';
import CancelLayout from './CancelLayout';
import { Heart, ArrowRight } from 'lucide-react';
import { getOfferFor } from '../config/offers';
import { DASHBOARD_URL } from '../utils/env';
import { trackEvent, trackPage } from '../utils/analytics';

const SecondChanceOffer = () => {
  const navigate = useNavigate();
  const { cancellationData, updateCancellationData } = useCancellation();
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef(null);
  const currentOffer = getOfferFor(cancellationData.reason, 'secondChance');

  useEffect(() => {
    document.title = 'Cancel CC360 – Step 4';
    trackPage('Cancellation – Step 4 (SecondChance)');
    if (headingRef.current) headingRef.current.focus();
  }, []);

  const handleAcceptOffer = () => {
    updateCancellationData({ 
      offersAccepted: [...cancellationData.offersAccepted, currentOffer.type]
    });
    trackEvent('cancellation_offer_accepted', { phase: 'secondChance', type: currentOffer.type });
    alert(`Perfect! We'll set up your ${currentOffer.type}. Check your email for details.`);
    window.location.assign(DASHBOARD_URL);
  };

  const handleRejectOffer = () => {
    updateCancellationData({ 
      offersShown: [...cancellationData.offersShown, currentOffer.type],
      currentStep: 5 
    });
    trackEvent('cancellation_offer_rejected', { phase: 'secondChance', type: currentOffer.type });
    navigate('/cancel/step-5');
  };

  return (
    <CancelLayout step={4}>
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
        {/* Last Chance Icon */}
        <motion.div 
          initial={prefersReducedMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-cc360-accent-red to-red-600 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-cc360-accent-red/10 border border-cc360-accent-red/30 rounded-lg p-3 mb-4"
          >
            <p className="text-cc360-accent-red font-heading font-semibold text-sm uppercase tracking-wide">
              ⚠️ Last Chance Offer
            </p>
          </motion.div>
          
          <motion.h1 
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4 focus:outline-none"
            tabIndex={-1}
            ref={headingRef}
          >
            {currentOffer.headline}
          </motion.h1>
          <motion.p 
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600 font-subheading leading-relaxed"
          >
            {currentOffer.subCopy}
          </motion.p>
        </div>

        {/* Offer Highlight */}
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
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
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <button
            onClick={handleAcceptOffer}
            className="w-full bg-gradient-to-r from-cc360-accent-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-heading font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {currentOffer.acceptCTA}
          </button>
          
          <button
            onClick={handleRejectOffer}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-body font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>{currentOffer.rejectCTA}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </CancelLayout>
  );
};

export default SecondChanceOffer;