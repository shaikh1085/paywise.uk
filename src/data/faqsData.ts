import { FaqItem } from '../types';

export const FAQ_PAGE_GROUPS: { category: string; title: string; items: FaqItem[] }[] = [
  {
    category: 'takehome',
    title: 'Take-home pay',
    items: [
      {
        question: 'How is take-home pay calculated in the UK?',
        answer: 'UK take-home pay equals your gross salary minus Income Tax, employee Class 1 National Insurance, employee pension contributions, student loan deductions, and optional salary sacrifice benefits. Personal allowances (£12,570 for most taxpayers) ensure your first slice of earnings is tax-free.',
      },
      {
        question: 'What is the standard UK tax code 1257L?',
        answer: 'The tax code 1257L signifies that you are entitled to the standard tax-free Personal Allowance of £12,570 per year. The letter L indicates you are entitled to standard tax-free pay with no special emergency or transferred marriage allowances.',
      },
      {
        question: 'Why is my take-home pay different each month?',
        answer: 'Variations in monthly take-home pay can occur due to cumulative PAYE tax adjustments, bonus payments, overtime hours, changes in taxable benefits in kind, or student loan thresholds being crossed in a specific pay period.',
      },
      {
        question: 'What is the difference between gross pay and net pay?',
        answer: 'Gross pay is your total contractual earnings before any deductions. Net pay (take-home pay) is the final amount deposited into your bank account after Income Tax, National Insurance, pension contributions, and student loans have been deducted.',
      },
    ],
  },
  {
    category: 'tax_ni',
    title: 'Income Tax and National Insurance',
    items: [
      {
        question: 'Does this calculator include the latest National Insurance rates?',
        answer: 'Yes. The calculation applies the current Class 1 employee National Insurance rate of 8% for earnings between the Primary Threshold (£12,570) and Upper Earnings Limit (£50,270), and 2% on earnings above £50,270.',
      },
      {
        question: 'How does the £100k tax trap work in the UK?',
        answer: 'For adjusted net income exceeding £100,000, your £12,570 Personal Allowance reduces by £1 for every £2 of income above £100,000, disappearing completely at £125,140. This creates an effective 60% marginal tax rate on earnings between £100k and £125,140 (plus 2% National Insurance).',
      },
      {
        question: 'Does Scotland have different income tax bands?',
        answer: 'Yes. The Scottish Parliament sets devolved income tax rates and bands. Scotland currently operates six bands: Starter (19%), Basic (20%), Intermediate (21%), Higher (42%), Advanced (45%), and Top (48%). National Insurance rates remain uniform across the UK.',
      },
      {
        question: 'Are bonuses and overtime taxed at a higher rate?',
        answer: 'No, bonuses and overtime are added to your regular taxable income and taxed according to your cumulative marginal band. If a bonus pushes part of your total annual earnings into the 40% band, only the portion above £50,270 is taxed at 40%.',
      },
    ],
  },
  {
    category: 'pension_sacrifice',
    title: 'Pension and salary sacrifice',
    items: [
      {
        question: 'Does a pension contribution reduce taxable income in the UK?',
        answer: 'Yes. Pension contributions made via net pay arrangement, salary sacrifice, or relief at source receive tax relief at your highest marginal income tax rate (20%, 40%, or 45% in England/Wales/NI, or up to 48% in Scotland). Salary sacrifice also eliminates employee National Insurance on the contributed sum.',
      },
      {
        question: 'What is the difference between salary sacrifice and a standard pension contribution?',
        answer: 'With standard pension contributions (Net Pay or Relief at Source), you save Income Tax but still pay National Insurance on the pension sum. With Salary Sacrifice, your contractual gross salary is reduced, eliminating both Income Tax and Employee National Insurance (and reducing Employer NI).',
      },
      {
        question: 'What is the UK pension annual allowance?',
        answer: 'The standard annual allowance is £60,000 per tax year (or 100% of your relevant UK earnings, whichever is lower). Unused allowance from the previous three tax years can be carried forward.',
      },
      {
        question: 'Can salary sacrifice help avoid the £100k tax trap or Child Benefit charge?',
        answer: 'Yes. Salary sacrifice reduces your Adjusted Net Income. If you earn £110,000, sacrificing £10,000 into your pension restores your full £12,570 Personal Allowance and prevents the 60% effective tax rate.',
      },
    ],
  },
  {
    category: 'student_loans',
    title: 'Student loans',
    items: [
      {
        question: 'Which student loan repayment plan do I have?',
        answer: 'In the UK: Plan 1 applies to courses starting 1998–2011 (England/Wales) or anytime in Northern Ireland; Plan 2 applies to courses between Sept 2012 and July 2023 (England/Wales); Plan 4 applies to Scottish students funded by SAAS; Plan 5 applies to new undergraduate courses starting on or after 1 August 2023 in England; and Postgraduate loans apply to Master’s and PhD loans.',
      },
      {
        question: 'Is student loan repayment calculated on gross or net pay?',
        answer: 'Student loan repayments are calculated on your gross earnings before Income Tax and National Insurance, but after salary sacrifice deductions.',
      },
      {
        question: 'Can you have both an undergraduate and postgraduate loan?',
        answer: 'Yes. If you have both, deductions are calculated concurrently: 9% on income above your undergraduate threshold, plus 6% on income above £21,000 for your postgraduate loan (a combined 15% deduction on earnings above both thresholds).',
      },
      {
        question: 'When do UK student loan repayments get written off?',
        answer: 'Plan 1 loans are written off at age 65 (or after 25 years depending on start year). Plan 2 loans are written off 30 years after you become eligible to repay. Plan 5 loans are written off after 40 years. Postgraduate loans are written off after 30 years.',
      },
    ],
  },
  {
    category: 'contractors',
    title: 'Contractors and day rates',
    items: [
      {
        question: 'How do I convert a contractor day rate to an equivalent permanent salary?',
        answer: 'Multiply your daily rate by your expected billable days (typically 220 to 230 days after subtracting 25–33 days of holidays, bank holidays, training, and bench time). Then deduct business insurance, pension contributions, and accountancy fees to find the equivalent permanent salary.',
      },
      {
        question: 'What does inside IR35 mean for contractors?',
        answer: 'An inside IR35 determination means HMRC regards you as a deemed employee for tax purposes for that specific contract. As a result, Income Tax and Employee National Insurance are deducted at source via PAYE, and Employer NI and Apprenticeship Levy are accounted for from the contract rate.',
      },
      {
        question: 'How does an umbrella company pay contractors in the UK?',
        answer: 'The recruitment agency or end client pays the umbrella company your agreed contract assignment rate. The umbrella company deducts their weekly margin fee, Employer NI, Apprenticeship Levy, and employer pension, then processes the remaining amount through PAYE for Income Tax and Employee NI, paying you the net amount.',
      },
      {
        question: 'What expenses can a contractor deduct from gross income?',
        answer: 'Outside IR35 contractors trading via a limited company can deduct legitimate business expenses like professional indemnity insurance, travel, home office costs, equipment, and accountancy fees before corporation tax.',
      },
    ],
  },
  {
    category: 'accuracy',
    title: 'Calculator accuracy and assumptions',
    items: [
      {
        question: 'Is this UK salary calculator accurate?',
        answer: 'PayWise UK calculations reflect published HMRC tax rules, Scottish tax rates, student loan thresholds, and statutory payroll formulas. However, actual payslips may differ based on specific tax codes (e.g. cumulative PAYE codes, benefits in kind like company cars/health insurance, and exact payroll software rounding). Figures are estimates and not financial advice.',
      },
      {
        question: 'Does the calculator support Scottish and Welsh tax rates?',
        answer: 'Yes. You can select Scotland or England/Wales/Northern Ireland to calculate exact devolved income tax bandings and rates for your region.',
      },
      {
        question: 'How often are tax rates and thresholds updated?',
        answer: 'Our calculation engine is updated immediately following UK Autumn Budgets, Spring Statements, and official HMRC statutory updates for the 2025/26 tax year.',
      },
      {
        question: 'Are my personal financial details stored or transmitted?',
        answer: 'No. All salary calculations take place entirely in your web browser. No salary figures, tax codes, or financial information are stored on our servers or shared with third parties.',
      },
    ],
  },
];


export const HOME_FAQS: FaqItem[] = [
  {
    question: 'How is take-home pay calculated in the UK?',
    answer: 'UK take-home pay equals your gross salary minus Income Tax, employee Class 1 National Insurance, employee pension contributions, student loan deductions, and optional salary sacrifice benefits. Personal allowances (£12,570 for most taxpayers) ensure your first slice of earnings is tax-free.',
  },
  {
    question: 'Does this calculator include the latest National Insurance rates?',
    answer: 'Yes. The calculation applies the current Class 1 employee National Insurance rate of 8% for earnings between the Primary Threshold (£12,570) and Upper Earnings Limit (£50,270), and 2% on earnings above £50,270.',
  },
  {
    question: 'Does a pension contribution reduce taxable income in the UK?',
    answer: 'Yes. Pension contributions made via net pay arrangement, salary sacrifice, or relief at source receive tax relief at your highest marginal income tax rate (20%, 40%, or 45% in England/Wales/NI, or up to 48% in Scotland). Salary sacrifice also eliminates employee National Insurance on the contributed sum.',
  },
  {
    question: 'Which student loan repayment plan do I have?',
    answer: 'In the UK: Plan 1 applies to courses starting 1998–2011 (England/Wales) or anytime in Northern Ireland; Plan 2 applies to courses between Sept 2012 and July 2023 (England/Wales); Plan 4 applies to Scottish students funded by SAAS; Plan 5 applies to new undergraduate courses starting on or after 1 August 2023 in England; and Postgraduate loans apply to Master’s and PhD loans.',
  },
  {
    question: 'Why is my take-home pay lower after a pay rise?',
    answer: 'In the UK tax system, moving into a higher tax band only taxes the portion of income above the threshold at the higher rate; it does not reduce your total take-home pay. However, between £100,000 and £125,140, your personal allowance tapers by £1 for every £2 earned, creating an effective 60% marginal income tax rate (62% including NI). Crossing child benefit thresholds (£60,000–£80,000) also triggers the High Income Child Benefit Charge.',
  },
  {
    question: 'What is the difference between salary sacrifice and a standard pension contribution?',
    answer: 'With standard pension contributions (Net Pay or Relief at Source), you save Income Tax but still pay National Insurance on the pension sum. With Salary Sacrifice, your contractual gross salary is reduced, eliminating both Income Tax and Employee National Insurance (and reducing Employer NI).',
  },
  {
    question: 'Does Scotland have different income tax bands?',
    answer: 'Yes. The Scottish Parliament sets devolved income tax rates and bands. Scotland currently operates six bands: Starter (19%), Basic (20%), Intermediate (21%), Higher (42%), Advanced (45%), and Top (48%). National Insurance rates remain uniform across the UK.',
  },
  {
    question: 'Is this UK salary calculator accurate?',
    answer: 'PayWise UK calculations reflect published HMRC tax rules, Scottish tax rates, student loan thresholds, and statutory payroll formulas. However, actual payslips may differ based on specific tax codes (e.g. cumulative PAYE codes, benefits in kind like company cars/health insurance, and exact payroll software rounding). Figures are estimates and not financial advice.',
  },
];

