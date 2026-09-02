/**
 * PayWise UK - Pure Calculation Engine
 * 
 * Contains all formulas, tax band computations, student loan deductions,
 * National Insurance schedules, pension compound math, and public sector calculators.
 */

import {
  DEFAULT_TAX_YEAR,
  UK_TAX_CONFIGS,
  NHS_PAY_BANDS,
  NHS_HCAS,
  NHS_PENSION_TIERS,
  TEACHER_PAY_SCALES,
  TEACHERS_PENSION_TIERS,
} from '../config/taxConfig';
import { UK_NATIONAL_INSURANCE_CONFIGS } from '../config/nationalInsuranceConfig';
import { UK_DIVIDEND_TAX_CONFIGS } from '../config/dividendTaxConfig';
import { UK_CAPITAL_GAINS_TAX_CONFIGS } from '../config/capitalGainsTaxConfig';
import { UK_ISA_CONFIGS } from '../config/isaConfig';
import { UK_MORTGAGE_CONFIG } from '../config/mortgageConfig';
import { UK_STAMP_DUTY_CONFIGS } from '../config/stampDutyConfig';
import { UK_CREDIT_CARD_APR_PROFILES, UK_CREDIT_CARD_RULES } from '../config/creditCardConfig';
import {
  TakeHomeInput,
  TakeHomeResult,
  TaxBandBreakdown,
  NiBandBreakdown,
  DayRateInput,
  DayRateResult,
  HourlyRateInput,
  HourlyRateResult,
  PensionCompoundInput,
  PensionCompoundResult,
  PensionYearProjection,
  StudentLoanInput,
  StudentLoanResult,
  SalarySacrificeInput,
  SalarySacrificeResult,
  OvertimeInput,
  OvertimeResult,
  NhsInput,
  NhsResult,
  TeacherInput,
  TeacherResult,
  InsideIr35Input,
  InsideIr35Result,
  UmbrellaInput,
  UmbrellaResult,
  SelfEmployedInput,
  SelfEmployedResult,
  PayRiseInput,
  PayRiseResult,
  BonusTaxInput,
  BonusTaxResult,
  RedundancyPayInput,
  RedundancyPayResult,
  CouncilTaxInput,
  CouncilTaxResult,
  OutsideIr35Result,
  Ir35CompareInput,
  Ir35CompareResult,
  VatInput,
  VatResult,
  VatRate,
  NetToGrossInput,
  NetToGrossResult,
  MinimumWageInput,
  MinimumWageResult,
  NmwAgeGroup,
  NmwInput,
  NmwResult,
  MaternityInput,
  MaternityResult,
  MaternityWeekBreakdown,
  MaternityLeaveType,
  ChildBenefitInput,
  ChildBenefitResult,
  SickPayInput,
  SickPayResult,
  MarriageAllowanceInput,
  MarriageAllowanceResult,
  PersonTaxSummary,
  SecondJobInput,
  SecondJobResult,
  JobTaxBreakdown,
  SalaryComparisonInput,
  SalaryComparisonResult,
  SalaryComparisonResultItem,
  PayFrequencyConversionItem,
  IncomeTaxInput,
  IncomeTaxResult,
  NationalInsuranceInput,
  NationalInsuranceResult,
  TaxCodeInput,
  TaxCodeResult,
  EmployerNiInput,
  EmployerNiResult,
  DividendTaxInput,
  DividendTaxResult,
  MortgageInput,
  MortgageResult,
  MortgageYearScheduleItem,
  MortgageAffordabilityInput,
  MortgageAffordabilityResult,
  MortgageBorrowingEstimateItem,
  IsaInput,
  IsaResult,
  IsaYearProjection,
  SavingsInput,
  SavingsResult,
  SavingsYearProjection,
  CgtInput,
  CgtResult,
  StampDutyInput,
  StampDutyResult,
  StampDutyBandBreakdown,
  BuyerType,
  MortgageOverpaymentInput,
  MortgageOverpaymentResult,
  MortgageOverpaymentYearItem,
  CreditCardRepaymentInput,
  CreditCardRepaymentResult,
  CreditCardMonthItem,
  StudentLoanPlan,
  TaxRegion,
  TaxYear,
} from '../types';
import {
  COUNCIL_TAX_BANDS,
  COUNCIL_TAX_BAND_D_AVERAGES,
  CORPORATION_TAX_SMALL_PROFITS_RATE,
  CORPORATION_TAX_MAIN_RATE,
  CORPORATION_TAX_LOWER_THRESHOLD,
  CORPORATION_TAX_UPPER_THRESHOLD,
  CORPORATION_TAX_MARGINAL_FRACTION,
  DIVIDEND_ALLOWANCE,
  DIVIDEND_TAX_RATES,
  OPTIMAL_DIRECTOR_SALARY_DEFAULT,
  NATIONAL_MINIMUM_WAGE_RATES,
} from './taxThresholds';

/**
 * Parses UK Tax Code to determine effective personal allowance & special tax regimes
 */
export function parseTaxCode(codeStr: string, defaultAllowance: number): {
  personalAllowance: number;
  isScotland: boolean;
  isWales: boolean;
  isSpecialRate: 'BR' | 'D0' | 'D1' | 'NT' | '0T' | null;
  isNegativeAllowance: boolean;
} {
  const code = (codeStr || '1257L').trim().toUpperCase();
  const isScotland = code.startsWith('S');
  const isWales = code.startsWith('C');
  const cleanCode = isScotland || isWales ? code.substring(1) : code;

  if (cleanCode === 'BR') {
    return { personalAllowance: 0, isScotland, isWales, isSpecialRate: 'BR', isNegativeAllowance: false };
  }
  if (cleanCode === 'D0') {
    return { personalAllowance: 0, isScotland, isWales, isSpecialRate: 'D0', isNegativeAllowance: false };
  }
  if (cleanCode === 'D1') {
    return { personalAllowance: 0, isScotland, isWales, isSpecialRate: 'D1', isNegativeAllowance: false };
  }
  if (cleanCode === 'NT') {
    return { personalAllowance: 0, isScotland, isWales, isSpecialRate: 'NT', isNegativeAllowance: false };
  }
  if (cleanCode === '0T') {
    return { personalAllowance: 0, isScotland, isWales, isSpecialRate: '0T', isNegativeAllowance: false };
  }

  // Handle K codes (Negative tax allowance)
  if (cleanCode.startsWith('K')) {
    const numPart = parseInt(cleanCode.substring(1), 10);
    const negativeAllowance = !isNaN(numPart) ? numPart * 10 : 0;
    return { personalAllowance: negativeAllowance, isScotland, isWales, isSpecialRate: null, isNegativeAllowance: true };
  }

  // Standard numeric codes (e.g., 1257L, 1100T, 1383M, 1131N)
  const match = cleanCode.match(/^(\d+)([A-Z]?)$/);
  if (match) {
    const numVal = parseInt(match[1], 10);
    const suffix = match[2];
    let allowance = numVal * 10;
    if (suffix === 'M') {
      allowance = defaultAllowance + 1260;
    } else if (suffix === 'N') {
      allowance = defaultAllowance - 1260;
    }
    return { personalAllowance: allowance, isScotland, isWales, isSpecialRate: null, isNegativeAllowance: false };
  }

  return { personalAllowance: defaultAllowance, isScotland, isWales, isSpecialRate: null, isNegativeAllowance: false };
}

/**
 * Calculates Scottish Devolved Income Tax on taxable pay
 */
export function calculateScottishIncomeTax(
  taxablePay: number,
  scotlandTaxBands: Array<{ name: string; thresholdMin: number; thresholdMax: number; rate: number }>
): { totalTax: number; bands: TaxBandBreakdown[] } {
  const starterWidth = (scotlandTaxBands[1]?.thresholdMax || 15397) - (scotlandTaxBands[1]?.thresholdMin || 12570);
  const basicWidth = (scotlandTaxBands[2]?.thresholdMax || 27491) - (scotlandTaxBands[2]?.thresholdMin || 15397);
  const interWidth = (scotlandTaxBands[3]?.thresholdMax || 43662) - (scotlandTaxBands[3]?.thresholdMin || 27491);
  const higherWidth = (scotlandTaxBands[4]?.thresholdMax || 75000) - (scotlandTaxBands[4]?.thresholdMin || 43662);
  const advancedTaxableLimit = 125140 - 12570;
  const priorWidths = starterWidth + basicWidth + interWidth + higherWidth;
  const advancedWidth = Math.max(0, advancedTaxableLimit - priorWidths);

  const scotBands = [
    { name: 'Starter Rate (19%)', width: starterWidth, rate: 0.19 },
    { name: 'Basic Rate (20%)', width: basicWidth, rate: 0.20 },
    { name: 'Intermediate Rate (21%)', width: interWidth, rate: 0.21 },
    { name: 'Higher Rate (42%)', width: higherWidth, rate: 0.42 },
    { name: 'Advanced Rate (45%)', width: advancedWidth, rate: 0.45 },
    { name: 'Top Rate (48%)', width: Infinity, rate: 0.48 },
  ];

  let totalTax = 0;
  const bands: TaxBandBreakdown[] = [];
  let remainingTaxable = taxablePay;

  for (const b of scotBands) {
    if (remainingTaxable <= 0) break;
    const inThisBand = Math.min(remainingTaxable, b.width);
    const taxInBand = inThisBand * b.rate;
    totalTax += taxInBand;
    bands.push({ name: b.name, rate: b.rate, taxableAmount: inThisBand, taxPaid: taxInBand });
    remainingTaxable -= inThisBand;
  }

  return { totalTax, bands };
}

/**
 * Calculates rUK (England, Wales, NI) Income Tax on taxable pay
 */
export function calculateRukIncomeTax(
  taxablePay: number,
  rUKTaxBands: Array<{ name: string; thresholdMin: number; thresholdMax: number; rate: number }>
): { totalTax: number; bands: TaxBandBreakdown[] } {
  const basicWidth = (rUKTaxBands[1]?.thresholdMax || 50270) - (rUKTaxBands[1]?.thresholdMin || 12570);
  const higherWidth = (rUKTaxBands[2]?.thresholdMax || 125140) - (rUKTaxBands[2]?.thresholdMin || 50270);

  const rukBands = [
    { name: rUKTaxBands[1]?.name || 'Basic Rate (20%)', width: basicWidth, rate: rUKTaxBands[1]?.rate ?? 0.20 },
    { name: rUKTaxBands[2]?.name || 'Higher Rate (40%)', width: higherWidth, rate: rUKTaxBands[2]?.rate ?? 0.40 },
    { name: rUKTaxBands[3]?.name || 'Additional Rate (45%)', width: Infinity, rate: rUKTaxBands[3]?.rate ?? 0.45 },
  ];

  let totalTax = 0;
  const bands: TaxBandBreakdown[] = [];
  let remainingTaxable = taxablePay;

  for (const b of rukBands) {
    if (remainingTaxable <= 0) break;
    const inThisBand = Math.min(remainingTaxable, b.width);
    const taxInBand = inThisBand * b.rate;
    totalTax += taxInBand;
    bands.push({ name: b.name, rate: b.rate, taxableAmount: inThisBand, taxPaid: taxInBand });
    remainingTaxable -= inThisBand;
  }

  return { totalTax, bands };
}

/**
 * Calculates Full UK Take-Home Pay
 */
export function calculateTakeHomePay(input: TakeHomeInput): TakeHomeResult {
  const config = UK_TAX_CONFIGS[input.taxYear] || UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];
  
  // 1. Annual Gross Income
  let baseGross = input.grossSalary;
  if (input.payFrequency === 'monthly') baseGross = input.grossSalary * 12;
  if (input.payFrequency === 'weekly') baseGross = input.grossSalary * 52;

  const totalGross = Math.max(0, baseGross + (input.bonus || 0) + (input.overtime || 0) + (input.otherTaxableIncome || 0));
  const annualSalarySacrifice = Math.max(0, (input.salarySacrificeMonthly || 0) * 12);

  // 2. Parse Tax Code
  const parsedCode = parseTaxCode(input.taxCode, config.standardPersonalAllowance);
  const isScotland = input.region === 'scotland' || parsedCode.isScotland;
  const isWales = input.region === 'wales' || parsedCode.isWales;

  // 3. Pension Calculation
  let pensionAnnual = 0;
  let employerPensionAnnual = 0;
  let pensionTaxReliefAnnual = 0;

  const employeePensionPct = (input.pensionPercentage || 0) / 100;
  const employerPensionPct = (input.employerPensionPercentage || 0) / 100;
  const fixedPensionAnnual = (input.pensionFixedAmount || 0) * 12;

  if (input.pensionType === 'auto_enrolment') {
    // Qualifying earnings between lower and upper threshold
    const qualifyingEarnings = Math.max(0, Math.min(totalGross, config.autoEnrolment.upperThreshold) - config.autoEnrolment.lowerThreshold);
    pensionAnnual = qualifyingEarnings * employeePensionPct + fixedPensionAnnual;
    employerPensionAnnual = qualifyingEarnings * employerPensionPct;
  } else {
    // Unbanded gross earnings
    pensionAnnual = totalGross * employeePensionPct + fixedPensionAnnual;
    employerPensionAnnual = totalGross * employerPensionPct;
  }

  // 4. Adjustments based on Pension Type and Salary Sacrifice
  let grossForIncomeTax = totalGross - annualSalarySacrifice;
  let grossForNI = totalGross - annualSalarySacrifice;

  if (input.pensionType === 'salary_sacrifice') {
    grossForIncomeTax -= pensionAnnual;
    grossForNI -= pensionAnnual;
  } else if (input.pensionType === 'net_pay') {
    // Deducted before tax, but after NI
    grossForIncomeTax -= pensionAnnual;
  } else if (input.pensionType === 'relief_at_source') {
    // Basic rate tax relief is added into the pension pot automatically (20%)
    pensionTaxReliefAnnual = pensionAnnual * 0.25; // £80 net contribution gets £20 relief -> 20/80 = 25%
  }

  // 5. Personal Allowance Tapering (Income over £100k reduces allowance by £1 for every £2)
  let nominalAllowance = parsedCode.personalAllowance;
  if (input.isBlindAllowance) {
    nominalAllowance += config.blindPersonsAllowance;
  }
  if (input.isMarriageAllowance) {
    nominalAllowance += config.marriageAllowanceTransfer; // +£1,260
  }

  let allowanceApplied = nominalAllowance;
  let allowanceTaperLoss = 0;

  if (!parsedCode.isNegativeAllowance && parsedCode.isSpecialRate === null) {
    if (grossForIncomeTax > config.personalAllowanceTaperThreshold) {
      const excess = grossForIncomeTax - config.personalAllowanceTaperThreshold;
      allowanceTaperLoss = Math.min(nominalAllowance, Math.floor(excess / 2));
      allowanceApplied = Math.max(0, nominalAllowance - allowanceTaperLoss);
    }
  }

  // 6. Income Tax Calculation
  let totalIncomeTax = 0;
  const taxBands: TaxBandBreakdown[] = [];

  if (parsedCode.isSpecialRate === 'NT') {
    totalIncomeTax = 0;
  } else if (parsedCode.isSpecialRate === 'BR') {
    const rate = 0.20;
    totalIncomeTax = grossForIncomeTax * rate;
    taxBands.push({ name: 'Basic Rate (BR)', rate, taxableAmount: grossForIncomeTax, taxPaid: totalIncomeTax });
  } else if (parsedCode.isSpecialRate === 'D0') {
    const rate = isScotland ? 0.42 : 0.40;
    totalIncomeTax = grossForIncomeTax * rate;
    taxBands.push({ name: `Higher Rate (${(rate * 100).toFixed(0)}%)`, rate, taxableAmount: grossForIncomeTax, taxPaid: totalIncomeTax });
  } else if (parsedCode.isSpecialRate === 'D1') {
    const rate = isScotland ? 0.48 : 0.45;
    totalIncomeTax = grossForIncomeTax * rate;
    taxBands.push({ name: `Additional / Top Rate (${(rate * 100).toFixed(0)}%)`, rate, taxableAmount: grossForIncomeTax, taxPaid: totalIncomeTax });
  } else {
    // Standard progressive bands
    let taxablePay = Math.max(0, grossForIncomeTax - allowanceApplied);
    if (parsedCode.isNegativeAllowance) {
      taxablePay = grossForIncomeTax + parsedCode.personalAllowance; // K-code additions
    }

    if (isScotland) {
      // Scottish Tax System (Taxable income bands)
      // 2024/25: Starter (£0-£2,306), Basic (£2,306-£13,991), Intermediate (£13,991-£31,092), Higher (£31,092-£62,430), Advanced (£62,430-£125,140), Top (>£125,140)
      // 2025/26: Starter (£0-£2,827), Basic (£2,827-£14,921), Intermediate (£14,921-£31,092), Higher (£31,092-£62,430), Advanced (£62,430-£125,140), Top (>£125,140)
      const starterWidth = (config.scotlandTaxBands[1]?.thresholdMax || 15397) - (config.scotlandTaxBands[1]?.thresholdMin || 12570);
      const basicWidth = (config.scotlandTaxBands[2]?.thresholdMax || 27491) - (config.scotlandTaxBands[2]?.thresholdMin || 15397);
      const interWidth = (config.scotlandTaxBands[3]?.thresholdMax || 43662) - (config.scotlandTaxBands[3]?.thresholdMin || 27491);
      const higherWidth = (config.scotlandTaxBands[4]?.thresholdMax || 75000) - (config.scotlandTaxBands[4]?.thresholdMin || 43662);
      const advancedTaxableLimit = 125140;
      const priorWidths = starterWidth + basicWidth + interWidth + higherWidth;
      const advancedWidth = Math.max(0, advancedTaxableLimit - priorWidths);

      const scotBands = [
        { name: 'Starter Rate (19%)', width: starterWidth, rate: 0.19 },
        { name: 'Basic Rate (20%)', width: basicWidth, rate: 0.20 },
        { name: 'Intermediate Rate (21%)', width: interWidth, rate: 0.21 },
        { name: 'Higher Rate (42%)', width: higherWidth, rate: 0.42 },
        { name: 'Advanced Rate (45%)', width: advancedWidth, rate: 0.45 },
        { name: 'Top Rate (48%)', width: Infinity, rate: 0.48 },
      ];

      let remainingTaxable = taxablePay;
      for (const b of scotBands) {
        if (remainingTaxable <= 0) break;
        const inThisBand = Math.min(remainingTaxable, b.width);
        const taxInBand = inThisBand * b.rate;
        totalIncomeTax += taxInBand;
        taxBands.push({ name: b.name, rate: b.rate, taxableAmount: inThisBand, taxPaid: taxInBand });
        remainingTaxable -= inThisBand;
      }
    } else if (isWales) {
      // Welsh Rates of Income Tax (WRIT)
      const bands = config.walesTaxBands || config.rUKTaxBands;
      const basicWidth = (bands[1]?.thresholdMax || 50270) - (bands[1]?.thresholdMin || 12570);
      const higherWidth = (bands[2]?.thresholdMax || 125140) - (bands[2]?.thresholdMin || 50270);

      const welshBands = [
        { name: bands[1]?.name || 'Basic Rate (20%)', width: basicWidth, rate: bands[1]?.rate ?? 0.20 },
        { name: bands[2]?.name || 'Higher Rate (40%)', width: higherWidth, rate: bands[2]?.rate ?? 0.40 },
        { name: bands[3]?.name || 'Additional Rate (45%)', width: Infinity, rate: bands[3]?.rate ?? 0.45 },
      ];

      let remainingTaxable = taxablePay;
      for (const b of welshBands) {
        if (remainingTaxable <= 0) break;
        const inThisBand = Math.min(remainingTaxable, b.width);
        const taxInBand = inThisBand * b.rate;
        totalIncomeTax += taxInBand;
        taxBands.push({ name: b.name, rate: b.rate, taxableAmount: inThisBand, taxPaid: taxInBand });
        remainingTaxable -= inThisBand;
      }
    } else {
      // England, Northern Ireland (rUK Taxable income bands)
      // Basic rate: first £37,700 of taxable income at 20%
      // Higher rate: taxable income between £37,700 and £125,140 (£87,440 slice) at 40%
      // Additional rate: taxable income in excess of £125,140 at 45%
      const basicWidth = 37700;
      const higherWidth = 125140 - 37700; // £87,440 higher rate taxable band

      const rUkBands = [
        { name: 'Basic Rate (20%)', width: basicWidth, rate: 0.20 },
        { name: 'Higher Rate (40%)', width: higherWidth, rate: 0.40 },
        { name: 'Additional Rate (45%)', width: Infinity, rate: 0.45 },
      ];

      let remainingTaxable = taxablePay;
      for (const b of rUkBands) {
        if (remainingTaxable <= 0) break;
        const inThisBand = Math.min(remainingTaxable, b.width);
        const taxInBand = inThisBand * b.rate;
        totalIncomeTax += taxInBand;
        taxBands.push({ name: b.name, rate: b.rate, taxableAmount: inThisBand, taxPaid: taxInBand });
        remainingTaxable -= inThisBand;
      }
    }
  }

  // 7. Employee Class 1 National Insurance Calculation
  let totalEmployeeNI = 0;
  const niBands: NiBandBreakdown[] = [];
  const niPrimaryThreshold = config.employeeNI.primaryThreshold;
  const niUEL = config.employeeNI.upperEarningsLimit;

  if (grossForNI > niPrimaryThreshold) {
    const mainBandEarnings = Math.min(grossForNI, niUEL) - niPrimaryThreshold;
    const mainNiPaid = mainBandEarnings * config.employeeNI.mainRate;
    totalEmployeeNI += mainNiPaid;
    niBands.push({
      name: `Primary Threshold to UEL (${(config.employeeNI.mainRate * 100).toFixed(0)}%)`,
      rate: config.employeeNI.mainRate,
      earningsInBand: mainBandEarnings,
      niPaid: mainNiPaid,
    });

    if (grossForNI > niUEL) {
      const higherBandEarnings = grossForNI - niUEL;
      const higherNiPaid = higherBandEarnings * config.employeeNI.higherRate;
      totalEmployeeNI += higherNiPaid;
      niBands.push({
        name: `Above UEL (${(config.employeeNI.higherRate * 100).toFixed(0)}%)`,
        rate: config.employeeNI.higherRate,
        earningsInBand: higherBandEarnings,
        niPaid: higherNiPaid,
      });
    }
  }

  // 8. Employer Class 1 National Insurance
  let totalEmployerNI = 0;
  if (grossForNI > config.employerNI.secondaryThreshold) {
    totalEmployerNI = (grossForNI - config.employerNI.secondaryThreshold) * config.employerNI.standardRate;
  }
  const totalEmploymentCost = totalGross + totalEmployerNI + employerPensionAnnual;

  // 9. Student Loan Repayments
  const { studentLoanAnnual, postgradLoanAnnual } = calculateStudentLoanRepayments(
    grossForIncomeTax,
    input.studentLoanPlan,
    config
  );

  // 10. Net Pay and Totals
  // For relief at source, employee pays pension out of net pay.
  // For salary sacrifice, pension is already deducted from gross.
  // For net pay, pension is deducted from gross for tax, but out of pay for employee.
  let employeePensionOutOfPay = 0;
  if (input.pensionType === 'salary_sacrifice') {
    employeePensionOutOfPay = 0; // Already subtracted from gross
  } else {
    employeePensionOutOfPay = pensionAnnual;
  }

  const totalDeductionsAnnual = totalIncomeTax + totalEmployeeNI + studentLoanAnnual + postgradLoanAnnual + employeePensionOutOfPay + annualSalarySacrifice;
  const netAnnual = Math.max(0, totalGross - totalDeductionsAnnual);

  // Effective Tax Rate (Tax + NI + Student Loans / Gross)
  const statutoryDeductions = totalIncomeTax + totalEmployeeNI + studentLoanAnnual + postgradLoanAnnual;
  const effectiveTaxRate = totalGross > 0 ? (statutoryDeductions / totalGross) * 100 : 0;

  // Marginal Tax Rate (Tax on next £1)
  const marginalInfo = calculateMarginalRate(grossForIncomeTax, isScotland, input.studentLoanPlan, config);

  return {
    grossAnnual: totalGross,
    totalTaxableIncome: grossForIncomeTax,
    personalAllowanceApplied: allowanceApplied,
    personalAllowanceTaperLoss: allowanceTaperLoss,

    incomeTaxAnnual: totalIncomeTax,
    incomeTaxMonthly: totalIncomeTax / 12,
    incomeTaxWeekly: totalIncomeTax / 52,
    incomeTaxDaily: totalIncomeTax / 260,
    taxBands,

    employeeNiAnnual: totalEmployeeNI,
    employeeNiMonthly: totalEmployeeNI / 12,
    employeeNiWeekly: totalEmployeeNI / 52,
    employeeNiDaily: totalEmployeeNI / 260,
    niBands,

    studentLoanAnnual: studentLoanAnnual,
    studentLoanMonthly: studentLoanAnnual / 12,
    studentLoanWeekly: studentLoanAnnual / 52,
    postgradLoanAnnual: postgradLoanAnnual,
    postgradLoanMonthly: postgradLoanAnnual / 12,

    pensionAnnual,
    pensionMonthly: pensionAnnual / 12,
    employerPensionAnnual,
    employerPensionMonthly: employerPensionAnnual / 12,
    pensionTaxReliefAnnual,

    salarySacrificeAnnual: annualSalarySacrifice,

    totalDeductionsAnnual,
    totalDeductionsMonthly: totalDeductionsAnnual / 12,
    totalDeductionsWeekly: totalDeductionsAnnual / 52,
    totalDeductionsDaily: totalDeductionsAnnual / 260,

    netAnnual,
    netMonthly: netAnnual / 12,
    netWeekly: netAnnual / 52,
    netDaily: netAnnual / 260,

    employerNiAnnual: totalEmployerNI,
    totalEmploymentCost,

    effectiveTaxRate,
    marginalTaxRate: marginalInfo.rate,
    marginalTaxExplanation: marginalInfo.explanation,
  };
}

