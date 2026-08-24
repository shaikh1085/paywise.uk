/**
 * PayWise UK - Central UK Tax & Payroll Configuration
 * 
 * All thresholds, rates, student loan limits, NHS Agenda for Change bands,
 * and teacher pay structures are maintained here in central editable structures.
 * 
 * IMPORTANT: Tax figures reflect current HM Revenue & Customs (HMRC) and Scottish
 * Government legislation. Verify with official HMRC/payroll guidance before production launch.
 */

export const TAX_CONFIG_METADATA = {
  lastUpdated: 'March 2026',
  currentTaxYearLabel: '2025 / 2026 (Current)',
  disclaimerShort: 'Calculations are estimates for illustration only and do not constitute financial, tax, or legal advice.',
  version: '2.4.0',
};

export interface TaxYearConfig {
  yearLabel: string;
  standardPersonalAllowance: number;
  personalAllowanceTaperThreshold: number; // £100,000 threshold
  blindPersonsAllowance: number;
  marriageAllowanceTransfer: number;

  // England, Wales, Northern Ireland Income Tax
  rUKTaxBands: {
    name: string;
    thresholdMin: number;
    thresholdMax: number;
    rate: number;
  }[];

  // Welsh Income Tax Bands (Devolved Welsh Rates of Income Tax - WRIT)
  walesTaxBands: {
    name: string;
    thresholdMin: number;
    thresholdMax: number;
    rate: number;
  }[];

  // Scottish Income Tax Bands (Devolved)
  scotlandTaxBands: {
    name: string;
    thresholdMin: number;
    thresholdMax: number;
    rate: number;
  }[];

  // Employee Class 1 National Insurance
  employeeNI: {
    lowerEarningsLimit: number; // £6,396 / yr
    primaryThreshold: number;   // £12,570 / yr
    upperEarningsLimit: number; // £50,270 / yr
    mainRate: number;           // 8% (0.08)
    higherRate: number;         // 2% (0.02)
  };

  // Employer Class 1 National Insurance
  employerNI: {
    secondaryThreshold: number; // £5,000 / yr (Autumn Budget updated)
    standardRate: number;       // 15.0% (0.15)
    employmentAllowance: number;// £10,500
    apprenticeshipLevyThreshold: number; // £3,000,000 paybill
    apprenticeshipLevyRate: number;      // 0.5% (0.005)
  };

  // Student Loans
  studentLoans: {
    plan1: { name: string; threshold: number; rate: number; desc: string };
    plan2: { name: string; threshold: number; rate: number; desc: string };
    plan4: { name: string; threshold: number; rate: number; desc: string };
    plan5: { name: string; threshold: number; rate: number; desc: string };
    postgrad: { name: string; threshold: number; rate: number; desc: string };
  };

  // Auto-enrolment qualifying earnings band
  autoEnrolment: {
    lowerThreshold: number; // £6,240 / yr
    upperThreshold: number; // £50,270 / yr
    defaultEmployeeMin: number; // 5%
    defaultEmployerMin: number; // 3%
  };

  // National Minimum Wage & National Living Wage rates
  minimumWage: {
    nlw: number;          // National Living Wage (21+)
    age18to20: number;    // 18-20 year olds
    age16to17: number;    // 16-17 year olds
    apprentice: number;   // Apprentices (under 19, or 19+ in first year)
    accommodationOffset: number; // Daily accommodation offset
  };

  // Statutory Maternity, Paternity, Adoption & Shared Parental Pay
  statutoryPay: {
    smpWeeklyRate: number;       // Statutory Maternity Pay flat rate (after first 6 weeks)
    sppWeeklyRate: number;       // Statutory Paternity Pay weekly rate
    sapWeeklyRate: number;       // Statutory Adoption Pay flat rate
    shppWeeklyRate: number;      // Statutory Shared Parental Pay weekly rate
    smpHigherRatePercent: number; // First 6 weeks: 90% of average weekly earnings
    lowerEarningsLimit: number;  // Must earn above this to qualify
    smpDurationWeeksHigher: number; // 6 weeks at 90%
    smpDurationWeeksFlat: number;   // 33 weeks at flat rate
    sppDurationWeeks: number;       // 2 weeks paternity leave
  };

