import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCancellation } from '../context/CancellationContext';
import { 
  Globe, 
  Mail, 
  Users, 
  MessageCircle, 
  Video, 
  GraduationCap,
  ArrowRight 
} from 'lucide-react';

const LossFrame = () => {
  const navigate = useNavigate();
  const { userData, updateCancellationData } = useCancellation();

  const features = [
    { icon: Globe, text: "Unlimited course hosting & funnels" },
    { icon: Mail, text: "Automated email + SMS marketing" },
    { icon: Users, text: "Built-in community & gamification" },
    { icon: MessageCircle, text: "24/7 live chat (60-sec response)" },
    { icon: Video, text: "Bi-weekly coaching calls with 7-figure creators" },
    { icon: GraduationCap, text: "Full Course-Creator education suite (200+ lessons)" }
  ];

  const handleKeepAccount = () => {
    // This would integrate with your retention tracking
    window.location.href = '/dashboard';
  };

  const handleContinueCancel = () => {
    updateCancellationData({ currentStep: 2 });
    navigate('/cancel/step-2');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Whoa, {userData.firstName}—canceling means losing all this 🔥
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600"
          >
            You'll still have access until {userData.renewalDate}, then the following features vanish:
          </motion.p>
        </div>

        {/* Features List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <feature.icon className="w-6 h-6 text-orange-600" />
              <span className="text-gray-800 font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Subscription Status */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mb-8"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 font-medium">
              {userData.isFreeTrial 
                ? `Your trial ends in ${userData.trialDaysLeft} days`
                : `Your subscription renews ${userData.renewalDate}`
              }
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="space-y-4"
        >
          <button
            onClick={handleKeepAccount}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Keep my CC360 account
          </button>
          
          <button
            onClick={handleContinueCancel}
            className="w-full bg-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-800 font-medium py-4 px-6 rounded-lg border border-gray-300 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Continue → Cancel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LossFrame;