/**
 * Calculates Student Loan Repayments for any single or dual loan combination
 */
export function calculateStudentLoanRepayments(
  grossIncome: number,
  plan: StudentLoanPlan,
  config: typeof UK_TAX_CONFIGS['2026_27']
): { studentLoanAnnual: number; postgradLoanAnnual: number } {
  let studentLoanAnnual = 0;
  let postgradLoanAnnual = 0;

  if (plan === 'none') {
    return { studentLoanAnnual: 0, postgradLoanAnnual: 0 };
  }

  // Undergraduate checks
  if (plan === 'plan1' || plan === 'plan1_and_postgrad') {
    const t = config.studentLoans.plan1.threshold;
    if (grossIncome > t) studentLoanAnnual += (grossIncome - t) * config.studentLoans.plan1.rate;
  }
  if (plan === 'plan2' || plan === 'plan2_and_postgrad') {
    const t = config.studentLoans.plan2.threshold;
    if (grossIncome > t) studentLoanAnnual += (grossIncome - t) * config.studentLoans.plan2.rate;
  }
  if (plan === 'plan4' || plan === 'plan4_and_postgrad') {
    const t = config.studentLoans.plan4.threshold;
    if (grossIncome > t) studentLoanAnnual += (grossIncome - t) * config.studentLoans.plan4.rate;
  }
  if (plan === 'plan5' || plan === 'plan5_and_postgrad') {
    const t = config.studentLoans.plan5.threshold;
    if (grossIncome > t) studentLoanAnnual += (grossIncome - t) * config.studentLoans.plan5.rate;
  }

  // Postgraduate check
  if (
    plan === 'postgrad' ||
    plan === 'plan1_and_postgrad' ||
    plan === 'plan2_and_postgrad' ||
    plan === 'plan4_and_postgrad' ||
    plan === 'plan5_and_postgrad'
  ) {
    const t = config.studentLoans.postgrad.threshold;
    if (grossIncome > t) postgradLoanAnnual += (grossIncome - t) * config.studentLoans.postgrad.rate;
  }

  return {
    studentLoanAnnual: Math.max(0, studentLoanAnnual),
    postgradLoanAnnual: Math.max(0, postgradLoanAnnual),
  };
}

/**
 * Determines Marginal Tax Rate on the next £1 earned
 */
export function calculateMarginalRate(
  income: number,
  isScotland: boolean,
  studentLoanPlan: StudentLoanPlan,
  config: typeof UK_TAX_CONFIGS['2026_27']
): { rate: number; explanation: string } {
  let incomeTaxMarginal = 0;
  let niMarginal = 0;
  let studentLoanMarginal = 0;

  // NI marginal
  if (income < config.employeeNI.primaryThreshold) {
    niMarginal = 0;
  } else if (income <= config.employeeNI.upperEarningsLimit) {
    niMarginal = config.employeeNI.mainRate; // 8%
  } else {
    niMarginal = config.employeeNI.higherRate; // 2%
  }

  // Student loan marginal
  if (studentLoanPlan === 'plan1' && income > config.studentLoans.plan1.threshold) studentLoanMarginal += 0.09;
  if (studentLoanPlan === 'plan2' && income > config.studentLoans.plan2.threshold) studentLoanMarginal += 0.09;
  if (studentLoanPlan === 'plan4' && income > config.studentLoans.plan4.threshold) studentLoanMarginal += 0.09;
  if (studentLoanPlan === 'plan5' && income > config.studentLoans.plan5.threshold) studentLoanMarginal += 0.09;
  if (studentLoanPlan === 'postgrad' && income > config.studentLoans.postgrad.threshold) studentLoanMarginal += 0.06;
  if (studentLoanPlan?.includes('and_postgrad')) {
    studentLoanMarginal += 0.09 + 0.06; // 15% combined student loan deduction
  }

  // Income Tax marginal
  if (isScotland) {
    const starterMax = config.scotlandTaxBands[1]?.thresholdMax || 15397;
    const basicMax = config.scotlandTaxBands[2]?.thresholdMax || 27491;
    const interMax = config.scotlandTaxBands[3]?.thresholdMax || 43662;
    const higherMax = config.scotlandTaxBands[4]?.thresholdMax || 75000;
    const advMax = config.scotlandTaxBands[5]?.thresholdMax || 125140;

    if (income <= config.standardPersonalAllowance) incomeTaxMarginal = 0;
    else if (income <= starterMax) incomeTaxMarginal = 0.19;
    else if (income <= basicMax) incomeTaxMarginal = 0.20;
    else if (income <= interMax) incomeTaxMarginal = 0.21;
    else if (income <= higherMax) incomeTaxMarginal = 0.42;
    else if (income <= config.personalAllowanceTaperThreshold) incomeTaxMarginal = 0.45;
    else if (income <= advMax) incomeTaxMarginal = 0.675; // 45% + 22.5% allowance taper = 67.5%
    else incomeTaxMarginal = 0.48;
  } else {
    const basicMax = config.rUKTaxBands[1]?.thresholdMax || 50270;
    const higherMax = config.rUKTaxBands[2]?.thresholdMax || 125140;

    if (income <= config.standardPersonalAllowance) incomeTaxMarginal = 0;
    else if (income <= basicMax) incomeTaxMarginal = 0.20;
    else if (income <= config.personalAllowanceTaperThreshold) incomeTaxMarginal = 0.40;
    else if (income <= higherMax) incomeTaxMarginal = 0.60; // 40% + 20% personal allowance loss = 60% 'tax trap'
    else incomeTaxMarginal = 0.45;
  }

  const totalMarginal = (incomeTaxMarginal + niMarginal + studentLoanMarginal) * 100;
  
  let explanation = `On your next £100 earned, you keep approximately £${(100 - totalMarginal).toFixed(0)} (${(incomeTaxMarginal * 100).toFixed(0)}% Income Tax + ${(niMarginal * 100).toFixed(0)}% National Insurance`;
  if (studentLoanMarginal > 0) {
    explanation += ` + ${(studentLoanMarginal * 100).toFixed(0)}% Student Loan`;
  }
  if (income >= 100000 && income <= 125140) {
    explanation += `, including the 60%+ Personal Allowance taper 'tax trap'`;
  }
  explanation += `).`;

  return {
    rate: Math.round(totalMarginal * 10) / 10,
    explanation,
  };
}

/**
 * Day Rate to Salary Calculation
 */
export function calculateDayRate(input: DayRateInput): DayRateResult {
  const totalWorkingDays = Math.max(0, input.daysPerWeek * input.weeksPerYear - input.holidayDays);
  const grossAnnual = totalWorkingDays * input.dayRate;
  const annualExpenses = (input.monthlyExpenses || 0) * 12;

  // Use base take-home engine
  const takeHome = calculateTakeHomePay({
    grossSalary: grossAnnual,
    payFrequency: 'annual',
    taxYear: DEFAULT_TAX_YEAR,
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: input.pensionPercentage,
    pensionFixedAmount: 0,
    pensionType: 'net_pay',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
  });

  const estimatedNetAnnual = Math.max(0, takeHome.netAnnual - annualExpenses);

  return {
    dayRate: input.dayRate,
    totalWorkingDays,
    grossAnnualEquivalent: grossAnnual,
    grossMonthlyEquivalent: grossAnnual / 12,
    grossWeeklyEquivalent: grossAnnual / 52,
    estimatedAnnualTax: takeHome.incomeTaxAnnual,
    estimatedAnnualNI: takeHome.employeeNiAnnual,
    estimatedPension: takeHome.pensionAnnual,
    estimatedExpenses: annualExpenses,
    estimatedNetAnnual,
    estimatedNetMonthly: estimatedNetAnnual / 12,
    estimatedNetDaily: totalWorkingDays > 0 ? estimatedNetAnnual / totalWorkingDays : 0,
    effectiveRetentionRate: grossAnnual > 0 ? (estimatedNetAnnual / grossAnnual) * 100 : 0,
  };
}

/**
 * Hourly to Salary Calculation
 */
export function calculateHourlyRate(input: HourlyRateInput): HourlyRateResult {
  const basicHoursAnnual = input.hoursPerWeek * input.weeksPerYear;
  const basicGrossAnnual = basicHoursAnnual * input.hourlyWage;
  
  const overtimeHoursAnnual = (input.overtimeHoursPerWeek || 0) * input.weeksPerYear;
  const overtimeHourlyRate = input.hourlyWage * (input.overtimeMultiplier || 1.5);
  const overtimeGrossAnnual = overtimeHoursAnnual * overtimeHourlyRate;

  const totalGrossAnnual = basicGrossAnnual + overtimeGrossAnnual;

  const takeHome = calculateTakeHomePay({
    grossSalary: totalGrossAnnual,
    payFrequency: 'annual',
    taxYear: DEFAULT_TAX_YEAR,
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: input.pensionPercentage,
    pensionFixedAmount: 0,
    pensionType: 'auto_enrolment',
    employerPensionPercentage: 3,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
  });

  const totalHours = basicHoursAnnual + overtimeHoursAnnual;

  return {
    basicGrossAnnual,
    overtimeGrossAnnual,
    totalGrossAnnual,
    grossMonthly: totalGrossAnnual / 12,
    grossWeekly: totalGrossAnnual / 52,
    grossDaily: totalGrossAnnual / 260,
    netAnnual: takeHome.netAnnual,
    netMonthly: takeHome.netMonthly,
    netWeekly: takeHome.netWeekly,
    netDaily: takeHome.netDaily,
    effectiveHourlyNet: totalHours > 0 ? takeHome.netAnnual / totalHours : 0,
  };
}

/**
 * Pension Compound Growth & Retirement Projection
 */
export function calculatePensionCompound(input: PensionCompoundInput): PensionCompoundResult {
  const yearsToRetirement = Math.max(1, input.retirementAge - input.currentAge);
  const nominalRate = input.expectedAnnualGrowth / 100;
  const inflationRate = input.inflationRate / 100;
  const realRate = (1 + nominalRate) / (1 + inflationRate) - 1;

  const annualPersonalPctContrib = input.grossSalary * (input.employeeContributionPercent / 100);
  const annualEmployerPctContrib = input.grossSalary * (input.employerContributionPercent / 100);
  const annualFixedTopUp = input.fixedMonthlyTopUp * 12;

  const annualPersonalTotal = annualPersonalPctContrib + annualFixedTopUp;
  const annualEmployerTotal = annualEmployerPctContrib;

  let currentBalanceNominal = input.currentPot;
  let currentBalanceReal = input.currentPot;
  let totalPersonalContributions = 0;
  let totalEmployerContributions = 0;
  let totalTaxReliefGiven = 0;
  let totalInvestmentGrowth = 0;

  const yearlyProjections: PensionYearProjection[] = [];

  for (let year = 1; year <= yearsToRetirement; year++) {
    const age = input.currentAge + year;
    const startingBalance = currentBalanceNominal;
    
    // Tax relief estimate (20% basic tax relief added)
    const taxRelief = annualPersonalTotal * 0.25;

    // Total additions this year
    const totalAdditions = annualPersonalTotal + annualEmployerTotal + taxRelief;
    
    // Investment returns calculated mid-year cashflow
    const investmentGrowth = (startingBalance + totalAdditions / 2) * nominalRate;
    
    currentBalanceNominal = startingBalance + totalAdditions + investmentGrowth;
    currentBalanceReal = (currentBalanceReal + totalAdditions) * (1 + realRate);

    totalPersonalContributions += annualPersonalTotal;
    totalEmployerContributions += annualEmployerTotal;
    totalTaxReliefGiven += taxRelief;
    totalInvestmentGrowth += investmentGrowth;

    yearlyProjections.push({
      age,
      year,
      startingBalance,
      personalContribution: annualPersonalTotal,
      employerContribution: annualEmployerTotal,
      taxRelief,
      investmentGrowth,
      endingBalanceNominal: Math.round(currentBalanceNominal),
      endingBalanceReal: Math.round(currentBalanceReal),
    });
  }

  // Safe 4% rule drawdown estimate
  const safeDrawdownAnnual = currentBalanceNominal * 0.04;

  return {
    yearsToRetirement,
    finalPotNominal: Math.round(currentBalanceNominal),
    finalPotReal: Math.round(currentBalanceReal),
    totalPersonalContributions: Math.round(totalPersonalContributions),
    totalEmployerContributions: Math.round(totalEmployerContributions),
    totalTaxReliefGiven: Math.round(totalTaxReliefGiven),
    totalInvestmentGrowth: Math.round(totalInvestmentGrowth),
    estimatedAnnualDrawdownSafe4Percent: Math.round(safeDrawdownAnnual),
    estimatedMonthlyDrawdown: Math.round(safeDrawdownAnnual / 12),
    yearlyProjections,
  };
}

/**
 * Student Loan Repayment Details
 */
export function calculateStudentLoan(input: StudentLoanInput): StudentLoanResult {
  const config = UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];
  const { studentLoanAnnual, postgradLoanAnnual } = calculateStudentLoanRepayments(
    input.annualSalary,
    input.plan,
    config
  );

  let planName = 'No Student Loan';
  let threshold = 0;
  let repaymentRatePercent = 0;
  let explanation = 'You have not selected an active student loan plan.';

  if (input.plan === 'plan1') {
    planName = 'Plan 1';
    threshold = config.studentLoans.plan1.threshold;
    repaymentRatePercent = 9;
    explanation = `Plan 1 repayments are 9% of your gross earnings above £${threshold.toLocaleString('en-GB')}/year.`;
  } else if (input.plan === 'plan2') {
    planName = 'Plan 2';
    threshold = config.studentLoans.plan2.threshold;
    repaymentRatePercent = 9;
    explanation = `Plan 2 repayments are 9% of your gross earnings above £${threshold.toLocaleString('en-GB')}/year.`;
  } else if (input.plan === 'plan4') {
    planName = 'Plan 4 (Scotland)';
    threshold = config.studentLoans.plan4.threshold;
    repaymentRatePercent = 9;
    explanation = `Plan 4 Scottish repayments are 9% of gross earnings above £${threshold.toLocaleString('en-GB')}/year.`;
  } else if (input.plan === 'plan5') {
    planName = 'Plan 5 (New Scheme)';
    threshold = config.studentLoans.plan5.threshold;
    repaymentRatePercent = 9;
    explanation = `Plan 5 repayments are 9% of gross earnings above £${threshold.toLocaleString('en-GB')}/year.`;
  } else if (input.plan === 'postgrad') {
    planName = 'Postgraduate Loan';
    threshold = config.studentLoans.postgrad.threshold;
    repaymentRatePercent = 6;
    explanation = `Postgraduate loan repayments are 6% of gross earnings above £${threshold.toLocaleString('en-GB')}/year.`;
  } else if (input.plan.includes('and_postgrad')) {
    planName = 'Undergraduate + Postgraduate Loan';
    repaymentRatePercent = 15;
    explanation = `Combined undergraduate (9%) and postgraduate (6%) deductions total 15% on income above their respective thresholds.`;
  }

  const incomeAboveThreshold = Math.max(0, input.annualSalary - threshold);
  const totalStudentLoanAnnual = studentLoanAnnual + postgradLoanAnnual;

  return {
    planName,
    threshold,
    repaymentRatePercent,
    incomeAboveThreshold,
    annualRepayment: studentLoanAnnual,
    monthlyRepayment: studentLoanAnnual / 12,
    weeklyRepayment: studentLoanAnnual / 52,
    postgradRepaymentAnnual: postgradLoanAnnual,
    postgradRepaymentMonthly: postgradLoanAnnual / 12,
    totalStudentLoanAnnual,
    totalStudentLoanMonthly: totalStudentLoanAnnual / 12,
    explanation,
  };
}

/**
 * Salary Sacrifice Impact Calculator
 */
export function calculateSalarySacrifice(input: SalarySacrificeInput): SalarySacrificeResult {
  const annualSacrifice = input.monthlySacrifice * 12;
  const newSalary = Math.max(0, input.currentSalary - annualSacrifice);

  const baseline = calculateTakeHomePay({
    grossSalary: input.currentSalary,
    payFrequency: 'annual',
    taxYear: DEFAULT_TAX_YEAR,
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: input.currentPensionPercent,
    pensionFixedAmount: 0,
    pensionType: 'net_pay',
    employerPensionPercentage: 3,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
  });

  const withSacrifice = calculateTakeHomePay({
    grossSalary: input.currentSalary,
    payFrequency: 'annual',
    taxYear: DEFAULT_TAX_YEAR,
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: input.currentPensionPercent,
    pensionFixedAmount: 0,
    pensionType: 'net_pay',
    employerPensionPercentage: 3,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: input.monthlySacrifice,
  });

  const incomeTaxSaved = baseline.incomeTaxAnnual - withSacrifice.incomeTaxAnnual;
  const niSaved = baseline.employeeNiAnnual - withSacrifice.employeeNiAnnual;
  const employerNiSaved = baseline.employerNiAnnual - withSacrifice.employerNiAnnual;
  const totalTaxSaved = incomeTaxSaved + niSaved;
  const takeHomeDrop = baseline.netAnnual - withSacrifice.netAnnual;
  const monthlyTakeHomeDrop = takeHomeDrop / 12;

  const effectiveSavingsRate = annualSacrifice > 0 ? (totalTaxSaved / annualSacrifice) * 100 : 0;

  return {
    originalSalary: input.currentSalary,
    newSalary,
    annualSacrifice,
    monthlySacrifice: input.monthlySacrifice,
    originalNetAnnual: baseline.netAnnual,
    newNetAnnual: withSacrifice.netAnnual,
    originalNetMonthly: baseline.netMonthly,
    newNetMonthly: withSacrifice.netMonthly,
    annualIncomeTaxSaved: Math.max(0, incomeTaxSaved),
    annualNiSaved: Math.max(0, niSaved),
    annualEmployerNiSaved: Math.max(0, employerNiSaved),
    totalAnnualTaxSavings: Math.max(0, totalTaxSaved),
    monthlyTakeHomeDrop: Math.max(0, monthlyTakeHomeDrop),
    effectiveMonthlySavingsRate: effectiveSavingsRate,
  };
}

/**
 * Overtime Pay and Tax Calculator
 */
export function calculateOvertime(input: OvertimeInput): OvertimeResult {
  const overtimeHourlyRate = input.basicHourlyRate * input.overtimeMultiplier;
  const grossOvertimePay = overtimeHourlyRate * input.overtimeHours;

  const config = UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];
  const marginalInfo = calculateMarginalRate(input.currentAnnualSalary, false, 'none', config);
  
  // Breakdown marginal components
  const taxRate = input.currentAnnualSalary > 50270 ? (input.currentAnnualSalary > 125140 ? 0.45 : 0.40) : (input.currentAnnualSalary > 12570 ? 0.20 : 0.0);
  const niRate = input.currentAnnualSalary > 50270 ? 0.02 : (input.currentAnnualSalary > 12570 ? 0.08 : 0.0);

  const estimatedTax = grossOvertimePay * taxRate;
  const estimatedNI = grossOvertimePay * niRate;
  const netOvertime = Math.max(0, grossOvertimePay - estimatedTax - estimatedNI);

  return {
    overtimeHourlyRate,
    grossOvertimePay,
    marginalIncomeTaxRate: taxRate * 100,
    marginalNiRate: niRate * 100,
    estimatedIncomeTaxDeduction: estimatedTax,
    estimatedNiDeduction: estimatedNI,
    estimatedStudentLoanDeduction: 0,
    netOvertimePay: netOvertime,
    effectiveOvertimeRetentionPercent: grossOvertimePay > 0 ? (netOvertime / grossOvertimePay) * 100 : 0,
  };
}

/**
 * NHS Agenda for Change Pay Calculator
 */
export function calculateNhsSalary(input: NhsInput): NhsResult {
  const bandDef = NHS_PAY_BANDS.find((b) => b.band === input.band) || NHS_PAY_BANDS[3]; // default band 5
  const pt = bandDef.points[Math.min(input.pointIndex, bandDef.points.length - 1)] || bandDef.points[0];
  const basicSalary = pt.salary;

  // HCAS London Supplement calculation
  const hcasConfig = NHS_HCAS[input.regionHCAS] || NHS_HCAS.none;
  let hcasSupplement = 0;
  if (hcasConfig.rate > 0) {
    const rawHcas = basicSalary * hcasConfig.rate;
    hcasSupplement = Math.min(hcasConfig.max, Math.max(hcasConfig.min, rawHcas));
  }

  const grossSalary = basicSalary + hcasSupplement;

  // NHS Pension Tier lookup
  let pensionTierRate = 0;
  if (input.optInPension) {
    const tier = NHS_PENSION_TIERS.find((t) => grossSalary <= t.maxSalary) || NHS_PENSION_TIERS[NHS_PENSION_TIERS.length - 1];
    pensionTierRate = tier.rate;
  }
  const pensionDeductionAnnual = grossSalary * pensionTierRate;

  // Run take home logic
  const takeHome = calculateTakeHomePay({
    grossSalary,
    payFrequency: 'annual',
    taxYear: DEFAULT_TAX_YEAR,
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: pensionTierRate * 100,
    pensionFixedAmount: 0,
    pensionType: 'net_pay',
    employerPensionPercentage: 23.7, // NHS employer contribution
    studentLoanPlan: input.studentLoanPlan,
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
  });

  return {
    bandName: `${bandDef.name} — ${pt.step}`,
    basicSalary,
    hcasSupplement,
    grossSalary,
    pensionTierRate: pensionTierRate * 100,
    pensionDeductionAnnual,
    incomeTaxAnnual: takeHome.incomeTaxAnnual,
    niAnnual: takeHome.employeeNiAnnual,
    studentLoanAnnual: takeHome.studentLoanAnnual + takeHome.postgradLoanAnnual,
    netAnnual: takeHome.netAnnual,
    netMonthly: takeHome.netMonthly,
    netWeekly: takeHome.netWeekly,
  };
}

/**
 * Teacher Salary Calculator
 */
export function calculateTeacherSalary(input: TeacherInput): TeacherResult {
  const catScales = TEACHER_PAY_SCALES.find((s) => s.category === input.category) || TEACHER_PAY_SCALES[0];
  const pointData = catScales.points.find((p) => p.point === input.point) || catScales.points[0];

  let grossSalary = pointData.england;
  if (input.region === 'londonFringe') grossSalary = pointData.londonFringe;
  if (input.region === 'outerLondon') grossSalary = pointData.outerLondon;
  if (input.region === 'innerLondon') grossSalary = pointData.innerLondon;

  // Teachers Pension Tier
  let pensionTierRate = 0;
  if (input.optInPension) {
    const tier = TEACHERS_PENSION_TIERS.find((t) => grossSalary <= t.maxSalary) || TEACHERS_PENSION_TIERS[TEACHERS_PENSION_TIERS.length - 1];
    pensionTierRate = tier.rate;
  }
  const pensionAnnual = grossSalary * pensionTierRate;

  const takeHome = calculateTakeHomePay({
    grossSalary,
    payFrequency: 'annual',
    taxYear: DEFAULT_TAX_YEAR,
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: pensionTierRate * 100,
    pensionFixedAmount: 0,
    pensionType: 'net_pay',
    employerPensionPercentage: 28.68, // TPS Employer contribution
    studentLoanPlan: input.studentLoanPlan,
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
  });

  return {
    scaleTitle: `${catScales.title} (${pointData.point})`,
    grossSalary,
    pensionTierRate: pensionTierRate * 100,
    pensionAnnual,
    incomeTaxAnnual: takeHome.incomeTaxAnnual,
    niAnnual: takeHome.employeeNiAnnual,
    studentLoanAnnual: takeHome.studentLoanAnnual + takeHome.postgradLoanAnnual,
    netAnnual: takeHome.netAnnual,
    netMonthly: takeHome.netMonthly,
    netWeekly: takeHome.netWeekly,
  };
}

/**
 * Inside IR35 Calculation
 */
export function calculateInsideIr35(input: InsideIr35Input): InsideIr35Result {
  const contractGrossAnnual = input.dayRate * input.workingDaysPerYear;
  const contractGrossMonthly = contractGrossAnnual / 12;
  const umbrellaFeesAnnual = input.umbrellaFeePerWeek * 52;

  // Contract value minus umbrella fee
  const postMarginGross = Math.max(0, contractGrossAnnual - umbrellaFeesAnnual);

  // Apprenticeship levy 0.5%
  const apprenticeshipLevyAnnual = input.apprenticeshipLevyIncluded ? postMarginGross * 0.005 : 0;

  // Employer NI (15% above £5,000)
  const taxableForEmployerNI = Math.max(0, postMarginGross - apprenticeshipLevyAnnual - 5000);
  const employerNiAnnual = taxableForEmployerNI * (0.15 / 1.15); // Derived reverse solve

  const grossPayToWorkerAnnual = Math.max(0, postMarginGross - apprenticeshipLevyAnnual - employerNiAnnual);

  // Run standard take home on the gross worker pay
  const takeHome = calculateTakeHomePay({
    grossSalary: grossPayToWorkerAnnual,
    payFrequency: 'annual',
    taxYear: DEFAULT_TAX_YEAR,
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: input.pensionPercent,
    pensionFixedAmount: 0,
    pensionType: 'net_pay',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
  });

  return {
    contractGrossAnnual,
    contractGrossMonthly,
    umbrellaFeesAnnual,
    apprenticeshipLevyAnnual,
    employerNiAnnual,
    grossPayToWorkerAnnual,
    employeeNiAnnual: takeHome.employeeNiAnnual,
    incomeTaxAnnual: takeHome.incomeTaxAnnual,
    employeePensionAnnual: takeHome.pensionAnnual,
    netTakeHomeAnnual: takeHome.netAnnual,
    netTakeHomeMonthly: takeHome.netMonthly,
    netTakeHomeDaily: input.workingDaysPerYear > 0 ? takeHome.netAnnual / input.workingDaysPerYear : 0,
    takeHomePercentage: contractGrossAnnual > 0 ? (takeHome.netAnnual / contractGrossAnnual) * 100 : 0,
  };
}

