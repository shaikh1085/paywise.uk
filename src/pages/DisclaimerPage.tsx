import React from 'react';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Disclaimer', path: '/disclaimer' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Disclaimer | PayWise UK"
        description="Important legal and tax disclaimer. PayWise UK calculations are estimates for illustration only and do not constitute financial advice."
        keywords={[
          'PayWise UK disclaimer',
          'tax calculator legal notice',
          'financial advice disclaimer uk',
        ]}
        canonicalPath="/disclaimer"
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#D97706] dark:text-[#FBBF24] text-xs font-bold shadow-xs">
          <AlertTriangle className="w-3.5 h-3.5" />
          Important Legal Notice
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Disclaimer
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Please review the following legal disclosures regarding the calculations, estimates, and editorial content provided on PayWise UK.
        </p>
      </header>

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            1. Estimates for Illustration Only
          </h2>
          <p>
            All figures, calculations, tax estimates, pension projections, and take-home amounts produced by PayWise UK are mathematical approximations intended solely for illustrative and general budgeting purposes. They do not constitute binding financial, taxation, investment, legal, or accounting advice.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            2. Variations in Actual Payslips
          </h2>
          <p>
            Your exact take-home pay and statutory deductions may vary from our estimates due to employer-specific payroll cutoff schedules, cumulative vs non-cumulative (Month 1 / Week 1) tax codes, marriage allowances, company benefits in kind (P11D values), salary sacrifice agreements, and specific HMRC adjustments.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            3. Tax Year Accuracy ({TAX_CONFIG_METADATA.currentTaxYearLabel})
          </h2>
          <p>
            While we continuously update our calculation logic to reflect statutory HM Revenue & Customs (HMRC) and Scottish Government tax legislation, tax laws and thresholds are subject to change. Always consult a qualified Chartered Accountant (ACA/ACCA) or an FCA-regulated Independent Financial Adviser (IFA) before making significant financial commitments.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            4. No Endorsement or Affiliation
          </h2>
          <p>
            PayWise UK is an independent platform and is not affiliated with, endorsed by, or operated by HM Revenue & Customs (HMRC), the Department for Work and Pensions (DWP), or the UK Government.
          </p>
        </div>
      </div>
    </div>
  );
};