  // Child Benefit & High Income Child Benefit Charge (HICBC)
  childBenefit: {
    firstChildWeekly: number;       // Weekly rate for eldest/only child
    additionalChildWeekly: number;  // Weekly rate for each additional child
    hicbcThreshold: number;         // Income where charge begins (£60,000)
    hicbcTaperEnd: number;          // Income where full charge applies (£80,000)
  };

  // Statutory Sick Pay (SSP)
  statutorySickPay: {
    weeklyRate: number;            // Statutory Sick Pay weekly rate (£116.75)
    lowerEarningsLimit: number;    // Average Weekly Earnings floor to qualify
    waitingDays: number;           // Standard unpaid waiting days (3)
    maxWeeks: number;              // Maximum duration (28 weeks)
  };
}

export const UK_TAX_CONFIGS: Record<string, TaxYearConfig> = {
  '2024_25': {
    yearLabel: '2024 / 2025',
    standardPersonalAllowance: 12570,
    personalAllowanceTaperThreshold: 100000,
    blindPersonsAllowance: 3070,
    marriageAllowanceTransfer: 1260,
    rUKTaxBands: [
      { name: 'Personal Allowance (0%)', thresholdMin: 0, thresholdMax: 12570, rate: 0.0 },
      { name: 'Basic Rate (20%)', thresholdMin: 12570, thresholdMax: 50270, rate: 0.20 },
      { name: 'Higher Rate (40%)', thresholdMin: 50270, thresholdMax: 125140, rate: 0.40 },
      { name: 'Additional Rate (45%)', thresholdMin: 125140, thresholdMax: Infinity, rate: 0.45 },
    ],
    walesTaxBands: [
      { name: 'Personal Allowance (0%)', thresholdMin: 0, thresholdMax: 12570, rate: 0.0 },
      { name: 'Basic Rate (20%)', thresholdMin: 12570, thresholdMax: 50270, rate: 0.20 },
      { name: 'Higher Rate (40%)', thresholdMin: 50270, thresholdMax: 125140, rate: 0.40 },
      { name: 'Additional Rate (45%)', thresholdMin: 125140, thresholdMax: Infinity, rate: 0.45 },
    ],
    scotlandTaxBands: [
      { name: 'Personal Allowance (0%)', thresholdMin: 0, thresholdMax: 12570, rate: 0.0 },
      { name: 'Starter Rate (19%)', thresholdMin: 12570, thresholdMax: 14876, rate: 0.19 },
      { name: 'Basic Rate (20%)', thresholdMin: 14876, thresholdMax: 26561, rate: 0.20 },
      { name: 'Intermediate Rate (21%)', thresholdMin: 26561, thresholdMax: 43662, rate: 0.21 },
      { name: 'Higher Rate (42%)', thresholdMin: 43662, thresholdMax: 75000, rate: 0.42 },
      { name: 'Advanced Rate (45%)', thresholdMin: 75000, thresholdMax: 125140, rate: 0.45 },
      { name: 'Top Rate (48%)', thresholdMin: 125140, thresholdMax: Infinity, rate: 0.48 },
    ],
    employeeNI: {
      lowerEarningsLimit: 6396,
      primaryThreshold: 12570,
      upperEarningsLimit: 50270,
      mainRate: 0.08,
      higherRate: 0.02,
    },
    employerNI: {
      secondaryThreshold: 9100,
      standardRate: 0.138,
      employmentAllowance: 5000,
      apprenticeshipLevyThreshold: 3000000,
      apprenticeshipLevyRate: 0.005,
    },
    studentLoans: {
      plan1: { name: 'Plan 1', threshold: 24990, rate: 0.09, desc: 'Courses starting 1998-2011 (England/Wales) or Northern Ireland' },
      plan2: { name: 'Plan 2', threshold: 27295, rate: 0.09, desc: 'Courses starting Sept 2012-July 2023 (England/Wales)' },
      plan4: { name: 'Plan 4 (Scotland)', threshold: 31395, rate: 0.09, desc: 'Scottish students via SAAS' },
      plan5: { name: 'Plan 5', threshold: 25000, rate: 0.09, desc: 'New England courses from Aug 2023' },
      postgrad: { name: 'Postgraduate Loan', threshold: 21000, rate: 0.06, desc: 'England & Wales Master’s/PhD' },
    },
    autoEnrolment: {
      lowerThreshold: 6240,
      upperThreshold: 50270,
      defaultEmployeeMin: 0.05,
      defaultEmployerMin: 0.03,
    },
    minimumWage: {
      nlw: 11.44,
      age18to20: 8.60,
      age16to17: 6.40,
      apprentice: 6.40,
      accommodationOffset: 9.99,
    },
    statutoryPay: {
      smpWeeklyRate: 184.03,
      sppWeeklyRate: 184.03,
      sapWeeklyRate: 184.03,
      shppWeeklyRate: 184.03,
      smpHigherRatePercent: 0.90,
      lowerEarningsLimit: 123,
      smpDurationWeeksHigher: 6,
      smpDurationWeeksFlat: 33,
      sppDurationWeeks: 2,
    },
    childBenefit: {
      firstChildWeekly: 25.60,
      additionalChildWeekly: 16.95,
      hicbcThreshold: 60000,
      hicbcTaperEnd: 80000,
    },
    statutorySickPay: {
      weeklyRate: 116.75,
      lowerEarningsLimit: 123,
      waitingDays: 3,
      maxWeeks: 28,
    },
  },
  '2025_26': {
    yearLabel: '2025 / 2026 (Current)',
    standardPersonalAllowance: 12570,
    personalAllowanceTaperThreshold: 100000,
    blindPersonsAllowance: 3140,
    marriageAllowanceTransfer: 1260,
    rUKTaxBands: [
      { name: 'Personal Allowance (0%)', thresholdMin: 0, thresholdMax: 12570, rate: 0.0 },
      { name: 'Basic Rate (20%)', thresholdMin: 12570, thresholdMax: 50270, rate: 0.20 },
      { name: 'Higher Rate (40%)', thresholdMin: 50270, thresholdMax: 125140, rate: 0.40 },
      { name: 'Additional Rate (45%)', thresholdMin: 125140, thresholdMax: Infinity, rate: 0.45 },
    ],
    walesTaxBands: [
      { name: 'Personal Allowance (0%)', thresholdMin: 0, thresholdMax: 12570, rate: 0.0 },
      { name: 'Basic Rate (20%)', thresholdMin: 12570, thresholdMax: 50270, rate: 0.20 },
      { name: 'Higher Rate (40%)', thresholdMin: 50270, thresholdMax: 125140, rate: 0.40 },
      { name: 'Additional Rate (45%)', thresholdMin: 125140, thresholdMax: Infinity, rate: 0.45 },
    ],
    scotlandTaxBands: [
      { name: 'Personal Allowance (0%)', thresholdMin: 0, thresholdMax: 12570, rate: 0.0 },
      { name: 'Starter Rate (19%)', thresholdMin: 12570, thresholdMax: 15397, rate: 0.19 },
      { name: 'Basic Rate (20%)', thresholdMin: 15397, thresholdMax: 27491, rate: 0.20 },
      { name: 'Intermediate Rate (21%)', thresholdMin: 27491, thresholdMax: 43662, rate: 0.21 },
      { name: 'Higher Rate (42%)', thresholdMin: 43662, thresholdMax: 75000, rate: 0.42 },
      { name: 'Advanced Rate (45%)', thresholdMin: 75000, thresholdMax: 125140, rate: 0.45 },
      { name: 'Top Rate (48%)', thresholdMin: 125140, thresholdMax: Infinity, rate: 0.48 },
    ],
    employeeNI: {
      lowerEarningsLimit: 6396,
      primaryThreshold: 12570,
      upperEarningsLimit: 50270,
      mainRate: 0.08,
      higherRate: 0.02,
    },
    employerNI: {
      secondaryThreshold: 5000, // Reduced secondary threshold starting April 2025
      standardRate: 0.150,      // Increased from 13.8% to 15.0%
      employmentAllowance: 10500,// Increased to £10,500
      apprenticeshipLevyThreshold: 3000000,
      apprenticeshipLevyRate: 0.005,
    },
    studentLoans: {
      plan1: { name: 'Plan 1', threshold: 26065, rate: 0.09, desc: 'Courses starting 1998-2011 (England/Wales) or Northern Ireland' },
      plan2: { name: 'Plan 2', threshold: 28470, rate: 0.09, desc: 'Courses starting Sept 2012-July 2023 (England/Wales)' },
      plan4: { name: 'Plan 4 (Scotland)', threshold: 32745, rate: 0.09, desc: 'Scottish students via SAAS' },
      plan5: { name: 'Plan 5', threshold: 25000, rate: 0.09, desc: 'New England courses from Aug 2023' },
      postgrad: { name: 'Postgraduate Loan', threshold: 21000, rate: 0.06, desc: 'England & Wales Master’s/PhD' },
    },
    autoEnrolment: {
      lowerThreshold: 6240,
      upperThreshold: 50270,
      defaultEmployeeMin: 0.05,
      defaultEmployerMin: 0.03,
    },
    minimumWage: {
      nlw: 12.21,
      age18to20: 10.00,
      age16to17: 7.55,
      apprentice: 7.55,
      accommodationOffset: 10.66,
    },
    statutoryPay: {
      smpWeeklyRate: 187.18,
      sppWeeklyRate: 187.18,
      sapWeeklyRate: 187.18,
      shppWeeklyRate: 187.18,
      smpHigherRatePercent: 0.90,
      lowerEarningsLimit: 125,
      smpDurationWeeksHigher: 6,
      smpDurationWeeksFlat: 33,
      sppDurationWeeks: 2,
    },
    childBenefit: {
      firstChildWeekly: 26.05,
      additionalChildWeekly: 17.25,
      hicbcThreshold: 60000,
      hicbcTaperEnd: 80000,
    },
    statutorySickPay: {
      weeklyRate: 116.75,
      lowerEarningsLimit: 125,
      waitingDays: 3,
      maxWeeks: 28,
    },
  },
  '2026_27': {
    yearLabel: '2026 / 2027 (Forecast)',
    standardPersonalAllowance: 12570,
    personalAllowanceTaperThreshold: 100000,
    blindPersonsAllowance: 3140,
    marriageAllowanceTransfer: 1260,
    rUKTaxBands: [
      { name: 'Personal Allowance (0%)', thresholdMin: 0, thresholdMax: 12570, rate: 0.0 },
      { name: 'Basic Rate (20%)', thresholdMin: 12570, thresholdMax: 50270, rate: 0.20 },
      { name: 'Higher Rate (40%)', thresholdMin: 50270, thresholdMax: 125140, rate: 0.40 },
      { name: 'Additional Rate (45%)', thresholdMin: 125140, thresholdMax: Infinity, rate: 0.45 },
    ],
    walesTaxBands: [
      { name: 'Personal Allowance (0%)', thresholdMin: 0, thresholdMax: 12570, rate: 0.0 },
      { name: 'Basic Rate (20%)', thresholdMin: 12570, thresholdMax: 50270, rate: 0.20 },
      { name: 'Higher Rate (40%)', thresholdMin: 50270, thresholdMax: 125140, rate: 0.40 },
      { name: 'Additional Rate (45%)', thresholdMin: 125140, thresholdMax: Infinity, rate: 0.45 },
    ],
    scotlandTaxBands: [
      { name: 'Personal Allowance (0%)', thresholdMin: 0, thresholdMax: 12570, rate: 0.0 },
      { name: 'Starter Rate (19%)', thresholdMin: 12570, thresholdMax: 15397, rate: 0.19 },
      { name: 'Basic Rate (20%)', thresholdMin: 15397, thresholdMax: 27491, rate: 0.20 },
      { name: 'Intermediate Rate (21%)', thresholdMin: 27491, thresholdMax: 43662, rate: 0.21 },
      { name: 'Higher Rate (42%)', thresholdMin: 43662, thresholdMax: 75000, rate: 0.42 },
      { name: 'Advanced Rate (45%)', thresholdMin: 75000, thresholdMax: 125140, rate: 0.45 },
      { name: 'Top Rate (48%)', thresholdMin: 125140, thresholdMax: Infinity, rate: 0.48 },
    ],
    employeeNI: {
      lowerEarningsLimit: 6396,
      primaryThreshold: 12570,
      upperEarningsLimit: 50270,
      mainRate: 0.08,
      higherRate: 0.02,
    },
    employerNI: {
      secondaryThreshold: 5000,
      standardRate: 0.150,
      employmentAllowance: 10500,
      apprenticeshipLevyThreshold: 3000000,
      apprenticeshipLevyRate: 0.005,
    },
    studentLoans: {
      plan1: { name: 'Plan 1', threshold: 26900, rate: 0.09, desc: 'Plan 1 student loan' },
      plan2: { name: 'Plan 2', threshold: 29385, rate: 0.09, desc: 'Plan 2 student loan' },
      plan4: { name: 'Plan 4 (Scotland)', threshold: 33795, rate: 0.09, desc: 'Plan 4 Scotland' },
      plan5: { name: 'Plan 5', threshold: 25000, rate: 0.09, desc: 'Plan 5 student loan' },
      postgrad: { name: 'Postgraduate Loan', threshold: 21000, rate: 0.06, desc: 'Postgraduate loan' },
    },
    autoEnrolment: {
      lowerThreshold: 6240,
      upperThreshold: 50270,
      defaultEmployeeMin: 0.05,
      defaultEmployerMin: 0.03,
    },
    minimumWage: {
      nlw: 12.82,
      age18to20: 10.73,
      age16to17: 8.13,
      apprentice: 8.13,
      accommodationOffset: 11.15,
    },
    statutoryPay: {
      smpWeeklyRate: 192.48,
      sppWeeklyRate: 192.48,
      sapWeeklyRate: 192.48,
      shppWeeklyRate: 192.48,
      smpHigherRatePercent: 0.90,
      lowerEarningsLimit: 128,
      smpDurationWeeksHigher: 6,
      smpDurationWeeksFlat: 33,
      sppDurationWeeks: 2,
    },
    childBenefit: {
      firstChildWeekly: 26.85,
      additionalChildWeekly: 17.80,
      hicbcThreshold: 60000,
      hicbcTaperEnd: 80000,
    },
    statutorySickPay: {
      weeklyRate: 120.35,
      lowerEarningsLimit: 125,
      waitingDays: 3,
      maxWeeks: 28,
    },
  },
};

