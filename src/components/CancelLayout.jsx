import React from 'react';
import ProgressBar from './ProgressBar';
import { APP_URL } from '../utils/env';
import { ChevronLeft } from 'lucide-react';

export default function CancelLayout({ step, children, maxWidth = 'max-w-2xl' }) {
  const handleGoHome = () => {
    window.location.assign(APP_URL);
  };

  return (
    <div className="min-h-screen p-4 bg-cc360-fade">
      <ProgressBar currentStep={step} />
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className={`${maxWidth} w-full bg-cc360-site-white rounded-2xl shadow-xl p-8`}>
          <div className="mb-6">
            <button
              onClick={handleGoHome}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 font-body text-sm transition-all duration-200 rounded-lg hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}


