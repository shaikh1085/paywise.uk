import React from 'react';
import { Link } from 'react-router-dom';
import { TAX_CONFIG_METADATA } from '../../config/taxConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#080808] text-[#525252] dark:text-[#A3A3A3] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-[#111111] dark:text-[#F5F5F5] font-bold text-xl tracking-tight"
            >
              <div className="w-8 h-8 rounded-lg bg-[#111111] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center text-[#059669] dark:text-[#10B981] font-black text-base shadow-xs">
                £
              </div>
              <span className="font-extrabold tracking-tight">
                PayWise <span className="text-[#059669] dark:text-[#10B981]">UK</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-[#525252] dark:text-[#A3A3A3] max-w-sm">
              PayWise UK delivers crystal-clear, transparent UK salary and payroll estimates. Built with privacy-first client execution and 2025/2026 tax engine precision.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F5F5] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Tax Rates: {TAX_CONFIG_METADATA.currentTaxYearLabel} ({TAX_CONFIG_METADATA.lastUpdated})
            </div>
          </div>

          {/* Calculators Column */}
          <div>
            <h3 className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5] uppercase tracking-wider mb-4">
              Tax & Payroll Tools
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/take-home-pay-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Take-Home Pay Calculator
                </Link>
              </li>
              <li>
                <Link to="/income-tax-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors font-medium">
                  Income Tax Calculator
                </Link>
              </li>
              <li>
                <Link to="/national-insurance-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  National Insurance Calculator
                </Link>
              </li>
              <li>
                <Link to="/tax-code-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Tax Code Calculator
                </Link>
              </li>
              <li>
                <Link to="/employer-national-insurance-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Employer NI Calculator (15%)
                </Link>
              </li>
              <li>
                <Link to="/dividend-tax-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Dividend Tax Calculator
                </Link>
              </li>
              <li>
                <Link to="/net-to-gross-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Net to Gross Salary
                </Link>
              </li>
              <li>
                <Link to="/day-rate-to-salary-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Day Rate to Salary
                </Link>
              </li>
              <li>
                <Link to="/hourly-to-salary-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Hourly Rate Calculator
                </Link>
              </li>
              <li>
                <Link to="/pension-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Pension Growth Forecast
                </Link>
              </li>
              <li>
                <Link to="/salary-sacrifice-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Salary Sacrifice Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Sector & Wealth Column */}
          <div>
            <h3 className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5] uppercase tracking-wider mb-4">
              Property & Wealth
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/mortgage-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link to="/mortgage-affordability-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Mortgage Affordability
                </Link>
              </li>
              <li>
                <Link to="/stamp-duty-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Stamp Duty Calculator (SDLT)
                </Link>
              </li>
              <li>
                <Link to="/mortgage-overpayment-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Mortgage Overpayment
                </Link>
              </li>
              <li>
                <Link to="/credit-card-repayment-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Credit Card Repayment
                </Link>
              </li>
              <li>
                <Link to="/isa-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Stocks & Shares ISA
                </Link>
              </li>
              <li>
                <Link to="/savings-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Savings Interest & PSA
                </Link>
              </li>
              <li>
                <Link to="/capital-gains-tax-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Capital Gains Tax (CGT)
                </Link>
              </li>
              <li>
                <Link to="/student-loan-repayment-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Student Loan Repayments
                </Link>
              </li>
              <li>
                <Link to="/self-employed-tax-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Self-Employed Tax Calculator
                </Link>
              </li>
              <li>
                <Link to="/vat-calculator" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  VAT Calculator UK
                </Link>
              </li>
              <li>
                <Link to="/salary-calculators" className="text-[#059669] dark:text-[#10B981] font-semibold hover:underline">
                  Browse All 30+ Calculators →
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Legal Column */}
          <div>
            <h3 className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5] uppercase tracking-wider mb-4">
              Guides & Resources
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/guides" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Tax & Payroll Guides
                </Link>
              </li>
              <li>
                <Link to="/guides/50000-salary-after-tax-uk" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  £50,000 Salary After Tax
                </Link>
              </li>
              <li>
                <Link to="/guides/60000-salary-after-tax-uk" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  £60,000 Salary After Tax
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  About PayWise UK
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Banner Card */}
        <div className="mt-10 p-5 rounded-xl bg-[#F5F5F5] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs text-[#525252] dark:text-[#A3A3A3] space-y-1.5 shadow-xs">
          <p className="font-bold text-[#111111] dark:text-[#F5F5F5]">
            Important Legal & Financial Disclaimer:
          </p>
          <p className="leading-relaxed">
            PayWise UK provides calculations and estimates for general information and illustration only. We are not HM Revenue & Customs (HMRC), the NHS, the Department for Education, or a regulated financial adviser. Figures do not constitute tax, legal, financial, payroll, or accounting advice. Always verify calculations with HMRC, your employer's payroll department, or an accredited independent financial adviser.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between text-xs text-[#737373] dark:text-[#888888] gap-4">
          <p>© {currentYear} PayWise UK. Precision UK Payroll Tools.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:underline hover:text-[#111111] dark:hover:text-[#F5F5F5]">Privacy</Link>
            <Link to="/terms-of-use" className="hover:underline hover:text-[#111111] dark:hover:text-[#F5F5F5]">Terms</Link>
            <Link to="/disclaimer" className="hover:underline hover:text-[#111111] dark:hover:text-[#F5F5F5]">Disclaimer</Link>
            <Link to="/contact" className="hover:underline hover:text-[#111111] dark:hover:text-[#F5F5F5]">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