/**
 * Umbrella Company Monthly Pay Calculation
 */
export function calculateUmbrella(input: UmbrellaInput): UmbrellaResult {
  const invoiceGrossMonthly = input.dayRate * input.daysWorkedPerMonth;
  const umbrellaMarginMonthly = input.umbrellaWeeklyMargin * 4.333;
  const allowableExpensesMonthly = input.allowableExpensesMonthly || 0;

  const postFeeGross = Math.max(0, invoiceGrossMonthly - umbrellaMarginMonthly);
  const apprenticeshipLevyMonthly = postFeeGross * 0.005;
  const employerNiMonthly = Math.max(0, (postFeeGross - 416.67) * 0.1304); // Approx reverse 15% threshold (£5k/12)

  const employerPensionMonthly = postFeeGross * (input.pensionSalarySacrificePercent / 100);
  const grossSalaryMonthly = Math.max(0, postFeeGross - apprenticeshipLevyMonthly - employerNiMonthly - employerPensionMonthly);

  // Take home calculation on annualized salary
  const takeHome = calculateTakeHomePay({
    grossSalary: grossSalaryMonthly * 12,
    payFrequency: 'annual',
    taxYear: DEFAULT_TAX_YEAR,
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: 0,
    pensionFixedAmount: 0,
    pensionType: 'net_pay',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
  });

  const netPayMonthly = takeHome.netMonthly + allowableExpensesMonthly;
  const retentionPercent = invoiceGrossMonthly > 0 ? (netPayMonthly / invoiceGrossMonthly) * 100 : 0;

  return {
    invoiceGrossMonthly,
    umbrellaMarginMonthly,
    employerNiMonthly,
    apprenticeshipLevyMonthly,
    employerPensionMonthly,
    grossSalaryMonthly,
    incomeTaxMonthly: takeHome.incomeTaxMonthly,
    employeeNiMonthly: takeHome.employeeNiMonthly,
    employeePensionMonthly: 0,
    netPayMonthly,
    retentionPercent,
  };
}

/**
 * Self-Employed & Sole Trader Tax Calculation Engine
 * Calculates Income Tax, Class 2 NI, Class 4 NI, and Payments on Account
 */
export function calculateSelfEmployedTax(input: SelfEmployedInput): SelfEmployedResult {
  const config = UK_TAX_CONFIGS[input.taxYear] || UK_TAX_CONFIGS['2025_26'];
  const grossProfit = Math.max(0, input.grossProfit || 0);
  const allowableExpenses = Math.max(0, input.allowableExpenses || 0);
  const taxableProfit = Math.max(0, grossProfit - allowableExpenses);

  // 1. Personal Allowance & Tapering
  const baseAllowance = config.standardPersonalAllowance;
  let personalAllowanceApplied = baseAllowance;
  let personalAllowanceTaperLoss = 0;

  if (taxableProfit > config.personalAllowanceTaperThreshold) {
    const excess = taxableProfit - config.personalAllowanceTaperThreshold;
    personalAllowanceTaperLoss = Math.min(baseAllowance, Math.floor(excess / 2));
    personalAllowanceApplied = Math.max(0, baseAllowance - personalAllowanceTaperLoss);
  }

  // 2. Income Tax on Net Profit
  const taxablePay = Math.max(0, taxableProfit - personalAllowanceApplied);
  let incomeTaxAnnual = 0;
  const taxBands: TaxBandBreakdown[] = [];
  const isScotland = input.region === 'scotland';

  if (isScotland) {
    const starterWidth = (config.scotlandTaxBands[1]?.thresholdMax || 15397) - (config.scotlandTaxBands[1]?.thresholdMin || 12570);
    const basicWidth = (config.scotlandTaxBands[2]?.thresholdMax || 27491) - (config.scotlandTaxBands[2]?.thresholdMin || 15397);
    const interWidth = (config.scotlandTaxBands[3]?.thresholdMax || 43662) - (config.scotlandTaxBands[3]?.thresholdMin || 27491);
    const higherWidth = (config.scotlandTaxBands[4]?.thresholdMax || 75000) - (config.scotlandTaxBands[4]?.thresholdMin || 43662);
    const advancedTaxableLimit = 125140;
    const priorWidths = starterWidth + basicWidth + interWidth + higherWidth;
    const advancedWidth = Math.max(0, advancedTaxableLimit - priorWidths);

    const scotBands = [
      { name: 'Starter Rate (19%)', width: starterWidth, rate: 0.19 },
      { name: 'Basic Rate (20%)', width: basicWidth, rate: 0.20 },
      { name: 'Intermediate Rate (21%)', width: interWidth, rate: 0.21 },
      { name: 'Higher Rate (42%)', width: higherWidth, rate: 0.42 },
      { name: 'Advanced Rate (45%)', width: advancedWidth, rate: 0.45 },
      { name: 'Top Rate (48%)', width: Infinity, rate: 0.48 },
    ];

    let remainingTaxable = taxablePay;
    for (const b of scotBands) {
      if (remainingTaxable <= 0) break;
      const inThisBand = Math.min(remainingTaxable, b.width);
      const taxInBand = inThisBand * b.rate;
      incomeTaxAnnual += taxInBand;
      taxBands.push({ name: b.name, rate: b.rate, taxableAmount: inThisBand, taxPaid: taxInBand });
      remainingTaxable -= inThisBand;
    }
  } else {
    const basicWidth = 37700; // £12,570 to £50,270
    const higherWidth = 125140 - 37700; // £50,270 to £125,140

    const rUkBands = [
      { name: 'Basic Rate (20%)', width: basicWidth, rate: 0.20 },
      { name: 'Higher Rate (40%)', width: higherWidth, rate: 0.40 },
      { name: 'Additional Rate (45%)', width: Infinity, rate: 0.45 },
    ];

    let remainingTaxable = taxablePay;
    for (const b of rUkBands) {
      if (remainingTaxable <= 0) break;
      const inThisBand = Math.min(remainingTaxable, b.width);
      const taxInBand = inThisBand * b.rate;
      incomeTaxAnnual += taxInBand;
      taxBands.push({ name: b.name, rate: b.rate, taxableAmount: inThisBand, taxPaid: taxInBand });
      remainingTaxable -= inThisBand;
    }
  }

  // 3. Class 2 National Insurance
  // Small Profits Threshold (SPT) = £6,725
  // Weekly rate = £3.45 -> £179.40 per year
  // From 2024/25 onwards: If profits >= £6,725, Class 2 is treated as paid (£0 payable).
  // If profits < £6,725, £0 payable unless paying voluntary Class 2 to maintain State Pension credits.
  const smallProfitsThreshold = 6725;
  const class2WeeklyRate = 3.45;
  const class2AnnualVoluntary = class2WeeklyRate * 52; // £179.40
  let class2NiAnnual = 0;
  let class2StatusText = '';

  if (taxableProfit >= smallProfitsThreshold) {
    class2NiAnnual = 0;
    class2StatusText = 'Treated as paid (£0.00) — State Pension credit secured';
  } else if (input.payVoluntaryClass2IfUnderThreshold) {
    class2NiAnnual = class2AnnualVoluntary;
    class2StatusText = 'Voluntary contribution (£3.45/wk) — protects State Pension';
  } else {
    class2NiAnnual = 0;
    class2StatusText = 'Exempt (£0.00) — profits below £6,725 Small Profits Threshold';
  }

  // 4. Class 4 National Insurance
  // Lower Profits Limit (LPL): £12,570
  // Upper Profits Limit (UPL): £50,270
  // Main Rate: 6.0% (between £12,570 and £50,270)
  // Additional Rate: 2.0% (above £50,270)
  const class4LPL = 12570;
  const class4UPL = 50270;
  const class4MainRate = 0.06;
  const class4HigherRate = 0.02;

  let class4NiAnnual = 0;
  const class4Bands: { name: string; rate: number; profitsInBand: number; niPaid: number }[] = [];

  if (taxableProfit > class4LPL) {
    const mainBandProfits = Math.min(taxableProfit, class4UPL) - class4LPL;
    const mainNiPaid = mainBandProfits * class4MainRate;
    class4NiAnnual += mainNiPaid;
    class4Bands.push({
      name: `Lower to Upper Profits Limit (${(class4MainRate * 100).toFixed(0)}%)`,
      rate: class4MainRate,
      profitsInBand: mainBandProfits,
      niPaid: mainNiPaid,
    });

    if (taxableProfit > class4UPL) {
      const higherBandProfits = taxableProfit - class4UPL;
      const higherNiPaid = higherBandProfits * class4HigherRate;
      class4NiAnnual += higherNiPaid;
      class4Bands.push({
        name: `Profits above £50,270 (${(class4HigherRate * 100).toFixed(0)}%)`,
        rate: class4HigherRate,
        profitsInBand: higherBandProfits,
        niPaid: higherNiPaid,
      });
    }
  }

  // 5. Student Loan Deductions
  const { studentLoanAnnual, postgradLoanAnnual } = calculateStudentLoanRepayments(
    taxableProfit,
    input.studentLoanPlan,
    config
  );
  const totalStudentLoans = studentLoanAnnual + postgradLoanAnnual;

  // 6. Totals & Net Pay
  const totalDeductionsAnnual = incomeTaxAnnual + class2NiAnnual + class4NiAnnual + totalStudentLoans;
  const netTakeHomeAnnual = Math.max(0, taxableProfit - totalDeductionsAnnual);
  const effectiveTaxRate = grossProfit > 0 ? (totalDeductionsAnnual / grossProfit) * 100 : 0;

  // Marginal Tax Rate (Tax + Class 4 NI + Student Loans on next £1)
  let marginalTaxRate = 0;
  if (taxableProfit <= personalAllowanceApplied) {
    marginalTaxRate = 0;
  } else if (taxableProfit <= class4UPL) {
    const incomeTaxRate = isScotland ? 0.20 : 0.20;
    marginalTaxRate = (incomeTaxRate + class4MainRate) * 100; // e.g. 20% + 6% = 26%
  } else if (taxableProfit <= 100000) {
    const incomeTaxRate = isScotland ? 0.42 : 0.40;
    marginalTaxRate = (incomeTaxRate + class4HigherRate) * 100; // e.g. 40% + 2% = 42%
  } else if (taxableProfit <= 125140) {
    // 60% effective income tax + 2% NI
    const incomeTaxRate = isScotland ? 0.63 : 0.60;
    marginalTaxRate = (incomeTaxRate + class4HigherRate) * 100; // 62% or 65%
  } else {
    const incomeTaxRate = isScotland ? 0.48 : 0.45;
    marginalTaxRate = (incomeTaxRate + class4HigherRate) * 100; // 47% or 50%
  }

  // 7. Payments on Account
  // If total Self Assessment liability (Income Tax + Class 4 NI) > £1,000
  const selfAssessmentLiability = incomeTaxAnnual + class4NiAnnual + class2NiAnnual;
  const requiresPaymentOnAccount = selfAssessmentLiability > 1000;
  const firstPaymentOnAccount = requiresPaymentOnAccount ? selfAssessmentLiability * 0.5 : 0;
  const secondPaymentOnAccount = requiresPaymentOnAccount ? selfAssessmentLiability * 0.5 : 0;
  const totalFirstYearPaymentDueJanuary = selfAssessmentLiability + firstPaymentOnAccount;

  return {
    grossProfit,
    allowableExpenses,
    taxableProfit,
    personalAllowanceApplied,
    personalAllowanceTaperLoss,

    incomeTaxAnnual,
    incomeTaxMonthly: incomeTaxAnnual / 12,
    incomeTaxWeekly: incomeTaxAnnual / 52,
    taxBands,

    class2NiAnnual,
    class2NiMonthly: class2NiAnnual / 12,
    class2StatusText,

    class4NiAnnual,
    class4NiMonthly: class4NiAnnual / 12,
    class4NiWeekly: class4NiAnnual / 52,
    class4Bands,

    studentLoanAnnual: totalStudentLoans,
    studentLoanMonthly: totalStudentLoans / 12,

    totalDeductionsAnnual,
    totalDeductionsMonthly: totalDeductionsAnnual / 12,
    totalDeductionsWeekly: totalDeductionsAnnual / 52,

    netTakeHomeAnnual,
    netTakeHomeMonthly: netTakeHomeAnnual / 12,
    netTakeHomeWeekly: netTakeHomeAnnual / 52,

    effectiveTaxRate,
    marginalTaxRate,

    requiresPaymentOnAccount,
    firstPaymentOnAccount,
    secondPaymentOnAccount,
    totalFirstYearPaymentDueJanuary,
  };
}

/**
 * Pay Rise & Salary Increase Calculation Engine
 * Compares before and after salary using banded PAYE calculations
 */
export function calculatePayRise(input: PayRiseInput): PayRiseResult {
  const currentSalary = Math.max(0, input.currentSalary || 0);

  let newSalary = 0;
  if (input.increaseMode === 'percentage') {
    const pct = Math.max(0, input.percentageIncrease || 0);
    newSalary = currentSalary * (1 + pct / 100);
  } else if (input.newSalary !== undefined && input.newSalary > 0) {
    newSalary = input.newSalary;
  } else {
    const flat = Math.max(0, input.flatIncreaseAmount || 0);
    newSalary = currentSalary + flat;
  }

  const grossIncreaseAnnual = Math.max(0, newSalary - currentSalary);
  const grossIncreaseMonthly = grossIncreaseAnnual / 12;
  const grossIncreasePercentage = currentSalary > 0 ? (grossIncreaseAnnual / currentSalary) * 100 : 0;

  const baseConfig: Omit<TakeHomeInput, 'grossSalary'> = {
    payFrequency: 'annual',
    taxYear: input.taxYear,
    region: input.region,
    taxCode: input.taxCode || '1257L',
    pensionPercentage: input.pensionPercentage || 0,
    pensionFixedAmount: 0,
    pensionType: input.pensionType || 'auto_enrolment',
    employerPensionPercentage: 3,
    studentLoanPlan: input.studentLoanPlan || 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
  };

  const before = calculateTakeHomePay({
    ...baseConfig,
    grossSalary: currentSalary,
  });

  const after = calculateTakeHomePay({
    ...baseConfig,
    grossSalary: newSalary,
  });

  const extraTakeHomeAnnual = Math.max(0, after.netAnnual - before.netAnnual);
  const extraTakeHomeMonthly = extraTakeHomeAnnual / 12;
  const extraTakeHomeWeekly = extraTakeHomeAnnual / 52;
  const takeHomeRetentionPercent = grossIncreaseAnnual > 0
    ? (extraTakeHomeAnnual / grossIncreaseAnnual) * 100
    : 0;

  const extraTaxAnnual = Math.max(0, after.incomeTaxAnnual - before.incomeTaxAnnual);
  const extraTaxMonthly = extraTaxAnnual / 12;
  const extraNiAnnual = Math.max(0, after.employeeNiAnnual - before.employeeNiAnnual);
  const extraNiMonthly = extraNiAnnual / 12;
  const extraPensionAnnual = Math.max(0, after.pensionAnnual - before.pensionAnnual);
  const extraPensionMonthly = extraPensionAnnual / 12;
  const extraStudentLoanAnnual = Math.max(
    0,
    (after.studentLoanAnnual + after.postgradLoanAnnual) - (before.studentLoanAnnual + before.postgradLoanAnnual)
  );
  const extraStudentLoanMonthly = extraStudentLoanAnnual / 12;
  const totalExtraDeductionsAnnual = extraTaxAnnual + extraNiAnnual + extraPensionAnnual + extraStudentLoanAnnual;

  const isScotland = input.region === 'scotland';
  const higherRateThreshold = isScotland ? 43662 : 50270;
  const additionalRateThreshold = 125140;

  const crossesHigherRateTax = before.grossAnnual <= higherRateThreshold && after.grossAnnual > higherRateThreshold;
  const crossesAdditionalRateTax = before.grossAnnual <= additionalRateThreshold && after.grossAnnual > additionalRateThreshold;
  const crossesPersonalAllowanceTaper = (before.grossAnnual < 100000 && after.grossAnnual >= 100000) ||
    (after.grossAnnual > 100000 && after.grossAnnual <= 125140);
  const crossesChildBenefitCharge = (before.grossAnnual < 60000 && after.grossAnnual >= 60000) ||
    (after.grossAnnual >= 60000 && after.grossAnnual <= 80000);

  return {
    currentSalary,
    newSalary,
    grossIncreaseAnnual,
    grossIncreaseMonthly,
    grossIncreasePercentage,

    before,
    after,

    extraTakeHomeAnnual,
    extraTakeHomeMonthly,
    extraTakeHomeWeekly,
    takeHomeRetentionPercent,

    extraTaxAnnual,
    extraTaxMonthly,
    extraNiAnnual,
    extraNiMonthly,
    extraPensionAnnual,
    extraPensionMonthly,
    extraStudentLoanAnnual,
    extraStudentLoanMonthly,
    totalExtraDeductionsAnnual,

    effectiveTaxRateBefore: before.effectiveTaxRate,
    effectiveTaxRateAfter: after.effectiveTaxRate,
    newMarginalTaxRate: after.marginalTaxRate,

    crossesHigherRateTax,
    crossesAdditionalRateTax,
    crossesPersonalAllowanceTaper,
    crossesChildBenefitCharge,
    higherRateThreshold,
  };
}

/**
 * Bonus Tax Calculation Engine
 * Accurately models the marginal tax, NI, student loan, and pension deductions on a one-off bonus
 */
export function calculateBonusTax(input: BonusTaxInput): BonusTaxResult {
  const baseSalary = Math.max(0, input.baseSalary || 0);
  const bonusAmount = Math.max(0, input.bonusAmount || 0);
  const totalGrossIncome = baseSalary + bonusAmount;

  const baseConfig: Omit<TakeHomeInput, 'grossSalary' | 'bonus' | 'salarySacrificeMonthly'> = {
    payFrequency: 'annual',
    taxYear: input.taxYear,
    region: input.region,
    taxCode: input.taxCode || '1257L',
    pensionPercentage: input.pensionPercentage || 0,
    pensionFixedAmount: 0,
    pensionType: input.pensionType || 'auto_enrolment',
    employerPensionPercentage: 3,
    studentLoanPlan: input.studentLoanPlan || 'none',
    overtime: 0,
    otherTaxableIncome: 0,
  };

  // 1. Without Bonus
  const baseWithoutBonus = calculateTakeHomePay({
    ...baseConfig,
    grossSalary: baseSalary,
    bonus: 0,
    salarySacrificeMonthly: 0,
  });

  // 2. With Bonus (standard cash bonus taken)
  const totalWithBonus = calculateTakeHomePay({
    ...baseConfig,
    grossSalary: baseSalary,
    bonus: bonusAmount,
    salarySacrificeMonthly: 0,
  });

  // 3. Marginal Deductions directly on the bonus
  const taxOnBonus = Math.max(0, totalWithBonus.incomeTaxAnnual - baseWithoutBonus.incomeTaxAnnual);
  const niOnBonus = Math.max(0, totalWithBonus.employeeNiAnnual - baseWithoutBonus.employeeNiAnnual);
  
  // Pension on bonus: if pensionAppliesToBonus is true, take the difference
  let pensionOnBonus = 0;
  if (input.pensionAppliesToBonus && input.pensionPercentage > 0) {
    pensionOnBonus = Math.max(0, totalWithBonus.pensionAnnual - baseWithoutBonus.pensionAnnual);
  }

  const studentLoanOnBonus = Math.max(
    0,
    (totalWithBonus.studentLoanAnnual + totalWithBonus.postgradLoanAnnual) -
      (baseWithoutBonus.studentLoanAnnual + baseWithoutBonus.postgradLoanAnnual)
  );

  const totalDeductionsOnBonus = taxOnBonus + niOnBonus + pensionOnBonus + studentLoanOnBonus;
  const netBonus = Math.max(0, bonusAmount - totalDeductionsOnBonus);
  const retentionPercentage = bonusAmount > 0 ? (netBonus / bonusAmount) * 100 : 0;
  const marginalTaxRateOnBonus = bonusAmount > 0 ? ((taxOnBonus + niOnBonus) / bonusAmount) * 100 : 0;

  // 4. Monthly Payslip simulation
  const normalMonthNet = baseWithoutBonus.netMonthly;
  const bonusMonthGross = (baseSalary / 12) + bonusAmount;
  const bonusMonthNet = normalMonthNet + netBonus;
  const bonusMonthExtraNet = netBonus;

  // 5. Salary Sacrifice Option Comparison
  let salarySacrificeComparison: BonusTaxResult['salarySacrificeComparison'] | undefined;
  if (input.salarySacrificeBonusAmount && input.salarySacrificeBonusAmount > 0) {
    const sacrificedAmount = Math.min(bonusAmount, input.salarySacrificeBonusAmount);
    const cashBonusTaken = bonusAmount - sacrificedAmount;

    const withSacrifice = calculateTakeHomePay({
      ...baseConfig,
      grossSalary: baseSalary,
      bonus: cashBonusTaken,
      salarySacrificeMonthly: 0,
    });

    const taxWithSacrifice = withSacrifice.incomeTaxAnnual - baseWithoutBonus.incomeTaxAnnual;
    const niWithSacrifice = withSacrifice.employeeNiAnnual - baseWithoutBonus.employeeNiAnnual;
    const taxSaved = Math.max(0, taxOnBonus - taxWithSacrifice);
    const niSaved = Math.max(0, niOnBonus - niWithSacrifice);
    const netCashTakenWithSacrifice = withSacrifice.netAnnual - baseWithoutBonus.netAnnual;
    const netCashLost = Math.max(0, netBonus - netCashTakenWithSacrifice);

    salarySacrificeComparison = {
      sacrificedAmount,
      cashBonusTaken,
      pensionPotAdded: sacrificedAmount,
      taxSaved,
      niSaved,
      netCashLost,
    };
  }

  // 6. Threshold crossings
  const isScotland = input.region === 'scotland';
  const higherRateThreshold = isScotland ? 43662 : 50270;
  const additionalRateThreshold = 125140;

  const crossesHigherRate = baseSalary <= higherRateThreshold && totalGrossIncome > higherRateThreshold;
  const crossesAdditionalRate = baseSalary <= additionalRateThreshold && totalGrossIncome > additionalRateThreshold;
  const crossesPersonalAllowanceTaper =
    (baseSalary < 100000 && totalGrossIncome >= 100000) ||
    (totalGrossIncome > 100000 && totalGrossIncome <= 125140);
  const crossesChildBenefitCharge =
    (baseSalary < 60000 && totalGrossIncome >= 60000) ||
    (totalGrossIncome >= 60000 && totalGrossIncome <= 80000);

  return {
    baseSalary,
    bonusAmount,
    totalGrossIncome,

    baseWithoutBonus,
    totalWithBonus,

    taxOnBonus,
    niOnBonus,
    pensionOnBonus,
    studentLoanOnBonus,
    totalDeductionsOnBonus,

    netBonus,
    retentionPercentage,
    marginalTaxRateOnBonus,

    normalMonthNet,
    bonusMonthGross,
    bonusMonthNet,
    bonusMonthExtraNet,

    salarySacrificeComparison,

    crossesHigherRate,
    crossesAdditionalRate,
    crossesPersonalAllowanceTaper,
    crossesChildBenefitCharge,
    higherRateThreshold,
  };
}

/**
 * Statutory & Enhanced Redundancy Pay Calculation Engine
 * Applies UK statutory age-banded formula, 20-year service cap, statutory weekly pay cap,
 * and the £30,000 tax-free exemption threshold.
 */