/**
 * NHS Agenda for Change Pay Scales (England baseline)
 * Values reflect the NHS England Agenda for Change pay structure.
 */
export interface NhsBandDefinition {
  band: string;
  name: string;
  points: {
    point: number;
    step: string;
    salary: number;
  }[];
}

export const NHS_PAY_BANDS: NhsBandDefinition[] = [
  {
    band: 'band_2',
    name: 'Band 2 (e.g. Healthcare Assistant, Support Worker)',
    points: [
      { point: 1, step: 'Entry / Less than 2 years', salary: 22383 },
      { point: 2, step: '2+ years experience', salary: 22383 },
    ],
  },
  {
    band: 'band_3',
    name: 'Band 3 (e.g. Senior Healthcare Assistant, Admin Team Leader)',
    points: [
      { point: 1, step: 'Entry / Less than 2 years', salary: 22816 },
      { point: 2, step: '2+ years experience', salary: 24336 },
    ],
  },
  {
    band: 'band_4',
    name: 'Band 4 (e.g. Pharmacy Tech, Assistant Practitioner)',
    points: [
      { point: 1, step: 'Entry / Less than 3 years', salary: 25147 },
      { point: 2, step: '3+ years experience', salary: 27596 },
    ],
  },
  {
    band: 'band_5',
    name: 'Band 5 (e.g. Newly Qualified Staff Nurse, Physiotherapist, Radiographer)',
    points: [
      { point: 1, step: 'Entry / Less than 2 years', salary: 28407 },
      { point: 2, step: '2–4 years experience', salary: 30639 },
      { point: 3, step: '4+ years experience (Top of band)', salary: 34581 },
    ],
  },
  {
    band: 'band_6',
    name: 'Band 6 (e.g. Junior Sister, Specialist Nurse, Specialist Allied Health)',
    points: [
      { point: 1, step: 'Entry / Less than 2 years', salary: 35392 },
      { point: 2, step: '2–5 years experience', salary: 37350 },
      { point: 3, step: '5+ years experience (Top of band)', salary: 42618 },
    ],
  },
  {
    band: 'band_7',
    name: 'Band 7 (e.g. Ward Manager, Advanced Clinical Practitioner, Clinical Team Leader)',
    points: [
      { point: 1, step: 'Entry / Less than 2 years', salary: 43742 },
      { point: 2, step: '2–5 years experience', salary: 45996 },
      { point: 3, step: '5+ years experience (Top of band)', salary: 50056 },
    ],
  },
  {
    band: 'band_8a',
    name: 'Band 8a (e.g. Matron, Principal Clinical Specialist, Service Manager)',
    points: [
      { point: 1, step: 'Entry / Less than 5 years', salary: 50952 },
      { point: 2, step: '5+ years experience (Top of band)', salary: 57349 },
    ],
  },
  {
    band: 'band_8b',
    name: 'Band 8b (e.g. Senior Matron, Consultant Pharmacist, Senior Lead)',
    points: [
      { point: 1, step: 'Entry / Less than 5 years', salary: 58972 },
      { point: 2, step: '5+ years experience (Top of band)', salary: 68525 },
    ],
  },
  {
    band: 'band_8c',
    name: 'Band 8c (e.g. Head of Nursing, Associate Director)',
    points: [
      { point: 1, step: 'Entry / Less than 5 years', salary: 70417 },
      { point: 2, step: '5+ years experience (Top of band)', salary: 81138 },
    ],
  },
  {
    band: 'band_8d',
    name: 'Band 8d (e.g. Deputy Director of Operations / Nursing)',
    points: [
      { point: 1, step: 'Entry / Less than 5 years', salary: 83571 },
      { point: 2, step: '5+ years experience (Top of band)', salary: 96376 },
    ],
  },
  {
    band: 'band_9',
    name: 'Band 9 (e.g. Director, Chief Nurse, Executive Consultant)',
    points: [
      { point: 1, step: 'Entry / Less than 5 years', salary: 99895 },
      { point: 2, step: '5+ years experience (Top of band)', salary: 114949 },
    ],
  },
];

