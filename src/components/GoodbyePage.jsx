import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useCancellation } from '../context/CancellationContext';
import CancelLayout from './CancelLayout';
import { Heart, Play, Users, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { APP_URL } from '../utils/env';
import { trackEvent, trackPage } from '../utils/analytics';

const GoodbyePage = () => {
  const navigate = useNavigate();
  const { userData, updateCancellationData, updateUserData } = useCancellation();
  const [tempLocationId, setTempLocationId] = useState(userData.locationId || '');
  const [tempCompanyId, setTempCompanyId] = useState(userData.companyId || '');
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef(null);

  const handleFinishCancellation = () => {
    updateCancellationData({ currentStep: 6 });
    trackEvent('cancellation_finish_clicked');
    // This would trigger the actual Stripe cancellation
    navigate('/cancel/confirmation');
  };

  useEffect(() => {
    document.title = 'Cancel CC360 – Step 5';
    trackPage('Cancellation – Step 5 (Goodbye)');
    if (headingRef.current) headingRef.current.focus();
  }, []);

  return (
    <CancelLayout step={5}>
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
        {/* Goodbye Icon */}
        <motion.div 
          initial={prefersReducedMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-cc360-component-bg rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
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
            We're sad to see you go, {userData.firstName} 💔
          </motion.h1>
          <motion.p 
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 font-subheading leading-relaxed"
          >
            Your account stays active until <strong>{userData.renewalDate}</strong>. After that, your content is archived for 30 days in case you change your mind.
          </motion.p>
        </div>

        {/* Win-back Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-8"
        >
          <h3 className="text-xl font-heading font-bold text-gray-800 text-center mb-6">
            Helpful links for your journey:
          </h3>
          
          <motion.a
            href="/case-studies/jane-5k-30-days"
            target="_blank"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-4 p-4 bg-gradient-to-r from-cc360-primary/10 to-blue-50 rounded-lg border border-cc360-primary/30 hover:border-cc360-primary/50 transition-all duration-200 cursor-pointer group"
          >
            <Play className="w-6 h-6 text-cc360-primary group-hover:text-cc360-blue" />
            <div>
              <h4 className="font-heading font-semibold text-cc360-blue">Replay: "How Jane hit $5K in 30 days"</h4>
              <p className="text-cc360-primary text-sm font-body">Case-study video showing real results</p>
            </div>
            <ArrowRight className="w-4 h-4 text-cc360-primary group-hover:text-cc360-blue ml-auto" />
          </motion.a>

          <motion.a
            href="https://facebook.com/groups/cc360community"
            target="_blank"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center space-x-4 p-4 bg-gradient-to-r from-cc360-accent-lime/20 to-green-50 rounded-lg border border-cc360-accent-lime/40 hover:border-cc360-accent-lime/60 transition-all duration-200 cursor-pointer group"
          >
            <Users className="w-6 h-6 text-green-600 group-hover:text-green-700" />
            <div>
              <h4 className="font-heading font-semibold text-green-900">Join our free Facebook group</h4>
              <p className="text-green-700 text-sm font-body">Keep learning with 50k+ course creators</p>
            </div>
            <ArrowRight className="w-4 h-4 text-green-600 group-hover:text-green-700 ml-auto" />
          </motion.a>
        </motion.div>

        {/* Fine Print */}
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 rounded-lg p-4 mb-8"
        >
          <p className="text-sm text-gray-600 text-center leading-relaxed font-body">
            A confirmation email will arrive in minutes. We'll keep your data for 30 days in case you change your mind later.
          </p>
        </motion.div>

        {/* Testing: Override Location & Company IDs (auto-populated from context) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="bg-white rounded-lg p-4 mb-8 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempLocationId}
                onChange={(e) => setTempLocationId(e.target.value)}
                placeholder="locationId"
                data-testid="test-location-id"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cc360-primary focus:border-transparent text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempCompanyId}
                onChange={(e) => setTempCompanyId(e.target.value)}
                placeholder="companyId"
                data-testid="test-company-id"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cc360-primary focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => updateUserData({ locationId: tempLocationId, companyId: tempCompanyId })}
              className="px-3 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-900"
              data-testid="apply-ids"
            >
              Use IDs
            </button>
            <p className="text-xs text-gray-500">Current: locationId <span className="font-mono">{userData.locationId || '(none)'}</span>, companyId <span className="font-mono">{userData.companyId || '(none)'}</span></p>
          </div>
          <p className="mt-2 text-xs text-gray-400">Tip: For testing with your token, set <span className="font-mono">VITE_LEADCONNECTOR_TOKEN</span> in env, or I can add a dev-only input to paste a token here.</p>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={handleFinishCancellation}
            className="w-full bg-gradient-to-r from-cc360-accent-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-heading font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Finish cancellation
          </button>
        </motion.div>
      </motion.div>
    </CancelLayout>
  );
};

export default GoodbyePage;