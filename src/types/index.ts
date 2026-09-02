export type TaxYear = '2024_25' | '2025_26' | '2026_27';

export type TaxRegion = 'england_wales_ni' | 'england_ni' | 'wales' | 'scotland';

export type PayFrequency = 'annual' | 'monthly' | 'weekly';

export type PensionType = 'auto_enrolment' | 'relief_at_source' | 'net_pay' | 'salary_sacrifice';

export type StudentLoanPlan = 'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5' | 'postgrad' | 'plan1_and_postgrad' | 'plan2_and_postgrad' | 'plan4_and_postgrad' | 'plan5_and_postgrad';

export interface TakeHomeInput {
  grossSalary: number;
  payFrequency: PayFrequency;
  taxYear: TaxYear;
  region: TaxRegion;
  taxCode: string;
  pensionPercentage: number;
  pensionFixedAmount: number;
  pensionType: PensionType;
  employerPensionPercentage: number;
  studentLoanPlan: StudentLoanPlan;
  bonus: number;
  overtime: number;
  otherTaxableIncome: number;
  salarySacrificeMonthly: number;
  customPersonalAllowance?: number;
  isBlindAllowance?: boolean;
  isMarriageAllowance?: boolean;
}

export interface TaxBandBreakdown {
  name: string;
  rate: number;
  taxableAmount: number;
  taxPaid: number;
}

export interface NiBandBreakdown {
  name: string;
  rate: number;
  earningsInBand: number;
  niPaid: number;
}

export interface TakeHomeResult {
  grossAnnual: number;
  totalTaxableIncome: number;
  personalAllowanceApplied: number;
  personalAllowanceTaperLoss: number;
  
  incomeTaxAnnual: number;
  incomeTaxMonthly: number;
  incomeTaxWeekly: number;
  incomeTaxDaily: number;
  taxBands: TaxBandBreakdown[];

  employeeNiAnnual: number;
  employeeNiMonthly: number;
  employeeNiWeekly: number;
  employeeNiDaily: number;
  niBands: NiBandBreakdown[];

  studentLoanAnnual: number;
  studentLoanMonthly: number;
  studentLoanWeekly: number;
  postgradLoanAnnual: number;
  postgradLoanMonthly: number;

  pensionAnnual: number;
  pensionMonthly: number;
  employerPensionAnnual: number;
  employerPensionMonthly: number;
  pensionTaxReliefAnnual: number;

  salarySacrificeAnnual: number;

  totalDeductionsAnnual: number;
  totalDeductionsMonthly: number;
  totalDeductionsWeekly: number;
  totalDeductionsDaily: number;

  netAnnual: number;
  netMonthly: number;
  netWeekly: number;
  netDaily: number;

  employerNiAnnual: number;
  totalEmploymentCost: number;

  effectiveTaxRate: number; // (Tax + NI + StudentLoan) / Gross
  marginalTaxRate: number; // Tax on the next £1 earned
  marginalTaxExplanation: string;
}

export interface DayRateInput {
  dayRate: number;
  daysPerWeek: number;
  weeksPerYear: number;
  holidayDays: number;
  pensionPercentage: number;
  monthlyExpenses: number;
  isInsideIR35: boolean;
  umbrellaMarginMonthly?: number;
}

export interface DayRateResult {
  dayRate: number;
  totalWorkingDays: number;
  grossAnnualEquivalent: number;
  grossMonthlyEquivalent: number;
  grossWeeklyEquivalent: number;
  estimatedAnnualTax: number;
  estimatedAnnualNI: number;
  estimatedPension: number;
  estimatedExpenses: number;
  estimatedNetAnnual: number;
  estimatedNetMonthly: number;
  estimatedNetDaily: number;
  effectiveRetentionRate: number;
}

export interface HourlyRateInput {
  hourlyWage: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  overtimeHoursPerWeek: number;
  overtimeMultiplier: number;
  pensionPercentage: number;
}

export interface HourlyRateResult {
  basicGrossAnnual: number;
  overtimeGrossAnnual: number;
  totalGrossAnnual: number;
  grossMonthly: number;
  grossWeekly: number;
  grossDaily: number;
  netAnnual: number;
  netMonthly: number;
  netWeekly: number;
  netDaily: number;
  effectiveHourlyNet: number;
}

export interface PensionCompoundInput {
  currentAge: number;
  retirementAge: number;
  currentPot: number;
  grossSalary: number;
  employeeContributionPercent: number;
  employerContributionPercent: number;
  fixedMonthlyTopUp: number;
  expectedAnnualGrowth: number;
  inflationRate: number;
}

export interface PensionYearProjection {
  age: number;
  year: number;
  startingBalance: number;
  personalContribution: number;
  employerContribution: number;
  taxRelief: number;
  investmentGrowth: number;
  endingBalanceNominal: number;
  endingBalanceReal: number;
}

export interface PensionCompoundResult {
  yearsToRetirement: number;
  finalPotNominal: number;
  finalPotReal: number;
  totalPersonalContributions: number;
  totalEmployerContributions: number;
  totalTaxReliefGiven: number;
  totalInvestmentGrowth: number;
  estimatedAnnualDrawdownSafe4Percent: number;
  estimatedMonthlyDrawdown: number;
  yearlyProjections: PensionYearProjection[];
}

export interface StudentLoanInput {
  annualSalary: number;
  plan: StudentLoanPlan;
}

export interface StudentLoanResult {
  planName: string;
  threshold: number;
  repaymentRatePercent: number;
  incomeAboveThreshold: number;
  annualRepayment: number;
  monthlyRepayment: number;
  weeklyRepayment: number;
  postgradRepaymentAnnual: number;
  postgradRepaymentMonthly: number;
  totalStudentLoanAnnual: number;
  totalStudentLoanMonthly: number;
  explanation: string;
}

