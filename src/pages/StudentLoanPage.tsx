import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { StudentLoanCalculator } from '../components/calculators/StudentLoanCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { STUDENT_LOAN_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight } from 'lucide-react';

export const StudentLoanPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Student Loan Repayment Calculator UK', path: '/student-loan-repayment-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Student Loan Repayment Calculator UK | Plans 1, 2, 4, 5 & Postgraduate"
        description="Calculate UK student loan repayments across Plan 1, Plan 2, Plan 4 (Scotland), Plan 5, and Postgraduate loans based on your gross income."
        keywords={[
          'student loan repayment calculator UK',
          'student loan calculator uk',
          'plan 2 student loan repayment',
          'plan 1 student loan deduction',
          'postgraduate loan repayment calculator',
        ]}
        canonicalPath="/student-loan-repayment-calculator"
        isCalculator={true}
        calculatorName="Student Loan Repayment Calculator UK"
        calculatorDescription="Calculate UK student loan repayments across Plan 1, Plan 2, Plan 4 (Scotland), Plan 5, and Postgraduate loans."
        faqs={STUDENT_LOAN_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Student Loan Repayment Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Calculate monthly and annual deductions across UK Student Loan Plans (Plan 1, Plan 2, Plan 4, Plan 5, and Postgraduate loans) based on statutory repayment thresholds.
        </p>
      </div>

      <StudentLoanCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            UK Student Loan Repayment Plans Explained
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            In the UK, student loans function as an income-contingent graduate tax deducted through PAYE. You only repay if your gross earnings exceed your plan’s statutory threshold.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Plan 1</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3]">Threshold: £24,990 / year. 9% deducted above threshold. Applies to courses starting 1998–2011 (England/Wales) or Northern Ireland.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Plan 2</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3]">Threshold: £27,295 / year. 9% deducted above threshold. Applies to undergraduate courses between Sept 2012 and July 2023.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Plan 4 (Scotland)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3]">Threshold: £31,395 / year. 9% deducted above threshold. Applies to Scottish students funded via SAAS.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Plan 5</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3]">Threshold: £25,000 / year. 9% deducted above threshold. Applies to new courses starting from 1 August 2023.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Postgraduate Loan</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3]">Threshold: £21,000 / year. 6% deducted above threshold. Deducted concurrently alongside undergraduate loans.</p>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-3">
            Related UK tax calculators
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
              <span>£50k Salary Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={STUDENT_LOAN_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