export function calculateRedundancyPay(input: RedundancyPayInput): RedundancyPayResult {
  const age = Math.max(16, Math.min(100, Math.floor(input.age || 16)));
  const rawYears = Math.max(0, Math.floor(input.yearsOfService || 0));
  // Statutory cap of 20 years maximum
  const yearsOfService = Math.min(20, rawYears);
  
  const actualWeeklyPay = Math.max(0, input.weeklyPay || 0);
  const statutoryWeeklyCap = input.statutoryWeeklyCap || 700;
  const effectiveWeeklyPay = input.useStatutoryWeeklyCap
    ? Math.min(actualWeeklyPay, statutoryWeeklyCap)
    : actualWeeklyPay;

  const enhancedRedundancyPay = Math.max(0, input.enhancedRedundancyPay || 0);
  const annualSalary = Math.max(0, input.annualSalary || (actualWeeklyPay * 52));

  // Compute breakdown by age for each full year of service (counting backwards from current age)
  let yearsUnder22 = 0;
  let weeksUnder22 = 0;
  let yearsBetween22And40 = 0;
  let weeksBetween22And40 = 0;
  let yearsOver41 = 0;
  let weeksOver41 = 0;

  for (let i = 0; i < yearsOfService; i++) {
    const ageAtYear = age - i;
    if (ageAtYear >= 41) {
      yearsOver41 += 1;
      weeksOver41 += 1.5;
    } else if (ageAtYear >= 22) {
      yearsBetween22And40 += 1;
      weeksBetween22And40 += 1.0;
    } else {
      yearsUnder22 += 1;
      weeksUnder22 += 0.5;
    }
  }

  const payUnder22 = weeksUnder22 * effectiveWeeklyPay;
  const payBetween22And40 = weeksBetween22And40 * effectiveWeeklyPay;
  const payOver41 = weeksOver41 * effectiveWeeklyPay;
  const totalStatutoryWeeks = weeksUnder22 + weeksBetween22And40 + weeksOver41;
  const statutoryRedundancyPay = totalStatutoryWeeks * effectiveWeeklyPay;

  // Total gross redundancy pay
  const totalGrossRedundancyPay = statutoryRedundancyPay + enhancedRedundancyPay;

  // £30,000 Tax-Free Threshold
  const taxFreeThreshold = 30000;
  const taxFreeAmount = Math.min(totalGrossRedundancyPay, taxFreeThreshold);
  const taxableExcess = Math.max(0, totalGrossRedundancyPay - taxFreeThreshold);

  // Income tax on taxable excess (calculated at marginal rate above annual salary)
  let incomeTaxOnExcess = 0;
  if (taxableExcess > 0) {
    const withoutExcess = calculateTakeHomePay({
      grossSalary: annualSalary,
      payFrequency: 'annual',
      taxYear: input.taxYear,
      region: input.region,
      taxCode: input.taxCode || '1257L',
      pensionPercentage: 0,
      pensionFixedAmount: 0,
      pensionType: 'auto_enrolment',
      employerPensionPercentage: 3,
      studentLoanPlan: 'none',
      bonus: 0,
      overtime: 0,
      salarySacrificeMonthly: 0,
      otherTaxableIncome: 0,
    });

    const withExcess = calculateTakeHomePay({
      grossSalary: annualSalary + taxableExcess,
      payFrequency: 'annual',
      taxYear: input.taxYear,
      region: input.region,
      taxCode: input.taxCode || '1257L',
      pensionPercentage: 0,
      pensionFixedAmount: 0,
      pensionType: 'auto_enrolment',
      employerPensionPercentage: 3,
      studentLoanPlan: 'none',
      bonus: 0,
      overtime: 0,
      salarySacrificeMonthly: 0,
      otherTaxableIncome: 0,
    });

    incomeTaxOnExcess = Math.max(0, withExcess.incomeTaxAnnual - withoutExcess.incomeTaxAnnual);
  }

  // Employee NI on redundancy pay is 0 (genuine redundancy payments are exempt from employee NICs)
  const employeeNiOnExcess = 0;

  // Employer Class 1A NI: 15.0% on taxable excess above £30,000 (from April 2025; 13.8% prior)
  const employerClass1aRate = input.taxYear === '2024_25' ? 0.138 : 0.150;
  const employerClass1aNiOnExcess = taxableExcess > 0 ? taxableExcess * employerClass1aRate : 0;

  const studentLoanOnExcess = 0; // Statutory and enhanced redundancy payments are not liable to student loan deductions at source

  const totalDeductions = incomeTaxOnExcess + employeeNiOnExcess;
  const netRedundancyPay = Math.max(0, totalGrossRedundancyPay - totalDeductions);
  const retentionPercentage = totalGrossRedundancyPay > 0 ? (netRedundancyPay / totalGrossRedundancyPay) * 100 : 100;
  const effectiveTaxRateOnRedundancy = totalGrossRedundancyPay > 0 ? (totalDeductions / totalGrossRedundancyPay) * 100 : 0;

  // Warnings
  const totalCombinedIncome = annualSalary + taxableExcess;
  const higherRateThreshold = input.region === 'scotland' ? 43662 : 50270;
  const crossesHigherRate = annualSalary <= higherRateThreshold && totalCombinedIncome > higherRateThreshold;
  const crossesAdditionalRate = annualSalary <= 125140 && totalCombinedIncome > 125140;
  const crossesPersonalAllowanceTaper = (annualSalary < 100000 && totalCombinedIncome >= 100000) || (totalCombinedIncome > 100000 && totalCombinedIncome <= 125140);

  return {
    age,
    yearsOfService,
    actualWeeklyPay,
    effectiveWeeklyPay,
    statutoryWeeklyCap,

    serviceBreakdown: {
      yearsUnder22,
      weeksUnder22,
      payUnder22,
      yearsBetween22And40,
      weeksBetween22And40,
      payBetween22And40,
      yearsOver41,
      weeksOver41,
      payOver41,
      totalStatutoryWeeks,
    },

    statutoryRedundancyPay,
    enhancedRedundancyPay,
    totalGrossRedundancyPay,

    taxFreeThreshold,
    taxFreeAmount,
    taxableExcess,

    incomeTaxOnExcess,
    employeeNiOnExcess,
    employerClass1aNiOnExcess,
    studentLoanOnExcess,

    totalDeductions,
    netRedundancyPay,
    retentionPercentage,
    effectiveTaxRateOnRedundancy,

    crossesHigherRate,
    crossesAdditionalRate,
    crossesPersonalAllowanceTaper,
  };
}

/**
 * Council Tax Calculation Engine
 * Estimates annual, 10-month, 12-month, and weekly council tax charges based on band (A-H),
 * national average or custom local authority Band D rates, and single occupant discounts.
 */
export function calculateCouncilTax(input: CouncilTaxInput): CouncilTaxResult {
  const country = input.country || 'england';
  const band = input.band || 'D';
  const adultCount = Math.max(1, input.adultCount || 1);

  // Band D baseline
  const isCustomRate = input.useCustomBandD && input.customBandD > 0;
  const effectiveBandD = isCustomRate
    ? input.customBandD
    : (COUNCIL_TAX_BAND_D_AVERAGES[country]?.averageBandD || 2171);

  const isScotland = country === 'scotland';
  const bandInfo = COUNCIL_TAX_BANDS.find((b) => b.band === band) || COUNCIL_TAX_BANDS[3]; // Band D fallback

  const multiplier = isScotland ? bandInfo.ratioScotland : bandInfo.ratioEnglandWales;
  const multiplierLabel = isScotland ? bandInfo.ratioLabelScotland : bandInfo.ratioLabelEnglandWales;

  // Gross Annual Charge
  const grossAnnualCharge = effectiveBandD * multiplier;

  // Single Occupant Discount (25% discount if 1 adult resident)
  const isSingleOccupant = adultCount === 1;
  const singlePersonDiscountPercentage = isSingleOccupant ? 25 : 0;
  const singlePersonDiscountAmount = (grossAnnualCharge * singlePersonDiscountPercentage) / 100;

  const netAnnualCouncilTax = Math.max(0, grossAnnualCharge - singlePersonDiscountAmount);

  // UK standard installment profiles (10 monthly payments vs 12 monthly payments)
  const monthly10Months = netAnnualCouncilTax / 10;
  const monthly12Months = netAnnualCouncilTax / 12;
  const weeklyEstimate = netAnnualCouncilTax / 52;

  const valuationBandRange = country === 'scotland'
    ? bandInfo.valuationScotland1991
    : country === 'wales'
      ? bandInfo.valuationWales2003
      : bandInfo.valuationEngland1991;

  // Compute all 8 bands comparison
  const allBandsComparison = COUNCIL_TAX_BANDS.map((b) => {
    const bMultiplier = isScotland ? b.ratioScotland : b.ratioEnglandWales;
    const bGross = effectiveBandD * bMultiplier;
    const bDiscount = isSingleOccupant ? (bGross * 0.25) : 0;
    const bNet = bGross - bDiscount;
    const bValuation = country === 'scotland'
      ? b.valuationScotland1991
      : country === 'wales'
        ? b.valuationWales2003
        : b.valuationEngland1991;

    return {
      band: b.band,
      valuation: bValuation,
      annualGross: bGross,
      annualNet: bNet,
      monthly10: bNet / 10,
      isCurrentBand: b.band === band,
    };
  });

  return {
    band,
    country,
    adultCount,
    effectiveBandD,
    isCustomRate,
    multiplier,
    multiplierLabel,
    grossAnnualCharge,
    singlePersonDiscountPercentage,
    singlePersonDiscountAmount,
    netAnnualCouncilTax,
    monthly10Months,
    monthly12Months,
    weeklyEstimate,
    valuationBandRange,
    allBandsComparison,
  };
}

/**
 * Outside IR35 Limited Company Contractor Calculation Engine
 * Calculates Corporation Tax on company profits and Dividend Tax on extracted dividends.
 */
export function calculateOutsideIr35(
  turnoverAnnual: number,
  workingDaysPerYear: number,
  directorSalary: number = OPTIMAL_DIRECTOR_SALARY_DEFAULT,
  allowableExpenses: number = 0
): OutsideIr35Result {
  const safeTurnover = Math.max(0, turnoverAnnual);
  const safeExpenses = Math.max(0, allowableExpenses);
  const safeSalary = Math.max(0, Math.min(safeTurnover - safeExpenses, directorSalary));

  // 1. Taxable Company Profit
  const taxableCompanyProfit = Math.max(0, safeTurnover - safeExpenses - safeSalary);

  // 2. Corporation Tax Calculation
  let corporationTaxAnnual = 0;
  if (taxableCompanyProfit > 0) {
    if (taxableCompanyProfit <= CORPORATION_TAX_LOWER_THRESHOLD) {
      // 19% small profits rate
      corporationTaxAnnual = taxableCompanyProfit * CORPORATION_TAX_SMALL_PROFITS_RATE;
    } else if (taxableCompanyProfit >= CORPORATION_TAX_UPPER_THRESHOLD) {
      // 25% main rate
      corporationTaxAnnual = taxableCompanyProfit * CORPORATION_TAX_MAIN_RATE;
    } else {
      // Marginal relief formula
      const mainTax = taxableCompanyProfit * CORPORATION_TAX_MAIN_RATE;
      const marginalRelief =
        CORPORATION_TAX_MARGINAL_FRACTION * (CORPORATION_TAX_UPPER_THRESHOLD - taxableCompanyProfit);
      corporationTaxAnnual = Math.max(0, mainTax - marginalRelief);
    }
  }
  const corporationTaxEffectiveRate =
    taxableCompanyProfit > 0 ? (corporationTaxAnnual / taxableCompanyProfit) * 100 : 0;

  // 3. Post-tax profits available for dividends
  const postTaxProfitAvailableForDividends = Math.max(0, taxableCompanyProfit - corporationTaxAnnual);
  const grossDividends = postTaxProfitAvailableForDividends;

  // 4. Personal Tax on Director (Salary + Dividends)
  const totalPersonalGrossIncome = safeSalary + grossDividends;

  // Personal Allowance Tapering (above £100,000)
  const standardPA = 12570;
  let effectivePersonalAllowance = standardPA;
  if (totalPersonalGrossIncome > 100000) {
    const taperLoss = Math.min(standardPA, Math.floor((totalPersonalGrossIncome - 100000) / 2));
    effectivePersonalAllowance = Math.max(0, standardPA - taperLoss);
  }

  // Tax on Salary:
  const taxableSalary = Math.max(0, safeSalary - effectivePersonalAllowance);
  const personalTaxOnSalary = taxableSalary * 0.20; // 20% basic rate on taxable salary portion

  // Remaining allowance to offset against dividends
  const remainingAllowanceForDividends = Math.max(0, effectivePersonalAllowance - safeSalary);
  const dividendsAfterPA = Math.max(0, grossDividends - remainingAllowanceForDividends);

  // Dividend Allowance (£500 tax-free)
  const dividendAllowanceUsed = Math.min(dividendsAfterPA, DIVIDEND_ALLOWANCE);
  const taxableDividends = Math.max(0, dividendsAfterPA - dividendAllowanceUsed);

  // Dividend Tax Bands positioning
  const basicRateBandLimit = 50270;
  const higherRateBandLimit = 125140;

  // Prior income counted against basic rate band:
  const priorIncome = safeSalary + dividendAllowanceUsed;
  const availableBasicBand = Math.max(0, basicRateBandLimit - priorIncome);

  const divInBasic = Math.min(taxableDividends, availableBasicBand);
  const dividendTaxBasicRate = divInBasic * DIVIDEND_TAX_RATES.basic;

  const remainingAfterBasic = Math.max(0, taxableDividends - divInBasic);
  const higherBandCapacity = Math.max(0, higherRateBandLimit - Math.max(basicRateBandLimit, priorIncome + divInBasic));

  const divInHigher = Math.min(remainingAfterBasic, higherBandCapacity);
  const dividendTaxHigherRate = divInHigher * DIVIDEND_TAX_RATES.higher;

  const divInAdditional = Math.max(0, remainingAfterBasic - divInHigher);
  const dividendTaxAdditionalRate = divInAdditional * DIVIDEND_TAX_RATES.additional;

  const dividendTaxTotal = dividendTaxBasicRate + dividendTaxHigherRate + dividendTaxAdditionalRate;
  const totalPersonalTax = personalTaxOnSalary + dividendTaxTotal;
  const totalCombinedTax = corporationTaxAnnual + totalPersonalTax;

  // Net Take-Home Pay
  const netTakeHomeAnnual = Math.max(0, safeSalary + grossDividends - totalPersonalTax);
  const netTakeHomeMonthly = netTakeHomeAnnual / 12;
  const netTakeHomeDaily = workingDaysPerYear > 0 ? netTakeHomeAnnual / workingDaysPerYear : 0;
  const effectiveRetentionRate = safeTurnover > 0 ? (netTakeHomeAnnual / safeTurnover) * 100 : 0;
  const effectiveTotalTaxRate = safeTurnover > 0 ? (totalCombinedTax / safeTurnover) * 100 : 0;

  return {
    turnoverAnnual: safeTurnover,
    allowableExpenses: safeExpenses,
    directorSalary: safeSalary,
    taxableCompanyProfit,
    corporationTaxAnnual,
    corporationTaxEffectiveRate,
    postTaxProfitAvailableForDividends,
    dividendAllowanceUsed,
    dividendTaxBasicRate,
    dividendTaxHigherRate,
    dividendTaxAdditionalRate,
    dividendTaxTotal,
    personalTaxOnSalary,
    totalPersonalTax,
    totalCombinedTax,
    netTakeHomeAnnual,
    netTakeHomeMonthly,
    netTakeHomeDaily,
    effectiveRetentionRate,
    effectiveTotalTaxRate,
  };
}

/**
 * Inside vs Outside IR35 Comparison Engine
 * Accurately compares contractor net take-home pay, tax deductions, and retention rates side-by-side.
 */
export function calculateIr35Compare(input: Ir35CompareInput): Ir35CompareResult {
  const dayRate = Math.max(0, input.dayRate || 0);
  const workingDaysPerYear = Math.max(1, Math.min(365, input.workingDaysPerYear || 220));
  const contractGrossAnnual = dayRate * workingDaysPerYear;

  // 1. Inside IR35 calculation
  const insideBase = calculateInsideIr35({
    dayRate,
    workingDaysPerYear,
    umbrellaFeePerWeek: input.umbrellaFeePerWeek !== undefined ? input.umbrellaFeePerWeek : 25,
    pensionPercent: input.pensionPercent !== undefined ? input.pensionPercent : 0,
    apprenticeshipLevyIncluded: true,
  });

  const insideTotalDeductionsAnnual = Math.max(0, contractGrossAnnual - insideBase.netTakeHomeAnnual);

  const inside = {
    contractGrossAnnual,
    umbrellaFeesAnnual: insideBase.umbrellaFeesAnnual,
    employerNiAnnual: insideBase.employerNiAnnual,
    apprenticeshipLevyAnnual: insideBase.apprenticeshipLevyAnnual,
    grossPayToWorkerAnnual: insideBase.grossPayToWorkerAnnual,
    incomeTaxAnnual: insideBase.incomeTaxAnnual,
    employeeNiAnnual: insideBase.employeeNiAnnual,
    employeePensionAnnual: insideBase.employeePensionAnnual,
    totalDeductionsAnnual: insideTotalDeductionsAnnual,
    netTakeHomeAnnual: insideBase.netTakeHomeAnnual,
    netTakeHomeMonthly: insideBase.netTakeHomeMonthly,
    netTakeHomeDaily: insideBase.netTakeHomeDaily,
    takeHomePercentage: insideBase.takeHomePercentage,
  };

  // 2. Outside IR35 calculation
  const outside = calculateOutsideIr35(
    contractGrossAnnual,
    workingDaysPerYear,
    input.directorSalary !== undefined ? input.directorSalary : OPTIMAL_DIRECTOR_SALARY_DEFAULT,
    input.annualBusinessExpenses || 0
  );

  // 3. Comparison metrics
  const annualDifference = outside.netTakeHomeAnnual - inside.netTakeHomeAnnual;
  const monthlyDifference = annualDifference / 12;
  const dailyDifference = workingDaysPerYear > 0 ? annualDifference / workingDaysPerYear : 0;
  const retentionDifferencePercent = outside.effectiveRetentionRate - inside.takeHomePercentage;
  const percentageGainByOutside =
    inside.netTakeHomeAnnual > 0 ? (annualDifference / inside.netTakeHomeAnnual) * 100 : 0;

  return {
    contractGrossAnnual,
    workingDaysPerYear,
    dayRate,
    inside,
    outside,
    comparison: {
      annualDifference,
      monthlyDifference,
      dailyDifference,
      retentionDifferencePercent,
      percentageGainByOutside,
    },
  };
}

/**
 * VAT Calculator — Add or Remove UK VAT
 * Standard Rate: 20%, Reduced Rate: 5%, Zero Rate: 0%
 */
export function calculateVat(input: VatInput): VatResult {
  const amount = Math.max(0, input.amount || 0);

  const rateMap: Record<VatRate, number> = {
    standard: 0.20,
    reduced: 0.05,
    zero: 0.00,
  };

  const labelMap: Record<VatRate, string> = {
    standard: 'Standard Rate (20%)',
    reduced: 'Reduced Rate (5%)',
    zero: 'Zero Rate (0%)',
  };

  const vatRatePercent = rateMap[input.vatRate] * 100;
  const vatRateLabel = labelMap[input.vatRate];
  const rate = rateMap[input.vatRate];

  let netAmount: number;
  let vatAmount: number;
  let grossAmount: number;

  if (input.mode === 'add') {
    // User enters NET price, we add VAT
    netAmount = amount;
    vatAmount = amount * rate;
    grossAmount = amount + vatAmount;
  } else {
    // User enters GROSS price, we remove VAT
    grossAmount = amount;
    netAmount = amount / (1 + rate);
    vatAmount = grossAmount - netAmount;
  }

  return {
    netAmount,
    vatAmount,
    grossAmount,
    vatRatePercent,
    vatRateLabel,
    mode: input.mode,
  };
}

/**
 * Net to Gross Calculator
 * Given a desired net (take-home) amount, find the gross salary
 * using binary search over calculateTakeHomePay().
 */
export function calculateGrossFromNet(input: NetToGrossInput): NetToGrossResult {
  const desiredNet = Math.max(0, input.desiredNet || 0);

  if (desiredNet === 0) {
    return {
      grossAnnual: 0,
      grossMonthly: 0,
      grossWeekly: 0,
      netAnnual: 0,
      netMonthly: 0,
      netWeekly: 0,
      incomeTaxAnnual: 0,
      incomeTaxMonthly: 0,
      employeeNiAnnual: 0,
      employeeNiMonthly: 0,
      pensionAnnual: 0,
      pensionMonthly: 0,
      studentLoanAnnual: 0,
      studentLoanMonthly: 0,
      totalDeductionsAnnual: 0,
      totalDeductionsMonthly: 0,
      effectiveTaxRate: 0,
      taxYear: input.taxYear,
      region: input.region,
    };
  }

  // Binary search bounds
  let low = 0;
  let high = 5000000; // allow up to £5m
  let grossSalary = 0;
  let iterations = 0;
  const maxIterations = 70;

  const baseInput: TakeHomeInput = {
    grossSalary: 0,
    payFrequency: 'annual',
    taxYear: input.taxYear,
    region: input.region,
    taxCode: input.taxCode,
    pensionPercentage: input.pensionPercentage,
    pensionFixedAmount: 0,
    pensionType: input.pensionType,
    employerPensionPercentage: 0,
    studentLoanPlan: input.studentLoanPlan,
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  };

  const targetAnnual =
    input.netFrequency === 'monthly'
      ? desiredNet * 12
      : input.netFrequency === 'weekly'
      ? desiredNet * 52
      : desiredNet;

  while (iterations < maxIterations && high - low > 0.01) {
    const mid = (low + high) / 2;
    const result = calculateTakeHomePay({ ...baseInput, grossSalary: mid });
    const resultNet = result.netAnnual;

    if (Math.abs(resultNet - targetAnnual) < 0.01) {
      grossSalary = mid;
      break;
    }

    if (resultNet < targetAnnual) {
      low = mid;
    } else {
      high = mid;
    }

    grossSalary = mid;
    iterations++;
  }

  // Final accurate result using the found gross
  const finalResult = calculateTakeHomePay({ ...baseInput, grossSalary });

  return {
    grossAnnual: grossSalary,
    grossMonthly: grossSalary / 12,
    grossWeekly: grossSalary / 52,
    netAnnual: finalResult.netAnnual,
    netMonthly: finalResult.netMonthly,
    netWeekly: finalResult.netWeekly,
    incomeTaxAnnual: finalResult.incomeTaxAnnual,
    incomeTaxMonthly: finalResult.incomeTaxMonthly,
    employeeNiAnnual: finalResult.employeeNiAnnual,
    employeeNiMonthly: finalResult.employeeNiMonthly,
    pensionAnnual: finalResult.pensionAnnual,
    pensionMonthly: finalResult.pensionMonthly,
    studentLoanAnnual: finalResult.studentLoanAnnual,
    studentLoanMonthly: finalResult.studentLoanMonthly,
    totalDeductionsAnnual: finalResult.totalDeductionsAnnual,
    totalDeductionsMonthly: finalResult.totalDeductionsMonthly,
    effectiveTaxRate: finalResult.effectiveTaxRate,
    taxYear: input.taxYear,
    region: input.region,
  };
}

/**
 * National Minimum Wage & National Living Wage Checker
 * Validates worker pay against statutory UK minimum wage age rates and accounts for qualifying deductions.
 */
export function calculateMinimumWage(input: MinimumWageInput): MinimumWageResult {
  const is2024_25 = input.taxYear === '2024_25';
  const effectiveAgeBand = input.isApprentice ? 'apprentice' : input.ageBand;

  const bandConfig =
    NATIONAL_MINIMUM_WAGE_RATES.find((b) => b.id === effectiveAgeBand) ||
    NATIONAL_MINIMUM_WAGE_RATES[0];

  const applicableMinimumRate =
    input.taxYear === '2024_25'
      ? bandConfig.rate2024_25
      : input.taxYear === '2025_26'
      ? bandConfig.rate2025_26
      : bandConfig.rate2026_27;

  const hoursPerWeek = Math.max(0.1, input.hoursPerWeek || 37.5);

  let grossHourlyRate = 0;
  let weeklyGrossPay = 0;
  let monthlyGrossPay = 0;
  let annualGrossPay = 0;

  if (input.payType === 'hourly') {
    grossHourlyRate = Math.max(0, input.hourlyRate || 0);
    weeklyGrossPay = grossHourlyRate * hoursPerWeek;
    annualGrossPay = weeklyGrossPay * 52;
    monthlyGrossPay = annualGrossPay / 12;
  } else if (input.payType === 'annual') {
    annualGrossPay = Math.max(0, input.salaryAmount || 0);
    weeklyGrossPay = annualGrossPay / 52;
    monthlyGrossPay = annualGrossPay / 12;
    grossHourlyRate = weeklyGrossPay / hoursPerWeek;
  } else if (input.payType === 'monthly') {
    monthlyGrossPay = Math.max(0, input.salaryAmount || 0);
    annualGrossPay = monthlyGrossPay * 12;
    weeklyGrossPay = annualGrossPay / 52;
    grossHourlyRate = weeklyGrossPay / hoursPerWeek;
  } else {
    // weekly
    weeklyGrossPay = Math.max(0, input.salaryAmount || 0);
    annualGrossPay = weeklyGrossPay * 52;
    monthlyGrossPay = annualGrossPay / 12;
    grossHourlyRate = weeklyGrossPay / hoursPerWeek;
  }

  // Deductions from pay that count against NMW
  const deductions = Math.max(0, input.deductionsFromPay || 0);
  let hourlyDeduction = 0;
  if (deductions > 0) {
    if (input.deductionFrequency === 'hourly') {
      hourlyDeduction = deductions;
    } else if (input.deductionFrequency === 'weekly') {
      hourlyDeduction = deductions / hoursPerWeek;
    } else {
      // monthly
      hourlyDeduction = (deductions * 12) / (52 * hoursPerWeek);
    }
  }

  const effectiveHourlyRateAfterDeductions = Math.max(0, grossHourlyRate - hourlyDeduction);
  const hourlyDifference = effectiveHourlyRateAfterDeductions - applicableMinimumRate;
  const isCompliant = hourlyDifference >= -0.005;

  const hourlyShortfall = isCompliant ? 0 : Math.abs(hourlyDifference);
  const weeklyShortfall = hourlyShortfall * hoursPerWeek;
  const monthlyShortfall = (weeklyShortfall * 52) / 12;
  const annualShortfall = weeklyShortfall * 52;

  const statutoryWeeklyMinimum = applicableMinimumRate * hoursPerWeek;
  const statutoryAnnualMinimum = statutoryWeeklyMinimum * 52;

  return {
    applicableMinimumRate,
    effectiveGrossHourlyRate: grossHourlyRate,
    effectiveHourlyRateAfterDeductions,
    isCompliant,
    hourlyDifference,
    hourlyShortfall,
    weeklyShortfall,
    monthlyShortfall,
    annualShortfall,
    weeklyGrossPay,
    monthlyGrossPay,
    annualGrossPay,
    statutoryWeeklyMinimum,
    statutoryAnnualMinimum,
    ageBandLabel: bandConfig.label,
    taxYear: input.taxYear,
  };
}