export const TAKE_HOME_FAQS: FaqItem[] = [
  {
    question: 'What is the standard UK tax code 1257L?',
    answer: 'The tax code 1257L signifies that you are entitled to the standard tax-free Personal Allowance of £12,570 per year. The letter L indicates you are entitled to standard tax-free pay with no special emergency or transferred marriage allowances.',
  },
  {
    question: 'How does the £100k tax trap work in the UK?',
    answer: 'For adjusted net income exceeding £100,000, your £12,570 Personal Allowance reduces by £1 for every £2 of income above £100,000, disappearing completely at £125,140. This creates an effective 60% marginal tax rate on earnings between £100k and £125,140 (plus 2% National Insurance).',
  },
  {
    question: 'What is the difference between effective tax rate and marginal tax rate?',
    answer: 'Your effective tax rate is total tax and National Insurance paid divided by total gross salary. Your marginal tax rate is the percentage deducted from the very next £1 you earn (e.g., 20% tax + 8% NI = 28% marginal rate for basic rate taxpayers).',
  },
  {
    question: 'Are bonuses and overtime taxed at a higher rate?',
    answer: 'No, bonuses and overtime are added to your regular taxable income and taxed according to your cumulative marginal band. If a bonus pushes part of your total annual earnings into the 40% band, only the portion above £50,270 is taxed at 40%.',
  },
  {
    question: 'Does employer pension contribution affect my take-home pay?',
    answer: 'No. Employer pension contributions are paid on top of your gross salary by your employer directly into your pension scheme and do not reduce your take-home pay.',
  },
  {
    question: 'How are student loans deducted through PAYE?',
    answer: 'Student loan deductions are taken directly from your gross income above your plan’s annual threshold at a rate of 9% (or 6% for postgraduate loans). These deductions appear automatically on your monthly payslip.',
  },
  {
    question: 'How does tax relief at source work for personal pensions or SIPPs?',
    answer: 'When you contribute to a relief-at-source scheme, the pension provider automatically claims basic-rate tax relief (20%) from HMRC. If you pay 40% or 45% tax, you claim the extra relief via your self-assessment tax return or PAYE code adjustment.',
  },
  {
    question: 'Are dividend income and capital gains included in PAYE take-home calculations?',
    answer: 'No, PAYE salary calculators only process employment earnings subject to PAYE. Dividend income and capital gains are reported separately on an annual Self Assessment tax return.',
  },
];

export const DAY_RATE_FAQS: FaqItem[] = [
  {
    question: 'How do I convert a contractor day rate to an equivalent permanent salary?',
    answer: 'Multiply your daily rate by your expected billable days (typically 220 to 230 days after subtracting 25–33 days of holidays, bank holidays, training, and bench time). Then deduct business insurance, pension contributions, and accountancy fees to find the equivalent permanent salary.',
  },
  {
    question: 'How many working days are in a UK contractor year?',
    answer: 'A standard calendar year contains 260 weekdays (52 weeks x 5 days). After deducting 8 UK bank holidays and 25 days of annual leave/sick/bench allowance, full-time contractors typically bill between 220 and 230 days per year.',
  },
  {
    question: 'What expenses can a contractor deduct from gross income?',
    answer: 'Outside IR35 contractors trading via a limited company can deduct legitimate business expenses like professional indemnity insurance, travel, home office costs, equipment, and accountancy fees before corporation tax.',
  },
  {
    question: 'Is it better to contract inside or outside IR35?',
    answer: 'Outside IR35 contracts allow you to operate via your own limited company, taking salary and dividends with greater tax efficiency. Inside IR35 contracts treat you as an employee for tax purposes, subjecting income to PAYE and employer NI.',
  },
  {
    question: 'Do contractors get paid for bank holidays and holiday leave?',
    answer: 'Independent contractors do not receive paid holiday or sick leave unless employed via an umbrella company that has factored statutory holiday pay (12.07%) into the contract rate agreement.',
  },
  {
    question: 'How should contractors budget for corporation tax and VAT?',
    answer: 'Limited company contractors should set aside 19% to 25% of net company profits for Corporation Tax, and maintain separate funds for quarterly VAT liabilities (standard 20% or Flat Rate Scheme).',
  },
];

export const HOURLY_FAQS: FaqItem[] = [
  {
    question: 'How do I calculate annual salary from an hourly wage in the UK?',
    answer: 'Multiply your hourly rate by the number of contracted hours per week, then multiply by 52 (the number of weeks in a year). For example, £18/hour x 37.5 hours/week x 52 weeks = £35,100 gross annual salary.',
  },
  {
    question: 'What is the UK National Minimum Wage and National Living Wage?',
    answer: 'The National Living Wage applies to workers aged 21 and over (currently £11.44 per hour). Separate lower statutory rates apply to 18–20 year olds, under 18s, and apprentices.',
  },
  {
    question: 'How does working overtime affect hourly net pay?',
    answer: 'Overtime hours paid at enhanced multipliers (e.g. 1.5x time-and-a-half or 2.0x double time) increase your gross earnings. However, extra income is taxed at your current marginal rate (20% or 40% income tax plus 8% or 2% NI).',
  },
  {
    question: 'Are hourly employees entitled to paid holiday in the UK?',
    answer: 'Yes. Almost all UK workers are legally entitled to 5.6 weeks of paid annual leave per year (28 days for someone working 5 days a week, pro-rata for part-time workers).',
  },
  {
    question: 'Do hourly paid workers pay National Insurance weekly or monthly?',
    answer: 'National Insurance is calculated based on your specific earnings period (each week if paid weekly, or each calendar month if paid monthly). Unlike Income Tax, Class 1 NI is non-cumulative.',
  },
  {
    question: 'How do zero-hours contracts calculate holiday pay?',
    answer: 'Under UK holiday pay guidance, irregular-hours and zero-hours workers accrue statutory holiday entitlement at the rate of 12.07% of the actual hours worked in each pay period.',
  },
];

export const PENSION_FAQS: FaqItem[] = [
  {
    question: 'What is the 4% safe withdrawal rule for UK pensions?',
    answer: 'The 4% rule is a widely cited retirement guideline suggesting you can safely withdraw 4% of your total pension pot during the first year of retirement, and adjust for inflation thereafter, with a high probability the pot lasts 30 years.',
  },
  {
    question: 'What is the UK pension annual allowance?',
    answer: 'The standard annual allowance is £60,000 per tax year (or 100% of your relevant UK earnings, whichever is lower). Unused allowance from the previous three tax years can be carried forward.',
  },
  {
    question: 'What is the difference between defined contribution and defined benefit pensions?',
    answer: 'In a Defined Contribution (DC) pension, your retirement pot depends on contributions paid in and investment performance. In a Defined Benefit (DB) pension (such as the NHS or Teachers’ Pension Scheme), your retirement income is guaranteed based on your salary and length of service.',
  },
  {
    question: 'At what age can I access my UK private pension?',
    answer: 'The Normal Minimum Pension Age is currently 55, rising to age 57 from 6 April 2028.',
  },
  {
    question: 'Can I take 25% of my pension tax-free in the UK?',
    answer: 'Yes. Under UK pension rules, you can usually withdraw up to 25% of your pension pot as a tax-free lump sum (capped at the Lump Sum Allowance of £268,275), while the remaining 75% is taxed as income.',
  },
  {
    question: 'What happens to my pension pot if I pass away before retirement?',
    answer: 'In most defined contribution schemes, your pension pot can be passed on to your nominated beneficiaries free of Inheritance Tax. If you die before age 75, withdrawals are generally completely tax-free for beneficiaries.',
  },
];

export const STUDENT_LOAN_FAQS: FaqItem[] = [
  {
    question: 'When do UK student loan repayments get written off?',
    answer: 'Plan 1 loans are written off at age 65 (or after 25 years depending on start year). Plan 2 loans are written off 30 years after you become eligible to repay. Plan 5 loans are written off after 40 years. Postgraduate loans are written off after 30 years.',
  },
  {
    question: 'Does paying off student loans early make financial sense?',
    answer: 'For many Plan 2 and Plan 5 graduates, early voluntary repayments are not financially optimal because unpaid balances are written off after 30 or 40 years, and repayments act like an income contingent graduate tax rather than standard commercial debt.',
  },
  {
    question: 'Can you have both an undergraduate and postgraduate loan?',
    answer: 'Yes. If you have both, deductions are calculated concurrently: 9% on income above your undergraduate threshold, plus 6% on income above £21,000 for your postgraduate loan (a combined 15% deduction on earnings above both thresholds).',
  },
  {
    question: 'Is student loan repayment calculated on gross or net pay?',
    answer: 'Student loan repayments are calculated on your gross earnings before Income Tax and National Insurance, but after salary sacrifice deductions.',
  },
  {
    question: 'Do student loan repayments show on your credit score?',
    answer: 'No. UK student loans administered by the Student Loans Company (SLC) do not appear on your credit report and do not affect your credit score, although mortgage lenders review mandatory monthly repayments when assessing affordability.',
  },
  {
    question: 'What happens if my earnings drop below the repayment threshold?',
    answer: 'If your gross earnings drop below your plan’s statutory threshold in any given pay period, student loan deductions automatically stop until your earnings rise above the threshold again.',
  },
];