/**
 * NHS High Cost Area Supplement (HCAS) for London & Fringe
 */
export const NHS_HCAS = {
  inner_london: { name: 'Inner London', rate: 0.20, min: 5132, max: 7718 },
  outer_london: { name: 'Outer London', rate: 0.15, min: 4313, max: 5436 },
  fringe: { name: 'Fringe Zone', rate: 0.05, min: 1192, max: 2011 },
  none: { name: 'National (No HCAS)', rate: 0.0, min: 0, max: 0 },
};

/**
 * NHS Pension Scheme Member Contribution Tiers (Member tier rate based on actual pensionable pay)
 */
export const NHS_PENSION_TIERS = [
  { maxSalary: 13246, rate: 0.052 },
  { maxSalary: 16832, rate: 0.065 },
  { maxSalary: 22879, rate: 0.083 },
  { maxSalary: 23949, rate: 0.098 },
  { maxSalary: 28224, rate: 0.107 },
  { maxSalary: 29180, rate: 0.125 },
  { maxSalary: Infinity, rate: 0.125 },
];

/**
 * Teachers' Pay Scales (England / London Zones)
 */
export interface TeacherPayBandData {
  category: 'Main' | 'Upper' | 'Leadership';
  title: string;
  points: {
    point: string;
    england: number;
    londonFringe: number;
    outerLondon: number;
    innerLondon: number;
  }[];
}

