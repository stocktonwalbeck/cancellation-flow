import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCancellation } from '../context/CancellationContext';

export default function RequireStep({ minStep, children }) {
  const { cancellationData } = useCancellation();
  if ((cancellationData?.currentStep || 1) < minStep) {
    return <Navigate to="/cancel/step-1" replace />;
  }
  return children;
}


