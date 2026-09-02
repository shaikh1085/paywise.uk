/**
 * PayWise UK - Central National Insurance Configuration
 * 
 * Configurable thresholds, contribution rates, and categories for employee and
 * employer Class 1 National Insurance across UK tax years.
 * 
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.
 * Primary Sources: HMRC National Insurance Manual, GOV.UK Rates & Thresholds for Class 1 National Insurance.
 */

export const NATIONAL_INSURANCE_CONFIG_METADATA = {
  lastReviewed: 'April 2026',
  currentTaxYear: '2026_27',
  version: '2.6.0',
  adminNotice: 'VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.',
};

export interface NiThresholdConfig {
  lowerEarningsLimitAnnual: number;    // LEL: £6,396
  primaryThresholdAnnual: number;      // PT: £12,570
  secondaryThresholdAnnual: number;    // ST: Employer threshold (£5,000 in 2025/26, £9,100 in 2024/25)
  upperEarningsLimitAnnual: number;    // UEL: £50,270
  upperSecondaryThresholdAnnual: number;// UST for under 21s: £50,270
  apprenticeUpperThresholdAnnual: number;// AUST for apprentices under 25: £50,270
  
  // Weekly equivalents
  lowerEarningsLimitWeekly: number;
  primaryThresholdWeekly: number;
  secondaryThresholdWeekly: number;
  upperEarningsLimitWeekly: number;

  // Monthly equivalents
  lowerEarningsLimitMonthly: number;
  primaryThresholdMonthly: number;
  secondaryThresholdMonthly: number;
  upperEarningsLimitMonthly: number;
}

export interface NiRateConfig {
  // Employee Class 1 Rates (Category A standard)
  employeeMainRate: number;      // 8% (0.08)
  employeeHigherRate: number;    // 2% (0.02)
  employeeReducedRateB: number;  // 1.85% (Category B: married women reduced)
  employeeOverStatePensionC: number; // 0% (Category C)
  
  // Employer Class 1 Rates
  employerStandardRate: number;  // 15% in 2025/26 (up from 13.8%)
  employerUnder21Rate: number;   // 0% up to UST, standard rate above
  employerApprenticeUnder25Rate: number; // 0% up to AUST, standard rate above
  
  // Statutory Employer Allowances
  employmentAllowanceAnnual: number; // £10,500 in 2025/26, £5,000 in 2024/25
  apprenticeshipLevyThreshold: number; // £3,000,000 annual paybill
  apprenticeshipLevyRate: number;      // 0.5% (0.005)
}

export interface NationalInsuranceYearConfig {
  yearLabel: string;
  thresholds: NiThresholdConfig;
  rates: NiRateConfig;
  notes: string;
}

export const UK_NATIONAL_INSURANCE_CONFIGS: Record<string, NationalInsuranceYearConfig> = {
  '2024_25': {
    yearLabel: '2024 / 2025',
    thresholds: {
      lowerEarningsLimitAnnual: 6396,
      primaryThresholdAnnual: 12570,
      secondaryThresholdAnnual: 9100,
      upperEarningsLimitAnnual: 50270,
      upperSecondaryThresholdAnnual: 50270,
      apprenticeUpperThresholdAnnual: 50270,
      lowerEarningsLimitWeekly: 123,
      primaryThresholdWeekly: 242,
      secondaryThresholdWeekly: 175,
      upperEarningsLimitWeekly: 967,
      lowerEarningsLimitMonthly: 533,
      primaryThresholdMonthly: 1048,
      secondaryThresholdMonthly: 758,
      upperEarningsLimitMonthly: 4189,
    },
    rates: {
      employeeMainRate: 0.08,
      employeeHigherRate: 0.02,
      employeeReducedRateB: 0.0185,
      employeeOverStatePensionC: 0.0,
      employerStandardRate: 0.138,
      employerUnder21Rate: 0.0,
      employerApprenticeUnder25Rate: 0.0,
      employmentAllowanceAnnual: 5000,
      apprenticeshipLevyThreshold: 3000000,
      apprenticeshipLevyRate: 0.005,
    },
    notes: 'Employee main rate was reduced to 8% from 6 April 2024. Employer Class 1 was 13.8% above £9,100.',
  },
  '2025_26': {
    yearLabel: '2025 / 2026',
    thresholds: {
      lowerEarningsLimitAnnual: 6396,
      primaryThresholdAnnual: 12570,
      secondaryThresholdAnnual: 5000, // Reduced from £9,100 to £5,000 from April 2025
      upperEarningsLimitAnnual: 50270,
      upperSecondaryThresholdAnnual: 50270,
      apprenticeUpperThresholdAnnual: 50270,
      lowerEarningsLimitWeekly: 125,
      primaryThresholdWeekly: 242,
      secondaryThresholdWeekly: 96,
      upperEarningsLimitWeekly: 967,
      lowerEarningsLimitMonthly: 533,
      primaryThresholdMonthly: 1048,
      secondaryThresholdMonthly: 417,
      upperEarningsLimitMonthly: 4189,
    },
    rates: {
      employeeMainRate: 0.08, // Main Class 1 rate remains 8%
      employeeHigherRate: 0.02, // Higher Class 1 rate remains 2%
      employeeReducedRateB: 0.0185,
      employeeOverStatePensionC: 0.0,
      employerStandardRate: 0.150, // Employer rate increased from 13.8% to 15.0%
      employerUnder21Rate: 0.0,
      employerApprenticeUnder25Rate: 0.0,
      employmentAllowanceAnnual: 10500, // Employment allowance increased to £10,500
      apprenticeshipLevyThreshold: 3000000,
      apprenticeshipLevyRate: 0.005,
    },
    notes: 'Autumn Budget 2024 changes: Employer NI is 15% and Secondary Threshold is £5,000. Employment Allowance is £10,500.',
  },
  '2026_27': {
    yearLabel: '2026 / 2027 (Current)',
    thresholds: {
      lowerEarningsLimitAnnual: 6708,
      primaryThresholdAnnual: 12570,
      secondaryThresholdAnnual: 5000,
      upperEarningsLimitAnnual: 50270,
      upperSecondaryThresholdAnnual: 50270,
      apprenticeUpperThresholdAnnual: 50270,
      lowerEarningsLimitWeekly: 129,
      primaryThresholdWeekly: 242,
      secondaryThresholdWeekly: 96,
      upperEarningsLimitWeekly: 967,
      lowerEarningsLimitMonthly: 559,
      primaryThresholdMonthly: 1048,
      secondaryThresholdMonthly: 417,
      upperEarningsLimitMonthly: 4189,
    },
    rates: {
      employeeMainRate: 0.08,
      employeeHigherRate: 0.02,
      employeeReducedRateB: 0.0185,
      employeeOverStatePensionC: 0.0,
      employerStandardRate: 0.150,
      employerUnder21Rate: 0.0,
      employerApprenticeUnder25Rate: 0.0,
      employmentAllowanceAnnual: 10500,
      apprenticeshipLevyThreshold: 3000000,
      apprenticeshipLevyRate: 0.005,
    },
    notes: 'Current 2026/27 statutory National Insurance rates and thresholds: Employee 8% (PT: £12,570, UEL: £50,270), Employer 15% (ST: £5,000, Employment Allowance £10,500).',
  },
};