export interface SalarySacrificeInput {
  currentSalary: number;
  monthlySacrifice: number;
  benefitType: 'pension' | 'ev_car' | 'cycle_to_work' | 'nursery' | 'tech_scheme' | 'other';
  currentPensionPercent: number;
}

export interface SalarySacrificeResult {
  originalSalary: number;
  newSalary: number;
  annualSacrifice: number;
  monthlySacrifice: number;
  
  originalNetAnnual: number;
  newNetAnnual: number;
  
  originalNetMonthly: number;
  newNetMonthly: number;

  annualIncomeTaxSaved: number;
  annualNiSaved: number;
  annualEmployerNiSaved: number;
  
  totalAnnualTaxSavings: number;
  monthlyTakeHomeDrop: number;
  effectiveMonthlySavingsRate: number;
}

export interface OvertimeInput {
  basicHourlyRate: number;
  overtimeHours: number;
  overtimeMultiplier: number;
  payPeriod: 'monthly' | 'weekly' | 'custom';
  currentAnnualSalary: number;
}

export interface OvertimeResult {
  overtimeHourlyRate: number;
  grossOvertimePay: number;
  marginalIncomeTaxRate: number;
  marginalNiRate: number;
  estimatedIncomeTaxDeduction: number;
  estimatedNiDeduction: number;
  estimatedStudentLoanDeduction: number;
  netOvertimePay: number;
  effectiveOvertimeRetentionPercent: number;
}

export interface NhsBandOption {
  band: string;
  title: string;
  points: { point: number; experience: string; basicSalary: number }[];
}

export interface NhsInput {
  band: string;
  pointIndex: number;
  regionHCAS: 'none' | 'fringe' | 'outer_london' | 'inner_london';
  optInPension: boolean;
  studentLoanPlan: StudentLoanPlan;
}

export interface NhsResult {
  bandName: string;
  basicSalary: number;
  hcasSupplement: number;
  grossSalary: number;
  pensionTierRate: number;
  pensionDeductionAnnual: number;
  incomeTaxAnnual: number;
  niAnnual: number;
  studentLoanAnnual: number;
  netAnnual: number;
  netMonthly: number;
  netWeekly: number;
}

export interface TeacherScaleOption {
  category: 'Main' | 'Upper' | 'Leadership';
  title: string;
  scales: { point: string; england: number; londonFringe: number; outerLondon: number; innerLondon: number }[];
}

export interface TeacherInput {
  category: 'Main' | 'Upper' | 'Leadership';
  point: string;
  region: 'england' | 'londonFringe' | 'outerLondon' | 'innerLondon';
  optInPension: boolean;
  studentLoanPlan: StudentLoanPlan;
}

export interface TeacherResult {
  scaleTitle: string;
  grossSalary: number;
  pensionTierRate: number;
  pensionAnnual: number;
  incomeTaxAnnual: number;
  niAnnual: number;
  studentLoanAnnual: number;
  netAnnual: number;
  netMonthly: number;
  netWeekly: number;
}

export interface InsideIr35Input {
  dayRate: number;
  workingDaysPerYear: number;
  umbrellaFeePerWeek: number;
  pensionPercent: number;
  apprenticeshipLevyIncluded: boolean;
}

export interface InsideIr35Result {
  contractGrossAnnual: number;
  contractGrossMonthly: number;
  umbrellaFeesAnnual: number;
  apprenticeshipLevyAnnual: number;
  employerNiAnnual: number;
  grossPayToWorkerAnnual: number;
  employeeNiAnnual: number;
  incomeTaxAnnual: number;
  employeePensionAnnual: number;
  netTakeHomeAnnual: number;
  netTakeHomeMonthly: number;
  netTakeHomeDaily: number;
  takeHomePercentage: number;
}

export interface UmbrellaInput {
  dayRate: number;
  daysWorkedPerMonth: number;
  umbrellaWeeklyMargin: number;
  pensionSalarySacrificePercent: number;
  allowableExpensesMonthly: number;
}

export interface UmbrellaResult {
  invoiceGrossMonthly: number;
  umbrellaMarginMonthly: number;
  employerNiMonthly: number;
  apprenticeshipLevyMonthly: number;
  employerPensionMonthly: number;
  grossSalaryMonthly: number;
  incomeTaxMonthly: number;
  employeeNiMonthly: number;
  employeePensionMonthly: number;
  netPayMonthly: number;
  retentionPercent: number;
}

export interface SelfEmployedInput {
  grossProfit: number;
  allowableExpenses: number;
  taxYear: TaxYear;
  region: TaxRegion;
  studentLoanPlan: StudentLoanPlan;
  payVoluntaryClass2IfUnderThreshold?: boolean;
}

export interface SelfEmployedResult {
  grossProfit: number;
  allowableExpenses: number;
  taxableProfit: number;
  personalAllowanceApplied: number;
  personalAllowanceTaperLoss: number;
  
  incomeTaxAnnual: number;
  incomeTaxMonthly: number;
  incomeTaxWeekly: number;
  taxBands: TaxBandBreakdown[];

  class2NiAnnual: number;
  class2NiMonthly: number;
  class2StatusText: string;

  class4NiAnnual: number;
  class4NiMonthly: number;
  class4NiWeekly: number;
  class4Bands: {
    name: string;
    rate: number;
    profitsInBand: number;
    niPaid: number;
  }[];

  studentLoanAnnual: number;
  studentLoanMonthly: number;

  totalDeductionsAnnual: number;
  totalDeductionsMonthly: number;
  totalDeductionsWeekly: number;

