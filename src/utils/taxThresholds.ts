export interface TaxThresholdTip {
  id: string;
  threshold: number;
  minSalary: number;
  maxSalary?: number;
  title: string;
  badge: string;
  description: string;
  tip: string;
  actionLink?: {
    label: string;
    url: string;
  };
  accentColor: 'emerald' | 'amber' | 'cyan' | 'purple' | 'rose';
}

export const SIGNIFICANT_TAX_THRESHOLDS: TaxThresholdTip[] = [
  {
    id: 'personal_allowance',
    threshold: 12570,
    minSalary: 12570,
    maxSalary: 25000,
    title: 'Personal Allowance Exceeded (£12,570)',
    badge: 'Basic Rate (20%)',
    description: 'Income above £12,570 is now subject to 20% Basic Rate Income Tax and 8% Class 1 National Insurance.',
    tip: 'Ensure your tax code is set to 1257L so you receive your full statutory tax-free personal allowance.',
    accentColor: 'emerald',
  },
  {
    id: 'higher_rate',
    threshold: 50270,
    minSalary: 50271,
    maxSalary: 59999,
    title: 'Higher Rate Threshold Crossed (£50,270)',
    badge: '40% Tax Band',
    description: 'Earnings above £50,270 are taxed at 40%. National Insurance drops from 8% to 2% on this portion.',
    tip: 'Tax Tip: Increasing workplace or SIPP pension contributions reduces your taxable pay below £50,270, granting full 40% tax relief.',
    actionLink: {
      label: 'Model Pension Relief',
      url: '/pension-calculator',
    },
    accentColor: 'amber',
  },
  {
    id: 'child_benefit_trap',
    threshold: 60000,
    minSalary: 60000,
    maxSalary: 79999,
    title: 'Child Benefit Clawback Zone (£60,000–£80,000)',
    badge: 'HICBC Charge',
    description: 'High Income Child Benefit Charge applies from £60,000 and is fully clawed back at £80,000.',
    tip: 'Tax Tip: Salary sacrifice (e.g. EV car lease or pension) lowers your adjusted net income to retain your Child Benefit payments.',
    actionLink: {
      label: 'Explore Salary Sacrifice',
      url: '/salary-sacrifice-calculator',
    },
    accentColor: 'purple',
  },
  {
    id: 'hundred_k_trap',
    threshold: 100000,
    minSalary: 100000,
    maxSalary: 125139,
    title: 'The 60% Marginal Tax Trap (£100,000–£125,140)',
    badge: '60% Effective Rate',
    description: 'For every £2 earned over £100k, you lose £1 of Personal Allowance, creating an effective 60% tax rate.',
    tip: 'Tax Tip: Sacrificing earnings over £100,000 directly into a pension retains 100% of your personal allowance and government tax relief.',
    actionLink: {
      label: 'Calculate Sacrifice Savings',
      url: '/salary-sacrifice-calculator',
    },
    accentColor: 'rose',
  },
  {
    id: 'additional_rate',
    threshold: 125140,
    minSalary: 125140,
    title: 'Additional Rate 45% Threshold (£125,140)',
    badge: 'Top 45% Rate',
    description: 'Personal allowance is fully tapered to £0. All income above £125,140 is taxed at the highest 45% rate.',
    tip: 'Tax Tip: Maximize your £60,000 annual pension allowance and explore venture capital schemes (EIS/SEIS) for up to 30%-50% income tax relief.',
    actionLink: {
      label: 'Pension Growth Modeler',
      url: '/pension-calculator',
    },
    accentColor: 'cyan',
  },
];

export function getMatchingThresholdTip(salary: number, previousSalary?: number): TaxThresholdTip | null {
  if (salary <= 0) return null;

  // Find if current salary belongs to a threshold band
  // Only trigger if previousSalary wasn't already in the same band (or if crossed from below/above)
  for (const item of SIGNIFICANT_TAX_THRESHOLDS) {
    const inRange = salary >= item.minSalary && (!item.maxSalary || salary <= item.maxSalary);
    if (inRange) {
      if (previousSalary !== undefined) {
        const wasInRange = previousSalary >= item.minSalary && (!item.maxSalary || previousSalary <= item.maxSalary);
        if (wasInRange) return null; // Already shown for this bracket
      }
      return item;
    }
  }

  return null;
}

export type CouncilTaxBand = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type CouncilTaxCountry = 'england' | 'scotland' | 'wales';

export interface CouncilTaxBandInfo {
  band: CouncilTaxBand;
  valuationEngland1991: string;
  valuationScotland1991: string;
  valuationWales2003: string;
  ratioEnglandWales: number;
  ratioScotland: number;
  ratioLabelEnglandWales: string;
  ratioLabelScotland: string;
}

