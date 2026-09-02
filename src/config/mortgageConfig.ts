/**
 * PayWise UK - Central Mortgage & Property Lending Configuration
 * 
 * Configurable parameters, income multiples, LTV thresholds, and repayment modeling
 * constants for UK mortgage calculations.
 * 
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.
 * Primary Sources: Bank of England Financial Policy Committee (FPC) Loan-to-Income limits, FCA MCOB Rules.
 */

export const MORTGAGE_CONFIG_METADATA = {
  lastReviewed: 'March 2026',
  version: '2.5.0',
  adminNotice: 'VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.',
};

export interface MortgageIncomeMultiple {
  multiple: number;
  label: string;
  category: 'conservative' | 'typical' | 'stretch' | 'specialist';
  description: string;
}

export interface MortgageConfig {
  defaults: {
    propertyPrice: number;        // £300,000
    depositPercentage: number;     // 15% (£45,000 deposit -> 85% LTV)
    termYears: number;             // 25 years
    interestRate: number;          // 4.5%
    overpaymentMonthly: number;    // £0
    feesAddedToLoan: number;       // £0
  };
  limits: {
    minPropertyPrice: number;
    maxPropertyPrice: number;
    minDepositPercent: number;     // 5% (95% LTV)
    minTermYears: number;          // 5 years
    maxTermYears: number;          // 40 years
    minInterestRate: number;       // 0.1%
    maxInterestRate: number;       // 20%
  };
  incomeMultiples: MortgageIncomeMultiple[];
  bankOfEnglandFlowLimitNote: string;
  affordabilityStressRateBuffer: number; // e.g. 1.0% to 3.0% stress margin
}

export const UK_MORTGAGE_CONFIG: MortgageConfig = {
  defaults: {
    propertyPrice: 300000,
    depositPercentage: 15,
    termYears: 25,
    interestRate: 4.5,
    overpaymentMonthly: 0,
    feesAddedToLoan: 0,
  },
  limits: {
    minPropertyPrice: 25000,
    maxPropertyPrice: 10000000,
    minDepositPercent: 5,
    minTermYears: 5,
    maxTermYears: 40,
    minInterestRate: 0.1,
    maxInterestRate: 20.0,
  },
  incomeMultiples: [
    {
      multiple: 3.5,
      label: '3.5x Income (Conservative)',
      category: 'conservative',
      description: 'A cautious borrowing level with comfortable repayment headroom and lower risk of interest rate shock.',
    },
    {
      multiple: 4.0,
      label: '4.0x Income (Moderate)',
      category: 'typical',
      description: 'Commonly offered by mainstream high-street UK lenders for single and joint applicants.',
    },
    {
      multiple: 4.5,
      label: '4.5x Income (Standard Industry Maximum)',
      category: 'typical',
      description: 'The standard regulatory benchmark for mainstream UK lending under Bank of England FPC flow limits.',
    },
    {
      multiple: 5.0,
      label: '5.0x Income (High Earner / Stretch)',
      category: 'stretch',
      description: 'Offered by select lenders to higher earners (typically earning over £60,000–£75,000 individually or £100,000 joint) or specific professionals.',
    },
    {
      multiple: 5.5,
      label: '5.5x Income (Specialist Maximum)',
      category: 'specialist',
      description: 'Rarely available; reserved for qualified professionals (e.g. medical doctors, solicitors, accountants) or very high net worth borrowers.',
    },
  ],
  bankOfEnglandFlowLimitNote: 'Bank of England rules restrict UK mortgage lenders from having more than 15% of their residential mortgage lending at loan-to-income (LTI) ratios of 4.5x or greater.',
  affordabilityStressRateBuffer: 2.0,
};
