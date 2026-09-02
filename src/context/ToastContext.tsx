import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { TaxThresholdTip, getMatchingThresholdTip } from '../utils/taxThresholds';
import { TaxToastNotification } from '../components/common/TaxToastNotification';

interface ToastContextType {
  activeTip: TaxThresholdTip | null;
  notifySalaryChange: (currentSalary: number) => void;
  dismissToast: () => void;
  showCustomTip: (tip: TaxThresholdTip) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTip, setActiveTip] = useState<TaxThresholdTip | null>(null);
  const previousSalaryRef = useRef<number | undefined>(undefined);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notifySalaryChange = useCallback((currentSalary: number) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce to allow user to finish typing without flickering alerts
    debounceTimerRef.current = setTimeout(() => {
      const prev = previousSalaryRef.current;
      const matched = getMatchingThresholdTip(currentSalary, prev);
      previousSalaryRef.current = currentSalary;

      if (matched) {
        setActiveTip(matched);
      }
    }, 600);
  }, []);

  const dismissToast = useCallback(() => {
    setActiveTip(null);
  }, []);

  const showCustomTip = useCallback((tip: TaxThresholdTip) => {
    setActiveTip(tip);
  }, []);

  return (
    <ToastContext.Provider
      value={{
        activeTip,
        notifySalaryChange,
        dismissToast,
        showCustomTip,
      }}
    >
      {children}
      <TaxToastNotification tip={activeTip} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useTaxToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useTaxToast must be used within a ToastProvider');
  }
  return context;
};
