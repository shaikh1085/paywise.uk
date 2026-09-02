import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { TakeHomeCalculator } from '../components/calculators/TakeHomeCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { TAKE_HOME_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const TakeHomePayPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Take-Home Pay Calculator UK', path: '/take-home-pay-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Take-Home Pay Calculator UK | Estimate Net Salary"
        description="Estimate your UK take-home pay by salary, tax region, pension and student loan plan. See Income Tax, National Insurance and net pay estimates."
        keywords={[
          'take-home pay calculator UK',
          'uk salary calculator',
          'net pay calculator uk',
          'paye tax calculator',
          'income tax calculator uk',
          'take home wage estimate',
        ]}
        canonicalPath="/take-home-pay-calculator"
        isCalculator={true}
        calculatorName="Take-Home Pay Calculator UK"
        calculatorDescription="Estimate your UK take-home pay by salary, tax region, pension and student loan plan. See Income Tax, National Insurance and net pay estimates."
        faqs={TAKE_HOME_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Take-Home Pay Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Use this free calculator to estimate your UK net salary after Income Tax, National Insurance, auto-enrolment pensions, and student loan deductions across England, Scotland, Wales, and Northern Ireland.
        </p>
      </div>

      {/* Section: Calculate your estimated UK net salary */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Calculate your estimated UK net salary
        </h2>
        <TakeHomeCalculator />
      </div>

      {/* Comprehensive Editorial & Tax Context */}
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">
        
        {/* Section: What this take-home pay calculator includes */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            What this take-home pay calculator includes
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Our UK salary engine models the complete Pay As You Earn (PAYE) calculation pipeline with full statutory support:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1">
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] block">Personal Allowance</span>
              <p className="text-[#525252] dark:text-[#A3A3A3]">£12,570 standard tax-free threshold, with £100k taper adjustments.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1">
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] block">Class 1 National Insurance</span>
              <p className="text-[#525252] dark:text-[#A3A3A3]">8% main rate on earnings between £12,570 and £50,270; 2% above £50,270.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1">
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] block">Workplace Pensions</span>
              <p className="text-[#525252] dark:text-[#A3A3A3]">Auto-enrolment qualifying bands, relief at source, net pay, and salary sacrifice.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1">
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] block">Student Loan Repayments</span>
              <p className="text-[#525252] dark:text-[#A3A3A3]">Plans 1, 2, 4 (Scotland), 5, and Postgraduate loan deduction thresholds.</p>
            </div>
          </div>
        </section>

        {/* Section: How UK take-home pay is estimated */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            How UK take-home pay is estimated
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            In the United Kingdom, statutory employment deductions follow a strict order:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3]">
            <li><strong>Contractual Gross Pay:</strong> Your annual or periodic salary, plus bonuses and overtime.</li>
            <li><strong>Salary Sacrifice Deductions:</strong> Pre-tax deductions (pensions, cycle to work, EV schemes) reduce contractual gross salary before tax or NI is calculated.</li>
            <li><strong>Taxable Pay & Pension Relief:</strong> Taxable pay is adjusted for pension relief type (Net Pay arrangements reduce taxable income prior to PAYE tax calculations).</li>
            <li><strong>Income Tax Deduction:</strong> Applied to taxable pay above your Personal Allowance (£12,570 for standard 1257L tax codes).</li>
            <li><strong>National Insurance Deduction:</strong> Calculated per pay period on gross pay above the Primary Threshold (£1,048/month).</li>
            <li><strong>Student Loan Deductions:</strong> Calculated on earnings exceeding your specific plan's threshold.</li>
            <li><strong>Net Take-Home Pay:</strong> The actual cash credited to your bank account on payday.</li>
          </ol>
        </section>

        {/* Section: Income Tax and National Insurance deductions */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            Income Tax and National Insurance deductions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                England, Wales & Northern Ireland Tax Rates
              </h3>
              <ul className="space-y-1 text-[#525252] dark:text-[#A3A3A3] text-xs">
                <li>• <strong>Personal Allowance:</strong> £0 to £12,570 (0% Tax-Free)</li>
                <li>• <strong>Basic Rate (20%):</strong> £12,571 to £50,270</li>
                <li>• <strong>Higher Rate (40%):</strong> £50,271 to £125,140</li>
                <li>• <strong>Additional Rate (45%):</strong> Over £125,140</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                Scottish Devolved Income Tax Rates
              </h3>
              <ul className="space-y-1 text-[#525252] dark:text-[#A3A3A3] text-xs">
                <li>• <strong>Starter Rate (19%):</strong> £12,571 to £14,876</li>
                <li>• <strong>Basic Rate (20%):</strong> £14,877 to £26,561</li>
                <li>• <strong>Intermediate Rate (21%):</strong> £26,562 to £43,662</li>
                <li>• <strong>Higher Rate (42%):</strong> £43,663 to £75,000</li>
                <li>• <strong>Advanced Rate (45%):</strong> £75,001 to £125,140</li>
                <li>• <strong>Top Rate (48%):</strong> Over £125,140</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Pension, salary sacrifice and student loans */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            Pension, salary sacrifice and student loans
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Workplace pension contributions receive tax relief at your marginal rate. Salary sacrifice creates an additional saving by lowering Class 1 National Insurance for both employee (8% or 2%) and employer (15%). Student loan repayments are deducted concurrently if you have both undergraduate and postgraduate loans.
          </p>
        </section>

        {/* Section: Important calculation assumptions */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            Important calculation assumptions
          </h2>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            All outputs generated by this calculator are estimates intended for personal budgeting and illustration only. Exact payslips may vary depending on employer payroll processing schedules, cumulative PAYE adjustments, company benefits in kind (e.g. medical insurance or company vehicles), and specific HMRC tax code changes.
          </p>
        </section>

        {/* Section: Related UK salary tools */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            Related UK salary tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              to="/salary-calculators"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>All Salary Calculators Hub</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/day-rate-to-salary-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Day Rate to Salary</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/pension-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Pension Pot Projection</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/student-loan-repayment-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Student Loan Deductions</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/salary-sacrifice-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Salary Sacrifice Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/guides/50000-salary-after-tax-uk"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>£50,000 Salary After Tax</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>
      </div>

      {/* Section: Frequently asked questions */}
      <FaqAccordion items={TAKE_HOME_FAQS} title="Frequently asked questions" />

      {/* Disclaimer */}
      <DisclaimerNotice />
    </div>
  );
};

