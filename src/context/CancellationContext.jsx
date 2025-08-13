import React, { createContext, useContext, useEffect, useState } from 'react';

const CancellationContext = createContext();

export const useCancellation = () => {
  const context = useContext(CancellationContext);
  if (!context) {
    throw new Error('useCancellation must be used within a CancellationProvider');
  }
  return context;
};

export const CancellationProvider = ({ children }) => {
  const STORAGE_KEY = 'cc360:cancellation';
  const [userData, setUserData] = useState({
    firstName: 'Sarah', // This would come from your user session
    renewalDate: 'March 15, 2024', // This would come from Stripe
    isFreeTrial: false,
    trialDaysLeft: 0,
    // LeadConnector context
    locationId: import.meta?.env?.VITE_LOCATION_ID || '',
    companyId: import.meta?.env?.VITE_COMPANY_ID || ''
  });

  const [cancellationData, setCancellationData] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      reason: '',
      customReason: '',
      currentStep: 1,
      offersShown: [],
      offersAccepted: []
    };
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cancellationData));
    } catch {}
  }, [cancellationData]);

  const updateCancellationData = (data) => {
    setCancellationData(prev => ({ ...prev, ...data }));
  };

  const resetCancellationFlow = () => {
    const initial = {
      reason: '',
      customReason: '',
      currentStep: 1,
      offersShown: [],
      offersAccepted: []
    };
    setCancellationData(initial);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch {}
  };

  const updateUserData = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const value = {
    userData,
    cancellationData,
    updateCancellationData,
    resetCancellationFlow,
    updateUserData
  };

  return (
    <CancellationContext.Provider value={value}>
      {children}
    </CancellationContext.Provider>
  );
};