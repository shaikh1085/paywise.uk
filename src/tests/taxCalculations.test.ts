/**
 * PayWise UK - Calculation Engine Automated Test Suite
 * 
 * Validates all tax calculation logic against official HMRC, Scottish Government,
 * Student Loans Company (SLC), NHS Agenda for Change, and Teachers' Pension rules.
 */

import {
  calculateTakeHomePay,
  parseTaxCode,
  calculateStudentLoanRepayments,
  calculateMarginalRate,
  calculateDayRate,
  calculateHourlyRate,
  calculatePensionCompound,
  calculateSalarySacrifice,
  calculateOvertime,
  calculateNhsSalary,
  calculateTeacherSalary,
  calculateInsideIr35,
  calculateUmbrella,
  calculateVat,
  calculateGrossFromNet,
  calculateMinimumWage,
  calculateNmw,
  calculateMaternityPay,
  calculateChildBenefit,
  calculateSickPay,
  calculateMarriageAllowance,
  calculateSecondJob,
  calculateSecondJobTax,
  calculateSalaryComparison,
  calculatePayFrequencies,
  calculateStampDuty,
} from '../utils/calculations';
import { UK_TAX_CONFIGS } from '../config/taxConfig';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, errorDetails?: string) {
  if (condition) {
    passCount++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failCount++;
    console.error(`  ✗ FAIL: ${testName} -> ${errorDetails || 'Assertion failed'}`);
  }
}

function assertCloseTo(actual: number, expected: number, tolerance = 0.5, testName: string) {
  const diff = Math.abs(actual - expected);
  const pass = diff <= tolerance;
  assert(pass, testName, `Expected ~£${expected.toFixed(2)}, got £${actual.toFixed(2)} (diff: £${diff.toFixed(2)})`);
}

console.log('\n======================================================');
console.log('PAYWISE UK TAX CALCULATION ENGINE TEST SUITE');
console.log('======================================================\n');

// ----------------------------------------------------
// TEST GROUP 1: BOUNDARY SALARIES (England/Wales/NI 2025/26)
// ----------------------------------------------------
console.log('--- 1. Boundary Salaries (2025/26 rUK, 1257L, 0% Pension, No Loan) ---');

