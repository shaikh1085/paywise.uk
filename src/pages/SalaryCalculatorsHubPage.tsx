import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { GradientBackground } from '../components/common/GradientBackground';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import {
  Calculator,
  Briefcase,
  Clock,
  PiggyBank,
  GraduationCap,
  Percent,
  HeartPulse,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building2,
  Receipt,
  TrendingUp,
  Gift,
  Home,
  Scale,
  ArrowUpDown,
  Baby,
  Heart,
  Activity,
  Search,
  X,
  SlidersHorizontal,
} from 'lucide-react';

interface HubCalculatorItem {
  title: string;
  description: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  category: 'income' | 'property' | 'savings' | 'business' | 'statutory';
  keywords: string[];
}

export const SalaryCalculatorsHubPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Salary Calculators Hub', path: '/salary-calculators' },
  ];

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        // Prevent default only if not in an input/textarea
        if (!['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)) {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const calculators: HubCalculatorItem[] = useMemo(() => [
    {
      title: 'Income Tax Calculator',
      description: 'Estimate UK Income Tax liability across England, Wales, Scotland and Northern Ireland with taxable allowances and tapered personal allowance.',
      path: '/income-tax-calculator',
      icon: Calculator,
      badge: 'Tax Banding',
      category: 'income',
      keywords: ['paye', 'income tax', 'allowance', 'bands', 'scotland', 'rdr', 'hmrc', 'taxable income'],
    },
    {
      title: 'National Insurance Calculator',
      description: 'Calculate Class 1, Class 2, and Class 4 National Insurance contributions for employees and self-employed sole traders under 8% rates.',
      path: '/national-insurance-calculator',
      icon: Percent,
      badge: 'NICs',
      category: 'income',
      keywords: ['national insurance', 'nics', 'class 1', 'class 2', 'class 4', 'contributions', '8 percent'],
    },
    {
      title: 'Tax Code Calculator & Explainer',
      description: 'Decode 1257L, BR, K codes, OT, and Scottish S prefix codes to understand tax-free allowances and emergency tax deductions.',
      path: '/tax-code-calculator',
      icon: Calculator,
      badge: 'HMRC Codes',
      category: 'income',
      keywords: ['tax code', '1257l', 'br code', 'emergency tax', 'k code', 'ot code', 'payslip'],
    },
    {
      title: 'Employer National Insurance Calculator',
      description: 'Calculate total cost of employment, secondary Class 1 NICs (15% rate above £5,000 threshold), and the £10,500 Employment Allowance.',
      path: '/employer-national-insurance-calculator',
      icon: Building2,
      badge: 'Employer Cost',
      category: 'business',
      keywords: ['employer ni', 'secondary nic', 'cost of employment', 'employment allowance', '15 percent', 'hiring cost'],
    },
    {
      title: 'Dividend Tax Calculator',
      description: 'Calculate dividend tax on UK company shares and director distributions with the £500 allowance and 8.75% / 33.75% / 39.35% rates.',
      path: '/dividend-tax-calculator',
      icon: TrendingUp,
      badge: 'Dividends',
      category: 'savings',
      keywords: ['dividends', 'director', 'limited company', 'dividend allowance', 'basic rate dividend', 'higher rate dividend'],
    },
    {
      title: 'Mortgage Repayment Calculator',
      description: 'Calculate monthly repayment and interest-only mortgage payments, total interest over term, and amortisation schedules.',
      path: '/mortgage-calculator',
      icon: Home,
      badge: 'Mortgages',
      category: 'property',
      keywords: ['mortgage', 'monthly payment', 'home loan', 'interest only', 'repayment', 'amortisation', 'property'],
    },
    {
      title: 'Mortgage Affordability Calculator',
      description: 'Estimate maximum UK home loan borrowing limits based on household income, loan-to-income (4.5x LTI) caps, and credit commitments.',
      path: '/mortgage-affordability-calculator',
      icon: Home,
      badge: 'Borrowing Power',
      category: 'property',
      keywords: ['mortgage affordability', 'lti', 'borrowing limit', 'how much can i borrow', 'home loan', 'salary multiplier'],
    },
    {
      title: 'Stamp Duty Calculator UK (SDLT)',
      description: 'Calculate Stamp Duty Land Tax for first-time buyers, standard home movers, and additional property / buy-to-let purchasers.',
      path: '/stamp-duty-calculator',
      icon: Home,
      badge: 'Property SDLT',
      category: 'property',
      keywords: ['stamp duty', 'sdlt', 'property tax', 'first time buyer', 'home purchase', 'additional property', 'surcharge'],
    },
    {
      title: 'Mortgage Overpayment Calculator',
      description: 'See how regular or lump sum mortgage overpayments reduce total interest paid and shorten your loan term by years.',
      path: '/mortgage-overpayment-calculator',
      icon: PiggyBank,
      badge: 'Mortgage Savings',
      category: 'property',
      keywords: ['overpayment', 'mortgage overpayment', 'pay off early', 'interest savings', 'lump sum'],
    },
    {
      title: 'Credit Card Repayment Calculator',
      description: 'Calculate time to become debt-free, compare fixed monthly payments against minimum payments, and calculate interest saved.',
      path: '/credit-card-repayment-calculator',
      icon: Calculator,
      badge: 'Debt Payoff',
      category: 'savings',
      keywords: ['credit card', 'debt', 'debt free', 'minimum payment', 'apr', 'interest charges', 'repay card'],
    },
    {
      title: 'Stocks & Shares ISA Calculator',
      description: 'Project compound investment growth in UK ISAs with £20,000 annual allowance, regular contributions, and tax-free dividends.',
      path: '/isa-calculator',
      icon: TrendingUp,
      badge: 'ISA Wealth',
      category: 'savings',
      keywords: ['isa', 'stocks and shares', 'compound growth', 'allowance', 'tax free investing', 'etf', 'index fund'],
    },
    {
      title: 'Savings Interest & PSA Calculator',
      description: 'Model interest compounding on savings deposits and evaluate tax liabilities exceeding your Personal Savings Allowance.',
      path: '/savings-calculator',
      icon: PiggyBank,
      badge: 'Savings',
      category: 'savings',
      keywords: ['savings', 'interest', 'psa', 'personal savings allowance', 'compound interest', 'high yield savings'],
    },
    {
      title: 'Capital Gains Tax Calculator',
      description: 'Calculate CGT on shares, cryptocurrency, and residential property sales with £3,000 allowance and 18% / 24% tax rates.',
      path: '/capital-gains-tax-calculator',
      icon: Scale,
      badge: 'Capital Gains',
      category: 'savings',
      keywords: ['cgt', 'capital gains', 'shares', 'crypto', 'property gain', 'annual exempt amount', '3000 allowance'],
    },
    {
      title: 'Take-Home Pay Calculator',
      description: 'Calculate net pay after Income Tax, 8% Class 1 National Insurance, pension contributions, and student loan deductions.',
      path: '/take-home-pay-calculator',
      icon: Calculator,
      badge: 'Core Tool',
      category: 'income',
      keywords: ['take home pay', 'net salary', 'payslip', 'wage', 'after tax', 'paycheck', 'salary calculator'],
    },
    {
      title: 'Salary Comparison Calculator',
      description: 'Compare multiple UK job offers and salary brackets side-by-side. View net take-home differences and marginal retention rates.',
      path: '/salary-comparison-calculator',
      icon: Scale,
      badge: 'Job Offers',
      category: 'income',
      keywords: ['salary comparison', 'compare jobs', 'job offers', 'pay rise diff', 'retention rate'],
    },
    {
      title: 'Pay Frequency Converter',
      description: 'Convert between Annual, Monthly, 4-Weekly, Fortnightly, Weekly, Daily, and Hourly wages with complete tax breakdowns.',
      path: '/pay-frequency-converter',
      icon: Clock,
      badge: 'Payroll Rates',
      category: 'income',
      keywords: ['pay frequency', 'weekly to annual', 'monthly to hourly', 'wages conversion', 'fortnightly', '4-weekly'],
    },
    {
      title: 'Day Rate to Salary Calculator',
      description: 'Convert contractor day rates into annual gross salary, net monthly take-home, and working day equivalents.',
      path: '/day-rate-to-salary-calculator',
      icon: Briefcase,
      badge: 'Contractors',
      category: 'business',
      keywords: ['day rate', 'contractor', 'freelancer', 'annual equivalent', 'working days', 'consultant'],
    },
    {
      title: 'Hourly to Salary Calculator',
      description: 'Convert hourly wages into gross annual pay, monthly take-home, and overtime earnings multipliers.',
      path: '/hourly-to-salary-calculator',
      icon: Clock,
      badge: 'Hourly Pay',
      category: 'income',
      keywords: ['hourly wage', 'hourly to salary', 'per hour', 'hours per week', 'shift work'],
    },
    {
      title: 'Pension Calculator',
      description: 'Forecast pension pot accumulation, compound growth, employer contributions, tax relief, and safe drawdown.',
      path: '/pension-calculator',
      icon: PiggyBank,
      badge: 'Retirement',
      category: 'savings',
      keywords: ['pension', 'retirement', 'annuity', 'drawdown', 'tax relief', 'sipp', 'auto enrolment', 'nest'],
    },
    {
      title: 'Student Loan Repayment Calculator',
      description: 'Compare monthly deduction thresholds for Plan 1, Plan 2, Plan 4 (Scotland), Plan 5, and Postgraduate loans.',
      path: '/student-loan-repayment-calculator',
      icon: GraduationCap,
      badge: 'Graduates',
      category: 'statutory',
      keywords: ['student loan', 'plan 1', 'plan 2', 'plan 4', 'plan 5', 'postgraduate loan', 'slc repayment'],
    },
    {
      title: 'Salary Sacrifice Calculator',
      description: 'Model tax and National Insurance savings from electric vehicle leases, cycle to work schemes, and pension top-ups.',
      path: '/salary-sacrifice-calculator',
      icon: Percent,
      badge: 'Tax Relief',
      category: 'income',
      keywords: ['salary sacrifice', 'ev car', 'cycle to work', 'pension sacrifice', 'national insurance savings'],
    },
    {
      title: 'Overtime Pay Calculator',
      description: 'Calculate net marginal earnings on extra hours worked at 1.5x (time and a half) or 2.0x (double time).',
      path: '/overtime-pay-calculator',
      icon: Clock,
      badge: 'Extra Hours',
      category: 'income',
      keywords: ['overtime', 'time and a half', 'double time', 'extra hours', 'shift premium', 'marginal tax'],
    },
    {
      title: 'NHS Salary Calculator',
      description: 'Agenda for Change (AfC) Bands 2 to 9, London High Cost Area Supplements (HCAS), and NHS Pension tiers.',
      path: '/nhs-salary-calculator',
      icon: HeartPulse,
      badge: 'Healthcare',
      category: 'statutory',
      keywords: ['nhs', 'agenda for change', 'afc band', 'nurse salary', 'doctor pay', 'hcas london', 'nhs pension'],
    },
    {
      title: 'Teacher Salary Calculator',
      description: 'Main (M1–M6), Upper (U1–U3), and Leadership pay ranges with Teachers’ Pension Scheme (TPS) tiers.',
      path: '/teacher-salary-calculator',
      icon: BookOpen,
      badge: 'Education',
      category: 'statutory',
      keywords: ['teacher salary', 'tps', 'm1', 'm6', 'u1', 'u3', 'school teacher', 'inner london teacher'],
    },
    {
      title: 'Inside IR35 Calculator',
      description: 'Calculate contractor retention after 15% Employer NI, Apprenticeship Levy (0.5%), and umbrella fees.',
      path: '/inside-ir35-calculator',
      icon: ShieldCheck,
      badge: 'Off-Payroll',
      category: 'business',
      keywords: ['inside ir35', 'off payroll', 'deemed payment', 'umbrella deductions', 'apprenticeship levy'],
    },
    {
      title: 'Inside vs Outside IR35 Calculator',
      description: 'Compare contractor take-home pay between an outside IR35 Ltd company vs inside IR35 deemed employment side-by-side.',
      path: '/inside-vs-outside-ir35-calculator',
      icon: Scale,
      badge: 'IR35 Compare',
      category: 'business',
      keywords: ['inside vs outside ir35', 'limited company vs umbrella', 'contractor compare', 'corporation tax'],
    },
    {
      title: 'Umbrella Company Calculator',
      description: 'Transparent gross invoice retention breakdown with provider margins and statutory payroll costs.',
      path: '/umbrella-company-calculator',
      icon: Building2,
      badge: 'Umbrella Pay',
      category: 'business',
      keywords: ['umbrella company', 'umbrella payslip', 'margin', 'gross to net contractor', 'holiday pay'],
    },
    {
      title: 'Self-Employed Tax Calculator',
      description: 'Calculate Income Tax, Class 2 & Class 4 National Insurance, and Payments on Account for UK sole traders and freelancers.',
      path: '/self-employed-tax-calculator',
      icon: Receipt,
      badge: 'Sole Traders',
      category: 'business',
      keywords: ['self employed', 'sole trader', 'payments on account', 'freelancer', 'sa100', 'tax return'],
    },
    {
      title: 'Pay Rise Calculator',
      description: 'Model your salary increase or percentage pay rise to see exact net extra take-home pay, new tax bands, and marginal rates.',
      path: '/pay-rise-calculator',
      icon: TrendingUp,
      badge: 'Salary Increase',
      category: 'income',
      keywords: ['pay rise', 'raise', 'salary increase', 'net difference', 'promotion', 'marginal tax rate'],
    },
    {
      title: 'Bonus Tax Calculator',
      description: 'Calculate Income Tax, National Insurance, and take-home pay on your work bonus, with bonus sacrifice pension comparison.',
      path: '/bonus-tax-calculator',
      icon: Gift,
      badge: 'Bonus Pay',
      category: 'income',
      keywords: ['bonus tax', 'bonus sacrifice', 'annual bonus', 'net bonus', 'higher rate bonus'],
    },
    {
      title: 'Redundancy Pay Calculator',
      description: 'Calculate statutory redundancy pay based on age, service years, and weekly pay, plus tax liability under the £30,000 exemption.',
      path: '/redundancy-pay-calculator',
      icon: Briefcase,
      badge: 'Redundancy',
      category: 'statutory',
      keywords: ['redundancy', 'statutory redundancy', '30000 tax free', 'severance', 'years of service'],
    },
    {
      title: 'Council Tax Calculator',
      description: 'Estimate annual and monthly council tax charges across property bands A–H, regional averages, and single-occupant 25% discounts.',
      path: '/council-tax-calculator',
      icon: Home,
      badge: 'Local Tax',
      category: 'property',
      keywords: ['council tax', 'band a', 'band d', 'band h', 'single person discount', 'local council'],
    },
    {
      title: 'Net to Gross Salary Calculator',
      description: 'Calculate the required gross annual salary to achieve your target monthly or annual net take-home pay after tax.',
      path: '/net-to-gross-calculator',
      icon: ArrowUpDown,
      badge: 'Reverse PAYE',
      category: 'income',
      keywords: ['net to gross', 'reverse paye', 'desired take home', 'target salary', 'how much gross needed'],
    },
    {
      title: 'National Minimum Wage Checker',
      description: 'Check if you are being paid at least the UK statutory National Minimum Wage or National Living Wage for your age and hours.',
      path: '/national-minimum-wage-checker',
      icon: ShieldCheck,
      badge: 'Statutory Pay',
      category: 'statutory',
      keywords: ['minimum wage', 'living wage', 'nlw', 'nmw', 'statutory rate', 'underpaid', 'apprentice wage'],
    },
    {
      title: 'Maternity Pay Calculator',
      description: 'Calculate Statutory Maternity Pay (SMP), Paternity (SPP), Adoption, and Shared Parental Pay with a week-by-week timeline.',
      path: '/maternity-pay-calculator',
      icon: Baby,
      badge: 'Family & Leave',
      category: 'statutory',
      keywords: ['maternity pay', 'smp', 'paternity pay', 'spp', 'adoption pay', 'shared parental', 'parental leave'],
    },
    {
      title: 'Child Benefit Calculator',
      description: 'Calculate UK Child Benefit entitlement and High Income Child Benefit Charge (HICBC) clawback for earners over £60,000.',
      path: '/child-benefit-calculator',
      icon: Heart,
      badge: 'Family Benefits',
      category: 'statutory',
      keywords: ['child benefit', 'hicbc', 'high income child benefit', '60000 threshold', 'child allowance', 'family benefit'],
    },
    {
      title: 'Statutory Sick Pay Calculator',
      description: 'Calculate Statutory Sick Pay (SSP) entitlement, Lower Earnings Limit eligibility, and unpaid waiting days when off work sick.',
      path: '/statutory-sick-pay-calculator',
      icon: Activity,
      badge: 'Statutory Pay',
      category: 'statutory',
      keywords: ['sick pay', 'ssp', 'waiting days', 'off work sick', 'illness pay', 'statutory leave'],
    },
    {
      title: 'Marriage Allowance Calculator',
      description: 'Check eligibility to transfer £1,260 of Personal Allowance between spouses and calculate your £252/year household tax savings.',
      path: '/marriage-allowance-calculator',
      icon: Heart,
      badge: 'Family Tax',
      category: 'statutory',
      keywords: ['marriage allowance', 'spouse transfer', 'personal allowance transfer', '252 saving', 'married couple tax'],
    },
    {
      title: 'Second Job Tax Calculator',
      description: 'Calculate UK Income Tax, BR tax codes, and combined take-home pay when working two jobs or multiple PAYE employments.',
      path: '/second-job-tax-calculator',
      icon: Briefcase,
      badge: 'Dual Income',
      category: 'income',
      keywords: ['second job', 'two jobs', 'br code', 'dual employment', 'multiple payslips', 'side hustle tax'],
    },
    {
      title: 'VAT Calculator UK',
      description: 'Add or remove UK standard (20%), reduced (5%), and zero (0%) Value Added Tax to prices with full net/gross breakdowns.',
      path: '/vat-calculator',
      icon: Receipt,
      badge: 'Business Tax',
      category: 'business',
      keywords: ['vat', 'value added tax', '20 percent vat', 'add vat', 'remove vat', 'vat inclusive', 'vat exclusive'],
    },
  ], []);

  const categories = [
    { id: 'all', label: 'All Calculators', count: calculators.length },
    { id: 'income', label: 'Income & Pay', count: calculators.filter((c) => c.category === 'income').length },
    { id: 'property', label: 'Property & Mortgages', count: calculators.filter((c) => c.category === 'property').length },
    { id: 'savings', label: 'Savings & Investing', count: calculators.filter((c) => c.category === 'savings').length },
    { id: 'business', label: 'Contractor & Business', count: calculators.filter((c) => c.category === 'business').length },
    { id: 'statutory', label: 'Family & Statutory', count: calculators.filter((c) => c.category === 'statutory').length },
  ];

  // Filter calculators by search query and category
  const filteredCalculators = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return calculators.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // Query filter
      if (!query) return true;

      const titleMatch = tool.title.toLowerCase().includes(query);
      const descMatch = tool.description.toLowerCase().includes(query);
      const badgeMatch = tool.badge.toLowerCase().includes(query);
      const keywordMatch = tool.keywords.some((kw) => kw.toLowerCase().includes(query));

      return titleMatch || descMatch || badgeMatch || keywordMatch;
    });
  }, [calculators, searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    searchInputRef.current?.focus();
  };

  const hubFaqs = [
    {
      question: 'How do I choose the right UK salary calculator?',
      answer: 'If you are an employed worker receiving a standard PAYE payslip, use the Take-Home Pay Calculator. If you are paid an hourly rate or work variable shifts, use the Hourly to Salary Calculator. If you work as an agency worker or contractor, select the Day Rate, Inside IR35, or Umbrella Company Calculator depending on your contract structure.',
    },
    {
      question: 'Are all calculators updated for the current UK tax year?',
      answer: `Yes. All calculation engines across PayWise UK reflect statutory rates and thresholds for the ${TAX_CONFIG_METADATA.currentTaxYearLabel} UK tax year, including the 8% employee NI rate and latest student loan thresholds.`,
    },
    {
      question: 'Can I use these calculators if I live in Scotland?',
      answer: 'Yes. All our tax and salary tools support Scottish Devolved Income Tax bands (Starter 19%, Basic 20%, Intermediate 21%, Higher 42%, Advanced 45%, and Top 48%) as well as Plan 4 student loan thresholds.',
    },
  ];

  return (
    <div className="relative space-y-10 sm:space-y-12 pb-20 overflow-hidden">
      <GradientBackground />

      <SEO
        title="UK Salary Calculators Hub | PayWise UK"
        description="Explore free UK salary calculators for take-home pay, day rates, hourly wages, pensions, student loans, salary sacrifice, NHS and teacher pay."
        keywords={[
          'UK salary calculators',
          'uk wage calculators',
          'take home pay tools',
          'tax calculators uk',
          'paye payroll tools',
          'financial calculator directory',
        ]}
        canonicalPath="/salary-calculators"
        breadcrumbs={breadcrumbs}
      />

      {/* Header */}
      <section className="pt-6 sm:pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-4 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
            Complete UK Payroll & Tax Suite ({TAX_CONFIG_METADATA.currentTaxYearLabel})
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            UK Salary Calculators Hub
          </h1>
          <p className="text-sm sm:text-base text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Search and filter 30+ specialised UK financial tools to calculate net take-home pay, tax deductions, mortgages, pensions, statutory leaves, and contractor retention.
          </p>
        </div>
      </section>

      {/* Search & Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Calculator Search and Filters">
        <div className="p-4 sm:p-5 rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-4">
          {/* Search Input Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737373] dark:text-[#A3A3A3]">
              <Search className="w-5 h-5" aria-hidden="true" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search calculators by name, topic or keyword (e.g. 'mortgage', 'tax code', 'stamp duty', 'pension', 'bonus')..."
              className="w-full pl-10 pr-24 py-3 text-sm rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#121212] text-[#111111] dark:text-[#F5F5F5] placeholder-[#737373] dark:placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-[#059669] dark:focus:ring-[#10B981] focus:border-transparent transition-all"
              aria-label="Search calculators"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search input"
                  className="p-1 rounded-md text-[#737373] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-2xs font-semibold text-[#737373] dark:text-[#A3A3A3] bg-[#E5E5E5] dark:bg-[#262626] border border-[#D4D4D4] dark:border-[#333333] rounded">
                /
              </kbd>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="flex items-center gap-1 text-2xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] mr-1 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#059669] text-white shadow-xs'
                      : 'bg-[#F5F5F5] dark:bg-[#222222] text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2A]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-2xs px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-[#E5E5E5] dark:bg-[#2E2E2E] text-[#525252] dark:text-[#A3A3A3]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Status & Result Summary */}
          <div className="flex items-center justify-between pt-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A] text-xs text-[#525252] dark:text-[#A3A3A3]">
            <div>
              {searchQuery || selectedCategory !== 'all' ? (
                <span>
                  Showing <strong className="text-[#111111] dark:text-[#F5F5F5]">{filteredCalculators.length}</strong> of {calculators.length} calculators
                  {searchQuery && (
                    <> matching &ldquo;<span className="text-[#059669] dark:text-[#10B981] font-semibold">{searchQuery}</span>&rdquo;</>
                  )}
                </span>
              ) : (
                <span>Browse all <strong>{calculators.length}</strong> verified UK financial tools</span>
              )}
            </div>

            {(searchQuery || selectedCategory !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[#059669] dark:text-[#10B981] hover:underline"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid of Filtered Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredCalculators.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="flex flex-col justify-between p-6 rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:border-[#059669] dark:hover:border-[#10B981] transition-all duration-150 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="p-3 rounded-xl bg-[#F5F5F5] dark:bg-[#222222] text-[#059669] dark:text-[#10B981] flex items-center justify-center font-bold border border-[#E5E5E5] dark:border-[#2A2A2A]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-3xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#F5F5F5] dark:bg-[#222222] text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                        {tool.badge}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                      {tool.title}
                    </h2>
                    <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-2 leading-relaxed font-normal">
                      {tool.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center text-xs font-bold text-[#059669] dark:text-[#10B981]">
                    <span>Open calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="p-10 text-center rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#F5F5F5] dark:bg-[#222222] text-[#737373] dark:text-[#A3A3A3] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
              No calculators found
            </h3>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] max-w-md mx-auto">
              We couldn&apos;t find any calculators matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
              {selectedCategory !== 'all' ? ` in the selected category` : ''}. Try checking for spelling or resetting your search filters.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-[#059669] text-white hover:bg-[#047857] transition-colors shadow-xs"
              >
                <span>Clear search and show all</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Featured UK Salary Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
                Top UK Salary & Tax Guides
              </h2>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-0.5">
                Explore in-depth analysis on tax brackets, take-home benchmarks, and salary sacrifice optimisation.
              </p>
            </div>
            <Link
              to="/guides"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline"
            >
              <span>View all guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <Link
              to="/guides/50000-salary-after-tax-uk"
              className="p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] group transition-colors"
            >
              <span className="text-2xs uppercase font-bold text-[#059669] dark:text-[#10B981] block">Salary Guide</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F5F5] group-hover:text-[#059669] dark:group-hover:text-[#10B981] mt-1">
                £50,000 Salary After Tax
              </h3>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-1 leading-normal">
                Monthly take-home, 20% vs 40% threshold buffer, and NI deductions.
              </p>
            </Link>

            <Link
              to="/guides/60000-salary-after-tax-uk"
              className="p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] group transition-colors"
            >
              <span className="text-2xs uppercase font-bold text-[#059669] dark:text-[#10B981] block">Salary Guide</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F5F5] group-hover:text-[#059669] dark:group-hover:text-[#10B981] mt-1">
                £60,000 Salary After Tax
              </h3>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-1 leading-normal">
                Higher rate tax, child benefit charge, and student loan costs.
              </p>
            </Link>

            <Link
              to="/guides/what-is-salary-sacrifice"
              className="p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] group transition-colors"
            >
              <span className="text-2xs uppercase font-bold text-[#059669] dark:text-[#10B981] block">Tax Strategy</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F5F5] group-hover:text-[#059669] dark:group-hover:text-[#10B981] mt-1">
                What is Salary Sacrifice?
              </h3>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-1 leading-normal">
                How pension, EV car schemes, and cycle to work save tax and NI.
              </p>
            </Link>

            <Link
              to="/guides/how-income-tax-works-uk"
              className="p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] group transition-colors"
            >
              <span className="text-2xs uppercase font-bold text-[#059669] dark:text-[#10B981] block">Tax Bands</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F5F5] group-hover:text-[#059669] dark:group-hover:text-[#10B981] mt-1">
                How UK Income Tax Works
              </h3>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-1 leading-normal">
                Personal allowances, basic vs higher bands, and Scottish tax rates.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Hub FAQs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqAccordion items={hubFaqs} />
      </div>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerNotice />
      </div>
    </div>
  );
};

