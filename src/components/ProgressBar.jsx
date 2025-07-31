import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentStep, totalSteps = 4 }) => {
  // Map the cancellation flow steps to progress dots
  // Step 1 (LossFrame) = 1st dot active
  // Step 2 (QuickReason) = 2nd dot active  
  // Step 3 (TailoredOffer) = 3rd dot active
  // Step 4+ (SecondChance onwards) = 4th dot active
  const getActiveStep = (step) => {
    if (step === 1) return 1; // First page shows 1st dot active
    if (step === 2) return 2; // Second page shows 2nd dot active
    if (step === 3) return 3; // Third page shows 3rd dot active
    if (step >= 4) return 4;  // Fourth page onwards shows 4th dot active
    return 1;
  };

  const activeStep = getActiveStep(currentStep);

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between">
          {[...Array(totalSteps)].map((_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= activeStep;
            const isCompleted = stepNumber < activeStep;
            
            return (
              <React.Fragment key={stepNumber}>
                {/* Progress Dot */}
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isActive ? '#0475FF' : '#E5E7EB'
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`relative w-4 h-4 rounded-full ${
                    isActive ? 'bg-cc360-primary' : 'bg-gray-300'
                  }`}
                >
                  {/* Active dot inner glow */}
                  {isActive && (
                    <motion.div
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 rounded-full bg-cc360-primary opacity-30 scale-150"
                    />
                  )}
                </motion.div>

                {/* Progress Line */}
                {index < totalSteps - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-gray-300 relative overflow-hidden">
                    <motion.div
                      animate={{ 
                        width: isCompleted ? '100%' : '0%' 
                      }}
                      transition={{ 
                        duration: 0.6, 
                        ease: "easeInOut",
                        delay: isCompleted ? 0.2 : 0
                      }}
                      className="h-full bg-cc360-primary"
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;