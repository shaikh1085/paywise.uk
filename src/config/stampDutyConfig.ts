/**
 * PayWise UK - Stamp Duty Land Tax (SDLT) Configuration (England & Northern Ireland)
 * 
 * Rates and thresholds for standard residential purchases, first-time buyers,
 * and additional properties (buy-to-let and second homes).
 * 
 * Note: Scotland applies Land and Buildings Transaction Tax (LBTT) and Wales applies
 * Land Transaction Tax (LTT), which have separate devolved schedules.
 * 
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
 */

export interface SdltBand {
  name: string;
  min: number;
  max: number;
  rate: number; // Decimal e.g. 0.05 for 5% // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
}

export interface StampDutyConfig {
  taxYearLabel: string;
  standardResidentialBands: SdltBand[];
  firstTimeBuyerBands: SdltBand[];
  firstTimeBuyerMaxPropertyPrice: number; // Maximum property value to qualify for first-time buyer relief // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
  additionalPropertySurchargeRate: number; // Surcharge rate for second homes / buy-to-let (increased to 5% in Autumn Budget 2024) // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
  nonUkResidentSurchargeRate: number; // Additional 2% surcharge for non-UK residents // VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION
  thresholdTemporaryPeriodEnd?: string;
}

export const UK_STAMP_DUTY_CONFIGS: Record<string, StampDutyConfig> = {
  // Current 2026/27 Rates (SDLT thresholds and 5% additional property surcharge)
  '2026_27': {
    taxYearLabel: '2026 / 2027 (Current)',
    standardResidentialBands: [
      { name: '0% Band (Up to £125,000)', min: 0, max: 125000, rate: 0.0 },
      { name: '2% Band (£125,001 to £250,000)', min: 125000, max: 250000, rate: 0.02 },
      { name: '5% Band (£250,001 to £925,000)', min: 250000, max: 925000, rate: 0.05 },
      { name: '10% Band (£925,001 to £1,500,000)', min: 925000, max: 1500000, rate: 0.10 },
      { name: '12% Band (Over £1,500,000)', min: 1500000, max: Infinity, rate: 0.12 },
    ],
    firstTimeBuyerBands: [
      { name: '0% First-Time Buyer Band (Up to £300,000)', min: 0, max: 300000, rate: 0.0 },
      { name: '5% First-Time Buyer Band (£300,001 to £500,000)', min: 300000, max: 500000, rate: 0.05 },
    ],
    firstTimeBuyerMaxPropertyPrice: 500000,
    additionalPropertySurchargeRate: 0.05, // 5.0% surcharge (Autumn Budget 2024)
    nonUkResidentSurchargeRate: 0.02, // 2.0% surcharge
  },
  '2025_26': {
    taxYearLabel: '2025 / 2026',
    standardResidentialBands: [
      { name: '0% Band (Up to £125,000)', min: 0, max: 125000, rate: 0.0 },
      { name: '2% Band (£125,001 to £250,000)', min: 125000, max: 250000, rate: 0.02 },
      { name: '5% Band (£250,001 to £925,000)', min: 250000, max: 925000, rate: 0.05 },
      { name: '10% Band (£925,001 to £1,500,000)', min: 925000, max: 1500000, rate: 0.10 },
      { name: '12% Band (Over £1,500,000)', min: 1500000, max: Infinity, rate: 0.12 },
    ],
    firstTimeBuyerBands: [
      { name: '0% First-Time Buyer Band (Up to £300,000)', min: 0, max: 300000, rate: 0.0 },
      { name: '5% First-Time Buyer Band (£300,001 to £500,000)', min: 300000, max: 500000, rate: 0.05 },
    ],
    firstTimeBuyerMaxPropertyPrice: 500000,
    additionalPropertySurchargeRate: 0.05, // 5.0% surcharge (Autumn Budget 2024)
    nonUkResidentSurchargeRate: 0.02, // 2.0% surcharge
  },
  // Baseline Statutory Rates
  'statutory_standard': {
    taxYearLabel: 'Statutory Baseline Thresholds',
    standardResidentialBands: [
      { name: '0% Band (Up to £125,000)', min: 0, max: 125000, rate: 0.0 },
      { name: '2% Band (£125,001 to £250,000)', min: 125000, max: 250000, rate: 0.02 },
      { name: '5% Band (£250,001 to £925,000)', min: 250000, max: 925000, rate: 0.05 },
      { name: '10% Band (£925,001 to £1,500,000)', min: 925000, max: 1500000, rate: 0.10 },
      { name: '12% Band (Over £1,500,000)', min: 1500000, max: Infinity, rate: 0.12 },
    ],
    firstTimeBuyerBands: [
      { name: '0% First-Time Buyer Band (Up to £300,000)', min: 0, max: 300000, rate: 0.0 },
      { name: '5% First-Time Buyer Band (£300,001 to £500,000)', min: 300000, max: 500000, rate: 0.05 },
    ],
    firstTimeBuyerMaxPropertyPrice: 500000,
    additionalPropertySurchargeRate: 0.05,
    nonUkResidentSurchargeRate: 0.02,
  },
};