/**
 * National Minimum Wage / National Living Wage Checker
 * Checks if an employer is paying at least the legal minimum wage
 * and calculates any shortfall, including accommodation offset adjustments.
 */
export function calculateNmw(input: NmwInput): NmwResult {
  const config = UK_TAX_CONFIGS[input.taxYear] || UK_TAX_CONFIGS['2025_26'];
  const mw = config.minimumWage;

  const ageGroupLabels: Record<NmwAgeGroup, string> = {
    nlw: 'National Living Wage (aged 21+)',
    age18to20: 'Aged 18 to 20',
    age16to17: 'Aged 16 to 17',
    apprentice: 'Apprentice (under 19, or 19+ in first year)',
  };

  const minimumRate = mw[input.ageGroup];
  const currentRate = Math.max(0, input.currentHourlyRate || 0);
  const hours = Math.max(0, input.hoursPerWeek || 0);

  // Accommodation offset: reduces the effective hourly rate if employer provides accommodation
  // Daily offset × days per week ÷ hours per week = per-hour adjustment
  let accommodationAdjustmentPerHour = 0;
  if (input.includesAccommodation && hours > 0) {
    const dailyCharge = Math.max(0, input.accommodationChargePerDay || 0);
    const offsetPerDay = mw.accommodationOffset;
    const netDailyCharge = Math.max(0, dailyCharge - offsetPerDay);
    const days = Math.max(0, Math.min(7, input.daysAccommodationPerWeek || 0));
    const weeklyNetCharge = netDailyCharge * days;
    accommodationAdjustmentPerHour = hours > 0 ? weeklyNetCharge / hours : 0;
  }

  // Effective rate: current hourly rate minus accommodation charge above offset
  const effectiveRate = Math.max(0, currentRate - accommodationAdjustmentPerHour);

  const isCompliant = effectiveRate >= minimumRate;
  const shortfallPerHour = isCompliant ? 0 : minimumRate - effectiveRate;
  const surplusPerHour = isCompliant ? effectiveRate - minimumRate : 0;

  const shortfallPerWeek = shortfallPerHour * hours;
  const shortfallPerYear = shortfallPerWeek * 52;

  const minimumWeeklyPay = minimumRate * hours;
  const currentWeeklyPay = effectiveRate * hours;
  const minimumAnnualPay = minimumWeeklyPay * 52;
  const currentAnnualPay = currentWeeklyPay * 52;

  return {
    minimumRate,
    currentRate,
    effectiveRate,
    isCompliant,
    shortfallPerHour,
    surplusPerHour,
    shortfallPerWeek,
    shortfallPerYear,
    minimumWeeklyPay,
    currentWeeklyPay,
    minimumAnnualPay,
    currentAnnualPay,
    ageGroupLabel: ageGroupLabels[input.ageGroup],
    taxYearLabel: config.yearLabel,
    accommodationOffsetApplied: input.includesAccommodation ? mw.accommodationOffset : 0,
    accommodationAdjustmentPerHour,
  };
}

/**
 * UK Statutory Maternity, Paternity, Adoption & Shared Parental Pay Calculator
 * Based on HMRC statutory pay rules for 2024/25–2026/27.
 */
export function calculateMaternityPay(input: MaternityInput): MaternityResult {
  const config = UK_TAX_CONFIGS[input.taxYear] || UK_TAX_CONFIGS['2025_26'];
  const sp = config.statutoryPay;

  const awe = Math.max(0, input.grossWeeklySalary || 0);
  const isEligible = awe >= sp.lowerEarningsLimit;
  const enhancedWeeks = Math.max(0, Math.min(52, input.enhancedPayWeeks || 0));
  const enhancedPct = Math.max(0, Math.min(100, input.enhancedPayPercent || 100)) / 100;
  const enhancedWeeklyAmount = awe * enhancedPct;

  const breakdown: MaternityWeekBreakdown[] = [];
  let totalPay = 0;
  let weekCursor = 0;

  if (input.leaveType === 'maternity') {
    // Total leave = up to 52 weeks (39 paid + 13 unpaid)
    const totalLeave = 52;
    const totalPaid = 39;

    // Phase 1: Employer enhanced pay (if any), runs alongside SMP logic
    if (enhancedWeeks > 0) {
      const w = Math.min(enhancedWeeks, totalPaid);
      const total = enhancedWeeklyAmount * w;
      breakdown.push({
        weekRange: `Weeks 1–${w}`,
        weeks: w,
        weeklyAmount: enhancedWeeklyAmount,
        totalAmount: total,
        type: 'enhanced',
        label: `Enhanced Pay (${input.enhancedPayPercent}% salary)`,
      });
      totalPay += total;
      weekCursor = w;
    }

    if (isEligible) {
      // Phase 2: Higher SMP (90% AWE) for weeks 1–6 (overlapping with enhanced if applicable)
      const higherStart = weekCursor;
      const higherEnd = Math.max(higherStart, sp.smpDurationWeeksHigher);
      const higherWeeks = Math.max(0, higherEnd - higherStart);
      const higherAmount = awe * sp.smpHigherRatePercent;

      if (higherWeeks > 0) {
        const total = higherAmount * higherWeeks;
        breakdown.push({
          weekRange: `Weeks ${higherStart + 1}–${higherEnd}`,
          weeks: higherWeeks,
          weeklyAmount: higherAmount,
          totalAmount: total,
          type: 'higher_smp',
          label: `SMP — 90% AWE (${sp.smpDurationWeeksHigher} weeks)`,
        });
        totalPay += total;
        weekCursor = higherEnd;
      }

      // Phase 3: Flat rate SMP for weeks 7–39
      const flatStart = weekCursor;
      const flatEnd = Math.min(totalPaid, flatStart + sp.smpDurationWeeksFlat);
      const flatWeeks = Math.max(0, flatEnd - flatStart);
      const flatRate = Math.min(sp.smpWeeklyRate, awe * sp.smpHigherRatePercent);

      if (flatWeeks > 0) {
        const total = flatRate * flatWeeks;
        breakdown.push({
          weekRange: `Weeks ${flatStart + 1}–${flatEnd}`,
          weeks: flatWeeks,
          weeklyAmount: flatRate,
          totalAmount: total,
          type: 'flat_smp',
          label: `SMP — Flat Rate (${flatWeeks} weeks)`,
        });
        totalPay += total;
        weekCursor = flatEnd;
      }
    }

    // Phase 4: Unpaid leave (weeks 40–52)
    const unpaidWeeks = totalLeave - weekCursor;
    if (unpaidWeeks > 0) {
      breakdown.push({
        weekRange: `Weeks ${weekCursor + 1}–${totalLeave}`,
        weeks: unpaidWeeks,
        weeklyAmount: 0,
        totalAmount: 0,
        type: 'unpaid',
        label: 'Unpaid Leave',
      });
    }

    return {
      leaveType: 'maternity',
      grossWeeklySalary: awe,
      averageWeeklyEarnings: awe,
      isEligible,
      lowerEarningsLimit: sp.lowerEarningsLimit,
      totalLeaveWeeks: totalLeave,
      totalPaidWeeks: isEligible ? Math.min(39, enhancedWeeks + (isEligible ? sp.smpDurationWeeksHigher + sp.smpDurationWeeksFlat : 0)) : 0,
      unpaidWeeks,
      totalPayAmount: totalPay,
      totalMonthlyEquivalent: totalPay / (39 / 4.33),
      weeklyBreakdown: breakdown,
      taxYearLabel: config.yearLabel,
      flatWeeklyRate: sp.smpWeeklyRate,
      higherWeeklyAmount: awe * sp.smpHigherRatePercent,
    };
  }

  if (input.leaveType === 'paternity') {
    const totalLeave = sp.sppDurationWeeks;
    const weeklyAmount = isEligible
      ? Math.min(sp.sppWeeklyRate, awe * sp.smpHigherRatePercent)
      : 0;

    if (isEligible) {
      breakdown.push({
        weekRange: `Weeks 1–${totalLeave}`,
        weeks: totalLeave,
        weeklyAmount,
        totalAmount: weeklyAmount * totalLeave,
        type: 'spp',
        label: `Statutory Paternity Pay (SPP)`,
      });
      totalPay = weeklyAmount * totalLeave;
    }

    return {
      leaveType: 'paternity',
      grossWeeklySalary: awe,
      averageWeeklyEarnings: awe,
      isEligible,
      lowerEarningsLimit: sp.lowerEarningsLimit,
      totalLeaveWeeks: totalLeave,
      totalPaidWeeks: isEligible ? totalLeave : 0,
      unpaidWeeks: 0,
      totalPayAmount: totalPay,
      totalMonthlyEquivalent: totalPay / totalLeave * 4.33,
      weeklyBreakdown: breakdown,
      taxYearLabel: config.yearLabel,
      flatWeeklyRate: sp.sppWeeklyRate,
      higherWeeklyAmount: awe * sp.smpHigherRatePercent,
    };
  }

  if (input.leaveType === 'adoption') {
    const totalLeave = 52;
    const higherWeeks = sp.smpDurationWeeksHigher;
    const flatWeeks = sp.smpDurationWeeksFlat;
    const higherAmount = awe * sp.smpHigherRatePercent;
    const flatRate = Math.min(sp.sapWeeklyRate, higherAmount);

    if (isEligible) {
      breakdown.push({
        weekRange: `Weeks 1–${higherWeeks}`,
        weeks: higherWeeks,
        weeklyAmount: higherAmount,
        totalAmount: higherAmount * higherWeeks,
        type: 'higher_smp',
        label: 'SAP — 90% AWE (6 weeks)',
      });
      breakdown.push({
        weekRange: `Weeks ${higherWeeks + 1}–${higherWeeks + flatWeeks}`,
        weeks: flatWeeks,
        weeklyAmount: flatRate,
        totalAmount: flatRate * flatWeeks,
        type: 'sap',
        label: 'SAP — Flat Rate (33 weeks)',
      });
      totalPay = higherAmount * higherWeeks + flatRate * flatWeeks;
      weekCursor = higherWeeks + flatWeeks;
    }

    const unpaid = totalLeave - weekCursor;
    if (unpaid > 0) {
      breakdown.push({
        weekRange: `Weeks ${weekCursor + 1}–${totalLeave}`,
        weeks: unpaid,
        weeklyAmount: 0,
        totalAmount: 0,
        type: 'unpaid',
        label: 'Unpaid Leave',
      });
    }

    return {
      leaveType: 'adoption',
      grossWeeklySalary: awe,
      averageWeeklyEarnings: awe,
      isEligible,
      lowerEarningsLimit: sp.lowerEarningsLimit,
      totalLeaveWeeks: totalLeave,
      totalPaidWeeks: isEligible ? higherWeeks + flatWeeks : 0,
      unpaidWeeks: unpaid,
      totalPayAmount: totalPay,
      totalMonthlyEquivalent: totalPay / (39 / 4.33),
      weeklyBreakdown: breakdown,
      taxYearLabel: config.yearLabel,
      flatWeeklyRate: sp.sapWeeklyRate,
      higherWeeklyAmount: higherAmount,
    };
  }

  // Shared Parental Leave
  const shpWeeks = Math.max(0, Math.min(37, input.sharedParentalWeeks || 37));
  const shppRate = Math.min(sp.shppWeeklyRate, awe * sp.smpHigherRatePercent);

  if (isEligible && shpWeeks > 0) {
    breakdown.push({
      weekRange: `Weeks 1–${shpWeeks}`,
      weeks: shpWeeks,
      weeklyAmount: shppRate,
      totalAmount: shppRate * shpWeeks,
      type: 'shpp',
      label: `ShPP — Flat Rate (${shpWeeks} weeks)`,
    });
    totalPay = shppRate * shpWeeks;
  }

  return {
    leaveType: 'shared_parental',
    grossWeeklySalary: awe,
    averageWeeklyEarnings: awe,
    isEligible,
    lowerEarningsLimit: sp.lowerEarningsLimit,
    totalLeaveWeeks: shpWeeks,
    totalPaidWeeks: isEligible ? shpWeeks : 0,
    unpaidWeeks: 0,
    totalPayAmount: totalPay,
    totalMonthlyEquivalent: totalPay / Math.max(1, shpWeeks) * 4.33,
    weeklyBreakdown: breakdown,
    taxYearLabel: config.yearLabel,
    flatWeeklyRate: sp.shppWeeklyRate,
    higherWeeklyAmount: awe * sp.smpHigherRatePercent,
  };
}

/**
 * Child Benefit & High Income Child Benefit Charge (HICBC) Calculator
 * Based on HMRC Child Benefit rules. HICBC introduced April 2013,
 * threshold raised to £60,000 from April 2024.
 */
export function calculateChildBenefit(input: ChildBenefitInput): ChildBenefitResult {
  const config = UK_TAX_CONFIGS[input.taxYear] || UK_TAX_CONFIGS['2025_26'];
  const cb = config.childBenefit;

  const children = Math.max(0, Math.min(20, Math.floor(input.numberOfChildren || 0)));
  const income = Math.max(0, input.higherEarnerIncome || 0);

  // Calculate total annual Child Benefit
  const firstChildAnnual = cb.firstChildWeekly * 52;
  const additionalChildAnnual = cb.additionalChildWeekly * 52 * Math.max(0, children - 1);
  const totalAnnualBenefit = children > 0 ? firstChildAnnual + additionalChildAnnual : 0;
  const totalWeeklyBenefit = children > 0
    ? cb.firstChildWeekly + cb.additionalChildWeekly * Math.max(0, children - 1)
    : 0;

  // HICBC calculation
  const isAboveThreshold = income > cb.hicbcThreshold;
  const isAboveTaperEnd = income >= cb.hicbcTaperEnd;

  let chargePercent = 0;
  let hicbcAnnual = 0;

  if (isAboveTaperEnd) {
    chargePercent = 100;
    hicbcAnnual = totalAnnualBenefit;
  } else if (isAboveThreshold) {
    // 1% charge for every £200 of income above £60,000
    // = (income - 60000) / 200 * 1% of benefit
    const excessIncome = income - cb.hicbcThreshold;
    const taperRange = cb.hicbcTaperEnd - cb.hicbcThreshold; // £20,000
    chargePercent = Math.min(100, (excessIncome / taperRange) * 100);
    hicbcAnnual = totalAnnualBenefit * (chargePercent / 100);
  }

  const hicbcMonthly = hicbcAnnual / 12;
  const netAnnualBenefit = totalAnnualBenefit - hicbcAnnual;
  const netMonthlyBenefit = netAnnualBenefit / 12;

  // Recommendation logic
  let recommendation: ChildBenefitResult['recommendation'];
  let recommendationText: string;

  if (!isAboveThreshold) {
    recommendation = 'claim_full';
    recommendationText = 'You are below the £60,000 threshold. Claim Child Benefit in full — there is no charge to pay.';
  } else if (isAboveTaperEnd) {
    recommendation = 'opt_out';
    recommendationText = `Your income of £${income.toLocaleString('en-GB')} is above £${cb.hicbcTaperEnd.toLocaleString('en-GB')}. The full Child Benefit (£${totalAnnualBenefit.toFixed(2)}/yr) would be clawed back. Consider opting out of payments, but you may still want to claim to protect your State Pension National Insurance credits.`;
  } else if (chargePercent >= 50) {
    recommendation = 'opt_out_consider';
    recommendationText = `${chargePercent.toFixed(0)}% of your Child Benefit (£${hicbcAnnual.toFixed(2)}/yr) will be taken back as a tax charge. You keep £${netAnnualBenefit.toFixed(2)}/yr net. Consider whether claiming is worthwhile — but keep claiming if you need the NI credits for State Pension.`;
  } else {
    recommendation = 'claim_aware';
    recommendationText = `You will receive ${(100 - chargePercent).toFixed(0)}% of your Child Benefit net after the HICBC charge. You keep £${netAnnualBenefit.toFixed(2)}/yr. Continue claiming — you are still better off than opting out.`;
  }

  return {
    numberOfChildren: children,
    firstChildWeeklyRate: cb.firstChildWeekly,
    additionalChildWeeklyRate: cb.additionalChildWeekly,
    totalWeeklyBenefit,
    totalMonthlyBenefit: totalAnnualBenefit / 12,
    totalAnnualBenefit,
    higherEarnerIncome: income,
    hicbcThreshold: cb.hicbcThreshold,
    hicbcTaperEnd: cb.hicbcTaperEnd,
    isAboveThreshold,
    isAboveTaperEnd,
    hicbcAnnual,
    hicbcMonthly,
    netAnnualBenefit,
    netMonthlyBenefit,
    chargePercent,
    effectiveHourlyLoss: income > 0 ? (hicbcAnnual / income) * 100 : 0,
    recommendation,
    recommendationText,
    taxYearLabel: config.yearLabel,
  };
}

/**
 * Statutory Sick Pay (SSP) & Occupational Sick Pay Calculator
 */
export function calculateSickPay(input: SickPayInput): SickPayResult {
  const taxYear = input.taxYear || DEFAULT_TAX_YEAR;
  const config = UK_TAX_CONFIGS[taxYear] || UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];
  const sspConfig = config.statutorySickPay;

  const awe = Math.max(0, input.averageWeeklyEarnings || 0);
  const qDaysOff = Math.max(0, Math.round(input.qualifyingDaysOff || 0));
  const qDaysPerWeek = Math.max(1, Math.min(7, Math.round(input.qualifyingDaysPerWeek || 5)));
  const isLinkedPeriod = Boolean(input.isLinkedPeriod);
  const occupationalWeeklyPay = Math.max(0, input.occupationalWeeklyPay || 0);

  const isEligible = awe >= sspConfig.lowerEarningsLimit;
  let ineligibilityReason: string | undefined;
  if (!isEligible) {
    ineligibilityReason = `Average weekly earnings (£${awe.toFixed(2)}) are below the statutory Lower Earnings Limit (£${sspConfig.lowerEarningsLimit.toFixed(2)}/wk). To qualify for SSP, your weekly earnings before tax must be at or above this threshold.`;
  }

  const weeklySspRate = sspConfig.weeklyRate;
  const dailySspRate = weeklySspRate / qDaysPerWeek;

  // Waiting days: 3 qualifying days unpaid, unless linked period within 8 weeks
  const waitingDays = isLinkedPeriod ? 0 : Math.min(3, qDaysOff);

  const maxPayableDays = sspConfig.maxWeeks * qDaysPerWeek; // e.g. 28 * 5 = 140 days
  const unconstrainedPayableDays = Math.max(0, qDaysOff - waitingDays);
  const payableDays = Math.min(unconstrainedPayableDays, maxPayableDays);
  const isMaxWeeksExceeded = unconstrainedPayableDays > maxPayableDays;
  const payableWeeks = payableDays / qDaysPerWeek;

  const totalSspAmount = isEligible ? payableDays * dailySspRate : 0;

  // Occupational / contractual sick pay comparison
  const occupationalDailyPay = occupationalWeeklyPay / qDaysPerWeek;
  const totalOccupationalAmount = qDaysOff * occupationalDailyPay;
  const isOccupationalHigher = occupationalWeeklyPay > 0 && totalOccupationalAmount > totalSspAmount;
  const recommendedPayAmount = isOccupationalHigher ? totalOccupationalAmount : totalSspAmount;

  return {
    averageWeeklyEarnings: awe,
    qualifyingDaysOff: qDaysOff,
    qualifyingDaysPerWeek: qDaysPerWeek,
    isLinkedPeriod,
    isEligible,
    ineligibilityReason,
    lowerEarningsLimit: sspConfig.lowerEarningsLimit,
    weeklySspRate,
    dailySspRate,
    waitingDays,
    payableDays,
    payableWeeks,
    maxPayableDays,
    isMaxWeeksExceeded,
    totalSspAmount,
    occupationalWeeklyPay,
    occupationalDailyPay,
    totalOccupationalAmount,
    isOccupationalHigher,
    recommendedPayAmount,
    taxYearLabel: config.yearLabel,
  };
}

/**
 * Marriage Allowance Calculator
 * Transfers standard £1,260 Personal Allowance from non-taxpayer spouse/civil partner to basic-rate spouse/civil partner.
 */
export function calculateMarriageAllowance(input: MarriageAllowanceInput): MarriageAllowanceResult {
  const taxYear = input.taxYear || DEFAULT_TAX_YEAR;
  const config = UK_TAX_CONFIGS[taxYear] || UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];
  const transferAmount = config.marriageAllowanceTransfer; // £1,260
  const standardPA = config.standardPersonalAllowance; // £12,570

  const lowerIncome = Math.max(0, input.lowerEarnerIncome || 0);
  const higherIncome = Math.max(0, input.higherEarnerIncome || 0);
  const lowerRegion: TaxRegion = input.lowerEarnerRegion || 'england_ni';
  const higherRegion: TaxRegion = input.higherEarnerRegion || 'england_ni';

  const isLowerScotland = lowerRegion === 'scotland';
  const isLowerWales = lowerRegion === 'wales';
  const isHigherScotland = higherRegion === 'scotland';
  const isHigherWales = higherRegion === 'wales';

  const lowerPrefix = isLowerScotland ? 'S' : isLowerWales ? 'C' : '';
  const higherPrefix = isHigherScotland ? 'S' : isHigherWales ? 'C' : '';

  // Standard tax codes
  const lowerCodeBefore = `${lowerPrefix}1257L`;
  const lowerCodeAfter = `${lowerPrefix}1257N`; // reduced allowance
  const higherCodeBefore = `${higherPrefix}1257L`;
  const higherCodeAfter = `${higherPrefix}1257M`; // increased allowance

  // Check higher earner threshold
  const higherRateThreshold = isHigherScotland
    ? (config.scotlandTaxBands[4]?.thresholdMin || 43662)
    : (config.rUKTaxBands[2]?.thresholdMin || 50270);

  const isHigherRateTaxpayer = higherIncome > higherRateThreshold;

  // Run take-home pay calculations for both partners before & after
  const lowerResBefore = calculateTakeHomePay({
    grossSalary: lowerIncome,
    payFrequency: 'annual',
    taxYear,
    region: lowerRegion,
    taxCode: lowerCodeBefore,
    pensionPercentage: 0,
    pensionFixedAmount: 0,
    pensionType: 'auto_enrolment',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });

  const lowerResAfter = calculateTakeHomePay({
    grossSalary: lowerIncome,
    payFrequency: 'annual',
    taxYear,
    region: lowerRegion,
    taxCode: lowerCodeAfter,
    pensionPercentage: 0,
    pensionFixedAmount: 0,
    pensionType: 'auto_enrolment',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });

  const higherResBefore = calculateTakeHomePay({
    grossSalary: higherIncome,
    payFrequency: 'annual',
    taxYear,
    region: higherRegion,
    taxCode: higherCodeBefore,
    pensionPercentage: 0,
    pensionFixedAmount: 0,
    pensionType: 'auto_enrolment',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });

  const higherResAfter = calculateTakeHomePay({
    grossSalary: higherIncome,
    payFrequency: 'annual',
    taxYear,
    region: higherRegion,
    taxCode: higherCodeAfter,
    pensionPercentage: 0,
    pensionFixedAmount: 0,
    pensionType: 'auto_enrolment',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });

  const lowerTaxBefore = lowerResBefore.incomeTaxAnnual;
  const lowerTaxAfter = lowerResAfter.incomeTaxAnnual;
  const lowerExtraTax = Math.max(0, lowerTaxAfter - lowerTaxBefore);

  const higherTaxBefore = higherResBefore.incomeTaxAnnual;
  const higherTaxAfter = higherResAfter.incomeTaxAnnual;
  const higherTaxSaving = Math.max(0, higherTaxBefore - higherTaxAfter);

  const netHouseholdSaving = Math.max(0, higherTaxSaving - lowerExtraTax);
  const maxPotentialSaving = transferAmount * 0.20; // £252.00
  const backdated4YearsSavingEstimate = netHouseholdSaving * 5; // 4 backdated years + current year

  // Eligibility checking
  let isEligible = true;
  let ineligibilityReason: string | undefined;

  if (lowerIncome > standardPA) {
    isEligible = false;
    ineligibilityReason = `The lower earner's annual income (£${lowerIncome.toLocaleString('en-GB')}) exceeds the standard Personal Allowance (£${standardPA.toLocaleString('en-GB')}). Marriage Allowance can only be transferred if the lower-earning partner has an income of £${standardPA.toLocaleString('en-GB')} or less.`;
  } else if (isHigherRateTaxpayer) {
    isEligible = false;
    ineligibilityReason = `The higher earner's annual income (£${higherIncome.toLocaleString('en-GB')}) exceeds the basic rate threshold of £${higherRateThreshold.toLocaleString('en-GB')} in ${isHigherScotland ? 'Scotland' : 'the UK'}. Marriage Allowance cannot be claimed if the recipient partner pays higher rate (40% / 42%) or additional rate tax.`;
  } else if (higherIncome <= standardPA) {
    isEligible = false;
    ineligibilityReason = `The higher earner's annual income (£${higherIncome.toLocaleString('en-GB')}) is below the Personal Allowance (£${standardPA.toLocaleString('en-GB')}). Since neither partner is paying Income Tax, transferring allowance provides no financial saving.`;
  } else if (netHouseholdSaving <= 0) {
    isEligible = false;
    ineligibilityReason = `Based on these income figures, transferring Personal Allowance would not produce a net tax saving for your household.`;
  }

  const lowerEarnerSummary: PersonTaxSummary = {
    income: lowerIncome,
    region: lowerRegion,
    personalAllowanceBefore: standardPA,
    personalAllowanceAfter: standardPA - transferAmount,
    taxBefore: lowerTaxBefore,
    taxAfter: lowerTaxAfter,
    taxDifference: lowerExtraTax,
    taxCodeBefore: lowerCodeBefore,
    taxCodeAfter: lowerCodeAfter,
    isHigherRateTaxpayer: false,
  };

  const higherEarnerSummary: PersonTaxSummary = {
    income: higherIncome,
    region: higherRegion,
    personalAllowanceBefore: standardPA,
    personalAllowanceAfter: standardPA + transferAmount,
    taxBefore: higherTaxBefore,
    taxAfter: higherTaxAfter,
    taxDifference: -higherTaxSaving,
    taxCodeBefore: higherCodeBefore,
    taxCodeAfter: higherCodeAfter,
    isHigherRateTaxpayer,
  };

  return {
    isEligible,
    ineligibilityReason,
    transferAmount,
    lowerEarner: lowerEarnerSummary,
    higherEarner: higherEarnerSummary,
    lowerEarnerExtraTax: lowerExtraTax,
    higherEarnerTaxSaving: higherTaxSaving,
    netHouseholdSaving,
    maxPotentialSaving,
    backdated4YearsSavingEstimate,
    taxYearLabel: config.yearLabel,
  };
}