// Test 1.1: £0 Salary
const res0 = calculateTakeHomePay({
  grossSalary: 0,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assert(res0.netAnnual === 0 && res0.incomeTaxAnnual === 0 && res0.employeeNiAnnual === 0, '£0 salary produces £0 deductions and £0 net pay');

// Test 1.2: £12,570 (Personal Allowance Threshold)
const res12570 = calculateTakeHomePay({
  grossSalary: 12570,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(res12570.incomeTaxAnnual, 0, 0.01, '£12,570 salary pays £0 Income Tax');
assertCloseTo(res12570.employeeNiAnnual, 0, 0.01, '£12,570 salary pays £0 National Insurance');
assertCloseTo(res12570.netAnnual, 12570, 0.01, '£12,570 salary yields full £12,570 net pay');

// Test 1.3: £30,000 (Standard Basic Rate)
// Taxable = 30000 - 12570 = 17430 * 20% = 3486
// NI = (30000 - 12570) * 8% = 17430 * 0.08 = 1394.40
// Net = 30000 - 3486 - 1394.40 = 25119.60
const res30k = calculateTakeHomePay({
  grossSalary: 30000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(res30k.incomeTaxAnnual, 3486, 0.01, '£30,000 Income Tax is exactly £3,486.00 (20% on £17,430)');
assertCloseTo(res30k.employeeNiAnnual, 1394.40, 0.01, '£30,000 NI is exactly £1,394.40 (8% on £17,430)');
assertCloseTo(res30k.netAnnual, 25119.60, 0.01, '£30,000 Net Annual is exactly £25,119.60');

// Test 1.4: £50,270 (Basic Rate Limit & UEL)
// Taxable = 50270 - 12570 = 37700 * 20% = 7540
// NI = (50270 - 12570) * 8% = 37700 * 0.08 = 3016
// Net = 50270 - 7540 - 3016 = 39714
const res50270 = calculateTakeHomePay({
  grossSalary: 50270,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(res50270.incomeTaxAnnual, 7540, 0.01, '£50,270 Income Tax is £7,540.00 (max basic band)');
assertCloseTo(res50270.employeeNiAnnual, 3016, 0.01, '£50,270 NI is £3,016.00 (8% on £37,700)');
assertCloseTo(res50270.netAnnual, 39714, 0.01, '£50,270 Net Annual is £39,714.00');

// Test 1.5: £60,000 (Higher Rate)
// Tax = 7540 (basic) + (60000 - 50270) * 40% = 7540 + 3892 = 11432
// NI = 3016 (main) + (60000 - 50270) * 2% = 3016 + 194.60 = 3210.60
// Net = 60000 - 11432 - 3210.60 = 45357.40
const res60k = calculateTakeHomePay({
  grossSalary: 60000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(res60k.incomeTaxAnnual, 11432, 0.01, '£60,000 Income Tax is £11,432.00');
assertCloseTo(res60k.employeeNiAnnual, 3210.60, 0.01, '£60,000 NI is £3,210.60');
assertCloseTo(res60k.netAnnual, 45357.40, 0.01, '£60,000 Net Annual is £45,357.40');

// Test 1.6: £110,000 (Personal Allowance Tapering)
// Excess over £100k = £10,000 -> Taper loss = £5,000 -> Allowance applied = £7,570
// Taxable pay = 110000 - 7570 = 102430
// Basic band: 37700 * 20% = 7540
// Higher band: (102430 - 37700) = 64730 * 40% = 25892
// Total Tax = 7540 + 25892 = 33432
// NI = 3016 + (110000 - 50270) * 2% = 3016 + 1194.60 = 4210.60
const res110k = calculateTakeHomePay({
  grossSalary: 110000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(res110k.personalAllowanceApplied, 7570, 0.01, '£110,000 allowance correctly tapered to £7,570 (lost £5,000)');
assertCloseTo(res110k.incomeTaxAnnual, 33432, 0.01, '£110,000 Income Tax is £33,432.00');
assertCloseTo(res110k.employeeNiAnnual, 4210.60, 0.01, '£110,000 NI is £4,210.60');

// Test 1.7: £125,140 (Personal Allowance Zeroed Out)
// Allowance is fully tapered to £0
// Taxable = 125140
// Basic band: 37700 * 20% = 7540
// Higher band: (125140 - 37700) = 87440 * 40% = 34976
// Total Tax = 7540 + 34976 = 42516
const res125140 = calculateTakeHomePay({
  grossSalary: 125140,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(res125140.personalAllowanceApplied, 0, 0.01, '£125,140 Personal Allowance is reduced to £0');
assertCloseTo(res125140.incomeTaxAnnual, 42516, 0.01, '£125,140 Income Tax is £42,516.00');

// Test 1.8: £150,000 (Additional Rate 45%)
// Allowance = 0. Taxable = 150000
// Basic: 37700 * 20% = 7540
// Higher: (125140 - 37700) = 87440 * 40% = 34976
// Additional: (150000 - 125140) = 24860 * 45% = 11187
// Total Tax = 7540 + 34976 + 11187 = 53703
const res150k = calculateTakeHomePay({
  grossSalary: 150000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(res150k.incomeTaxAnnual, 53703, 0.01, '£150,000 Income Tax is £53,703.00 (includes 45% additional band)');

// ----------------------------------------------------
// TEST GROUP 2: TAX CODES & ALLOWANCES
// ----------------------------------------------------
console.log('\n--- 2. Tax Code Parsing & Special Codes ---');

const codeBR = parseTaxCode('BR', 12570);
assert(codeBR.isSpecialRate === 'BR' && codeBR.personalAllowance === 0, 'BR code correctly sets 0 allowance and BR flag');

const codeD0 = parseTaxCode('D0', 12570);
assert(codeD0.isSpecialRate === 'D0', 'D0 code correctly sets D0 flag');

const codeNT = parseTaxCode('NT', 12570);
assert(codeNT.isSpecialRate === 'NT', 'NT code correctly sets NT (No Tax) flag');

const code0T = parseTaxCode('0T', 12570);
assert(code0T.isSpecialRate === '0T' && code0T.personalAllowance === 0, '0T code sets 0 allowance with progressive rates');

const codeK = parseTaxCode('K500', 12570);
assert(codeK.isNegativeAllowance && codeK.personalAllowance === 5000, 'K500 code sets £5,000 negative allowance');

const codeM = parseTaxCode('1257M', 12570);
assert(codeM.personalAllowance === 12570 + 1260, '1257M code adds £1,260 Marriage Allowance');

const codeN = parseTaxCode('1257N', 12570);
assert(codeN.personalAllowance === 12570 - 1260, '1257N code subtracts £1,260 Marriage Allowance');

const codeS = parseTaxCode('S1257L', 12570);
assert(codeS.isScotland === true, 'S1257L identifies Scotland jurisdiction');

// ----------------------------------------------------
// TEST GROUP 3: STUDENT LOAN REPAYMENTS (2025/26)
// ----------------------------------------------------
console.log('\n--- 3. Student Loans (2025/26 Official SLC Thresholds) ---');

const cfg2526 = UK_TAX_CONFIGS['2025_26'];

// Plan 1: threshold £26,065, rate 9%
// On £35,000: (35000 - 26065) * 0.09 = 8935 * 0.09 = 804.15
const slP1 = calculateStudentLoanRepayments(35000, 'plan1', cfg2526);
assertCloseTo(slP1.studentLoanAnnual, 804.15, 0.01, 'Plan 1 on £35,000 is £804.15 (9% over £26,065)');

// Plan 2: threshold £28,470, rate 9%
// On £35,000: (35000 - 28470) * 0.09 = 6530 * 0.09 = 587.70
const slP2 = calculateStudentLoanRepayments(35000, 'plan2', cfg2526);
assertCloseTo(slP2.studentLoanAnnual, 587.70, 0.01, 'Plan 2 on £35,000 is £587.70 (9% over £28,470)');

// Plan 4 (Scotland): threshold £32,745, rate 9%
// On £40,000: (40000 - 32745) * 0.09 = 7255 * 0.09 = 652.95
const slP4 = calculateStudentLoanRepayments(40000, 'plan4', cfg2526);
assertCloseTo(slP4.studentLoanAnnual, 652.95, 0.01, 'Plan 4 on £40,000 is £652.95 (9% over £32,745)');

// Plan 5: threshold £25,000, rate 9%
// On £35,000: (35000 - 25000) * 0.09 = 10000 * 0.09 = 900.00
const slP5 = calculateStudentLoanRepayments(35000, 'plan5', cfg2526);
assertCloseTo(slP5.studentLoanAnnual, 900.00, 0.01, 'Plan 5 on £35,000 is £900.00 (9% over £25,000)');

// Postgrad: threshold £21,000, rate 6%
// On £35,000: (35000 - 21000) * 0.06 = 14000 * 0.06 = 840.00
const slPG = calculateStudentLoanRepayments(35000, 'postgrad', cfg2526);
assertCloseTo(slPG.postgradLoanAnnual, 840.00, 0.01, 'Postgraduate loan on £35,000 is £840.00 (6% over £21,000)');

// Combined: Plan 2 + Postgrad on £35,000 = 587.70 + 840.00 = 1427.70
const slCombined = calculateStudentLoanRepayments(35000, 'plan2_and_postgrad', cfg2526);
assertCloseTo(slCombined.studentLoanAnnual + slCombined.postgradLoanAnnual, 1427.70, 0.01, 'Combined Plan 2 + Postgrad on £35,000 is £1,427.70');

// ----------------------------------------------------
// TEST GROUP 4: PENSION METHODS
// ----------------------------------------------------
console.log('\n--- 4. Pension Deduction Types ---');

// Auto-enrolment 5% on £40,000 qualifying earnings: (40000 - 6240) = 33760 * 5% = 1688
const resAuto = calculateTakeHomePay({
  grossSalary: 40000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 5,
  pensionFixedAmount: 0,
  pensionType: 'auto_enrolment',
  employerPensionPercentage: 3,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(resAuto.pensionAnnual, 1688, 0.01, 'Auto-enrolment 5% on £40k is £1,688.00 (qualifying earnings £33,760)');
assertCloseTo(resAuto.employerPensionAnnual, 1012.80, 0.01, 'Employer auto-enrolment 3% on £40k is £1,012.80');

// Salary sacrifice pension reduces both Income Tax and NI
const resSalSac = calculateTakeHomePay({
  grossSalary: 50000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 10, // £5,000 sacrifice -> adjusted gross £45,000
  pensionFixedAmount: 0,
  pensionType: 'salary_sacrifice',
  employerPensionPercentage: 3,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
// Tax on £45,000 = (45000 - 12570) * 20% = 6486
// NI on £45,000 = (45000 - 12570) * 8% = 2594.40
assertCloseTo(resSalSac.incomeTaxAnnual, 6486, 0.01, 'Salary sacrifice reduces Income Tax to £6,486.00');
assertCloseTo(resSalSac.employeeNiAnnual, 2594.40, 0.01, 'Salary sacrifice reduces NI to £2,594.40');

// ----------------------------------------------------
// TEST GROUP 5: OTHER CALCULATORS
// ----------------------------------------------------
console.log('\n--- 5. Specialized Calculators ---');

// Day Rate
const dayRes = calculateDayRate({
  dayRate: 500,
  daysPerWeek: 5,
  weeksPerYear: 46,
  holidayDays: 0,
  pensionPercentage: 0,
  monthlyExpenses: 0,
  isInsideIR35: false,
  umbrellaMarginMonthly: 0,
});
assert(dayRes.grossAnnualEquivalent === 115000, 'Day rate £500 x 230 days = £115,000 gross annual');

// Hourly Rate
const hourlyRes = calculateHourlyRate({
  hourlyWage: 20,
  hoursPerWeek: 37.5,
  weeksPerYear: 52,
  overtimeHoursPerWeek: 5,
  overtimeMultiplier: 1.5,
  pensionPercentage: 5,
});
assertCloseTo(hourlyRes.basicGrossAnnual, 39000, 0.01, 'Basic 37.5h x £20 x 52w = £39,000 gross');
assertCloseTo(hourlyRes.overtimeGrossAnnual, 7800, 0.01, 'Overtime 5h x £30 x 52w = £7,800 gross');
assertCloseTo(hourlyRes.totalGrossAnnual, 46800, 0.01, 'Total gross hourly pay = £46,800');

// Salary Sacrifice Calculator
const salSacCalc = calculateSalarySacrifice({
  currentSalary: 60000,
  monthlySacrifice: 500, // £6,000 annual sacrifice (in 40% tax & 2% NI band)
  benefitType: 'pension',
  currentPensionPercent: 0,
});
assertCloseTo(salSacCalc.annualIncomeTaxSaved, 2400, 0.01, '£6,000 sacrifice saves £2,400 Income Tax (40%)');
assertCloseTo(salSacCalc.annualNiSaved, 120, 0.01, '£6,000 sacrifice saves £120 Employee NI (2%)');
assertCloseTo(salSacCalc.totalAnnualTaxSavings, 2520, 0.01, 'Total tax saved is £2,520 (42% marginal relief)');

// Overtime Calculator
const otCalc = calculateOvertime({
  basicHourlyRate: 25,
  overtimeMultiplier: 1.5,
  overtimeHours: 10,
  currentAnnualSalary: 35000,
  payPeriod: 'monthly',
});
assertCloseTo(otCalc.grossOvertimePay, 375, 0.01, '10h overtime at 1.5x of £25 = £375 gross');

// NHS Band 5 Calculator
const nhsCalc = calculateNhsSalary({
  band: 'band_5',
  pointIndex: 0,
  regionHCAS: 'none',
  optInPension: true,
  studentLoanPlan: 'none',
});
assert(nhsCalc.basicSalary === 28407, 'NHS Band 5 entry point is £28,407');

// Teacher M1 Calculator
const teacherCalc = calculateTeacherSalary({
  category: 'Main',
  point: 'M1 (ECT Year 1)',
  region: 'england',
  optInPension: true,
  studentLoanPlan: 'none',
});
assert(teacherCalc.grossSalary === 30000, 'Teacher M1 England baseline is £30,000');

// ----------------------------------------------------
// TEST GROUP 6: SCOTTISH INCOME TAX DEVOLVED BANDS (2025/26)
// ----------------------------------------------------
console.log('\n--- 6. Scottish Income Tax Bands (2025/26) ---');

// Scotland £20,000:
// Allowance £12,570. Taxable £7,430.
// Starter (19% on first £2,827) = £537.13
// Basic (20% on remaining £4,603) = £920.60
// Total Scottish Tax = £1,457.73
const scot20k = calculateTakeHomePay({
  grossSalary: 20000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'scotland',
  taxCode: 'S1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(scot20k.incomeTaxAnnual, 1457.73, 0.5, 'Scottish £20,000 Income Tax is ~£1,457.73 (Starter 19% + Basic 20%)');

// Scotland £50,000:
// Taxable = £37,430
// Starter: £2,827 * 19% = £537.13
// Basic: £12,094 * 20% = £2,418.80
// Intermediate: £16,171 * 21% = £3,395.91
// Higher: (£37,430 - £31,092 = £6,338) * 42% = £2,661.96
// Total Scottish Tax = £537.13 + £2418.80 + £3395.91 + £2661.96 = £9,013.80
const scot50k = calculateTakeHomePay({
  grossSalary: 50000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'scotland',
  taxCode: 'S1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(scot50k.incomeTaxAnnual, 9013.80, 1.0, 'Scottish £50,000 Income Tax is ~£9,013.80 across 4 Scottish bands');

// ----------------------------------------------------
// TEST GROUP 7: EMPLOYER NATIONAL INSURANCE 2025/26
// ----------------------------------------------------
console.log('\n--- 7. Employer National Insurance 2025/26 (£5k Secondary Threshold, 15% Rate) ---');

// £30,000 salary: Employer NI = (30000 - 5000) * 15% = 25000 * 0.15 = £3,750
const empNi30k = calculateTakeHomePay({
  grossSalary: 30000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(empNi30k.employerNiAnnual, 3750, 0.01, '2025/26 Employer NI on £30k is £3,750.00 (15% above £5,000)');

// ----------------------------------------------------
// TEST GROUP 8: PENSION COMPOUND GROWTH
// ----------------------------------------------------
console.log('\n--- 8. Pension Compound Projection ---');

const pensionPot = calculatePensionCompound({
  currentAge: 30,
  retirementAge: 65,
  grossSalary: 50000,
  currentPot: 20000,
  employeeContributionPercent: 5,
  employerContributionPercent: 3,
  fixedMonthlyTopUp: 0,
  expectedAnnualGrowth: 6,
  inflationRate: 2.5,
});
assert(pensionPot.yearsToRetirement === 35, 'Years to retirement is 35 (65 - 30)');
assert(pensionPot.finalPotNominal > 500000, 'Projected pension pot exceeds £500,000 with 6% growth');
assert(pensionPot.estimatedAnnualDrawdownSafe4Percent > 0, '4% safe drawdown is positive and calculated');

// ----------------------------------------------------
// TEST GROUP 9: INPUT SANITIZATION & EDGE CASES
// ----------------------------------------------------
console.log('\n--- 9. Input Sanitization & Resilience ---');

const resNegative = calculateTakeHomePay({
  grossSalary: -5000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: -5,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assert(resNegative.grossAnnual === 0, 'Negative salary is clamped to 0 without NaN');
assert(resNegative.netAnnual === 0, 'Negative salary yields 0 net without error');

// ----------------------------------------------------
// TEST GROUP 10: WALES TAX REGION & MARRIAGE ALLOWANCE
// ----------------------------------------------------
console.log('\n--- 10. Wales Region & Marriage Allowance ---');

// Test Wales region explicitly
const resWales = calculateTakeHomePay({
  grossSalary: 30000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'wales',
  taxCode: 'C1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
});
assertCloseTo(resWales.incomeTaxAnnual, 3486, 0.01, 'Wales £30k salary pays £3,486.00 income tax');

// Test Marriage Allowance (+£1,260 personal allowance)
// Taxable = 30000 - (12570 + 1260) = 30000 - 13830 = 16170 * 20% = 3234.00 (saves £252.00)
const resMarriage = calculateTakeHomePay({
  grossSalary: 30000,
  payFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionFixedAmount: 0,
  pensionType: 'net_pay',
  employerPensionPercentage: 0,
  studentLoanPlan: 'none',
  bonus: 0,
  overtime: 0,
  otherTaxableIncome: 0,
  salarySacrificeMonthly: 0,
  isMarriageAllowance: true,
});
assertCloseTo(resMarriage.incomeTaxAnnual, 3234, 0.01, 'Marriage allowance reduces tax on £30k by £252 (pays £3,234.00)');

// ----------------------------------------------------
// 11. VAT CALCULATOR TESTS
// ----------------------------------------------------
console.log('\n--- 11. UK VAT Calculations ---');

// Standard 20% Add
const vatAddStd = calculateVat({ amount: 1000, vatRate: 'standard', mode: 'add' });
assertCloseTo(vatAddStd.netAmount, 1000, 0.01, '£1000 net + 20% VAT net is £1000');
assertCloseTo(vatAddStd.vatAmount, 200, 0.01, '£1000 net + 20% VAT is £200');
assertCloseTo(vatAddStd.grossAmount, 1200, 0.01, '£1000 net + 20% gross is £1200');

// Standard 20% Remove
const vatRemStd = calculateVat({ amount: 1200, vatRate: 'standard', mode: 'remove' });
assertCloseTo(vatRemStd.grossAmount, 1200, 0.01, '£1200 gross - 20% VAT gross is £1200');
assertCloseTo(vatRemStd.netAmount, 1000, 0.01, '£1200 gross - 20% VAT net is £1000');
assertCloseTo(vatRemStd.vatAmount, 200, 0.01, '£1200 gross - 20% VAT amount is £200');

// Reduced 5% Add & Remove
const vatAddRed = calculateVat({ amount: 100, vatRate: 'reduced', mode: 'add' });
assertCloseTo(vatAddRed.grossAmount, 105, 0.01, '£100 net + 5% reduced VAT is £105 gross');
const vatRemRed = calculateVat({ amount: 105, vatRate: 'reduced', mode: 'remove' });
assertCloseTo(vatRemRed.netAmount, 100, 0.01, '£105 gross - 5% reduced VAT is £100 net');

// Zero Rate 0%
const vatZero = calculateVat({ amount: 50, vatRate: 'zero', mode: 'add' });
assertCloseTo(vatZero.vatAmount, 0, 0.01, 'Zero rate VAT is £0');
assertCloseTo(vatZero.grossAmount, 50, 0.01, 'Zero rate gross equals net (£50)');

// Zero input resilient
const vatZeroInput = calculateVat({ amount: 0, vatRate: 'standard', mode: 'add' });
assertCloseTo(vatZeroInput.grossAmount, 0, 0.01, '£0 input yields £0 gross with no NaN');

// ----------------------------------------------------
// 12. NET TO GROSS CALCULATOR TESTS
// ----------------------------------------------------
console.log('\n--- 12. Net to Gross Reverse PAYE Calculations ---');

// Test 1: £2,000 monthly take-home (Annual target: £24,000)
const n2g2k = calculateGrossFromNet({
  desiredNet: 2000,
  netFrequency: 'monthly',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionType: 'net_pay',
  studentLoanPlan: 'none',
});
assertCloseTo(n2g2k.netMonthly, 2000, 0.05, '£2,000/mo target produces exact £2,000 monthly take-home');
assert(n2g2k.grossAnnual > 27000 && n2g2k.grossAnnual < 29000, '£2,000/mo net requires ~£28,000 gross annual');

// Test 2: £3,000 monthly take-home (Annual target: £36,000)
const n2g3k = calculateGrossFromNet({
  desiredNet: 3000,
  netFrequency: 'monthly',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionType: 'net_pay',
  studentLoanPlan: 'none',
});
assertCloseTo(n2g3k.netMonthly, 3000, 0.05, '£3,000/mo target produces exact £3,000 monthly take-home');
assert(n2g3k.grossAnnual > 44000 && n2g3k.grossAnnual < 47000, '£3,000/mo net requires ~£45,000–£46,000 gross annual');

// Test 3: Direct round-trip consistency test
// If a person earns £50,270 gross, their take-home pay is £39,714. If target net is £39,714 annual, gross must be £50,270
const n2gRoundTrip = calculateGrossFromNet({
  desiredNet: 39714,
  netFrequency: 'annual',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionType: 'net_pay',
  studentLoanPlan: 'none',
});
assertCloseTo(n2gRoundTrip.grossAnnual, 50270, 1.0, 'Target net of £39,714 annual converges to £50,270 gross salary');

// Test 4: Scotland higher tax rate requires higher gross
const n2gScotland = calculateGrossFromNet({
  desiredNet: 3000,
  netFrequency: 'monthly',
  taxYear: '2025_26',
  region: 'scotland',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionType: 'net_pay',
  studentLoanPlan: 'none',
});
assert(n2gScotland.grossAnnual > n2g3k.grossAnnual, 'Scottish taxpayer requires higher gross than England for £3,000/mo net');

// Test 5: Zero desired net
const n2gZero = calculateGrossFromNet({
  desiredNet: 0,
  netFrequency: 'monthly',
  taxYear: '2025_26',
  region: 'england_ni',
  taxCode: '1257L',
  pensionPercentage: 0,
  pensionType: 'net_pay',
  studentLoanPlan: 'none',
});
assertCloseTo(n2gZero.grossAnnual, 0, 0.01, '£0 desired net yields £0 gross');

// ----------------------------------------------------
// 13. NATIONAL MINIMUM WAGE CHECKER TESTS
// ----------------------------------------------------
console.log('\n--- 13. National Minimum Wage & Living Wage Checker ---');

// Test 1: 2025/26 21+ NLW compliant check (£12.50/hr vs £12.21 minimum)
const nmw21Compliant = calculateMinimumWage({
  ageBand: '21_and_over',
  payType: 'hourly',
  hourlyRate: 12.50,
  salaryAmount: 24000,
  hoursPerWeek: 37.5,
  isApprentice: false,
  deductionsFromPay: 0,
  deductionFrequency: 'monthly',
  taxYear: '2025_26',
});
assert(nmw21Compliant.isCompliant === true, '£12.50/hr is compliant with 2025/26 NLW (£12.21)');
assertCloseTo(nmw21Compliant.applicableMinimumRate, 12.21, 0.001, '2025/26 21+ rate is £12.21');
assertCloseTo(nmw21Compliant.hourlyDifference, 0.29, 0.01, 'Surplus buffer is £0.29/hr');

// Test 2: 2025/26 21+ underpaid check (£11.50/hr vs £12.21 minimum)
const nmw21Underpaid = calculateMinimumWage({
  ageBand: '21_and_over',
  payType: 'hourly',
  hourlyRate: 11.50,
  salaryAmount: 22000,
  hoursPerWeek: 37.5,
  isApprentice: false,
  deductionsFromPay: 0,
  deductionFrequency: 'monthly',
  taxYear: '2025_26',
});
assert(nmw21Underpaid.isCompliant === false, '£11.50/hr is underpaid against 2025/26 NLW (£12.21)');
assertCloseTo(nmw21Underpaid.hourlyShortfall, 0.71, 0.01, 'Hourly shortfall is £0.71');
assertCloseTo(nmw21Underpaid.weeklyShortfall, 26.625, 0.01, 'Weekly shortfall is £26.63 on 37.5h');

// Test 3: Deductions reduce effective pay below NMW
const nmwWithDeductions = calculateMinimumWage({
  ageBand: '21_and_over',
  payType: 'hourly',
  hourlyRate: 12.50,
  salaryAmount: 24000,
  hoursPerWeek: 40,
  isApprentice: false,
  deductionsFromPay: 40, // £40/week uniform deduction = £1.00/hr reduction -> £11.50/hr effective
  deductionFrequency: 'weekly',
  taxYear: '2025_26',
});
assert(nmwWithDeductions.isCompliant === false, '£12.50/hr with £40/wk deduction on 40h yields £11.50/hr and is underpaid');
assertCloseTo(nmwWithDeductions.effectiveHourlyRateAfterDeductions, 11.50, 0.01, 'Effective rate after deductions is £11.50');

// Test 4: 18-20 Rate (£10.00 in 2025/26)
const nmw18to20 = calculateMinimumWage({
  ageBand: '18_to_20',
  payType: 'hourly',
  hourlyRate: 10.20,
  salaryAmount: 20000,
  hoursPerWeek: 37.5,
  isApprentice: false,
  deductionsFromPay: 0,
  deductionFrequency: 'monthly',
  taxYear: '2025_26',
});
assert(nmw18to20.isCompliant === true, '18-20 year old paid £10.20/hr is compliant with £10.00 rate');
assertCloseTo(nmw18to20.applicableMinimumRate, 10.00, 0.001, '18-20 statutory rate is £10.00');

// Test 5: Apprentice Rate (£7.55 in 2025/26)
const nmwApprentice = calculateMinimumWage({
  ageBand: '21_and_over',
  payType: 'hourly',
  hourlyRate: 8.00,
  salaryAmount: 16000,
  hoursPerWeek: 37.5,
  isApprentice: true,
  deductionsFromPay: 0,
  deductionFrequency: 'monthly',
  taxYear: '2025_26',
});
assert(nmwApprentice.isCompliant === true, 'Apprentice paid £8.00/hr is compliant with £7.55 apprentice rate');
assertCloseTo(nmwApprentice.applicableMinimumRate, 7.55, 0.001, 'Apprentice statutory rate is £7.55');

// Test 6: 2024/25 Historical Tax Year check (£11.44 NLW)
const nmw2024_25 = calculateMinimumWage({
  ageBand: '21_and_over',
  payType: 'hourly',
  hourlyRate: 11.50,
  salaryAmount: 22000,
  hoursPerWeek: 37.5,
  isApprentice: false,
  deductionsFromPay: 0,
  deductionFrequency: 'monthly',
  taxYear: '2024_25',
});
assert(nmw2024_25.isCompliant === true, '£11.50/hr was compliant under 2024/25 NLW (£11.44)');
assertCloseTo(nmw2024_25.applicableMinimumRate, 11.44, 0.001, '2024/25 21+ rate is £11.44');

// ----------------------------------------------------
// 14. NMW CALCULATOR (NEW ENGINE WITH ACCOMMODATION OFFSET)
// ----------------------------------------------------
console.log('\n--- 14. NMW / NLW Calculator with Accommodation Offset ---');

// Test 1: £12.21/hr, 21+, 2025/26 -> isCompliant: true, shortfall: £0
const testNmw1 = calculateNmw({
  currentHourlyRate: 12.21,
  ageGroup: 'nlw',
  hoursPerWeek: 37.5,
  taxYear: '2025_26',
  includesAccommodation: false,
  accommodationChargePerDay: 0,
  daysAccommodationPerWeek: 5,
});
assert(testNmw1.isCompliant === true, '£12.21/hr 21+ in 2025/26 is compliant');
assertCloseTo(testNmw1.shortfallPerHour, 0, 0.001, 'Compliant test has £0 shortfall per hour');
assertCloseTo(testNmw1.surplusPerHour, 0, 0.001, 'Exactly on minimum wage has £0 surplus');

// Test 2: £8.00/hr, 21+, 2025/26 -> isCompliant: false, shortfall: £4.21/hr
const testNmw2 = calculateNmw({
  currentHourlyRate: 8.00,
  ageGroup: 'nlw',
  hoursPerWeek: 37.5,
  taxYear: '2025_26',
  includesAccommodation: false,
  accommodationChargePerDay: 0,
  daysAccommodationPerWeek: 5,
});
assert(testNmw2.isCompliant === false, '£8.00/hr 21+ in 2025/26 is underpaid');
assertCloseTo(testNmw2.shortfallPerHour, 4.21, 0.001, 'Shortfall is £4.21/hr');
assertCloseTo(testNmw2.shortfallPerWeek, 4.21 * 37.5, 0.01, 'Weekly shortfall is £157.88 on 37.5h');

// Test 3: Accommodation offset deduction check
// E.g. £13.00/hr pay, accommodation charge £15/day (offset £10.66, excess £4.34/day * 5 days = £21.70 / 37.5h = ~£0.58/hr reduction -> effective £12.42/hr > £12.21)
const testNmwAccom = calculateNmw({
  currentHourlyRate: 13.00,
  ageGroup: 'nlw',
  hoursPerWeek: 37.5,
  taxYear: '2025_26',
  includesAccommodation: true,
  accommodationChargePerDay: 15.00,
  daysAccommodationPerWeek: 5,
});
assert(testNmwAccom.isCompliant === true, '£13/hr with £15/day accommodation charge remains compliant at ~£12.42 effective');
assertCloseTo(testNmwAccom.effectiveRate, 13.00 - ((15.00 - 10.66) * 5) / 37.5, 0.01, 'Effective rate calculated correctly');

// ----------------------------------------------------
// 15. STATUTORY MATERNITY & PATERNITY PAY (SMP / SPP / SAP / ShPP)
// ----------------------------------------------------
console.log('\n--- 15. Statutory Maternity, Paternity & Adoption Pay ---');

// Test 1: Standard SMP 2025/26 on £600/wk
const matTest1 = calculateMaternityPay({
  leaveType: 'maternity',
  grossWeeklySalary: 600,
  taxYear: '2025_26',
  enhancedPayWeeks: 0,
  enhancedPayPercent: 100,
  sharedParentalWeeks: 37,
});
assert(matTest1.isEligible === true, '£600/wk qualifies for SMP in 2025/26');
assertCloseTo(matTest1.higherWeeklyAmount, 540.00, 0.01, 'First 6 weeks SMP is 90% (£540.00/wk)');
assertCloseTo(matTest1.flatWeeklyRate, 187.18, 0.01, 'Flat rate SMP in 2025/26 is £187.18/wk');
// 6 * 540 + 33 * 187.18 = 3240 + 6176.94 = 9416.94
assertCloseTo(matTest1.totalPayAmount, 9416.94, 0.01, 'Total statutory maternity pay is £9,416.94');
assert(matTest1.totalLeaveWeeks === 52, 'Total leave is 52 weeks');
assert(matTest1.unpaidWeeks === 13, 'Unpaid leave is 13 weeks');

// Test 2: Ineligibility check below LEL (< £125/wk)
const matTestIneligible = calculateMaternityPay({
  leaveType: 'maternity',
  grossWeeklySalary: 100,
  taxYear: '2025_26',
  enhancedPayWeeks: 0,
  enhancedPayPercent: 100,
  sharedParentalWeeks: 37,
});
assert(matTestIneligible.isEligible === false, '£100/wk is ineligible for SMP (below £125 LEL)');
assertCloseTo(matTestIneligible.totalPayAmount, 0, 0.001, 'Ineligible pay amount is £0');

// Test 3: Paternity Pay 2025/26
const patTest = calculateMaternityPay({
  leaveType: 'paternity',
  grossWeeklySalary: 600,
  taxYear: '2025_26',
  enhancedPayWeeks: 0,
  enhancedPayPercent: 100,
  sharedParentalWeeks: 37,
});
assert(patTest.isEligible === true, 'Paternity is eligible');
assert(patTest.totalLeaveWeeks === 2, 'Paternity leave is 2 weeks');
assertCloseTo(patTest.totalPayAmount, 187.18 * 2, 0.01, 'Paternity total pay is £374.36 (2 × £187.18)');

// Test 4: Adoption Pay 2025/26
const adoptTest = calculateMaternityPay({
  leaveType: 'adoption',
  grossWeeklySalary: 500,
  taxYear: '2025_26',
  enhancedPayWeeks: 0,
  enhancedPayPercent: 100,
  sharedParentalWeeks: 37,
});
assert(adoptTest.isEligible === true, 'Adoption is eligible');
assertCloseTo(adoptTest.totalPayAmount, 6 * 450 + 33 * 187.18, 0.01, 'Adoption total pay is £8,876.94');

// Test 5: Shared Parental Pay 2025/26 (20 weeks)
const shpTest = calculateMaternityPay({
  leaveType: 'shared_parental',
  grossWeeklySalary: 700,
  taxYear: '2025_26',
  enhancedPayWeeks: 0,
  enhancedPayPercent: 100,
  sharedParentalWeeks: 20,
});
assert(shpTest.isEligible === true, 'Shared parental is eligible');
assertCloseTo(shpTest.totalPayAmount, 20 * 187.18, 0.01, 'ShPP for 20 weeks is £3,743.60');

// Test 6: Enhanced Maternity Pay (12 weeks full pay @ £600/wk + 27 weeks flat SMP @ £187.18)
const enhTest = calculateMaternityPay({
  leaveType: 'maternity',
  grossWeeklySalary: 600,
  taxYear: '2025_26',
  enhancedPayWeeks: 12,
  enhancedPayPercent: 100,
  sharedParentalWeeks: 37,
});
// 12 * 600 + 27 * 187.18 = 7200 + 5053.86 = 12253.86
assertCloseTo(enhTest.totalPayAmount, 12253.86, 0.01, 'Enhanced pay produces £12,253.86');

// ----------------------------------------------------
// 16. CHILD BENEFIT & HIGH INCOME CHILD BENEFIT CHARGE (HICBC)
// ----------------------------------------------------
console.log('\n--- 16. Child Benefit & High Income Child Benefit Charge (HICBC) ---');

// Test 1: 2 children, £55,000 income (under £60k threshold) in 2025/26
const cbTest1 = calculateChildBenefit({
  numberOfChildren: 2,
  higherEarnerIncome: 55000,
  taxYear: '2025_26',
  claimingBenefit: true,
});
assert(cbTest1.isAboveThreshold === false, '£55,000 is below £60,000 HICBC threshold');
assertCloseTo(cbTest1.totalWeeklyBenefit, 43.30, 0.01, '2 children weekly benefit is £43.30 (26.05 + 17.25)');
assertCloseTo(cbTest1.totalAnnualBenefit, 2251.60, 0.01, '2 children annual benefit is £2,251.60 (52 × 43.30)');
assertCloseTo(cbTest1.hicbcAnnual, 0, 0.01, 'HICBC charge is £0 below threshold');
assertCloseTo(cbTest1.netAnnualBenefit, 2251.60, 0.01, 'Net annual benefit is full £2,251.60');
assert(cbTest1.recommendation === 'claim_full', 'Recommendation is claim_full');

// Test 2: 2 children, £70,000 income (50% taper) in 2025/26
const cbTest2 = calculateChildBenefit({
  numberOfChildren: 2,
  higherEarnerIncome: 70000,
  taxYear: '2025_26',
  claimingBenefit: true,
});
assert(cbTest2.isAboveThreshold === true, '£70,000 is above £60,000 threshold');
assert(cbTest2.isAboveTaperEnd === false, '£70,000 is below £80,000 taper end');
assertCloseTo(cbTest2.chargePercent, 50, 0.01, 'Charge percentage is exactly 50% at £70,000');
assertCloseTo(cbTest2.hicbcAnnual, 1125.80, 0.01, 'HICBC charge is 50% (£1,125.80)');
assertCloseTo(cbTest2.netAnnualBenefit, 1125.80, 0.01, 'Net annual benefit is 50% (£1,125.80)');
assert(cbTest2.recommendation === 'opt_out_consider', 'Recommendation is opt_out_consider at 50% charge');

// Test 3: 2 children, £90,000 income (above £80k taper end) in 2025/26
const cbTest3 = calculateChildBenefit({
  numberOfChildren: 2,
  higherEarnerIncome: 90000,
  taxYear: '2025_26',
  claimingBenefit: true,
});
assert(cbTest3.isAboveTaperEnd === true, '£90,000 is above £80,000 taper end');
assertCloseTo(cbTest3.chargePercent, 100, 0.01, 'Charge percentage is 100%');
assertCloseTo(cbTest3.hicbcAnnual, 2251.60, 0.01, 'Full £2,251.60 is charged back');
assertCloseTo(cbTest3.netAnnualBenefit, 0, 0.01, 'Net benefit is £0');
assert(cbTest3.recommendation === 'opt_out', 'Recommendation is opt_out');

// Test 4: 1 child, £65,000 income (25% taper) in 2025/26
const cbTest4 = calculateChildBenefit({
  numberOfChildren: 1,
  higherEarnerIncome: 65000,
  taxYear: '2025_26',
  claimingBenefit: true,
});
assertCloseTo(cbTest4.totalWeeklyBenefit, 26.05, 0.01, '1 child weekly benefit is £26.05');
assertCloseTo(cbTest4.totalAnnualBenefit, 1354.60, 0.01, '1 child annual benefit is £1,354.60 (52 × 26.05)');
assertCloseTo(cbTest4.chargePercent, 25, 0.01, 'Charge percentage is 25% at £65k');
assertCloseTo(cbTest4.hicbcAnnual, 338.65, 0.01, 'HICBC charge is £338.65');
assertCloseTo(cbTest4.netAnnualBenefit, 1015.95, 0.01, 'Net annual benefit is £1,015.95');
assert(cbTest4.recommendation === 'claim_aware', 'Recommendation is claim_aware below 50% charge');

// Test 5: 0 children edge case
const cbTest0 = calculateChildBenefit({
  numberOfChildren: 0,
  higherEarnerIncome: 50000,
  taxYear: '2025_26',
  claimingBenefit: true,
});
assertCloseTo(cbTest0.totalAnnualBenefit, 0, 0.01, '0 children yields £0 benefit');
assertCloseTo(cbTest0.hicbcAnnual, 0, 0.01, '0 children yields £0 HICBC');

// ----------------------------------------------------
// 17. Statutory Sick Pay (SSP) & Waiting Days
// ----------------------------------------------------
console.log('\n--- 17. Statutory Sick Pay (SSP) & Waiting Days ---');

// Standard 8 days off on 5-day week
const sspTest1 = calculateSickPay({
  averageWeeklyEarnings: 550,
  qualifyingDaysOff: 8,
  qualifyingDaysPerWeek: 5,
  isLinkedPeriod: false,
  taxYear: '2025_26',
});
assert(sspTest1.isEligible, '£550 AWE is eligible for SSP in 2025/26 (above £125 LEL)');
assertCloseTo(sspTest1.weeklySspRate, 116.75, 0.01, '2025/26 SSP weekly rate is £116.75');
assertCloseTo(sspTest1.dailySspRate, 23.35, 0.01, 'Daily SSP rate for 5-day worker is £23.35');
assert(sspTest1.waitingDays === 3, 'Standard sickness has 3 unpaid waiting days');
assert(sspTest1.payableDays === 5, '8 qualifying days - 3 waiting days = 5 payable days');
assertCloseTo(sspTest1.totalSspAmount, 116.75, 0.01, '5 payable days × £23.35 = £116.75');

// Linked sickness within 8 weeks (0 waiting days)
const sspTestLinked = calculateSickPay({
  averageWeeklyEarnings: 550,
  qualifyingDaysOff: 8,
  qualifyingDaysPerWeek: 5,
  isLinkedPeriod: true,
  taxYear: '2025_26',
});
assert(sspTestLinked.isEligible, 'Linked sickness is eligible');
assert(sspTestLinked.waitingDays === 0, 'Linked sickness has 0 waiting days');
assert(sspTestLinked.payableDays === 8, '8 qualifying days off yields 8 payable days');
assertCloseTo(sspTestLinked.totalSspAmount, 186.80, 0.01, '8 days × £23.35 = £186.80');

// Low earner below LEL (£100 < £125)
const sspTestLow = calculateSickPay({
  averageWeeklyEarnings: 100,
  qualifyingDaysOff: 10,
  qualifyingDaysPerWeek: 5,
  isLinkedPeriod: false,
  taxYear: '2025_26',
});
assert(!sspTestLow.isEligible, '£100 AWE is ineligible for SSP (below £125 LEL)');
assertCloseTo(sspTestLow.totalSspAmount, 0, 0.01, 'Ineligible earner receives £0 SSP');
assert(Boolean(sspTestLow.ineligibilityReason), 'Ineligibility reason explains LEL shortfall');

// Occupational sick pay comparison
const sspTestOccupational = calculateSickPay({
  averageWeeklyEarnings: 600,
  qualifyingDaysOff: 10,
  qualifyingDaysPerWeek: 5,
  isLinkedPeriod: false,
  occupationalWeeklyPay: 600,
  taxYear: '2025_26',
});
assert(sspTestOccupational.isOccupationalHigher, 'Contractual company pay is identified as higher than SSP');
assertCloseTo(sspTestOccupational.totalOccupationalAmount, 1200.00, 0.01, '10 days at full £600/wk = £1,200');
assertCloseTo(sspTestOccupational.recommendedPayAmount, 1200.00, 0.01, 'Recommended pay reflects employer scheme');

// 28-week cap
const sspTest28Weeks = calculateSickPay({
  averageWeeklyEarnings: 550,
  qualifyingDaysOff: 160,
  qualifyingDaysPerWeek: 5,
  isLinkedPeriod: false,
  taxYear: '2025_26',
});
assert(sspTest28Weeks.isMaxWeeksExceeded, 'Exceeding 28 weeks triggers max weeks flag');
assert(sspTest28Weeks.payableDays === 140, 'Payable days capped at 140 days (28 × 5)');
assertCloseTo(sspTest28Weeks.totalSspAmount, 3269.00, 0.01, 'Total capped SSP is £3,269.00 (28 × £116.75)');

// ----------------------------------------------------
// 21. MARRIAGE ALLOWANCE CALCULATOR TESTS
// ----------------------------------------------------
console.log('\n--- 21. UK Marriage Allowance Calculations ---');

// Test 1: Standard eligible couple (Non-earner £0 & £35k earner in England)
const maStandard = calculateMarriageAllowance({
  lowerEarnerIncome: 0,
  higherEarnerIncome: 35000,
  lowerEarnerRegion: 'england_ni',
  higherEarnerRegion: 'england_ni',
  taxYear: '2025_26',
});
assert(maStandard.isEligible, 'Standard couple (£0 & £35k) is eligible for Marriage Allowance');
assertCloseTo(maStandard.transferAmount, 1260.00, 0.01, 'Transfer amount is £1,260.00');
assertCloseTo(maStandard.higherEarnerTaxSaving, 252.00, 0.01, 'Higher earner saves £252.00 in tax (20% on £1,260)');
assertCloseTo(maStandard.lowerEarnerExtraTax, 0.00, 0.01, 'Lower earner pays £0 extra tax');
assertCloseTo(maStandard.netHouseholdSaving, 252.00, 0.01, 'Net household saving is £252.00/year');
assertCloseTo(maStandard.backdated4YearsSavingEstimate, 1260.00, 0.01, '5-year total saving estimate is £1,260.00 (5 × £252)');
assert(maStandard.lowerEarner.taxCodeAfter === '1257N', 'Lower earner tax code after transfer is 1257N');
assert(maStandard.higherEarner.taxCodeAfter === '1257M', 'Higher earner tax code after transfer is 1257M');

// Test 2: Part-time earner (£12,000) & £30,000 earner
// Lower earner allowance goes from £12,570 to £11,310.
// Lower earner taxable pay = £12,000 - £11,310 = £690. Tax at 20% = £138.00.
// Higher earner tax saving = £252.00.
// Net household saving = £252.00 - £138.00 = £114.00.
const maPartTime = calculateMarriageAllowance({
  lowerEarnerIncome: 12000,
  higherEarnerIncome: 30000,
  lowerEarnerRegion: 'england_ni',
  higherEarnerRegion: 'england_ni',
  taxYear: '2025_26',
});
assert(maPartTime.isEligible, 'Couple with £12k and £30k is eligible with net positive saving');
assertCloseTo(maPartTime.lowerEarnerExtraTax, 138.00, 0.01, 'Lower earner pays £138.00 extra tax on £690 exceeding £11,310');
assertCloseTo(maPartTime.higherEarnerTaxSaving, 252.00, 0.01, 'Higher earner saves £252.00');
assertCloseTo(maPartTime.netHouseholdSaving, 114.00, 0.01, 'Net household saving is £114.00 (£252 - £138)');

// Test 3: Ineligible - Higher earner is higher-rate taxpayer (£60,000 in England)
const maHigherRate = calculateMarriageAllowance({
  lowerEarnerIncome: 5000,
  higherEarnerIncome: 60000,
  lowerEarnerRegion: 'england_ni',
  higherEarnerRegion: 'england_ni',
  taxYear: '2025_26',
});
assert(!maHigherRate.isEligible, 'Couple where recipient earns £60k (higher rate) is ineligible');
assert(Boolean(maHigherRate.ineligibilityReason), 'Ineligibility reason explains higher rate threshold restriction');

// Test 4: Ineligible - Lower earner earns above Personal Allowance (£15,000)
const maLowerTooHigh = calculateMarriageAllowance({
  lowerEarnerIncome: 15000,
  higherEarnerIncome: 30000,
  taxYear: '2025_26',
});
assert(!maLowerTooHigh.isEligible, 'Couple where lower earner earns > £12,570 is ineligible');

// Test 5: Scottish couple (£0 and £35,000)
const maScot = calculateMarriageAllowance({
  lowerEarnerIncome: 0,
  higherEarnerIncome: 35000,
  lowerEarnerRegion: 'scotland',
  higherEarnerRegion: 'scotland',
  taxYear: '2025_26',
});
assert(maScot.isEligible, 'Scottish couple (£0 & £35k) is eligible');
assert(maScot.lowerEarner.taxCodeAfter === 'S1257N', 'Scottish lower earner tax code is S1257N');
assert(maScot.higherEarner.taxCodeAfter === 'S1257M', 'Scottish higher earner tax code is S1257M');
assertCloseTo(maScot.higherEarnerTaxSaving, 264.60, 0.01, 'Scottish higher earner in intermediate 21% band saves £264.60 (21% on £1,260)');

// ----------------------------------------------------
// TEST GROUP 17: SECOND JOB TAX CALCULATOR
// ----------------------------------------------------
console.log('\n--- 17. Second Job Tax Calculations (2025/26) ---');

const sjRes = calculateSecondJobTax({
  mainJobSalary: 30000,
  secondJobSalary: 15000,
  personalAllowanceAppliedToMain: true,
  region: 'england_ni',
  taxYear: '2025_26',
});

assertCloseTo(sjRes.combined.totalGrossSalary, 45000, 0.01, 'Second job total gross is £45,000');
assert(sjRes.secondJob.suggestedTaxCode === 'BR', 'Second job correctly assigned BR code');
assertCloseTo(sjRes.secondJob.incomeTax, 3000.00, 0.01, 'Second job £15,000 with 20% BR tax pays £3,000 Income Tax');
assertCloseTo(sjRes.combined.totalTakeHomePay, sjRes.mainJob.takeHomePay + sjRes.secondJob.takeHomePay, 0.01, 'Combined net matches sum of individual job net pays');

// ----------------------------------------------------
// TEST GROUP 18: SALARY COMPARISON MATRIX
// ----------------------------------------------------
console.log('\n--- 18. Salary Comparison Matrix Engine ---');

const compRes = calculateSalaryComparison({
  scenarios: [
    { id: 'base', label: 'Current Role', grossSalary: 40000, pensionPercentage: 5, studentLoanPlan: 'none' },
    { id: 'offer1', label: 'New Offer', grossSalary: 50000, pensionPercentage: 5, studentLoanPlan: 'none' },
    { id: 'offer2', label: 'Senior Offer', grossSalary: 65000, pensionPercentage: 5, studentLoanPlan: 'none' },
  ],
  taxYear: '2025_26',
  region: 'england_ni',
  pensionType: 'net_pay',
});

assert(compRes.items.length === 3, 'Comparison matrix contains 3 items');
assert(compRes.items[0].diffGrossFromBaseline === 0, 'Baseline gross diff is 0');
assert(compRes.items[1].diffGrossFromBaseline === 10000, 'Offer 1 gross diff is £10,000');
assert(compRes.items[1].diffAnnualFromBaseline > 0, 'Offer 1 net take-home is strictly greater than baseline');
assert(compRes.items[1].retentionRateFromBaseline > 0 && compRes.items[1].retentionRateFromBaseline <= 100, 'Retention rate is between 0% and 100%');

// ----------------------------------------------------
// TEST GROUP 19: PAY FREQUENCY CONVERTER
// ----------------------------------------------------
console.log('\n--- 19. Pay Frequency Converter ---');

const freqItems = calculatePayFrequencies(52000, 'england_ni', '2025_26', 5, 'none');
assert(freqItems.length === 7, 'Generates all 7 standard UK pay frequencies');
const annualFreq = freqItems.find((f) => f.frequency === 'annual')!;
const weeklyFreq = freqItems.find((f) => f.frequency === 'weekly')!;
assertCloseTo(annualFreq.gross, 52000, 0.01, 'Annual gross matches £52,000');
assertCloseTo(weeklyFreq.gross, 1000, 0.01, 'Weekly gross matches £1,000 (52000 / 52)');
assertCloseTo(weeklyFreq.net * 52, annualFreq.net, 1.0, 'Weekly net annualized closely equals annual net');

// ----------------------------------------------------
// TEST GROUP 20: STAMP DUTY LAND TAX (SDLT)
// ----------------------------------------------------
console.log('\n--- 20. Stamp Duty Land Tax (SDLT 2025/26) ---');

// Standard purchase on £295,000 property:
// 0% up to £125,000 = £0
// 2% on £125,000-£250,000 (£125,000) = £2,500
// 5% on £250,000-£295,000 (£45,000) = £2,250
// Total = £4,750
const sdltStandard = calculateStampDuty({
  propertyPrice: 295000,
  buyerType: 'standard',
  taxYearKey: '2025_26',
});
assertCloseTo(sdltStandard.totalStampDuty, 4750.00, 0.01, 'Standard home mover £295,000 property pays £4,750 SDLT');
assertCloseTo(sdltStandard.effectiveRate, 1.61, 0.05, 'Standard £295,000 effective SDLT rate is ~1.61%');

// First-time buyer on £300,000 property:
// 0% up to £300,000 = £0
const sdltFtb = calculateStampDuty({
  propertyPrice: 300000,
  buyerType: 'first_time_buyer',
  taxYearKey: '2025_26',
});
assertCloseTo(sdltFtb.totalStampDuty, 0.00, 0.01, 'First-time buyer on £300,000 property pays £0 SDLT');
assert(sdltFtb.ftbReliefApplied === true, 'First-time buyer relief is marked as applied');

// First-time buyer on £400,000 property:
// 0% up to £300,000 = £0
// 5% on £300,000 to £400,000 (£100,000) = £5,000
const sdltFtb400 = calculateStampDuty({
  propertyPrice: 400000,
  buyerType: 'first_time_buyer',
  taxYearKey: '2025_26',
});
assertCloseTo(sdltFtb400.totalStampDuty, 5000.00, 0.01, 'First-time buyer on £400,000 property pays £5,000 SDLT');

// Additional property (5% surcharge in Autumn Budget 2024 / 2025-26) on £200,000:
// 5% on 0 to £125,000 = £6,250
// 7% on £125,000 to £200,000 (£75,000) = £5,250
// Total = £11,500
const sdltAdditional = calculateStampDuty({
  propertyPrice: 200000,
  buyerType: 'additional_property',
  taxYearKey: '2025_26',
});
assertCloseTo(sdltAdditional.totalStampDuty, 11500.00, 0.01, 'Additional property on £200,000 with 5% surcharge pays £11,500 SDLT');
assertCloseTo(sdltAdditional.surchargeAmount, 10000.00, 0.01, 'Additional property surcharge component is £10,000 (5% of £200k)');

// ----------------------------------------------------
// TEST SUMMARY
// ----------------------------------------------------
console.log('\n======================================================');
console.log(`TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('All tax calculation tests PASSED successfully with 100% precision.\n');
}
