import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { RedundancyCalculator } from '../components/calculators/RedundancyCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { REDUNDANCY_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight } from 'lucide-react';

export const RedundancyPayPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Redundancy Pay Calculator UK', path: '/redundancy-pay-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Redundancy Pay Calculator UK | Statutory Redundancy & Tax-Free Amount"
        description="Calculate your UK statutory redundancy pay based on age, length of service, and weekly pay, and see how much is tax-free under the £30,000 exemption."
        keywords={[
          'redundancy pay calculator',
          'statutory redundancy pay calculator uk',
          'redundancy calculator uk 2026',
          'how much redundancy pay will i get uk',
          'redundancy pay tax free amount',
          '£30000 redundancy tax free calculator',
          'redundancy pay after tax calculator',
          'statutory redundancy pay calculator by age',
          'enhanced redundancy pay calculator uk',
          'redundancy notice pay calculator',
        ]}
        canonicalPath="/redundancy-pay-calculator"
        isCalculator={true}
        calculatorName="Redundancy Pay Calculator UK"
        calculatorDescription="Calculate your UK statutory redundancy pay based on age, length of service, and weekly pay, and see how much is tax-free under the £30,000 exemption."
        faqs={REDUNDANCY_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Redundancy Pay Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Calculate your UK statutory redundancy entitlement based on your age and continuous service, and model tax on contractual or enhanced redundancy payouts under the £30,000 exemption.
        </p>
      </div>

      <RedundancyCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            How Statutory Redundancy Pay Is Calculated
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            In the United Kingdom, statutory redundancy pay is legally guaranteed for eligible employees who have completed at least 2 full continuous years of service. The calculation uses an official age-banded formula, counting backwards from your current age for up to 20 years of service:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Under Age 22</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              <strong>0.5 week's pay</strong> for each full continuous year of employment completed under the age of 22.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Aged 22 to 40</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              <strong>1.0 week's pay</strong> for each full continuous year of employment completed between ages 22 and 40.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Aged 41 and Over</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              <strong>1.5 weeks' pay</strong> for each full continuous year of employment completed at age 41 and older.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            The £30,000 Tax-Free Redundancy Threshold
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
            HM Revenue and Customs (HMRC) provides a substantial tax exemption on genuine termination and redundancy payments:
          </p>
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-3 text-xs">
            <div className="space-y-1">
              <strong className="text-[#111111] dark:text-[#F5F5F5] block">
                1. First £30,000 Is 100% Tax-Free:
              </strong>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Your statutory redundancy pay plus any enhanced contractual redundancy pay is completely exempt from UK Income Tax and Employee National Insurance up to £30,000.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#111111] dark:text-[#F5F5F5] block">
                2. Taxation on Amounts Above £30,000:
              </strong>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Any redundancy payout exceeding £30,000 is subject to Income Tax at your normal marginal rate (20%, 40%, or 45%). However, it remains exempt from employee Class 1 National Insurance contributions. Employers pay Class 1A NI on the excess.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Statutory vs Enhanced (Contractual) Redundancy Pay
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
            Many UK employers offer packages that exceed the legal minimum:
          </p>
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2 text-xs">
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              • <strong>Statutory Redundancy:</strong> The non-negotiable legal floor set by UK employment law, subject to the 20-year service cap and weekly pay cap (£700/week).
            </p>
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              • <strong>Enhanced Redundancy:</strong> Company schemes that may uncap weekly pay, offer higher multiples per year of service (e.g. 2–4 weeks per year), or pay an agreed ex-gratia settlement sum.
            </p>
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              • <strong>Notice &amp; Holiday Pay:</strong> Note that Pay in Lieu of Notice (PILON) and accrued untaken holiday pay are treated as standard earnings and are not eligible for the £30,000 exemption.
            </p>
          </div>
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
              to="/pension-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Pension Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/pay-rise-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Pay Rise Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={REDUNDANCY_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
export default RedundancyPayPage;