// ----------------------------------------------------
// 22. SECOND JOB TAX CALCULATOR
// ----------------------------------------------------

export function calculateSecondJobTax(input: SecondJobInput): SecondJobResult {
  const taxYear = input.taxYear || DEFAULT_TAX_YEAR;
  const config = UK_TAX_CONFIGS[taxYear] || UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];
  const region: TaxRegion = input.region || 'england_ni';
  const isScottish = region === 'scotland';
  const isWelsh = region === 'wales';
  const applyPAtoMain = input.personalAllowanceAppliedToMain !== false;

  const mainSalary = Math.max(0, input.mainJobSalary || 0);
  const secondSalary = Math.max(0, input.secondJobSalary || 0);
  const totalSalary = mainSalary + secondSalary;

  const prefix = isScottish ? 'S' : isWelsh ? 'C' : '';
  const standardPA = config.standardPersonalAllowance; // £12,570

  // 1. Calculate overall Personal Allowance considering £100k taper
  let totalPA = standardPA;
  if (totalSalary > config.personalAllowanceTaperThreshold) {
    const excess = totalSalary - config.personalAllowanceTaperThreshold;
    const reduction = Math.min(standardPA, Math.floor(excess / 2));
    totalPA = Math.max(0, standardPA - reduction);
  }

  // 2. Allocate Personal Allowance between jobs
  let mainJobPA = 0;
  let secondJobPA = 0;
  let unusedAllowanceTransferred = 0;

  if (applyPAtoMain) {
    mainJobPA = Math.min(mainSalary, totalPA);
    unusedAllowanceTransferred = Math.max(0, totalPA - mainJobPA);
    secondJobPA = Math.min(secondSalary, unusedAllowanceTransferred);
  } else {
    secondJobPA = Math.min(secondSalary, totalPA);
    unusedAllowanceTransferred = Math.max(0, totalPA - secondJobPA);
    mainJobPA = Math.min(mainSalary, unusedAllowanceTransferred);
  }

  // 3. Tax codes
  const getTaxCodeForAllowance = (allowance: number, salary: number, isSecond: boolean, combinedSal: number): string => {
    if (allowance >= standardPA) {
      return `${prefix}1257L`;
    }
    if (allowance > 0) {
      const codeNum = Math.floor(allowance / 10);
      return `${prefix}${codeNum}L`;
    }
    // Zero allowance: determine BR / D0 / D1 / 0T
    if (!isSecond) {
      return `${prefix}0T`;
    }
    // Second job zero allowance:
    const hrThreshold = isScottish ? 43662 : (config.rUKTaxBands[1]?.thresholdMax || 50270);
    const arThreshold = 125140;

    if (mainSalary >= arThreshold) {
      return `${prefix}D1`; // All additional rate (45% or 48%)
    }
    if (mainSalary >= hrThreshold && combinedSal <= arThreshold) {
      return `${prefix}D0`; // All higher rate (40% or 42%)
    }
    if (combinedSal <= hrThreshold) {
      return `${prefix}BR`; // Flat basic rate (20%)
    }
    return `${prefix}BR / ${prefix}D0`; // Crosses basic and higher rate bands
  };

  const mainTaxCode = getTaxCodeForAllowance(mainJobPA, mainSalary, false, totalSalary);
  const secondTaxCode = getTaxCodeForAllowance(secondJobPA, secondSalary, true, totalSalary);

  // 4. Calculate Main Job Income Tax & NI
  const mainJobRes = calculateTakeHomePay({
    grossSalary: mainSalary,
    payFrequency: 'annual',
    taxYear,
    region,
    taxCode: mainTaxCode,
    pensionPercentage: 0,
    pensionFixedAmount: 0,
    pensionType: 'auto_enrolment',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });

  // 5. Calculate Total Combined Income Tax across both jobs
  const combinedRes = calculateTakeHomePay({
    grossSalary: totalSalary,
    payFrequency: 'annual',
    taxYear,
    region,
    taxCode: `${prefix}1257L`,
    pensionPercentage: 0,
    pensionFixedAmount: 0,
    pensionType: 'auto_enrolment',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });

  const mainIncomeTax = mainJobRes.incomeTaxAnnual;
  // Second job tax is the exact cumulative delta
  const secondIncomeTax = Math.max(0, combinedRes.incomeTaxAnnual - mainIncomeTax);
  const totalIncomeTax = combinedRes.incomeTaxAnnual;

  // 6. National Insurance (Calculated independently per employment)
  const secondJobNiRes = calculateTakeHomePay({
    grossSalary: secondSalary,
    payFrequency: 'annual',
    taxYear,
    region,
    taxCode: secondTaxCode,
    pensionPercentage: 0,
    pensionFixedAmount: 0,
    pensionType: 'auto_enrolment',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });

  const mainNI = mainJobRes.employeeNiAnnual;
  const secondNI = secondJobNiRes.employeeNiAnnual;
  const totalNI = mainNI + secondNI;

  // 7. Take-home pay calculations
  const mainTakeHome = Math.max(0, mainSalary - mainIncomeTax - mainNI);
  const secondTakeHome = Math.max(0, secondSalary - secondIncomeTax - secondNI);
  const totalTakeHome = Math.max(0, totalSalary - totalIncomeTax - totalNI);

  // 8. Warnings
  const hrThreshold = isScottish ? 43662 : (config.rUKTaxBands[1]?.thresholdMax || 50270);
  const hasHigherRateWarning = totalSalary > hrThreshold && mainSalary <= hrThreshold;
  const hasPersonalAllowanceTaperWarning = totalSalary > 100000 && totalSalary <= 125140;
  const hasPersonalAllowanceLossWarning = totalSalary > 125140;

  // Marginal tax rate for any additional £100 earned on the second job
  const testDelta = calculateTakeHomePay({
    grossSalary: totalSalary + 100,
    payFrequency: 'annual',
    taxYear,
    region,
    taxCode: `${prefix}1257L`,
    pensionPercentage: 0,
    pensionFixedAmount: 0,
    pensionType: 'auto_enrolment',
    employerPensionPercentage: 0,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });
  const marginalDeductions = (testDelta.incomeTaxAnnual + testDelta.employeeNiAnnual) - (combinedRes.incomeTaxAnnual + combinedRes.employeeNiAnnual);
  const marginalTaxRate = Math.min(100, Math.max(0, (marginalDeductions / 100) * 100));

  const mainJob: JobTaxBreakdown = {
    salary: mainSalary,
    personalAllowance: mainJobPA,
    taxableIncome: Math.max(0, mainSalary - mainJobPA),
    incomeTax: mainIncomeTax,
    nationalInsurance: mainNI,
    takeHomePay: mainTakeHome,
    monthlyTakeHome: mainTakeHome / 12,
    weeklyTakeHome: mainTakeHome / 52,
    effectiveTaxRate: mainSalary > 0 ? ((mainIncomeTax + mainNI) / mainSalary) * 100 : 0,
    suggestedTaxCode: mainTaxCode,
  };

  const secondJob: JobTaxBreakdown = {
    salary: secondSalary,
    personalAllowance: secondJobPA,
    taxableIncome: Math.max(0, secondSalary - secondJobPA),
    incomeTax: secondIncomeTax,
    nationalInsurance: secondNI,
    takeHomePay: secondTakeHome,
    monthlyTakeHome: secondTakeHome / 12,
    weeklyTakeHome: secondTakeHome / 52,
    effectiveTaxRate: secondSalary > 0 ? ((secondIncomeTax + secondNI) / secondSalary) * 100 : 0,
    suggestedTaxCode: secondTaxCode,
  };

  return {
    mainJob,
    secondJob,
    combined: {
      totalGrossSalary: totalSalary,
      totalPersonalAllowance: totalPA,
      totalTaxableIncome: Math.max(0, totalSalary - totalPA),
      totalIncomeTax,
      totalNationalInsurance: totalNI,
      totalTakeHomePay: totalTakeHome,
      monthlyTakeHome: totalTakeHome / 12,
      weeklyTakeHome: totalTakeHome / 52,
      overallEffectiveTaxRate: totalSalary > 0 ? ((totalIncomeTax + totalNI) / totalSalary) * 100 : 0,
      marginalTaxRate,
    },
    hasHigherRateWarning,
    hasPersonalAllowanceTaperWarning,
    hasPersonalAllowanceLossWarning,
    unusedAllowanceTransferred,
    isScottish,
    taxYearLabel: config.yearLabel,
  };
}

export const calculateSecondJob = calculateSecondJobTax;

// ----------------------------------------------------
// 23. SALARY COMPARISON CALCULATOR
// ----------------------------------------------------

export function calculateSalaryComparison(input: SalaryComparisonInput): SalaryComparisonResult {
  const taxYear = input.taxYear || DEFAULT_TAX_YEAR;
  const region = input.region || 'england_ni';
  const config = UK_TAX_CONFIGS[taxYear] || UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];

  const scenarios = input.scenarios && input.scenarios.length > 0
    ? input.scenarios
    : [
        { id: '1', label: '£30k Baseline', grossSalary: 30000 },
        { id: '2', label: '£35k Offer', grossSalary: 35000 },
        { id: '3', label: '£45k Senior', grossSalary: 45000 },
        { id: '4', label: '£60k Lead', grossSalary: 60000 },
      ];

  const baselineGross = scenarios[0]?.grossSalary || 0;
  const baselineRes = calculateTakeHomePay({
    grossSalary: baselineGross,
    payFrequency: 'annual',
    taxYear,
    region,
    taxCode: input.taxCode || '1257L',
    pensionPercentage: scenarios[0]?.pensionPercentage ?? 5,
    pensionFixedAmount: 0,
    pensionType: input.pensionType || 'net_pay',
    employerPensionPercentage: 3,
    studentLoanPlan: scenarios[0]?.studentLoanPlan || 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });

  const baselineTakeHome = baselineRes.netAnnual;

  const items: SalaryComparisonResultItem[] = scenarios.map((scenario) => {
    const salary = Math.max(0, scenario.grossSalary || 0);
    const pensionPct = scenario.pensionPercentage ?? 5;
    const loanPlan = scenario.studentLoanPlan || 'none';

    const res = calculateTakeHomePay({
      grossSalary: salary,
      payFrequency: 'annual',
      taxYear,
      region,
      taxCode: input.taxCode || '1257L',
      pensionPercentage: pensionPct,
      pensionFixedAmount: 0,
      pensionType: input.pensionType || 'net_pay',
      employerPensionPercentage: 3,
      studentLoanPlan: loanPlan,
      bonus: 0,
      overtime: 0,
      otherTaxableIncome: 0,
      salarySacrificeMonthly: 0,
      isBlindAllowance: false,
      isMarriageAllowance: false,
    });

    const diffGross = salary - baselineGross;
    const diffNet = res.netAnnual - baselineTakeHome;
    const retentionRate = diffGross !== 0 ? Math.max(0, Math.min(100, (diffNet / diffGross) * 100)) : 100;

    return {
      id: scenario.id,
      label: scenario.label,
      grossSalary: salary,
      takeHomeAnnual: res.netAnnual,
      takeHomeMonthly: res.netMonthly,
      takeHomeWeekly: res.netWeekly,
      takeHomeDaily: res.netDaily,
      takeHomeHourly: res.netAnnual / 1950,
      incomeTaxAnnual: res.incomeTaxAnnual,
      employeeNiAnnual: res.employeeNiAnnual,
      pensionAnnual: res.pensionAnnual,
      studentLoanAnnual: res.studentLoanAnnual,
      totalDeductionsAnnual: res.totalDeductionsAnnual,
      effectiveTaxRate: res.effectiveTaxRate,
      marginalTaxRate: res.marginalTaxRate,
      diffAnnualFromBaseline: diffNet,
      diffMonthlyFromBaseline: diffNet / 12,
      diffGrossFromBaseline: diffGross,
      retentionRateFromBaseline: retentionRate,
    };
  });

  return {
    items,
    baselineId: scenarios[0]?.id || '1',
    taxYearLabel: config.yearLabel,
  };
}

// ----------------------------------------------------
// 24. PAY FREQUENCY CONVERTER
// ----------------------------------------------------

export function calculatePayFrequencies(
  grossAnnual: number,
  region: TaxRegion = 'england_ni',
  taxYear: TaxYear = DEFAULT_TAX_YEAR,
  pensionPercentage: number = 5,
  studentLoanPlan: StudentLoanPlan = 'none'
): PayFrequencyConversionItem[] {
  const safeGross = Math.max(0, grossAnnual || 0);

  const res = calculateTakeHomePay({
    grossSalary: safeGross,
    payFrequency: 'annual',
    taxYear,
    region,
    taxCode: '1257L',
    pensionPercentage,
    pensionFixedAmount: 0,
    pensionType: 'net_pay',
    employerPensionPercentage: 3,
    studentLoanPlan,
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });

  // Standard UK working conventions: 52 weeks, 260 working days (5 days/week), 1950 hours (37.5h/week)
  return [
    {
      frequency: 'annual',
      label: 'Annual (Per Year)',
      gross: safeGross,
      net: res.netAnnual,
      incomeTax: res.incomeTaxAnnual,
      nationalInsurance: res.employeeNiAnnual,
      pension: res.pensionAnnual,
      studentLoan: res.studentLoanAnnual,
    },
    {
      frequency: 'monthly',
      label: 'Monthly (12 Pay Periods)',
      gross: safeGross / 12,
      net: res.netMonthly,
      incomeTax: res.incomeTaxAnnual / 12,
      nationalInsurance: res.employeeNiAnnual / 12,
      pension: res.pensionAnnual / 12,
      studentLoan: res.studentLoanAnnual / 12,
    },
    {
      frequency: '4weekly',
      label: '4-Weekly (13 Pay Periods)',
      gross: safeGross / 13,
      net: res.netAnnual / 13,
      incomeTax: res.incomeTaxAnnual / 13,
      nationalInsurance: res.employeeNiAnnual / 13,
      pension: res.pensionAnnual / 13,
      studentLoan: res.studentLoanAnnual / 13,
    },
    {
      frequency: 'fortnightly',
      label: 'Fortnightly (26 Pay Periods)',
      gross: safeGross / 26,
      net: res.netAnnual / 26,
      incomeTax: res.incomeTaxAnnual / 26,
      nationalInsurance: res.employeeNiAnnual / 26,
      pension: res.pensionAnnual / 26,
      studentLoan: res.studentLoanAnnual / 26,
    },
    {
      frequency: 'weekly',
      label: 'Weekly (52 Pay Periods)',
      gross: safeGross / 52,
      net: res.netWeekly,
      incomeTax: res.incomeTaxAnnual / 52,
      nationalInsurance: res.employeeNiAnnual / 52,
      pension: res.pensionAnnual / 52,
      studentLoan: res.studentLoanAnnual / 52,
    },
    {
      frequency: 'daily',
      label: 'Daily (260 Working Days)',
      gross: safeGross / 260,
      net: res.netDaily,
      incomeTax: res.incomeTaxAnnual / 260,
      nationalInsurance: res.employeeNiAnnual / 260,
      pension: res.pensionAnnual / 260,
      studentLoan: res.studentLoanAnnual / 260,
    },
    {
      frequency: 'hourly',
      label: 'Hourly (37.5 hrs/week)',
      gross: safeGross / 1950,
      net: res.netAnnual / 1950,
      incomeTax: res.incomeTaxAnnual / 1950,
      nationalInsurance: res.employeeNiAnnual / 1950,
      pension: res.pensionAnnual / 1950,
      studentLoan: res.studentLoanAnnual / 1950,
    },
  ];
}

/**
 * 1. Calculate Income Tax (Dedicated Standalone Engine)
 */
export function calculateIncomeTax(input: IncomeTaxInput): IncomeTaxResult {
  const config = UK_TAX_CONFIGS[input.taxYear] || UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];
  const employmentGross = Math.max(0, input.annualEmploymentIncome || 0);
  const bonus = Math.max(0, input.bonus || 0);
  const otherIncome = Math.max(0, input.otherTaxableIncome || 0);
  const totalGross = employmentGross + bonus + otherIncome;

  const salarySacrifice = Math.max(0, input.salarySacrificeAmount || 0);
  let adjustedGross = Math.max(0, totalGross - salarySacrifice);

  // Pension deduction
  let pensionReliefDeduction = 0;
  const pensionAmount = Math.max(0, input.pensionContribution || 0);
  if (input.pensionType === 'salary_sacrifice' || input.pensionType === 'net_pay') {
    adjustedGross = Math.max(0, adjustedGross - pensionAmount);
    pensionReliefDeduction = pensionAmount;
  } else if (input.pensionType === 'relief_at_source') {
    pensionReliefDeduction = pensionAmount;
  }

  // Personal allowance & code parsing
  const code = (input.taxCode || '1257L').trim().toUpperCase();
  const parsedCode = parseTaxCode(code, config.standardPersonalAllowance);
  const isScotland = input.region === 'scotland' || parsedCode.isScotland;

  let nominalAllowance = parsedCode.personalAllowance;
  if (input.isBlindAllowance) {
    nominalAllowance += config.blindPersonsAllowance;
  }
  if (input.isMarriageAllowance) {
    nominalAllowance += config.marriageAllowanceTransfer;
  }

  let allowanceApplied = nominalAllowance;
  let allowanceTaperLoss = 0;

  if (!parsedCode.isNegativeAllowance && parsedCode.isSpecialRate === null) {
    if (adjustedGross > config.personalAllowanceTaperThreshold) {
      const excess = adjustedGross - config.personalAllowanceTaperThreshold;
      allowanceTaperLoss = Math.min(nominalAllowance, Math.floor(excess / 2));
      allowanceApplied = Math.max(0, nominalAllowance - allowanceTaperLoss);
    }
  }

  let totalIncomeTax = 0;
  let taxBands: TaxBandBreakdown[] = [];

  if (parsedCode.isSpecialRate === 'NT') {
    totalIncomeTax = 0;
  } else if (parsedCode.isSpecialRate === 'BR') {
    const rate = 0.20;
    totalIncomeTax = adjustedGross * rate;
    taxBands = [{ name: 'Basic Rate (BR 20%)', rate, taxableAmount: adjustedGross, taxPaid: totalIncomeTax }];
  } else if (parsedCode.isSpecialRate === 'D0') {
    const rate = isScotland ? 0.42 : 0.40;
    totalIncomeTax = adjustedGross * rate;
    taxBands = [{ name: `Higher Rate (D0 ${(rate * 100).toFixed(0)}%)`, rate, taxableAmount: adjustedGross, taxPaid: totalIncomeTax }];
  } else if (parsedCode.isSpecialRate === 'D1') {
    const rate = isScotland ? 0.48 : 0.45;
    totalIncomeTax = adjustedGross * rate;
    taxBands = [{ name: `Top / Additional Rate (D1 ${(rate * 100).toFixed(0)}%)`, rate, taxableAmount: adjustedGross, taxPaid: totalIncomeTax }];
  } else {
    let taxablePay = Math.max(0, adjustedGross - allowanceApplied);
    if (parsedCode.isNegativeAllowance) {
      taxablePay = adjustedGross + parsedCode.personalAllowance;
    }

    if (isScotland) {
      const scotRes = calculateScottishIncomeTax(taxablePay, config.scotlandTaxBands);
      totalIncomeTax = scotRes.totalTax;
      taxBands = scotRes.bands;
    } else {
      const rukRes = calculateRukIncomeTax(taxablePay, config.rUKTaxBands);
      totalIncomeTax = rukRes.totalTax;
      taxBands = rukRes.bands;
    }
  }

  const effectiveRate = totalGross > 0 ? (totalIncomeTax / totalGross) * 100 : 0;
  
  // Marginal rate check
  let marginalRate = 0;
  if (totalGross > 0) {
    if (adjustedGross > 125140) {
      marginalRate = isScotland ? 48 : 45;
    } else if (adjustedGross > 100000) {
      marginalRate = isScotland ? 63 : 60; // 40%/42% + 20% taper
    } else if (adjustedGross > 50270) {
      marginalRate = isScotland ? 42 : 40;
    } else if (adjustedGross > (isScotland ? 15397 : 12570)) {
      marginalRate = isScotland ? 20 : 20;
    } else {
      marginalRate = 0;
    }
  }

  const regionLabel = isScotland
    ? 'Scotland (Devolved Scottish Rates)'
    : input.region === 'wales'
    ? 'Wales (Welsh Rates of Income Tax)'
    : 'England, Wales & Northern Ireland';

  return {
    grossTotal: totalGross,
    salarySacrifice,
    adjustedGross,
    pensionReliefDeduction,
    personalAllowance: allowanceApplied,
    personalAllowanceTaperLoss: allowanceTaperLoss,
    taxableIncome: Math.max(0, adjustedGross - allowanceApplied),
    incomeTaxAnnual: totalIncomeTax,
    incomeTaxMonthly: totalIncomeTax / 12,
    incomeTaxWeekly: totalIncomeTax / 52,
    incomeTaxDaily: totalIncomeTax / 260,
    effectiveRate,
    marginalRate,
    taxBands,
    taxYearLabel: config.yearLabel,
    regionLabel,
  };
}

/**
 * 2. Calculate National Insurance Contributions (Dedicated Standalone Engine)
 */
