import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';

// Lazy Loaded Pages
const HomePage = React.lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const TakeHomePayPage = React.lazy(() => import('./pages/TakeHomePayPage').then((m) => ({ default: m.TakeHomePayPage })));
const SalaryCalculatorsHubPage = React.lazy(() => import('./pages/SalaryCalculatorsHubPage').then((m) => ({ default: m.SalaryCalculatorsHubPage })));

// 10 New UK Financial Calculators
const IncomeTaxPage = React.lazy(() => import('./pages/IncomeTaxPage').then((m) => ({ default: m.IncomeTaxPage })));
const NationalInsurancePage = React.lazy(() => import('./pages/NationalInsurancePage').then((m) => ({ default: m.NationalInsurancePage })));
const TaxCodeCalculatorPage = React.lazy(() => import('./pages/TaxCodeCalculatorPage').then((m) => ({ default: m.TaxCodeCalculatorPage })));
const EmployerNiPage = React.lazy(() => import('./pages/EmployerNiPage').then((m) => ({ default: m.EmployerNiPage })));
const DividendTaxPage = React.lazy(() => import('./pages/DividendTaxPage').then((m) => ({ default: m.DividendTaxPage })));
const MortgagePage = React.lazy(() => import('./pages/MortgagePage').then((m) => ({ default: m.MortgagePage })));
const MortgageAffordabilityPage = React.lazy(() => import('./pages/MortgageAffordabilityPage').then((m) => ({ default: m.MortgageAffordabilityPage })));
const StampDutyPage = React.lazy(() => import('./pages/StampDutyPage').then((m) => ({ default: m.StampDutyPage })));
const MortgageOverpaymentPage = React.lazy(() => import('./pages/MortgageOverpaymentPage').then((m) => ({ default: m.MortgageOverpaymentPage })));
const CreditCardRepaymentPage = React.lazy(() => import('./pages/CreditCardRepaymentPage').then((m) => ({ default: m.CreditCardRepaymentPage })));
const IsaCalculatorPage = React.lazy(() => import('./pages/IsaCalculatorPage').then((m) => ({ default: m.IsaCalculatorPage })));
const SavingsCalculatorPage = React.lazy(() => import('./pages/SavingsCalculatorPage').then((m) => ({ default: m.SavingsCalculatorPage })));
const CapitalGainsTaxPage = React.lazy(() => import('./pages/CapitalGainsTaxPage').then((m) => ({ default: m.CapitalGainsTaxPage })));

const DayRatePage = React.lazy(() => import('./pages/DayRatePage').then((m) => ({ default: m.DayRatePage })));
const HourlyRatePage = React.lazy(() => import('./pages/HourlyRatePage').then((m) => ({ default: m.HourlyRatePage })));
const PensionPage = React.lazy(() => import('./pages/PensionPage').then((m) => ({ default: m.PensionPage })));
const StudentLoanPage = React.lazy(() => import('./pages/StudentLoanPage').then((m) => ({ default: m.StudentLoanPage })));
const SalarySacrificePage = React.lazy(() => import('./pages/SalarySacrificePage').then((m) => ({ default: m.SalarySacrificePage })));
const OvertimePage = React.lazy(() => import('./pages/OvertimePage').then((m) => ({ default: m.OvertimePage })));
const NhsSalaryPage = React.lazy(() => import('./pages/NhsSalaryPage').then((m) => ({ default: m.NhsSalaryPage })));
const TeacherSalaryPage = React.lazy(() => import('./pages/TeacherSalaryPage').then((m) => ({ default: m.TeacherSalaryPage })));
const InsideIr35Page = React.lazy(() => import('./pages/InsideIr35Page').then((m) => ({ default: m.InsideIr35Page })));
const UmbrellaCompanyPage = React.lazy(() => import('./pages/UmbrellaCompanyPage').then((m) => ({ default: m.UmbrellaCompanyPage })));
const SelfEmployedTaxPage = React.lazy(() => import('./pages/SelfEmployedTaxPage').then((m) => ({ default: m.SelfEmployedTaxPage })));
const PayRiseCalculatorPage = React.lazy(() => import('./pages/PayRiseCalculatorPage').then((m) => ({ default: m.PayRiseCalculatorPage })));
const BonusTaxCalculatorPage = React.lazy(() => import('./pages/BonusTaxCalculatorPage').then((m) => ({ default: m.BonusTaxCalculatorPage })));
const RedundancyPayPage = React.lazy(() => import('./pages/RedundancyPayPage').then((m) => ({ default: m.RedundancyPayPage })));
const CouncilTaxCalculatorPage = React.lazy(() => import('./pages/CouncilTaxCalculatorPage').then((m) => ({ default: m.CouncilTaxCalculatorPage })));
const VatCalculatorPage = React.lazy(() => import('./pages/VatCalculatorPage').then((m) => ({ default: m.VatCalculatorPage })));
const NetToGrossCalculatorPage = React.lazy(() => import('./pages/NetToGrossCalculatorPage').then((m) => ({ default: m.NetToGrossCalculatorPage })));
const MinimumWageCheckerPage = React.lazy(() => import('./pages/MinimumWageCheckerPage').then((m) => ({ default: m.MinimumWageCheckerPage })));
const MaternityPayPage = React.lazy(() => import('./pages/MaternityPayPage').then((m) => ({ default: m.MaternityPayPage })));
const ChildBenefitPage = React.lazy(() => import('./pages/ChildBenefitPage').then((m) => ({ default: m.ChildBenefitPage })));
const SickPayCalculatorPage = React.lazy(() => import('./pages/SickPayCalculatorPage').then((m) => ({ default: m.SickPayCalculatorPage })));
const MarriageAllowanceCalculatorPage = React.lazy(() => import('./pages/MarriageAllowanceCalculatorPage').then((m) => ({ default: m.MarriageAllowanceCalculatorPage })));
const SecondJobCalculatorPage = React.lazy(() => import('./pages/SecondJobCalculatorPage').then((m) => ({ default: m.SecondJobCalculatorPage })));
const SalaryComparisonPage = React.lazy(() => import('./pages/SalaryComparisonPage').then((m) => ({ default: m.SalaryComparisonPage })));
const PayFrequencyConverterPage = React.lazy(() => import('./pages/PayFrequencyConverterPage').then((m) => ({ default: m.PayFrequencyConverterPage })));
const Ir35ComparePage = React.lazy(() => import('./pages/Ir35ComparePage').then((m) => ({ default: m.Ir35ComparePage })));

