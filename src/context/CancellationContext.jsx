import React, { createContext, useContext, useState } from 'react';

const CancellationContext = createContext();

export const useCancellation = () => {
  const context = useContext(CancellationContext);
  if (!context) {
    throw new Error('useCancellation must be used within a CancellationProvider');
  }
  return context;
};

export const CancellationProvider = ({ children }) => {
  const [userData] = useState({
    firstName: 'Sarah', // This would come from your user session
    renewalDate: 'March 15, 2024', // This would come from Stripe
    isFreeTrial: false,
    trialDaysLeft: 0
  });

  const [cancellationData, setCancellationData] = useState({
    reason: '',
    customReason: '',
    currentStep: 1,
    offersShown: [],
    offersAccepted: []
  });

  const updateCancellationData = (data) => {
    setCancellationData(prev => ({ ...prev, ...data }));
  };

  const resetCancellationFlow = () => {
    setCancellationData({
      reason: '',
      customReason: '',
      currentStep: 1,
      offersShown: [],
      offersAccepted: []
    });
  };

  const value = {
    userData,
    cancellationData,
    updateCancellationData,
    resetCancellationFlow
  };

  return (
    <CancellationContext.Provider value={value}>
      {children}
    </CancellationContext.Provider>
  );
};