export function calculateNationalInsuranceContributions(input: NationalInsuranceInput): NationalInsuranceResult {
  const niYearConfig = UK_NATIONAL_INSURANCE_CONFIGS[input.taxYear] || UK_NATIONAL_INSURANCE_CONFIGS[DEFAULT_TAX_YEAR];
  const thresholds = niYearConfig.thresholds;
  const rates = niYearConfig.rates;

  const rawGross = Math.max(0, input.grossPay || 0);
  let grossAnnual = rawGross;
  let grossPeriod = rawGross;

  if (input.payFrequency === 'monthly') {
    grossAnnual = rawGross * 12;
  } else if (input.payFrequency === 'weekly') {
    grossAnnual = rawGross * 52;
  } else {
    grossPeriod = rawGross / 12;
  }

  const sacrifice = Math.max(0, input.salarySacrifice || 0);
  const adjustedAnnual = Math.max(0, grossAnnual - sacrifice);

  const category = input.niCategory || 'A';
  let employeeNiAnnual = 0;
  const niBands: NiBandBreakdown[] = [];

  if (category === 'C') {
    // Category C: Over State Pension Age - 0% employee NI
    employeeNiAnnual = 0;
    niBands.push({
      name: 'Category C (State Pension Age Exempt)',
      rate: 0.0,
      earningsInBand: adjustedAnnual,
      niPaid: 0,
    });
  } else if (category === 'B') {
    // Category B: Married women reduced rate
    const bandEarnings = Math.max(0, Math.min(adjustedAnnual, thresholds.upperEarningsLimitAnnual) - thresholds.primaryThresholdAnnual);
    const niBand1 = bandEarnings * rates.employeeReducedRateB;
    const overUel = Math.max(0, adjustedAnnual - thresholds.upperEarningsLimitAnnual);
    const niBand2 = overUel * rates.employeeHigherRate;
    employeeNiAnnual = niBand1 + niBand2;

    niBands.push(
      { name: 'Under Primary Threshold (0%)', rate: 0.0, earningsInBand: Math.min(adjustedAnnual, thresholds.primaryThresholdAnnual), niPaid: 0 },
      { name: 'Primary Threshold to UEL (1.85%)', rate: rates.employeeReducedRateB, earningsInBand: bandEarnings, niPaid: niBand1 },
      { name: 'Above Upper Earnings Limit (2%)', rate: rates.employeeHigherRate, earningsInBand: overUel, niPaid: niBand2 }
    );
  } else {
    // Standard Category A / Director
    const pt = thresholds.primaryThresholdAnnual;
    const uel = thresholds.upperEarningsLimitAnnual;

    const underPt = Math.min(adjustedAnnual, pt);
    const mainBand = Math.max(0, Math.min(adjustedAnnual, uel) - pt);
    const upperBand = Math.max(0, adjustedAnnual - uel);

    const niMain = mainBand * rates.employeeMainRate;
    const niUpper = upperBand * rates.employeeHigherRate;
    employeeNiAnnual = niMain + niUpper;

    niBands.push(
      { name: 'Up to Primary Threshold (£12,570 - 0%)', rate: 0.0, earningsInBand: underPt, niPaid: 0 },
      { name: '£12,570 to £50,270 (8% Main Rate)', rate: rates.employeeMainRate, earningsInBand: mainBand, niPaid: niMain },
      { name: 'Above £50,270 (2% Upper Rate)', rate: rates.employeeHigherRate, earningsInBand: upperBand, niPaid: niUpper }
    );
  }

  // Employer NI calculation for context
  const st = thresholds.secondaryThresholdAnnual;
  const employerBand = Math.max(0, adjustedAnnual - st);
  const employerNiAnnual = employerBand * rates.employerStandardRate;

  const effectiveNiRate = adjustedAnnual > 0 ? (employeeNiAnnual / adjustedAnnual) * 100 : 0;

  const categoryLabels: Record<string, string> = {
    A: 'Category A (Standard Employee)',
    B: 'Category B (Married Women / Widows Reduced)',
    C: 'Category C (Over State Pension Age)',
    H: 'Category H (Apprentice Under 25)',
    M: 'Category M (Under 21)',
    J: 'Category J (Deferment / Multiple Employments)',
  };

  return {
    grossPayAnnual: adjustedAnnual,
    grossPayPeriod: input.payFrequency === 'weekly' ? adjustedAnnual / 52 : adjustedAnnual / 12,
    employeeNiAnnual,
    employeeNiMonthly: employeeNiAnnual / 12,
    employeeNiWeekly: employeeNiAnnual / 52,
    employeeNiDaily: employeeNiAnnual / 260,
    employerNiAnnual,
    effectiveNiRate,
    niBands,
    payFrequency: input.payFrequency,
    taxYearLabel: niYearConfig.yearLabel,
    categoryLabel: categoryLabels[category] || 'Category A (Standard)',
  };
}

/**
 * 3. Calculate Tax Code Interpretation (Dedicated Standalone Engine)
 */
export function calculateTaxCodeInterpretation(input: TaxCodeInput): TaxCodeResult {
  const code = (input.taxCode || '1257L').trim().toUpperCase();
  const taxYear = input.taxYear || DEFAULT_TAX_YEAR;
  const config = UK_TAX_CONFIGS[taxYear] || UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];

  const isScottish = code.startsWith('S');
  const isWelsh = code.startsWith('C');
  const cleanCode = isScottish || isWalesPrefix(code) ? code.substring(1) : code;

  function isWalesPrefix(c: string) {
    return c.startsWith('C') && !c.startsWith('CD');
  }

  const warnings: string[] = [];
  let prefix = isScottish ? 'S' : isWelsh ? 'C' : '';
  let numericPart = 0;
  let suffix = '';
  let estimatedPersonalAllowance = 0;
  let allowanceExplanation = '';
  let codeMeaning = '';
  let codeCategory: TaxCodeResult['codeCategory'] = 'standard';
  let isValid = true;

  if (cleanCode === 'BR') {
    codeCategory = 'special_rate';
    codeMeaning = 'Basic Rate (BR) - All income from this job or pension is taxed at the flat 20% basic rate with zero Personal Allowance.';
    allowanceExplanation = '£0 tax-free allowance. Typically used for second jobs, additional pensions, or where your Personal Allowance is used by a primary employer.';
    estimatedPersonalAllowance = 0;
  } else if (cleanCode === 'D0') {
    codeCategory = 'special_rate';
    const ratePct = isScottish ? '42%' : '40%';
    codeMeaning = `Higher Rate (D0) - All income is taxed at the ${ratePct} higher rate with zero tax-free Personal Allowance.`;
    allowanceExplanation = '£0 tax-free allowance. Applied to secondary incomes when your total earnings already cross the higher rate threshold (£50,270).';
    estimatedPersonalAllowance = 0;
  } else if (cleanCode === 'D1') {
    codeCategory = 'special_rate';
    const ratePct = isScottish ? '48%' : '45%';
    codeMeaning = `Additional / Top Rate (D1) - All income is taxed at the highest ${ratePct} rate with zero tax-free allowance.`;
    allowanceExplanation = '£0 tax-free allowance. Used when your total earnings exceed £125,140.';
    estimatedPersonalAllowance = 0;
  } else if (cleanCode === 'NT') {
    codeCategory = 'nt';
    codeMeaning = 'No Tax (NT) - No Income Tax is deducted from this income source.';
    allowanceExplanation = 'Not subject to UK PAYE Income Tax deductions under current HMRC instruction.';
    estimatedPersonalAllowance = 0;
  } else if (cleanCode === '0T') {
    codeCategory = 'emergency';
    codeMeaning = 'Zero Allowance (0T) - You have no tax-free Personal Allowance for this employment.';
    allowanceExplanation = '£0 Personal Allowance. Earnings are taxed in standard progressive bands starting from the first pound. Often issued when starting a new job without a P45.';
    estimatedPersonalAllowance = 0;
  } else if (cleanCode.startsWith('K')) {
    codeCategory = 'k_code';
    const num = parseInt(cleanCode.substring(1), 10);
    numericPart = !isNaN(num) ? num : 0;
    const negativeAmount = numericPart * 10;
    estimatedPersonalAllowance = -negativeAmount;
    codeMeaning = `K Code (Negative Allowance) - Taxable company benefits or untaxed income from previous years exceed your Personal Allowance by £${negativeAmount.toLocaleString('en-GB')}.`;
    allowanceExplanation = `An additional £${negativeAmount.toLocaleString('en-GB')} is added to your taxable income before Income Tax is calculated.`;
  } else {
    // Standard match
    const match = cleanCode.match(/^(\d+)([A-Z]?)(.*)$/);
    if (match) {
      numericPart = parseInt(match[1], 10);
      suffix = match[2] || '';
      const emergencyFlag = match[3] || '';

      if (emergencyFlag.includes('W1') || emergencyFlag.includes('M1') || emergencyFlag.includes('X')) {
        warnings.push('This is an emergency tax code operated on a non-cumulative basis (Week 1 / Month 1). Tax is calculated solely on current pay period earnings.');
      }

      let baseAllowance = numericPart * 10;

      if (suffix === 'L') {
        codeCategory = 'standard';
        estimatedPersonalAllowance = baseAllowance;
        allowanceExplanation = `Standard tax code granting £${baseAllowance.toLocaleString('en-GB')} tax-free Personal Allowance across the tax year.`;
        codeMeaning = `1257L is the standard UK PAYE tax code for an employee entitled to the £${baseAllowance.toLocaleString('en-GB')} Personal Allowance.`;
      } else if (suffix === 'M') {
        codeCategory = 'marriage';
        estimatedPersonalAllowance = baseAllowance;
        allowanceExplanation = `Includes Marriage Allowance recipient transfer (+£1,260), providing £${baseAllowance.toLocaleString('en-GB')} total tax-free allowance.`;
        codeMeaning = 'You have received a transfer of Marriage Allowance from your spouse or civil partner, increasing your personal tax-free allowance.';
      } else if (suffix === 'N') {
        codeCategory = 'marriage';
        estimatedPersonalAllowance = baseAllowance;
        allowanceExplanation = `Reflects Marriage Allowance transferor deduction (-£1,260), leaving £${baseAllowance.toLocaleString('en-GB')} tax-free allowance.`;
        codeMeaning = 'You have transferred 10% of your Personal Allowance (£1,260) to your spouse or civil partner.';
      } else if (suffix === 'T') {
        codeCategory = 'other';
        estimatedPersonalAllowance = baseAllowance;
        allowanceExplanation = `Personal allowance of £${baseAllowance.toLocaleString('en-GB')} subject to manual annual review by HMRC.`;
        codeMeaning = 'Your tax code includes other complex calculations or requires annual manual review by HMRC.';
      } else {
        estimatedPersonalAllowance = baseAllowance;
        allowanceExplanation = `Estimated tax-free allowance of £${baseAllowance.toLocaleString('en-GB')}.`;
        codeMeaning = `PAYE tax code with numeric allowance factor ${numericPart}.`;
      }
    } else {
      isValid = false;
      warnings.push('Unrecognised tax code format. Please verify with your payslip or HMRC Personal Tax Account.');
      codeMeaning = 'Unsupported or complex tax code structure.';
      allowanceExplanation = 'Cannot reliably calculate allowance for this code format.';
    }
  }

  // Estimated tax impact if salary provided
  let taxImpactEstimated: TaxCodeResult['taxImpactEstimated'] = undefined;
  if (input.annualSalary && input.annualSalary > 0) {
    const itRes = calculateIncomeTax({
      annualEmploymentIncome: input.annualSalary,
      region: isScottish ? 'scotland' : isWelsh ? 'wales' : 'england_wales_ni',
      taxCode: code,
      pensionContribution: 0,
      pensionType: 'auto_enrolment',
      taxYear,
    });
    taxImpactEstimated = {
      incomeTaxAnnual: itRes.incomeTaxAnnual,
      monthlyAllowance: Math.max(0, estimatedPersonalAllowance / 12),
      effectiveRate: itRes.effectiveRate,
    };
  }

  return {
    rawCode: code,
    prefix,
    numericPart,
    suffix,
    isScottish,
    isWelsh,
    estimatedPersonalAllowance,
    allowanceExplanation,
    codeMeaning,
    codeCategory,
    isValid,
    warnings,
    taxImpactEstimated,
  };
}

/**
 * 4. Calculate Employer National Insurance & Employment Cost (Dedicated Standalone Engine)
 */
export function calculateEmployerNationalInsurance(input: EmployerNiInput): EmployerNiResult {
  const niConfig = UK_NATIONAL_INSURANCE_CONFIGS[input.taxYear] || UK_NATIONAL_INSURANCE_CONFIGS[DEFAULT_TAX_YEAR];
  const taxConfig = UK_TAX_CONFIGS[input.taxYear] || UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];

  const salary = Math.max(0, input.grossSalary || 0);
  const bonus = Math.max(0, input.bonus || 0);
  const totalGrossPay = salary + bonus;

  const secondaryThreshold = niConfig.thresholds.secondaryThresholdAnnual; // £5,000 in 2025/26
  const standardRate = niConfig.rates.employerStandardRate; // 15% in 2025/26

  const grossSubjectToNi = Math.max(0, totalGrossPay - secondaryThreshold);
  const rawEmployerNiAnnual = grossSubjectToNi * standardRate;

  // Employment allowance
  let employmentAllowanceApplied = 0;
  if (input.applyEmploymentAllowance) {
    const maxAllowance = niConfig.rates.employmentAllowanceAnnual; // £10,500
    const existingUsed = Math.max(0, input.existingEmploymentAllowanceUsed || 0);
    const availableAllowance = Math.max(0, maxAllowance - existingUsed);
    employmentAllowanceApplied = Math.min(rawEmployerNiAnnual, availableAllowance);
  }

  const netEmployerNi = Math.max(0, rawEmployerNiAnnual - employmentAllowanceApplied);

  // Employer pension
  let employerPensionAnnual = 0;
  if (input.employerPensionFixed && input.employerPensionFixed > 0) {
    employerPensionAnnual = input.employerPensionFixed * 12;
  } else {
    const pensionPct = (input.employerPensionPercentage ?? 3.0) / 100;
    // Qualifying earnings calculation
    const qualifyingEarnings = Math.max(0, Math.min(totalGrossPay, taxConfig.autoEnrolment.upperThreshold) - taxConfig.autoEnrolment.lowerThreshold);
    employerPensionAnnual = qualifyingEarnings * pensionPct;
  }

  const totalCostOfEmploymentAnnual = totalGrossPay + netEmployerNi + employerPensionAnnual;
  const overheadPercentage = totalGrossPay > 0 ? ((totalCostOfEmploymentAnnual - totalGrossPay) / totalGrossPay) * 100 : 0;

  return {
    grossPay: totalGrossPay,
    secondaryThreshold,
    grossSubjectToNi,
    employerNiAnnual: rawEmployerNiAnnual,
    employerNiMonthly: rawEmployerNiAnnual / 12,
    employerNiWeekly: rawEmployerNiAnnual / 52,
    employerPensionAnnual,
    employerPensionMonthly: employerPensionAnnual / 12,
    employmentAllowanceApplied,
    netEmployerNi,
    totalCostOfEmploymentAnnual,
    totalCostOfEmploymentMonthly: totalCostOfEmploymentAnnual / 12,
    totalCostOfEmploymentWeekly: totalCostOfEmploymentAnnual / 52,
    overheadPercentage,
    employerNiRate: standardRate * 100,
    taxYearLabel: niConfig.yearLabel,
  };
}

/**
 * 5. Calculate Dividend Tax (Dedicated Standalone Engine)
 */
export function calculateDividendTax(input: DividendTaxInput): DividendTaxResult {
  const taxConfig = UK_TAX_CONFIGS[input.taxYear] || UK_TAX_CONFIGS[DEFAULT_TAX_YEAR];
  const divConfig = UK_DIVIDEND_TAX_CONFIGS[input.taxYear] || UK_DIVIDEND_TAX_CONFIGS[DEFAULT_TAX_YEAR];

  const otherIncome = Math.max(0, input.otherTaxableIncome || 0);
  const dividendIncome = Math.max(0, input.dividendIncome || 0);
  const totalIncome = otherIncome + dividendIncome;

  // Personal Allowance & £100k taper
  let personalAllowance = taxConfig.standardPersonalAllowance; // £12,570
  if (totalIncome > taxConfig.personalAllowanceTaperThreshold) {
    const excess = totalIncome - taxConfig.personalAllowanceTaperThreshold;
    const taperLoss = Math.min(personalAllowance, Math.floor(excess / 2));
    personalAllowance = Math.max(0, personalAllowance - taperLoss);
  }

  // 1. Other income uses Personal Allowance first
  const personalAllowanceUsedOther = Math.min(otherIncome, personalAllowance);
  const taxableOtherIncome = Math.max(0, otherIncome - personalAllowanceUsedOther);
  const personalAllowanceRemainingForDividends = Math.max(0, personalAllowance - personalAllowanceUsedOther);

  // 2. Tax on other income (for total tax context)
  const isScotland = input.region === 'scotland';
  let incomeTaxOnOtherIncome = 0;
  if (isScotland) {
    incomeTaxOnOtherIncome = calculateScottishIncomeTax(taxableOtherIncome, taxConfig.scotlandTaxBands).totalTax;
  } else {
    incomeTaxOnOtherIncome = calculateRukIncomeTax(taxableOtherIncome, taxConfig.rUKTaxBands).totalTax;
  }

  // 3. Dividends offset by remaining Personal Allowance
  const dividendsAfterPA = Math.max(0, dividendIncome - personalAllowanceRemainingForDividends);

  // 4. Dividend Allowance £500
  const dividendAllowanceUsed = Math.min(dividendsAfterPA, divConfig.dividendAllowance);
  const taxableDividends = Math.max(0, dividendsAfterPA - dividendAllowanceUsed);

  // 5. Income stacking across tax bands
  // Basic rate band spans £0 to £37,700 taxable income (£12,570 to £50,270 total income)
  const basicBandWidth = divConfig.incomeThresholds.basicRateUpper - taxConfig.standardPersonalAllowance; // £37,700
  const higherBandWidth = divConfig.incomeThresholds.higherRateUpper - divConfig.incomeThresholds.basicRateUpper; // £74,870

  const totalTaxableIncomeBeforeDividends = taxableOtherIncome;
  const basicBandRemaining = Math.max(0, basicBandWidth - totalTaxableIncomeBeforeDividends);

  // Basic rate band dividends
  const basicBandDividends = Math.min(taxableDividends, basicBandRemaining);
  const remainingAfterBasic = Math.max(0, taxableDividends - basicBandDividends);

  // Higher rate band dividends
  const higherBandRemaining = Math.max(0, higherBandWidth - Math.max(0, totalTaxableIncomeBeforeDividends - basicBandWidth));
  const higherBandDividends = Math.min(remainingAfterBasic, higherBandRemaining);
  const additionalBandDividends = Math.max(0, remainingAfterBasic - higherBandDividends);

  // Apply rates
  const dividendTaxBasic = basicBandDividends * divConfig.rates.basicRate;
  const dividendTaxHigher = higherBandDividends * divConfig.rates.higherRate;
  const dividendTaxAdditional = additionalBandDividends * divConfig.rates.additionalRate;

  const totalDividendTax = dividendTaxBasic + dividendTaxHigher + dividendTaxAdditional;
  const effectiveDividendTaxRate = dividendIncome > 0 ? (totalDividendTax / dividendIncome) * 100 : 0;
  const overallTotalTax = incomeTaxOnOtherIncome + totalDividendTax;
  const overallTakeHome = totalIncome - overallTotalTax;

  return {
    totalIncome,
    otherIncome,
    dividendIncome,
    personalAllowanceTotal: personalAllowance,
    personalAllowanceUsedOther,
    personalAllowanceRemainingForDividends,
    dividendAllowanceUsed,
    taxableDividends,
    basicBandDividends,
    higherBandDividends,
    additionalBandDividends,
    dividendTaxBasic,
    dividendTaxHigher,
    dividendTaxAdditional,
    totalDividendTax,
    effectiveDividendTaxRate,
    incomeTaxOnOtherIncome,
    overallTotalTax,
    overallTakeHome,
    taxYearLabel: divConfig.yearLabel,
  };
}

/**
 * 6. Calculate Mortgage Repayment & Amortisation (Dedicated Standalone Engine)
 */
export function calculateMortgageRepayment(input: MortgageInput): MortgageResult {
  const propertyPrice = Math.max(0, input.propertyPrice || 0);
  let depositAmount = Math.max(0, input.depositAmount || 0);

  if (input.isDepositPercentage && input.depositPercentage !== undefined) {
    depositAmount = propertyPrice * (input.depositPercentage / 100);
  }

  const feesAdded = Math.max(0, input.feesAddedToLoan || 0);
  const rawLoanAmount = Math.max(0, propertyPrice - depositAmount + feesAdded);
  const loanAmount = Math.round(rawLoanAmount * 100) / 100;
  const loanToValue = propertyPrice > 0 ? (loanAmount / propertyPrice) * 100 : 0;

  const termYears = Math.max(1, Math.min(40, input.termYears || 25));
  const interestRate = Math.max(0, input.interestRate || 0);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;

  let monthlyPayment = 0;
  let totalInterest = 0;
  let totalRepaid = 0;

  if (input.repaymentType === 'interest_only') {
    monthlyPayment = loanAmount * monthlyRate;
    totalInterest = monthlyPayment * totalMonths;
    totalRepaid = totalInterest + loanAmount;
  } else {
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / totalMonths;
      totalInterest = 0;
      totalRepaid = loanAmount;
    } else {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      monthlyPayment = loanAmount * ((monthlyRate * factor) / (factor - 1));
      totalRepaid = monthlyPayment * totalMonths;
      totalInterest = Math.max(0, totalRepaid - loanAmount);
    }
  }

  // Yearly Amortisation Schedule
  const schedule: MortgageYearScheduleItem[] = [];
  let currentBalance = loanAmount;

  for (let year = 1; year <= termYears; year++) {
    const startBal = currentBalance;
    let interestPaidThisYear = 0;
    let principalPaidThisYear = 0;

    for (let month = 1; month <= 12; month++) {
      if (currentBalance <= 0) break;
      const monthInterest = currentBalance * monthlyRate;
      let monthPrincipal = input.repaymentType === 'interest_only' ? 0 : monthlyPayment - monthInterest;
      if (monthPrincipal > currentBalance) monthPrincipal = currentBalance;

      interestPaidThisYear += monthInterest;
      principalPaidThisYear += monthPrincipal;
      currentBalance = Math.max(0, currentBalance - monthPrincipal);
    }

    schedule.push({
      year,
      startBalance: startBal,
      totalPaidYear: principalPaidThisYear + interestPaidThisYear,
      principalPaidYear: principalPaidThisYear,
      interestPaidYear: interestPaidThisYear,
      endBalance: input.repaymentType === 'interest_only' ? loanAmount : currentBalance,
      loanToValue: propertyPrice > 0 ? (currentBalance / propertyPrice) * 100 : 0,
    });
  }

  // Overpayment impact calculation
  let overpaymentImpact: MortgageResult['overpaymentImpact'] = undefined;
  const overpaymentMonthly = Math.max(0, input.monthlyOverpayment || 0);

  if (overpaymentMonthly > 0 && input.repaymentType === 'repayment' && monthlyRate > 0) {
    const effectiveMonthly = monthlyPayment + overpaymentMonthly;
    let opBalance = loanAmount;
    let opTotalInterest = 0;
    let opMonths = 0;

    while (opBalance > 0.01 && opMonths < totalMonths * 2) {
      opMonths++;
      const mInterest = opBalance * monthlyRate;
      opTotalInterest += mInterest;
      const mPrincipal = Math.min(opBalance, effectiveMonthly - mInterest);
      opBalance = Math.max(0, opBalance - mPrincipal);
    }

    const monthsSaved = Math.max(0, totalMonths - opMonths);
    const yearsSaved = Math.floor(monthsSaved / 12);
    const remainingMonthsSaved = monthsSaved % 12;
    const interestSaved = Math.max(0, totalInterest - opTotalInterest);

    overpaymentImpact = {
      monthlyPaymentWithOverpayment: effectiveMonthly,
      newTermYears: Math.floor(opMonths / 12),
      newTermMonths: opMonths % 12,
      totalInterestSaved: interestSaved,
      yearsSaved,
      monthsSaved: remainingMonthsSaved,
      newTotalInterest: opTotalInterest,
    };
  }

  return {
    propertyPrice,
    depositAmount,
    loanAmount,
    loanToValue,
    monthlyPayment,
    annualPayment: monthlyPayment * 12,
    totalInterest,
    totalRepaid,
    repaymentType: input.repaymentType,
    termYears,
    interestRate,
    overpaymentImpact,
    schedule,
  };
}

/**
 * 7. Calculate Mortgage Affordability (Dedicated Standalone Engine)
 */
export function calculateMortgageAffordability(input: MortgageAffordabilityInput): MortgageAffordabilityResult {
  const app1 = Math.max(0, input.applicant1Income || 0);
  const app2 = Math.max(0, input.applicant2Income || 0);
  const totalGrossIncome = app1 + app2;
  const deposit = Math.max(0, input.depositAmount || 0);

  const debts = Math.max(0, input.monthlyDebtPayments || 0);
  const childcare = Math.max(0, input.monthlyChildcare || 0);
  const other = Math.max(0, input.monthlyOtherCommitments || 0);
  const totalMonthlyCommitments = debts + childcare + other;
  const annualisedCommitments = totalMonthlyCommitments * 12;

  // Commitments reduce borrowing headroom by roughly 12x annual commitments or lender debt factor
  const commitmentReduction = annualisedCommitments * 4.0;
  const netAdjustedIncome = Math.max(0, totalGrossIncome - (annualisedCommitments * 0.5));

  const termYears = input.termYears || 25;
  const interestRate = input.interestRate || 4.5;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;

  function calcRepayment(loan: number) {
    if (loan <= 0 || monthlyRate === 0) return 0;
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    return loan * ((monthlyRate * factor) / (factor - 1));
  }

  const multiples = UK_MORTGAGE_CONFIG.incomeMultiples;
  const borrowingEstimates: MortgageBorrowingEstimateItem[] = multiples.map((m) => {
    const rawBorrow = totalGrossIncome * m.multiple;
    const adjustedBorrow = Math.max(0, rawBorrow - commitmentReduction);
    const maxPropertyPrice = adjustedBorrow + deposit;
    const monthlyRepaymentEstimate = calcRepayment(adjustedBorrow);

    return {
      multiple: m.multiple,
      label: m.label,
      maxBorrowing: Math.round(adjustedBorrow),
      maxPropertyPrice: Math.round(maxPropertyPrice),
      monthlyRepaymentEstimate: Math.round(monthlyRepaymentEstimate * 100) / 100,
      category: m.category,
    };
  });

  const selectedMultiple = input.incomeMultiple || 4.5;
  const rawIndicativeBorrow = totalGrossIncome * selectedMultiple;
  const indicativeMaxBorrowing = Math.max(0, Math.round(rawIndicativeBorrow - commitmentReduction));
  const indicativeMaxPropertyPrice = indicativeMaxBorrowing + deposit;
  const estimatedMonthlyPayment = calcRepayment(indicativeMaxBorrowing);

  const debtToIncomeRatio = totalGrossIncome > 0 ? (annualisedCommitments / totalGrossIncome) * 100 : 0;

  let commitmentsWarning: string | undefined = undefined;
  if (debtToIncomeRatio > 25) {
    commitmentsWarning = `Committed outgoings represent ${debtToIncomeRatio.toFixed(1)}% of your gross annual income. High commitments significantly reduce lender borrowing approval limits.`;
  }

  return {
    totalGrossIncome,
    applicant1Income: app1,
    applicant2Income: app2,
    totalMonthlyCommitments,
    annualisedCommitments,
    netAdjustedIncome,
    depositAmount: deposit,
    borrowingEstimates,
    selectedMultiple,
    indicativeMaxBorrowing,
    indicativeMaxPropertyPrice,
    estimatedMonthlyPayment,
    debtToIncomeRatio,
    commitmentsWarning,
  };
}

