import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { calculateTakeHomePay } from '../utils/calculations';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { Calculator } from 'lucide-react';

export const Guide60kPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Guides', path: '/guides' },
    { label: '£60,000 Salary After Tax', path: '/guides/60000-salary-after-tax-uk' },
  ];

  // Dynamic calculations for standard England PAYE on £60k
  const calculation = useMemo(() => {
    return calculateTakeHomePay({
      grossSalary: 60000,
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

  const faqs60k = [
    {
      question: 'What is the monthly take-home pay on a £60,000 salary in the UK?',
      answer: `On a £60,000 salary in England for the ${TAX_CONFIG_METADATA.currentTaxYearLabel} tax year, your estimated take-home pay is approximately £${Math.round(calculation.netMonthly).toLocaleString()} per month, after deducting £${Math.round(calculation.incomeTaxMonthly).toLocaleString()} in Income Tax, £${Math.round(calculation.employeeNiMonthly).toLocaleString()} in National Insurance, and £${Math.round(calculation.pensionMonthly).toLocaleString()} in standard 5% pension contributions.`,
    },
    {
      question: 'How much of a £60,000 salary is taxed at the 40% higher rate?',
      answer: 'The 40% higher rate tax applies to earnings above £50,270. On a £60,000 salary, exactly £9,730 of your income is taxed at 40% (£3,892 tax), while earnings between £12,570 and £50,270 are taxed at the 20% basic rate (£7,540 tax).',
    },
    {
      question: 'How does National Insurance change above £50,270?',
      answer: 'Employee Class 1 National Insurance drops from 8% down to 2% on all earnings above the Upper Earnings Limit (£50,270). You pay 8% on £37,700 (£3,016) and 2% on the remaining £9,730 (£194.60), totaling £3,210.60 per year.',
    },
    {
      question: 'How does a £60,000 salary affect the High Income Child Benefit Charge?',
      answer: 'The UK High Income Child Benefit Charge threshold is £60,000 (tapering to £80,000). At exactly £60,000 adjusted net income, you retain 100% of your Child Benefit without any clawback charge.',
    },
    {
      question: 'How can salary sacrifice reduce tax on a £60,000 salary?',
      answer: 'By sacrificing £9,730 into a workplace pension, you reduce your taxable gross earnings to £50,270, saving 40% Income Tax and 2% National Insurance (a 42% total tax saving on contributed funds).',
    },
    {
      question: 'What is the take-home pay on £60,000 in Scotland?',
      answer: 'In Scotland, income above £43,662 is taxed at the Scottish Higher Rate of 42%, making total Scottish Income Tax higher than in England.',
    },
    {
      question: 'What are the student loan deductions on a £60,000 salary?',
      answer: 'Under Plan 2 (threshold £27,295), you repay 9% of income above £27,295: 9% of £32,705 = £2,943.45 per year (approx. £245.29 per month).',
    },
    {
      question: 'Is £60,000 in the top 10% of UK earners?',
      answer: 'Yes. Earning £60,000 places you roughly in the top 12% to 15% of all individual income taxpayers in the United Kingdom.',
    },
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="£60,000 Salary After Tax UK (2025/26) | 40% Tax Band Breakdown"
        description="Discover your net pay on a £60,000 salary in the UK. Detailed breakdown of 40% higher rate tax, National Insurance, pension savings and child benefit impact."
        keywords={[
          '60000 salary after tax UK',
          '60k after tax uk',
          '60k take home pay',
          '60000 salary monthly net pay',
          '40 percent tax band 60k salary',
        ]}
        canonicalPath="/guides/60000-salary-after-tax-uk"
        ogType="article"
        isArticle={true}
        articleDatePublished="2025-04-06"
        articleDateModified="2026-04-06"
        faqs={faqs60k}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Higher Rate Tax Benchmark ({TAX_CONFIG_METADATA.currentTaxYearLabel})
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          £60,000 Salary After Tax in the UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          At £60,000 gross salary, your income enters the 40% Higher Rate Income Tax band. Here is the full breakdown of your monthly take-home pay, 20% vs 40% tax bands, 2% NI rates, and workplace pension contributions.
        </p>
      </header>

      {/* Summary Stat Grid */}
      <div className="bg-[#111111] dark:bg-[#151515] text-white rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#2A2A2A]">
        <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider">
          Quick Summary: £60,000 Gross Salary
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

      {/* Detailed Table */}
      <div className="space-y-4 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3]">
        <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
          Complete Payslip Breakdown on £60,000
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
                <td className="p-3 font-semibold text-[#111111] dark:text-[#F5F5F5] tabular-nums">£60,000.00</td>
                <td className="p-3 font-semibold text-[#111111] dark:text-[#F5F5F5] tabular-nums">£5,000.00</td>
                <td className="p-3 font-semibold text-[#111111] dark:text-[#F5F5F5] tabular-nums">£1,153.85</td>
              </tr>
              <tr>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171]">Income Tax (20% & 40%)</td>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171] tabular-nums">-£{calculation.incomeTaxAnnual.toFixed(2)}</td>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171] tabular-nums">-£{calculation.incomeTaxMonthly.toFixed(2)}</td>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171] tabular-nums">-£{calculation.incomeTaxWeekly.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-3 text-[#DC2626] dark:text-[#F87171]">National Insurance (8% & 2%)</td>
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

      {/* CTA Box */}
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
            Optimise your £60,000 tax position
          </h2>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1">
            Explore how salary sacrifice pension contributions can bring you back into the 20% basic rate bracket.
          </p>
        </div>
        <Link
          to="/salary-sacrifice-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs transition-colors shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Salary Sacrifice Tool</span>
        </Link>
      </div>

      <FaqAccordion items={faqs60k} />
      <DisclaimerNotice />
    </article>
  );
};