  netTakeHomeAnnual: number;
  netTakeHomeMonthly: number;
  netTakeHomeWeekly: number;

  effectiveTaxRate: number;
  marginalTaxRate: number;

  requiresPaymentOnAccount: boolean;
  firstPaymentOnAccount: number;
  secondPaymentOnAccount: number;
  totalFirstYearPaymentDueJanuary: number;
}

export interface PayRiseInput {
  currentSalary: number;
  newSalary?: number;
  increaseMode: 'amount' | 'percentage';
  percentageIncrease: number;
  flatIncreaseAmount: number;
  taxYear: TaxYear;
  region: TaxRegion;
  taxCode: string;
  pensionPercentage: number;
  pensionType: PensionType;
  studentLoanPlan: StudentLoanPlan;
}

export interface PayRiseResult {
  currentSalary: number;
  newSalary: number;
  grossIncreaseAnnual: number;
  grossIncreaseMonthly: number;
  grossIncreasePercentage: number;

  before: TakeHomeResult;
  after: TakeHomeResult;

  extraTakeHomeAnnual: number;
  extraTakeHomeMonthly: number;
  extraTakeHomeWeekly: number;
  takeHomeRetentionPercent: number;

  extraTaxAnnual: number;
  extraTaxMonthly: number;
  extraNiAnnual: number;
  extraNiMonthly: number;
  extraPensionAnnual: number;
  extraPensionMonthly: number;
  extraStudentLoanAnnual: number;
  extraStudentLoanMonthly: number;
  totalExtraDeductionsAnnual: number;

  effectiveTaxRateBefore: number;
  effectiveTaxRateAfter: number;
  newMarginalTaxRate: number;

  crossesHigherRateTax: boolean;
  crossesAdditionalRateTax: boolean;
  crossesPersonalAllowanceTaper: boolean;
  crossesChildBenefitCharge: boolean;
  higherRateThreshold: number;
}

export interface BonusTaxInput {
  baseSalary: number;
  bonusAmount: number;
  taxYear: TaxYear;
  region: TaxRegion;
  taxCode: string;
  pensionPercentage: number;
  pensionType: PensionType;
  pensionAppliesToBonus: boolean;
  salarySacrificeBonusAmount?: number;
  studentLoanPlan: StudentLoanPlan;
}

export interface BonusTaxResult {
  baseSalary: number;
  bonusAmount: number;
  totalGrossIncome: number;

  baseWithoutBonus: TakeHomeResult;
  totalWithBonus: TakeHomeResult;

  // Deductions purely on bonus
  taxOnBonus: number;
  niOnBonus: number;
  pensionOnBonus: number;
  studentLoanOnBonus: number;
  totalDeductionsOnBonus: number;

  netBonus: number;
  retentionPercentage: number;
  marginalTaxRateOnBonus: number;

  // Monthly payslip simulation
  normalMonthNet: number;
  bonusMonthGross: number;
  bonusMonthNet: number;
  bonusMonthExtraNet: number;

  // Salary sacrifice pension comparison on bonus
  salarySacrificeComparison?: {
    sacrificedAmount: number;
    cashBonusTaken: number;
    pensionPotAdded: number;
    taxSaved: number;
    niSaved: number;
    netCashLost: number; // The modest net cash given up in exchange for the full gross pension
  };

  // Warning thresholds
  crossesHigherRate: boolean;
  crossesAdditionalRate: boolean;
  crossesPersonalAllowanceTaper: boolean;
  crossesChildBenefitCharge: boolean;
  higherRateThreshold: number;
}

export interface RedundancyPayInput {
  age: number;
  yearsOfService: number;
  weeklyPay: number;
  useStatutoryWeeklyCap: boolean;
  statutoryWeeklyCap: number;
  enhancedRedundancyPay: number;
  annualSalary: number; // For marginal tax rate determination on excess over £30k
  region: TaxRegion;
  taxYear: TaxYear;
  taxCode: string;
  studentLoanPlan: StudentLoanPlan;
}

export interface RedundancyPayResult {
  age: number;
  yearsOfService: number;
  actualWeeklyPay: number;
  effectiveWeeklyPay: number;
  statutoryWeeklyCap: number;

  // Breakdown of statutory calculation by age bands
  serviceBreakdown: {
    yearsUnder22: number;
    weeksUnder22: number;
    payUnder22: number;
    yearsBetween22And40: number;
    weeksBetween22And40: number;
    payBetween22And40: number;
    yearsOver41: number;
    weeksOver41: number;
    payOver41: number;
    totalStatutoryWeeks: number;
  };

  statutoryRedundancyPay: number;
  enhancedRedundancyPay: number;
  totalGrossRedundancyPay: number;

  taxFreeThreshold: number; // £30,000
  taxFreeAmount: number;
  taxableExcess: number;

  // Tax calculations on excess
  incomeTaxOnExcess: number;
  employeeNiOnExcess: number; // 0 for redundancy pay
  employerClass1aNiOnExcess: number; // 15% (or 13.8%) paid by employer on excess over £30k
  studentLoanOnExcess: number;

  totalDeductions: number;
  netRedundancyPay: number;
  retentionPercentage: number;
  effectiveTaxRateOnRedundancy: number;

  // Marginal warnings
  crossesHigherRate: boolean;
  crossesAdditionalRate: boolean;
  crossesPersonalAllowanceTaper: boolean;
}

export type CouncilTaxBand = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type CouncilTaxCountry = 'england' | 'scotland' | 'wales';

export interface CouncilTaxInput {
  band: CouncilTaxBand;
  country: CouncilTaxCountry;
  adultCount: number; // 1 = 25% single occupant discount, 2+ = full
  hasDisabilityReduction: boolean;
  useCustomBandD: boolean;
  customBandD: number;
}