export const SALARY_SACRIFICE_FAQS: FaqItem[] = [
  {
    question: 'What is salary sacrifice?',
    answer: 'Salary sacrifice is an agreement between you and your employer where you agree to reduce your contractual gross cash salary in exchange for a non-cash benefit, such as increased pension contributions, an electric company car, or cycle to work equipment.',
  },
  {
    question: 'Why does salary sacrifice save both Income Tax and National Insurance?',
    answer: 'Because your gross salary is legally reduced before payroll runs, you pay less Income Tax and less Class 1 National Insurance. Your employer also saves on Employer National Insurance (15%).',
  },
  {
    question: 'Can salary sacrifice reduce salary below the National Minimum Wage?',
    answer: 'No. UK employment law strictly prohibits salary sacrifice arrangements from reducing an employee’s cash earnings below the statutory National Minimum Wage / National Living Wage rate.',
  },
  {
    question: 'How does electric vehicle (EV) salary sacrifice work?',
    answer: 'You sacrifice a portion of your monthly pre-tax salary to lease a brand new electric car. While you pay a low Benefit in Kind (BiK) company car tax (currently 2% or 3%), you save up to 40%–45% Income Tax and National Insurance on the lease, insurance, and maintenance costs.',
  },
  {
    question: 'Can salary sacrifice help avoid the £100k tax trap or Child Benefit charge?',
    answer: 'Yes! Salary sacrifice reduces your Adjusted Net Income. If you earn £110,000, sacrificing £10,000 into your pension restores your full £12,570 Personal Allowance and prevents the 60% effective tax rate.',
  },
  {
    question: 'Does salary sacrifice affect mortgage applications or life cover?',
    answer: 'Most mortgage lenders and employee benefit schemes use your notional or pre-sacrifice reference salary when calculating borrowing limits and life insurance cover, provided your employer confirms this on reference documents.',
  },
];

export const OVERTIME_FAQS: FaqItem[] = [
  {
    question: 'Is overtime taxed at a higher rate in the UK?',
    answer: 'Overtime is not subject to special tax rates; it is simply added to your cumulative income for the pay period. If the extra pay pushes your total income over a higher rate threshold (£50,270 for 40% tax), only the amount exceeding the threshold is taxed at the higher rate.',
  },
  {
    question: 'Is National Insurance deducted from overtime pay?',
    answer: 'Yes. Class 1 employee National Insurance is deducted from overtime earnings. If your monthly earnings exceed the Upper Earnings Limit (£4,189/month), extra overtime is subject to 2% NI rather than the standard 8% rate.',
  },
  {
    question: 'Is overtime included when calculating holiday pay in the UK?',
    answer: 'Yes. Under UK employment case law, regular and voluntary overtime that is worked with sufficient regularity must be included when calculating statutory holiday pay (based on the previous 52-week average pay).',
  },
  {
    question: 'Can employers force employees to work overtime?',
    answer: 'Employers can only require overtime if it is explicitly stated in your employment contract. Even then, your average working hours cannot exceed 48 hours per week unless you have signed a voluntary opt-out agreement.',
  },
  {
    question: 'What is time and a half and double time?',
    answer: 'Time and a half means you are paid 1.5 times your standard hourly rate (e.g. £20/hr becomes £30/hr). Double time means you are paid twice your standard hourly wage (e.g. £20/hr becomes £40/hr), often used for working Sundays or public bank holidays.',
  },
  {
    question: 'Do salaried staff get paid for overtime in the UK?',
    answer: 'Salaried employees only receive overtime pay if specified in their contract. However, unpaid overtime must never cause average pay to drop below the statutory National Living Wage.',
  },
];

export const NHS_FAQS: FaqItem[] = [
  {
    question: 'What is the NHS Agenda for Change pay system?',
    answer: 'Agenda for Change (AfC) is the national pay and grading framework covering all direct NHS staff (except doctors, dentists, and very senior managers). Roles are graded into Bands 2 through 9 based on job evaluations.',
  },
  {
    question: 'What is NHS High Cost Area Supplement (HCAS)?',
    answer: 'HCAS is an additional location allowance for NHS staff working in London and surrounding areas. Inner London receives +20% (min £5,132, max £7,718), Outer London receives +15% (min £4,313, max £5,436), and the Fringe zone receives +5% (min £1,192, max £2,011).',
  },
  {
    question: 'How do NHS pension contribution tiers work?',
    answer: 'NHS Pension Scheme members contribute between 5.2% and 12.5% of their pensionable pay depending on their actual salary tier. Contributions are deducted via Net Pay arrangement, reducing taxable income.',
  },
  {
    question: 'How does incremental pay progression work in the NHS?',
    answer: 'Within each NHS band, staff progress through pay points based on completed years of service and meeting appraisal and statutory training standards.',
  },
  {
    question: 'Do NHS workers get unsocial hours enhancements?',
    answer: 'Yes. NHS staff working nights, weekends, or bank holidays receive unsocial hours enhancements under Agenda for Change Section 2, typically ranging from time plus 30% to double time.',
  },
  {
    question: 'How does NHS salary sacrifice work for lease cars and childcare?',
    answer: 'NHS trusts offer salary sacrifice schemes for lease cars, bikes, and electronic equipment. These reduce gross pensionable and taxable earnings, lowering Income Tax and National Insurance.',
  },
];

export const TEACHER_FAQS: FaqItem[] = [
  {
    question: 'How are school teacher pay scales structured in England?',
    answer: 'Teachers in state-funded schools progress through the Main Pay Range (M1 to M6), followed by the Upper Pay Range (U1 to U3) and Leadership Group ranges (L1 to L43) for assistant heads, deputy heads, and headteachers.',
  },
  {
    question: 'What are the four teacher pay areas in England?',
    answer: 'Teacher pay is divided into four geographic zones: Inner London (highest rates), Outer London, London Fringe, and Rest of England.',
  },
  {
    question: 'How much do teachers contribute to the Teachers’ Pension Scheme (TPS)?',
    answer: 'Teachers contribute between 7.4% and 11.7% of their gross salary depending on their earnings tier. The employer contribution is 28.68%, making it one of the most generous defined benefit public sector pension schemes in the UK.',
  },
  {
    question: 'What are Teaching and Learning Responsibility (TLR) payments?',
    answer: 'TLRs are additional annual allowances awarded to teachers who undertake substantial additional responsibilities, such as subject leadership or pastoral head roles (typically ranging from £600 to £15,000+).',
  },
  {
    question: 'How do Early Career Teachers (ECTs) get paid?',
    answer: 'ECTs typically start on point M1 of the Main Pay Range during their two-year induction period and progress to M2 upon successful completion of year one.',
  },
  {
    question: 'What is the Special Educational Needs (SEN) allowance for teachers?',
    answer: 'Teachers working in special schools or dedicated SEN units receive a statutory SEN allowance ranging from £2,539 to £5,009 per year on top of their standard pay scale point.',
  },
];

export const IR35_FAQS: FaqItem[] = [
  {
    question: 'What does inside IR35 mean for contractors?',
    answer: 'An inside IR35 determination means HMRC regards you as a deemed employee for tax purposes for that specific contract. As a result, Income Tax and Employee National Insurance are deducted at source via PAYE, and Employer NI and Apprenticeship Levy are accounted for from the contract rate.',
  },
  {
    question: 'Why is inside IR35 take-home pay lower than permanent employment on the same rate?',
    answer: 'In an inside IR35 assignment via an umbrella company, employment taxes (Employer National Insurance of 15% and 0.5% Apprenticeship Levy) plus umbrella margin fees are deducted from the gross contract value before your taxable pay is calculated.',
  },
  {
    question: 'What is the difference between inside IR35 and outside IR35?',
    answer: 'Outside IR35 contractors operate as independent business entities (typically via a Personal Service Company / Ltd company), managing their own tax, invoicing, and dividends. Inside IR35 workers are taxed as employees under PAYE rules.',
  },
  {
    question: 'Can inside IR35 contractors claim travel and food expenses?',
    answer: 'Generally no. UK Supervision, Direction, or Control (SDC) legislation prevents inside IR35 contractors from claiming tax relief on ordinary commuting or meal expenses to a regular client site.',
  },
  {
    question: 'Can you salary sacrifice your pension inside IR35?',
    answer: 'Yes! Most reputable umbrella companies support salary sacrifice pension contributions, which allows you to transfer pre-tax contract income directly into a SIPP or private pension, saving Income Tax, Employee NI, and Employer NI.',
  },
  {
    question: 'Who determines IR35 status for a contract?',
    answer: 'In the medium/large private sector and all public sector bodies, the hiring client is legally responsible for issuing a Status Determination Statement (SDS). Small private sector clients are exempt, leaving status determination with the contractor.',
  },
];

export const UMBRELLA_FAQS: FaqItem[] = [
  {
    question: 'How does an umbrella company pay contractors in the UK?',
    answer: 'The recruitment agency or end client pays the umbrella company your agreed contract assignment rate. The umbrella company deducts their weekly margin fee, Employer NI, Apprenticeship Levy, and employer pension, then processes the remaining amount through PAYE for Income Tax and Employee NI, paying you the net amount.',
  },
  {
    question: 'What is a typical umbrella company margin fee?',
    answer: 'Umbrella company fees typically range between £15 and £30 per week (or £65 to £130 per month). You should never use unregulated loan schemes or offshore tax avoidance providers promising 80%–90% take-home pay.',
  },
  {
    question: 'How is holiday pay handled by umbrella companies?',
    answer: 'Umbrella companies either accrue holiday pay (holding back approximately 12.07% of your gross pay to pay you when you take time off) or pay rolled-up holiday pay, which includes holiday pay directly in each weekly/monthly payslip.',
  },
  {
    question: 'What is an FCSA accredited umbrella company?',
    answer: 'The Freelancer & Contractor Services Association (FCSA) is a UK professional body that audits umbrella companies to ensure full compliance with UK employment and tax laws.',
  },
  {
    question: 'Does an umbrella company provide employment rights?',
    answer: 'Yes. When working through an umbrella company, you become their employee and receive statutory benefits such as Statutory Sick Pay (SSP), Statutory Maternity/Paternity Pay, workplace pension enrolment, and continuous employment continuity across assignments.',
  },
  {
    question: 'What is the difference between assignment rate and gross pay?',
    answer: 'The Assignment Rate is the uplifted commercial rate paid by the agency to cover statutory employer costs. Gross Pay is your taxable wage after the umbrella margin, Employer NI, and Apprenticeship Levy have been deducted.',
  },
];

