import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface DisclaimerNoticeProps {
  compact?: boolean;
}

export const DisclaimerNotice: React.FC<DisclaimerNoticeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs text-[#525252] dark:text-[#A3A3A3]">
        <AlertCircle className="w-4 h-4 shrink-0 text-[#B45309] dark:text-[#FBBF24] mt-0.5" />
        <p className="leading-snug">
          <strong className="text-[#111111] dark:text-[#F5F5F5]">Estimate only:</strong> PayWise UK calculations are for guidance and do not constitute formal tax, legal, or financial advice. Verify with HMRC or your employer.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] my-6">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#B45309] dark:text-[#FBBF24] shrink-0">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <p className="font-bold text-[#111111] dark:text-[#F5F5F5]">
            Important Information & Professional Disclaimer
          </p>
          <p className="leading-relaxed text-xs text-[#525252] dark:text-[#A3A3A3]">
            PayWise UK provides estimates based on standard UK tax legislation and thresholds. Individual payroll deductions may differ due to cumulative PAYE tax codes, benefits in kind (P11D), salary sacrifice schemes, student loan plans, or special regional tax rules. Always verify critical figures with HM Revenue & Customs (HMRC), your employer’s payroll team, or a qualified financial adviser.
          </p>
        </div>
      </div>
    </div>
  );
};