export interface CouncilTaxResult {
  band: CouncilTaxBand;
  country: CouncilTaxCountry;
  adultCount: number;
  effectiveBandD: number;
  isCustomRate: boolean;
  multiplier: number;
  multiplierLabel: string;
  grossAnnualCharge: number;
  singlePersonDiscountPercentage: number;
  singlePersonDiscountAmount: number;
  netAnnualCouncilTax: number;
  monthly10Months: number;
  monthly12Months: number;
  weeklyEstimate: number;
  valuationBandRange: string;
  allBandsComparison: {
    band: CouncilTaxBand;
    valuation: string;
    annualGross: number;
    annualNet: number;
    monthly10: number;
    isCurrentBand: boolean;
  }[];
}

export interface OutsideIr35Result {
  turnoverAnnual: number;
  allowableExpenses: number;
  directorSalary: number;
  taxableCompanyProfit: number;
  corporationTaxAnnual: number;
  corporationTaxEffectiveRate: number;
  postTaxProfitAvailableForDividends: number;
  dividendAllowanceUsed: number;
  dividendTaxBasicRate: number;
  dividendTaxHigherRate: number;
  dividendTaxAdditionalRate: number;
  dividendTaxTotal: number;
  personalTaxOnSalary: number;
  totalPersonalTax: number;
  totalCombinedTax: number;
  netTakeHomeAnnual: number;
  netTakeHomeMonthly: number;
  netTakeHomeDaily: number;
  effectiveRetentionRate: number;
  effectiveTotalTaxRate: number;
}

export interface Ir35CompareInput {
  dayRate: number;
  workingDaysPerYear: number;
  taxCode?: string;
  region?: TaxRegion;
  taxYear?: string;
  umbrellaFeePerWeek?: number;
  pensionPercent?: number;
  directorSalary?: number;
  annualBusinessExpenses?: number;
}

export interface Ir35CompareResult {
  contractGrossAnnual: number;
  workingDaysPerYear: number;
  dayRate: number;
  inside: {
    contractGrossAnnual: number;
    umbrellaFeesAnnual: number;
    employerNiAnnual: number;
    apprenticeshipLevyAnnual: number;
    grossPayToWorkerAnnual: number;
    incomeTaxAnnual: number;
    employeeNiAnnual: number;
    employeePensionAnnual: number;
    totalDeductionsAnnual: number;
    netTakeHomeAnnual: number;
    netTakeHomeMonthly: number;
    netTakeHomeDaily: number;
    takeHomePercentage: number;
  };
  outside: OutsideIr35Result;
  comparison: {
    annualDifference: number;
    monthlyDifference: number;
    dailyDifference: number;
    retentionDifferencePercent: number;
    percentageGainByOutside: number;
  };
}

export interface FaqItem {

  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  label?: string;
  name?: string;
  path?: string;
  item?: string;
}

export type VatRate = 'standard' | 'reduced' | 'zero';
export type VatMode = 'add' | 'remove';

export interface VatInput {
  amount: number;
  vatRate: VatRate;
  mode: VatMode; // 'add' = add VAT to net, 'remove' = remove VAT from gross
}

export interface VatResult {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  vatRatePercent: number;
  vatRateLabel: string;
  mode: VatMode;
}

export type NetFrequency = 'annual' | 'monthly' | 'weekly';

export interface NetToGrossInput {
  desiredNet: number;
  netFrequency: NetFrequency;
  taxYear: TaxYear;
  region: TaxRegion;
  taxCode: string;
  pensionPercentage: number;
  pensionType: PensionType;
  studentLoanPlan: StudentLoanPlan;
}

export interface NetToGrossResult {
  grossAnnual: number;
  grossMonthly: number;
  grossWeekly: number;
  netAnnual: number;
  netMonthly: number;
  netWeekly: number;
  incomeTaxAnnual: number;
  incomeTaxMonthly: number;
  employeeNiAnnual: number;
  employeeNiMonthly: number;
  pensionAnnual: number;
  pensionMonthly: number;
  studentLoanAnnual: number;
  studentLoanMonthly: number;
  totalDeductionsAnnual: number;
  totalDeductionsMonthly: number;
  effectiveTaxRate: number;
  taxYear: TaxYear;
  region: TaxRegion;
}

export type MinimumWageAgeBand = 'under_18' | '18_to_20' | '21_and_over' | 'apprentice';
export type MinimumWagePayType = 'hourly' | 'annual' | 'monthly' | 'weekly';

export interface MinimumWageInput {
  ageBand: MinimumWageAgeBand;
  payType: MinimumWagePayType;
  hourlyRate: number;
  salaryAmount: number;
  hoursPerWeek: number;
  isApprentice: boolean;
  deductionsFromPay: number;
  deductionFrequency: 'weekly' | 'monthly' | 'hourly';
  taxYear: TaxYear;
}

export interface MinimumWageResult {
  applicableMinimumRate: number;
  effectiveGrossHourlyRate: number;
  effectiveHourlyRateAfterDeductions: number;
  isCompliant: boolean;
  hourlyDifference: number; // positive = surplus, negative = shortfall
  hourlyShortfall: number;
  weeklyShortfall: number;
  monthlyShortfall: number;
  annualShortfall: number;
  weeklyGrossPay: number;
  monthlyGrossPay: number;
  annualGrossPay: number;
  statutoryWeeklyMinimum: number;
  statutoryAnnualMinimum: number;
  ageBandLabel: string;
  taxYear: TaxYear;
}

export type NmwAgeGroup = 'nlw' | 'age18to20' | 'age16to17' | 'apprentice';

