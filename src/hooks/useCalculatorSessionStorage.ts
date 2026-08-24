import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useCalculatorSessionStorage
 * 
 * Persists calculator form state to browser sessionStorage so users don't lose
 * their numbers when navigating between pages, comparing scenarios, or switching tabs.
 * 
 * @param storageKey Unique key for this calculator in sessionStorage
 * @param defaultState Initial fallback state
 * @returns [state, setState, resetState, isRestored]
 */
export function useCalculatorSessionStorage<T>(
  storageKey: string,
  defaultState: T
): [T, (val: T | ((prev: T) => T)) => void, () => void, boolean] {
  const [isRestored, setIsRestored] = useState(false);
  const [state, setState] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const item = window.sessionStorage.getItem(`paywise_${storageKey}`);
        if (item) {
          const parsed = JSON.parse(item);
          return { ...defaultState, ...parsed };
        }
      }
    } catch {
      // Ignore private browsing or corrupted json errors
    }
    return defaultState;
  });

  const isInitialMount = useRef(true);

  // Sync state to sessionStorage with light debouncing
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setIsRestored(true);
      return;
    }

    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(`paywise_${storageKey}`, JSON.stringify(state));
      }
    } catch {
      // Storage quota or restricted environment
    }
  }, [storageKey, state]);

  const resetState = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(`paywise_${storageKey}`);
      }
    } catch {
      // Ignore
    }
    setState(defaultState);
  }, [storageKey, defaultState]);

  return [state, setState, resetState, isRestored];
}
