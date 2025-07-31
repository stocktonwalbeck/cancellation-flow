import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCancellation } from '../context/CancellationContext';
import { Heart, Play, Users, ArrowRight } from 'lucide-react';

const GoodbyePage = () => {
  const navigate = useNavigate();
  const { userData, updateCancellationData } = useCancellation();

  const handleFinishCancellation = () => {
    updateCancellationData({ currentStep: 6 });
    // This would trigger the actual Stripe cancellation
    navigate('/cancel/confirmation');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Goodbye Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            We're sad to see you go, {userData.firstName} 💔
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 leading-relaxed"
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
          <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
            Helpful links for your journey:
          </h3>
          
          <motion.a
            href="/case-studies/jane-5k-30-days"
            target="_blank"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 cursor-pointer group"
          >
            <Play className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
            <div>
              <h4 className="font-semibold text-blue-900">Replay: "How Jane hit $5K in 30 days"</h4>
              <p className="text-blue-700 text-sm">Case-study video showing real results</p>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-blue-700 ml-auto" />
          </motion.a>

          <motion.a
            href="https://facebook.com/groups/cc360community"
            target="_blank"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-300 transition-all duration-200 cursor-pointer group"
          >
            <Users className="w-6 h-6 text-green-600 group-hover:text-green-700" />
            <div>
              <h4 className="font-semibold text-green-900">Join our free Facebook group</h4>
              <p className="text-green-700 text-sm">Keep learning with 50k+ course creators</p>
            </div>
            <ArrowRight className="w-4 h-4 text-green-600 group-hover:text-green-700 ml-auto" />
          </motion.a>
        </motion.div>

        {/* Fine Print */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 rounded-lg p-4 mb-8"
        >
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            A confirmation email will arrive in minutes. We'll keep your data for 30 days in case you change your mind later.
          </p>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={handleFinishCancellation}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Finish cancellation
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GoodbyePage;