export interface NmwInput {
  currentHourlyRate: number;
  ageGroup: NmwAgeGroup;
  hoursPerWeek: number;
  taxYear: TaxYear;
  includesAccommodation: boolean;
  accommodationChargePerDay: number;
  daysAccommodationPerWeek: number;
}

export interface NmwResult {
  minimumRate: number;
  currentRate: number;
  effectiveRate: number;          // after accommodation offset adjustment
  isCompliant: boolean;
  shortfallPerHour: number;       // 0 if compliant
  surplusPerHour: number;         // 0 if not compliant
  shortfallPerWeek: number;
  shortfallPerYear: number;
  minimumWeeklyPay: number;
  currentWeeklyPay: number;
  minimumAnnualPay: number;
  currentAnnualPay: number;
  ageGroupLabel: string;
  taxYearLabel: string;
  accommodationOffsetApplied: number;
  accommodationAdjustmentPerHour: number;
}

export type MaternityLeaveType = 'maternity' | 'paternity' | 'adoption' | 'shared_parental';

export interface MaternityInput {
  leaveType: MaternityLeaveType;
  grossWeeklySalary: number;    // Average weekly earnings (AWE)
  taxYear: TaxYear;
  enhancedPayWeeks: number;     // Employer enhanced pay weeks (0 if none)
  enhancedPayPercent: number;   // % of salary during enhanced weeks (e.g. 100 = full pay)
  sharedParentalWeeks: number;  // Only used if leaveType === 'shared_parental'
}

export interface MaternityWeekBreakdown {
  weekRange: string;
  weeks: number;
  weeklyAmount: number;
  totalAmount: number;
  type: 'enhanced' | 'higher_smp' | 'flat_smp' | 'spp' | 'sap' | 'shpp' | 'unpaid';
  label: string;
}

export interface MaternityResult {
  leaveType: MaternityLeaveType;
  grossWeeklySalary: number;
  averageWeeklyEarnings: number;
  isEligible: boolean;
  lowerEarningsLimit: number;
  totalLeaveWeeks: number;
  totalPaidWeeks: number;
  unpaidWeeks: number;
  totalPayAmount: number;
  totalMonthlyEquivalent: number;
  weeklyBreakdown: MaternityWeekBreakdown[];
  taxYearLabel: string;
  flatWeeklyRate: number;
  higherWeeklyAmount: number;
}

export interface ChildBenefitInput {
  numberOfChildren: number;
  higherEarnerIncome: number;    // Adjusted Net Income of higher earner
  taxYear: TaxYear;
  partnerIncome?: number;        // Optional: partner income for context only
  claimingBenefit: boolean;      // Are they currently claiming?
}

export interface ChildBenefitResult {
  numberOfChildren: number;
  firstChildWeeklyRate: number;
  additionalChildWeeklyRate: number;
  totalWeeklyBenefit: number;
  totalMonthlyBenefit: number;
  totalAnnualBenefit: number;
  higherEarnerIncome: number;
  hicbcThreshold: number;
  hicbcTaperEnd: number;
  isAboveThreshold: boolean;
  isAboveTaperEnd: boolean;
  hicbcAnnual: number;           // High Income Child Benefit Charge
  hicbcMonthly: number;
  netAnnualBenefit: number;      // Annual benefit minus HICBC
  netMonthlyBenefit: number;
  chargePercent: number;         // % of benefit clawed back (0-100)
  effectiveHourlyLoss: number;   // HICBC as % of income above threshold
  recommendation: 'claim_full' | 'claim_aware' | 'opt_out_consider' | 'opt_out';
  recommendationText: string;
  taxYearLabel: string;
}

export interface SickPayInput {
  averageWeeklyEarnings: number;       // Gross AWE to test LEL threshold
  qualifyingDaysOff: number;           // Total qualifying working days missed
  qualifyingDaysPerWeek?: number;      // Contracted days worked per week (default 5, 1-7)
  isLinkedPeriod: boolean;             // Within 8 weeks of previous sickness PIW
  occupationalWeeklyPay?: number;      // Optional contractual / occupational sick pay (£/wk)
  taxYear?: TaxYear;
}

export interface SickPayResult {
  averageWeeklyEarnings: number;
  qualifyingDaysOff: number;
  qualifyingDaysPerWeek: number;
  isLinkedPeriod: boolean;
  isEligible: boolean;
  ineligibilityReason?: string;
  lowerEarningsLimit: number;
  weeklySspRate: number;
  dailySspRate: number;
  waitingDays: number;
  payableDays: number;
  payableWeeks: number;
  maxPayableDays: number;
  isMaxWeeksExceeded: boolean;
  totalSspAmount: number;
  occupationalWeeklyPay: number;
  occupationalDailyPay: number;
  totalOccupationalAmount: number;
  isOccupationalHigher: boolean;
  recommendedPayAmount: number;
  taxYearLabel: string;
}

export interface MarriageAllowanceInput {
  lowerEarnerIncome: number;
  higherEarnerIncome: number;
  lowerEarnerRegion?: TaxRegion;
  higherEarnerRegion?: TaxRegion;
  taxYear?: TaxYear;
}

export interface PersonTaxSummary {
  income: number;
  region: TaxRegion;
  personalAllowanceBefore: number;
  personalAllowanceAfter: number;
  taxBefore: number;
  taxAfter: number;
  taxDifference: number; // positive = extra tax paid, negative = tax saved
  taxCodeBefore: string;
  taxCodeAfter: string;
  isHigherRateTaxpayer: boolean;
}

