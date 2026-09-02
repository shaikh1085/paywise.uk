/**
 * PayWise UK - Central Dividend Tax Configuration
 * 
 * Configurable thresholds, allowances, and dividend tax band rates across UK tax years.
 * Dividends are taxed as the top slice of income after non-savings employment/pension income.
 * 
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.
 * Primary Sources: HMRC Dividend Tax Rates & Allowances, Income Tax Act 2007.
 */

export const DIVIDEND_TAX_CONFIG_METADATA = {
  lastReviewed: 'April 2026',
  currentTaxYear: '2026_27',
  version: '2.6.0',
  adminNotice: 'VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.',
};

export interface DividendTaxYearConfig {
  yearLabel: string;
  dividendAllowance: number; // £500 (from 6 April 2024 onwards)
  rates: {
    basicRate: number;      // 10.75% in 2026/27 (8.75% in 2025/26)
    higherRate: number;     // 35.75% in 2026/27 (33.75% in 2025/26)
    additionalRate: number; // 39.35%
  };
  incomeThresholds: {
    basicRateUpper: number;      // £50,270
    higherRateUpper: number;     // £125,140
    personalAllowanceTaper: number;// £100,000
  };
  notes: string;
}

export const UK_DIVIDEND_TAX_CONFIGS: Record<string, DividendTaxYearConfig> = {
  '2024_25': {
    yearLabel: '2024 / 2025',
    dividendAllowance: 500, // Reduced to £500 from April 2024
    rates: {
      basicRate: 0.0875,      // 8.75%
      higherRate: 0.3375,     // 33.75%
      additionalRate: 0.3935, // 39.35%
    },
    incomeThresholds: {
      basicRateUpper: 50270,
      higherRateUpper: 125140,
      personalAllowanceTaper: 100000,
    },
    notes: 'Dividend allowance is £500. Dividends falling within the £500 allowance still count towards total income for tax band sizing.',
  },
  '2025_26': {
    yearLabel: '2025 / 2026',
    dividendAllowance: 500,
    rates: {
      basicRate: 0.0875,
      higherRate: 0.3375,
      additionalRate: 0.3935,
    },
    incomeThresholds: {
      basicRateUpper: 50270,
      higherRateUpper: 125140,
      personalAllowanceTaper: 100000,
    },
    notes: 'Standard £500 dividend allowance across the UK (including Scotland, where UK dividend rates apply uniformly).',
  },
  '2026_27': {
    yearLabel: '2026 / 2027 (Current)',
    dividendAllowance: 500,
    rates: {
      basicRate: 0.1075,
      higherRate: 0.3575,
      additionalRate: 0.3935,
    },
    incomeThresholds: {
      basicRateUpper: 50270,
      higherRateUpper: 125140,
      personalAllowanceTaper: 100000,
    },
    notes: 'Current 2026/27 dividend tax rates: Basic 10.75%, Higher 35.75%, Additional 39.35% above the £500 tax-free dividend allowance.',
  },
};
