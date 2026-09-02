import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { calculateTakeHomePay } from '../utils/calculations';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { Calculator } from 'lucide-react';

export const Guide50kPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Guides', path: '/guides' },
    { label: '£50,000 Salary After Tax', path: '/guides/50000-salary-after-tax-uk' },
  ];

  // Dynamic calculations for standard England PAYE with 5% relief-at-source pension
  const calculation = useMemo(() => {
    return calculateTakeHomePay({
      grossSalary: 50000,
      payFrequency: 'annual',
      taxYear: '2025_26',
      region: 'england_ni',
      taxCode: '1257L',
      pensionPercentage: 5,
      pensionFixedAmount: 0,
      pensionType: 'relief_at_source',
      employerPensionPercentage: 3,
      studentLoanPlan: 'none',
      bonus: 0,
      overtime: 0,
      otherTaxableIncome: 0,
      salarySacrificeMonthly: 0,
    });
  }, []);

  const faqs50k = [
    {
      question: 'What is the monthly take-home pay on a £50,000 salary in the UK?',
      answer: `On a £50,000 salary in England, Wales, and Northern Ireland for the ${TAX_CONFIG_METADATA.currentTaxYearLabel} tax year, your estimated take-home pay is approximately £${Math.round(calculation.netMonthly).toLocaleString()} per month, after deducting £${Math.round(calculation.incomeTaxMonthly).toLocaleString()} in Income Tax, £${Math.round(calculation.employeeNiMonthly).toLocaleString()} in National Insurance, and £${Math.round(calculation.pensionMonthly).toLocaleString()} in standard 5% pension contributions.`,
    },
    {
      question: 'Does a £50,000 salary put you in the higher rate tax band?',
      answer: 'No. In England, Wales, and Northern Ireland, the higher rate 40% tax threshold begins at £50,271. At £50,000, all your taxable income (above the £12,570 Personal Allowance) falls within the 20% basic rate band.',
    },
    {
      question: 'How much tax do you pay on £50,000 in Scotland?',
      answer: 'In Scotland, devolved tax bands apply. Earnings between £43,663 and £50,000 are taxed at the Scottish Higher Rate of 42%, resulting in slightly higher overall Income Tax than in England.',
    },
    {
      question: 'How much National Insurance is deducted from a £50,000 salary?',
      answer: `Under the current 8% employee Class 1 National Insurance rate, you pay 8% on earnings between £12,570 and £50,000, which amounts to approximately £${Math.round(calculation.employeeNiAnnual).toLocaleString()} per year (£${Math.round(calculation.employeeNiMonthly).toLocaleString()} per month).`,
    },
    {
      question: 'How much student loan do you repay on a £50,000 salary?',
      answer: 'On Plan 2 (threshold £27,295), you repay 9% of income above the threshold: 9% of £22,705 = £2,043.45 per year (approx. £170.29 per month). On Plan 1, annual repayments are approx. £2,250.90 (£187.58 per month).',
    },
    {
      question: 'Is £50,000 considered a good salary in the UK?',
      answer: 'Yes. According to ONS data, the UK median full-time salary is approximately £37,430. Earning £50,000 places you comfortably in the top 20% to 25% of all individual earners nationwide.',
    },
    {
      question: 'How does salary sacrifice benefit a £50,000 salary?',
      answer: 'Sacrificing salary into a workplace pension saves 20% Income Tax and 8% National Insurance on every pound contributed, resulting in an effective 28% instant tax savings.',
    },
    {
      question: 'What is the hourly rate equivalent of a £50,000 salary?',
      answer: 'Based on a standard 37.5-hour working week (1,950 hours per year), £50,000 gross salary equates to approximately £25.64 per hour before tax.',
    },
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="£50,000 Salary After Tax UK (2025/26) | Monthly Take-Home Pay"
        description="Find out what a £50,000 salary looks like after tax in the UK. See monthly take-home pay, Income Tax, National Insurance, pension and student loan breakdowns."
        keywords={[
          '50000 salary after tax UK',
          '50k after tax uk',
          '50k take home pay',
          '50000 salary monthly take home',
          '50k tax bracket uk',
        ]}
        canonicalPath="/guides/50000-salary-after-tax-uk"
        ogType="article"
        isArticle={true}
        articleDatePublished="2025-04-06"
        articleDateModified="2026-04-06"
        faqs={faqs50k}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          UK Salary Benchmark ({TAX_CONFIG_METADATA.currentTaxYearLabel})
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          £50,000 Salary After Tax in the UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Earning £50,000 puts you comfortably into the top quartile of UK individual earners. Below is the exact statutory breakdown of what you take home each month after Income Tax, 8% Class 1 National Insurance, and standard auto-enrolment workplace pension deductions.
        </p>
      </header>

      {/* Summary Stat Grid */}
      <div className="bg-[#111111] dark:bg-[#151515] text-white rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#2A2A2A]">
        <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider">
          Quick Summary: £50,000 Gross Salary
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#2A2A2A]">
          <div>
            <span className="text-2xs uppercase text-[#A3A3A3] font-semibold">Monthly Net Pay</span>
            <p className="text-xl sm:text-2xl font-black text-[#10B981] mt-0.5 tabular-nums">
              £{Math.round(calculation.netMonthly).toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-2xs uppercase text-[#A3A3A3] font-semibold">Annual Income Tax</span>
            <p className="text-xl sm:text-2xl font-bold text-[#F87171] mt-0.5 tabular-nums">
              £{Math.round(calculation.incomeTaxAnnual).toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-2xs uppercase text-[#A3A3A3] font-semibold">National Insurance</span>
            <p className="text-xl sm:text-2xl font-bold text-[#F87171] mt-0.5 tabular-nums">
              £{Math.round(calculation.employeeNiAnnual).toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-2xs uppercase text-[#A3A3A3] font-semibold">Effective Tax Rate</span>
            <p className="text-xl sm:text-2xl font-bold text-[#FBBF24] mt-0.5 tabular-nums">
              {calculation.effectiveTaxRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown Table */}
      <div className="space-y-4 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3]">
        <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
          Complete Payslip Breakdown on £50,000
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#F5F5F5] dark:bg-[#222222] text-xs uppercase font-bold text-[#111111] dark:text-[#F5F5F5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <tr>
                <th className="p-3">Category</th>
                <th className="p-3">Annual</th>
                <th className="p-3">Monthly</th>
                <th className="p-3">Weekly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A] bg-white dark:bg-[#171717] text-xs sm:text-sm">
              <tr>
                <td className="p-3 font-semibold text-[#111111] dark:text-[#F5F5F5]">Gross Salary</td>
                <td className="p-3 font-semibold text-[#111111] dark:text-[#F5F5F5] tabular-nums">£50,000.00</td>
                <td className="p-3 font-semibold text-[#111111] dark:text-[#F5F5F5] tabular-nums">£4,166.67</td>
                <td className="p-3 font-semibold text-[#111111] dark:text-[#F5F5F5] tabular-nums">£961.54</td>
              </tr>
              <tr>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171]">Income Tax (PAYE)</td>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171] tabular-nums">-£{calculation.incomeTaxAnnual.toFixed(2)}</td>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171] tabular-nums">-£{calculation.incomeTaxMonthly.toFixed(2)}</td>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171] tabular-nums">-£{calculation.incomeTaxWeekly.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171]">National Insurance (8%)</td>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171] tabular-nums">-£{calculation.employeeNiAnnual.toFixed(2)}</td>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171] tabular-nums">-£{calculation.employeeNiMonthly.toFixed(2)}</td>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171] tabular-nums">-£{calculation.employeeNiWeekly.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-3 text-[#D97706] dark:text-[#FBBF24]">Pension (5% Employee)</td>
                <td className="p-3 text-[#D97706] dark:text-[#FBBF24] tabular-nums">-£{calculation.pensionAnnual.toFixed(2)}</td>
                <td className="p-3 text-[#D97706] dark:text-[#FBBF24] tabular-nums">-£{calculation.pensionMonthly.toFixed(2)}</td>
                <td className="p-3 text-[#D97706] dark:text-[#FBBF24] tabular-nums">-£{(calculation.pensionAnnual / 52).toFixed(2)}</td>
              </tr>
              <tr className="bg-[#F5F5F5] dark:bg-[#222222] font-bold">
                <td className="p-3 text-[#059669] dark:text-[#10B981]">Net Take-Home Pay</td>
                <td className="p-3 text-[#059669] dark:text-[#10B981] tabular-nums">£{calculation.netAnnual.toFixed(2)}</td>
                <td className="p-3 text-[#059669] dark:text-[#10B981] tabular-nums">£{calculation.netMonthly.toFixed(2)}</td>
                <td className="p-3 text-[#059669] dark:text-[#10B981] tabular-nums">£{calculation.netWeekly.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Narrative Section */}
      <section className="space-y-4 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
        <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
          Understanding the 40% Higher Rate Threshold Buffer
        </h2>
        <p>
          One of the major advantages of a £50,000 gross salary in England, Wales, and Northern Ireland is that you remain just under the £50,270 higher rate threshold. This means every pound of your taxable income (above £12,570) is taxed at the basic rate of 20% rather than 40%.
        </p>
        <p>
          If you receive a bonus or pay rise that pushes your total annual earnings past £50,270, only the portion above £50,270 is taxed at 40%.
        </p>
      </section>

      {/* CTA Box */}
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
            Customise with your own deductions
          </h2>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1">
            Calculate your exact take-home pay with student loans, Scottish tax rates, or salary sacrifice.
          </p>
        </div>
        <Link
          to="/take-home-pay-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs transition-colors shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Launch Calculator</span>
        </Link>
      </div>

      {/* FAQs */}
      <FaqAccordion items={faqs50k} />

      {/* Disclaimer */}
      <DisclaimerNotice />
    </article>
  );
};