export interface MarriageAllowanceResult {
  isEligible: boolean;
  ineligibilityReason?: string;
  transferAmount: number; // £1,260
  lowerEarner: PersonTaxSummary;
  higherEarner: PersonTaxSummary;
  lowerEarnerExtraTax: number; // Extra tax paid by lower earner (>= 0)
  higherEarnerTaxSaving: number; // Tax saved by higher earner (>= 0)
  netHouseholdSaving: number; // Net household annual tax saving
  maxPotentialSaving: number; // Maximum standard saving (£252)
  backdated4YearsSavingEstimate: number; // Total potential saving across 5 years (current + 4 backdated)
  taxYearLabel: string;
}

export interface SecondJobInput {
  mainJobSalary: number;
  secondJobSalary: number;
  taxYear?: TaxYear;
  region?: TaxRegion;
  personalAllowanceAppliedToMain?: boolean;
}

export interface JobTaxBreakdown {
  salary: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  nationalInsurance: number;
  takeHomePay: number;
  monthlyTakeHome: number;
  weeklyTakeHome: number;
  effectiveTaxRate: number;
  suggestedTaxCode: string;
}

export interface SecondJobResult {
  mainJob: JobTaxBreakdown;
  secondJob: JobTaxBreakdown;
  combined: {
    totalGrossSalary: number;
    totalPersonalAllowance: number;
    totalTaxableIncome: number;
    totalIncomeTax: number;
    totalNationalInsurance: number;
    totalTakeHomePay: number;
    monthlyTakeHome: number;
    weeklyTakeHome: number;
    overallEffectiveTaxRate: number;
    marginalTaxRate: number;
  };
  hasHigherRateWarning: boolean;
  hasPersonalAllowanceTaperWarning: boolean;
  hasPersonalAllowanceLossWarning: boolean;
  unusedAllowanceTransferred: number;
  isScottish: boolean;
  taxYearLabel: string;
}

export interface SalaryComparisonScenario {
  id: string;
  label: string;
  grossSalary: number;
  pensionPercentage?: number;
  studentLoanPlan?: StudentLoanPlan;
}

export interface SalaryComparisonInput {
  scenarios: SalaryComparisonScenario[];
  taxYear?: TaxYear;
  region?: TaxRegion;
  taxCode?: string;
  pensionType?: PensionType;
}

export interface SalaryComparisonResultItem {
  id: string;
  label: string;
  grossSalary: number;
  takeHomeAnnual: number;
  takeHomeMonthly: number;
  takeHomeWeekly: number;
  takeHomeDaily: number;
  takeHomeHourly: number;
  incomeTaxAnnual: number;
  employeeNiAnnual: number;
  pensionAnnual: number;
  studentLoanAnnual: number;
  totalDeductionsAnnual: number;
  effectiveTaxRate: number;
  marginalTaxRate?: number;
  diffAnnualFromBaseline: number;
  diffMonthlyFromBaseline: number;
  diffGrossFromBaseline: number;
  retentionRateFromBaseline: number; // % of extra gross that becomes net
}

export interface SalaryComparisonResult {
  items: SalaryComparisonResultItem[];
  baselineId: string;
  taxYearLabel: string;
}

export interface PayFrequencyConversionItem {
  frequency: 'annual' | 'monthly' | '4weekly' | 'fortnightly' | 'weekly' | 'daily' | 'hourly';
  label: string;
  gross: number;
  net: number;
  incomeTax: number;
  nationalInsurance: number;
  pension: number;
  studentLoan: number;
}

// 1. Income Tax Calculator Types
export interface IncomeTaxInput {
  annualEmploymentIncome: number;
  bonus?: number;
  otherTaxableIncome?: number;
  region: TaxRegion;
  taxCode?: string;
  pensionContribution: number;
  pensionType: PensionType;
  salarySacrificeAmount?: number;
  taxYear: TaxYear;
  isBlindAllowance?: boolean;
  isMarriageAllowance?: boolean;
}

export interface IncomeTaxResult {
  grossTotal: number;
  salarySacrifice: number;
  adjustedGross: number;
  pensionReliefDeduction: number;
  personalAllowance: number;
  personalAllowanceTaperLoss: number;
  taxableIncome: number;
  incomeTaxAnnual: number;
  incomeTaxMonthly: number;
  incomeTaxWeekly: number;
  incomeTaxDaily: number;
  effectiveRate: number;
  marginalRate: number;
  taxBands: TaxBandBreakdown[];
  taxYearLabel: string;
  regionLabel: string;
}

// 2. National Insurance Calculator Types
export interface NationalInsuranceInput {
  grossPay: number;
  payFrequency: PayFrequency;
  isDirector?: boolean;
  directorMethod?: 'annual' | 'alternative';
  taxYear: TaxYear;
  salarySacrifice?: number;
  niCategory?: 'A' | 'B' | 'C' | 'H' | 'M' | 'J';
}

export interface NationalInsuranceResult {
  grossPayAnnual: number;
  grossPayPeriod: number;
  employeeNiAnnual: number;
  employeeNiMonthly: number;
  employeeNiWeekly: number;
  employeeNiDaily: number;
  employerNiAnnual?: number;
  effectiveNiRate: number;
  niBands: NiBandBreakdown[];
  payFrequency: PayFrequency;
  taxYearLabel: string;
  categoryLabel: string;
}

// 3. Tax Code Calculator Types
export interface TaxCodeInput {
  taxCode: string;
  region?: TaxRegion;
  annualSalary?: number;
  taxYear?: TaxYear;
}

export interface TaxCodeResult {
  rawCode: string;
  prefix: string;
  numericPart: number;
  suffix: string;
  isScottish: boolean;
  isWelsh: boolean;
  estimatedPersonalAllowance: number;
  allowanceExplanation: string;
  codeMeaning: string;
  codeCategory: 'standard' | 'marriage' | 'emergency' | 'special_rate' | 'k_code' | 'nt' | 'other';
  isValid: boolean;
  warnings: string[];
  taxImpactEstimated?: {
    incomeTaxAnnual: number;
    monthlyAllowance: number;
    effectiveRate: number;
  };
}

