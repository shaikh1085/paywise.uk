import React, { useState, useMemo, useEffect } from 'react';
import { TakeHomeInput, TakeHomeResult } from '../types';
import { generateSalaryInsights, DISCLAIMER_TEXT, SalaryInsightsData } from '../lib/generateSalaryInsights';
import {
  Sparkles,
  Wallet,
  Receipt,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

interface SmartSalaryInsightsProps {
  input: TakeHomeInput;
  result: TakeHomeResult;
}

export const SmartSalaryInsights: React.FC<SmartSalaryInsightsProps> = ({ input, result }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isAiFallback, setIsAiFallback] = useState(true);
  const [aiCustomHeadline, setAiCustomHeadline] = useState<string | null>(null);

  const baseInsights = useMemo(() => {
    try {
      return generateSalaryInsights(input, result);
    } catch (err) {
      console.warn('Local salary insights generation encountered an issue:', err);
      return generateSalaryInsights(input, result);
    }
  }, [input, result]);

  // Attempt AI enhancements with comprehensive try/catch fallback
  useEffect(() => {
    let isCancelled = false;

    async function fetchAiInsights() {
      const viteEnv = (import.meta as unknown as { env?: Record<string, string> })?.env;
      const apiKey =
        (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
        viteEnv?.VITE_GEMINI_API_KEY ||
        '';

      if (!apiKey || result.grossAnnual <= 0) {
        setIsAiFallback(true);
        setAiCustomHeadline(null);
        return;
      }

      try {
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Provide a single concise 1-sentence UK take-home summary headline for gross salary £${result.grossAnnual.toFixed(0)} resulting in estimated annual net £${result.netAnnual.toFixed(0)} (deduction rate ${(result.effectiveTaxRate * 100).toFixed(1)}%). Focus on key takeaway for employee.`,
        });

        if (!isCancelled && response?.text) {
          const headlineText = response.text.trim();
          if (headlineText.length > 0) {
            setAiCustomHeadline(headlineText);
            setIsAiFallback(false);
          }
        }
      } catch (error) {
        // Gracefully catch any API failure, network error, or missing permission
        if (!isCancelled) {
          setIsAiFallback(true);
          setAiCustomHeadline(null);
        }
      }
    }

    fetchAiInsights();

    return () => {
      isCancelled = true;
    };
  }, [result.grossAnnual, result.netAnnual, result.effectiveTaxRate]);

  const insights: SalaryInsightsData = useMemo(() => {
    if (aiCustomHeadline && !isAiFallback) {
      return {
        ...baseInsights,
        headline: aiCustomHeadline,
      };
    }
    return baseInsights;
  }, [baseInsights, aiCustomHeadline, isAiFallback]);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(insights.plainText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      // Fallback
    }
  };

  return (
    <div
      aria-label="Smart Salary Insights"
      className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] transition-colors duration-200 overflow-hidden"
    >
      {/* Top Subtle Emerald Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#059669] dark:bg-[#10B981]" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#F5F5F5] dark:bg-[#222222] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#2A2A2A]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
                Smart Salary Insights
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-3xs font-extrabold uppercase tracking-wider bg-[#F5F5F5] dark:bg-[#222222] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                {isAiFallback ? 'Standard Analysis' : 'AI-Enhanced'}
              </span>
            </div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-0.5">
              A simple explanation based on your estimated calculation.
            </p>
            {isAiFallback && (
              <p className="text-2xs text-[#737373] dark:text-[#888888] italic mt-0.5">
                AI-enhanced insights unavailable. Showing standard breakdown.
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#111111] dark:text-[#F5F5F5] bg-[#F5F5F5] hover:bg-[#E5E5E5] dark:bg-[#222222] dark:hover:bg-[#2A2A2A] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs transition-colors btn-press"
            aria-label="Copy insights to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                <span className="text-[#059669] dark:text-[#10B981]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#525252] dark:text-[#A3A3A3]" />
                <span>Copy insights</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#111111] dark:text-[#F5F5F5] bg-[#F5F5F5] hover:bg-[#E5E5E5] dark:bg-[#222222] dark:hover:bg-[#2A2A2A] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs transition-colors btn-press"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#525252] dark:text-[#A3A3A3]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#525252] dark:text-[#A3A3A3]" />
            )}
          </button>
        </div>
      </div>

      {/* Summary Highlight Pill */}
      <div className="mt-4 p-3.5 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">
            {insights.headline}
          </span>
        </div>
        <div className="text-xs font-bold text-[#059669] dark:text-[#10B981] tabular-nums">
          Effective deduction rate: {insights.mainDeductions.effectiveRateFormatted}
        </div>
      </div>

      {/* Four Detailed Sections */}
      {isExpanded && (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Section 1: Your Estimated Pay */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-[#111111] dark:text-[#F5F5F5]">
              <div className="p-1 rounded-md bg-white dark:bg-[#222222] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <Wallet className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold tracking-tight">1. Your Estimated Pay</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              {insights.estimatedPay.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981] shrink-0 mt-1.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Your Main Deductions */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-[#111111] dark:text-[#F5F5F5]">
              <div className="p-1 rounded-md bg-white dark:bg-[#222222] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <Receipt className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold tracking-tight">2. Your Main Deductions</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              {insights.mainDeductions.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981] shrink-0 mt-1.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Micro breakdown badges */}
            {insights.mainDeductions.items.length > 0 && (
              <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A] flex flex-wrap gap-1">
                {insights.mainDeductions.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-3xs font-bold px-2 py-0.5 rounded-md bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] tabular-nums"
                  >
                    {item.label}: {item.formattedMonthly}/mo ({item.percentOfGross})
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: What Stands Out */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-[#111111] dark:text-[#F5F5F5]">
              <div className="p-1 rounded-md bg-white dark:bg-[#222222] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <Lightbulb className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold tracking-tight">3. What Stands Out</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              {insights.whatStandsOut.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981] shrink-0 mt-1.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Things to Check */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-[#111111] dark:text-[#F5F5F5]">
              <div className="p-1 rounded-md bg-white dark:bg-[#222222] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold tracking-tight">4. Things to Check</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              {insights.thingsToCheck.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981] shrink-0 mt-1.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Visible Statutory Disclaimer */}
      <div className="mt-5 p-3 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-start gap-2 text-2xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
        <AlertCircle className="w-3.5 h-3.5 text-[#737373] dark:text-[#888888] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">Disclaimer: </span>
          {DISCLAIMER_TEXT}
        </div>
      </div>
    </div>
  );
};
