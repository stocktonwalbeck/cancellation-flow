import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCancellation } from '../context/CancellationContext';
import { Heart, ArrowRight, ChevronLeft } from 'lucide-react';

const SecondChanceOffer = () => {
  const navigate = useNavigate();
  const { cancellationData, updateCancellationData } = useCancellation();

  const secondChanceOffers = {
    "No time to use it": {
      type: "30-Day Free Extension",
      headline: "One final offer: Another month on us, no strings attached",
      subCopy: "No commitment required—just more time to get things built (or let us build things FOR you).",
      acceptCTA: "Claim My Free 30 Days",
      rejectCTA: "Cancel my subscription"
    },
    "Hard To Learn / Too Complicated": {
      type: "Done-For-You Build-out",
      headline: "Final option: Skip the complexity entirely, we'll build it for you.",
      subCopy: "Submit a project request on whatever you're needing help building most. Receive a quote within 48 hours (on average).",
      acceptCTA: "Get My Free Quote",
      rejectCTA: "Cancel my subscription"
    },
    "No sales yet / too costly": {
      type: "Park-&-Protect – $29/mo (1st mo free)",
      headline: "Before you lose your work—park it safely for almost nothing",
      subCopy: "Enjoy a complete 1-month subscription suspension on us. By parking your CC360 account, you can take a break from building your business on our platform without canceling your subscription. Rest assured, all your valuable information and progress on your site will be preserved for as long as you require it.",
      acceptCTA: "Park & Protect for $29",
      rejectCTA: "Cancel my subscription"
    },
    "Bugs or performance issues": {
      type: "Park-&-Protect – $29/mo (1st mo free)",
      headline: "Before you lose all your work—park it safely while we iron out the bugs",
      subCopy: "Enjoy a complete 1-month subscription suspension on us. By parking your CC360 account, you can take a break from building your business on our platform without canceling your subscription. Rest assured, all your valuable information and progress on your site will be preserved for as long as you require it.",
      acceptCTA: "Park & Protect for $29",
      rejectCTA: "Cancel my subscription"
    },
    "Poor customer service": {
      type: "30-Day Free Extension + Priority Support",
      headline: "Last chance: 30 days free with guaranteed VIP support",
      subCopy: "Experience our priority support for 30-days free that jumps every queue.",
      acceptCTA: "Claim My Free 30 Days",
      rejectCTA: "Cancel my subscription"
    },
    "Missing a feature I need": {
      type: "30-Day Free Extension",
      headline: "Stay free for 30 days while we build what you need.",
      subCopy: "Tell us the missing feature; we'll update you as soon as it ships.",
      acceptCTA: "Claim My Free 30 Days",
      rejectCTA: "Cancel my subscription"
    },
    "I was just testing the platform": {
      type: "Done-For-You Build-out",
      headline: "Before you leave - Let us prove the value with a real build",
      subCopy: "Skip the testing phase entirely and let us build whatever you need (website, funnel, automation, emails, and more)",
      acceptCTA: "Get My Free Quote",
      rejectCTA: "Cancel my subscription"
    },
    "other": {
      type: "30-Day Free Extension",
      headline: "Final offer: 30 days free while we fix whatever went wrong",
      subCopy: "Tell us what went wrong and we'll prioritize fixing it. 30 days on us to earn back your trust.",
      acceptCTA: "Claim My Free 30 Days",
      rejectCTA: "Cancel my subscription"
    }
  };

  const currentOffer = secondChanceOffers[cancellationData.reason] || secondChanceOffers["other"];

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
    alert(`Perfect! We'll set up your ${currentOffer.type}. Check your email for details.`);
    window.location.href = '/dashboard';
  };

  const handleRejectOffer = () => {
    updateCancellationData({ 
      offersShown: [...cancellationData.offersShown, currentOffer.type],
      currentStep: 5 
    });
    navigate('/cancel/step-5');
  };

  const handleGoHome = () => {
    window.location.href = 'https://app.coursecreator360.com';
  };

  return (
    <div className="min-h-screen p-4">
      {/* Progress Bar */}
      <ProgressBar currentStep={4} />
      
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
        {/* Last Chance Icon */}
        <motion.div 
          initial={{ scale: 0 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"
          >
            {currentOffer.headline}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600 font-subheading leading-relaxed"
          >
            {currentOffer.subCopy}
          </motion.p>
        </div>

        {/* Offer Highlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
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
      </div>
    </div>
  );
};

export default SecondChanceOffer;