export const GUIDE_50K_FAQS: FaqItem[] = [
  {
    question: 'How much is £50,000 a year after tax in the UK?',
    answer: 'For the 2025/2026 tax year, a £50,000 gross salary in England, Wales, or Northern Ireland yields an estimated £3,162 monthly take-home pay (approx. £37,940/year) assuming a standard 1257L tax code, no student loan, and a 5% auto-enrolment workplace pension.',
  },
  {
    question: 'How much Income Tax do you pay on £50k in the UK?',
    answer: 'On £50,000 with a standard £12,570 Personal Allowance, you pay 20% basic rate Income Tax on £37,430, which equals £7,486 per year (£623.83 per month).',
  },
  {
    question: 'How much National Insurance is deducted from a £50k salary?',
    answer: 'Under the 8% employee Class 1 NI rate on earnings between £12,570 and £50,270, you pay approximately £2,994 in National Insurance per year (£249.50 per month).',
  },
  {
    question: 'Does earning £50,000 push you into the 40% higher rate tax bracket?',
    answer: 'No. The higher rate 40% tax threshold starts at £50,270. On a £50,000 salary, 100% of your taxable income falls within the 20% basic rate tax band.',
  },
  {
    question: 'How much take-home pay do you get on £50k in Scotland?',
    answer: 'Because of devolved Scottish tax bands (19%, 20%, 21%, and 42%), an individual in Scotland earning £50,000 pays approximately £8,980 in Scottish Income Tax, giving a net monthly take-home pay of around £3,037.',
  },
  {
    question: 'What is the student loan deduction on £50,000 on Plan 2?',
    answer: 'Plan 2 graduates repay 9% on income above £27,295. On £50,000, your annual student loan repayment is £2,043 (£170.29 per month).',
  },
  {
    question: 'How much does a 5% workplace pension cost on a £50,000 salary?',
    answer: 'Under auto-enrolment qualifying earnings (£6,240 to £50,000), a 5% employee contribution is approximately £2,188 per year (£182.33/month before tax relief).',
  },
  {
    question: 'What is the weekly take-home pay on £50k?',
    answer: 'On £50,000, your estimated weekly net take-home pay is approximately £729.62 per week.',
  },
];

export const GUIDE_60K_FAQS: FaqItem[] = [
  {
    question: 'How much is £60,000 a year after tax in the UK?',
    answer: 'On a £60,000 gross annual salary in England/Wales/NI, your estimated net take-home pay is £3,628 per month (£43,536/year) with standard 1257L tax code and a 5% auto-enrolment pension.',
  },
  {
    question: 'How much of a £60k salary is taxed at the 40% higher rate?',
    answer: 'The first £12,570 is tax-free. Earnings between £12,570 and £50,270 (£37,700) are taxed at 20% (£7,540). The remaining £9,730 between £50,270 and £60,000 is taxed at the 40% higher rate (£3,892), giving total Income Tax of £11,432.',
  },
  {
    question: 'What is National Insurance on £60,000?',
    answer: 'You pay 8% on earnings between £12,570 and £50,270 (£3,016), plus 2% on earnings above £50,270 (£194.60), totaling £3,210.60 in annual National Insurance.',
  },
  {
    question: 'Does a £60,000 salary trigger the High Income Child Benefit Charge?',
    answer: 'The High Income Child Benefit Charge starts when the highest earner in a household earns over £60,000. The charge increases gradually and fully claws back Child Benefit at £80,000.',
  },
  {
    question: 'How can salary sacrifice reduce tax on a £60k salary?',
    answer: 'By sacrificing £9,730 into a workplace pension, your taxable salary drops to £50,270. You avoid 40% income tax and 2% NI on the sacrificed amount, saving £4,086.60 in total tax while boosting your retirement fund.',
  },
  {
    question: 'What is the Plan 2 student loan repayment on £60,000?',
    answer: 'On £60,000, 9% above the £27,295 threshold equals £2,943.45 per year (£245.29 per month) in student loan repayments.',
  },
  {
    question: 'What is the effective tax rate on £60,000?',
    answer: 'Total statutory deductions (Income Tax + NI) equal £14,642.60, representing an effective tax and NI rate of 24.4% on your gross £60k income.',
  },
  {
    question: 'What is the monthly take-home pay on £60k in Scotland?',
    answer: 'In Scotland, with higher rate tax bands (42%), total income tax on £60,000 is approximately £13,248, yielding an estimated net take-home pay of £3,477 per month.',
  },
];

export const GUIDE_SALARY_SACRIFICE_FAQS: FaqItem[] = [
  {
    question: 'What is the legal definition of salary sacrifice in the UK?',
    answer: 'Salary sacrifice is a formal contractual variation where an employee gives up part of their contractual cash entitlement in exchange for an employer-provided non-cash benefit.',
  },
  {
    question: 'Which benefits qualify for salary sacrifice tax exemptions?',
    answer: 'Under HMRC rules, employer pension contributions, Ultra-Low Emission Vehicles / Electric Cars (EVs), Cycle to Work schemes, and employer-supported childcare vouchers retain full National Insurance exemptions.',
  },
  {
    question: 'Can salary sacrifice reduce statutory maternity pay or statutory sick pay?',
    answer: 'Yes. Because statutory payments (like SMP and SSP) are based on average gross cash earnings subject to Class 1 NI, a lower cash salary can reduce statutory maternity and sick pay entitlements.',
  },
  {
    question: 'How does an electric car salary sacrifice scheme work?',
    answer: 'You sacrifice gross salary each month to cover the lease, insurance, maintenance, and breakdown cover of an electric car. You pay a low company car Benefit in Kind (BiK) rate (2%–3%), saving up to 40%–45% in tax and NI.',
  },
  {
    question: 'Can an employer pass on Employer NI savings from salary sacrifice?',
    answer: 'Many UK employers choose to pass back some or all of their 15% Employer NI savings directly into the employee’s pension pot as an additional top-up contribution.',
  },
  {
    question: 'Can I opt out of salary sacrifice if my personal circumstances change?',
    answer: 'Yes. HMRC recognizes defined "lifestyle events" (such as marriage, divorce, pregnancy, redundancy of a partner, or significant financial hardship) that permit contractual opt-outs outside standard annual renewal windows.',
  },
];

export const GUIDE_INCOME_TAX_FAQS: FaqItem[] = [
  {
    question: 'What is the UK Personal Allowance for 2025/2026?',
    answer: 'The standard UK Personal Allowance is £12,570. This is the amount of income you can earn each tax year without paying any Income Tax.',
  },
  {
    question: 'What are the current UK income tax bands for England, Wales and Northern Ireland?',
    answer: 'The bands are: 0% Personal Allowance on £0–£12,570; 20% Basic Rate on £12,571–£50,270; 40% Higher Rate on £50,271–£125,140; and 45% Additional Rate on income above £125,140.',
  },
  {
    question: 'Why does Scotland have different income tax rates?',
    answer: 'Under the Scotland Act 2016, the Scottish Parliament has devolved powers to set income tax rates and band thresholds on non-savings and non-dividend income for Scottish resident taxpayers.',
  },
  {
    question: 'What is an emergency tax code in the UK?',
    answer: 'Emergency tax codes (such as 1257L W1, M1, or X) indicate that HMRC has not yet provided your full previous pay history to your employer. Tax is calculated non-cumulatively on each single pay period.',
  },
  {
    question: 'What is a K tax code?',
    answer: 'A K code (e.g. K500) indicates that you have taxable benefits in kind, state pension, or unpaid tax from a previous year that exceed your tax-free personal allowance, effectively adding taxable income to your pay.',
  },
  {
    question: 'When is the UK tax year?',
    answer: 'The UK tax year runs from 6 April of one calendar year to 5 April of the following calendar year.',
  },
];

export const SELF_EMPLOYED_FAQS: FaqItem[] = [
  {
    question: 'How much tax do I pay as self-employed in the UK?',
    answer: 'Self-employed sole traders pay Income Tax and National Insurance on their net business profits (gross income minus allowable expenses). The first £12,570 of profit is tax-free under the UK Personal Allowance. Profits between £12,570 and £50,270 are taxed at 20% Income Tax plus 6% Class 4 National Insurance (26% total). Profits above £50,270 are taxed at 40% Income Tax plus 2% Class 4 NI (42% total), and profits over £125,140 incur 45% Income Tax plus 2% NI (47% total). In Scotland, devolved tax bands (19% to 48%) apply to Income Tax.',
  },
  {
    question: 'What is Class 2 National Insurance?',
    answer: 'Class 2 National Insurance is a flat-rate contribution that historically qualified self-employed workers for state benefits including the State Pension. From 6 April 2024, self-employed individuals with profits at or above the Small Profits Threshold (£6,725 per year) automatically receive National Insurance credits at zero cost (£0 charge). If your net profit is below £6,725, you do not have to pay anything, but you can choose to make voluntary Class 2 contributions (£3.45 per week / £179.40 per year) to protect your State Pension record.',
  },
  {
    question: 'What is Class 4 National Insurance?',
    answer: 'Class 4 National Insurance is a profit-related tax paid by self-employed sole traders through Self Assessment. For the current tax year, you pay 6% on annual taxable profits between the Lower Profits Limit (£12,570) and the Upper Profits Limit (£50,270), and 2% on any profits above £50,270. Class 4 NI is calculated on your net profit after allowable expenses and capital allowances.',
  },
  {
    question: 'Do I need to pay Payments on Account?',
    answer: 'Yes, if your self-employed tax and Class 4 National Insurance bill is more than £1,000 for the tax year (and less than 80% of your total tax was collected at source via PAYE), HMRC requires you to make two advance "Payments on Account". Each payment is 50% of your previous year\'s tax bill. The first payment on account is due on 31 January (alongside the balancing payment for the prior year), and the second payment on account is due on 31 July.',
  },
  {
    question: "What's the difference between sole trader and self-employed tax?",
    answer: '"Self-employed" is an umbrella employment status describing anyone who works for themselves rather than an employer. A "sole trader" is the simplest legal business structure for a self-employed individual. Sole traders report earnings and pay Income Tax and Class 2/4 National Insurance via an annual HMRC Self Assessment tax return, whereas limited company directors pay Corporation Tax on company profits and Income Tax on salary and dividends.',
  },
  {
    question: 'What allowable business expenses can I deduct as a sole trader?',
    answer: 'You can deduct any expenses incurred "wholly and exclusively" for business purposes. Common allowable deductions include office supplies, software subscriptions, mobile phone bills (business proportion), travel and fuel for client visits (or 45p/mile simplified mileage rate), professional indemnity insurance, marketing and website costs, accountancy fees, and a flat-rate or apportioned home office allowance. Alternatively, if your expenses are under £1,000, you can claim the £1,000 statutory Trading Allowance instead of detailing individual receipts.',
  },
];

