import React, { useState, useEffect, useMemo } from 'react';
import { UK_TAX_CONFIGS, TAX_CONFIG_METADATA } from '../../config/taxConfig';
import { AlertCircle, Calendar, X, ShieldAlert } from 'lucide-react';

export const TaxYearUpdateBanner: React.FC = () => {
  // Find forecast tax year from UK_TAX_CONFIGS
  const forecastInfo = useMemo(() => {
    const entry = Object.entries(UK_TAX_CONFIGS).find(([_, config]) =>
      config.yearLabel.toLowerCase().includes('(forecast)')
    );

    if (!entry) return null;

    const [key, config] = entry;
    const yearMatch = key.match(/^(\d{4})/);
    const startYear = yearMatch ? parseInt(yearMatch[1], 10) : 2026;
    const startDate = new Date(startYear, 3, 6, 0, 0, 0); // April 6th of start year
    const formattedYear = key.includes('_') ? key.replace('_', '/') : config.yearLabel.replace(/\s*\(Forecast\)/i, '').trim();

    return {
      key,
      config,
      startYear,
      startDate,
      formattedYear,
    };
  }, []);

  const [isDismissed, setIsDismissed] = useState<boolean>(true); // start true until checked in effect to avoid flash

  useEffect(() => {
    if (!forecastInfo) return;
    try {
      const storageKey = `dismissed-tax-year-banner-${forecastInfo.key}`;
      const dismissed = localStorage.getItem(storageKey) === 'true';
      setIsDismissed(dismissed);
    } catch {
      setIsDismissed(false);
    }
  }, [forecastInfo]);

  if (!forecastInfo || isDismissed) {
    return null;
  }

  const now = new Date();
  const diffMs = forecastInfo.startDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const isNowActive = now >= forecastInfo.startDate;
  const isUpcoming = !isNowActive && diffDays <= 30 && diffDays > 0;

  // If not active and not within 30 days before April 6th, do not render
  if (!isNowActive && !isUpcoming) {
    return null;
  }

  const handleDismiss = () => {
    try {
      const storageKey = `dismissed-tax-year-banner-${forecastInfo.key}`;
      localStorage.setItem(storageKey, 'true');
    } catch {
      // ignore storage errors
    }
    setIsDismissed(true);
  };

  return (
    <aside
      aria-label="Tax Year Update Notice"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1"
    >
      <div className="flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] shadow-xs">
        <div className="flex items-start gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-white dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#B45309] dark:text-[#FBBF24] shrink-0">
            {isNowActive ? (
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Calendar className="w-4 h-4 text-[#059669] dark:text-[#10B981]" aria-hidden="true" />
            )}
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                {isNowActive ? 'Tax Year Update Required' : 'Upcoming Tax Year Transition'}
              </span>
              <span className="text-3xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-[#222222] text-[#B45309] dark:text-[#FBBF24] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                {forecastInfo.formattedYear}
              </span>
            </div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              {isNowActive ? (
                <>
                  The <strong className="text-[#111111] dark:text-[#F5F5F5]">{forecastInfo.formattedYear}</strong> tax year is now active. Please verify all tax rates and thresholds against official HMRC sources before relying on &apos;Current&apos; figures for that year.
                </>
              ) : (
                <>
                  The <strong className="text-[#111111] dark:text-[#F5F5F5]">{forecastInfo.formattedYear}</strong> tax year begins in {diffDays} {diffDays === 1 ? 'day' : 'days'} (April 6th). Please prepare to verify all tax rates and thresholds against official HMRC sources.
                </>
              )}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss tax year reminder banner"
          className="p-1.5 rounded-lg text-[#737373] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5] hover:bg-white dark:hover:bg-[#222222] border border-transparent hover:border-[#E5E5E5] dark:hover:border-[#2A2A2A] transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
