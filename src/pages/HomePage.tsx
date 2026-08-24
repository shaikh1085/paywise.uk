import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { TakeHomeCalculator } from '../components/calculators/TakeHomeCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { GradientBackground } from '../components/common/GradientBackground';
import { HOME_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { calculateTakeHomePay } from '../utils/calculations';
import {
  Briefcase,
  Clock,
  PiggyBank,
  GraduationCap,
  Percent,
  HeartPulse,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Home,
  Calculator,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // Dynamically compute salary benchmarks using the pure calculation engine
  const benchmarkGrossList = [30000, 40000, 50000, 60000, 80000, 100000];
  
  const quickSalaries = useMemo(() => {
    return benchmarkGrossList.map((gross) => {
      const res = calculateTakeHomePay({
        grossSalary: gross,
        payFrequency: 'annual',
        taxYear: '2025_26',
        region: 'england_ni',
        taxCode: '1257L',
        pensionPercentage: 5,
        pensionFixedAmount: 0,
        pensionType: 'auto_enrolment',
        employerPensionPercentage: 3,
        studentLoanPlan: 'none',
        bonus: 0,
        overtime: 0,
        otherTaxableIncome: 0,
        salarySacrificeMonthly: 0,
      });

      return {
        gross,
        monthlyNet: Math.round(res.netMonthly),
        annualNet: Math.round(res.netAnnual),
        tax: Math.round(res.incomeTaxAnnual),
        ni: Math.round(res.employeeNiAnnual),
      };
    });
  }, []);

  const tools = [
    {
      title: 'Take-Home Pay Calculator',
      description: 'Estimate net salary, Income Tax, National Insurance, pension deductions and student loans.',
      path: '/take-home-pay-calculator',
      icon: CheckCircle2,
      badge: 'Core Tool',
    },
    {
      title: 'Income Tax Calculator',
      description: 'Estimate UK Income Tax liability across England, Wales, Scotland and Northern Ireland with marginal tax bands.',
      path: '/income-tax-calculator',
      icon: Percent,
      badge: 'Tax Banding',
    },
    {
      title: 'National Insurance Calculator',
      description: 'Calculate Class 1, Class 2, and Class 4 National Insurance contributions under current 8% rates.',
      path: '/national-insurance-calculator',
      icon: Percent,
      badge: 'NICs',
    },
    {
      title: 'Mortgage Repayment Calculator',
      description: 'Calculate monthly repayment and interest-only mortgage payments, total interest, and full amortisation schedules.',
      path: '/mortgage-calculator',
      icon: Briefcase,
      badge: 'Mortgages',
    },
    {
      title: 'Stocks & Shares ISA Calculator',
      description: 'Project compound investment growth in UK ISAs with £20,000 annual allowance and tax-free returns.',
      path: '/isa-calculator',
      icon: PiggyBank,
      badge: 'Wealth & ISA',
    },
    {
      title: 'Day Rate to Salary Calculator',
      description: 'Convert daily contract rates into annual gross salary, net monthly take-home, and working day equivalents.',
      path: '/day-rate-to-salary-calculator',
      icon: Briefcase,
      badge: 'Contractors',
    },
    {
      title: 'Hourly Rate Calculator',
      description: 'Calculate annual pay, overtime multipliers, and monthly net wages from your hourly rate.',
      path: '/hourly-to-salary-calculator',
      icon: Clock,
      badge: 'Wage Earners',
    },
    {
      title: 'Pension Growth Forecast',
      description: 'Project your retirement pot at retirement age with employer contributions, tax relief, and compound returns.',
      path: '/pension-calculator',
      icon: PiggyBank,
      badge: 'Retirement',
    },
    {
      title: 'Salary Sacrifice Calculator',
      description: 'Calculate tax and National Insurance savings on electric vehicles, pensions, and cycle schemes.',
      path: '/salary-sacrifice-calculator',
      icon: Percent,
      badge: 'Tax Relief',
    },
    {
      title: 'NHS Salary Calculator',
      description: 'Band 2 to Band 9 pay scales, London High Cost Area Supplements (HCAS), and NHS pension tiers.',
      path: '/nhs-salary-calculator',
      icon: HeartPulse,
      badge: 'Healthcare',
    },
    {
      title: 'Teacher Salary Calculator',
      description: 'Teacher pay points (M1–M6, UPR, Leadership) across England and London weighting zones.',
      path: '/teacher-salary-calculator',
      icon: BookOpen,
      badge: 'Education',
    },
    {
      title: 'Stamp Duty Calculator (SDLT)',
      description: 'Calculate Stamp Duty for first-time buyers, home movers, and buy-to-let properties in England & NI.',
      path: '/stamp-duty-calculator',
      icon: Home,
      badge: 'Property SDLT',
    },
    {
      title: 'Mortgage Overpayment Calculator',
      description: 'See how regular or lump sum overpayments reduce your total mortgage interest and shorten your term.',
      path: '/mortgage-overpayment-calculator',
      icon: PiggyBank,
      badge: 'Mortgage Savings',
    },
    {
      title: 'Credit Card Repayment Calculator',
      description: 'Calculate time to become debt-free, compare fixed monthly payments against minimums, and see interest saved.',
      path: '/credit-card-repayment-calculator',
      icon: Calculator,
      badge: 'Debt Payoff',
    },
    {
      title: 'Inside IR35 Calculator',
      description: 'Estimate contract net pay, employer NI, apprenticeship levy, and umbrella margins for inside IR35 roles.',
      path: '/inside-ir35-calculator',
      icon: ShieldCheck,
      badge: 'Umbrella / IR35',
    },
  ];

  return (
    <div className="relative space-y-10 sm:space-y-14 pb-20 overflow-hidden">
      <GradientBackground />

      <SEO
        title="UK Take-Home Pay Calculator | PayWise UK"
        description="Calculate estimated UK take-home pay after Income Tax, National Insurance, pension and student loan deductions. Free salary calculator for 2025/26."
        keywords={[
          'UK take-home pay calculator',
          'salary calculator UK',
          'salary after tax UK',
          'UK tax calculator',
          'monthly take-home pay',
          'paye calculator uk',
          'income tax calculator UK',
          'National Insurance calculator',
        ]}
        canonicalPath="/"
        isCalculator={true}
        calculatorName="UK Take-Home Pay Calculator"
        calculatorDescription="Calculate estimated UK take-home pay after Income Tax, National Insurance, pension and student loan deductions. Free salary calculator for 2025/26."
        faqs={HOME_FAQS}
      />

      {/* Hero Header Section */}
      <section className="pt-4 sm:pt-8 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F5F5] leading-tight">
              UK Take-Home Pay Calculator
            </h1>
            
            <p className="text-sm sm:text-base text-[#525252] dark:text-[#A3A3A3] leading-relaxed max-w-2xl font-medium">
              Use this free UK take-home pay calculator to estimate monthly, weekly and annual net pay after Income Tax, National Insurance, pension contributions and student loan repayments.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Calculate your estimated take-home pay */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            Calculate your estimated take-home pay
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] mt-1">
            Enter your gross pay, choose your tax region, and configure your workplace pension and student loan plan for an instant payslip breakdown.
          </p>
        </div>
        <TakeHomeCalculator />
      </section>

      {/* Section: What your salary estimate includes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            What your salary estimate includes
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            In the UK, earnings processed through Pay As You Earn (PAYE) are subject to statutory deductions based on published HM Revenue & Customs (HMRC) tax schedules and Student Loans Company repayment thresholds:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                Personal Allowance
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
                Standard tax-free allowance of £12,570 (code 1257L), including the £100k taper where allowance reduces by £1 for every £2 of income.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                National Insurance
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
                Class 1 employee National Insurance at 8% between the Primary Threshold (£12,570) and Upper Earnings Limit (£50,270), and 2% thereafter.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                Workplace Pensions
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
                Support for auto-enrolment qualifying earnings, relief at source, net pay arrangements, and tax-efficient salary sacrifice.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                Student Loan Plans
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
                Exact deductions for Plan 1 (£26,065 threshold), Plan 2 (£27,295), Plan 4 Scotland (£32,745), Plan 5 (£25,000) and Postgraduate loans (£21,000).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Income Tax and National Insurance explained */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            Income Tax and National Insurance explained
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Your take-home pay is determined by marginal tax brackets. In England, Wales and Northern Ireland (rUK), taxable income above the Personal Allowance of £12,570 is taxed in three main bands. Scottish residents pay devolved Scottish Income Tax with six separate tax bands.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                England, Wales & Northern Ireland Tax Bands (2025/26)
              </h3>
              <ul className="space-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
                <li className="flex justify-between"><span>Personal Allowance (0%):</span> <strong className="text-[#111111] dark:text-[#F5F5F5]">£0 to £12,570</strong></li>
                <li className="flex justify-between"><span>Basic Rate (20%):</span> <strong className="text-[#111111] dark:text-[#F5F5F5]">£12,571 to £50,270</strong></li>
                <li className="flex justify-between"><span>Higher Rate (40%):</span> <strong className="text-[#111111] dark:text-[#F5F5F5]">£50,271 to £125,140</strong></li>
                <li className="flex justify-between"><span>Additional Rate (45%):</span> <strong className="text-[#111111] dark:text-[#F5F5F5]">Over £125,140</strong></li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                Employee Class 1 National Insurance Rates (2025/26)
              </h3>
              <ul className="space-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
                <li className="flex justify-between"><span>Below Primary Threshold (0%):</span> <strong className="text-[#111111] dark:text-[#F5F5F5]">£0 to £12,570</strong></li>
                <li className="flex justify-between"><span>Main Employee Rate (8%):</span> <strong className="text-[#111111] dark:text-[#F5F5F5]">£12,571 to £50,270</strong></li>
                <li className="flex justify-between"><span>Upper Earnings Rate (2%):</span> <strong className="text-[#111111] dark:text-[#F5F5F5]">Over £50,270</strong></li>
                <li className="flex justify-between"><span>Calculation frequency:</span> <strong className="text-[#111111] dark:text-[#F5F5F5]">Per pay period (non-cumulative)</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Pension and student loan deductions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            Pension and student loan deductions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                How Workplace Pensions Affect Take-Home Pay
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Most UK employees are automatically enrolled into a workplace pension scheme with a statutory minimum 5% employee contribution and 3% employer contribution on qualifying earnings (£6,240 to £50,000). Pension contributions benefit from tax relief at your marginal rate. Under salary sacrifice arrangements, you also save 8% or 2% National Insurance.
              </p>
              <div className="pt-2">
                <Link
                  to="/salary-sacrifice-calculator"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline"
                >
                  <span>Explore salary sacrifice savings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                How Student Loan Repayments are Deducted
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Student loan repayments are calculated on gross income exceeding your plan's statutory threshold. Undergraduate plans (Plan 1, Plan 2, Plan 4 Scotland, Plan 5) are deducted at 9% above the threshold. Postgraduate loans are deducted at 6% on income over £21,000. If you have both, deductions apply concurrently.
              </p>
              <div className="pt-2">
                <Link
                  to="/student-loan-repayment-calculator"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline"
                >
                  <span>Check your student loan repayment plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Salary Benchmarks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
                Popular UK Salary Benchmarks ({TAX_CONFIG_METADATA.currentTaxYearLabel})
              </h2>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-0.5">
                Estimated net monthly take-home pay based on standard 1257L tax code, England/Wales/NI tax bands, and 5% auto-enrolment pension.
              </p>
            </div>
            <Link
              to="/take-home-pay-calculator"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline shrink-0"
            >
              <span>Customise calculation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickSalaries.map((s) => (
              <Link
                key={s.gross}
                to={`/take-home-pay-calculator?salary=${s.gross}`}
                className="p-3.5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] hover:-translate-y-0.5 transition-all duration-150 group"
              >
                <span className="text-2xs uppercase tracking-wider text-[#737373] dark:text-[#888888] font-bold block">Gross Annual</span>
                <p className="text-sm sm:text-base font-black text-[#111111] dark:text-[#F5F5F5] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors tabular-nums">
                  £{(s.gross / 1000).toFixed(0)}k<span className="text-xs font-semibold text-[#737373] dark:text-[#888888]">/yr</span>
                </p>
                <div className="mt-2.5 pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <span className="text-2xs text-[#737373] dark:text-[#888888] block font-medium">Est. Net Monthly</span>
                  <span className="text-xs sm:text-sm font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                    £{s.monthlyNet.toLocaleString('en-GB')}<span className="text-2xs font-bold">/mo</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Salary Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/guides/50000-salary-after-tax-uk"
            className="p-5 rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] shadow-sm hover:border-[#059669] dark:hover:border-[#10B981] transition-all group flex items-center justify-between"
          >
            <div>
              <span className="text-2xs font-bold text-[#059669] dark:text-[#10B981] uppercase tracking-wider block">Detailed UK Salary Guide</span>
              <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] mt-1 group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                £50,000 Salary After Tax in the UK
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1">
                Full breakdown of monthly take-home pay, 20% basic rate tax band, National Insurance and pension deductions.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 ml-3 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/guides/60000-salary-after-tax-uk"
            className="p-5 rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] shadow-sm hover:border-[#059669] dark:hover:border-[#10B981] transition-all group flex items-center justify-between"
          >
            <div>
              <span className="text-2xs font-bold text-[#059669] dark:text-[#10B981] uppercase tracking-wider block">Detailed UK Salary Guide</span>
              <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] mt-1 group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                £60,000 Salary After Tax in the UK
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1">
                Higher-rate 40% tax bracket breakdown, child benefit charge, and pension salary sacrifice relief.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Section: Explore UK salary calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            Explore UK salary calculators
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3]">
            Every UK employment contract type and sector carries distinct statutory rules. Browse our dedicated calculators for exact estimates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="flex flex-col justify-between p-5 rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:border-[#059669] dark:hover:border-[#10B981] transition-all duration-150 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-[#F5F5F5] dark:bg-[#222222] text-[#059669] dark:text-[#10B981] flex items-center justify-center font-bold border border-[#E5E5E5] dark:border-[#2A2A2A]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-3xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#F5F5F5] dark:bg-[#222222] text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1.5 leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center text-xs font-bold text-[#059669] dark:text-[#10B981]">
                  <span>Launch calculator</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Section: Frequently asked questions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqAccordion items={HOME_FAQS} title="Frequently asked questions" />
      </div>

      {/* Site-wide Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerNotice />
      </div>
    </div>
  );
};

