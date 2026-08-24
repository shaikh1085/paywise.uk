import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { NhsCalculator } from '../components/calculators/NhsCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { NHS_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight } from 'lucide-react';

export const NhsSalaryPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'NHS Salary Calculator UK', path: '/nhs-salary-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="NHS Salary Calculator UK | Agenda for Change Pay Bands"
        description="Calculate NHS take-home pay across Bands 2 to 9, London High Cost Area Supplements (HCAS), and NHS pension scheme tiers."
        keywords={[
          'NHS salary calculator UK',
          'agenda for change pay scales',
          'nhs band 5 take home pay',
          'nhs pension tiers calculator',
          'nhs london weighting hcas',
        ]}
        canonicalPath="/nhs-salary-calculator"
        isCalculator={true}
        calculatorName="NHS Salary Calculator UK"
        calculatorDescription="Calculate NHS take-home pay across Bands 2 to 9, London High Cost Area Supplements (HCAS), and NHS pension scheme tiers."
        faqs={NHS_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          NHS Salary Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Estimate take-home pay for NHS healthcare staff under the Agenda for Change (AfC) framework, including pay step points from Band 2 to Band 9, London HCAS allowances, and NHS pension contribution tiers.
        </p>
      </div>

      <NhsCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            NHS Agenda for Change (AfC) Pay Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            The Agenda for Change pay system applies to all direct NHS staff in England (excluding doctors and dentists). Base pay is structured across Bands 2 to 9 with incremental step points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">London HCAS Supplements</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Staff working in London receive High Cost Area Supplements: Inner London (+20%, min £5,132, max £7,718), Outer London (+15%, min £4,313, max £5,436), or Fringe (+5%, min £1,192, max £2,011).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">NHS Pension Scheme Tiers</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Members contribute tiered rates from 5.2% to 12.5% based on actual pensionable pay. Contributions are deducted before Income Tax under Net Pay arrangements.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Step Point Progression</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Staff advance to higher pay step points within their band upon achieving 2 years or 4–5 years of completed service and satisfactory appraisal reviews.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-3">
            Related public sector & salary calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              to="/teacher-salary-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Teacher Salary Calculator</span>
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
              to="/take-home-pay-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Take-Home Pay Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={NHS_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
