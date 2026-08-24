/**
 * PayWise UK - Central Calculator Content, SEO & FAQ Configuration
 * 
 * Centralised, comprehensive British-English copy, SEO metadata, structured FAQ entries,
 * practical examples, assumptions, and internal linking structures for all UK financial calculators.
 * 
 * VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.
 */

export const CALCULATOR_CONTENT_METADATA = {
  lastReviewed: 'March 2026',
  disclaimer: 'PayWise UK provides estimates for general information only. It is not tax, financial, mortgage, investment, legal, accounting, payroll or employment advice. Check important figures with HMRC, your lender, a regulated financial adviser, accountant or other qualified professional.',
  adminNotice: 'VERIFY AGAINST OFFICIAL UK SOURCES BEFORE PRODUCTION.',
};

export interface CalculatorFaqItem {
  question: string;
  answer: string;
}

export interface CalculatorPageContent {
  slug: string;
  canonicalUrl: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  directAnswerParagraph: string;
  howItWorks: {
    title: string;
    paragraphs: string[];
    steps?: { stepNumber: number; title: string; description: string }[];
  };
  assumptions: string[];
  practicalExample: {
    title: string;
    scenario: string;
    breakdown: { label: string; value: string }[];
    conclusion: string;
  };
  faqs: CalculatorFaqItem[];
  relatedCalculators: {
    title: string;
    url: string;
    description: string;
  }[];
}

