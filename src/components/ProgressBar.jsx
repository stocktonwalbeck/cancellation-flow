import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
  const completedSteps = activeStep - 1; // Number of fully completed steps

  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between">
          {[...Array(totalSteps)].map((_, index) => {
            const stepNumber = index + 1;
            
            // Only current and previous steps should be blue
            const isDotActive = stepNumber <= activeStep;
            
            // Line logic: line after dot N should be filled when we reach step N+1
            // Line 0 (after dot 1) fills when activeStep >= 2
            // Line 1 (after dot 2) fills when activeStep >= 3, etc.
            const lineAfterThisDot = index; // Line index
            const lineTargetStep = lineAfterThisDot + 2; // Step when this line should be filled
            const isLineFilled = activeStep >= lineTargetStep;
            
            return (
              <React.Fragment key={`step-${stepNumber}`}>
                {/* Progress Dot */}
                <motion.div
                  animate={{ 
                    scale: isDotActive ? 1.1 : 1,
                    backgroundColor: isDotActive ? '#0475FF' : '#E5E7EB'
                  }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0 : 0.5, 
                    ease: "easeOut",
                    delay: prefersReducedMotion ? 0 : (stepNumber === activeStep ? 0.8 : 0)
                  }}
                  className={`relative w-4 h-4 rounded-full ${
                    isDotActive ? 'bg-cc360-primary' : 'bg-gray-300'
                  }`}
                >
                  {/* Current step pulsating animation */}
                  {stepNumber === activeStep && (
                    <motion.div
                      animate={{ 
                        scale: prefersReducedMotion ? 1 : [1, 1.3, 1],
                        opacity: prefersReducedMotion ? 1 : [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 2,
                        repeat: prefersReducedMotion ? 0 : Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-full bg-cc360-primary opacity-50"
                    />
                  )}
                  
                  {/* Active dot inner glow */}
                  {isDotActive && (
                    <motion.div
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0 : 0.3,
                        delay: prefersReducedMotion ? 0 : (stepNumber === activeStep ? 0.8 : 0) 
                      }}
                      className="absolute inset-0 rounded-full bg-cc360-primary opacity-30 scale-150"
                    />
                  )}
                </motion.div>

                {/* Progress Line */}
                {index < totalSteps - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-gray-300 relative overflow-hidden">
                    <motion.div
                      key={lineTargetStep === activeStep ? `animating-${index}-${activeStep}` : `static-${index}`}
                      initial={{ width: isLineFilled ? '100%' : '0%' }}
                      animate={{ 
                        width: isLineFilled ? '100%' : '0%' 
                      }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0 : (lineTargetStep === activeStep ? 0.8 : 0),
                        ease: "easeInOut"
                      }}
                      className="h-full bg-cc360-primary"
                      style={{ transformOrigin: 'left' }}
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