export const PAY_RISE_FAQS: FaqItem[] = [
  {
    question: 'How much of my pay rise will I actually take home?',
    answer: 'The exact amount of your pay rise you keep depends on your marginal tax rate. Basic rate taxpayers (earning between £12,570 and £50,270) typically take home approximately 72% of their pay rise (after 20% Income Tax and 8% National Insurance), or around 67% if contributing 5% to an auto-enrolment pension. Higher rate taxpayers (£50,270 to £100,000) keep roughly 58% (40% tax + 2% NI), while earners between £100,000 and £125,140 keep only 38% due to the 60% Personal Allowance taper.',
  },
  {
    question: 'Will a pay rise push me into a higher tax bracket?',
    answer: 'A pay rise will only push you into a higher tax bracket if your new salary exceeds a statutory threshold (e.g. £50,270 for the Higher Rate or £125,140 for the Additional Rate). Crucially, the UK uses a progressive tax system: moving into a higher tax bracket only taxes the portion of your earnings ABOVE the threshold at the higher rate. Your salary below the threshold continues to be taxed at the lower rates, meaning a pay rise will ALWAYS leave you with more total take-home pay.',
  },
  {
    question: 'Does a pay rise affect my pension contributions?',
    answer: 'Yes. If you pay pension contributions as a percentage of your salary (e.g. 5%), your monthly pension contribution will increase automatically with your pay rise. Furthermore, because qualifying pension contributions receive full tax relief, contributing more to your workplace pension can help reduce the tax impact of your pay rise or keep your Adjusted Net Income below critical thresholds like £50,270, £60,000, or £100,000.',
  },
  {
    question: 'What is the £100,000 Personal Allowance taper?',
    answer: 'In the UK, if your Adjusted Net Income exceeds £100,000, you lose £1 of your £12,570 tax-free Personal Allowance for every £2 of income above £100,000. By £125,140, your personal allowance is completely zero. This creates an effective marginal Income Tax rate of 60% (62% including 2% employee NI, or 65% in Scotland) on earnings in the £100k–£125,140 bracket. Making additional pension contributions via salary sacrifice is a common strategy to legally eliminate this 60% tax trap.',
  },
  {
    question: 'Does a pay rise affect Child Benefit?',
    answer: 'If your adjusted net income exceeds £60,000, you are subject to the High Income Child Benefit Charge (HICBC). The charge claws back 1% of your family\'s Child Benefit for every £200 of income earned between £60,000 and £80,000. At £80,000, 100% of Child Benefit is recouped. If a pay rise moves your salary into this bracket, increasing your pension contributions can bring your taxable income back below £60,000 to preserve your full Child Benefit.',
  },
  {
    question: 'Will a salary increase affect my student loan repayments?',
    answer: 'Yes. UK student loan repayments are calculated as a fixed percentage (9% for undergraduate Plans 1, 2, 4, and 5; 6% for Postgraduate loans) on earnings above specific annual thresholds. If your pay rise increases your earnings further above your plan\'s repayment threshold, your monthly student loan deductions will increase by 9% (or 6%) of the extra amount.',
  },
];

export const BONUS_TAX_FAQS: FaqItem[] = [
  {
    question: 'How is a bonus taxed in the UK?',
    answer: 'In the UK, bonuses are treated as ordinary taxable employment income and are processed through PAYE alongside your regular salary. There is no special or separate "bonus tax rate". Instead, your bonus is taxed at your top marginal tax rate based on where your total earnings (base salary plus bonus) fall across the standard UK Income Tax bands (20%, 40%, or 45%) and Class 1 National Insurance thresholds (8% or 2%).',
  },
  {
    question: 'Why is my bonus taxed at 40%?',
    answer: 'If your regular base salary is already near or above the £50,270 Higher Rate threshold (or £43,662 in Scotland), or if adding your bonus pushes your total cumulative income over that line, the portion of your bonus above the threshold is subject to the 40% Higher Rate of Income Tax (plus 2% National Insurance). Additionally, if your employer pays your bonus in a single pay period, payroll software may temporarily calculate PAYE tax assuming you earn that higher monthly rate all year long.',
  },
  {
    question: 'Will I get overpaid tax on my bonus back?',
    answer: 'Yes. Because standard UK PAYE tax codes operate on a cumulative basis across the tax year, any temporary over-deduction of Income Tax in your bonus month is automatically smoothed out and refunded through reduced tax deductions in your subsequent monthly payslips. If an overpayment remains at the end of the tax year (after 5 April), HMRC will issue a P800 tax calculation and send you a direct tax refund.',
  },
  {
    question: 'Can I reduce tax on my bonus?',
    answer: 'Yes, one of the most effective and widely used methods is "bonus sacrifice" (a form of salary sacrifice). You can ask your employer to pay some or all of your bonus directly into your workplace pension scheme before tax and National Insurance are deducted. This allows 100% of the gross bonus to be invested into your pension pot without losing 20%, 40%, or 60% in Income Tax and 2% or 8% in National Insurance.',
  },
  {
    question: 'Is a bonus subject to National Insurance?',
    answer: 'Yes. Employment bonuses are subject to Class 1 employee National Insurance contributions. Unlike Income Tax which is cumulative across the full year, National Insurance is calculated per pay period (each week or month). Earnings in that pay period up to the Upper Earnings Limit (£4,189/month) are charged at 8%, while any earnings above the UEL in that month are charged at only 2% NI.',
  },
  {
    question: 'Does a bonus affect student loan deductions?',
    answer: 'Yes. If your total gross pay in your bonus month exceeds your student loan plan\'s monthly repayment threshold, you will pay 9% (or 6% for postgraduate loans) on the excess gross earnings in that pay period.',
  },
];

export const REDUNDANCY_FAQS: FaqItem[] = [
  {
    question: 'How is UK statutory redundancy pay calculated?',
    answer: 'Statutory redundancy pay in the UK is calculated using three variables: your age, full completed years of service (capped at 20 years), and your weekly pay (capped at £700 per week for 2024/25 and 2025/26). You receive: 0.5 week\'s pay for each full year of service under age 22; 1.0 week\'s pay for each full year aged 22 to 40; and 1.5 weeks\' pay for each full year aged 41 and older.',
  },
  {
    question: 'Is redundancy pay tax-free in the UK?',
    answer: 'Yes, the first £30,000 of redundancy pay (combined statutory plus contractual/enhanced redundancy) is 100% exempt from UK Income Tax and Employee National Insurance. Any redundancy payout exceeding £30,000 is subject to Income Tax at your normal marginal rate (20%, 40%, or 45%).',
  },
  {
    question: 'How much redundancy pay am I entitled to?',
    answer: 'To qualify for statutory redundancy pay, you must be an employee with at least 2 continuous years of service with your employer. The statutory minimum is capped at 20 years of service and £700 per week, giving a statutory maximum of £21,000. However, if your contract of employment includes enhanced redundancy terms, your employer may pay significantly more.',
  },
  {
    question: 'Is redundancy pay subject to National Insurance?',
    answer: 'No. Genuine statutory and contractual redundancy payments are completely exempt from employee Class 1 National Insurance contributions, even on amounts that exceed the £30,000 tax-free limit. However, employers must pay Class 1A employer National Insurance (15.0% from April 2025; 13.8% prior) on any termination package amount above £30,000.',
  },
  {
    question: 'What\'s the difference between statutory and enhanced redundancy pay?',
    answer: 'Statutory redundancy pay is the legal minimum compensation an employer must pay to qualifying employees with 2+ years of service under UK employment law. Enhanced (or contractual) redundancy pay is additional money provided voluntarily or contractually by an employer above the statutory formula—for instance, using your full uncapped salary, multiplying weeks by 2x, or offering a discretionary ex-gratia settlement.',
  },
  {
    question: 'How is tax calculated on redundancy pay over £30,000?',
    answer: 'Any portion of your redundancy payment above £30,000 is added to your other taxable earnings in that tax year and taxed under PAYE at your top marginal Income Tax rate (20% Basic, 40% Higher, or 45% Additional Rate; or Scottish rates if resident in Scotland). Other contractual elements like Pay in Lieu of Notice (PILON) and accrued untaken holiday pay are treated as standard salary and taxed fully from £0.',
  },
];

export const COUNCIL_TAX_FAQS: FaqItem[] = [
  {
    question: 'How is council tax band worked out?',
    answer: 'In England and Scotland, council tax bands (A to H) are based on what the open-market capital value of the property would have been on 1 April 1991. In Wales, properties were revalued in 2003 (bands A to I). Even newly built homes are assigned a band based on their estimated 1991 (or 2003) equivalent value by the Valuation Office Agency (VOA) or Scottish Assessors.',
  },
  {
    question: 'What is the single person discount?',
    answer: 'If you live alone as the sole adult (aged 18 or over) in a property, you are legally entitled to a 25% Single Person Discount off your total council tax bill, regardless of your income or council tax band. Certain individuals are also "disregarded" (not counted as adults), including full-time students, live-in carers, and individuals with severe mental impairments.',
  },
  {
    question: 'Why does council tax vary between councils?',
    answer: 'Each local authority (billing authority) sets its own annual budget to fund local public services such as social care, bin collections, road maintenance, and libraries. In addition, bills include statutory "precepts" for police and crime commissioners, fire and rescue services, county councils, and parish councils, causing substantial variation in Band D rates across different regions.',
  },
  {
    question: 'How do I find my council tax band?',
    answer: 'You can check your official property council tax band for free online via the GOV.UK Council Tax Valuation service for England and Wales (gov.uk/council-tax-bands) or the Scottish Assessors Association (saa.gov.uk) for properties in Scotland by simply entering your postcode and street address.',
  },
  {
    question: 'Is council tax paid monthly or annually?',
    answer: 'By default, local authorities in the UK issue an annual bill split into 10 equal monthly installments from April through January, with two payment-free months in February and March. However, you have a statutory legal right to request your council spread your payments across all 12 calendar months to lower your monthly outflow.',
  },
  {
    question: 'How does the band ratio formula work relative to Band D?',
    answer: 'Band D is the national benchmark (ratio 9/9 or 100%). Other bands in England & Wales pay fixed statutory proportions of Band D: Band A is 6/9 (66.7%), Band B is 7/9 (77.8%), Band C is 8/9 (88.9%), Band E is 11/9 (122.2%), Band F is 13/9 (144.4%), Band G is 15/9 (166.7%), and Band H is 18/9 (200.0%). Scotland applies a slightly higher weighting to bands E through H.',
  },
];