// 4. Employer National Insurance Calculator Types
export interface EmployerNiInput {
  grossSalary: number;
  bonus?: number;
  employerPensionPercentage?: number;
  employerPensionFixed?: number;
  applyEmploymentAllowance?: boolean;
  existingEmploymentAllowanceUsed?: number;
  taxYear: TaxYear;
}

export interface EmployerNiResult {
  grossPay: number;
  secondaryThreshold: number;
  grossSubjectToNi: number;
  employerNiAnnual: number;
  employerNiMonthly: number;
  employerNiWeekly: number;
  employerPensionAnnual: number;
  employerPensionMonthly: number;
  employmentAllowanceApplied: number;
  netEmployerNi: number;
  totalCostOfEmploymentAnnual: number;
  totalCostOfEmploymentMonthly: number;
  totalCostOfEmploymentWeekly: number;
  overheadPercentage: number;
  employerNiRate: number;
  taxYearLabel: string;
}

// 5. Dividend Tax Calculator Types
export interface DividendTaxInput {
  dividendIncome: number;
  otherTaxableIncome: number;
  region?: TaxRegion;
  taxYear: TaxYear;
  pensionContribution?: number;
}

export interface DividendTaxResult {
  totalIncome: number;
  otherIncome: number;
  dividendIncome: number;
  personalAllowanceTotal: number;
  personalAllowanceUsedOther: number;
  personalAllowanceRemainingForDividends: number;
  dividendAllowanceUsed: number;
  taxableDividends: number;
  basicBandDividends: number;
  higherBandDividends: number;
  additionalBandDividends: number;
  dividendTaxBasic: number;
  dividendTaxHigher: number;
  dividendTaxAdditional: number;
  totalDividendTax: number;
  effectiveDividendTaxRate: number;
  incomeTaxOnOtherIncome: number;
  overallTotalTax: number;
  overallTakeHome: number;
  taxYearLabel: string;
}

// 6. Mortgage Calculator Types
export type MortgageRepaymentType = 'repayment' | 'interest_only';

export interface MortgageInput {
  propertyPrice: number;
  depositAmount: number;
  isDepositPercentage?: boolean;
  depositPercentage?: number;
  termYears: number;
  interestRate: number;
  repaymentType: MortgageRepaymentType;
  feesAddedToLoan?: number;
  monthlyOverpayment?: number;
}

export interface MortgageYearScheduleItem {
  year: number;
  startBalance: number;
  totalPaidYear: number;
  principalPaidYear: number;
  interestPaidYear: number;
  endBalance: number;
  loanToValue: number;
}

export interface MortgageResult {
  propertyPrice: number;
  depositAmount: number;
  loanAmount: number;
  loanToValue: number;
  monthlyPayment: number;
  annualPayment: number;
  totalInterest: number;
  totalRepaid: number;
  repaymentType: MortgageRepaymentType;
  termYears: number;
  interestRate: number;
  overpaymentImpact?: {
    monthlyPaymentWithOverpayment: number;
    newTermYears: number;
    newTermMonths: number;
    totalInterestSaved: number;
    yearsSaved: number;
    monthsSaved: number;
    newTotalInterest: number;
  };
  schedule: MortgageYearScheduleItem[];
}

// 7. Mortgage Affordability Calculator Types
export interface MortgageAffordabilityInput {
  applicant1Income: number;
  applicant2Income?: number;
  depositAmount: number;
  monthlyDebtPayments?: number;
  monthlyChildcare?: number;
  monthlyOtherCommitments?: number;
  interestRate?: number;
  termYears?: number;
  incomeMultiple?: number;
}

export interface MortgageBorrowingEstimateItem {
  multiple: number;
  label: string;
  maxBorrowing: number;
  maxPropertyPrice: number;
  monthlyRepaymentEstimate: number;
  category: string;
}

export interface MortgageAffordabilityResult {
  totalGrossIncome: number;
  applicant1Income: number;
  applicant2Income: number;
  totalMonthlyCommitments: number;
  annualisedCommitments: number;
  netAdjustedIncome: number;
  depositAmount: number;
  borrowingEstimates: MortgageBorrowingEstimateItem[];
  selectedMultiple: number;
  indicativeMaxBorrowing: number;
  indicativeMaxPropertyPrice: number;
  estimatedMonthlyPayment: number;
  debtToIncomeRatio: number;
  commitmentsWarning?: string;
}

// 8. ISA Calculator Types
export type IsaType = 'cash_isa' | 'stocks_and_shares_isa' | 'lifetime_isa' | 'general';

export interface IsaInput {
  currentBalance: number;
  monthlyContribution: number;
  annualLumpSum?: number;
  timePeriodYears: number;
  annualGrowthRate: number;
  annualInflationRate?: number;
  isaType: IsaType;
  taxYear?: TaxYear;
}

export interface IsaYearProjection {
  year: number;
  startingBalance: number;
  contributionsYear: number;
  totalContributionsToDate: number;
  growthYear: number;
  totalGrowthToDate: number;
  endingBalance: number;
  inflationAdjustedBalance?: number;
}

export interface IsaResult {
  currentBalance: number;
  totalContributions: number;
  totalGrowth: number;
  projectedEndingBalance: number;
  inflationAdjustedEndingBalance?: number;
  annualAllowance: number;
  totalAnnualContribution: number;
  isWithinAnnualAllowance: boolean;
  allowanceRemaining: number;
  lisaBonusTotal?: number;
  projectionTable: IsaYearProjection[];
  isaType: IsaType;
  assumedGrowthRate: number;
  assumedInflationRate: number;
}

