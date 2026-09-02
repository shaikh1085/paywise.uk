/**
 * PayWise UK - Central Capital Gains Tax (CGT) Configuration
 * 
 * Configurable annual exemptions, asset class rates, and tax band mechanics across UK tax years.
 * 
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.
 * Primary Sources: HMRC Capital Gains Tax Manual, Autumn Budget 2024 / Finance Act.
 */

export const CAPITAL_GAINS_TAX_CONFIG_METADATA = {
  lastReviewed: 'April 2026',
  currentTaxYear: '2026_27',
  version: '2.6.0',
  adminNotice: 'VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.',
};

export interface CgtRateSchedule {
  // Standard assets (shares, investments, valuable personal possessions, cryptoassets)
  sharesAndOtherAssets: {
    basicRate: number;      // 18% (0.18)
    higherRate: number;     // 24% (0.24)
  };
  // Residential property (second homes, buy-to-let, non-PRR property)
  residentialProperty: {
    basicRate: number;      // 18% (0.18)
    higherRate: number;     // 24% (0.24)
  };
  // Commercial property / Land
  commercialProperty: {
    basicRate: number;      // 18% (0.18)
    higherRate: number;     // 24% (0.24)
  };
  // Business Asset Disposal Relief (BADR)
  badr: {
    rate: number;           // 10% (2024/25), 14% (2025/26), 18% (2026/27)
    lifetimeLimit: number;  // £1,000,000
  };
}

export interface CapitalGainsTaxYearConfig {
  yearLabel: string;
  annualExemptAmountIndividual: number; // £3,000
  annualExemptAmountTrust: number;      // £1,500
  basicRateBandThreshold: number;       // £50,270 (income threshold separating basic and higher rate)
  rates: CgtRateSchedule;
  notes: string;
}

export const UK_CAPITAL_GAINS_TAX_CONFIGS: Record<string, CapitalGainsTaxYearConfig> = {
  '2024_25': {
    yearLabel: '2024 / 2025',
    annualExemptAmountIndividual: 3000, // Reduced to £3,000 from April 2024
    annualExemptAmountTrust: 1500,
    basicRateBandThreshold: 50270,
    rates: {
      sharesAndOtherAssets: {
        basicRate: 0.18, // 18% post-30 Oct 2024 (previously 10%)
        higherRate: 0.24, // 24% post-30 Oct 2024 (previously 20%)
      },
      residentialProperty: {
        basicRate: 0.18, // 18%
        higherRate: 0.24, // 24%
      },
      commercialProperty: {
        basicRate: 0.18,
        higherRate: 0.24,
      },
      badr: {
        rate: 0.10, // 10%
        lifetimeLimit: 1000000,
      },
    },
    notes: 'Autumn Budget 2024 aligned standard asset CGT rates (18%/24%) with residential property rates from 30 October 2024.',
  },
  '2025_26': {
    yearLabel: '2025 / 2026',
    annualExemptAmountIndividual: 3000,
    annualExemptAmountTrust: 1500,
    basicRateBandThreshold: 50270,
    rates: {
      sharesAndOtherAssets: {
        basicRate: 0.18,
        higherRate: 0.24,
      },
      residentialProperty: {
        basicRate: 0.18,
        higherRate: 0.24,
      },
      commercialProperty: {
        basicRate: 0.18,
        higherRate: 0.24,
      },
      badr: {
        rate: 0.14, // Increased to 14% from April 2025
        lifetimeLimit: 1000000,
      },
    },
    notes: 'Standard CGT rates are 18% for basic rate taxpayers and 24% for higher/additional rate taxpayers. Annual allowance is £3,000.',
  },
  '2026_27': {
    yearLabel: '2026 / 2027 (Current)',
    annualExemptAmountIndividual: 3000,
    annualExemptAmountTrust: 1500,
    basicRateBandThreshold: 50270,
    rates: {
      sharesAndOtherAssets: {
        basicRate: 0.18,
        higherRate: 0.24,
      },
      residentialProperty: {
        basicRate: 0.18,
        higherRate: 0.24,
      },
      commercialProperty: {
        basicRate: 0.18,
        higherRate: 0.24,
      },
      badr: {
        rate: 0.18, // Scheduled increase to 18% from 6 April 2026
        lifetimeLimit: 1000000,
      },
    },
    notes: 'Current 2026/27 Capital Gains Tax rates: Standard 18%/24%, Annual Exemption £3,000, Business Asset Disposal Relief (BADR) 18%.',
  },
};