export const IR35_COMPARE_FAQS: FaqItem[] = [
  {
    question: 'What does inside IR35 mean?',
    answer: 'Inside IR35 means that HMRC views your contract as "deemed employment". For tax purposes, you are treated as an employee rather than a business. This means employment taxes—such as Employer National Insurance (15%), the Apprenticeship Levy (0.5%), Employee National Insurance (8%), and PAYE Income Tax—are deducted from your assignment rate before you receive your net pay, typically via an umbrella company or agency payroll.',
  },
  {
    question: 'What does outside IR35 mean?',
    answer: 'Outside IR35 means you are operating as a genuine self-employed contractor and independent business through your own Personal Services Company (PSC) or Limited Company. You invoice the client for your contract services, pay Corporation Tax (19% to 25%) on company profits, and extract income tax-efficiently via a low director salary combined with company dividends.',
  },
  {
    question: 'How much more do I take home outside IR35?',
    answer: 'On average, contractors operating outside IR35 retain approximately 75% to 82% of their gross invoiced day rate, compared to 55% to 62% inside IR35 on the exact same day rate. On a typical £500/day contract (220 days = £110,000 turnover), an outside IR35 contractor takes home approximately £15,000 to £20,000 more per year in net pay because they avoid Employer National Insurance and can leverage lower dividend tax rates.',
  },
  {
    question: 'How is dividend tax calculated for contractors?',
    answer: 'After paying Corporation Tax (19% on profits under £50,000; 25% over £250,000) on company profits, limited company directors can distribute retained profit as dividends. The first £500 of dividends is tax-free under the Dividend Allowance. Any dividends above £500 are taxed based on your total income tax band: 8.75% within the Basic Rate band (up to £50,270), 33.75% within the Higher Rate band (£50,270 to £125,140), and 39.35% in the Additional Rate band (above £125,140). Dividends are exempt from National Insurance.',
  },
  {
    question: 'Who decides if I\'m inside or outside IR35?',
    answer: 'Under off-payroll working rules (reforms introduced in 2017 for the public sector and April 2021 for the private sector), the medium or large end-client is legally responsible for determining the IR35 status of each engagement and issuing a Status Determination Statement (SDS). Only if the end-client qualifies as a "small business" under Companies Act criteria does the responsibility remain with the contractor\'s limited company.',
  },
  {
    question: 'What day rate uplift is needed to match outside IR35 pay when moving inside IR35?',
    answer: 'To achieve the same net take-home pay inside IR35 as you would outside IR35, you typically need a 20% to 30% increase in your day rate. For example, an outside IR35 contract at £500/day requires an inside IR35 rate of approximately £620 to £650/day to offset the combined burden of Employer NI, Apprenticeship Levy, and standard PAYE income tax.',
  },
];

export const VAT_FAQS: FaqItem[] = [
  {
    question: 'What is the standard UK VAT rate?',
    answer: 'The standard UK VAT rate is 20%, which applies to most goods and services. A reduced rate of 5% applies to certain goods such as domestic energy, children\'s car seats, and some health products. A zero rate (0%) applies to most food, children\'s clothing, books, and public transport.',
  },
  {
    question: 'How do I add VAT to a price?',
    answer: 'To add 20% VAT to a net (ex-VAT) price, multiply the net price by 1.20. For example, a net price of £100 becomes £120 including VAT. Our calculator does this automatically — simply enter the net price and select "Add VAT to price".',
  },
  {
    question: 'How do I remove VAT from a price?',
    answer: 'To remove 20% VAT from a gross (VAT-inclusive) price, divide the gross price by 1.20. For example, a gross price of £120 divided by 1.20 gives a net price of £100. Do not simply subtract 20% from the gross — that gives the wrong answer. Our calculator handles this correctly.',
  },
  {
    question: 'What is the reduced VAT rate of 5% used for?',
    answer: 'The 5% reduced rate applies to domestic energy (gas and electricity), children\'s car seats, mobility aids for older people, some health products and maternity pads, and certain residential property conversions and renovations.',
  },
  {
    question: 'Do I need to register for VAT in the UK?',
    answer: 'You must register for VAT if your VAT-taxable turnover exceeds the registration threshold, which is £90,000 in a rolling 12-month period as of 2024/25. You can also voluntarily register below this threshold, which allows you to reclaim VAT on business purchases.',
  },
  {
    question: 'Is there VAT on food in the UK?',
    answer: 'Most basic food and drink for human consumption is zero-rated for VAT. However, some items are standard-rated at 20%, including restaurant and café meals, hot takeaway food, alcoholic drinks, chocolate, crisps, sweets, and ice cream.',
  },
  {
    question: 'What does ex-VAT and inc-VAT mean?',
    answer: 'Ex-VAT (excluding VAT) means the price before VAT is added — also called the net price. Inc-VAT (including VAT) means the total price after VAT has been added — also called the gross price. Business-to-business (B2B) prices are often quoted ex-VAT, while consumer prices are quoted inc-VAT.',
  },
  {
    question: 'Can I reclaim VAT as a business?',
    answer: 'Yes. VAT-registered businesses can reclaim the VAT they have paid on business purchases and expenses (input tax) by offsetting it against the VAT they have collected from customers (output tax). The net difference is either paid to HMRC or reclaimed if input tax exceeds output tax.',
  },
];

export const NET_TO_GROSS_FAQS: FaqItem[] = [
  {
    question: 'What is a net to gross salary calculator?',
    answer: 'A net to gross salary calculator works in reverse to a standard take-home pay calculator. Instead of entering your gross salary to find your take-home pay, you enter the amount you want to receive in your bank account (your net pay) and the calculator works out the gross salary your employer would need to pay you to achieve that net figure, after Income Tax, National Insurance, pension, and student loan deductions.',
  },
  {
    question: 'Why do I need to know my gross salary from my net pay?',
    answer: 'Knowing the gross salary required to achieve a target take-home pay is useful when negotiating a new job offer or pay rise, when setting a freelance day rate, when comparing two job offers with different salary figures, or when trying to understand what gross salary you need to cover your monthly expenses and savings goals.',
  },
  {
    question: 'How does the calculator find the gross salary from a net figure?',
    answer: 'The calculator uses a binary search algorithm, iteratively testing gross salary values and running the full UK tax calculation (Income Tax, National Insurance, pension, and student loan) until the resulting net pay matches your desired target to within 1 penny. This approach is more accurate than using simplified formulas, as it correctly accounts for banded tax rates, NI thresholds, personal allowance tapering, and pension relief interactions.',
  },
  {
    question: 'Is the gross salary figure guaranteed to be exact?',
    answer: 'The calculator is highly accurate and converges to within 1 penny of your target net pay for standard UK salary ranges. However, your actual payslip may vary slightly due to employer-specific payroll settings, cumulative PAYE adjustments, rounding conventions, and any taxable benefits in kind not included in this calculator.',
  },
  {
    question: 'Does pension contribution affect the gross salary needed?',
    answer: 'Yes, significantly. If you make pension contributions via Net Pay Arrangement or Salary Sacrifice, your taxable income is reduced, which means you pay less Income Tax and potentially less National Insurance. As a result, a lower gross salary is needed to achieve the same net take-home pay compared to someone making no pension contributions.',
  },
  {
    question: 'What is the gross salary needed for £2,000 per month take-home?',
    answer: 'For the 2025/26 tax year with a standard 1257L tax code, no pension contributions, and no student loan, a gross salary of approximately £27,700 per year is needed to achieve a net take-home pay of £2,000 per month. This varies depending on your region, pension contributions, and student loan plan.',
  },
  {
    question: 'What is the gross salary needed for £3,000 per month take-home?',
    answer: 'For the 2025/26 tax year with a standard 1257L tax code and no pension or student loan deductions, a gross salary of approximately £45,000 to £46,000 per year is needed to achieve a net take-home of £3,000 per month. The exact figure depends on your tax region, pension type, and student loan repayment plan.',
  },
  {
    question: 'Does the region (Scotland, Wales, England) affect the gross salary needed?',
    answer: 'Yes. Scotland has different income tax bands and rates from England, Wales, and Northern Ireland. Scottish taxpayers face a higher marginal tax rate at lower income levels (for example, the 42% Higher Rate kicks in at the same threshold as 40% in England/Wales/NI). This means Scottish taxpayers typically need a slightly higher gross salary to achieve the same net take-home pay.',
  },
];

export const MINIMUM_WAGE_FAQS: FaqItem[] = [
  {
    question: 'What is the current National Minimum Wage in the UK?',
    answer: 'For the 2025/26 tax year (effective April 2025), the statutory UK National Living Wage for workers aged 21 and over is £12.21 per hour. For workers aged 18 to 20, the rate is £10.00 per hour. For workers aged 16 to 17 (under 18), the rate is £7.55 per hour. The statutory Apprentice rate is £7.55 per hour (for apprentices under 19 or in their first year of apprenticeship). In the 2024/25 tax year, the rates were £11.44 (21+), £8.60 (18-20), and £6.40 (under 18 and apprentices).',
  },
  {
    question: 'What is the difference between National Minimum Wage and National Living Wage?',
    answer: 'The National Living Wage is the legally binding statutory minimum wage for workers aged 21 and over in the UK. The term National Minimum Wage officially refers to the statutory minimum rates for workers aged 16 to 20 and apprentices. Both are legally enforceable by HMRC. They should not be confused with the voluntary "Real Living Wage" set by the Living Wage Foundation, which is an informal benchmark based on living costs.',
  },
  {
    question: 'Can my employer deduct costs that take me below minimum wage?',
    answer: 'No. Legally, deductions made by an employer for their own use or benefit—such as compulsory uniform costs, safety equipment, tools, mandatory training fees, till shortages, or administration charges—reduce your pay for National Minimum Wage purposes. If these deductions push your effective pay below the statutory hourly rate for your pay reference period, your employer is breaking UK employment law, even if you consented to the deduction in your contract.',
  },
  {
    question: 'What should I do if I\'m being paid below minimum wage?',
    answer: 'If you suspect you are being underpaid: 1) Check your pay reference period and all hours worked, including mandatory opening/closing duties, team meetings, and travel between appointments; 2) Raise the issue with your employer or HR team informally or in writing; 3) Contact the Acas (Advisory, Conciliation and Arbitration Service) helpline on 0300 123 1100 for confidential, free guidance; 4) Submit a formal, confidential complaint to HM Revenue & Customs (HMRC). HMRC investigates every minimum wage complaint and can compel employers to pay all back-pay with substantial financial penalties up to 200% of arrears.',
  },
  {
    question: 'Does the minimum wage apply to apprentices?',
    answer: 'Yes. Apprentices are entitled to the statutory Apprentice rate (£7.55/hr in 2025/26) if they are aged under 19, OR if they are aged 19 and over and in the first year of their apprenticeship program. If an apprentice is aged 19 or older and has completed their first year, they are legally entitled to the standard National Minimum Wage or National Living Wage rate for their age group.',
  },
  {
    question: 'Do unpaid working hours or overtime affect minimum wage compliance?',
    answer: 'Yes. All time spent working on behalf of your employer counts towards your minimum wage calculation. This includes mandatory preparation or cleaning time before or after shifts, unpaid team meetings, compulsory security checks, time spent on-call at a workplace, and travel time during the working day (e.g. between care visits). If working unpaid hours brings your total earnings divided by total hours worked below the statutory rate, you are being underpaid.',
  },
];

