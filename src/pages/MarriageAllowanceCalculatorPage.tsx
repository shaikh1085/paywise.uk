import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { MarriageAllowanceCalculator } from '../components/calculators/MarriageAllowanceCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { MARRIAGE_ALLOWANCE_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight } from 'lucide-react';

export const MarriageAllowanceCalculatorPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Marriage Allowance Calculator UK', path: '/marriage-allowance-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Marriage Allowance Calculator UK | See Your Household Tax Saving"
        description="Find out if you're eligible for UK Marriage Allowance and calculate how much tax your household could save by transferring £1,260 of Personal Allowance to your partner."
        keywords={[
          'marriage allowance calculator',
          'marriage allowance calculator uk',
          'marriage tax allowance calculator',
          'am i eligible for marriage allowance',
          'how much is marriage allowance worth',
          'marriage allowance tax saving calculator',
          'transfer personal allowance to spouse calculator',
          'marriage allowance backdated claim calculator',
          'married couples tax allowance uk',
          'marriage allowance eligibility checker',
        ]}
        canonicalPath="/marriage-allowance-calculator"
        isCalculator={true}
        calculatorName="Marriage Allowance Calculator UK"
        calculatorDescription="Find out if you're eligible for UK Marriage Allowance and calculate how much tax your household could save by transferring £1,260 of Personal Allowance to your partner."
        faqs={MARRIAGE_ALLOWANCE_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Marriage Allowance Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Check if your household is eligible to transfer 10% of your Personal Allowance (£1,260) to your spouse or civil partner, and calculate your annual take-home tax savings.
        </p>
      </div>

      <MarriageAllowanceCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            How Marriage Allowance Works
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Marriage Allowance allows a person who earns less than the standard Personal Allowance (£12,570 for 2025/26) to transfer 10% of their allowance (£1,260) to their husband, wife, or civil partner. The receiving partner receives an increased Personal Allowance of £13,830, saving 20% basic rate tax on that £1,260 — worth exactly <strong>£252.00 per year</strong> in lower Income Tax deductions through payroll.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">1. Transferring Partner (Code N)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              The lower-earning partner gives up £1,260 of their Personal Allowance (reducing it to £11,310 with an &lsquo;N&rsquo; suffix tax code). Because their income is below £11,310, they pay £0 extra tax.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">2. Recipient Partner (Code M)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              The basic-rate partner receives the £1,260 allowance boost (increasing their allowance to £13,830 with an &lsquo;M&rsquo; suffix tax code), instantly reducing their taxable income.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">3. Direct Payroll Saving</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              HMRC adjusts your PAYE tax codes automatically. The £252 annual saving is divided across your regular monthly pay cheques, giving you an extra £21 per month in net take-home pay.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Who Is Eligible for Marriage Allowance
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            To benefit from Marriage Allowance, your household must meet all three statutory criteria:
          </p>
          <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] list-disc list-inside">
            <li><strong>Relationship Status:</strong> You must be married or in a registered civil partnership. Cohabiting couples who live together but are not legally married do not qualify.</li>
            <li><strong>Lower Earner Income:</strong> One partner must have an annual income below £12,570 (such as a stay-at-home parent, part-time worker, or retiree).</li>
            <li><strong>Higher Earner Tax Bracket:</strong> The other partner must pay Income Tax at the Basic Rate — earning between £12,571 and £50,270 in England, Wales, and Northern Ireland (or between £12,571 and £43,662 in Scotland). If the recipient partner is a Higher Rate (40%/42%) or Additional Rate (45%/48%) taxpayer, you cannot claim.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Backdating Your Marriage Allowance Claim
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            If you were eligible for Marriage Allowance in previous tax years but did not apply, you can backdate your claim by up to <strong>4 tax years</strong>. For claims made in the 2025/26 tax year, you can claim for 2021/22, 2022/23, 2023/24, and 2024/25. A successful backdated claim can result in a lump-sum tax rebate of up to <strong>£1,250 or more</strong> directly from HMRC via bank transfer or cheque.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-3">
            Related UK earnings calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/take-home-pay-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Take-Home Pay Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/pay-rise-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Pay Rise Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/pension-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Pension Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={MARRIAGE_ALLOWANCE_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};

export default MarriageAllowanceCalculatorPage;
