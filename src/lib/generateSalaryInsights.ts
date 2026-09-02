import { TakeHomeInput, TakeHomeResult } from '../types';

export interface SalaryDeductionItem {
  label: string;
  amountAnnual: number;
  amountMonthly: number;
  formattedAnnual: string;
  formattedMonthly: string;
  percentOfGross: string;
}

export interface SalaryInsightsData {
  hasData: boolean;
  headline: string;
  estimatedPay: {
    grossAnnualFormatted: string;
    grossMonthlyFormatted: string;
    netAnnualFormatted: string;
    netMonthlyFormatted: string;
    retentionRateFormatted: string;
    regionLabel: string;
    frequencyLabel: string;
    summary: string;
    bullets: string[];
  };
  mainDeductions: {
    totalDeductionsAnnualFormatted: string;
    totalDeductionsMonthlyFormatted: string;
    effectiveRateFormatted: string;
    highestDeductionName: string;
    highestDeductionAmountFormatted: string;
    items: SalaryDeductionItem[];
    summary: string;
    bullets: string[];
  };
  whatStandsOut: {
    marginalRateFormatted: string;
    marginalTaxExplanation: string;
    bullets: string[];
  };
  thingsToCheck: {
    bullets: string[];
  };
  plainText: string;
}

export function formatGBP(amount: number): string {
  if (isNaN(amount) || amount === 0) return '£0.00';
  return '£' + amount.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatWholeGBP(amount: number): string {
  if (isNaN(amount) || amount === 0) return '£0';
  return '£' + Math.round(amount).toLocaleString('en-GB');
}

export const DISCLAIMER_TEXT =
  'These insights are generated from estimated calculator results for general information only. They are not tax, financial, legal, payroll, or employment advice. Verify important figures with HMRC, your employer, payroll provider, accountant, or a qualified adviser.';

export function generateSalaryInsights(
  input: TakeHomeInput,
  result: TakeHomeResult
): SalaryInsightsData {
  const gross = result.grossAnnual || 0;
  const netAnnual = result.netAnnual || 0;
  const netMonthly = result.netMonthly || 0;
  const totalDeductionsAnnual = result.totalDeductionsAnnual || 0;
  const totalDeductionsMonthly = result.totalDeductionsMonthly || 0;

  const getRegionLabel = (reg?: string) => {
    if (reg === 'scotland') return 'Scotland';
    if (reg === 'wales') return 'Wales';
    if (reg === 'england_ni') return 'England & Northern Ireland';
    return 'England, Wales & Northern Ireland';
  };

  const regionLabel = getRegionLabel(input.region);

  if (gross <= 0) {
    return {
      hasData: false,
      headline: 'No gross income entered yet.',
      estimatedPay: {
        grossAnnualFormatted: '£0.00',
        grossMonthlyFormatted: '£0.00',
        netAnnualFormatted: '£0.00',
        netMonthlyFormatted: '£0.00',
        retentionRateFormatted: '0.0%',
        regionLabel,
        frequencyLabel: input.payFrequency === 'monthly' ? 'Monthly' : input.payFrequency === 'weekly' ? 'Weekly' : 'Annual',
        summary: 'Enter an estimated salary to generate plain-English salary insights.',
        bullets: ['Estimated take-home will update automatically when gross pay is entered.'],
      },
      mainDeductions: {
        totalDeductionsAnnualFormatted: '£0.00',
        totalDeductionsMonthlyFormatted: '£0.00',
        effectiveRateFormatted: '0.0%',
        highestDeductionName: 'None',
        highestDeductionAmountFormatted: '£0.00',
        items: [],
        summary: 'No estimated deductions to report for zero income.',
        bullets: ['Deductions will be calculated based on your input parameters.'],
      },
      whatStandsOut: {
        marginalRateFormatted: '0%',
        marginalTaxExplanation: 'No income tax or National Insurance due on zero earnings.',
        bullets: ['Income up to the £12,570 standard Personal Allowance is completely free of income tax.'],
      },
      thingsToCheck: {
        bullets: [
          'Check that your entered salary reflects your contracted gross pay.',
          'Verify if you receive any taxable allowances, bonuses, or overtime.',
        ],
      },
      plainText: `Smart Salary Insights\nA simple explanation based on your estimated calculation.\n\nNo earnings entered.\n\nDisclaimer: ${DISCLAIMER_TEXT}`,
    };
  }

  const retentionPercent = gross > 0 ? (netAnnual / gross) * 100 : 0;
  const effectiveTaxPercent = gross > 0 ? (totalDeductionsAnnual / gross) * 100 : 0;
  const frequencyLabel = input.payFrequency === 'monthly' ? 'Monthly' : input.payFrequency === 'weekly' ? 'Weekly' : 'Annual';

  // 1. Estimated Pay Bullets
  const payBullets: string[] = [
    `On an estimated gross income of ${formatGBP(gross)} per year (${formatGBP(gross / 12)} per month), your estimated net take-home pay is ${formatGBP(netAnnual)} annually (${formatGBP(netMonthly)} monthly).`,
    `You retain approximately ${retentionPercent.toFixed(1)}% of your gross pay after all estimated statutory taxes and deductions.`,
    `This calculation is based on ${input.taxYear.replace('_', '/')} tax rules for ${regionLabel}.`,
  ];

  // 2. Deduction breakdown and finding highest deduction
  const deductionsList: Array<{ name: string; annual: number; monthly: number }> = [];

  if (result.incomeTaxAnnual > 0) {
    deductionsList.push({
      name: 'Income Tax (PAYE)',
      annual: result.incomeTaxAnnual,
      monthly: result.incomeTaxMonthly,
    });
  }
  if (result.employeeNiAnnual > 0) {
    deductionsList.push({
      name: 'Class 1 National Insurance',
      annual: result.employeeNiAnnual,
      monthly: result.employeeNiMonthly,
    });
  }
  if (result.pensionAnnual > 0) {
    deductionsList.push({
      name: 'Workplace Pension (Employee)',
      annual: result.pensionAnnual,
      monthly: result.pensionMonthly,
    });
  }
  if (result.studentLoanAnnual > 0) {
    deductionsList.push({
      name: 'Student Loan Repayment',
      annual: result.studentLoanAnnual,
      monthly: result.studentLoanMonthly,
    });
  }
  if (result.salarySacrificeAnnual > 0) {
    deductionsList.push({
      name: 'Salary Sacrifice Scheme',
      annual: result.salarySacrificeAnnual,
      monthly: result.salarySacrificeAnnual / 12,
    });
  }

  // Sort by highest deduction
  const sortedDeductions = [...deductionsList].sort((a, b) => b.annual - a.annual);
  const highest = sortedDeductions.length > 0 ? sortedDeductions[0] : null;

  const deductionItems: SalaryDeductionItem[] = sortedDeductions.map((d) => ({
    label: d.name,
    amountAnnual: d.annual,
    amountMonthly: d.monthly,
    formattedAnnual: formatGBP(d.annual),
    formattedMonthly: formatGBP(d.monthly),
    percentOfGross: gross > 0 ? `${((d.annual / gross) * 100).toFixed(1)}%` : '0.0%',
  }));

  const deductionBullets: string[] = [
    `Total estimated deductions equal ${formatGBP(totalDeductionsAnnual)} per year (${formatGBP(totalDeductionsMonthly)} per month), representing ${effectiveTaxPercent.toFixed(1)}% of your gross earnings.`,
  ];

  if (highest) {
    const highestPercent = ((highest.annual / gross) * 100).toFixed(1);
    deductionBullets.push(
      `Your single largest estimated deduction is ${highest.name} at ${formatGBP(highest.annual)}/year (${formatGBP(highest.monthly)}/month), accounting for ${highestPercent}% of your gross pay.`
    );
  } else {
    deductionBullets.push('No income tax, National Insurance, or other deductions are due on this income level.');
  }

  if (result.employerPensionAnnual > 0) {
    deductionBullets.push(
      `In addition to your take-home pay, your employer contributes an estimated ${formatGBP(result.employerPensionAnnual)} per year (${formatGBP(result.employerPensionMonthly)} per month) to your pension pot.`
    );
  }

  // 3. What Stands Out
  const standsOutBullets: string[] = [];

  // Personal Allowance observations
  if (gross <= 12570) {
    standsOutBullets.push(
      `Your estimated earnings fall entirely within the £12,570 tax-free Personal Allowance threshold, so you incur zero standard UK income tax.`
    );
  } else if (gross > 100000 && gross < 125140) {
    const taperLoss = result.personalAllowanceTaperLoss || (gross - 100000) / 2;
    standsOutBullets.push(
      `Personal Allowance Taper: Because your earnings exceed £100,000, your tax-free personal allowance is reduced by £1 for every £2 earned above £100k (estimated allowance loss of ${formatWholeGBP(taperLoss)}). This creates an effective 60% marginal tax rate on income in this bracket.`
    );
  } else if (gross >= 125140) {
    standsOutBullets.push(
      `Your earnings exceed £125,140, meaning your Personal Allowance is fully reduced to £0 and taxable earnings above this threshold are taxed at the 45% Additional Rate (or 48% Top Rate in Scotland).`
    );
  } else if (gross > 50270 && input.region !== 'scotland') {
    standsOutBullets.push(
      `Higher Rate Band: Earnings above £50,270 are subject to the 40% Higher Rate of income tax, while your employee National Insurance rate drops from 8% down to 2% on earnings above £50,270.`
    );
  } else if (input.region === 'scotland' && gross > 43662) {
    standsOutBullets.push(
      `Scottish Higher Rates: Under devolved Scottish tax bands, earnings between £43,662 and £75,000 are taxed at the 42% Higher Rate, and earnings between £75,000 and £125,140 at the 45% Advanced Rate.`
    );
  } else {
    standsOutBullets.push(
      `Basic Rate Band: Your taxable income above £12,570 is taxed at the 20% Basic Rate (or Scottish 19%-21% Starter/Basic/Intermediate bands), alongside 8% Class 1 National Insurance on earnings above the £12,570 Primary Threshold.`
    );
  }

  // Pension scheme observation if active
  if (result.pensionAnnual > 0) {
    const pType = input.pensionType;
    if (pType === 'salary_sacrifice') {
      standsOutBullets.push(
        `Pension by Salary Sacrifice: Your employee pension contribution of ${formatGBP(result.pensionAnnual)} is deducted before both Income Tax and National Insurance, saving both taxes automatically.`
      );
    } else if (pType === 'relief_at_source') {
      standsOutBullets.push(
        `Relief at Source Pension: 20% basic rate tax relief is added automatically by your pension scheme provider. If you pay higher (40%) or additional rate tax, higher-rate relief is claimed via self-assessment or HMRC tax code adjustment.`
      );
    } else {
      standsOutBullets.push(
        `Net Pay Arrangement: Your pension contribution of ${formatGBP(result.pensionAnnual)} is deducted before income tax calculation, reducing your taxable pay.`
      );
    }
  }

  // Student loan observation if active
  if (result.studentLoanAnnual > 0) {
    standsOutBullets.push(
      `Student Loan Deduction: Your selected student loan repayment plan results in an estimated ${formatGBP(result.studentLoanAnnual)} annual deduction (${formatGBP(result.studentLoanMonthly)} monthly). Deductions apply only to earnings above your plan's statutory threshold.`
    );
  }

  // 4. Things to Check
  const checkBullets: string[] = [
    `Tax Code Accuracy: This calculation assumes tax code ${input.taxCode.toUpperCase()}. Standard single-job tax code for 2025/2026 is 1257L. You may wish to check your HMRC online personal tax account or payslip if you have taxable company benefits, multiple employments, or underpaid tax from previous years.`,
    `Scottish Tax Residency: You have selected "${regionLabel}". You may wish to verify that HMRC has your current primary residential address registered correctly, as Scottish income tax applies based on your main residence.`,
  ];

  if (result.studentLoanAnnual > 0 || input.studentLoanPlan !== 'none') {
    checkBullets.push(
      `Student Loan Plan: You may wish to verify with the Student Loans Company (SLC) or your Student Finance portal that your plan type corresponds accurately to the course start date and country of your loan.`
    );
  }

  if (input.pensionPercentage > 0 || input.pensionFixedAmount > 0) {
    checkBullets.push(
      `Pension Arrangement: You may wish to confirm with your employer's HR or payroll team whether your workplace pension operates via Salary Sacrifice, Net Pay, or Relief at Source to ensure accurate payslip matching.`
    );
  }

  if (input.bonus > 0 || input.overtime > 0) {
    checkBullets.push(
      `Variable Earnings: You entered bonus or overtime earnings. Monthly PAYE calculations on variable pay can vary across pay periods due to cumulative tax banding calculations.`
    );
  }

  // Compile Plain Text Export
  const plainText = [
    '========================================',
    'SMART SALARY INSIGHTS',
    'A simple explanation based on your estimated calculation.',
    '========================================',
    '',
    '1. YOUR ESTIMATED PAY',
    `• Gross Pay: ${formatGBP(gross)} / year (${formatGBP(gross / 12)} / month)`,
    `• Net Take-Home Pay: ${formatGBP(netAnnual)} / year (${formatGBP(netMonthly)} / month)`,
    `• Estimated Retention: ${retentionPercent.toFixed(1)}% of gross earnings`,
    `• Tax Region: ${regionLabel}`,
    `• Pay Frequency: ${frequencyLabel}`,
    '',
    '2. YOUR MAIN DEDUCTIONS',
    `• Total Estimated Deductions: ${formatGBP(totalDeductionsAnnual)} / year (${effectiveTaxPercent.toFixed(1)}% effective rate)`,
    highest
      ? `• Highest Deduction: ${highest.name} at ${formatGBP(highest.annual)} / year (${formatGBP(highest.monthly)} / month)`
      : '• No deductions on this income level',
    ...deductionItems.map((d) => `  - ${d.label}: ${d.formattedAnnual} / year (${d.formattedMonthly} / month) [${d.percentOfGross}]`),
    ...(result.employerPensionAnnual > 0
      ? [`• Employer Pension Contribution: ${formatGBP(result.employerPensionAnnual)} / year`]
      : []),
    '',
    '3. WHAT STANDS OUT',
    ...standsOutBullets.map((b) => `• ${b}`),
    '',
    '4. THINGS TO CHECK',
    ...checkBullets.map((b) => `• ${b}`),
    '',
    '----------------------------------------',
    `DISCLAIMER: ${DISCLAIMER_TEXT}`,
    '========================================',
  ].join('\n');

  return {
    hasData: true,
    headline: `Estimated ${formatGBP(netMonthly)} take-home per month (${retentionPercent.toFixed(1)}% retained)`,
    estimatedPay: {
      grossAnnualFormatted: formatGBP(gross),
      grossMonthlyFormatted: formatGBP(gross / 12),
      netAnnualFormatted: formatGBP(netAnnual),
      netMonthlyFormatted: formatGBP(netMonthly),
      retentionRateFormatted: `${retentionPercent.toFixed(1)}%`,
      regionLabel,
      frequencyLabel,
      summary: `You take home an estimated ${formatGBP(netMonthly)} each month from ${formatGBP(gross / 12)} gross pay.`,
      bullets: payBullets,
    },
    mainDeductions: {
      totalDeductionsAnnualFormatted: formatGBP(totalDeductionsAnnual),
      totalDeductionsMonthlyFormatted: formatGBP(totalDeductionsMonthly),
      effectiveRateFormatted: `${effectiveTaxPercent.toFixed(1)}%`,
      highestDeductionName: highest ? highest.name : 'None',
      highestDeductionAmountFormatted: highest ? formatGBP(highest.annual) : '£0.00',
      items: deductionItems,
      summary: highest
        ? `Your total estimated deductions are ${formatGBP(totalDeductionsMonthly)}/month, with ${highest.name} being the largest.`
        : `No tax or statutory deductions applied on this amount.`,
      bullets: deductionBullets,
    },
    whatStandsOut: {
      marginalRateFormatted: `${result.marginalTaxRate}%`,
      marginalTaxExplanation: result.marginalTaxExplanation,
      bullets: standsOutBullets,
    },
    thingsToCheck: {
      bullets: checkBullets,
    },
    plainText,
  };
}
