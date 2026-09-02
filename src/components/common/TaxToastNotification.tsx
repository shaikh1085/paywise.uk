import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TaxThresholdTip } from '../../utils/taxThresholds';
import {
  Lightbulb,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';

interface TaxToastNotificationProps {
  tip: TaxThresholdTip | null;
  onDismiss: () => void;
  autoDismissMs?: number;
}

export const TaxToastNotification: React.FC<TaxToastNotificationProps> = ({
  tip,
  onDismiss,
  autoDismissMs = 9000,
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!tip) {
      setProgress(100);
      return;
    }
    setProgress(100);

    const intervalMs = 100;
    let remainingMs = autoDismissMs;

    const timer = setInterval(() => {
      if (isPausedRef.current) return;

      remainingMs -= intervalMs;
      if (remainingMs <= 0) {
        clearInterval(timer);
        setProgress(0);
        onDismissRef.current();
      } else {
        const nextProgress = Math.max(0, (remainingMs / autoDismissMs) * 100);
        setProgress(nextProgress);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [tip, autoDismissMs]);

  if (!tip) return null;

  const accentStyles = {
    emerald: {
      border: 'border-[#059669] dark:border-[#10B981]',
      badge: 'bg-[#F5F5F5] dark:bg-[#222222] text-[#059669] dark:text-[#10B981] border-[#E5E5E5] dark:border-[#2A2A2A]',
      icon: 'text-[#059669] dark:text-[#10B981]',
      progress: 'bg-[#059669] dark:bg-[#10B981]',
    },
    amber: {
      border: 'border-[#B45309] dark:border-[#FBBF24]',
      badge: 'bg-[#F5F5F5] dark:bg-[#222222] text-[#B45309] dark:text-[#FBBF24] border-[#E5E5E5] dark:border-[#2A2A2A]',
      icon: 'text-[#B45309] dark:text-[#FBBF24]',
      progress: 'bg-[#B45309] dark:bg-[#FBBF24]',
    },
    purple: {
      border: 'border-[#059669] dark:border-[#10B981]',
      badge: 'bg-[#F5F5F5] dark:bg-[#222222] text-[#059669] dark:text-[#10B981] border-[#E5E5E5] dark:border-[#2A2A2A]',
      icon: 'text-[#059669] dark:text-[#10B981]',
      progress: 'bg-[#059669] dark:bg-[#10B981]',
    },
    rose: {
      border: 'border-[#DC2626] dark:border-[#F87171]',
      badge: 'bg-[#F5F5F5] dark:bg-[#222222] text-[#DC2626] dark:text-[#F87171] border-[#E5E5E5] dark:border-[#2A2A2A]',
      icon: 'text-[#DC2626] dark:text-[#F87171]',
      progress: 'bg-[#DC2626] dark:bg-[#F87171]',
    },
    cyan: {
      border: 'border-[#059669] dark:border-[#10B981]',
      badge: 'bg-[#F5F5F5] dark:bg-[#222222] text-[#059669] dark:text-[#10B981] border-[#E5E5E5] dark:border-[#2A2A2A]',
      icon: 'text-[#059669] dark:text-[#10B981]',
      progress: 'bg-[#059669] dark:bg-[#10B981]',
    },
  }[tip.accentColor] || {
    border: 'border-[#059669] dark:border-[#10B981]',
    badge: 'bg-[#F5F5F5] text-[#059669]',
    icon: 'text-[#059669]',
    progress: 'bg-[#059669]',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed bottom-5 right-4 sm:right-6 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] z-50 rounded-2xl bg-white dark:bg-[#171717] border ${accentStyles.border} p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-200`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#F5F5F5] dark:bg-[#222222] shrink-0 border border-[#E5E5E5] dark:border-[#2A2A2A]">
            <Lightbulb className={`w-4 h-4 ${accentStyles.icon}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-3xs uppercase font-extrabold px-2 py-0.5 rounded-md border ${accentStyles.badge}`}>
                {tip.badge}
              </span>
              <span className="text-2xs text-[#737373] dark:text-[#888888] font-medium">
                Threshold Alert
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F5F5] mt-0.5 leading-snug">
              {tip.title}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="text-[#737373] hover:text-[#111111] dark:hover:text-[#F5F5F5] p-1 rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#222222] transition-colors shrink-0"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Description & Contextual Tip */}
      <div className="space-y-2 text-xs text-[#525252] dark:text-[#A3A3A3] pl-1">
        <p className="leading-relaxed">
          {tip.description}
        </p>
        
        <div className="p-2.5 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] text-xs leading-relaxed font-medium">
          <div className="flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FBBF24] shrink-0 mt-0.5" />
            <span>{tip.tip}</span>
          </div>
        </div>
      </div>

      {/* Action Link if available */}
      {tip.actionLink && (
        <div className="mt-3 pt-2.5 border-t border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-between">
          <Link
            to={tip.actionLink.url}
            onClick={onDismiss}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline"
          >
            <span>{tip.actionLink.label}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={onDismiss}
            className="text-2xs font-semibold text-[#737373] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#F5F5F5]"
          >
            Got it
          </button>
        </div>
      )}

      {/* Countdown progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-b-2xl overflow-hidden">
        <div
          className={`h-full ${accentStyles.progress} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
