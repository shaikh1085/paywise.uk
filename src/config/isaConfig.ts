/**
 * PayWise UK - Central ISA & Savings Tax Configuration
 * 
 * Configurable limits, allowances, and tax allowances for Individual Savings Accounts (ISAs)
 * and taxable savings interest across UK tax years.
 * 
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.
 * Primary Sources: HMRC Guidance on ISAs, Individual Savings Account Regulations 1998, Income Tax Act 2007 (PSA).
 */

export const ISA_CONFIG_METADATA = {
  lastReviewed: 'March 2026',
  currentTaxYear: '2025_26',
  version: '2.5.0',
  adminNotice: 'VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.',
};

export interface IsaAllowancesConfig {
  annualOverallAllowance: number;      // £20,000
  lifetimeIsaAnnualAllowance: number;  // £4,000
  lifetimeIsaBonusRate: number;        // 0.25 (25% government bonus, max £1,000)
  juniorIsaAnnualAllowance: number;    // £9,000
  
  // Personal Savings Allowance (PSA) for non-ISA taxable savings
  personalSavingsAllowance: {
    basicRate: number;      // £1,000
    higherRate: number;     // £500
    additionalRate: number; // £0
  };
  
  // Starting Rate for Savings (0% band for low earners)
  startingRateForSavings: {
    maxBand: number;        // £5,000
    incomeLimit: number;    // £17,570 (£12,570 PA + £5,000)
    rate: number;           // 0.0 (0%)
  };
}

export interface IsaYearConfig {
  yearLabel: string;
  allowances: IsaAllowancesConfig;
  defaultAssumedGrowthRates: {
    cashIsa: number;             // 4.0% typical cash yield illustration
    stocksAndSharesConservative: number; // 4.5%
    stocksAndSharesModerate: number;     // 6.5%
    stocksAndSharesAggressive: number;   // 8.5%
    inflationAssumption: number;         // 2.5% Bank of England target baseline
  };
  notes: string;
}

export const UK_ISA_CONFIGS: Record<string, IsaYearConfig> = {
  '2024_25': {
    yearLabel: '2024 / 2025',
    allowances: {
      annualOverallAllowance: 20000,
      lifetimeIsaAnnualAllowance: 4000,
      lifetimeIsaBonusRate: 0.25,
      juniorIsaAnnualAllowance: 9000,
      personalSavingsAllowance: {
        basicRate: 1000,
        higherRate: 500,
        additionalRate: 0,
      },
      startingRateForSavings: {
        maxBand: 5000,
        incomeLimit: 17570,
        rate: 0.0,
      },
    },
    defaultAssumedGrowthRates: {
      cashIsa: 4.25,
      stocksAndSharesConservative: 4.5,
      stocksAndSharesModerate: 6.5,
      stocksAndSharesAggressive: 8.5,
      inflationAssumption: 2.5,
    },
    notes: 'Adult annual ISA subscription limit frozen at £20,000. Multiple subscriptions of the same ISA type allowed from April 2024.',
  },
  '2025_26': {
    yearLabel: '2025 / 2026 (Current)',
    allowances: {
      annualOverallAllowance: 20000,
      lifetimeIsaAnnualAllowance: 4000,
      lifetimeIsaBonusRate: 0.25,
      juniorIsaAnnualAllowance: 9000,
      personalSavingsAllowance: {
        basicRate: 1000,
        higherRate: 500,
        additionalRate: 0,
      },
      startingRateForSavings: {
        maxBand: 5000,
        incomeLimit: 17570,
        rate: 0.0,
      },
    },
    defaultAssumedGrowthRates: {
      cashIsa: 4.0,
      stocksAndSharesConservative: 4.5,
      stocksAndSharesModerate: 6.5,
      stocksAndSharesAggressive: 8.5,
      inflationAssumption: 2.5,
    },
    notes: 'Annual overall ISA allowance remains £20,000 for all qualifying UK residents aged 18 and over.',
  },
  '2026_27': {
    yearLabel: '2026 / 2027 (Forecast)',
    allowances: {
      annualOverallAllowance: 20000,
      lifetimeIsaAnnualAllowance: 4000,
      lifetimeIsaBonusRate: 0.25,
      juniorIsaAnnualAllowance: 9000,
      personalSavingsAllowance: {
        basicRate: 1000,
        higherRate: 500,
        additionalRate: 0,
      },
      startingRateForSavings: {
        maxBand: 5000,
        incomeLimit: 17570,
        rate: 0.0,
      },
    },
    defaultAssumedGrowthRates: {
      cashIsa: 3.75,
      stocksAndSharesConservative: 4.5,
      stocksAndSharesModerate: 6.5,
      stocksAndSharesAggressive: 8.5,
      inflationAssumption: 2.0,
    },
    notes: 'Forecast ISA provisions maintaining the statutory £20,000 annual cap.',
  },
};