export const NMW_FAQS: FaqItem[] = [
  {
    question: 'What is the National Minimum Wage in the UK for 2025/26?',
    answer: 'For the 2025/26 tax year (from April 2025), the National Living Wage for workers aged 21 and over is £12.21 per hour. Workers aged 18 to 20 are entitled to £10.00 per hour, workers aged 16 to 17 receive £7.55 per hour, and apprentices (under 19, or in their first year of apprenticeship aged 19+) receive £7.55 per hour.',
  },
  {
    question: 'What is the difference between the National Minimum Wage and the National Living Wage?',
    answer: 'The National Living Wage (NLW) is the highest rate of the National Minimum Wage and applies to workers aged 21 and over. The National Minimum Wage (NMW) refers to the lower rates that apply to younger workers and apprentices. Both are legally enforceable minimum pay floors set by the UK government and updated every April.',
  },
  {
    question: 'What happens if my employer pays me below minimum wage?',
    answer: 'It is illegal for an employer to pay below the National Minimum Wage. If you are underpaid, you are entitled to backdated pay for up to 6 years. You can report your employer to HMRC via the Acas helpline (0300 123 1100) or gov.uk. HMRC can order your employer to repay you and fine them up to 200% of the underpayment, up to a maximum of £20,000 per worker.',
  },
  {
    question: 'Does the minimum wage apply to all workers?',
    answer: 'The National Minimum Wage applies to most workers including part-time, casual, agency, and zero-hours contract workers. It does not apply to the genuinely self-employed, company directors who are not workers, volunteers, family members living in the employer\'s home, and people on certain government training schemes. Students on work experience placements of less than one year are also exempt.',
  },
  {
    question: 'How does accommodation affect minimum wage calculations?',
    answer: 'If your employer provides accommodation, they can count an accommodation offset of £10.66 per day (2025/26) toward your minimum wage. This means if you are charged more than £10.66 per day for accommodation, the excess counts as a deduction from your pay and reduces your effective hourly rate for minimum wage purposes. If you are charged less than the offset rate, the difference increases your effective pay.',
  },
  {
    question: 'What is the minimum wage for apprentices?',
    answer: 'Apprentices are entitled to the apprentice rate of £7.55 per hour (2025/26) if they are under 19 years old, or if they are 19 or over but in the first year of their apprenticeship. Once an apprentice is both aged 19 or over AND has completed their first year, they become entitled to the minimum wage rate for their age group — which could be the National Living Wage rate of £12.21 if they are 21 or over.',
  },
  {
    question: 'Does the minimum wage increase every year?',
    answer: 'Yes. The UK government increases the National Minimum Wage and National Living Wage every April, usually based on recommendations from the Low Pay Commission. The government has committed to raising the National Living Wage toward two-thirds of median earnings. Rates for 2025/26 rose from £11.44 to £12.21 for the NLW — an increase of 6.7%.',
  },
  {
    question: 'Am I entitled to minimum wage if I am on a zero-hours contract?',
    answer: 'Yes. Zero-hours contract workers are legally entitled to the National Minimum Wage for every hour they work. Your employer cannot pay you less than the minimum wage just because your hours are not guaranteed. You must be paid for all time you are required to be available for work, including time spent waiting between jobs if you cannot leave the workplace.',
  },
];

export const MATERNITY_FAQS: FaqItem[] = [
  {
    question: 'How much is Statutory Maternity Pay (SMP) in 2025/26?',
    answer: 'For 2025/26, Statutory Maternity Pay is paid at two rates: for the first 6 weeks, you receive 90% of your average weekly earnings (AWE) with no upper cap. For the remaining 33 weeks, you receive the lower of £187.18 per week or 90% of your AWE. SMP is paid for up to 39 weeks in total. The remaining 13 weeks of maternity leave are unpaid.',
  },
  {
    question: 'Who is eligible for Statutory Maternity Pay?',
    answer: 'To qualify for SMP you must be an employee (not self-employed), have worked for your employer continuously for at least 26 weeks into the 15th week before your baby is due, and earn on average at least £125 per week (2025/26 lower earnings limit) before tax. You must also still be employed by your employer in the 15th week before the baby is due.',
  },
  {
    question: 'How is average weekly earnings (AWE) calculated for SMP?',
    answer: 'Your average weekly earnings for SMP are calculated by averaging your gross pay over the 8 weeks (or 2 months if paid monthly) before the end of the 15th week before your due date — this period is called the qualifying period. Include all earnings subject to National Insurance, including overtime and bonuses paid in that period.',
  },
  {
    question: 'How much is Statutory Paternity Pay (SPP) in 2025/26?',
    answer: 'Statutory Paternity Pay for 2025/26 is £187.18 per week or 90% of your average weekly earnings — whichever is lower. SPP is paid for up to 2 weeks. To qualify, you must be the biological father, the mother\'s partner, or an adopter; earn at least £125/week on average; and have worked continuously for your employer for 26 weeks by the 15th week before the due date.',
  },
  {
    question: 'What is enhanced maternity pay?',
    answer: 'Enhanced maternity pay is anything your employer pays above the statutory minimum. Some employers offer full pay for a number of weeks, half pay, or a flat payment on top of SMP. Enhanced pay is entirely at the employer\'s discretion — it is not a legal requirement. Check your employment contract or staff handbook to see whether you are entitled to enhanced maternity pay and for how many weeks.',
  },
  {
    question: 'What is Shared Parental Leave (SPL) and Shared Parental Pay (ShPP)?',
    answer: 'Shared Parental Leave allows eligible parents to share up to 50 weeks of leave and up to 37 weeks of Statutory Shared Parental Pay between them, in the year after their baby is born or adopted. ShPP is paid at the same rate as SMP flat rate — £187.18 per week (2025/26) or 90% of AWE, whichever is lower. Both parents must meet eligibility requirements and give notice to their employers.',
  },
  {
    question: 'Is Statutory Maternity Pay taxable?',
    answer: 'Yes. Statutory Maternity Pay, Paternity Pay, Adoption Pay, and Shared Parental Pay are all subject to Income Tax and National Insurance contributions in the same way as regular salary. However, because the amounts are relatively low, many people will not pay Income Tax on their SMP if it falls below the personal allowance of £12,570 for the tax year.',
  },
  {
    question: 'What if I am self-employed or do not qualify for SMP?',
    answer: 'If you are self-employed or do not qualify for Statutory Maternity Pay, you may be eligible for Maternity Allowance instead. Maternity Allowance is paid by the government (not your employer) at up to £187.18 per week (2025/26) for up to 39 weeks, and is available to self-employed people and those who do not meet the SMP employment criteria. You apply for Maternity Allowance through the DWP using form MA1.',
  },
];

export const CHILD_BENEFIT_FAQS: FaqItem[] = [
  {
    question: 'How much is Child Benefit in the UK for 2025/26?',
    answer: 'For 2025/26, Child Benefit is £26.05 per week for the eldest or only child, and £17.25 per week for each additional child. This is paid every 4 weeks directly into a bank account. The rates are usually increased every April in line with inflation.',
  },
  {
    question: 'What is the High Income Child Benefit Charge (HICBC)?',
    answer: 'The High Income Child Benefit Charge (HICBC) is a tax charge that claws back some or all of your Child Benefit if you or your partner earns more than £60,000 per year (adjusted net income). The charge is 1% of the Child Benefit for every £200 earned above £60,000. Once income reaches £80,000, the full Child Benefit amount is charged back. You pay the charge through Self Assessment.',
  },
  {
    question: 'What changed with HICBC in April 2024?',
    answer: 'From 6 April 2024, the HICBC threshold was raised significantly. The charge previously started at £50,000 and the full clawback applied at £60,000. From April 2024 onwards, the charge starts at £60,000 and the full clawback applies at £80,000. This means many families who previously faced a 100% clawback now keep a proportion of their Child Benefit.',
  },
  {
    question: 'Should I still claim Child Benefit if I earn over £80,000?',
    answer: 'Yes — in most cases you should still claim Child Benefit even if your income is above £80,000, but you can then choose to opt out of receiving the payments. Claiming (even without receiving payments) protects your entitlement to National Insurance credits, which count towards your State Pension. This is especially important if one parent is not working. You can opt out of receiving payments via the HMRC Child Benefit portal.',
  },
  {
    question: 'What counts as adjusted net income for HICBC purposes?',
    answer: 'Adjusted net income is your total taxable income minus certain deductions including Gift Aid donations (grossed up) and pension contributions made under net pay or salary sacrifice. It is not the same as your gross salary. Making pension contributions or Gift Aid donations can reduce your adjusted net income below the £60,000 threshold and eliminate or reduce the HICBC.',
  },
  {
    question: 'How can I reduce or avoid the High Income Child Benefit Charge?',
    answer: 'You can reduce the HICBC by lowering your adjusted net income below £60,000. Effective strategies include increasing pension contributions (which reduce your adjusted net income pound for pound), making Gift Aid donations, and salary sacrifice arrangements. If your income is close to the £60,000 threshold, even a small increase in pension contributions can bring you below it and restore your full Child Benefit entitlement.',
  },
  {
    question: 'Is Child Benefit taxable income?',
    answer: 'No. Child Benefit itself is not taxable income and does not need to be declared on a tax return. However, the High Income Child Benefit Charge — which is a separate tax charge — must be declared and paid via Self Assessment if you or your partner has an adjusted net income over £60,000 and receives Child Benefit. You must register for Self Assessment by 5 October after the end of the tax year.',
  },
  {
    question: 'Who decides which partner pays the HICBC?',
    answer: 'The HICBC is paid by whichever partner in the household has the higher adjusted net income, not necessarily the partner who receives the Child Benefit payments. If both partners earn over £60,000, the one with the higher income pays the charge. You must declare the HICBC in your own Self Assessment tax return.',
  },
];