// Lazy Loaded Guides
const GuidesIndexPage = React.lazy(() => import('./pages/GuidesIndexPage').then((m) => ({ default: m.GuidesIndexPage })));
const Guide50kPage = React.lazy(() => import('./pages/Guide50kPage').then((m) => ({ default: m.Guide50kPage })));
const Guide60kPage = React.lazy(() => import('./pages/Guide60kPage').then((m) => ({ default: m.Guide60kPage })));
const GuideSalarySacrificePage = React.lazy(() => import('./pages/GuideSalarySacrificePage').then((m) => ({ default: m.GuideSalarySacrificePage })));
const GuideIncomeTaxPage = React.lazy(() => import('./pages/GuideIncomeTaxPage').then((m) => ({ default: m.GuideIncomeTaxPage })));

// Lazy Loaded Static & Legal
const FaqPage = React.lazy(() => import('./pages/FaqPage').then((m) => ({ default: m.FaqPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsOfUsePage = React.lazy(() => import('./pages/TermsOfUsePage').then((m) => ({ default: m.TermsOfUsePage })));
const DisclaimerPage = React.lazy(() => import('./pages/DisclaimerPage').then((m) => ({ default: m.DisclaimerPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Admin Utilities (Hidden, Noindex)
const TaxRateChecklistPage = React.lazy(() => import('./pages/admin/TaxRateChecklistPage').then((m) => ({ default: m.TaxRateChecklistPage })));

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ToastProvider>
          <Layout>
            <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] dark:bg-[#080808]" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/take-home-pay-calculator" element={<TakeHomePayPage />} />
                
                {/* Calculators Hub & Aliases */}
                <Route path="/calculators" element={<SalaryCalculatorsHubPage />} />
                <Route path="/salary-calculators" element={<SalaryCalculatorsHubPage />} />

                {/* 10 Comprehensive UK Financial Calculators */}
                <Route path="/income-tax-calculator" element={<IncomeTaxPage />} />
                <Route path="/national-insurance-calculator" element={<NationalInsurancePage />} />
                <Route path="/tax-code-calculator" element={<TaxCodeCalculatorPage />} />
                <Route path="/employer-national-insurance-calculator" element={<EmployerNiPage />} />
                <Route path="/employer-ni-calculator" element={<Navigate to="/employer-national-insurance-calculator" replace />} />
                <Route path="/dividend-tax-calculator" element={<DividendTaxPage />} />
                <Route path="/mortgage-calculator" element={<MortgagePage />} />
                <Route path="/mortgage-affordability-calculator" element={<MortgageAffordabilityPage />} />
                <Route path="/stamp-duty-calculator" element={<StampDutyPage />} />
                <Route path="/stamp-duty-land-tax-calculator" element={<Navigate to="/stamp-duty-calculator" replace />} />
                <Route path="/first-time-buyer-stamp-duty-calculator" element={<StampDutyPage />} />
                <Route path="/buy-to-let-stamp-duty-calculator" element={<StampDutyPage />} />
                <Route path="/mortgage-overpayment-calculator" element={<MortgageOverpaymentPage />} />
                <Route path="/remortgage-calculator" element={<MortgageOverpaymentPage />} />
                <Route path="/credit-card-repayment-calculator" element={<CreditCardRepaymentPage />} />
                <Route path="/credit-card-payoff-calculator" element={<Navigate to="/credit-card-repayment-calculator" replace />} />
                <Route path="/credit-card-calculator" element={<Navigate to="/credit-card-repayment-calculator" replace />} />
                <Route path="/isa-calculator" element={<IsaCalculatorPage />} />
                <Route path="/isa-growth-calculator" element={<Navigate to="/isa-calculator" replace />} />
                <Route path="/savings-calculator" element={<SavingsCalculatorPage />} />
                <Route path="/savings-interest-calculator" element={<Navigate to="/savings-calculator" replace />} />
                <Route path="/capital-gains-tax-calculator" element={<CapitalGainsTaxPage />} />
                <Route path="/cgt-calculator" element={<Navigate to="/capital-gains-tax-calculator" replace />} />

                <Route path="/day-rate-to-salary-calculator" element={<DayRatePage />} />
                <Route path="/hourly-to-salary-calculator" element={<HourlyRatePage />} />
                <Route path="/pension-calculator" element={<PensionPage />} />
                <Route path="/student-loan-repayment-calculator" element={<StudentLoanPage />} />
                <Route path="/salary-sacrifice-calculator" element={<SalarySacrificePage />} />
                <Route path="/overtime-pay-calculator" element={<OvertimePage />} />
                <Route path="/nhs-salary-calculator" element={<NhsSalaryPage />} />
                <Route path="/teacher-salary-calculator" element={<TeacherSalaryPage />} />
                <Route path="/inside-ir35-calculator" element={<InsideIr35Page />} />
                <Route path="/umbrella-company-calculator" element={<UmbrellaCompanyPage />} />
                <Route path="/self-employed-tax-calculator" element={<SelfEmployedTaxPage />} />
                <Route path="/pay-rise-calculator" element={<PayRiseCalculatorPage />} />
                <Route path="/bonus-tax-calculator" element={<BonusTaxCalculatorPage />} />
                <Route path="/redundancy-pay-calculator" element={<RedundancyPayPage />} />
                <Route path="/council-tax-calculator" element={<CouncilTaxCalculatorPage />} />
                <Route path="/vat-calculator" element={<VatCalculatorPage />} />
                <Route path="/net-to-gross-calculator" element={<NetToGrossCalculatorPage />} />
                <Route path="/net-to-gross-salary-calculator" element={<NetToGrossCalculatorPage />} />
                <Route path="/reverse-salary-calculator" element={<NetToGrossCalculatorPage />} />
                <Route path="/salary-comparison-calculator" element={<SalaryComparisonPage />} />
                <Route path="/salary-compare-calculator" element={<SalaryComparisonPage />} />
                <Route path="/pay-frequency-converter" element={<PayFrequencyConverterPage />} />
                <Route path="/salary-frequency-converter" element={<PayFrequencyConverterPage />} />
                <Route path="/minimum-wage-calculator" element={<Navigate to="/national-minimum-wage-checker" replace />} />
                <Route path="/maternity-pay-calculator" element={<MaternityPayPage />} />
                <Route path="/child-benefit-calculator" element={<ChildBenefitPage />} />
                <Route path="/statutory-sick-pay-calculator" element={<SickPayCalculatorPage />} />
                <Route path="/marriage-allowance-calculator" element={<MarriageAllowanceCalculatorPage />} />
                <Route path="/second-job-tax-calculator" element={<SecondJobCalculatorPage />} />
                <Route path="/national-minimum-wage-checker" element={<MinimumWageCheckerPage />} />
                <Route path="/minimum-wage-checker" element={<MinimumWageCheckerPage />} />
                <Route path="/inside-vs-outside-ir35-calculator" element={<Ir35ComparePage />} />

                {/* Guides & Aliases */}
                <Route path="/guides" element={<GuidesIndexPage />} />
                <Route path="/guides/50k-salary-after-tax" element={<Guide50kPage />} />
                <Route path="/guides/50000-salary-after-tax-uk" element={<Guide50kPage />} />
                <Route path="/guides/60k-salary-after-tax" element={<Guide60kPage />} />
                <Route path="/guides/60000-salary-after-tax-uk" element={<Guide60kPage />} />
                <Route path="/guides/what-is-salary-sacrifice" element={<GuideSalarySacrificePage />} />
                <Route path="/guides/salary-sacrifice-guide" element={<GuideSalarySacrificePage />} />
                <Route path="/guides/how-income-tax-works-uk" element={<GuideIncomeTaxPage />} />
                <Route path="/guides/uk-income-tax-bands-explained" element={<GuideIncomeTaxPage />} />

                {/* Info & Legal */}
                <Route path="/faqs" element={<FaqPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-use" element={<TermsOfUsePage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />

                {/* Hidden Admin Routes */}
                <Route path="/admin/tax-rate-checklist" element={<TaxRateChecklistPage />} />

                {/* 404 Catch-All */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
