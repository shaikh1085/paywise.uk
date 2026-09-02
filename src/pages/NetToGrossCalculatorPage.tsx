import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { NetToGrossCalculator } from '../components/calculators/NetToGrossCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { NET_TO_GROSS_FAQS } from '../data/faqsData';
import { ArrowRight, Calculator, CheckCircle2, HelpCircle } from 'lucide-react';

export const NetToGrossCalculatorPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Net to Gross Salary Calculator', path: '/net-to-gross-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Net to Gross Salary Calculator UK | Reverse Take-Home Pay Calculator"
        description="Calculate the gross salary required to achieve your target net take-home pay. Reverse UK tax calculator accounting for Income Tax, National Insurance, pension, and student loans."
        keywords={[
          'net to gross calculator uk',
          'reverse salary calculator uk',
          'gross from net calculator',
          'how much gross for 3000 net uk',
          'calculate gross salary from take home pay',
          'reverse paye tax calculator',
          'net to gross pay calculator 2025/26',
          'target take home pay calculator',
          'gross salary needed for target net',
          'reverse income tax calculator uk',
        ]}
        canonicalPath="/net-to-gross-calculator"
        isCalculator={true}
        calculatorName="Net to Gross Salary Calculator UK"
        calculatorDescription="Calculate the gross salary required to achieve your target net take-home pay after UK Income Tax, National Insurance, pension, and student loans."
        faqs={NET_TO_GROSS_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Reverse PAYE &amp; Take-Home Salary Calculator
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Net to Gross Salary Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Find out exactly what gross annual salary you need to earn to achieve your desired take-home pay in your bank account. Accounts for UK Income Tax, 8% Class 1 National Insurance, pension schemes, and student loans across England, Wales, and Scotland.
        </p>
      </div>

      <NetToGrossCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            How to calculate gross salary from desired take-home pay
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            When employers advertise salaries, they quote the gross amount before deductions. However, when budgeting for rent, mortgage payments, bills, and lifestyle goals, you care about the net amount deposited into your bank account.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">1. Target Net Target</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Start with your monthly living expenses, savings, and discretionary budget to establish your minimum required monthly or annual take-home pay.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">2. Reverse PAYE Math</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Because UK Income Tax is progressive and banded (20%, 40%, 45%), reverse calculation must account for marginal tax rate jumps and NI thresholds.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">3. Factor In Deductions</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Add any employee pension contributions (e.g. 5% auto-enrolment) and student loan repayments to find the true gross offer you need to negotiate.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            Key factors impacting gross salary requirements
          </h2>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] mb-1">
                Tax Year &amp; Personal Allowance
              </h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                The standard UK personal allowance is £12,570 (frozen through 2028). Earnings above this threshold attract 20% basic rate tax and 8% employee Class 1 NI up to £50,270, then 40% higher rate tax and 2% NI above £50,270.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] mb-1">
                The £100k–£125k 60% Marginal Tax Trap
              </h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                For earnings over £100,000, your £12,570 personal allowance reduces by £1 for every £2 earned, creating an effective 60% marginal tax rate (40% tax + 20% loss of allowance + 2% NI = 62%). To increase net pay in this range, a significantly higher gross bump is required.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] mb-1">
                Scottish Income Tax Rates
              </h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Scottish residents pay different devolved tax bands: Starter (19%), Basic (20%), Intermediate (21%), Higher (42%), Advanced (45%), and Top (48%). Due to these rates, Scottish workers generally require a slightly higher gross salary to achieve the same net take-home pay.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] mb-1">
                Workplace Pension Tax Relief
              </h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Pension contributions via Net Pay or Salary Sacrifice receive full tax relief, which lowers taxable income and reduces both Income Tax and National Insurance. This means you need a smaller gross salary to achieve a target take-home if salary sacrifice is utilised.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5]">
            Related UK salary &amp; tax calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { to: '/take-home-pay-calculator', label: 'Take-Home Pay Calculator' },
              { to: '/pay-rise-calculator', label: 'Pay Rise Calculator' },
              { to: '/salary-sacrifice-calculator', label: 'Salary Sacrifice Calculator' },
              { to: '/pension-calculator', label: 'Pension Calculator' },
              { to: '/vat-calculator', label: 'VAT Calculator UK' },
              { to: '/salary-calculators', label: 'Browse All Calculators' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group transition-all"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <FaqAccordion items={NET_TO_GROSS_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};

export default NetToGrossCalculatorPage;