export const COUNCIL_TAX_BANDS: CouncilTaxBandInfo[] = [
  {
    band: 'A',
    valuationEngland1991: 'Up to £40,000',
    valuationScotland1991: 'Up to £27,000',
    valuationWales2003: 'Up to £44,000',
    ratioEnglandWales: 6 / 9,
    ratioScotland: 240 / 360,
    ratioLabelEnglandWales: '6/9 (66.7%)',
    ratioLabelScotland: '240/360 (66.7%)',
  },
  {
    band: 'B',
    valuationEngland1991: '£40,001 to £52,000',
    valuationScotland1991: '£27,001 to £35,000',
    valuationWales2003: '£44,001 to £65,000',
    ratioEnglandWales: 7 / 9,
    ratioScotland: 280 / 360,
    ratioLabelEnglandWales: '7/9 (77.8%)',
    ratioLabelScotland: '280/360 (77.8%)',
  },
  {
    band: 'C',
    valuationEngland1991: '£52,001 to £68,000',
    valuationScotland1991: '£35,001 to £45,000',
    valuationWales2003: '£65,001 to £91,000',
    ratioEnglandWales: 8 / 9,
    ratioScotland: 320 / 360,
    ratioLabelEnglandWales: '8/9 (88.9%)',
    ratioLabelScotland: '320/360 (88.9%)',
  },
  {
    band: 'D',
    valuationEngland1991: '£68,001 to £88,000',
    valuationScotland1991: '£45,001 to £58,000',
    valuationWales2003: '£91,001 to £123,000',
    ratioEnglandWales: 9 / 9,
    ratioScotland: 360 / 360,
    ratioLabelEnglandWales: '9/9 (100%)',
    ratioLabelScotland: '360/360 (100%)',
  },
  {
    band: 'E',
    valuationEngland1991: '£88,001 to £120,000',
    valuationScotland1991: '£58,001 to £80,000',
    valuationWales2003: '£123,001 to £162,000',
    ratioEnglandWales: 11 / 9,
    ratioScotland: 473 / 360,
    ratioLabelEnglandWales: '11/9 (122.2%)',
    ratioLabelScotland: '473/360 (131.4%)',
  },
  {
    band: 'F',
    valuationEngland1991: '£120,001 to £160,000',
    valuationScotland1991: '£80,001 to £106,000',
    valuationWales2003: '£162,001 to £223,000',
    ratioEnglandWales: 13 / 9,
    ratioScotland: 585 / 360,
    ratioLabelEnglandWales: '13/9 (144.4%)',
    ratioLabelScotland: '585/360 (162.5%)',
  },
  {
    band: 'G',
    valuationEngland1991: '£160,001 to £320,000',
    valuationScotland1991: '£106,001 to £212,000',
    valuationWales2003: '£223,001 to £324,000',
    ratioEnglandWales: 15 / 9,
    ratioScotland: 705 / 360,
    ratioLabelEnglandWales: '15/9 (166.7%)',
    ratioLabelScotland: '705/360 (195.8%)',
  },
  {
    band: 'H',
    valuationEngland1991: 'Over £320,000',
    valuationScotland1991: 'Over £212,000',
    valuationWales2003: 'Over £324,000',
    ratioEnglandWales: 18 / 9,
    ratioScotland: 882 / 360,
    ratioLabelEnglandWales: '18/9 (200%)',
    ratioLabelScotland: '882/360 (245%)',
  },
];

export const COUNCIL_TAX_BAND_D_AVERAGES: Record<CouncilTaxCountry, { label: string; averageBandD: number; notes: string }> = {
  england: {
    label: 'England Average',
    averageBandD: 2171,
    notes: 'Average Band D council tax across all English billing authorities (including adult social care precept and parish precepts).',
  },
  scotland: {
    label: 'Scotland Average',
    averageBandD: 1494,
    notes: 'Average Scottish local authority Band D council tax (excluding statutory Scottish Water & Waste charges).',
  },
  wales: {
    label: 'Wales Average',
    averageBandD: 2024,
    notes: 'Average Band D council tax in Wales (based on 2003 property valuation list).',
  },
};

// Corporation Tax Constants
export const CORPORATION_TAX_SMALL_PROFITS_RATE = 0.19; // 19% on profits up to £50,000
export const CORPORATION_TAX_MAIN_RATE = 0.25; // 25% on profits over £250,000
export const CORPORATION_TAX_LOWER_THRESHOLD = 50000;
export const CORPORATION_TAX_UPPER_THRESHOLD = 250000;
export const CORPORATION_TAX_MARGINAL_FRACTION = 3 / 200; // 0.015 standard relief fraction

// Dividend Tax Constants
export const DIVIDEND_ALLOWANCE = 500; // £500 tax-free dividend allowance
export const DIVIDEND_TAX_RATES = {
  basic: 0.0875, // 8.75%
  higher: 0.3375, // 33.75%
  additional: 0.3935, // 39.35%
};
export const OPTIMAL_DIRECTOR_SALARY_DEFAULT = 12570;