/**
 * 8. Calculate ISA Savings & Growth (Dedicated Standalone Engine)
 */
export function calculateIsaGrowth(input: IsaInput): IsaResult {
  const isaConfig = UK_ISA_CONFIGS[input.taxYear || DEFAULT_TAX_YEAR] || UK_ISA_CONFIGS[DEFAULT_TAX_YEAR];
  const annualAllowance = isaConfig.allowances.annualOverallAllowance; // £20,000

  const startingBalance = Math.max(0, input.currentBalance || 0);
  const monthlyContrib = Math.max(0, input.monthlyContribution || 0);
  const annualLumpSum = Math.max(0, input.annualLumpSum || 0);
  const totalAnnualContribution = monthlyContrib * 12 + annualLumpSum;

  const isWithinAnnualAllowance = totalAnnualContribution <= annualAllowance;
  const allowanceRemaining = Math.max(0, annualAllowance - totalAnnualContribution);

  const periodYears = Math.max(1, Math.min(50, input.timePeriodYears || 10));
  const growthRate = Math.max(0, input.annualGrowthRate || 0);
  const monthlyGrowthRate = growthRate / 100 / 12;
  const inflationRate = Math.max(0, input.annualInflationRate || 0);

  const isLisa = input.isaType === 'lifetime_isa';
  const lisaBonusRate = isaConfig.allowances.lifetimeIsaBonusRate; // 25%

  const projectionTable: IsaYearProjection[] = [];
  let currentBal = startingBalance;
  let cumulativeContrib = startingBalance;
  let cumulativeGrowth = 0;
  let lisaBonusTotal = 0;

  for (let year = 1; year <= periodYears; year++) {
    const startBal = currentBal;
    let yearContrib = totalAnnualContribution;
    let yearLisaBonus = 0;

    if (isLisa) {
      const qualifyingLisaContribution = Math.min(yearContrib, isaConfig.allowances.lifetimeIsaAnnualAllowance);
      yearLisaBonus = qualifyingLisaContribution * lisaBonusRate;
      lisaBonusTotal += yearLisaBonus;
      yearContrib += yearLisaBonus;
    }

    cumulativeContrib += totalAnnualContribution;

    // Monthly compounding through the year
    let yearGrowth = 0;
    const monthlyDepositWithBonus = yearContrib / 12;

    for (let m = 1; m <= 12; m++) {
      currentBal += monthlyDepositWithBonus;
      const mGrowth = currentBal * monthlyGrowthRate;
      yearGrowth += mGrowth;
      currentBal += mGrowth;
    }

    cumulativeGrowth += yearGrowth;
    const inflationAdjusted = currentBal / Math.pow(1 + inflationRate / 100, year);

    projectionTable.push({
      year,
      startingBalance: startBal,
      contributionsYear: yearContrib,
      totalContributionsToDate: cumulativeContrib,
      growthYear: yearGrowth,
      totalGrowthToDate: cumulativeGrowth,
      endingBalance: currentBal,
      inflationAdjustedBalance: inflationAdjusted,
    });
  }

  const projectedEndingBalance = currentBal;
  const totalGrowth = Math.max(0, projectedEndingBalance - cumulativeContrib - lisaBonusTotal);
  const inflationAdjustedEndingBalance = projectedEndingBalance / Math.pow(1 + inflationRate / 100, periodYears);

  return {
    currentBalance: startingBalance,
    totalContributions: cumulativeContrib,
    totalGrowth,
    projectedEndingBalance,
    inflationAdjustedEndingBalance,
    annualAllowance,
    totalAnnualContribution,
    isWithinAnnualAllowance,
    allowanceRemaining,
    lisaBonusTotal: isLisa ? lisaBonusTotal : undefined,
    projectionTable,
    isaType: input.isaType,
    assumedGrowthRate: growthRate,
    assumedInflationRate: inflationRate,
  };
}

/**
 * 9. Calculate Savings Growth & Interest (Dedicated Standalone Engine)
 */
export function calculateSavingsGrowth(input: SavingsInput): SavingsResult {
  const startingBalance = Math.max(0, input.startingBalance || 0);
  const monthlyDeposit = Math.max(0, input.monthlyDeposit || 0);
  const rate = Math.max(0, input.annualInterestRate || 0);
  const periodYears = Math.max(1, Math.min(50, input.periodYears || 5));
  const inflationRate = Math.max(0, input.annualInflationRate || 0);

  const projectionTable: SavingsYearProjection[] = [];
  let currentBalance = startingBalance;
  let totalDepositsToDate = startingBalance;
  let totalInterestToDate = 0;

  const isMonthly = input.compoundingFrequency === 'monthly';
  const monthlyRate = rate / 100 / 12;

  for (let year = 1; year <= periodYears; year++) {
    const startOfYearBalance = currentBalance;
    const yearDeposits = monthlyDeposit * 12;
    totalDepositsToDate += yearDeposits;
    let yearInterest = 0;

    if (isMonthly) {
      for (let m = 1; m <= 12; m++) {
        currentBalance += monthlyDeposit;
        const mInterest = currentBalance * monthlyRate;
        yearInterest += mInterest;
        currentBalance += mInterest;
      }
    } else {
      // Annual compounding
      currentBalance += yearDeposits;
      yearInterest = currentBalance * (rate / 100);
      currentBalance += yearInterest;
    }

    totalInterestToDate += yearInterest;
    const inflationAdjusted = currentBalance / Math.pow(1 + inflationRate / 100, year);

    projectionTable.push({
      year,
      startingBalance: startOfYearBalance,
      totalDepositsYear: yearDeposits,
      totalDepositsToDate,
      interestEarnedYear: yearInterest,
      totalInterestToDate,
      endingBalance: currentBalance,
      inflationAdjustedBalance: inflationAdjusted,
    });
  }

  const effectiveApy = isMonthly ? (Math.pow(1 + monthlyRate, 12) - 1) * 100 : rate;
  const inflationAdjustedBalance = currentBalance / Math.pow(1 + inflationRate / 100, periodYears);

  return {
    startingBalance,
    totalDeposits: totalDepositsToDate,
    totalInterestEarned: totalInterestToDate,
    finalBalance: currentBalance,
    inflationAdjustedBalance,
    effectiveApy,
    projectionTable,
    personalSavingsAllowanceGuidance: {
      basicRateAllowance: 1000,
      higherRateAllowance: 500,
      additionalRateAllowance: 0,
    },
  };
}

/**
 * 10. Calculate Capital Gains Tax (Dedicated Standalone Engine)
 */
export function calculateCapitalGainsTax(input: CgtInput): CgtResult {
  const cgtConfig = UK_CAPITAL_GAINS_TAX_CONFIGS[input.taxYear || DEFAULT_TAX_YEAR] || UK_CAPITAL_GAINS_TAX_CONFIGS[DEFAULT_TAX_YEAR];

  if (input.isMainResidenceExempt && input.assetType === 'residential_property') {
    return {
      assetType: input.assetType,
      saleProceeds: input.saleProceeds,
      totalCost: input.purchasePrice,
      allowableCosts: 0,
      grossGain: 0,
      lossesApplied: 0,
      netGainBeforeAllowance: 0,
      annualExemptAmountApplied: 0,
      annualExemptAmountRemaining: cgtConfig.annualExemptAmountIndividual,
      taxableGain: 0,
      basicBandRemaining: 0,
      gainInBasicBand: 0,
      gainInHigherBand: 0,
      basicBandRate: 18,
      higherBandRate: 24,
      cgtBasicBand: 0,
      cgtHigherBand: 0,
      totalCgtPayable: 0,
      effectiveCgtRate: 0,
      taxYearLabel: cgtConfig.yearLabel,
      isFullyExempt: true,
      exclusionsSummary: ['Fully covered by Private Residence Relief (PRR) - 0% Capital Gains Tax payable.'],
    };
  }

  const proceeds = Math.max(0, input.saleProceeds || 0);
  const purchasePrice = Math.max(0, input.purchasePrice || 0);
  const purchaseCosts = Math.max(0, input.purchaseCosts || 0);
  const saleCosts = Math.max(0, input.saleCosts || 0);
  const improvementCosts = Math.max(0, input.improvementCosts || 0);

  const allowableCosts = purchaseCosts + saleCosts + improvementCosts;
  const totalCost = purchasePrice + allowableCosts;
  const grossGain = Math.max(0, proceeds - totalCost);

  const previousLosses = Math.max(0, input.previousLosses || 0);
  const lossesApplied = Math.min(grossGain, previousLosses);
  const netGainBeforeAllowance = Math.max(0, grossGain - lossesApplied);

  const aea = cgtConfig.annualExemptAmountIndividual; // £3,000
  const aeaApplied = Math.min(netGainBeforeAllowance, aea);
  const aeaRemaining = Math.max(0, aea - aeaApplied);
  const taxableGain = Math.max(0, netGainBeforeAllowance - aeaApplied);

  // Income stacking to determine basic vs higher CGT band
  const otherIncome = Math.max(0, input.otherTaxableIncome || 0);
  const basicRateCeiling = cgtConfig.basicRateBandThreshold; // £50,270
  const basicBandRemaining = Math.max(0, basicRateCeiling - otherIncome);

  const gainInBasicBand = Math.min(taxableGain, basicBandRemaining);
  const gainInHigherBand = Math.max(0, taxableGain - gainInBasicBand);

  // Rates: 18% basic / 24% higher
  const rateBasic = cgtConfig.rates.sharesAndOtherAssets.basicRate; // 0.18
  const rateHigher = cgtConfig.rates.sharesAndOtherAssets.higherRate; // 0.24

  const cgtBasicBand = gainInBasicBand * rateBasic;
  const cgtHigherBand = gainInHigherBand * rateHigher;
  const totalCgtPayable = cgtBasicBand + cgtHigherBand;
  const effectiveCgtRate = netGainBeforeAllowance > 0 ? (totalCgtPayable / netGainBeforeAllowance) * 100 : 0;

  const exclusionsSummary: string[] = [
    'Does not calculate Business Asset Disposal Relief (BADR) or Investors’ Relief.',
    'Excludes partial Private Residence Relief (PRR) or lettings relief apportionment.',
    'Assumes standard individual UK resident tax status with disposals occurring within a single tax year.',
  ];

  return {
    assetType: input.assetType,
    saleProceeds: proceeds,
    totalCost,
    allowableCosts,
    grossGain,
    lossesApplied,
    netGainBeforeAllowance,
    annualExemptAmountApplied: aeaApplied,
    annualExemptAmountRemaining: aeaRemaining,
    taxableGain,
    basicBandRemaining,
    gainInBasicBand,
    gainInHigherBand,
    basicBandRate: rateBasic * 100,
    higherBandRate: rateHigher * 100,
    cgtBasicBand,
    cgtHigherBand,
    totalCgtPayable,
    effectiveCgtRate,
    taxYearLabel: cgtConfig.yearLabel,
    isFullyExempt: false,
    exclusionsSummary,
  };
}

/**
 * 11. Stamp Duty Land Tax (SDLT) Calculator
 * England and Northern Ireland residential property purchase tax.
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
 */
export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  const configKey = input.taxYearKey || DEFAULT_TAX_YEAR;
  const config = UK_STAMP_DUTY_CONFIGS[configKey] || UK_STAMP_DUTY_CONFIGS[DEFAULT_TAX_YEAR];
  const price = Math.max(0, input.propertyPrice);
  const isAdditional = input.buyerType === 'additional_property';
  const isFirstTime = input.buyerType === 'first_time_buyer';
  const isNonUk = !!input.isNonUkResident;

  // Determine applicable band schedule
  let bands = config.standardResidentialBands;
  let ftbReliefApplied = false;
  let ftbReliefSavings = 0;

  if (isFirstTime) {
    if (price <= config.firstTimeBuyerMaxPropertyPrice) {
      bands = config.firstTimeBuyerBands;
      ftbReliefApplied = true;
    } else {
      // If price exceeds FTB cap, standard rates apply without FTB relief
      bands = config.standardResidentialBands;
    }
  }

  // Calculate baseline standard tax
  let standardTaxWithoutFtb = 0;
  for (const b of config.standardResidentialBands) {
    if (price > b.min) {
      const taxable = Math.min(price, b.max) - b.min;
      standardTaxWithoutFtb += taxable * b.rate;
    }
  }

  // Calculate tax across chosen bands
  let baseTax = 0;
  const bandsBreakdown: StampDutyBandBreakdown[] = [];

  for (const band of bands) {
    if (price > band.min) {
      const taxableInBand = Math.min(price, band.max) - band.min;
      const baseRate = band.rate;
      let effectiveRate = baseRate;

      if (isAdditional) {
        effectiveRate += config.additionalPropertySurchargeRate; // +5%
      }
      if (isNonUk) {
        effectiveRate += config.nonUkResidentSurchargeRate; // +2%
      }

      const taxInBand = taxableInBand * effectiveRate;
      baseTax += taxInBand;

      bandsBreakdown.push({
        bandName: band.name,
        min: band.min,
        max: band.max,
        ratePercent: Math.round(effectiveRate * 100 * 10) / 10,
        taxableInBand,
        taxInBand,
      });
    }
  }

  // Surcharges breakdown
  const surchargeAmount = isAdditional ? price * config.additionalPropertySurchargeRate : 0;
  const nonUkSurchargeAmount = isNonUk ? price * config.nonUkResidentSurchargeRate : 0;

  if (ftbReliefApplied) {
    let ftbBaseTaxOnly = 0;
    for (const b of config.firstTimeBuyerBands) {
      if (price > b.min) {
        const taxable = Math.min(price, b.max) - b.min;
        ftbBaseTaxOnly += taxable * b.rate;
      }
    }
    ftbReliefSavings = Math.max(0, standardTaxWithoutFtb - ftbBaseTaxOnly);
  }

  const totalStampDuty = baseTax;
  const effectiveRate = price > 0 ? (totalStampDuty / price) * 100 : 0;

  return {
    propertyPrice: price,
    buyerType: input.buyerType,
    isNonUkResident: isNonUk,
    totalStampDuty,
    effectiveRate,
    bandsBreakdown,
    surchargeAmount,
    nonUkSurchargeAmount,
    ftbReliefApplied,
    ftbReliefSavings,
    taxYearLabel: config.taxYearLabel,
  };
}

/**
 * 12. Mortgage Overpayment Calculator
 * Computes term reduction, interest savings, and year-by-year amortisation.
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
 */
export function calculateMortgageOverpayment(input: MortgageOverpaymentInput): MortgageOverpaymentResult {
  const balance = Math.max(1000, input.currentBalance);
  const annualRate = Math.max(0.1, input.interestRate) / 100;
  const monthlyRate = annualRate / 12;
  const totalMonthsOriginal = Math.max(12, input.remainingTermYears * 12 + (input.remainingTermMonths || 0));
  const monthlyOverpay = Math.max(0, input.monthlyOverpayment);
  const lumpSum = Math.max(0, input.lumpSumOverpayment || 0);
  const lumpSumMonth = Math.max(1, input.lumpSumMonth || 1);

  // Standard Monthly Payment (Repayment Mortgage Formula)
  const standardMonthlyPayment =
    monthlyRate === 0
      ? balance / totalMonthsOriginal
      : (balance * (monthlyRate * Math.pow(1 + monthlyRate, totalMonthsOriginal))) /
        (Math.pow(1 + monthlyRate, totalMonthsOriginal) - 1);

  // 1. Simulate Standard Track (No Overpayment)
  let standardBal = balance;
  let totalInterestStandard = 0;
  for (let m = 1; m <= totalMonthsOriginal; m++) {
    const interest = standardBal * monthlyRate;
    const principal = Math.min(standardBal, standardMonthlyPayment - interest);
    totalInterestStandard += interest;
    standardBal -= principal;
    if (standardBal <= 0) break;
  }
  const totalCostStandard = balance + totalInterestStandard;

  // 2. Simulate Overpayment Track
  let overpayBal = balance;
  let totalInterestWithOverpayment = 0;
  let actualMonthsWithOverpayment = 0;
  const schedule: MortgageOverpaymentYearItem[] = [];

  let currentYearStandardInterest = 0;
  let currentYearOverpayInterest = 0;
  let trackingStandardBal = balance;

  const maxSimMonths = totalMonthsOriginal;

  for (let m = 1; m <= maxSimMonths; m++) {
    // Standard reference for year comparison
    if (trackingStandardBal > 0) {
      const stdInterest = trackingStandardBal * monthlyRate;
      const stdPrincipal = Math.min(trackingStandardBal, standardMonthlyPayment - stdInterest);
      currentYearStandardInterest += stdInterest;
      trackingStandardBal -= stdPrincipal;
    }

    if (overpayBal > 0) {
      actualMonthsWithOverpayment++;
      const interest = overpayBal * monthlyRate;
      totalInterestWithOverpayment += interest;
      currentYearOverpayInterest += interest;

      let payment = standardMonthlyPayment + monthlyOverpay;
      if (m === lumpSumMonth) {
        payment += lumpSum;
      }

      const principal = Math.min(overpayBal, payment - interest);
      overpayBal -= principal;
    }

    // Capture annual schedule snapshots every 12 months or at mortgage end
    if (m % 12 === 0 || m === maxSimMonths || (overpayBal <= 0 && m % 12 !== 0 && schedule.length < Math.ceil(m / 12))) {
      const yearNum = Math.ceil(m / 12);
      const existingYearIdx = schedule.findIndex((s) => s.year === yearNum);
      if (existingYearIdx === -1) {
        schedule.push({
          year: yearNum,
          standardBalance: Math.max(0, trackingStandardBal),
          overpaymentBalance: Math.max(0, overpayBal),
          standardInterestPaidYear: currentYearStandardInterest,
          overpaymentInterestPaidYear: currentYearOverpayInterest,
          interestSavedYear: Math.max(0, currentYearStandardInterest - currentYearOverpayInterest),
        });
        currentYearStandardInterest = 0;
        currentYearOverpayInterest = 0;
      }
    }
  }

  const totalCostWithOverpayment = balance + totalInterestWithOverpayment;
  const totalInterestSaved = Math.max(0, totalInterestStandard - totalInterestWithOverpayment);

  const monthsSaved = Math.max(0, totalMonthsOriginal - actualMonthsWithOverpayment);
  const yearsSaved = Math.floor(monthsSaved / 12);
  const remainingMonthsSaved = monthsSaved % 12;

  const newTermYears = Math.floor(actualMonthsWithOverpayment / 12);
  const newTermMonths = actualMonthsWithOverpayment % 12;

  return {
    currentBalance: balance,
    interestRate: input.interestRate,
    originalTermYears: Math.floor(totalMonthsOriginal / 12),
    originalTermMonths: totalMonthsOriginal % 12,
    monthlyPaymentStandard: standardMonthlyPayment,
    totalPaymentMonthlyWithOverpayment: standardMonthlyPayment + monthlyOverpay,
    monthlyOverpayment: monthlyOverpay,
    lumpSumOverpayment: lumpSum,
    totalInterestStandard,
    totalCostStandard,
    totalInterestWithOverpayment,
    totalCostWithOverpayment,
    totalInterestSaved,
    newTermYears,
    newTermMonths,
    yearsSaved,
    monthsSaved: remainingMonthsSaved,
    schedule: schedule.slice(0, 15), // Up to 15 years table breakdown
  };
}

/**
 * 13. Credit Card Repayment Calculator
 * Simulates repayment schedules, APR compounding, minimum payments vs fixed plans.
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
 */
export function calculateCreditCardRepayment(input: CreditCardRepaymentInput): CreditCardRepaymentResult {
  const balance = Math.max(50, input.currentBalance);
  const apr = Math.max(0, input.annualInterestRate);
  const monthlyInterestRate = Math.pow(1 + apr / 100, 1 / 12) - 1; // Monthly compound equivalent or nominal / 12
  const nominalMonthlyRate = apr / 100 / 12;

  // 1. Simulate Minimum Payment Baseline
  let minBal = balance;
  let minTotalInterest = 0;
  let minTotalMonths = 0;
  const maxCapMonths = UK_CREDIT_CARD_RULES.maxRepaymentMonthsProjection;

  while (minBal > 0.01 && minTotalMonths < maxCapMonths) {
    minTotalMonths++;
    const monthlyInterest = minBal * nominalMonthlyRate;
    minTotalInterest += monthlyInterest;

    // UK Standard Min Repayment: greater of £5, 2.5% of balance, or 1% balance + interest
    const rule1 = minBal * UK_CREDIT_CARD_RULES.minPaymentPercentOfBalance;
    const rule2 = minBal * UK_CREDIT_CARD_RULES.minPaymentPrincipalPercent + monthlyInterest;
    let minPayment = Math.max(UK_CREDIT_CARD_RULES.minPaymentFlatFloor, rule1, rule2);
    minPayment = Math.min(minBal + monthlyInterest, minPayment);

    const principalPaid = Math.max(0, minPayment - monthlyInterest);
    minBal = Math.max(0, minBal - principalPaid);
  }

  // 2. Simulate User Strategy
  let userBal = balance;
  let userTotalInterest = 0;
  let userTotalMonths = 0;
  const schedule: CreditCardMonthItem[] = [];
  let isRepaymentTooLow = false;
  let warningMessage: string | undefined;

  let fixedPayment = input.fixedMonthlyPayment || 0;

  if (input.strategy === 'minimum_only') {
    userTotalMonths = minTotalMonths;
    userTotalInterest = minTotalInterest;
    // Generate up to first 24 months schedule
    let sBal = balance;
    for (let m = 1; m <= Math.min(36, minTotalMonths); m++) {
      const interest = sBal * nominalMonthlyRate;
      const rule1 = sBal * UK_CREDIT_CARD_RULES.minPaymentPercentOfBalance;
      const rule2 = sBal * UK_CREDIT_CARD_RULES.minPaymentPrincipalPercent + interest;
      let pay = Math.max(UK_CREDIT_CARD_RULES.minPaymentFlatFloor, rule1, rule2);
      pay = Math.min(sBal + interest, pay);
      const principal = Math.max(0, pay - interest);
      const endBal = Math.max(0, sBal - principal);
      schedule.push({
        month: m,
        startingBalance: sBal,
        interestCharged: interest,
        repaymentAmount: pay,
        principalPaid: principal,
        endingBalance: endBal,
      });
      sBal = endBal;
      if (sBal <= 0) break;
    }
  } else if (input.strategy === 'target_months') {
    const targetMonths = Math.max(1, Math.min(360, input.targetMonths || 12));
    if (nominalMonthlyRate === 0) {
      fixedPayment = balance / targetMonths;
    } else {
      fixedPayment =
        (balance * (nominalMonthlyRate * Math.pow(1 + nominalMonthlyRate, targetMonths))) /
        (Math.pow(1 + nominalMonthlyRate, targetMonths) - 1);
    }
  }

  if (input.strategy !== 'minimum_only') {
    // Check if fixed payment covers first month's interest
    const initialInterest = balance * nominalMonthlyRate;
    if (fixedPayment <= initialInterest) {
      isRepaymentTooLow = true;
      warningMessage = `Your monthly payment of £${fixedPayment.toFixed(2)} does not cover the initial monthly interest (£${initialInterest.toFixed(2)}). Increase payment to reduce debt.`;
      fixedPayment = initialInterest + 10;
    }

    userBal = balance;
    while (userBal > 0.01 && userTotalMonths < maxCapMonths) {
      userTotalMonths++;
      const interest = userBal * nominalMonthlyRate;
      userTotalInterest += interest;

      let payment = Math.min(userBal + interest, fixedPayment);
      const principal = Math.max(0, payment - interest);
      const endBal = Math.max(0, userBal - principal);

      if (userTotalMonths <= 36 || userBal <= 0.01) {
        schedule.push({
          month: userTotalMonths,
          startingBalance: userBal,
          interestCharged: interest,
          repaymentAmount: payment,
          principalPaid: principal,
          endingBalance: endBal,
        });
      }

      userBal = endBal;
    }
  }

  const effectiveMonthlyRepayment =
    input.strategy === 'minimum_only'
      ? Math.max(UK_CREDIT_CARD_RULES.minPaymentFlatFloor, balance * 0.025, balance * 0.01 + balance * nominalMonthlyRate)
      : fixedPayment;

  const totalCost = balance + userTotalInterest;
  const minCost = balance + minTotalInterest;

  return {
    currentBalance: balance,
    apr,
    strategy: input.strategy,
    monthlyRepayment: effectiveMonthlyRepayment,
    totalMonthsToPayoff: userTotalMonths,
    totalYearsToPayoff: Math.round((userTotalMonths / 12) * 10) / 10,
    totalInterestPaid: userTotalInterest,
    totalRepaymentCost: totalCost,
    minPaymentComparison:
      input.strategy !== 'minimum_only'
        ? {
            totalMonths: minTotalMonths,
            totalInterest: minTotalInterest,
            totalCost: minCost,
            interestSaved: Math.max(0, minTotalInterest - userTotalInterest),
            monthsSaved: Math.max(0, minTotalMonths - userTotalMonths),
          }
        : undefined,
    schedule,
    isRepaymentTooLow,
    warningMessage,
  };
}