export const SICK_PAY_FAQS: FaqItem[] = [
  {
    question: 'How much is Statutory Sick Pay in the UK?',
    answer: 'For the 2025/26 tax year, Statutory Sick Pay (SSP) is £116.75 per week. It is paid by your employer for the qualifying days you miss due to sickness, calculated by dividing the weekly rate by the number of days you normally work per week (e.g. £23.35 per day for a standard 5-day working week). SSP is subject to standard PAYE Income Tax and National Insurance deductions.',
  },
  {
    question: 'Who is eligible for Statutory Sick Pay?',
    answer: 'To qualify for SSP you must be classed as an employee/worker who has done work for an employer, earn an average of at least £125 per week (the Lower Earnings Limit for 2025/26) before tax, and have been sick for at least 4 consecutive days in a row (including non-working days). You must also tell your employer within their deadline or within 7 days.',
  },
  {
    question: 'What are SSP waiting days?',
    answer: 'Under UK statutory rules, you are not paid SSP for the first 3 "qualifying days" of sickness in a period of incapacity for work (PIW). These are known as waiting days. You start receiving SSP from the 4th qualifying day off work. However, if your sickness period is linked to a previous one within 8 weeks, you do not have to serve waiting days again.',
  },
  {
    question: 'How long can you receive Statutory Sick Pay for?',
    answer: 'You can receive Statutory Sick Pay for up to a maximum of 28 weeks in a single period of incapacity for work or across linked periods. If your sickness continues beyond 28 weeks, your employer must give you an SSP1 form within 7 days of your SSP ending so you can apply for Employment and Support Allowance (ESA) or Universal Credit.',
  },
  {
    question: 'Can my employer pay more than the statutory minimum?',
    answer: 'Yes. Many employers offer an occupational (company/contractual) sick pay scheme that provides higher pay than SSP — such as full pay for a set number of weeks followed by half pay. Your employer cannot pay you less than the statutory minimum (£116.75/wk), so contractual sick pay will either replace SSP (if higher) or top it up to the agreed amount.',
  },
  {
    question: 'How does a linked period of sickness work for SSP?',
    answer: 'If you have multiple periods of sickness of 4 or more days in a row that are 8 weeks or less apart, they are treated as "linked". For linked periods, you only serve the 3 unpaid waiting days once during the first period. Any subsequent linked sickness period pays SSP from day 1, counting towards your overall 28-week maximum allowance.',
  },
];

export const MARRIAGE_ALLOWANCE_FAQS: FaqItem[] = [
  {
    question: 'What is Marriage Allowance?',
    answer: 'Marriage Allowance allows married couples and civil partners to transfer 10% of their standard Personal Allowance (£1,260) to their spouse or civil partner. This reduces the higher-earning partner’s Income Tax bill by up to £252 per year. It applies across England, Scotland, Wales, and Northern Ireland.',
  },
  {
    question: 'Who is eligible for Marriage Allowance?',
    answer: 'To be eligible: 1) You must be married or in a registered civil partnership (cohabiting couples do not qualify); 2) One partner must have an income below the Personal Allowance (£12,570 in 2025/26), meaning they do not pay Income Tax; 3) The other partner must pay Income Tax at the Basic Rate (income between £12,571 and £50,270 in England/Wales/NI, or between £12,571 and £43,662 in Scotland). If either partner pays higher rate or additional rate tax, you cannot claim.',
  },
  {
    question: 'How much can Marriage Allowance save me?',
    answer: 'For the 2025/26 tax year, transferring £1,260 of Personal Allowance saves the higher earner £252 per year in Income Tax (£1,260 × 20% basic rate). If the lower earner earns between £11,310 and £12,570, they may pay a small amount of basic rate tax on the excess, but the net household benefit remains positive.',
  },
  {
    question: 'Can I backdate a Marriage Allowance claim?',
    answer: 'Yes! You can backdate your Marriage Allowance claim by up to 4 previous tax years (currently 2021/22, 2022/23, 2023/24, and 2024/25) as long as you were eligible in those years. A successful backdated claim can result in a lump sum tax refund of up to £1,250+ sent directly to the recipient partner by HMRC via cheque or bank transfer.',
  },
  {
    question: 'What happens to Marriage Allowance if we divorce or separate?',
    answer: 'If you divorce, dissolve your civil partnership, or separate permanently, you must notify HMRC to cancel the Marriage Allowance transfer. If you cancel, the transfer will remain in place until the end of the current tax year (5th April), after which both partners will revert to their standard tax codes (1257L). In the event of a partner passing away, the allowance remains for the full tax year.',
  },
  {
    question: 'How does Marriage Allowance change our tax codes?',
    answer: 'Once HMRC approves your claim, both partners’ PAYE tax codes are automatically updated: the transferor (lower earner) receives a tax code ending with "N" (e.g. 1257N, reducing their allowance to £11,310), and the recipient (higher earner) receives a tax code ending with "M" (e.g. 1257M, increasing their allowance to £13,830). The tax saving is applied directly through monthly payroll.',
  },
];

export const SECOND_JOB_FAQS: FaqItem[] = [
  {
    question: 'How much tax do I pay on a second job in the UK?',
    answer: 'In the UK, you do not pay extra tax simply for having a second job. Instead, your tax is based on your total combined earnings across all employments. Because your full tax-free Personal Allowance (£12,570 in 2025/26) is usually applied to your primary/main job, all earnings from your second job are generally taxed from the very first pound at the basic rate of 20% (under a BR tax code) or at 40% (under a D0 code) if your combined income exceeds £50,270.',
  },
  {
    question: 'What is a BR tax code?',
    answer: 'A BR (Basic Rate) tax code tells your second employer to deduct Income Tax at a flat 20% on all earnings, without applying any tax-free Personal Allowance. It is the standard PAYE tax code assigned to secondary employments and pensions when your primary job already utilises your full £12,570 Personal Allowance. In Scotland, the equivalent is SBR (20%).',
  },
  {
    question: 'Can I split my Personal Allowance between two jobs?',
    answer: 'Yes. If your main job earns less than the tax-free Personal Allowance (£12,570), you can ask HMRC to split your tax-free allowance across both jobs so you do not overpay tax during the year. For instance, if Job 1 pays £8,000, HMRC can allocate £8,000 of allowance to Job 1 (tax code 800L) and the remaining £4,570 to Job 2 (tax code 457L). You can request this via your online HMRC Personal Tax Account.',
  },
  {
    question: 'Will a second job push me into a higher tax bracket?',
    answer: 'Yes, if your combined earnings across both jobs exceed the UK higher rate threshold (£50,270 in England, Wales, and Northern Ireland, or £43,662 in Scotland for the 42% band). Only the portion of your combined income above the threshold is taxed at the higher 40% (or 42%) rate; the earnings below the threshold continue to be taxed at the basic rate.',
  },
  {
    question: 'Is National Insurance calculated separately for each job?',
    answer: 'Yes! Unlike Income Tax (which is calculated cumulatively on total annual earnings), Employee Class 1 National Insurance is calculated per job and per pay period. Each separate employment has its own Primary Threshold (£12,570/year or £242/week). If you earn under £12,570 in your second job, you pay £0 National Insurance on those secondary earnings, provided the employers are separate and not financially linked.',
  },
  {
    question: 'What happens if I earn over £100,000 combined across two jobs?',
    answer: 'If your total combined income from all jobs exceeds £100,000, you will be affected by the UK Personal Allowance taper: you lose £1 of your £12,570 tax-free Personal Allowance for every £2 of adjusted net income above £100,000. This creates an effective 60% marginal tax rate on income between £100,000 and £125,140 (or 67.5% in Scotland). If this occurs, HMRC will adjust your main job tax code or require a Self Assessment tax return.',
  },
];

export const SALARY_COMPARISON_FAQS: FaqItem[] = [
  {
    question: 'How do I compare two or more UK salary job offers?',
    answer: 'When comparing job offers in the UK, evaluating the headline gross salary alone can be misleading due to progressive tax bands, National Insurance thresholds, pension deductions, and student loan repayment plans. A £5,000 gross salary increase in the higher-rate bracket (£50,270+) yields significantly less take-home pay than the same £5,000 increase in the basic-rate bracket. Use this calculator to compare exact net monthly take-home, effective tax rates, and retention percentages side-by-side.',
  },
  {
    question: 'What is the "Retention Rate" on a salary increase?',
    answer: 'The Retention Rate (or net take-home efficiency) represents the percentage of additional gross earnings that you actually keep in your pocket after Income Tax, National Insurance, student loans, and pension contributions. For basic rate taxpayers without student loans, the retention rate is typically ~72% (20% tax + 8% NI). For higher rate taxpayers, it drops to ~58% (40% tax + 2% NI), or ~49% if repaying a Plan 2/Plan 5 student loan (9% repayment).',
  },
  {
    question: 'Why does a £10,000 pay rise result in less than £6,000 extra take-home pay?',
    answer: 'If the pay rise crosses or sits above the UK Higher Rate threshold (£50,270), each additional £1 is subject to 40% Income Tax and 2% National Insurance (a combined 42% marginal deduction). If you also repay a student loan (9%) and contribute 5% to workplace pension, total marginal deductions reach 56%, leaving you with £440 net for every £1,000 extra earned (£4,400 net on a £10k rise).',
  },
  {
    question: 'How does the £100,000 tax trap impact salary comparisons?',
    answer: 'Between £100,000 and £125,140, the tax-free Personal Allowance is reduced by £1 for every £2 of income earned above £100k. This creates an effective 60% marginal income tax rate (plus 2% NI and 9% student loan, totaling up to 71% marginal deduction). Comparing salaries across this threshold allows you to evaluate tax-efficient strategies such as salary sacrifice pension contributions.',
  },
];

export const PAY_FREQUENCY_FAQS: FaqItem[] = [
  {
    question: 'How do you convert annual salary to hourly, weekly, and monthly rates in the UK?',
    answer: 'In the UK standard payroll convention: Annual salary is divided by 12 for Monthly pay; divided by 52 for Weekly pay; divided by 260 for Daily pay (based on 5 working days per week); and divided by 1,950 for Hourly pay (based on 37.5 hours per week across 52 weeks). Our converter calculates both gross pay and estimated net take-home pay across all frequencies.',
  },
  {
    question: 'What is the difference between 4-weekly and monthly pay?',
    answer: 'Monthly pay is paid 12 times a year on a set calendar date (e.g. 28th of the month or last Friday), meaning each payment covers an average of 4.33 weeks. 4-Weekly pay is paid every 28 days, resulting in 13 pay periods per year. Although each 4-weekly paycheck is slightly lower (Gross ÷ 13), you receive an extra 13th paycheck during the year.',
  },
  {
    question: 'Is National Insurance calculated per pay period or annually?',
    answer: 'Employee Class 1 National Insurance is calculated per pay period (weekly, monthly, or 4-weekly) and is non-cumulative, whereas Income Tax is cumulative over the tax year. The primary NI threshold is £1,048/month, £242/week, or £12,570/year.',
  },
];