// UK National Minimum Wage & National Living Wage Rates (2025/26 & 2024/25)
export const NMW_RATE_21_AND_OVER_2025_26 = 12.21; // National Living Wage (21+)
export const NMW_RATE_18_TO_20_2025_26 = 10.00;    // 18-20 Year Old Rate
export const NMW_RATE_UNDER_18_2025_26 = 7.55;     // Under 18 (16-17) Rate
export const NMW_RATE_APPRENTICE_2025_26 = 7.55;   // Apprentice Rate
export const NMW_ACCOMMODATION_OFFSET_DAILY_2025_26 = 10.66; // £10.66/day (£74.62/wk)

export const NMW_RATE_21_AND_OVER_2024_25 = 11.44;
export const NMW_RATE_18_TO_20_2024_25 = 8.60;
export const NMW_RATE_UNDER_18_2024_25 = 6.40;
export const NMW_RATE_APPRENTICE_2024_25 = 6.40;
export const NMW_ACCOMMODATION_OFFSET_DAILY_2024_25 = 9.99;

export interface MinimumWageAgeBandRate {
  id: '21_and_over' | '18_to_20' | 'under_18' | 'apprentice';
  label: string;
  category: string;
  ageDescription: string;
  rate2025_26: number;
  rate2024_25: number;
  notes: string;
}

export const NATIONAL_MINIMUM_WAGE_RATES: MinimumWageAgeBandRate[] = [
  {
    id: '21_and_over',
    label: 'National Living Wage (21+)',
    category: '21 and Over',
    ageDescription: 'Aged 21 and older',
    rate2025_26: NMW_RATE_21_AND_OVER_2025_26,
    rate2024_25: NMW_RATE_21_AND_OVER_2024_25,
    notes: 'Statutory minimum for all workers aged 21 and over (excluding first-year apprentices under 19 or in their first year).',
  },
  {
    id: '18_to_20',
    label: '18–20 Year Old Rate',
    category: '18 to 20',
    ageDescription: 'Aged 18 to 20',
    rate2025_26: NMW_RATE_18_TO_20_2025_26,
    rate2024_25: NMW_RATE_18_TO_20_2024_25,
    notes: 'For young workers aged 18, 19, or 20 not on an apprenticeship.',
  },
  {
    id: 'under_18',
    label: 'Under 18 Rate (16–17)',
    category: 'Under 18',
    ageDescription: 'Aged 16 to 17 (above school leaving age)',
    rate2025_26: NMW_RATE_UNDER_18_2025_26,
    rate2024_25: NMW_RATE_UNDER_18_2024_25,
    notes: 'For workers aged 16 or 17 who are over compulsory school leaving age.',
  },
  {
    id: 'apprentice',
    label: 'Apprentice Rate',
    category: 'Apprentice',
    ageDescription: 'Aged under 19 OR aged 19+ in first year of apprenticeship',
    rate2025_26: NMW_RATE_APPRENTICE_2025_26,
    rate2024_25: NMW_RATE_APPRENTICE_2024_25,
    notes: 'Applies to apprentices aged under 19, or apprentices aged 19+ in their first year. After year 1, apprentices aged 19+ must receive the standard rate for their age.',
  },
];

// Statutory Sick Pay (SSP) Rates & Lower Earnings Limit (LEL)
export const STATUTORY_SICK_PAY_WEEKLY_RATE_2025_26 = 116.75;
export const STATUTORY_SICK_PAY_LOWER_EARNINGS_LIMIT_2025_26 = 125.00;
export const STATUTORY_SICK_PAY_WAITING_DAYS_DEFAULT = 3;
export const STATUTORY_SICK_PAY_MAX_WEEKS = 28;

export const STATUTORY_SICK_PAY_WEEKLY_RATE_2024_25 = 116.75;
export const STATUTORY_SICK_PAY_LOWER_EARNINGS_LIMIT_2024_25 = 123.00;

export const STATUTORY_SICK_PAY_WEEKLY_RATE_2026_27 = 120.35;
export const STATUTORY_SICK_PAY_LOWER_EARNINGS_LIMIT_2026_27 = 125.00;

export const STATUTORY_SICK_PAY_WEEKLY_RATE = STATUTORY_SICK_PAY_WEEKLY_RATE_2025_26;
export const STATUTORY_SICK_PAY_LOWER_EARNINGS_LIMIT = STATUTORY_SICK_PAY_LOWER_EARNINGS_LIMIT_2025_26;
export const STATUTORY_SICK_PAY_WAITING_DAYS = STATUTORY_SICK_PAY_WAITING_DAYS_DEFAULT;


