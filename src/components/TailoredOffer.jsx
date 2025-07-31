import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCancellation } from '../context/CancellationContext';
import { CheckCircle, ArrowRight, ChevronLeft } from 'lucide-react';

const TailoredOffer = () => {
  const navigate = useNavigate();
  const { cancellationData, updateCancellationData } = useCancellation();

  const offers = {
    "No time to use it": {
      type: "Done-For-You Build-out",
      headline: "Too busy to build? We'll do it for you—funnels, emails, automations, and more",
      subCopy: "Submit a project request. Receive a quote within 48 hours (on average).",
      acceptCTA: "Get My Free Quote",
      rejectCTA: "Continue To Cancel"
    },
    "Hard To Learn / Too Complicated": {
      type: "30-Day Free Extension", 
      headline: "Feeling overwhelmed? Get 30 Days Free!",
      subCopy: "We don't like goodbyes, so we're giving you entire month — on us. Get some breathing room to fully use and find success with CC360.",
      acceptCTA: "Claim My Free 30 Days",
      rejectCTA: "Continue To Cancel"
    },
    "No sales yet / too costly": {
      type: "50% Off Next 2 Months",
      headline: "Cut your cost by 50% for the next two months.",
      subCopy: "Reduce your overhead by 50% while you build momentum and see results.",
      acceptCTA: "Get 2 Months 50% Off", 
      rejectCTA: "Continue To Cancel"
    },
    "Bugs or performance issues": {
      type: "30-Day Free Extension",
      headline: "We'll give you 30 days free on us while we fix the technical issues",
      subCopy: "Submit the exact performance issue and give us 30 days to push a fix (normally takes us less than 7 days). If we can't, you can come back and cancel anytime.",
      acceptCTA: "Report Issue & Get 30 Days Free",
      rejectCTA: "Continue To Cancel"
    },
    "Poor customer service": {
      type: "Complimentary Done-With-You Setup",
      headline: "Let's start over—personal 30-minute setup call with our best agent",
      subCopy: "A senior specialist will set up funnels, emails, automations (& more) live with you for FREE. (Normally $100)",
      acceptCTA: "Claim My Free 1-on-1 (Normally $100)",
      rejectCTA: "Continue To Cancel"
    },
    "Missing a feature I need": {
      type: "50% Off Next 2 Months",
      headline: "Half price until we ship what you're missing",
      subCopy: "Pay 50% less while our development team prioritizes your request. Just tell us the missing feature.",
      acceptCTA: "Claim Discount & Request Feature",
      rejectCTA: "Continue To Cancel"
    },
    "I was just testing the platform": {
      type: "30-Day Free Extension",
      headline: "30 days wasn't enough? Here's 30 more days free",
      subCopy: "Most successful users need 45-60 days to see the full picture.",
      acceptCTA: "Claim My Free 30 Days",
      rejectCTA: "Continue To Cancel"
    },
    "other": {
      type: "Park-&-Protect",
      headline: "Pause your account for $29 and keep everything safe.",
      subCopy: "Enjoy a complete 1-month subscription suspension on us. By parking your CC360 account, you can take a break from building your business on our platform without canceling your subscription. Rest assured, all your valuable information and progress on your site will be preserved for as long as you require it.",
      acceptCTA: "Park & Protect for $29",
      rejectCTA: "Continue To Cancel"
    }
  };

  const currentOffer = offers[cancellationData.reason] || offers["other"];

  // Get the appropriate graphic for the offer
  const getOfferImage = (offerType) => {
    if (offerType.includes("30-Day") || offerType.includes("Extension")) {
      return "https://storage.googleapis.com/msgsndr/c2DjRsOo4e13Od6ZTU6S/media/688ae65908dbc36d6924684e.png";
    }
    if (offerType.includes("50%") || offerType.includes("50 %")) {
      return "https://storage.googleapis.com/msgsndr/c2DjRsOo4e13Od6ZTU6S/media/688ae659ba7d04807e2d080f.png";
    }
    if (offerType.includes("Park") || offerType.includes("$29")) {
      return "https://storage.googleapis.com/msgsndr/c2DjRsOo4e13Od6ZTU6S/media/688ae659a4c55f719b54a1b5.png";
    }
    return null;
  };

  const offerImage = getOfferImage(currentOffer.type);

  const handleAcceptOffer = () => {
    updateCancellationData({ 
      offersAccepted: [...cancellationData.offersAccepted, currentOffer.type]
    });
    // This would integrate with your backend/Stripe for the actual offer
    alert(`Great! We'll process your ${currentOffer.type} offer. You'll receive an email shortly.`);
    window.location.href = '/dashboard';
  };

  const handleRejectOffer = () => {
    updateCancellationData({ 
      offersShown: [...cancellationData.offersShown, currentOffer.type],
      currentStep: 4 
    });
    navigate('/cancel/step-4');
  };

  const handleGoHome = () => {
    window.location.href = 'https://app.coursecreator360.com';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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
        {/* Offer Icon */}
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

        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"
          >
            {currentOffer.headline}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 font-subheading leading-relaxed"
          >
            {currentOffer.subCopy}
          </motion.p>
        </div>

        {/* Offer Highlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl mb-8"
        >
          <div className="text-center">
            <img 
              src={offerImage} 
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
          initial={{ opacity: 0, y: 20 }}
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
    </div>
  );
};

export default TailoredOffer;