// 9. Savings Calculator Types
export type SavingsCompoundingFrequency = 'monthly' | 'annually';

export interface SavingsInput {
  startingBalance: number;
  monthlyDeposit: number;
  annualInterestRate: number;
  compoundingFrequency: SavingsCompoundingFrequency;
  periodYears: number;
  annualInflationRate?: number;
}

export interface SavingsYearProjection {
  year: number;
  startingBalance: number;
  totalDepositsYear: number;
  totalDepositsToDate: number;
  interestEarnedYear: number;
  totalInterestToDate: number;
  endingBalance: number;
  inflationAdjustedBalance?: number;
}

export interface SavingsResult {
  startingBalance: number;
  totalDeposits: number;
  totalInterestEarned: number;
  finalBalance: number;
  inflationAdjustedBalance?: number;
  effectiveApy: number;
  projectionTable: SavingsYearProjection[];
  personalSavingsAllowanceGuidance: {
    basicRateAllowance: number;
    higherRateAllowance: number;
    additionalRateAllowance: number;
  };
}

// 10. Capital Gains Tax Calculator Types
export type CgtAssetType = 'shares' | 'residential_property' | 'commercial_property' | 'other_asset';

export interface CgtInput {
  assetType: CgtAssetType;
  saleProceeds: number;
  purchasePrice: number;
  purchaseCosts?: number;
  saleCosts?: number;
  improvementCosts?: number;
  previousLosses?: number;
  otherTaxableIncome?: number;
  region?: TaxRegion;
  taxYear: TaxYear;
  isMainResidenceExempt?: boolean;
}

export interface CgtResult {
  assetType: CgtAssetType;
  saleProceeds: number;
  totalCost: number;
  allowableCosts: number;
  grossGain: number;
  lossesApplied: number;
  netGainBeforeAllowance: number;
  annualExemptAmountApplied: number;
  annualExemptAmountRemaining: number;
  taxableGain: number;
  basicBandRemaining: number;
  gainInBasicBand: number;
  gainInHigherBand: number;
  basicBandRate: number;
  higherBandRate: number;
  cgtBasicBand: number;
  cgtHigherBand: number;
  totalCgtPayable: number;
  effectiveCgtRate: number;
  taxYearLabel: string;
  isFullyExempt: boolean;
  exclusionsSummary: string[];
}

// 11. Stamp Duty Land Tax (SDLT) Types
export type BuyerType = 'standard' | 'first_time_buyer' | 'additional_property';

export interface StampDutyInput {
  propertyPrice: number;
  buyerType: BuyerType;
  isNonUkResident?: boolean;
  taxYearKey?: string;
}

export interface StampDutyBandBreakdown {
  bandName: string;
  min: number;
  max: number;
  ratePercent: number;
  taxableInBand: number;
  taxInBand: number;
}

export interface StampDutyResult {
  propertyPrice: number;
  buyerType: BuyerType;
  isNonUkResident: boolean;
  totalStampDuty: number;
  effectiveRate: number;
  bandsBreakdown: StampDutyBandBreakdown[];
  surchargeAmount: number;
  nonUkSurchargeAmount: number;
  ftbReliefApplied: boolean;
  ftbReliefSavings: number;
  taxYearLabel: string;
}

// 12. Mortgage Overpayment Calculator Types
export interface MortgageOverpaymentInput {
  currentBalance: number;
  interestRate: number;
  remainingTermYears: number;
  remainingTermMonths?: number;
  monthlyOverpayment: number;
  lumpSumOverpayment?: number;
  lumpSumMonth?: number;
}

export interface MortgageOverpaymentYearItem {
  year: number;
  standardBalance: number;
  overpaymentBalance: number;
  standardInterestPaidYear: number;
  overpaymentInterestPaidYear: number;
  interestSavedYear: number;
}

export interface MortgageOverpaymentResult {
  currentBalance: number;
  interestRate: number;
  originalTermYears: number;
  originalTermMonths: number;
  monthlyPaymentStandard: number;
  totalPaymentMonthlyWithOverpayment: number;
  monthlyOverpayment: number;
  lumpSumOverpayment: number;
  
  // Standard (No Overpayment)
  totalInterestStandard: number;
  totalCostStandard: number;
  
  // With Overpayment
  totalInterestWithOverpayment: number;
  totalCostWithOverpayment: number;
  
  // Savings & Impact
  totalInterestSaved: number;
  newTermYears: number;
  newTermMonths: number;
  yearsSaved: number;
  monthsSaved: number;
  
  schedule: MortgageOverpaymentYearItem[];
}

// 13. Credit Card Repayment Calculator Types
export type RepaymentStrategy = 'minimum_only' | 'fixed_monthly' | 'target_months';

export interface CreditCardRepaymentInput {
  currentBalance: number;
  annualInterestRate: number; // APR %
  strategy: RepaymentStrategy;
  fixedMonthlyPayment?: number;
  targetMonths?: number;
}

export interface CreditCardMonthItem {
  month: number;
  startingBalance: number;
  interestCharged: number;
  repaymentAmount: number;
  principalPaid: number;
  endingBalance: number;
}

export interface CreditCardRepaymentResult {
  currentBalance: number;
  apr: number;
  strategy: RepaymentStrategy;
  monthlyRepayment: number;
  totalMonthsToPayoff: number;
  totalYearsToPayoff: number;
  totalInterestPaid: number;
  totalRepaymentCost: number;
  minPaymentComparison?: {
    totalMonths: number;
    totalInterest: number;
    totalCost: number;
    interestSaved: number;
    monthsSaved: number;
  };
  schedule: CreditCardMonthItem[];
  isRepaymentTooLow: boolean;
  warningMessage?: string;
}