export const CALCULATOR_CONTENT_CONFIG: Record<string, CalculatorPageContent> = {
  // A. INCOME TAX CALCULATOR
  income_tax: {
    slug: 'income-tax-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/income-tax-calculator',
    seoTitle: 'Income Tax Calculator UK | Estimate Your Tax',
    metaDescription: 'Estimate UK Income Tax from your annual salary, tax region, tax code, pension and other taxable income. Results are estimates only.',
    h1: 'Income Tax Calculator UK',
    primaryKeyword: 'income tax calculator UK',
    secondaryKeywords: [
      'how much Income Tax will I pay UK',
      'salary tax calculator UK',
      'Income Tax on salary UK',
      'Scottish Income Tax calculator',
    ],
    directAnswerParagraph:
      'This UK Income Tax calculator estimates how much Income Tax you will pay on your annual employment earnings, bonuses and other taxable income. It models standard HMRC tax bands for England, Wales, Northern Ireland and Scotland, accounting for tax codes, pension contributions and salary sacrifice.',
    howItWorks: {
      title: 'How UK Income Tax is Estimated',
      paragraphs: [
        'In the UK, Income Tax is charged on taxable earnings that exceed your tax-free Personal Allowance (£12,570 for the 2024/25 and 2025/26 tax years). Earnings above the allowance are taxed in progressive bands according to where you live in the UK.',
        'If your adjusted net income exceeds £100,000, your Personal Allowance is reduced by £1 for every £2 of income above £100,000, disappearing completely at £125,140. This creates an effective 60% marginal tax rate on income between £100,000 and £125,140.',
        'Workplace pension contributions and salary sacrifice reduce your taxable earnings before Income Tax is applied, lowering your total tax bill and helping preserve your Personal Allowance.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate Gross Income',
          description: 'Sum salary, bonuses and taxable perks, then subtract any pre-tax salary sacrifice deductions.',
        },
        {
          stepNumber: 2,
          title: 'Apply Personal Allowance & Reliefs',
          description: 'Deduct your statutory Personal Allowance (adjusted for your tax code, marriage allowance or high-income taper) and pension relief.',
        },
        {
          stepNumber: 3,
          title: 'Apply Regional Tax Bands',
          description: 'Calculate tax within each band: Basic Rate (20%), Higher Rate (40%), and Additional Rate (45%) in England/Wales/NI, or the 6 Scottish bands.',
        },
      ],
    },
    assumptions: [
      'Calculations assume standard UK PAYE tax thresholds for the selected tax year.',
      'A standard tax code of 1257L provides a baseline £12,570 tax-free allowance before any tapering.',
      'Pension contributions via salary sacrifice or net pay reduce taxable income before tax calculation.',
      'Relief-at-source pensions extend the basic rate tax band rather than directly reducing gross taxable pay on your payslip.',
      'Does not account for non-domiciled tax status, foreign earnings, or complex allowable business expenses.',
    ],
    practicalExample: {
      title: 'Practical Example: £45,000 Salary with 5% Pension Contribution',
      scenario: 'An employee in England earns a gross salary of £45,000 per year with standard tax code 1257L and contributes 5% (£2,250) into a workplace salary sacrifice pension.',
      breakdown: [
        { label: 'Gross Annual Salary', value: '£45,000' },
        { label: 'Salary Sacrifice Pension (5%)', value: '-£2,250' },
        { label: 'Adjusted Gross Taxable Pay', value: '£42,750' },
        { label: 'Personal Allowance (1257L)', value: '£12,570' },
        { label: 'Taxable Income in Basic Band (20%)', value: '£30,180' },
        { label: 'Estimated Annual Income Tax', value: '£6,036.00' },
        { label: 'Estimated Monthly Income Tax', value: '£503.00' },
        { label: 'Effective Income Tax Rate', value: '13.41% of gross' },
      ],
      conclusion: 'By contributing £2,250 via salary sacrifice, the worker saves £450 in Income Tax and £180 in employee National Insurance compared to taking the full salary as cash.',
    },
    faqs: [
      {
        question: 'How much Income Tax will I pay on my salary in the UK?',
        answer: 'You pay 0% on earnings within your tax-free Personal Allowance (£12,570). In England, Wales and Northern Ireland, earnings between £12,571 and £50,270 are taxed at 20% (Basic Rate), earnings between £50,271 and £125,140 are taxed at 40% (Higher Rate), and earnings over £125,140 are taxed at 45% (Additional Rate). In Scotland, a 6-band progressive system applies with rates from 19% to 48%.',
      },
      {
        question: 'What is the standard UK Personal Allowance for 2025/26?',
        answer: 'The standard UK Personal Allowance is £12,570 for the 2024/25 and 2025/26 tax years. This means you can earn up to £12,570 per year before paying any Income Tax, represented by the standard tax code 1257L.',
      },
      {
        question: 'What is the 60% tax trap between £100,000 and £125,140?',
        answer: 'When your adjusted net income exceeds £100,000, your Personal Allowance is reduced by £1 for every £2 earned above £100,000. This taper adds an effective 20% tax penalty on top of the 40% Higher Rate, creating a combined 60% effective marginal Income Tax rate on the slice of earnings between £100,000 and £125,140.',
      },
      {
        question: 'How do Scottish Income Tax bands differ from the rest of the UK?',
        answer: 'Scotland operates a devolved 6-band system: Starter Rate (19%), Basic Rate (20%), Intermediate Rate (21%), Higher Rate (42%), Advanced Rate (45%), and Top Rate (48%). Scottish taxpayers paying above £28,850 generally pay slightly more Income Tax than equivalent earners in England, Wales, or Northern Ireland.',
      },
      {
        question: 'How do pension contributions reduce my Income Tax bill?',
        answer: 'Workplace pension contributions made via salary sacrifice or net pay reduce your taxable income before Income Tax is calculated. For relief-at-source pensions (such as a personal SIPP), your provider claims 20% basic rate relief directly, and higher rate taxpayers claim the remaining 20% or 25% tax relief through an HMRC Self Assessment tax return or tax code adjustment.',
      },
      {
        question: 'What is the difference between Income Tax and National Insurance?',
        answer: 'Income Tax is a progressive tax on all taxable earnings, pensions, savings interest and dividends that funds general government spending. National Insurance is a separate statutory contribution deducted from earned employment or self-employed profits that builds entitlement to the UK State Pension and specific state benefits.',
      },
      {
        question: 'How does Marriage Allowance affect my Income Tax?',
        answer: 'Marriage Allowance allows a spouse or civil partner who earns less than the Personal Allowance (£12,570) to transfer £1,260 of their unused allowance to their higher-earning partner, provided the recipient pays tax at the Basic Rate. This can reduce the recipient partner\'s annual Income Tax bill by up to £252.',
      },
      {
        question: 'Can bonuses push me into a higher Income Tax bracket?',
        answer: 'Yes, bonuses are treated as standard employment earnings and taxed via PAYE. If a bonus pushes your cumulative earnings over £50,270 (or £100,000), the portion exceeding that threshold is taxed at the higher marginal rate (40% or 60% effective rate). Only the earnings above the threshold are taxed at the higher rate, not your entire salary.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'See full net payslip breakdown including Income Tax, National Insurance, pension and student loans.',
      },
      {
        title: 'National Insurance Calculator',
        url: '/national-insurance-calculator',
        description: 'Estimate your employee Class 1 National Insurance contributions by pay frequency.',
      },
      {
        title: 'Tax Code Calculator',
        url: '/tax-code-calculator',
        description: 'Understand what your HMRC tax code numbers and letters mean for your tax-free allowance.',
      },
      {
        title: 'Salary Sacrifice Calculator',
        url: '/salary-sacrifice-calculator',
        description: 'Model tax savings on workplace pension contributions, cycle to work, and electric vehicle schemes.',
      },
    ],
  },

  // B. NATIONAL INSURANCE CALCULATOR
  national_insurance: {
    slug: 'national-insurance-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/national-insurance-calculator',
    seoTitle: 'National Insurance Calculator UK | Estimate Contributions',
    metaDescription: 'Estimate employee National Insurance contributions from your salary and pay frequency in the UK. Results are for general guidance only.',
    h1: 'National Insurance Calculator UK',
    primaryKeyword: 'National Insurance calculator UK',
    secondaryKeywords: [
      'employee NI calculator UK',
      'National Insurance on salary calculator',
      'NI contributions calculator UK',
    ],
    directAnswerParagraph:
      'This UK National Insurance calculator estimates employee Class 1 National Insurance contributions across annual, monthly and weekly pay periods. It reflects the 8% main rate between the Primary Threshold (£12,570) and Upper Earnings Limit (£50,270), and the 2% rate above the Upper Earnings Limit.',
    howItWorks: {
      title: 'How Employee National Insurance is Estimated',
      paragraphs: [
        'Class 1 National Insurance is calculated per pay period (e.g. weekly or monthly) rather than cumulatively across the whole tax year, unless you are assessed under company director annual rules.',
        'Earnings below the Lower Earnings Limit (£6,396/year or £123–£125/week) accrue no NI credits. Earnings between the Lower Earnings Limit and Primary Threshold (£12,570/year or £242/week) are charged at 0% but protect your statutory State Pension qualifying record.',
        'Earnings between £12,570 and £50,270 are charged at the main rate of 8%. Earnings above the Upper Earnings Limit of £50,270 are charged at 2%.',
      ],
    },
    assumptions: [
      'Assumes standard Class 1 Category A employee National Insurance unless an alternative category is chosen.',
      'Primary Threshold is £12,570 per year (£1,047.50 per month / £241.73 per week).',
      'Upper Earnings Limit is £50,270 per year (£4,189.17 per month / £966.73 per week).',
      'Salary sacrifice arrangements reduce gross pay subject to National Insurance deductions.',
      'Does not calculate Class 2 or Class 4 self-employed National Insurance contributions.',
    ],
    practicalExample: {
      title: 'Practical Example: £36,000 Annual Salary Paid Monthly',
      scenario: 'An employee is paid a monthly salary of £3,000 (£36,000 annually) under Category A.',
      breakdown: [
        { label: 'Gross Monthly Pay', value: '£3,000.00' },
        { label: 'Monthly Primary Threshold (PT)', value: '£1,047.50' },
        { label: 'Earnings Subject to 8% NI', value: '£1,952.50' },
        { label: 'Estimated Monthly National Insurance', value: '£156.20' },
        { label: 'Estimated Annual National Insurance', value: '£1,874.40' },
        { label: 'Effective NI Rate', value: '5.21% of gross' },
      ],
      conclusion: 'The employee pays £156.20 per month in employee Class 1 NI, retaining £2,843.80 before Income Tax and pension deductions.',
    },
    faqs: [
      {
        question: 'What is the employee National Insurance rate for 2025/26?',
        answer: 'For the 2024/25 and 2025/26 tax years, the main rate of Class 1 employee National Insurance is 8% on earnings between £12,570 and £50,270 per year. Earnings above £50,270 are subject to a 2% rate.',
      },
      {
        question: 'At what salary do I start paying National Insurance?',
        answer: 'You start paying employee Class 1 National Insurance once your earnings exceed the Primary Threshold of £12,570 per year (equivalent to £1,047.50 per month or £241.73 per week).',
      },
      {
        question: 'Do pension contributions reduce my National Insurance?',
        answer: 'Only salary sacrifice pension contributions reduce National Insurance. Personal pension contributions or standard relief-at-source contributions do not reduce your National Insurance liability.',
      },
      {
        question: 'Do I pay National Insurance after reaching State Pension age?',
        answer: 'No, employees who have reached UK State Pension age do not pay Class 1 employee National Insurance on their earnings (Category C), although employers must continue paying employer National Insurance.',
      },
      {
        question: 'Is National Insurance calculated per pay period or per year?',
        answer: 'For standard employees, National Insurance is calculated per pay period (weekly or monthly) with no end-of-year reconciliation. For company directors, NI is calculated on an annualised cumulative basis.',
      },
      {
        question: 'What is the Lower Earnings Limit for National Insurance?',
        answer: 'The Lower Earnings Limit (LEL) is £6,396 per year (£125 per week in 2025/26). If you earn between the LEL and the Primary Threshold (£12,570), you pay 0% NI but still earn National Insurance credits towards your UK State Pension.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'See your complete net pay after Income Tax, NI, pension and student loans.',
      },
      {
        title: 'Income Tax Calculator',
        url: '/income-tax-calculator',
        description: 'Calculate your annual and monthly Income Tax liability across UK regions.',
      },
      {
        title: 'Employer National Insurance Calculator',
        url: '/employer-national-insurance-calculator',
        description: 'Calculate employer secondary Class 1 contributions and total employment costs.',
      },
    ],
  },

  // C. TAX CODE CALCULATOR
  tax_code: {
    slug: 'tax-code-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/tax-code-calculator',
    seoTitle: 'Tax Code Calculator UK | Understand Your Tax Code',
    metaDescription: 'Use this UK tax code calculator to understand what common tax-code letters and numbers may mean for your estimated tax-free allowance.',
    h1: 'Tax Code Calculator UK',
    primaryKeyword: 'tax code calculator UK',
    secondaryKeywords: [
      'what does my tax code mean UK',
      '1257L tax code calculator',
      'tax code allowance calculator UK',
    ],
    directAnswerParagraph:
      'This UK tax code calculator decodes common HMRC PAYE tax code numbers and letters (such as 1257L, BR, S1257L, C1257L, K codes, and 0T). It explains your estimated tax-free Personal Allowance and how your code affects monthly take-home pay.',
    howItWorks: {
      title: 'Understanding UK Tax Code Numbers and Letters',
      paragraphs: [
        'A UK tax code is supplied by HMRC to your employer or pension provider so they can deduct the correct amount of Income Tax through PAYE.',
        'The numbers in your tax code indicate how much tax-free income you can earn in a year. Multiplying the numeric portion by 10 gives your statutory annual tax-free allowance (for example, 1257 means £12,570).',
        'The letters communicate specific circumstances: \'L\' indicates standard personal allowance, \'S\' denotes Scottish tax bands, \'C\' denotes Welsh tax rates, \'M\' and \'N\' signify Marriage Allowance transfers, and \'BR\' taxes all earnings at 20% with zero personal allowance.',
      ],
    },
    assumptions: [
      'Calculations are estimates based on standard HMRC tax-code formatting conventions.',
      'Only HMRC can officially determine or alter your statutory tax code.',
      'Special emergency tax codes (W1, M1, or X) operate on a non-cumulative pay-period basis.',
      'K codes represent negative allowances where untaxed income or benefits in kind exceed your Personal Allowance.',
      'This calculator cannot confirm your official HMRC payroll record or guarantee a tax refund.',
    ],
    practicalExample: {
      title: 'Practical Example: Decoding Tax Code 1257L vs BR',
      scenario: 'An individual with a main job on code 1257L takes on a second job assigned tax code BR on an additional £10,000 salary.',
      breakdown: [
        { label: 'Primary Job Tax Code', value: '1257L (Full £12,570 Personal Allowance)' },
        { label: 'Second Job Tax Code', value: 'BR (Basic Rate - 0 Personal Allowance)' },
        { label: 'Second Job Gross Salary', value: '£10,000' },
        { label: 'Second Job Income Tax (20% BR)', value: '£2,000.00' },
        { label: 'Second Job Net Take-Home', value: '£8,000.00 (before NI)' },
      ],
      conclusion: 'Code BR ensures the worker does not receive a duplicate Personal Allowance on their secondary income, preventing an underpayment of Income Tax.',
    },
    faqs: [
      {
        question: 'What does the tax code 1257L mean?',
        answer: '1257L is the standard tax code for most UK employees with one job and no complex benefits. The numbers (1257) represent the £12,570 tax-free Personal Allowance, and the letter \'L\' means you are entitled to the standard basic allowance.',
      },
      {
        question: 'What does a BR tax code mean?',
        answer: 'BR stands for Basic Rate. It means all income from that job or pension is taxed at the flat 20% Basic Rate with zero tax-free Personal Allowance. It is commonly applied to second jobs or pensions where your full Personal Allowance is already used elsewhere.',
      },
      {
        question: 'What does a K tax code mean?',
        answer: 'A K code (e.g. K450) indicates that your taxable benefits in kind (such as a company car or health insurance) or untaxed income from previous years exceed your Personal Allowance. The numbers represent an amount added to your taxable income rather than subtracted.',
      },
      {
        question: 'What do the letters S and C mean in a tax code?',
        answer: 'The prefix \'S\' (e.g. S1257L) indicates that you are a Scottish resident and your income will be taxed under devolved Scottish Income Tax bands. The prefix \'C\' (e.g. C1257L) denotes a Welsh taxpayer paying Welsh Rates of Income Tax.',
      },
      {
        question: 'What do M and N mean in a tax code?',
        answer: 'The letter \'M\' means you have received 10% of your partner\'s Personal Allowance (£1,260) through Marriage Allowance. The letter \'N\' means you have transferred £1,260 of your Personal Allowance to your partner.',
      },
      {
        question: 'What does an emergency tax code look like?',
        answer: 'Emergency tax codes often appear as 1257L W1, 1257L M1, or 1257L X. They mean your tax is calculated only on what you are paid in the current pay period (week or month) without taking account of what you have earned earlier in the tax year.',
      },
      {
        question: 'What does tax code 0T mean?',
        answer: 'Tax code 0T means you have no Personal Allowance remaining. This happens if your previous employer did not provide a P45, your allowance has been fully used, or your income exceeds £125,140.',
      },
      {
        question: 'How can I change an incorrect tax code?',
        answer: 'You can view and update your tax code online through your HMRC Personal Tax Account or via the HMRC mobile app. You can also contact HMRC directly or notify your employer\'s payroll department.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Income Tax Calculator',
        url: '/income-tax-calculator',
        description: 'See exact Income Tax amounts across tax codes and regional bands.',
      },
      {
        title: 'Second Job Tax Calculator',
        url: '/second-job-tax-calculator',
        description: 'Understand how multiple jobs and BR or 0T tax codes affect your take-home pay.',
      },
      {
        title: 'Marriage Allowance Calculator',
        url: '/marriage-allowance-calculator',
        description: 'Calculate savings from transferring allowance with M and N tax codes.',
      },
    ],
  },

  // D. EMPLOYER NATIONAL INSURANCE CALCULATOR
  employer_ni: {
    slug: 'employer-national-insurance-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/employer-national-insurance-calculator',
    seoTitle: 'Employer National Insurance Calculator UK | Estimate Cost',
    metaDescription: 'Estimate employer National Insurance contributions and total employment cost from a UK employee salary. Results are estimates only.',
    h1: 'Employer National Insurance Calculator UK',
    primaryKeyword: 'employer National Insurance calculator UK',
    secondaryKeywords: [
      'employer NI calculator UK',
      'employer National Insurance contributions calculator',
      'total employment cost calculator UK',
    ],
    directAnswerParagraph:
      'This UK Employer National Insurance calculator models secondary Class 1 employer contributions and total employment costs for businesses. It includes updated Autumn Budget rules: 15% employer NI rate above the £5,000 Secondary Threshold from April 2025 and the £10,500 Employment Allowance.',
    howItWorks: {
      title: 'How Employer National Insurance is Estimated',
      paragraphs: [
        'Employers in the UK pay Class 1 Secondary National Insurance on earnings paid to employees above the Secondary Threshold.',
        'From 6 April 2025, the employer NI rate is 15.0% on earnings above £5,000 per year (£96 per week / £417 per month). For the 2024/25 tax year, the rate was 13.8% above £9,100.',
        'Eligible businesses can offset their employer NI liability using the statutory Employment Allowance (£10,500 per year from April 2025, previously £5,000). Total employment cost comprises gross salary, employer NI, and employer workplace pension contributions.',
      ],
    },
    assumptions: [
      'Applies the 15.0% rate above £5,000 Secondary Threshold for 2025/26 (13.8% above £9,100 for 2024/25).',
      'Employment Allowance of £10,500 per year can be applied to reduce total employer NI for eligible employers.',
      'Workplace auto-enrolment employer pension contributions are modelled at statutory minimum 3% of qualifying earnings (or custom employer rate).',
      'Does not include employer liability insurance, equipment, recruitment or overhead costs.',
    ],
    practicalExample: {
      title: 'Practical Example: Employing a Staff Member on £35,000 in 2025/26',
      scenario: 'A business pays an employee £35,000 gross salary and provides a statutory 3% employer pension contribution (£862.80) with no Employment Allowance.',
      breakdown: [
        { label: 'Employee Gross Salary', value: '£35,000.00' },
        { label: 'Secondary Threshold', value: '£5,000.00' },
        { label: 'Earnings Subject to 15% Employer NI', value: '£30,000.00' },
        { label: 'Employer Class 1 NI (15%)', value: '£4,500.00' },
        { label: 'Employer Pension Contribution (3%)', value: '£862.80' },
        { label: 'Total Annual Employment Cost', value: '£40,362.80' },
        { label: 'Total Monthly Employment Cost', value: '£3,363.57' },
      ],
      conclusion: 'The total cost to employ a worker on £35,000 is approximately £40,362.80 per year, representing an overhead of 15.3% above gross salary.',
    },
    faqs: [
      {
        question: 'What is the employer National Insurance rate for 2025/26?',
        answer: 'From 6 April 2025, the standard employer Class 1 National Insurance rate is 15.0% on employee earnings above the Secondary Threshold of £5,000 per year (£417 per month / £96 per week).',
      },
      {
        question: 'What is the Employment Allowance for 2025/26?',
        answer: 'The Employment Allowance is £10,500 per year from 6 April 2025 (increased from £5,000 in 2024/25). It allows eligible businesses and charities to reduce their cumulative employer National Insurance liability by up to £10,500 across the tax year.',
      },
      {
        question: 'Who is eligible for the Employment Allowance?',
        answer: 'Most businesses and charities with employer Class 1 NI liabilities can claim the allowance. However, businesses where the sole employee is also a director (single-director companies) are generally excluded.',
      },
      {
        question: 'Do employers pay National Insurance on employees under 21?',
        answer: 'Employers pay 0% National Insurance on earnings up to the Upper Secondary Threshold (£50,270 per year) for employees aged under 21, and for apprentices aged under 25 on approved apprenticeship programmes.',
      },
      {
        question: 'What is the Apprenticeship Levy?',
        answer: 'The Apprenticeship Levy is a 0.5% charge on UK employers with an annual paybill exceeding £3 million. Employers receive a £15,000 annual allowance to offset against the levy.',
      },
      {
        question: 'How do employer pension contributions affect total employment costs?',
        answer: 'Under UK auto-enrolment rules, employers must contribute at least 3% of qualifying earnings (between £6,240 and £50,270) to an eligible workplace pension scheme, adding to the total cost of employment.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'See the employee side of PAYE deductions and net take-home pay.',
      },
      {
        title: 'National Insurance Calculator',
        url: '/national-insurance-calculator',
        description: 'Calculate employee Class 1 NI contributions by pay frequency.',
      },
      {
        title: 'Salary Sacrifice Calculator',
        url: '/salary-sacrifice-calculator',
        description: 'Model employer NI savings through workplace pension salary sacrifice schemes.',
      },
    ],
  },

  // E. DIVIDEND TAX CALCULATOR
  dividend_tax: {
    slug: 'dividend-tax-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/dividend-tax-calculator',
    seoTitle: 'Dividend Tax Calculator UK | Estimate Dividend Tax',
    metaDescription: 'Estimate UK dividend tax using dividend income, other taxable income and tax region. Results are estimates, not tax advice.',
    h1: 'Dividend Tax Calculator UK',
    primaryKeyword: 'dividend tax calculator UK',
    secondaryKeywords: [
      'how much tax on dividends UK',
      'dividend tax rate calculator UK',
      'dividend income tax calculator UK',
    ],
    directAnswerParagraph:
      'This UK Dividend Tax calculator estimates how much tax you will pay on dividend income from limited companies, investment funds or individual UK shares. It accounts for the statutory £500 Dividend Allowance and tax bands across the Basic (8.75%), Higher (33.75%), and Additional (39.35%) rates.',
    howItWorks: {
      title: 'How UK Dividend Tax is Estimated',
      paragraphs: [
        'Dividends are taxed as the top slice of income after non-savings employment, pension, and property income. Your Personal Allowance (£12,570) is allocated first against other taxable income.',
        'Every individual receives a £500 tax-free Dividend Allowance. Dividends within this allowance are taxed at 0%, but they still count towards your total income to determine which tax band subsequent dividends fall into.',
        'Dividend tax rates are 8.75% for Basic Rate taxpayers (income up to £50,270), 33.75% for Higher Rate taxpayers (£50,271 to £125,140), and 39.35% for Additional Rate taxpayers (over £125,140). Scottish dividend tax rates match UK-wide rates.',
      ],
    },
    assumptions: [
      'Assumes the statutory £500 Dividend Allowance applies for the selected tax year.',
      'Dividends are treated as the top slice of income above employment earnings and other taxable income.',
      'Does not calculate Corporation Tax already paid by the distributing company on company profits.',
      'Does not provide advice on optimal director salary-to-dividend extraction ratios.',
    ],
    practicalExample: {
      title: 'Practical Example: £12,570 Director Salary + £30,000 Dividends',
      scenario: 'A company director in England draws a salary of £12,570 (using their full Personal Allowance) and takes £30,000 in dividends.',
      breakdown: [
        { label: 'Salary (covers Personal Allowance)', value: '£12,570 (Tax: £0)' },
        { label: 'Total Dividends', value: '£30,000' },
        { label: 'Dividend Allowance (0%)', value: '£500 (Tax: £0)' },
        { label: 'Taxable Dividends in Basic Band (8.75%)', value: '£29,500' },
        { label: 'Estimated Dividend Tax (8.75% of £29,500)', value: '£2,581.25' },
        { label: 'Total Net Income from Salary + Dividends', value: '£39,988.75' },
        { label: 'Effective Tax Rate on Dividends', value: '8.60%' },
      ],
      conclusion: 'The director pays £2,581.25 in dividend tax across the year, typically remitted via Self Assessment by 31 January following the tax year end.',
    },
    faqs: [
      {
        question: 'What are the UK dividend tax rates for 2025/26?',
        answer: 'For 2024/25 and 2025/26, UK dividend tax rates are 8.75% (Basic Rate), 33.75% (Higher Rate), and 39.35% (Additional Rate). These rates apply across England, Wales, Northern Ireland, and Scotland.',
      },
      {
        question: 'How much is the tax-free Dividend Allowance?',
        answer: 'The tax-free Dividend Allowance is £500 per tax year. You pay 0% tax on the first £500 of dividend income you receive in a tax year.',
      },
      {
        question: 'Do I pay National Insurance on dividend income?',
        answer: 'No, National Insurance is not charged on dividend income. This makes dividends a common component of remuneration for small business owner-directors, alongside Corporation Tax.',
      },
      {
        question: 'Do dividends inside an ISA or pension pay tax?',
        answer: 'No, dividends received on shares or funds held inside a Stocks and Shares ISA or a registered pension (such as a SIPP) are completely free from UK Income Tax and dividend tax, and do not use up your £500 Dividend Allowance.',
      },
      {
        question: 'How do I report and pay dividend tax to HMRC?',
        answer: 'If your dividend income is between £500 and £10,000, you can contact HMRC to adjust your PAYE tax code. If your dividend income exceeds £10,000, you must register for and complete a Self Assessment tax return.',
      },
      {
        question: 'How are dividends ordered against other income?',
        answer: 'HMRC stacks your income in a specific order: first employment and pension income (which absorbs your Personal Allowance), then savings interest, and finally dividends as the top slice.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Income Tax Calculator',
        url: '/income-tax-calculator',
        description: 'Calculate tax on employment salary and understand income stacking.',
      },
      {
        title: 'Capital Gains Tax Calculator',
        url: '/capital-gains-tax-calculator',
        description: 'Estimate tax when selling shares or company equity.',
      },
      {
        title: 'ISA Calculator',
        url: '/isa-calculator',
        description: 'Model tax-free growth in a Stocks and Shares ISA.',
      },
    ],
  },

  // F. MORTGAGE CALCULATOR
  mortgage: {
    slug: 'mortgage-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/mortgage-calculator',
    seoTitle: 'Mortgage Calculator UK | Monthly Repayment Estimate',
    metaDescription: 'Calculate estimated UK mortgage repayments from property price, deposit, interest rate and mortgage term. See monthly repayment estimates.',
    h1: 'Mortgage Calculator UK',
    primaryKeyword: 'mortgage calculator UK',
    secondaryKeywords: [
      'monthly mortgage repayment calculator UK',
      'mortgage payments calculator UK',
      'repayment mortgage calculator UK',
    ],
    directAnswerParagraph:
      'This UK Mortgage Calculator estimates monthly and annual mortgage repayments based on property price, deposit, interest rate, term length and mortgage type (repayment or interest-only). It generates an annual amortisation breakdown and models the impact of regular overpayments.',
    howItWorks: {
      title: 'How Mortgage Repayments are Calculated',
      paragraphs: [
        'For a capital-and-interest repayment mortgage, each monthly payment covers both interest accrued on the outstanding balance and a portion of the loan principal, ensuring the mortgage is fully paid off by the end of the term.',
        'Loan-to-value (LTV) is the percentage of the property price you borrow. A larger deposit lowers your LTV ratio (e.g. 75% or 60%), which typically unlocks lower interest rates from UK mortgage lenders.',
        'For an interest-only mortgage, monthly payments cover only interest charges, meaning the original loan amount remains unchanged and must be repaid via a separate repayment vehicle.',
      ],
    },
    assumptions: [
      'Standard repayment calculations use the standard compound monthly amortisation formula.',
      'Assumes a fixed interest rate throughout the selected term for illustration purposes.',
      'Does not include stamp duty (SDLT/LBTT/LTT), solicitor conveyancing fees, survey costs, or lender arrangement fees unless added to the loan.',
      'Overpayment models assume no early repayment charges (ERCs) apply to your mortgage deal.',
    ],
    practicalExample: {
      title: 'Practical Example: £300,000 Property with 15% Deposit at 4.5% Interest',
      scenario: 'A buyer purchases a home for £300,000 with a £45,000 deposit (85% LTV), borrowing £255,000 over a 25-year repayment mortgage at a fixed 4.5% interest rate.',
      breakdown: [
        { label: 'Property Purchase Price', value: '£300,000.00' },
        { label: 'Deposit (15%)', value: '£45,000.00' },
        { label: 'Mortgage Loan Amount (85% LTV)', value: '£255,000.00' },
        { label: 'Estimated Monthly Repayment', value: '£1,417.34' },
        { label: 'Annual Repayment Amount', value: '£17,008.08' },
        { label: 'Total Interest Paid Over 25 Years', value: '£170,202.00' },
        { label: 'Total Cost of Mortgage (Principal + Interest)', value: '£425,202.00' },
      ],
      conclusion: 'Paying an extra £100 per month in overpayments would save approximately £23,400 in interest and shorten the mortgage term by 2 years and 8 months.',
    },
    faqs: [
      {
        question: 'How is a monthly mortgage repayment calculated?',
        answer: 'Monthly repayments on a capital repayment mortgage are calculated using the compound loan amortisation formula: M = P[r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate (annual rate / 12), and n is the total number of monthly payments (years × 12).',
      },
      {
        question: 'What is Loan-to-Value (LTV) and why does it matter?',
        answer: 'Loan-to-Value (LTV) is the percentage ratio of your mortgage loan relative to the property\'s purchase price. For example, borrowing £240,000 on a £300,000 home is an 80% LTV. Lower LTV tiers (such as 60% or 75%) represent less risk to lenders and generally offer the lowest fixed interest rates.',
      },
      {
        question: 'What is the difference between repayment and interest-only mortgages?',
        answer: 'On a repayment mortgage, each monthly payment pays off all interest plus part of the capital loan, leaving a £0 balance at the end of the term. On an interest-only mortgage, payments cover only the monthly interest; the initial loan amount is not reduced and must be paid in full at the end of the term.',
      },
      {
        question: 'Can I overpay my mortgage in the UK?',
        answer: 'Most UK fixed-rate mortgages permit overpayments of up to 10% of the outstanding mortgage balance each year without incurring Early Repayment Charges (ERCs). Overpaying reduces the principal balance, saving substantial interest over the term.',
      },
      {
        question: 'How do interest rates affect my monthly mortgage payment?',
        answer: 'Because mortgage loans are large and span decades, even small changes in interest rates have a significant impact. On a £250,000 25-year mortgage, a 1% rate increase (e.g. from 4% to 5%) increases monthly payments by roughly £140 per month (£1,680 per year).',
      },
      {
        question: 'What other costs should I budget for when buying a home in the UK?',
        answer: 'In addition to your monthly repayment, budget for Stamp Duty Land Tax (SDLT in England/NI, LBTT in Scotland, LTT in Wales), mortgage broker and arrangement fees, valuation and structural survey fees, legal conveyancing costs, building insurance, and moving expenses.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Mortgage Affordability Calculator',
        url: '/mortgage-affordability-calculator',
        description: 'Estimate how much you could borrow based on your household income and commitments.',
      },
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'Check your net monthly income to ensure mortgage payments fit your budget.',
      },
      {
        title: 'Savings Calculator',
        url: '/savings-calculator',
        description: 'Calculate how long it takes to save for your property deposit.',
      },
      {
        title: 'ISA Calculator',
        url: '/isa-calculator',
        description: 'Model growth for a Lifetime ISA or Stocks and Shares ISA deposit fund.',
      },
    ],
  },

  // G. MORTGAGE AFFORDABILITY CALCULATOR
  mortgage_affordability: {
    slug: 'mortgage-affordability-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/mortgage-affordability-calculator',
    seoTitle: 'Mortgage Affordability Calculator UK | Borrowing Estimate',
    metaDescription: 'Estimate a possible UK mortgage borrowing range using income, deposit, debts and regular commitments. This is not a lending decision.',
    h1: 'Mortgage Affordability Calculator UK',
    primaryKeyword: 'mortgage affordability calculator UK',
    secondaryKeywords: [
      'how much can I borrow mortgage calculator UK',
      'mortgage borrowing calculator UK',
      'mortgage affordability based on salary UK',
    ],
    directAnswerParagraph:
      'This UK Mortgage Affordability Calculator estimates an indicative borrowing range based on single or joint household income, deposit size, and monthly debt commitments. It models standard UK lending multiples (from 3.5x to 5.0x salary) and illustrates estimated repayments under current interest rates.',
    howItWorks: {
      title: 'How UK Mortgage Affordability is Assessed',
      paragraphs: [
        'UK mortgage lenders assess affordability using a combination of gross household income multiples and detailed stress-tested expenditure checks.',
        'Under Bank of England rules, most mainstream mortgages are capped at 4.5 times gross annual income. Select lenders may offer 5.0x or up to 5.5x for higher earners (typically earning over £60,000–£75,000 individually or £100,000 jointly) or specific qualified professionals.',
        'Regular financial commitments (such as credit cards, personal loans, car finance, student loans, and childcare) reduce your disposable income and reduce the maximum amount a lender will approve.',
      ],
    },
    assumptions: [
      'Indicative estimates are based on typical industry income multiples (3.5x conservative, 4.0x moderate, 4.5x standard industry cap, 5.0x stretch).',
      'Existing monthly committed debt and childcare payments reduce borrowing capacity.',
      'Bank of England rules restrict lenders from having more than 15% of residential mortgage loans at 4.5x income or higher.',
      'This tool provides general estimates only and does not constitute a mortgage decision in principle or credit agreement.',
    ],
    practicalExample: {
      title: 'Practical Example: Joint Applicants with £70,000 Combined Income',
      scenario: 'A couple with combined income of £70,000 (£40k and £30k), £300/month car finance, and a £35,000 deposit model their borrowing capacity.',
      breakdown: [
        { label: 'Combined Gross Income', value: '£70,000.00' },
        { label: 'Monthly Committed Debts', value: '£300.00' },
        { label: 'Standard 4.5x Multiplier Borrowing', value: '£299,000.00 (adjusted for commitments)' },
        { label: 'Deposit Available', value: '£35,000.00' },
        { label: 'Indicative Max Property Purchase Price', value: '£334,000.00' },
        { label: 'Estimated Monthly Payment (4.5%, 25 yrs)', value: '£1,662.00' },
      ],
      conclusion: 'Depending on lender credit scoring and household expenditure checks, the couple could typically borrow between £245,000 and £315,000.',
    },
    faqs: [
      {
        question: 'How much can I borrow for a mortgage in the UK?',
        answer: 'Most UK mortgage lenders lend up to 4.5 times your gross annual income (single or joint). Some lenders offer 5.0x or 5.5x for higher earners or professionals, while existing debt payments, loans, and childcare reduce the maximum loan amount.',
      },
      {
        question: 'How do existing debts and loans affect mortgage affordability?',
        answer: 'Lenders deduct regular monthly debt commitments (such as car finance, personal loans, credit card balances, and student loans) from your net disposable income. A £300/month car payment can reduce your maximum mortgage borrowing by £40,000 to £60,000.',
      },
      {
        question: 'What is the Bank of England loan-to-income flow limit?',
        answer: 'The Bank of England Financial Policy Committee (FPC) restricts UK lenders from issuing more than 15% of their total residential mortgage lending at loan-to-income (LTI) ratios of 4.5 times salary or greater.',
      },
      {
        question: 'Do lenders check bank statements for spending habits?',
        answer: 'Yes, lenders typically review 3 to 6 months of bank statements to assess regular outgoings, including utilities, subscriptions, childcare, gym memberships, and gambling transactions, to ensure repayments remain affordable.',
      },
      {
        question: 'What is a mortgage stress test?',
        answer: 'A stress test evaluates whether you could still afford your monthly mortgage payments if interest rates were to rise by 1% to 3% above the lender\'s standard variable rate (SVR) after an initial fixed-rate deal ends.',
      },
      {
        question: 'Does having a larger deposit increase how much I can borrow?',
        answer: 'A larger deposit increases the overall property price you can afford (Purchase Price = Borrowing + Deposit) and lowers your Loan-to-Value (LTV) ratio, unlocking cheaper interest rates which improve affordability stress tests.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Mortgage Calculator',
        url: '/mortgage-calculator',
        description: 'Calculate exact monthly repayments and amortisation schedules.',
      },
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'Verify your net monthly salary after tax, NI and pension.',
      },
      {
        title: 'Savings Calculator',
        url: '/savings-calculator',
        description: 'Plan how much you need to save each month to build your deposit.',
      },
    ],
  },

  // H. ISA CALCULATOR
  isa: {
    slug: 'isa-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/isa-calculator',
    seoTitle: 'ISA Calculator UK | Estimate Tax-Efficient Savings Growth',
    metaDescription: 'Estimate how regular ISA contributions and assumed growth could affect your future savings. Results are illustrative and not investment advice.',
    h1: 'ISA Calculator UK',
    primaryKeyword: 'ISA calculator UK',
    secondaryKeywords: [
      'stocks and shares ISA calculator UK',
      'cash ISA calculator UK',
      'ISA savings calculator UK',
      'ISA growth calculator UK',
    ],
    directAnswerParagraph:
      'This UK ISA Calculator estimates the future growth of your Cash ISA, Stocks and Shares ISA, or Lifetime ISA (LISA) from regular monthly contributions, lump-sum deposits, and compound growth. All returns, interest, and capital gains inside an ISA are 100% tax-free in the UK.',
    howItWorks: {
      title: 'How ISA Projections Work',
      paragraphs: [
        'An Individual Savings Account (ISA) is a tax-free wrapper that protects your savings interest, dividend income, and capital gains from UK Income Tax and Capital Gains Tax.',
        'The UK adult ISA allowance is £20,000 per tax year. You can split this allowance across Cash ISAs, Stocks and Shares ISAs, Innovative Finance ISAs, and Lifetime ISAs (up to £4,000/year for LISA).',
        'Compound growth means you earn returns on both your initial contributions and the accumulated growth from previous years, accelerating wealth accumulation over long investment horizons.',
      ],
    },
    assumptions: [
      'Assumes the statutory annual adult ISA allowance is £20,000 per tax year.',
      'Investment growth rates are illustrative assumptions; real market returns fluctuate, and investments can fall as well as rise.',
      'For Lifetime ISAs (LISA), a 25% government bonus (up to £1,000/year on £4,000 contribution) is included.',
      'Projections model compound growth assuming all returns and dividends are reinvested inside the tax-free wrapper.',
    ],
    practicalExample: {
      title: 'Practical Example: £300/Month in a Stocks & Shares ISA at 6.5% Growth',
      scenario: 'An investor deposits £300 per month (£3,600/year) into a diversified Stocks and Shares ISA over 15 years with an assumed annualised return of 6.5%.',
      breakdown: [
        { label: 'Monthly Contribution', value: '£300.00' },
        { label: 'Time Horizon', value: '15 Years' },
        { label: 'Total Contributions Made', value: '£54,000.00' },
        { label: 'Estimated Investment Growth', value: '£40,782.00' },
        { label: 'Estimated Total ISA Value', value: '£94,782.00' },
        { label: 'UK Tax Paid on Growth & Dividends', value: '£0.00 (100% Tax-Free)' },
      ],
      conclusion: 'Inside an ISA, the entire £40,782 in compound growth is sheltered from Capital Gains Tax and dividend tax, saving thousands compared to a general investment account.',
    },
    faqs: [
      {
        question: 'What is the annual ISA allowance for 2025/26?',
        answer: 'The UK annual ISA allowance is £20,000 per tax year for adults aged 18 and over. This allowance applies across all qualifying ISA types combined.',
      },
      {
        question: 'What is the difference between a Cash ISA and a Stocks and Shares ISA?',
        answer: 'A Cash ISA pays tax-free interest on cash deposits with zero capital risk, similar to a standard bank savings account. A Stocks and Shares ISA invests in equities, bonds, and funds for potentially higher long-term returns, though the value can fall as well as rise.',
      },
      {
        question: 'How does the Lifetime ISA (LISA) work?',
        answer: 'UK residents aged 18 to 39 can deposit up to £4,000 per year into a Lifetime ISA. The government adds a 25% bonus (up to £1,000/year). Funds can be withdrawn tax-free to buy a first residential home worth up to £450,000 or for retirement after age 60.',
      },
      {
        question: 'Can I pay into multiple ISAs of the same type in one tax year?',
        answer: 'Yes, from 6 April 2024, UK rules permit paying into multiple ISAs of the same type (e.g. two separate Cash ISAs with different providers) within the same tax year, provided your combined contributions stay within the £20,000 annual allowance.',
      },
      {
        question: 'Do I need to declare ISA income on my Self Assessment tax return?',
        answer: 'No, interest, dividends, and capital gains generated inside an ISA do not need to be declared on your HMRC Self Assessment tax return.',
      },
      {
        question: 'What happens to unused ISA allowance at the end of the tax year?',
        answer: 'Unused ISA allowance does not roll over. If you do not use your £20,000 allowance before midnight on 5 April, the allowance for that tax year is lost.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Savings Calculator',
        url: '/savings-calculator',
        description: 'Calculate interest growth in regular savings accounts and compare with PSA limits.',
      },
      {
        title: 'Dividend Tax Calculator',
        url: '/dividend-tax-calculator',
        description: 'See tax payable on non-ISA share dividends.',
      },
      {
        title: 'Capital Gains Tax Calculator',
        url: '/capital-gains-tax-calculator',
        description: 'Estimate tax when selling investments outside an ISA.',
      },
      {
        title: 'Pension Calculator',
        url: '/pension-calculator',
        description: 'Compare ISA growth with workplace pension tax relief and employer contributions.',
      },
    ],
  },

  // I. SAVINGS CALCULATOR
  savings: {
    slug: 'savings-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/savings-calculator',
    seoTitle: 'Savings Calculator UK | Estimate Interest and Growth',
    metaDescription: 'Calculate estimated savings growth from an opening balance, regular deposits, interest rate and saving period. Free UK savings calculator.',
    h1: 'Savings Calculator UK',
    primaryKeyword: 'savings calculator UK',
    secondaryKeywords: [
      'savings interest calculator UK',
      'compound interest calculator UK',
      'monthly savings calculator UK',
      'regular savings calculator UK',
    ],
    directAnswerParagraph:
      'This UK Savings Calculator estimates how your money grows over time through regular monthly deposits and compound interest. It provides monthly and yearly balance projections and highlights how UK Personal Savings Allowances (PSA) apply to non-ISA interest.',
    howItWorks: {
      title: 'How Compound Savings Interest Works',
      paragraphs: [
        'Compound interest occurs when interest earned is added to your principal balance, so you earn interest on your interest in subsequent periods.',
        'In the UK, interest earned in non-ISA savings accounts is subject to the Personal Savings Allowance (PSA): £1,000 of tax-free interest for Basic Rate taxpayers (20%), £500 for Higher Rate taxpayers (40%), and £0 for Additional Rate taxpayers (45%).',
        'Starting early and saving regularly allows compound growth to accelerate, especially over multi-year saving periods.',
      ],
    },
    assumptions: [
      'Calculations assume a constant annual interest rate compounded monthly or annually as selected.',
      'Regular monthly deposits are added at the start of each monthly compounding period.',
      'Tax-free allowances reflect statutory UK Personal Savings Allowance thresholds.',
      'Adjusted purchasing power illustrations apply a user-selectable inflation baseline (e.g. 2.5%).',
    ],
    practicalExample: {
      title: 'Practical Example: £5,000 Opening Balance + £250/Month at 4.75% Interest',
      scenario: 'A saver deposits £5,000 into a fixed-rate savings account paying 4.75% annual interest and contributes £250 each month for 5 years.',
      breakdown: [
        { label: 'Initial Opening Balance', value: '£5,000.00' },
        { label: 'Monthly Contribution', value: '£250.00 (£3,000/year)' },
        { label: 'Total Principal Deposited Over 5 Years', value: '£20,000.00' },
        { label: 'Total Compound Interest Earned', value: '£3,068.50' },
        { label: 'Final Total Savings Balance', value: '£23,068.50' },
      ],
      conclusion: 'Over 5 years, the saver accumulates £23,068.50, of which £3,068.50 is pure interest income generated by compound growth.',
    },
    faqs: [
      {
        question: 'How does compound interest work on UK savings accounts?',
        answer: 'Compound interest means interest is calculated on both the initial principal and the accumulated interest from previous periods. Over time, this compounding effect accelerates your balance growth significantly compared to simple interest.',
      },
      {
        question: 'What is the Personal Savings Allowance (PSA)?',
        answer: 'The Personal Savings Allowance allows UK taxpayers to earn savings interest without paying Income Tax. Basic Rate (20%) taxpayers can earn £1,000 of interest tax-free; Higher Rate (40%) taxpayers can earn £500; Additional Rate (45%) taxpayers receive £0.',
      },
      {
        question: 'How is tax on savings interest collected by HMRC?',
        answer: 'Banks and building societies pay interest gross (without deducting tax) and report it directly to HMRC. If your interest exceeds your Personal Savings Allowance, HMRC adjusts your PAYE tax code automatically or collects it via Self Assessment.',
      },
      {
        question: 'What is the difference between AER and Gross interest rate?',
        answer: 'Gross rate is the contractual interest rate before tax. AER (Annual Equivalent Rate) illustrates what the interest rate would be if interest was paid and compounded once a year, making it easier to compare accounts with different payment frequencies.',
      },
      {
        question: 'What is the Starting Rate for Savings?',
        answer: 'Low earners with total taxable non-savings income below £17,570 can earn up to £5,000 of savings interest at a 0% Starting Rate for Savings, in addition to their £1,000 Personal Savings Allowance.',
      },
      {
        question: 'How does inflation affect my savings?',
        answer: 'Inflation reduces the purchasing power of your money over time. If inflation is 3% and your savings account pays 4%, your real after-inflation return is approximately 1%. If your savings rate is below inflation, your real purchasing power declines.',
      },
    ],
    relatedCalculators: [
      {
        title: 'ISA Calculator',
        url: '/isa-calculator',
        description: 'Explore completely tax-free savings and investment growth with an ISA.',
      },
      {
        title: 'Mortgage Calculator',
        url: '/mortgage-calculator',
        description: 'See how building your savings deposit reduces mortgage payments.',
      },
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'Work out how much disposable income you have available to save each month.',
      },
    ],
  },

  // J. CAPITAL GAINS TAX CALCULATOR
  capital_gains: {
    slug: 'capital-gains-tax-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/capital-gains-tax-calculator',
    seoTitle: 'Capital Gains Tax Calculator UK | Estimate CGT',
    metaDescription: 'Estimate UK Capital Gains Tax using sale proceeds, purchase cost, allowable costs and other taxable income. For general guidance only.',
    h1: 'Capital Gains Tax Calculator UK',
    primaryKeyword: 'Capital Gains Tax calculator UK',
    secondaryKeywords: [
      'CGT calculator UK',
      'how much Capital Gains Tax will I pay UK',
      'property Capital Gains Tax calculator UK',
      'shares CGT calculator UK',
    ],
    directAnswerParagraph:
      'This UK Capital Gains Tax (CGT) Calculator estimates the tax due when selling shares, investments, residential property or other valuable assets. It incorporates the £3,000 Annual Exempt Amount and the unified 18% (Basic Rate) and 24% (Higher Rate) tax rates established in the Autumn Budget.',
    howItWorks: {
      title: 'How UK Capital Gains Tax is Estimated',
      paragraphs: [
        'Capital Gains Tax is charged on the profit (gain) made when you sell or dispose of an asset that has increased in value, rather than the total amount of money you receive.',
        'You only pay CGT on gains above the statutory Annual Exempt Amount (£3,000 for individuals in 2024/25 and 2025/26). You can deduct allowable costs (such as legal fees, stamp duty, broker commissions, and capital improvements) and allowable capital losses from previous years.',
        'Following the Autumn Budget 2024, CGT rates for standard assets (shares, funds, crypto) and residential property are aligned at 18% for Basic Rate taxpayers and 24% for Higher and Additional Rate taxpayers.',
      ],
    },
    assumptions: [
      'Assumes the statutory £3,000 individual Annual Exempt Amount applies for the selected tax year.',
      'Applies 18% (basic band) and 24% (higher band) across both residential property and standard assets.',
      'Allowable deduction items include purchase costs, sales/broker costs, capital enhancement costs, and allowable losses.',
      'Does not model complex reliefs such as Private Residence Relief (PRR) partial letting relief, roll-over relief, or non-domicile remittance rules.',
    ],
    practicalExample: {
      title: 'Practical Example: Selling Non-ISA Shares with £15,000 Gain',
      scenario: 'A basic rate taxpayer earning £35,000 salary sells company shares for £30,000 that were purchased for £15,000, incurring £500 in allowable trading fees.',
      breakdown: [
        { label: 'Sale Proceeds', value: '£30,000.00' },
        { label: 'Purchase Cost + Allowable Fees', value: '£15,500.00' },
        { label: 'Gross Capital Gain', value: '£14,500.00' },
        { label: 'Annual Exempt Amount (AEA)', value: '£3,000.00' },
        { label: 'Net Taxable Gain', value: '£11,500.00' },
        { label: 'Basic Rate Band Headroom', value: '£15,270 remaining' },
        { label: 'Capital Gains Tax Due (18% of £11,500)', value: '£2,070.00' },
      ],
      conclusion: 'The individual owes £2,070 in CGT. Selling shares held inside an ISA would have produced £0 tax liability.',
    },
    faqs: [
      {
        question: 'What are the UK Capital Gains Tax rates for 2025/26?',
        answer: 'Following the Autumn Budget, Capital Gains Tax rates are 18% for Basic Rate taxpayers and 24% for Higher and Additional Rate taxpayers across both standard assets (shares, funds, crypto) and residential property.',
      },
      {
        question: 'What is the UK Capital Gains Tax Annual Exempt Amount?',
        answer: 'The individual Annual Exempt Amount is £3,000 per tax year. Gains up to £3,000 are completely free of Capital Gains Tax. For trusts, the allowance is £1,500.',
      },
      {
        question: 'Do I pay Capital Gains Tax when selling my main home?',
        answer: 'If the property has been your only or main home for the entire period of ownership, you typically qualify for 100% Private Residence Relief (PRR) and pay £0 Capital Gains Tax on the sale.',
      },
      {
        question: 'Can I deduct capital losses against capital gains?',
        answer: 'Yes, you can deduct allowable capital losses incurred in the same tax year from your total capital gains. Unused losses from previous tax years can also be carried forward and offset against future taxable gains.',
      },
      {
        question: 'How long do I have to pay Capital Gains Tax on UK property?',
        answer: 'For UK residential property disposals where CGT is due, you must report the gain and pay the tax to HMRC within 60 days of the completion date using the online UK Property Account.',
      },
      {
        question: 'How does my salary affect the Capital Gains Tax rate I pay?',
        answer: 'Your taxable capital gain is added on top of your taxable employment income to determine which rate applies. Any gain fitting within your unused basic rate tax band (up to £50,270) is taxed at 18%, and the portion exceeding £50,270 is taxed at 24%.',
      },
      {
        question: 'What allowable costs can I deduct when calculating a capital gain?',
        answer: 'You can deduct purchase costs (e.g. stamp duty, conveyancing fees), disposal costs (e.g. estate agent and advertising fees), and capital improvement costs (e.g. building an extension), but not routine maintenance or repair costs.',
      },
      {
        question: 'Do I pay Capital Gains Tax on assets transferred to a spouse?',
        answer: 'Transfers of assets between legally married spouses or registered civil partners who live together are treated on a \'no gain, no loss\' basis and do not trigger an immediate Capital Gains Tax charge.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Dividend Tax Calculator',
        url: '/dividend-tax-calculator',
        description: 'Calculate tax on dividend income received from company shares.',
      },
      {
        title: 'ISA Calculator',
        url: '/isa-calculator',
        description: 'Model 100% tax-free growth in a Stocks and Shares ISA wrapper.',
      },
      {
        title: 'Income Tax Calculator',
        url: '/income-tax-calculator',
        description: 'Check your basic rate tax band headroom for CGT calculation.',
      },
    ],
  },

  // 1. STAMP DUTY CALCULATOR (SDLT)
  stamp_duty: {
    slug: 'stamp-duty-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/stamp-duty-calculator',
    seoTitle: 'Stamp Duty Calculator UK | Estimate SDLT',
    metaDescription: 'Estimate Stamp Duty Land Tax when buying property in England or Northern Ireland. Check standard, first-time buyer and additional-property estimates.',
    h1: 'Stamp Duty Calculator UK',
    primaryKeyword: 'stamp duty calculator UK',
    secondaryKeywords: [
      'SDLT calculator UK',
      'first time buyer stamp duty calculator',
      'buy to let stamp duty calculator',
      'stamp duty rates UK',
    ],
    directAnswerParagraph:
      'Estimate your Stamp Duty Land Tax (SDLT) when purchasing residential property in England or Northern Ireland. Calculate taxes across standard home moves, first-time buyer relief thresholds, and additional property surcharges (buy-to-let and second homes).',
    howItWorks: {
      title: 'How Stamp Duty Land Tax (SDLT) is Calculated',
      paragraphs: [
        'Stamp Duty Land Tax (SDLT) is a progressive tiered tax paid when purchasing residential property or land in England and Northern Ireland. The tax is charged only on the portion of the property price falling within each specific rate band.',
        'First-time buyers benefit from relief on properties up to £625,000 (£500,000 under baseline statutory rules), paying 0% on the first £425,000 (£300,000 baseline). If the property price exceeds the maximum limit, standard rates apply to the entire purchase price.',
        'Purchasers of additional residential properties (including second homes and buy-to-let investments) pay a 5% surcharge across every price band on top of standard residential SDLT rates following the Autumn Budget 2024.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Select Buyer Category',
          description: 'Choose whether you are moving home (standard), buying your first home (first-time buyer), or purchasing an additional property / buy-to-let.',
        },
        {
          stepNumber: 2,
          title: 'Enter Property Purchase Price',
          description: 'Input the agreed transaction price for the residential property in England or Northern Ireland.',
        },
        {
          stepNumber: 3,
          title: 'Calculate Progressive Tiered Tax',
          description: 'The calculator splits the property purchase price across statutory HMRC bands and applies any applicable reliefs or surcharges.',
        },
      ],
    },
    assumptions: [
      'Calculations apply strictly to residential freehold or leasehold properties in England and Northern Ireland.',
      'Scotland applies Land and Buildings Transaction Tax (LBTT) and Wales applies Land Transaction Tax (LTT), which have separate devolved schedules.',
      'First-time buyer relief assumes neither buyer has previously owned residential property anywhere in the world.',
      'Additional property surcharge reflects the 5% surcharge rate introduced in the Autumn Budget 2024.',
      'Does not calculate mixed-use, commercial, or complex non-residential land transactions.',
    ],
    practicalExample: {
      title: 'Practical Example: Moving Home at £350,000 Purchase Price',
      scenario: 'A homeowner in England sells their existing main residence and purchases a new home for £350,000 under standard residential rates.',
      breakdown: [
        { label: 'Property Purchase Price', value: '£350,000.00' },
        { label: '0% Band (First £250,000)', value: '£0.00' },
        { label: '5% Band (Remaining £100,000)', value: '£5,000.00' },
        { label: 'Total Stamp Duty Payable', value: '£5,000.00' },
        { label: 'Effective SDLT Rate', value: '1.43% of purchase price' },
      ],
      conclusion: 'The buyer owes an estimated £5,000 in SDLT upon completion. An investor purchasing the same property as a buy-to-let would pay £22,500 due to the 5% surcharge.',
    },
    faqs: [
      {
        question: 'What is Stamp Duty Land Tax (SDLT)?',
        answer: 'Stamp Duty Land Tax (SDLT) is a statutory tax payable to HMRC when you purchase property or land over a certain price threshold in England and Northern Ireland.',
      },
      {
        question: 'How does First-Time Buyer Stamp Duty relief work?',
        answer: 'First-time buyers pay 0% Stamp Duty on properties up to £425,000, and 5% on the portion between £425,001 and £625,000. If the purchase price exceeds £625,000, no first-time buyer relief is available and standard rates apply.',
      },
      {
        question: 'What is the Stamp Duty surcharge on second homes and buy-to-let properties?',
        answer: 'Following the Autumn Budget 2024, buyers of second homes, holiday lets, or buy-to-let properties pay an additional 5% surcharge across all SDLT rate bands on top of standard residential rates.',
      },
      {
        question: 'When do I have to pay Stamp Duty to HMRC?',
        answer: 'You have 14 days from the date of completion to submit a Stamp Duty Land Tax return to HMRC and pay any tax due. Usually, your conveyancing solicitor handles this as part of the legal completion process.',
      },
      {
        question: 'Does this calculator apply to properties in Scotland or Wales?',
        answer: 'No. Stamp Duty applies to England and Northern Ireland only. Property purchases in Scotland are subject to Land and Buildings Transaction Tax (LBTT), while Wales operates Land Transaction Tax (LTT).',
      },
      {
        question: 'Can I add Stamp Duty to my mortgage loan?',
        answer: 'Some mortgage lenders permit you to borrow extra funds to cover Stamp Duty if your loan-to-value (LTV) ratio and affordability allow it. However, this increases your monthly repayment and total interest paid.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Mortgage Repayment Calculator',
        url: '/mortgage-calculator',
        description: 'Calculate monthly mortgage repayments and interest for your property.',
      },
      {
        title: 'Mortgage Affordability Calculator',
        url: '/mortgage-affordability-calculator',
        description: 'Estimate your maximum borrowing power based on UK income multiples.',
      },
      {
        title: 'Mortgage Overpayment Calculator',
        url: '/mortgage-overpayment-calculator',
        description: 'See how overpaying saves thousands in mortgage interest over time.',
      },
    ],
  },

  // 2. MORTGAGE OVERPAYMENT CALCULATOR
  mortgage_overpayment: {
    slug: 'mortgage-overpayment-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/mortgage-overpayment-calculator',
    seoTitle: 'Mortgage Overpayment Calculator UK | Save Interest Estimate',
    metaDescription: 'Estimate how mortgage overpayments could reduce your mortgage term and total interest. Results are illustrative and depend on your lender.',
    h1: 'Mortgage Overpayment Calculator UK',
    primaryKeyword: 'mortgage overpayment calculator UK',
    secondaryKeywords: [
      'mortgage overpayment savings calculator',
      'overpay mortgage calculator UK',
      'how much does overpaying mortgage save UK',
      'mortgage early repayment calculator',
    ],
    directAnswerParagraph:
      'Estimate how regular monthly overpayments or one-off lump sums can significantly reduce your total mortgage interest and shave years off your remaining repayment term. Results are illustrative and depend on your lender\'s terms.',
    howItWorks: {
      title: 'How Mortgage Overpayments Save Interest',
      paragraphs: [
        'When you make a mortgage overpayment, 100% of the additional money goes directly towards reducing the loan\'s principal balance rather than paying interest.',
        'Because UK mortgage interest is calculated daily on the remaining balance, reducing your principal immediately decreases future interest charges, accelerating the pace of capital repayment and shortening the loan term.',
        'Most standard UK fixed-rate and tracker mortgages allow penalty-free overpayments of up to 10% of the outstanding balance per calendar or scheme year without incurring Early Repayment Charges (ERC).',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Enter Remaining Mortgage Details',
          description: 'Input your outstanding balance, interest rate, and remaining term in years.',
        },
        {
          stepNumber: 2,
          title: 'Add Monthly or Lump Sum Overpayment',
          description: 'Choose an extra regular monthly contribution or one-off lump sum overpayment.',
        },
        {
          stepNumber: 3,
          title: 'View Years Saved & Interest Reduction',
          description: 'Compare standard amortisation against your accelerated repayment schedule.',
        },
      ],
    },
    assumptions: [
      'Assumes a standard repayment (capital and interest) mortgage where interest is calculated daily and compounded monthly.',
      'Assumes the interest rate remains constant throughout the remaining mortgage term.',
      'Assumes all overpayments directly reduce the mortgage term rather than lowering subsequent monthly baseline payments.',
      'Check your mortgage contract for any Early Repayment Charge (ERC) limits (typically 10% annual allowance).',
    ],
    practicalExample: {
      title: 'Practical Example: £200,000 Mortgage with £150 Monthly Overpayment',
      scenario: 'A homeowner with £200,000 remaining on a 25-year mortgage at 4.5% interest overpays £150 per month on top of their £1,111 standard monthly payment.',
      breakdown: [
        { label: 'Current Mortgage Balance', value: '£200,000.00' },
        { label: 'Standard Monthly Payment', value: '£1,111.66' },
        { label: 'Monthly Overpayment', value: '£150.00' },
        { label: 'New Term to Pay Off', value: '20 years 4 months' },
        { label: 'Time Saved Off Mortgage', value: '4 years 8 months' },
        { label: 'Total Interest Saved', value: '£27,342.00' },
      ],
      conclusion: 'By overpaying £150 each month, the borrower becomes mortgage-free 4 years and 8 months sooner and saves over £27,000 in interest.',
    },
    faqs: [
      {
        question: 'How much can I overpay on my UK mortgage without a penalty?',
        answer: 'Most UK lenders allow you to overpay up to 10% of your outstanding mortgage balance per year on fixed-rate deals without triggering an Early Repayment Charge (ERC). Standard variable rate (SVR) and tracker mortgages often allow unlimited overpayments.',
      },
      {
        question: 'Does overpaying my mortgage reduce my monthly payments or shorten my term?',
        answer: 'Lenders typically give you two options: shorten your mortgage term (which keeps your monthly payment the same and maximises total interest savings) or reduce your contractual monthly payment (which lowers monthly outgoings but saves less interest overall).',
      },
      {
        question: 'Is it better to overpay a mortgage or invest in a pension or ISA?',
        answer: 'Overpaying your mortgage gives a guaranteed, tax-free return equal to your mortgage interest rate and provides psychological security. However, pensions provide valuable tax relief (20% to 45%) plus employer contributions, and Stocks & Shares ISAs historically offer higher long-term potential returns.',
      },
      {
        question: 'Can I overpay with a lump sum instead of monthly amounts?',
        answer: 'Yes, you can make one-off lump sum overpayments at any time, provided they stay within your lender\'s annual penalty-free allowance. Lump sum overpayments immediately reduce your outstanding capital balance.',
      },
      {
        question: 'How is daily mortgage interest calculated in the UK?',
        answer: 'Most UK mortgages calculate interest daily using the formula: (Outstanding Balance × Annual Interest Rate) ÷ 365. Reducing the balance today immediately reduces tomorrow\'s interest calculation.',
      },
      {
        question: 'Can I get my overpayments back if I need cash later?',
        answer: 'With standard mortgages, overpaid capital is locked in your home equity and can only be accessed via remortgaging. However, flexible or offset mortgages often provide a \'borrow-back\' feature or linked savings offset.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Mortgage Repayment Calculator',
        url: '/mortgage-calculator',
        description: 'Calculate standard monthly repayments and interest breakdown.',
      },
      {
        title: 'Stamp Duty Calculator',
        url: '/stamp-duty-calculator',
        description: 'Estimate Stamp Duty Land Tax for your next property purchase.',
      },
      {
        title: 'Mortgage Affordability Calculator',
        url: '/mortgage-affordability-calculator',
        description: 'Determine maximum borrowing power based on household income.',
      },
    ],
  },

  // 3. PAY RISE CALCULATOR
  pay_rise: {
    slug: 'pay-rise-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/pay-rise-calculator',
    seoTitle: 'Pay Rise Calculator UK | Salary Increase Estimate',
    metaDescription: 'Calculate a UK pay rise by percentage or amount. Compare your current and new salary, including estimated monthly take-home change.',
    h1: 'Pay Rise Calculator UK',
    primaryKeyword: 'pay rise calculator UK',
    secondaryKeywords: [
      'salary increase calculator UK',
      'pay rise after tax calculator UK',
      'how much extra take home pay after pay rise',
      'net salary increase calculator UK',
    ],
    directAnswerParagraph:
      'Calculate the exact take-home pay impact of a UK pay rise or salary increase. Compare your current and new gross pay, breakdown statutory deductions, and see how much extra cash lands in your bank account each month.',
    howItWorks: {
      title: 'How a UK Pay Rise is Calculated After Tax',
      paragraphs: [
        'When you receive a salary increase in the UK, the extra earnings are taxed at your marginal rates for Income Tax, employee Class 1 National Insurance, workplace pension, and student loan deductions.',
        'Basic rate taxpayers generally retain around 67% to 72% of a pay rise. Higher rate taxpayers retain around 58%, while earnings inside the £100k–£125.1k Personal Allowance taper face an effective marginal tax rate of 60% (62% with NI).',
        'Comparing your before and after figures shows your net retention percentage—the proportion of every £1 pay increase you take home.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Enter Current Salary',
          description: 'Input your existing annual gross earnings, tax code, and pension arrangements.',
        },
        {
          stepNumber: 2,
          title: 'Specify Pay Rise',
          description: 'Enter your salary increase as a percentage (e.g. 5%) or fixed annual amount (e.g. £3,000).',
        },
        {
          stepNumber: 3,
          title: 'Review Monthly Take-Home Change',
          description: 'See the net monthly increase, tax breakdown, and effective marginal tax rate.',
        },
      ],
    },
    assumptions: [
      'Assumes UK PAYE tax schedules and Class 1 employee National Insurance for the selected tax year.',
      'Models marginal Income Tax rates (20%, 40%, 45% rUK or devolved Scottish bands 19% to 48%).',
      'Accounts for employee pension contributions and student loan plans.',
      'Does not account for company car benefit-in-kind or unearned non-PAYE investment income.',
    ],
    practicalExample: {
      title: 'Practical Example: £4,000 Pay Rise on a £40,000 Salary',
      scenario: 'An employee in England earning £40,000 receives a £4,000 pay rise to £44,000 with 5% workplace pension and Plan 2 student loan.',
      breakdown: [
        { label: 'Gross Annual Pay Rise', value: '+£4,000.00' },
        { label: 'Income Tax Deduction (20%)', value: '-£800.00' },
        { label: 'National Insurance Deduction (8%)', value: '-£320.00' },
        { label: 'Workplace Pension (5%)', value: '-£200.00' },
        { label: 'Student Loan Plan 2 (9%)', value: '-£360.00' },
        { label: 'Net Annual Take-Home Increase', value: '+£2,320.00' },
        { label: 'Net Monthly Increase', value: '+£193.33 / month' },
        { label: 'Net Retention Rate', value: '58.0%' },
      ],
      conclusion: 'The employee takes home an extra £193.33 per month after all statutory deductions and pension contributions.',
    },
    faqs: [
      {
        question: 'Will a pay rise push me into a higher tax bracket and leave me worse off?',
        answer: 'No. The UK operates a marginal progressive tax system. Moving into a higher tax bracket only taxes the specific slice of earnings above the threshold (e.g. £50,270) at 40%. You will never earn less net take-home pay overall from receiving a pay rise.',
      },
      {
        question: 'How much of my pay rise will I actually take home?',
        answer: 'A basic rate earner (under £50,270) typically keeps 67p to 72p of every £1 pay rise. A higher rate earner keeps around 58p per £1. If you have a student loan (9%) or pension (5%), net retention is lower.',
      },
      {
        question: 'What is the 60% tax trap on pay rises between £100,000 and £125,140?',
        answer: 'Between £100,000 and £125,140, your tax-free Personal Allowance is reduced by £1 for every £2 of extra earnings. This adds a 20% effective tax on top of the 40% Higher Rate, creating a combined 60% Income Tax rate on pay rises in this band.',
      },
      {
        question: 'How can I keep more of my pay rise using pension contributions?',
        answer: 'You can contribute part or all of your pay increase into a workplace salary sacrifice pension. This completely avoids Income Tax, National Insurance, and preserves child benefit or your Personal Allowance.',
      },
      {
        question: 'Does National Insurance decrease when my salary crosses £50,270?',
        answer: 'Yes. Employee Class 1 National Insurance drops from 8% down to 2% on all earnings above the Upper Earnings Limit (£50,270 / year), partially cushioning the increase from 20% to 40% Income Tax.',
      },
      {
        question: 'How does a pay rise affect my Student Loan repayments?',
        answer: 'Student loan repayments are calculated at 9% (or 6% for postgraduate loans) on gross earnings above your plan\'s specific repayment threshold. A £1,000 pay rise adds £90 in annual student loan repayments.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Bonus Tax Calculator',
        url: '/bonus-tax-calculator',
        description: 'See how one-off bonuses are taxed on top of your standard salary.',
      },
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'Get a comprehensive monthly and annual payslip breakdown.',
      },
      {
        title: 'Net to Gross Salary Calculator',
        url: '/net-to-gross-salary-calculator',
        description: 'Find the gross salary required to achieve a target take-home pay.',
      },
    ],
  },

  // 4. BONUS TAX CALCULATOR
  bonus_tax: {
    slug: 'bonus-tax-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/bonus-tax-calculator',
    seoTitle: 'Bonus Tax Calculator UK | Estimate Bonus Take-Home Pay',
    metaDescription: 'Estimate UK bonus take-home pay after Income Tax, National Insurance, pension and student loan deductions.',
    h1: 'Bonus Tax Calculator UK',
    primaryKeyword: 'bonus tax calculator UK',
    secondaryKeywords: [
      'bonus after tax calculator UK',
      'how much tax on bonus UK',
      'bonus take home pay calculator',
      'salary sacrifice bonus calculator UK',
    ],
    directAnswerParagraph:
      'Estimate your net take-home pay from a work bonus in the UK. Understand how Income Tax, National Insurance, pension contributions, and student loans apply to bonus payments, and explore bonus sacrifice into pensions.',
    howItWorks: {
      title: 'How Bonuses are Taxed in the UK',
      paragraphs: [
        'In the UK, bonuses are treated as standard employment earnings and taxed through PAYE in the pay period in which they are paid. There is no separate or flat bonus tax rate.',
        'Because your base salary often already uses your tax-free Personal Allowance (£12,570), bonuses are typically taxed entirely at your top marginal Income Tax and National Insurance rates.',
        'If you participate in a company bonus sacrifice arrangement, you can redirect part or all of your cash bonus into your workplace pension, saving 100% of the Income Tax and National Insurance due.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Enter Base Salary & Bonus',
          description: 'Provide your contractual annual salary and the gross bonus amount awarded.',
        },
        {
          stepNumber: 2,
          title: 'Configure Pension & Deductions',
          description: 'Indicate whether pension or student loan deductions apply to your bonus.',
        },
        {
          stepNumber: 3,
          title: 'Review Bonus Payslip Simulation',
          description: 'Compare your normal month take-home against your bonus month net payout.',
        },
      ],
    },
    assumptions: [
      'Bonuses are taxed as non-cumulative PAYE earnings on top of annual salary.',
      'Models marginal rates for Income Tax (20%, 40%, 45% or Scottish bands) and employee NI (8% / 2%).',
      'Accounts for student loans (Plan 1, 2, 4, 5, Postgraduate) at 9% / 6% on earnings above threshold.',
      'Bonus sacrifice comparison assumes qualifying employer workplace pension scheme.',
    ],
    practicalExample: {
      title: 'Practical Example: £5,000 Bonus on a £55,000 Salary',
      scenario: 'A higher rate taxpayer earning £55,000 receives a £5,000 annual bonus with 5% pension and Plan 2 student loan.',
      breakdown: [
        { label: 'Gross Bonus Amount', value: '£5,000.00' },
        { label: 'Income Tax on Bonus (40%)', value: '-£2,000.00' },
        { label: 'National Insurance on Bonus (2%)', value: '-£100.00' },
        { label: 'Workplace Pension (5%)', value: '-£250.00' },
        { label: 'Student Loan Plan 2 (9%)', value: '-£450.00' },
        { label: 'Net Take-Home Bonus', value: '£2,200.00' },
        { label: 'Net Retention Rate', value: '44.0%' },
      ],
      conclusion: 'The employee receives £2,200 in cash. Sacrificing the bonus into a pension would deposit the full £5,000 into retirement savings tax-free.',
    },
    faqs: [
      {
        question: 'Are bonuses taxed higher than regular salary in the UK?',
        answer: 'No, bonuses are taxed at the exact same statutory rates as regular salary. However, because your regular salary already uses up your tax-free Personal Allowance (£12,570), bonuses are taxed at your highest marginal rate, making the deductions appear larger.',
      },
      {
        question: 'Why did my bonus month payslip have so much tax deducted?',
        answer: 'HMRC PAYE systems annualise your monthly pay during the bonus month. If a large bonus creates a spike in earnings, PAYE assumes that is your new continuous salary and may deduct tax at higher rate bands until adjusted across subsequent pay periods.',
      },
      {
        question: 'What is bonus sacrifice and should I do it?',
        answer: 'Bonus sacrifice (or bonus waiver) allows you to pay some or all of your pre-tax bonus directly into your workplace pension. You avoid paying Income Tax (20% to 45%) and employee NI (2% to 8%), and some employers pass on their 15% employer NI savings as an extra top-up.',
      },
      {
        question: 'Do I pay National Insurance on bonuses?',
        answer: 'Yes. Employee Class 1 National Insurance is charged on bonuses: 8% on earnings between £1,048 and £4,189 per month, and 2% on earnings above £4,189 per month.',
      },
      {
        question: 'Can a bonus affect my Child Benefit or Personal Allowance?',
        answer: 'Yes. A bonus increases your total Adjusted Net Income for the tax year. If your total income crosses £60,000, you trigger the High Income Child Benefit Charge. If it exceeds £100,000, you begin losing your £12,570 Personal Allowance.',
      },
      {
        question: 'Are student loan repayments deducted from bonuses?',
        answer: 'Yes. Student loan deductions apply to bonuses because they are based on total gross earnings in the pay period above the weekly/monthly threshold.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Pay Rise Calculator',
        url: '/pay-rise-calculator',
        description: 'See how ongoing salary increases affect your monthly net pay.',
      },
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'Full UK salary and payslip deduction calculation.',
      },
      {
        title: 'Salary Sacrifice Calculator',
        url: '/salary-sacrifice-calculator',
        description: 'Model tax and NI savings by exchanging salary for pension or perks.',
      },
    ],
  },

  // 5. NET TO GROSS SALARY CALCULATOR
  net_to_gross: {
    slug: 'net-to-gross-salary-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/net-to-gross-salary-calculator',
    seoTitle: 'Net to Gross Salary Calculator UK | Estimate Gross Pay',
    metaDescription: 'Estimate the gross salary needed for a target UK take-home pay. Include pension, student loans and tax region assumptions.',
    h1: 'Net to Gross Salary Calculator UK',
    primaryKeyword: 'net to gross salary calculator UK',
    secondaryKeywords: [
      'reverse salary calculator UK',
      'gross salary from net pay UK',
      'target take home pay calculator UK',
      'how much gross salary do I need UK',
    ],
    directAnswerParagraph:
      'Determine the gross annual salary required to achieve your target net take-home pay in the UK. This reverse salary calculator models Income Tax, National Insurance, pension contributions, and student loans across all UK regions.',
    howItWorks: {
      title: 'How Reverse Net-to-Gross Calculation Works',
      paragraphs: [
        'Calculating gross salary from a desired take-home pay requires inverting the UK PAYE tax schedules. Because Income Tax and National Insurance operate on progressive marginal tiers, the calculation iteratively solves for the exact gross earnings required.',
        'Deductions including workplace pensions (relief-at-source or net pay), student loan repayments, and regional tax bands (such as Scottish income tax) are accounted for in the reverse calculation.',
        'This tool is particularly useful when negotiating job offers, setting contractor remuneration, or planning household budgeting targets.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Enter Desired Take-Home Pay',
          description: 'Input your target net amount on an annual, monthly, or weekly basis.',
        },
        {
          stepNumber: 2,
          title: 'Set Deductions & Region',
          description: 'Specify your tax code, workplace pension percentage, and student loan plan.',
        },
        {
          stepNumber: 3,
          title: 'View Required Gross Salary',
          description: 'See the exact gross salary required and the full breakdown of statutory deductions.',
        },
      ],
    },
    assumptions: [
      'Iterative precision solving matches standard UK PAYE and Class 1 National Insurance algorithms.',
      'Applies statutory Personal Allowance (£12,570) and models the £100,000 taper threshold.',
      'Supports England, Wales, Northern Ireland, and Scottish tax schedules.',
      'Excludes non-standard payroll deductions (e.g. attachment of earnings or union dues).',
    ],
    practicalExample: {
      title: 'Practical Example: Target £3,000 Monthly Take-Home Pay',
      scenario: 'An employee in England wants a net monthly income of £3,000 (£36,000 net/yr) with a 5% workplace pension and Plan 2 student loan.',
      breakdown: [
        { label: 'Target Monthly Net Pay', value: '£3,000.00 / month' },
        { label: 'Target Annual Net Pay', value: '£36,000.00 / year' },
        { label: 'Required Gross Annual Salary', value: '£49,850.00' },
        { label: 'Estimated Annual Income Tax', value: '£7,456.00' },
        { label: 'Estimated Annual National Insurance', value: '£2,982.00' },
        { label: 'Annual Pension Contribution (5%)', value: '£2,492.00' },
        { label: 'Annual Student Loan (Plan 2)', value: '£920.00' },
      ],
      conclusion: 'To take home £3,000 every month, the worker must negotiate a gross salary of approximately £49,850 per year.',
    },
    faqs: [
      {
        question: 'What is a reverse salary (net-to-gross) calculator?',
        answer: 'A reverse salary calculator works backwards from a desired net take-home figure to calculate the gross salary an employer must pay before Income Tax, National Insurance, and other payroll deductions.',
      },
      {
        question: 'How much gross salary do I need to take home £3,000 a month in the UK?',
        answer: 'For a standard taxpayer in England with tax code 1257L and a 5% workplace pension, you need a gross salary of approximately £47,000 to £50,000 per year (depending on whether you have a student loan).',
      },
      {
        question: 'How much gross salary is needed for £4,000 a month take-home?',
        answer: 'To achieve £4,000 net per month (£48,000 net per year), you typically need a gross salary of around £68,000 to £72,000 per year, as earnings above £50,270 are subject to 40% Higher Rate Income Tax.',
      },
      {
        question: 'Does where I live in the UK change the gross salary required?',
        answer: 'Yes. Scotland has separate devolved tax rates (Starter 19%, Basic 20%, Intermediate 21%, Higher 42%, Advanced 45%, Top 48%). A worker in Scotland generally requires a slightly higher gross salary to reach the same net take-home above £28,850.',
      },
      {
        question: 'How do student loans affect my net-to-gross requirement?',
        answer: 'Student loans add a 9% deduction on earnings above your plan\'s threshold. If you have a Plan 2 loan and earn £50,000, you pay approximately £2,043/year in loan repayments, requiring a higher gross salary to hit your take-home goal.',
      },
      {
        question: 'Can employers agree to pay a net guaranteed salary?',
        answer: 'While uncommon in standard PAYE employment, some expatriate contracts and high-level agreements use \'tax equalization\' or guaranteed net pay structures where the employer pays whatever gross amount is needed.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'Standard salary calculator from gross to net take-home pay.',
      },
      {
        title: 'Income Tax Calculator',
        url: '/income-tax-calculator',
        description: 'Detailed Income Tax band breakdown for UK salaries.',
      },
      {
        title: 'Pay Rise Calculator',
        url: '/pay-rise-calculator',
        description: 'Calculate salary increases and net pay improvements.',
      },
    ],
  },

  // 6. REDUNDANCY PAY CALCULATOR
  redundancy_pay: {
    slug: 'redundancy-pay-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/redundancy-pay-calculator',
    seoTitle: 'Redundancy Pay Calculator UK | Statutory Estimate',
    metaDescription: 'Estimate statutory redundancy pay based on age, weekly pay and years of service. Results are general guidance only.',
    h1: 'Redundancy Pay Calculator UK',
    primaryKeyword: 'redundancy pay calculator UK',
    secondaryKeywords: [
      'statutory redundancy pay calculator UK',
      'redundancy payout calculator UK',
      'how much redundancy will I get UK',
      'tax on redundancy pay UK',
    ],
    directAnswerParagraph:
      'Estimate your statutory redundancy payment in the UK based on your age, continuous years of service, and weekly pay. Discover tax exemptions, statutory weekly caps, and potential employer enhanced redundancy packages.',
    howItWorks: {
      title: 'How Statutory Redundancy Pay is Calculated in the UK',
      paragraphs: [
        'To qualify for statutory redundancy pay in the UK, you must be an employee who has worked continuously for your employer for at least 2 full years.',
        'Statutory redundancy is calculated based on age brackets for each completed full year of service: 0.5 week\'s pay for each year under 22; 1.0 week\'s pay for each year aged 22 to 40; and 1.5 weeks\' pay for each year aged 41 and older (capped at 20 years of service).',
        'Weekly pay is subject to a statutory government cap (£700/week for 2024/25 and updated in 2025/26), setting the maximum statutory payout at £21,000. Redundancy payments up to £30,000 are completely free of Income Tax and National Insurance.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Enter Age & Years of Service',
          description: 'Provide your age at redundancy and total completed full years of continuous service (minimum 2 years).',
        },
        {
          stepNumber: 2,
          title: 'Enter Weekly or Annual Pay',
          description: 'Input your gross weekly pay before tax, or your annual salary to calculate weekly equivalent.',
        },
        {
          stepNumber: 3,
          title: 'Calculate Tax-Free Payout',
          description: 'View the statutory week entitlement, age breakdown, and any taxable excess if enhanced pay exceeds £30,000.',
        },
      ],
    },
    assumptions: [
      'Applies UK statutory redundancy rules under the Employment Rights Act 1996.',
      'Requires a minimum of 2 continuous completed years of service with the same employer.',
      'Applies statutory weekly pay cap (£700/week) and 20-year maximum service period.',
      'Applies the statutory £30,000 tax-free exemption threshold for redundancy compensation.',
    ],
    practicalExample: {
      title: 'Practical Example: 45-Year-Old Employee with 10 Years Service',
      scenario: 'An employee aged 45 with 10 completed years of service earns £800/week (statutory cap £700/week applies).',
      breakdown: [
        { label: 'Completed Years Aged 41–45 (4 years @ 1.5 wks)', value: '6.0 weeks' },
        { label: 'Completed Years Aged 35–40 (6 years @ 1.0 wk)', value: '6.0 weeks' },
        { label: 'Total Statutory Weeks Entitlement', value: '12.0 weeks' },
        { label: 'Capped Weekly Pay', value: '£700.00' },
        { label: 'Total Statutory Redundancy Pay', value: '£8,400.00' },
        { label: 'Tax & NI Due (Under £30,000 threshold)', value: '£0.00 (100% Tax-Free)' },
      ],
      conclusion: 'The employee receives a statutory redundancy payout of £8,400 completely tax-free.',
    },
    faqs: [
      {
        question: 'Who qualifies for statutory redundancy pay in the UK?',
        answer: 'You qualify for statutory redundancy pay if you are legally classified as an employee and have worked continuously for your employer for at least 2 full years (104 weeks).',
      },
      {
        question: 'What is the UK statutory weekly pay cap for redundancy in 2025/26?',
        answer: 'The statutory weekly pay cap is set by the UK government (£700 per week for 2024/25 and updated annually each April). If your actual weekly pay is higher, calculations use the capped amount.',
      },
      {
        question: 'How much redundancy pay is tax-free in the UK?',
        answer: 'The first £30,000 of genuine redundancy pay is completely exempt from UK Income Tax and National Insurance. Any redundancy compensation exceeding £30,000 is subject to Income Tax at your marginal rate (no employee NI is deducted).',
      },
      {
        question: 'What is enhanced (contractual) redundancy pay?',
        answer: 'Many UK employers offer enhanced redundancy terms that exceed the statutory minimum (for example, paying uncapped actual weekly salary or multiple weeks per year of service). Check your employment contract or staff handbook.',
      },
      {
        question: 'Are notice pay and holiday pay tax-free when made redundant?',
        answer: 'No. Payment in Lieu of Notice (PILON), accrued untaken holiday pay, and contractual bonuses are classified as general employment earnings and are subject to normal Income Tax and National Insurance deductions.',
      },
      {
        question: 'What is the maximum statutory redundancy payment in the UK?',
        answer: 'Because the calculation caps service at 20 years and maximum entitlement at 30 weeks of pay, the maximum statutory redundancy payout is 30 × £700 = £21,000.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'Calculate salary and payslip deductions for employment earnings.',
      },
      {
        title: 'Income Tax Calculator',
        url: '/income-tax-calculator',
        description: 'Check your marginal tax band on redundancy payments over £30k.',
      },
      {
        title: 'Self-Employed Tax Calculator',
        url: '/self-employed-tax-calculator',
        description: 'Explore tax estimates if transitioning into sole trading or freelancing.',
      },
    ],
  },

  // 7. SELF-EMPLOYED TAX CALCULATOR
  self_employed: {
    slug: 'self-employed-tax-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/self-employed-tax-calculator',
    seoTitle: 'Self-Employed Tax Calculator UK | Tax Estimate',
    metaDescription: 'Estimate Income Tax and National Insurance for UK self-employed profits. Results are for general guidance only.',
    h1: 'Self-Employed Tax Calculator UK',
    primaryKeyword: 'self employed tax calculator UK',
    secondaryKeywords: [
      'sole trader tax calculator UK',
      'freelance tax calculator UK',
      'self assessment tax calculator UK',
      'Class 4 National Insurance calculator',
    ],
    directAnswerParagraph:
      'Estimate your UK Self Assessment tax bill as a sole trader or freelancer. Calculate Income Tax, Class 4 National Insurance, payments on account, and net business profits after allowable business expenses.',
    howItWorks: {
      title: 'How Self-Employed Tax is Calculated in the UK',
      paragraphs: [
        'As a sole trader in the UK, you pay Income Tax and National Insurance on your net taxable trading profits (gross business income minus allowable business expenses).',
        'Self-employed individuals receive the standard £12,570 tax-free Personal Allowance. Profits above this threshold are subject to Income Tax (20%, 40%, 45% or Scottish bands) and Class 4 National Insurance (6% between £12,570 and £50,270, and 2% above £50,270). Compulsory Class 2 NI was abolished from April 2024.',
        'If your total tax and NI bill exceeds £1,000, HMRC requires Payments on Account—advance payments towards next year\'s tax bill due on 31 January and 31 July.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Enter Turnover & Allowable Expenses',
          description: 'Input your total self-employed revenue and deduct allowable business operating expenses.',
        },
        {
          stepNumber: 2,
          title: 'Apply Allowances & Tax Bands',
          description: 'Deduct your Personal Allowance and calculate Income Tax across basic, higher, or Scottish bands.',
        },
        {
          stepNumber: 3,
          title: 'Calculate Class 4 NI & Payments on Account',
          description: 'Compute Class 4 National Insurance and determine upcoming January/July Self Assessment deadlines.',
        },
      ],
    },
    assumptions: [
      'Assumes sole trader status (unincorporated business) submitting an HMRC Self Assessment tax return.',
      'Applies 6% Class 4 National Insurance on profits £12,570–£50,270 and 2% on profits above £50,270.',
      'Models HMRC Payments on Account rules (two 50% advance instalments if bill > £1,000).',
      'Assumes no simultaneous PAYE employment income (use our second job tool if mixing employment and sole trading).',
    ],
    practicalExample: {
      title: 'Practical Example: Freelancer with £50,000 Turnover and £10,000 Expenses',
      scenario: 'A sole trader in England generates £50,000 turnover with £10,000 allowable business costs (net profit £40,000).',
      breakdown: [
        { label: 'Gross Business Turnover', value: '£50,000.00' },
        { label: 'Allowable Business Expenses', value: '-£10,000.00' },
        { label: 'Net Taxable Profit', value: '£40,000.00' },
        { label: 'Personal Allowance (0%)', value: '£12,570.00' },
        { label: 'Income Tax (20% of £27,430)', value: '£5,486.00' },
        { label: 'Class 4 NI (6% of £27,430)', value: '£1,645.80' },
        { label: 'Total Annual Tax & NI Liability', value: '£7,131.80' },
        { label: 'Net Take-Home Profit', value: '£32,868.20' },
      ],
      conclusion: 'The sole trader takes home £32,868.20 (£2,739.02/month) after putting aside £7,131.80 for HMRC Self Assessment.',
    },
    faqs: [
      {
        question: 'How much should a sole trader set aside for tax in the UK?',
        answer: 'Most UK sole traders should set aside 25% to 30% of their net profits into a separate business savings account to cover Income Tax, Class 4 National Insurance, and Payments on Account. Higher-rate earners should save 40% to 45%.',
      },
      {
        question: 'What are allowable expenses for self-employed individuals?',
        answer: 'Allowable expenses are costs incurred \'wholly and exclusively\' for business purposes. Examples include office equipment, phone/broadband, business travel, marketing, insurance, accountancy fees, and a proportion of home utility bills.',
      },
      {
        question: 'What are HMRC Payments on Account?',
        answer: 'Payments on Account are advance payments towards your next tax bill. If your Self Assessment bill exceeds £1,000, HMRC requires you to pay 50% of your bill in advance on 31 January, and the remaining 50% on 31 July.',
      },
      {
        question: 'What happened to Class 2 National Insurance?',
        answer: 'From 6 April 2024, self-employed workers with profits above £12,570 no longer pay compulsory Class 2 National Insurance, saving £179.40/year while still earning State Pension qualifying years.',
      },
      {
        question: 'What is the £1,000 Trading Allowance?',
        answer: 'The £1,000 tax-free Trading Allowance allows individuals with gross casual self-employed income up to £1,000 per year to earn without registering for Self Assessment or paying tax.',
      },
      {
        question: 'When is the UK Self Assessment tax return deadline?',
        answer: 'The online filing and payment deadline is midnight on 31 January following the end of the tax year. For example, for the 2024/25 tax year (ending 5 April 2025), the deadline is 31 January 2026.',
      },
    ],
    relatedCalculators: [
      {
        title: 'VAT Calculator',
        url: '/vat-calculator',
        description: 'Add or remove 20% UK VAT on client invoices and receipts.',
      },
      {
        title: 'Dividend Tax Calculator',
        url: '/dividend-tax-calculator',
        description: 'Compare sole trader taxes against limited company dividends.',
      },
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'Compare self-employed income with an equivalent PAYE salary.',
      },
    ],
  },

  // 8. VAT CALCULATOR
  vat: {
    slug: 'vat-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/vat-calculator',
    seoTitle: 'VAT Calculator UK | Add or Remove VAT',
    metaDescription: 'Add or remove UK VAT from a price. Calculate net amount, VAT amount and gross total for standard VAT rate estimates.',
    h1: 'VAT Calculator UK',
    primaryKeyword: 'VAT calculator UK',
    secondaryKeywords: [
      'add VAT calculator UK',
      'remove VAT calculator UK',
      'VAT reverse calculator UK',
      '20 percent VAT calculator UK',
    ],
    directAnswerParagraph:
      'Add or remove Value Added Tax (VAT) from any amount in seconds. Calculate net price, VAT amount, and gross total using standard (20%), reduced (5%), or zero (0%) UK VAT rates.',
    howItWorks: {
      title: 'How UK Value Added Tax (VAT) is Calculated',
      paragraphs: [
        'Value Added Tax (VAT) is a consumption tax placed on almost all goods and services sold in the UK. The standard UK VAT rate is 20%.',
        'To add 20% VAT to a net amount: multiply the net price by 0.20 to find the VAT amount, or multiply by 1.20 to find the gross total.',
        'To remove 20% VAT from a gross amount (reverse VAT): divide the gross total by 1.20 to find the net price, and subtract the net from the gross to find the VAT element (or multiply gross by 1/6).',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Select Calculation Mode',
          description: 'Choose whether you want to Add VAT (from Net to Gross) or Remove VAT (from Gross to Net).',
        },
        {
          stepNumber: 2,
          title: 'Choose VAT Rate',
          description: 'Select standard rate (20%), reduced rate (5%), or custom percentage.',
        },
        {
          stepNumber: 3,
          title: 'Get Immediate Price Breakdown',
          description: 'View the net amount, VAT charged, and total gross price formatted for invoicing.',
        },
      ],
    },
    assumptions: [
      'Applies UK VAT statutory rates (Standard 20%, Reduced 5%, Zero-rated 0%).',
      'Assumes standard VAT accounting methodology (round half up to nearest penny).',
      'Does not model Flat Rate Scheme (FRS) industry-specific percentages.',
    ],
    practicalExample: {
      title: 'Practical Example: Removing 20% VAT from a £120.00 Gross Receipt',
      scenario: 'A business owner wants to reclaim VAT on a £120.00 gross invoice containing standard 20% UK VAT.',
      breakdown: [
        { label: 'Gross Invoice Total (Inc. VAT)', value: '£120.00' },
        { label: 'Calculation Formula', value: '£120.00 ÷ 1.20' },
        { label: 'Net Amount (Excl. VAT)', value: '£100.00' },
        { label: 'Reclaimable VAT Element (20%)', value: '£20.00' },
      ],
      conclusion: 'The net cost to the business is £100.00 and £20.00 can be reclaimed on their quarterly HMRC VAT return.',
    },
    faqs: [
      {
        question: 'What is the current standard rate of VAT in the UK?',
        answer: 'The standard rate of UK Value Added Tax (VAT) is 20%. It applies to the majority of goods and commercial services.',
      },
      {
        question: 'How do you remove 20% VAT from a total price?',
        answer: 'To remove 20% VAT from a gross price, divide the total by 1.20. For example, £60 ÷ 1.20 = £50 net price, meaning the VAT amount was £10.',
      },
      {
        question: 'Why can\'t I just subtract 20% from the gross total to remove VAT?',
        answer: 'Subtracting 20% from a gross price is mathematically incorrect because 20% was added to the smaller net price, not the larger gross total. Subtracting 20% from £120 gives £96, but the true net price is £100 (VAT is exactly 1/6th or 16.67% of the gross total).',
      },
      {
        question: 'What is the UK VAT registration turnover threshold?',
        answer: 'The UK VAT registration threshold is £90,000 (increased from £85,000 on 1 April 2024). If your rolling 12-month taxable turnover exceeds £90,000, you must register for VAT with HMRC.',
      },
      {
        question: 'What goods qualify for the 5% reduced VAT rate?',
        answer: 'The 5% reduced rate applies to domestic fuel and power, children\'s car seats, mobility aids for the elderly, and smoking cessation products.',
      },
      {
        question: 'What is the difference between zero-rated and exempt VAT items?',
        answer: 'Zero-rated items (such as most food, books, and children\'s clothes) have a 0% VAT rate, but VAT-registered businesses can still reclaim input VAT on related costs. Exempt items (such as financial services, postage stamps, and health services) have no VAT and input VAT cannot be reclaimed.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Self-Employed Tax Calculator',
        url: '/self-employed-tax-calculator',
        description: 'Calculate your Income Tax and National Insurance liabilities.',
      },
      {
        title: 'Dividend Tax Calculator',
        url: '/dividend-tax-calculator',
        description: 'Calculate tax on company dividends taken by business directors.',
      },
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'Calculate employee net pay after PAYE deductions.',
      },
    ],
  },

  // 9. CREDIT CARD REPAYMENT CALCULATOR
  credit_card_repayment: {
    slug: 'credit-card-repayment-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/credit-card-repayment-calculator',
    seoTitle: 'Credit Card Repayment Calculator UK | Payoff Estimate',
    metaDescription: 'Estimate how long it may take to repay a credit-card balance based on interest rate and monthly repayments.',
    h1: 'Credit Card Repayment Calculator UK',
    primaryKeyword: 'credit card repayment calculator UK',
    secondaryKeywords: [
      'credit card payoff calculator UK',
      'credit card interest calculator UK',
      'how long to pay off credit card UK',
      'credit card minimum payment calculator',
    ],
    directAnswerParagraph:
      'Estimate how long it will take to pay off your UK credit card balance and see how much total interest you will pay. Compare standard minimum payments against fixed monthly payment strategies to save thousands.',
    howItWorks: {
      title: 'How Credit Card Interest & Repayments Work in the UK',
      paragraphs: [
        'UK credit card interest is calculated daily and compounded monthly based on your Annual Percentage Rate (APR). If you carry a balance from month to month, interest is added to your account.',
        'Standard minimum repayments in the UK are typically set to the greater of £5, 2.5% of the outstanding balance, or 1% of the principal plus monthly interest. Paying only the minimum results in long repayment timelines and excessive interest costs.',
        'Switching to a fixed monthly repayment or paying off your balance within a target timeframe rapidly decreases principal debt and drastically reduces the total interest paid.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Enter Card Balance & APR',
          description: 'Input your current credit card balance and annual interest rate (e.g. 24.9% APR).',
        },
        {
          stepNumber: 2,
          title: 'Choose Repayment Strategy',
          description: 'Select minimum payment only, fixed monthly payment amount, or target payoff timeline.',
        },
        {
          stepNumber: 3,
          title: 'View Payoff Timeline & Savings',
          description: 'Review total interest paid, months to debt-free status, and comparison against minimum payments.',
        },
      ],
    },
    assumptions: [
      'Assumes no additional spending or purchases are added to the card balance during the repayment period.',
      'Interest is compounded monthly based on the nominal equivalent of the stated APR.',
      'Minimum repayment calculation follows the standard UK regulatory formula: max(£5, 2.5% balance, 1% balance + interest).',
      'Does not include annual card fees or late payment penalties.',
    ],
    practicalExample: {
      title: 'Practical Example: £3,000 Balance at 24.9% APR (£150 Fixed vs Minimum)',
      scenario: 'A cardholder with a £3,000 balance at 24.9% APR compares paying £150 fixed each month against paying only the required minimum.',
      breakdown: [
        { label: 'Current Credit Card Balance', value: '£3,000.00' },
        { label: 'Annual Interest Rate (APR)', value: '24.9%' },
        { label: 'Minimum Payment Only Timeline', value: '18 years 5 months' },
        { label: 'Minimum Payment Total Interest', value: '£3,240.00' },
        { label: 'Fixed £150/month Timeline', value: '2 years 2 months (26 months)' },
        { label: 'Fixed £150/month Total Interest', value: '£815.00' },
        { label: 'Total Interest Saved', value: '£2,425.00' },
      ],
      conclusion: 'By fixing repayments at £150/month instead of minimum payments, the cardholder becomes debt-free 16 years earlier and saves over £2,400 in interest.',
    },
    faqs: [
      {
        question: 'Why do minimum credit card payments take so long to clear debt?',
        answer: 'As your balance decreases, the required minimum payment decreases alongside it. This means you repay progressively less principal each month, dragging out the repayment term across decades and racking up substantial interest charges.',
      },
      {
        question: 'What is a typical credit card APR in the UK?',
        answer: 'As of 2025/2026, typical representative credit card APRs in the UK range from 21.9% to 29.9%, with the average hovering around 24.9% for standard credit cards. Specialist credit builder cards can exceed 34.9%.',
      },
      {
        question: 'How is daily interest calculated on a UK credit card?',
        answer: 'Daily interest is calculated by dividing your annual interest rate by 365 and multiplying by your daily balance. At 24.9% APR, a £3,000 balance accumulates roughly £2.05 of interest every single day.',
      },
      {
        question: 'What is a 0% balance transfer credit card?',
        answer: 'A 0% balance transfer card allows you to move existing high-interest credit card debt to a new provider with 0% interest for a promotional period (typically 12 to 30 months), usually in exchange for a one-off transfer fee of 1.5% to 3.5%.',
      },
      {
        question: 'What are persistent debt rules in the UK?',
        answer: 'Under Financial Conduct Authority (FCA) rules, if you have paid more in interest and charges than principal over an 18 to 36 month period, your lender must contact you and encourage you to increase your payments to clear the balance within 3 to 4 years.',
      },
      {
        question: 'Will paying off my credit card early hurt my credit score?',
        answer: 'No. Clearing your balance reduces your credit utilisation ratio (the percentage of available credit you are using), which is one of the most positive factors for boosting your UK credit score.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Savings Interest Calculator',
        url: '/savings-calculator',
        description: 'See how savings compound interest compares to debt interest.',
      },
      {
        title: 'Mortgage Affordability Calculator',
        url: '/mortgage-affordability-calculator',
        description: 'See how clearing card debt boosts your mortgage borrowing power.',
      },
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'Calculate your disposable income available for debt repayment.',
      },
    ],
  },

  // 10. CHILD BENEFIT CALCULATOR
  child_benefit: {
    slug: 'child-benefit-calculator',
    canonicalUrl: 'https://www.paywiseuk.co.uk/child-benefit-calculator',
    seoTitle: 'Child Benefit Calculator UK | Estimate Payments',
    metaDescription: 'Estimate UK Child Benefit payments and a possible High Income Child Benefit Charge. Results are for general guidance only.',
    h1: 'Child Benefit Calculator UK',
    primaryKeyword: 'child benefit calculator UK',
    secondaryKeywords: [
      'High Income Child Benefit Charge calculator',
      'child benefit tax charge calculator UK',
      'child benefit rates UK',
      'child benefit 60k threshold UK',
    ],
    directAnswerParagraph:
      'Estimate your UK Child Benefit payments and check if you are affected by the High Income Child Benefit Charge (HICBC). Discover rates, clawback calculations between £60,000 and £80,000, and strategies to protect your allowance.',
    howItWorks: {
      title: 'How UK Child Benefit & The High Income Charge Work',
      paragraphs: [
        'Child Benefit is a tax-free payment made to parents or guardians responsible for raising a child under 16 (or under 20 if in approved full-time education or training).',
        'Payments are £26.05 per week for the eldest or only child and £17.25 per week for each additional child for the 2025/26 tax year (£25.60 and £16.95 for 2024/25).',
        'Under the updated High Income Child Benefit Charge (HICBC) rules, if either parent earns over £60,000 adjusted net income, a tax charge claws back 1% of the benefit for every £200 earned above £60,000, resulting in a 100% clawback at £80,000.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Enter Number of Qualifying Children',
          description: 'Specify how many children you are claiming for under the age of 16 (or under 20 in education).',
        },
        {
          stepNumber: 2,
          title: 'Enter Higher Earner\'s Income',
          description: 'Input the adjusted net income of the partner with the higher taxable earnings.',
        },
        {
          stepNumber: 3,
          title: 'Review Benefit & HICBC Clawback',
          description: 'See the gross benefit, HICBC tax charge, net annual amount, and pension mitigation advice.',
        },
      ],
    },
    assumptions: [
      'Reflects the Spring Budget updated HICBC thresholds: charge begins at £60,000 and full clawback occurs at £80,000.',
      'Child Benefit rates reflect official statutory figures for the selected tax year.',
      'Adjusted net income is calculated after deducting gift aid donations and gross personal pension contributions.',
      'Only the higher-earning partner\'s income is tested against the £60,000 threshold (incomes are not combined).',
    ],
    practicalExample: {
      title: 'Practical Example: 2 Children with Higher Earner on £70,000 Salary',
      scenario: 'A family in the UK with 2 qualifying children has a higher-earning partner with an adjusted net income of £70,000.',
      breakdown: [
        { label: 'Number of Children', value: '2 children' },
        { label: 'Weekly Gross Child Benefit', value: '£43.30 / week (£26.05 + £17.25)' },
        { label: 'Annual Gross Child Benefit', value: '£2,251.60 / year' },
        { label: 'Higher Earner Adjusted Net Income', value: '£70,000.00' },
        { label: 'Income Above £60,000 Threshold', value: '£10,000.00' },
        { label: 'HICBC Clawback Percentage', value: '50% (1% per £200 over £60k)' },
        { label: 'High Income Tax Charge (HICBC)', value: '£1,125.80 / year' },
        { label: 'Net Retained Child Benefit', value: '£1,125.80 / year (£93.82 / month)' },
      ],
      conclusion: 'The family keeps £1,125.80 net per year. Making a £10,000 pension contribution would reduce adjusted net income to £60,000, eliminating the charge completely.',
    },
    faqs: [
      {
        question: 'What is the Child Benefit threshold for 2025/26?',
        answer: 'The High Income Child Benefit Charge begins when the higher earner in a household has an adjusted net income over £60,000 (increased from £50,000 in April 2024). The benefit is fully clawed back when income reaches £80,000 (previously £60,000).',
      },
      {
        question: 'How much is Child Benefit in the UK?',
        answer: 'For the 2025/26 tax year, Child Benefit is £26.05 per week for the eldest or only child (£1,354.60/year) and £17.25 per week for each additional child (£897.00/year).',
      },
      {
        question: 'Can pension contributions eliminate the High Income Child Benefit Charge?',
        answer: 'Yes! HICBC is based on \'Adjusted Net Income\' (gross taxable income minus pension contributions and Gift Aid). Contributing into a workplace salary sacrifice or personal SIPP pension reduces your adjusted income, potentially bringing you below £60,000.',
      },
      {
        question: 'Should I still claim Child Benefit if I earn over £80,000?',
        answer: 'Yes. You should still submit the Child Benefit claim form and choose to opt out of receiving payments. This protects the non-working or lower-earning parent\'s National Insurance credits towards their State Pension and ensures your child automatically receives a National Insurance number at 16.',
      },
      {
        question: 'Is Child Benefit based on household income or individual income?',
        answer: 'Under current rules, the charge is based on the individual income of the higher earner, not combined household income. A couple earning £59,000 each (£118,000 combined) pays £0 charge, while a single earner on £70,000 pays a 50% charge.',
      },
      {
        question: 'How do I pay the High Income Child Benefit Charge to HMRC?',
        answer: 'The higher-earning partner must register for Self Assessment and complete a tax return each year to report and pay the HICBC charge, or arrange for HMRC to collect it via an adjustment to their PAYE tax code.',
      },
    ],
    relatedCalculators: [
      {
        title: 'Take-Home Pay Calculator',
        url: '/take-home-pay-calculator',
        description: 'See your complete net salary after PAYE tax and NI.',
      },
      {
        title: 'Income Tax Calculator',
        url: '/income-tax-calculator',
        description: 'Check your adjusted net income for the £60,000 threshold.',
      },
      {
        title: 'Pay Rise Calculator',
        url: '/pay-rise-calculator',
        description: 'See if a salary increase will trigger the Child Benefit charge.',
      },
    ],
  },
};