export const TEACHER_PAY_SCALES: TeacherPayBandData[] = [
  {
    category: 'Main',
    title: 'Main Pay Range (MPR - M1 to M6)',
    points: [
      { point: 'M1 (ECT Year 1)', england: 30000, londonFringe: 31350, outerLondon: 34514, innerLondon: 36745 },
      { point: 'M2 (ECT Year 2)', england: 31737, londonFringe: 33110, outerLondon: 36320, innerLondon: 38491 },
      { point: 'M3', england: 33814, londonFringe: 35204, outerLondon: 38219, innerLondon: 40318 },
      { point: 'M4', england: 35977, londonFringe: 37384, outerLondon: 40218, innerLondon: 42234 },
      { point: 'M5', england: 38330, londonFringe: 39750, outerLondon: 42654, innerLondon: 44615 },
      { point: 'M6 (Top of Main)', england: 41333, londonFringe: 42780, outerLondon: 46525, innerLondon: 47666 },
    ],
  },
  {
    category: 'Upper',
    title: 'Upper Pay Range (UPR - U1 to U3)',
    points: [
      { point: 'U1', england: 43266, londonFringe: 44710, outerLondon: 47966, innerLondon: 51179 },
      { point: 'U2', england: 44870, londonFringe: 46316, outerLondon: 49722, innerLondon: 53499 },
      { point: 'U3 (Top of Upper)', england: 46525, londonFringe: 47970, outerLondon: 51470, innerLondon: 56959 },
    ],
  },
  {
    category: 'Leadership',
    title: 'Leadership Pay Range (L1 to L43)',
    points: [
      { point: 'L1 (Assistant Head / Lead)', england: 47185, londonFringe: 48624, outerLondon: 50462, innerLondon: 55380 },
      { point: 'L5', england: 52074, londonFringe: 53516, outerLondon: 55353, innerLondon: 60271 },
      { point: 'L10 (Deputy Head)', england: 58959, londonFringe: 60398, outerLondon: 62238, innerLondon: 67156 },
      { point: 'L15', england: 66628, londonFringe: 68067, outerLondon: 69905, innerLondon: 74823 },
      { point: 'L20 (Headteacher)', england: 75331, londonFringe: 76770, outerLondon: 78608, innerLondon: 83526 },
      { point: 'L25', england: 85146, londonFringe: 86585, outerLondon: 88423, innerLondon: 93341 },
      { point: 'L30', england: 96239, londonFringe: 97678, outerLondon: 99516, innerLondon: 104434 },
      { point: 'L35', england: 108776, londonFringe: 110215, outerLondon: 112053, innerLondon: 116971 },
      { point: 'L43 (Executive Head / System Leader)', england: 131056, londonFringe: 132495, outerLondon: 134333, innerLondon: 139251 },
    ],
  },
];

/**
 * Teachers' Pension Scheme (TPS) Employee Contribution Tiers
 */
export const TEACHERS_PENSION_TIERS = [
  { maxSalary: 32135, rate: 0.074 },
  { maxSalary: 43259, rate: 0.086 },
  { maxSalary: 51292, rate: 0.096 },
  { maxSalary: 67979, rate: 0.102 },
  { maxSalary: 92597, rate: 0.113 },
  { maxSalary: Infinity, rate: 0.117 },
];
