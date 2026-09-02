import React, { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  value?: number | null;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value = 0,
  prefix = '',
  suffix = '',
  decimals = 2,
  duration = 400,
  className = '',
}) => {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const [displayValue, setDisplayValue] = useState<number>(safeValue);
  const prevValueRef = useRef<number>(safeValue);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const nextValue = typeof value === 'number' && !isNaN(value) ? value : 0;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(nextValue);
      prevValueRef.current = nextValue;
      return;
    }

    const startValue = prevValueRef.current;
    const endValue = nextValue;
    const startTime = performance.now();

    if (startValue === endValue) {
      setDisplayValue(endValue);
      return;
    }

    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(updateNumber);
      } else {
        setDisplayValue(endValue);
        prevValueRef.current = endValue;
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateNumber);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, duration]);

  const numToFormat = typeof displayValue === 'number' && !isNaN(displayValue) ? displayValue : 0;
  const formatted = numToFormat.toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`inline-block tabular-nums transition-colors ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

