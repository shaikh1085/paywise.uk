import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { MinimumWageChecker } from '../components/calculators/MinimumWageChecker';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { MINIMUM_WAGE_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight, ShieldCheck, AlertCircle, Scale, PhoneCall } from 'lucide-react';

export const MinimumWageCheckerPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'National Minimum Wage Checker UK', path: '/national-minimum-wage-checker' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="National Minimum Wage Checker UK | Am I Being Paid Correctly?"
        description="Check if you're being paid at least the UK National Minimum Wage or National Living Wage for your age, based on your hourly rate, salary, or hours worked."
        keywords={[
          'national minimum wage checker',
          'minimum wage calculator uk',
          'national living wage calculator',
          'am i being paid national minimum wage',
          'minimum wage checker uk 2026',
          'national minimum wage by age uk',
          'check my pay minimum wage uk',
          'minimum wage per hour uk calculator',
          'apprentice minimum wage calculator',
          'am i underpaid national minimum wage uk',
        ]}
        canonicalPath="/national-minimum-wage-checker"
        isCalculator={true}
        calculatorName="National Minimum Wage Checker UK"
        calculatorDescription="Check if you're being paid at least the UK National Minimum Wage or National Living Wage for your age, based on your hourly rate, salary, or hours worked."
        faqs={MINIMUM_WAGE_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          National Minimum Wage Checker UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Check if you're being paid at least the UK National Minimum Wage or National Living Wage for your age, based on your hourly rate, salary, or hours worked.
        </p>
      </div>

      <MinimumWageChecker />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Current UK National Minimum Wage and National Living Wage Rates by Age
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            The National Minimum Wage (NMW) and National Living Wage (NLW) are the minimum hourly rates of pay that almost all workers in the UK are entitled to by law. The rates are updated every year in April following recommendations from the independent Low Pay Commission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              National Living Wage (21+)
            </h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              For 2025/26, the statutory rate for all workers aged 21 and over is <strong>£12.21/hour</strong> (up from £11.44 in 2024/25).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              18–20 &amp; Under 18 Rates
            </h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Workers aged 18 to 20 are entitled to <strong>£10.00/hour</strong>. Workers aged 16 to 17 above school leaving age are entitled to <strong>£7.55/hour</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Apprentice Entitlement
            </h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Apprentices under 19 or in their first year receive <strong>£7.55/hour</strong>. After year 1, apprentices aged 19+ must receive the full rate for their age.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            What Counts as Pay for National Minimum Wage Purposes
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
            Under UK employment regulations, your total earnings in each pay reference period divided by your actual hours worked must never fall below the statutory minimum wage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#F0FDF4] dark:bg-[#052e16]/40 border border-[#059669]/20 space-y-2">
              <h3 className="font-bold text-[#059669] dark:text-[#10B981]">Hours that must be counted as working time:</h3>
              <ul className="list-disc pl-4 space-y-1 text-2xs sm:text-xs text-[#525252] dark:text-[#D1D5DB]">
                <li>Mandatory handover, opening, setup, and cleaning time before or after shifts</li>
                <li>Compulsory staff training, inductions, and team meetings</li>
                <li>Security checks, bag inspections, and badge scanning at workplace entrances</li>
                <li>Travel time between appointments or client sites during the working day</li>
                <li>Time spent on standby or on-call at your workplace</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
              <h3 className="font-bold text-amber-800 dark:text-amber-300">Deductions that unlawfully reduce NMW pay:</h3>
              <ul className="list-disc pl-4 space-y-1 text-2xs sm:text-xs text-amber-900 dark:text-amber-200">
                <li>Cost of mandatory uniforms, work clothing, or safety gear (PPE)</li>
                <li>Deductions for till shortages, breakages, or customer walkouts</li>
                <li>Mandatory tools, materials, or equipment hire required for the job</li>
                <li>Accommodation charges that exceed the statutory accommodation offset (£10.66/day in 2025/26)</li>
                <li>Administrative fees for payroll, criminal record checks (DBS), or tips administration</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            What to Do If You're Being Paid Below the Minimum Wage
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
            If your employer is paying you below the statutory minimum wage, they are breaking the law. You are legally entitled to recover all back-pay for up to 6 years.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">1. Contact Acas for Free Advice</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
                Call the Acas Helpline on <strong>0300 123 1100</strong> (Monday to Friday, 8am to 6pm). Acas provides free, confidential, and impartial employment advice to workers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">2. Report to HMRC Confidentially</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
                HMRC investigates all complaints of minimum wage non-compliance. Employers found in breach must pay 100% of arrears to workers and face penalties up to 200% of arrears.
              </p>
            </div>
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
              to="/hourly-to-salary-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Hourly to Salary Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/overtime-pay-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Overtime Pay Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={MINIMUM_WAGE_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};

export default MinimumWageCheckerPage;
