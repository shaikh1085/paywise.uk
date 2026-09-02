/**
 * PayWise UK - Credit Card Repayment & Payoff Configuration
 * 
 * Standard UK credit card interest compounding rules, APR profiles,
 * and minimum payment formulas.
 * 
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
 */

export interface CreditCardAprProfile {
  id: string;
  name: string;
  apr: number; // Annual Percentage Rate (APR) // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
  description: string;
}

export const UK_CREDIT_CARD_APR_PROFILES: CreditCardAprProfile[] = [
  {
    id: 'typical_representative',
    name: 'Typical UK Representative APR (24.9%)', // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
    apr: 24.9, // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
    description: 'Average representative APR for standard UK credit cards in 2025/2026',
  },
  {
    id: 'prime_low_rate',
    name: 'Low Rate / Prime Card (14.9% - 19.9%)', // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
    apr: 17.9, // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
    description: 'Competitive low-interest credit cards for high credit scores',
  },
  {
    id: 'credit_builder',
    name: 'Credit Builder Card (34.9%)', // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
    apr: 34.9, // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
    description: 'Higher APR cards for rebuilding or starting UK credit profiles',
  },
  {
    id: 'zero_promotional',
    name: '0% Promotional Balance Transfer (0.0%)', // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
    apr: 0.0, // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
    description: 'Interest-free promotional period on purchases or balance transfers',
  },
];

export const UK_CREDIT_CARD_RULES = {
  // Standard UK Minimum Payment Formula (typically greatest of £5, 2.5% of balance, or 1% balance + monthly interest)
  minPaymentFlatFloor: 5.0, // £5 absolute minimum floor // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
  minPaymentPercentOfBalance: 0.025, // 2.5% of balance // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
  minPaymentPrincipalPercent: 0.01, // 1% of principal // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
  maxRepaymentMonthsProjection: 600, // 50-year cap for runaway amortization safeguards
};
