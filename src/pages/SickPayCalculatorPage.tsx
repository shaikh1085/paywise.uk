import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SickPayCalculator } from '../components/calculators/SickPayCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { SICK_PAY_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight } from 'lucide-react';

export const SickPayCalculatorPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Statutory Sick Pay Calculator UK', path: '/statutory-sick-pay-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Statutory Sick Pay Calculator UK | SSP Rate & Waiting Days"
        description="Calculate your UK Statutory Sick Pay (SSP), including eligibility, unpaid waiting days, and how much sick pay you're owed for time off work due to illness."
        keywords={[
          'statutory sick pay calculator',
          'ssp calculator uk',
          'sick pay calculator uk',
          'how much is statutory sick pay uk',
          'ssp eligibility calculator',
          'sick pay waiting days calculator',
          'statutory sick pay rate 2026',
          'am i entitled to statutory sick pay',
          'ssp lower earnings limit calculator',
          'how many weeks can you claim ssp',
        ]}
        canonicalPath="/statutory-sick-pay-calculator"
        isCalculator={true}
        calculatorName="Statutory Sick Pay (SSP) Calculator UK"
        calculatorDescription="Calculate your UK Statutory Sick Pay (SSP), including eligibility, unpaid waiting days, and how much sick pay you're owed for time off work due to illness."
        faqs={SICK_PAY_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Statutory Sick Pay Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Calculate your statutory sick pay entitlement, check whether you meet the Lower Earnings Limit, and calculate the deduction for unpaid waiting days when off work sick.
        </p>
      </div>

      <SickPayCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            How Statutory Sick Pay (SSP) Works
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Statutory Sick Pay (SSP) is the legal minimum amount employers in the UK must pay to qualifying employees who cannot work due to sickness. For the 2025/26 tax year, the statutory rate is £116.75 per week. SSP is paid in the same way as your normal wages through PAYE, meaning Income Tax and National Insurance will be deducted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Lower Earnings Limit (LEL)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              To qualify for SSP, your average gross weekly earnings (AWE) must be at least £125 per week before tax over the 8 weeks prior to your sickness absence.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Qualifying Days</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              SSP is only paid for qualifying days — the days you are contracted to work. The daily SSP rate is calculated by dividing the statutory weekly rate by your contracted days.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">28-Week Cap</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Employers must pay SSP for up to 28 weeks. Once this maximum is reached, you are given an SSP1 form to transition to Employment and Support Allowance (ESA).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Waiting Days: Why the First 3 Sick Days Are Usually Unpaid
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            By statutory UK law, you do not receive SSP for the first 3 qualifying days you miss from work. These are called &ldquo;waiting days&rdquo;. You only begin receiving SSP from the 4th qualifying day off work.
          </p>
          <div className="mt-3 p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            <strong className="text-[#111111] dark:text-[#F5F5F5]">Exception for Linked Sickness Periods:</strong> If you were off sick for 4 or more consecutive days within the previous 8 weeks and already served your 3 waiting days, the new period of sickness is classed as &ldquo;linked&rdquo;. For linked periods, no waiting days apply and SSP is payable from your first qualifying day off.
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Statutory Sick Pay vs Occupational Sick Pay
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Statutory Sick Pay is the legal minimum floor. Many UK employers offer an <strong>occupational (contractual) sick pay scheme</strong> as part of employee benefits. Company schemes typically provide full basic salary for an initial number of weeks (such as 4 to 26 weeks) followed by a period of half-pay. Check your employment contract or staff handbook: employers cannot pay less than SSP, so any contractual scheme replaces or tops up SSP to the higher amount.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-3">
            Related UK earnings calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              to="/take-home-pay-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Take-Home Pay Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/redundancy-pay-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Redundancy Pay Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/maternity-pay-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Maternity Pay Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={SICK_PAY_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};

export default SickPayCalculatorPage;
