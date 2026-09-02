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
  ExternalLink,
  Receipt,
  Building2,
  TrendingUp,
  Scale,
  Baby,
  Activity,
  Heart,
  HelpCircle,
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

  const calculatorTools = [
    {
      title: 'Take-Home Pay Calculator',
      description: 'Calculate net take-home pay after Income Tax, National Insurance, pension deductions, and student loans.',
      path: '/take-home-pay-calculator',
      icon: Calculator,
      badge: 'Core Salary Tool',
      category: 'Income & Salary',
    },
    {
      title: 'Income Tax Calculator',
      description: 'Calculate your exact UK Income Tax liability across England, Wales, Scotland, and Northern Ireland.',
      path: '/income-tax-calculator',
      icon: Percent,
      badge: 'Tax Banding',
      category: 'Income & Salary',
    },
    {
      title: 'National Insurance Calculator',
      description: 'Calculate Class 1, Class 2, and Class 4 National Insurance contributions under current 8% rates.',
      path: '/national-insurance-calculator',
      icon: Percent,
      badge: 'NICs',
      category: 'Income & Salary',
    },
    {
      title: 'Tax Code Calculator',
      description: 'Decode 1257L, BR, K, and emergency tax codes to see how your tax-free personal allowance is applied.',
      path: '/tax-code-calculator',
      icon: Receipt,
      badge: 'Tax Codes',
      category: 'Income & Salary',
    },
    {
      title: 'Employer National Insurance Calculator',
      description: 'Calculate secondary Class 1 NICs (15% rate above £5,000 threshold) and the £10,500 Employment Allowance.',
      path: '/employer-national-insurance-calculator',
      icon: Building2,
      badge: 'Employer Payroll',
      category: 'Income & Salary',
    },
    {
      title: 'Hourly to Salary Calculator',
      description: 'Convert your hourly wage into annual gross salary, weekly pay, and estimated net monthly earnings.',
      path: '/hourly-to-salary-calculator',
      icon: Clock,
      badge: 'Hourly Wages',
      category: 'Wages & Contracts',
    },
    {
      title: 'Day Rate to Salary Calculator',
      description: 'Convert daily contractor rates into equivalent annual gross salary, monthly take-home, and billable days.',
      path: '/day-rate-to-salary-calculator',
      icon: Briefcase,
      badge: 'Contractors',
      category: 'Wages & Contracts',
    },
    {
      title: 'Overtime Pay Calculator',
      description: 'Calculate after-tax earnings on standard overtime, time-and-a-half (1.5x), and double-time (2.0x).',
      path: '/overtime-pay-calculator',
      icon: Clock,
      badge: 'Overtime',
      category: 'Wages & Contracts',
    },
    {
      title: 'Net to Gross Salary Calculator',
      description: 'Determine the required gross annual salary needed to achieve your desired net take-home target.',
      path: '/net-to-gross-calculator',
      icon: Scale,
      badge: 'Target Salary',
      category: 'Income & Salary',
    },
    {
      title: 'Salary Sacrifice Calculator',
      description: 'Calculate tax and National Insurance savings on workplace pensions, electric vehicles, and cycle schemes.',
      path: '/salary-sacrifice-calculator',
      icon: Percent,
      badge: 'Tax Relief',
      category: 'Pensions & Deductions',
    },
    {
      title: 'Pension Growth Forecast',
      description: 'Project your retirement pot at retirement age with employer contributions, tax relief, and compound returns.',
      path: '/pension-calculator',
      icon: PiggyBank,
      badge: 'Retirement',
      category: 'Pensions & Deductions',
    },
    {
      title: 'Student Loan Repayment Calculator',
      description: 'Calculate monthly repayments across Plan 1, Plan 2, Plan 4 (Scotland), Plan 5, and Postgraduate loans.',
      path: '/student-loan-repayment-calculator',
      icon: GraduationCap,
      badge: 'Student Finance',
      category: 'Pensions & Deductions',
    },
    {
      title: 'Mortgage Repayment Calculator',
      description: 'Calculate monthly capital and interest repayment mortgage costs, total interest, and full amortisation schedules.',
      path: '/mortgage-calculator',
      icon: Home,
      badge: 'Mortgages',
      category: 'Property & Debt',
    },
    {
      title: 'Stamp Duty Calculator (SDLT)',
      description: 'Calculate Stamp Duty Land Tax for first-time buyers, home movers, and second homes / buy-to-let properties.',
      path: '/stamp-duty-calculator',
      icon: Home,
      badge: 'Property SDLT',
      category: 'Property & Debt',
    },
    {
      title: 'Mortgage Overpayment Calculator',
      description: 'See how regular or lump-sum overpayments reduce total mortgage interest and shorten your mortgage term.',
      path: '/mortgage-overpayment-calculator',
      icon: PiggyBank,
      badge: 'Mortgage Savings',
      category: 'Property & Debt',
    },
    {
      title: 'Credit Card Repayment Calculator',
      description: 'Calculate time to become debt-free, compare fixed monthly payments against minimums, and see interest saved.',
      path: '/credit-card-repayment-calculator',
      icon: Calculator,
      badge: 'Debt Payoff',
      category: 'Property & Debt',
    },
    {
      title: 'Stocks & Shares ISA Calculator',
      description: 'Project compound investment growth within the £20,000 annual UK ISA allowance with 100% tax-free returns.',
      path: '/isa-calculator',
      icon: PiggyBank,
      badge: 'Tax-Free ISA',
      category: 'Savings & Investments',
    },
    {
      title: 'Savings Interest & PSA Calculator',
      description: 'Calculate annual savings interest and check liabilities against your Personal Savings Allowance (PSA).',
      path: '/savings-calculator',
      icon: PiggyBank,
      badge: 'Savings Interest',
      category: 'Savings & Investments',
    },
    {
      title: 'Capital Gains Tax Calculator',
      description: 'Calculate CGT on residential property, shares, and assets using current 18% / 24% rates and £3,000 allowance.',
      path: '/capital-gains-tax-calculator',
      icon: TrendingUp,
      badge: 'Capital Gains',
      category: 'Savings & Investments',
    },
    {
      title: 'Dividend Tax Calculator',
      description: 'Calculate tax on UK company dividends utilizing the £500 dividend allowance across basic, higher, and additional rates.',
      path: '/dividend-tax-calculator',
      icon: Percent,
      badge: 'Dividends',
      category: 'Savings & Investments',
    },
    {
      title: 'VAT Calculator UK',
      description: 'Add or remove 20% standard VAT, 5% reduced rate, or 0% zero-rated VAT from any gross or net amount.',
      path: '/vat-calculator',
      icon: Receipt,
      badge: 'VAT Rates',
      category: 'Business & Tax',
    },
    {
      title: 'Self-Employed Tax Calculator',
      description: 'Estimate Income Tax, Class 2, and Class 4 National Insurance liabilities for UK sole traders and freelancers.',
      path: '/self-employed-tax-calculator',
      icon: Briefcase,
      badge: 'Sole Traders',
      category: 'Business & Tax',
    },
    {
      title: 'Inside IR35 Calculator',
      description: 'Estimate contract net pay, employer NI, apprenticeship levy, and umbrella margins for inside IR35 roles.',
      path: '/inside-ir35-calculator',
      icon: ShieldCheck,
      badge: 'Umbrella / IR35',
      category: 'Business & Tax',
    },
    {
      title: 'NHS Salary Calculator',
      description: 'Calculate Agenda for Change Band 2 to Band 9 pay scales, London HCAS weighting, and NHS pension tiers.',
      path: '/nhs-salary-calculator',
      icon: HeartPulse,
      badge: 'NHS Agenda for Change',
      category: 'Public Sector',
    },
  ];

  const govResources = [
    {
      title: 'GOV.UK: Income Tax Rates & Allowances',
      description: 'Official statutory personal allowances, basic, higher, and additional tax rates from HM Revenue & Customs.',
      url: 'https://www.gov.uk/income-tax-rates',
    },
    {
      title: 'GOV.UK: National Insurance Rates & Categories',
      description: 'Official government guidance on Class 1 employee and employer National Insurance contribution thresholds.',
      url: 'https://www.gov.uk/national-insurance-rates-letters',
    },
    {
      title: 'GOV.UK: Repaying Your Student Loan',
      description: 'Statutory repayment thresholds, interest rates, and loan plan rules from the Student Loans Company.',
      url: 'https://www.gov.uk/repaying-your-student-loan',
    },
    {
      title: 'GOV.UK: Workplace Pensions & Auto-Enrolment',
      description: 'Statutory guidance on minimum pension contributions (5% employee / 3% employer) and qualifying earnings.',
      url: 'https://www.gov.uk/workplace-pensions',
    },
    {
      title: 'GOV.UK: Stamp Duty Land Tax (SDLT)',
      description: 'Official HMRC guidance on residential property purchase thresholds, first-time buyer relief, and surcharges.',
      url: 'https://www.gov.uk/stamp-duty-land-tax',
    },
    {
      title: 'GOV.UK: Value Added Tax (VAT)',
      description: 'Official HM Revenue & Customs guidance on UK standard 20%, reduced 5%, and zero-rated VAT rules.',
      url: 'https://www.gov.uk/vat-rates',
    },
  ];

  return (
    <div className="relative space-y-10 sm:space-y-14 pb-20 overflow-hidden">
      <GradientBackground />

      <SEO
        title="UK Salary & Take-Home Pay Calculator (2025/2026)"
        description="Calculate estimated UK take-home pay after Income Tax, National Insurance, pension and student loan deductions. Free salary calculator for 2025/26."
        keywords={[
          'UK salary calculator',
          'UK take-home pay calculator',
          'salary after tax UK',
          'take-home pay calculator',
          'UK tax calculator',
          'monthly take-home pay',
          'paye calculator uk',
          'income tax calculator UK',
          'National Insurance calculator',
        ]}
        canonicalPath="/"
        isCalculator={true}
        calculatorName="UK Salary & Take-Home Pay Calculator"
        calculatorDescription="Calculate estimated UK take-home pay after Income Tax, National Insurance, pension and student loan deductions. Free salary calculator for 2025/26."
        faqs={HOME_FAQS}
      />

      {/* 1. HOMEPAGE H1: Hero Header Section */}
      <section className="pt-4 sm:pt-8 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
            </div>
            
            {/* EXACT SINGLE H1 ELEMENT ON HOMEPAGE */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F5F5] leading-tight">
              UK Salary &amp; Take-Home Pay Calculator
            </h1>
            
            <p className="text-sm sm:text-base text-[#525252] dark:text-[#A3A3A3] leading-relaxed max-w-2xl font-medium">
              Use our free UK salary and take-home pay calculator to estimate your exact monthly, weekly, and annual net pay after statutory deductions. Factor in current Income Tax rates, 8% National Insurance, auto-enrolment workplace pensions, and student loan repayment plans.
            </p>
          </div>
        </div>
      </section>

      {/* 2. H2: Calculate Your UK Take-Home Pay */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            Calculate Your UK Take-Home Pay
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] mt-1">
            Enter your gross salary, choose your tax region (England/Wales/NI or Scotland), and customize your pension contribution or student loan plan for an instant payslip calculation.
          </p>
        </div>
        <TakeHomeCalculator />
      </section>

      {/* 3. H2: How the UK Salary Calculator Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            How the UK Salary Calculator Works
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Our calculation engine processes your earnings through the official Pay As You Earn (PAYE) framework established by HM Revenue &amp; Customs (HMRC). The calculation follows a strict four-step statutory sequence:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-2xs font-bold shrink-0">1</span>
                Gross Pay &amp; Region
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Your contractual annual, monthly, or hourly earnings form the baseline. If you earn wages on an irregular schedule, you can use our <Link to="/hourly-to-salary-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Hourly Rate Calculator</Link> or <Link to="/day-rate-to-salary-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Day Rate Calculator</Link>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-2xs font-bold shrink-0">2</span>
                Tax-Free Allowance
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                The standard UK Personal Allowance of £12,570 (tax code 1257L) is deducted before applying income tax. Check tax code rules with our <Link to="/tax-code-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Tax Code Calculator</Link>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-2xs font-bold shrink-0">3</span>
                Tax &amp; National Insurance
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Marginal tax bands (20%, 40%, 45%) and 8% Class 1 National Insurance are applied. Explore full tax band breakdowns using our <Link to="/income-tax-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Income Tax Calculator</Link> and <Link to="/national-insurance-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">National Insurance Calculator</Link>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-2xs font-bold shrink-0">4</span>
                Pensions &amp; Student Loans
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Workplace pension deductions and student loan repayments are applied, arriving at your true net take-home pay. See our <Link to="/pension-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Pension Calculator</Link> and <Link to="/student-loan-repayment-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Student Loan Calculator</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. H2: What Is Included in Your Take-Home Pay? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            What Is Included in Your Take-Home Pay?
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Understanding the difference between gross pay and take-home pay is vital for personal budgeting, evaluating job offers, and planning mortgage affordability. In the UK, your payslip itemises several statutory and voluntary deductions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                Gross Pay vs Take-Home Net Pay
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                <strong>Gross pay</strong> is your total agreed salary before any deductions are made. <strong>Take-home pay (net pay)</strong> is the actual amount paid directly into your bank account. If you want to calculate the reverse — the gross salary needed to reach a specific net monthly budget — use our <Link to="/net-to-gross-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Net to Gross Calculator</Link>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                Personal Allowance (Tax Code 1257L)
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Most UK employees receive a tax-free Personal Allowance of £12,570 per year. For income exceeding £100,000, this allowance tapers down by £1 for every £2 earned, disappearing completely at £125,140. Check your specific code on our <Link to="/tax-code-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Tax Code Calculator</Link>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                Employee Class 1 National Insurance
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Employees pay 8% National Insurance on annual earnings between the Primary Threshold (£12,570) and Upper Earnings Limit (£50,270), and 2% on earnings above £50,270. Calculate your exact NI contributions with our <Link to="/national-insurance-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">National Insurance Calculator</Link>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                Workplace Pensions &amp; Student Loans
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Under UK auto-enrolment, employees typically contribute 5% of qualifying earnings to a workplace pension, which qualifies for tax relief. Undergraduates repay 9% of income above statutory thresholds. See our <Link to="/salary-sacrifice-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Salary Sacrifice Calculator</Link> to see how pension contributions reduce tax.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. H2: UK Income Tax and National Insurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            UK Income Tax and National Insurance
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Your take-home pay is determined by progressive marginal tax brackets. In England, Wales, and Northern Ireland, taxable income above the Personal Allowance of £12,570 is taxed across three primary bands. Scotland operates six separate devolved tax bands. If you want to calculate your income tax separately, use our dedicated <Link to="/income-tax-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Income Tax Calculator</Link>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                England, Wales &amp; Northern Ireland Tax Bands (2025/26)
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
                <li className="flex justify-between"><span>Employer Secondary NI (15%):</span> <strong className="text-[#111111] dark:text-[#F5F5F5]">Over £5,000 threshold</strong></li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F5F5] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-xs sm:text-sm text-[#111111] dark:text-[#F5F5F5]">
              The £100,000 Personal Allowance Taper (60% Effective Tax Trap)
            </h3>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              When your adjusted net income surpasses £100,000, your £12,570 Personal Allowance is reduced by £1 for every £2 of income above £100,000. This creates an effective 60% marginal income tax rate (62% when adding 2% National Insurance) on earnings between £100,000 and £125,140. Increasing pension contributions via <Link to="/salary-sacrifice-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">salary sacrifice</Link> can help restore this allowance.
            </p>
          </div>
        </div>
      </section>

      {/* 6. H2: Pension and Student Loan Deductions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            Pension and Student Loan Deductions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                How Workplace Pensions Affect Take-Home Pay
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Most UK employees are automatically enrolled into a workplace pension scheme with a statutory minimum 5% employee contribution and 3% employer contribution on qualifying earnings (£6,240 to £50,000). Pension contributions benefit from tax relief at your marginal rate. Under salary sacrifice arrangements, you also save 8% or 2% National Insurance. Forecast your long-term retirement pot using our <Link to="/pension-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Pension Growth Calculator</Link>.
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
                Student loan repayments are calculated on gross income exceeding your plan's statutory threshold. Undergraduate plans (Plan 1: £26,065, Plan 2: £27,295, Plan 4 Scotland: £32,745, Plan 5: £25,000) are deducted at 9% above the threshold. Postgraduate loans are deducted at 6% on income over £21,000. Calculate your monthly repayment schedule on our <Link to="/student-loan-repayment-calculator" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">Student Loan Repayment Calculator</Link>.
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

      {/* 7. H2: Popular UK Salary Benchmarks */}
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

      {/* 8. H2: Featured Salary Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            Featured UK Salary Guides
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] mt-0.5">
            In-depth tax analyses, take-home breakdowns, and take-home benchmarks across common UK salary thresholds.
          </p>
        </div>
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
                Full breakdown of monthly take-home pay, 20% basic rate tax band, National Insurance, and workplace pension deductions.
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
                Higher-rate 40% tax bracket breakdown, child benefit charge impact, and pension salary sacrifice tax relief.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 9. H2: Salary Calculators and Tools (CRITICAL FOR INTERNAL LINKING SCORE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            Salary Calculators and Tools
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3]">
            Browse our full suite of precision UK financial calculators covering employment taxes, mortgages, property purchase, pensions, and debt reduction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculatorTools.map((tool) => {
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

        {/* View Hub CTA Button */}
        <div className="mt-6 text-center">
          <Link
            to="/salary-calculators"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] dark:bg-[#171717] text-white dark:text-[#F5F5F5] font-bold text-xs hover:bg-[#059669] dark:hover:bg-[#10B981] border border-[#E5E5E5] dark:border-[#2A2A2A] transition-colors shadow-sm"
          >
            <span>View All 30+ UK Tax &amp; Payroll Calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 10. H2: Useful UK Tax Resources (EXTERNAL AUTHORITATIVE SOURCES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
              Useful UK Tax Resources
            </h2>
            <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] mt-1">
              For official statutory rates, personal tax accounts, and legislative guidelines, consult these authoritative government sources:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {govResources.map((res) => (
              <a
                key={res.url}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[#059669] dark:text-[#10B981] mb-1.5">
                    <span className="text-3xs uppercase font-bold tracking-wider">Official GOV.UK</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F5F5] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1 leading-relaxed">
                    {res.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11. H2: Frequently Asked Questions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqAccordion items={HOME_FAQS} title="Frequently Asked Questions" />
      </div>

      {/* Site-wide Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerNotice />
      </div>
    </div>
  );
};


