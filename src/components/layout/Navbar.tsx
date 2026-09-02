import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  Menu,
  X,
  Calculator,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Percent,
  Clock,
  HeartPulse,
  BookOpen,
  TrendingUp,
  Gift,
  Home,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-white/95 dark:bg-[#080808]/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ZONE 1: Brand Title */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-[#111111] dark:text-[#F5F5F5] font-bold text-xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] rounded-xl p-1 group"
              aria-label="PayWise UK - Home"
            >
              <div className="w-8 h-8 rounded-lg bg-[#111111] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center text-[#059669] dark:text-[#10B981] font-black text-base shadow-xs group-hover:border-[#059669] dark:group-hover:border-[#10B981] transition-colors">
                £
              </div>
              <span className="font-extrabold tracking-tight">
                PayWise <span className="text-[#059669] dark:text-[#10B981]">UK</span>
              </span>
            </Link>
          </div>

          {/* ZONE 2: 4-6 Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            <Link
              to="/take-home-pay-calculator"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive('/take-home-pay-calculator')
                  ? 'bg-[#F5F5F5] dark:bg-[#171717] text-[#059669] dark:text-[#10B981] font-bold border border-[#E5E5E5] dark:border-[#2A2A2A]'
                  : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]'
              }`}
            >
              Take-Home Pay
            </Link>
            <Link
              to="/day-rate-to-salary-calculator"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive('/day-rate-to-salary-calculator')
                  ? 'bg-[#F5F5F5] dark:bg-[#171717] text-[#059669] dark:text-[#10B981] font-bold border border-[#E5E5E5] dark:border-[#2A2A2A]'
                  : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]'
              }`}
            >
              Day Rate
            </Link>
            <Link
              to="/hourly-to-salary-calculator"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive('/hourly-to-salary-calculator')
                  ? 'bg-[#F5F5F5] dark:bg-[#171717] text-[#059669] dark:text-[#10B981] font-bold border border-[#E5E5E5] dark:border-[#2A2A2A]'
                  : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]'
              }`}
            >
              Hourly Rate
            </Link>
            <Link
              to="/pension-calculator"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive('/pension-calculator')
                  ? 'bg-[#F5F5F5] dark:bg-[#171717] text-[#059669] dark:text-[#10B981] font-bold border border-[#E5E5E5] dark:border-[#2A2A2A]'
                  : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]'
              }`}
            >
              Pension
            </Link>
            <Link
              to="/salary-sacrifice-calculator"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive('/salary-sacrifice-calculator')
                  ? 'bg-[#F5F5F5] dark:bg-[#171717] text-[#059669] dark:text-[#10B981] font-bold border border-[#E5E5E5] dark:border-[#2A2A2A]'
                  : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]'
              }`}
            >
              Salary Sacrifice
            </Link>

            {/* Dropdown for other tools */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
                aria-expanded={moreDropdownOpen}
                aria-label="More calculators and tools"
              >
                <span>Calculators</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute left-0 mt-2 w-[480px] rounded-2xl bg-white dark:bg-[#171717] shadow-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] p-3.5 z-50 animate-in fade-in duration-150 grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="px-2 py-1 text-2xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#888888]">
                      Tax & Property Calculators
                    </div>
                    <Link
                      to="/income-tax-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Income Tax Calculator
                    </Link>
                    <Link
                      to="/national-insurance-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Percent className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      National Insurance
                    </Link>
                    <Link
                      to="/tax-code-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Tax Code Calculator
                    </Link>
                    <Link
                      to="/employer-national-insurance-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Employer NI (15%)
                    </Link>
                    <Link
                      to="/dividend-tax-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Dividend Tax Calculator
                    </Link>
                    <Link
                      to="/mortgage-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Home className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Mortgage Repayments
                    </Link>
                    <Link
                      to="/mortgage-affordability-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Home className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Mortgage Affordability
                    </Link>
                    <Link
                      to="/stamp-duty-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Home className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Stamp Duty (SDLT)
                    </Link>
                    <Link
                      to="/mortgage-overpayment-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Percent className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Mortgage Overpayment
                    </Link>
                    <Link
                      to="/credit-card-repayment-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Credit Card Repayment
                    </Link>
                  </div>

                  <div className="space-y-1">
                    <div className="px-2 py-1 text-2xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#888888]">
                      Savings, Wealth & Income
                    </div>
                    <Link
                      to="/isa-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Stocks & Shares ISA
                    </Link>
                    <Link
                      to="/savings-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Gift className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Savings Growth & PSA
                    </Link>
                    <Link
                      to="/capital-gains-tax-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Capital Gains Tax (CGT)
                    </Link>
                    <Link
                      to="/salary-comparison-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Salary Comparison
                    </Link>
                    <Link
                      to="/pay-frequency-converter"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Clock className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Pay Frequency Converter
                    </Link>
                    <Link
                      to="/self-employed-tax-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      Self-Employed Tax
                    </Link>
                    <Link
                      to="/vat-calculator"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] hover:text-[#059669] dark:hover:text-[#10B981]"
                    >
                      <Percent className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                      VAT Calculator UK
                    </Link>
                  </div>

                  <div className="col-span-2 pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-between px-2">
                    <Link
                      to="/salary-calculators"
                      className="text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline"
                    >
                      Browse All 25+ Calculators →
                    </Link>
                    <div className="flex items-center gap-3">
                      <Link to="/guides" className="text-xs text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]">
                        Guides
                      </Link>
                      <Link to="/faq" className="text-xs text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]">
                        FAQ
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ZONE 3: Theme Toggle & Primary CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Desktop Segmented Theme Switcher */}
            <div className="hidden sm:block">
              <ThemeToggle variant="desktop-segmented" />
            </div>

            {/* Mobile Theme Toggle (min 44x44px target) */}
            <div className="sm:hidden">
              <ThemeToggle variant="compact" />
            </div>

            {/* Primary CTA */}
            <Link
              to="/take-home-pay-calculator"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-xl bg-[#059669] hover:bg-[#047857] dark:bg-[#10B981] dark:hover:bg-[#059669] text-white shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] whitespace-nowrap shrink-0 btn-press"
            >
              Calculate Pay
            </Link>

            {/* Mobile Menu Button (min 44x44px target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#080808] px-4 pt-3 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Quick Hub Links */}
          <div className="space-y-1">
            <div className="px-3 text-2xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#888888]">
              Primary Calculators
            </div>
            <Link
              to="/take-home-pay-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Calculator className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Take-Home Pay Calculator
            </Link>
            <Link
              to="/salary-comparison-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Salary Comparison Tool
            </Link>
            <Link
              to="/pay-frequency-converter"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Clock className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Pay Frequency Converter
            </Link>
            <Link
              to="/net-to-gross-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Calculator className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Net to Gross Salary Calculator
            </Link>
            <Link
              to="/day-rate-to-salary-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Day Rate to Salary
            </Link>
            <Link
              to="/hourly-to-salary-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Clock className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Hourly Rate Calculator
            </Link>
            <Link
              to="/pension-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Percent className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Pension Growth Forecast
            </Link>
            <Link
              to="/salary-sacrifice-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Percent className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Salary Sacrifice (EV & Pension)
            </Link>
          </div>

          {/* Benefits & Family */}
          <div className="space-y-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-3">
            <div className="px-3 text-2xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#888888]">
              Family, Benefits & Secondary
            </div>
            <Link
              to="/marriage-allowance-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Gift className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Marriage Allowance Calculator
            </Link>
            <Link
              to="/second-job-tax-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Second Job Tax Calculator
            </Link>
            <Link
              to="/national-minimum-wage-checker"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Percent className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              National Minimum Wage Checker
            </Link>
            <Link
              to="/maternity-pay-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <HeartPulse className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Maternity & Statutory Leave Pay
            </Link>
            <Link
              to="/child-benefit-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Gift className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Child Benefit Calculator (HICBC)
            </Link>
            <Link
              to="/statutory-sick-pay-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <HeartPulse className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Statutory Sick Pay (SSP)
            </Link>
          </div>

          {/* Sector & Specialists */}
          <div className="space-y-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-3">
            <div className="px-3 text-2xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#888888]">
              Sector & Specialists
            </div>
            <Link
              to="/student-loan-repayment-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <GraduationCap className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Student Loan Repayments
            </Link>
            <Link
              to="/nhs-salary-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <HeartPulse className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              NHS Agenda for Change
            </Link>
            <Link
              to="/teacher-salary-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <BookOpen className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Teacher Pay Scales
            </Link>
            <Link
              to="/inside-ir35-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Inside IR35 Calculator
            </Link>
            <Link
              to="/inside-vs-outside-ir35-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Inside vs Outside IR35
            </Link>
            <Link
              to="/umbrella-company-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Percent className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Umbrella Company Calculator
            </Link>
            <Link
              to="/self-employed-tax-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Self-Employed Tax Calculator
            </Link>
            <Link
              to="/pay-rise-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Pay Rise Calculator
            </Link>
            <Link
              to="/bonus-tax-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Gift className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Bonus Tax Calculator
            </Link>
            <Link
              to="/redundancy-pay-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Redundancy Pay Calculator
            </Link>
            <Link
              to="/council-tax-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Home className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Council Tax Calculator
            </Link>
            <Link
              to="/vat-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              <Percent className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              VAT Calculator UK
            </Link>
          </div>

          <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-3 space-y-1">
            <Link
              to="/salary-calculators"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-bold text-[#059669] dark:text-[#10B981] hover:bg-[#F5F5F5] dark:hover:bg-[#171717]"
            >
              Browse All 25+ Calculators →
            </Link>
            <div className="flex items-center gap-4 px-3 pt-1">
              <Link
                to="/guides"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]"
              >
                Guides
              </Link>
              <Link
                to="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]"
              >
                FAQ
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]"
              >
                About
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/take-home-pay-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs text-center shadow-xs"
            >
              Calculate Take-Home Pay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
