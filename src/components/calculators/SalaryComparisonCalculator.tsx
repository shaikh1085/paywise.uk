import React, { useMemo } from 'react';
import {
  SalaryComparisonInput,
  SalaryComparisonScenario,
  TaxYear,
  TaxRegion,
  StudentLoanPlan,
  PensionType,
} from '../../types';
import { calculateSalaryComparison } from '../../utils/calculations';
import { useCalculatorSessionStorage } from '../../hooks/useCalculatorSessionStorage';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import {
  GitCompare,
  RotateCcw,
  Plus,
  Trash2,
  Sparkles,
  TrendingUp,
  Percent,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';

const DEFAULT_SCENARIOS: SalaryComparisonScenario[] = [
  { id: '1', label: 'Offer A (Baseline)', grossSalary: 35000, pensionPercentage: 5, studentLoanPlan: 'none' },
  { id: '2', label: 'Offer B', grossSalary: 45000, pensionPercentage: 5, studentLoanPlan: 'none' },
  { id: '3', label: 'Offer C', grossSalary: 55000, pensionPercentage: 5, studentLoanPlan: 'none' },
  { id: '4', label: 'Offer D', grossSalary: 70000, pensionPercentage: 5, studentLoanPlan: 'none' },
];

const PRESETS = [
  {
    label: 'Standard Career Steps (£30k – £60k)',
    scenarios: [
      { id: '1', label: 'Entry (£30k)', grossSalary: 30000 },
      { id: '2', label: 'Mid (£40k)', grossSalary: 40000 },
      { id: '3', label: 'Senior (£50k)', grossSalary: 50000 },
      { id: '4', label: 'Lead (£60k)', grossSalary: 60000 },
    ],
  },
  {
    label: 'Higher-Rate Crossing (£45k – £75k)',
    scenarios: [
      { id: '1', label: 'Current (£45k)', grossSalary: 45000 },
      { id: '2', label: 'Offer 1 (£52k)', grossSalary: 52000 },
      { id: '3', label: 'Offer 2 (£60k)', grossSalary: 60000 },
      { id: '4', label: 'Offer 3 (£75k)', grossSalary: 75000 },
    ],
  },
  {
    label: '£100k Taper Trap Range (£90k – £130k)',
    scenarios: [
      { id: '1', label: '£95,000 (Safe)', grossSalary: 95000 },
      { id: '2', label: '£105,000 (Tapered)', grossSalary: 105000 },
      { id: '3', label: '£115,000 (Tapered)', grossSalary: 115000 },
      { id: '4', label: '£125,000 (Zero PA)', grossSalary: 125000 },
    ],
  },
];

export const SalaryComparisonCalculator: React.FC = () => {
  const [input, setInput, resetInput] = useCalculatorSessionStorage<SalaryComparisonInput>(
    'salary_comparison_v1',
    {
      scenarios: DEFAULT_SCENARIOS,
      taxYear: '2025_26',
      region: 'england_ni',
      taxCode: '1257L',
      pensionType: 'net_pay',
    }
  );

  const result = useMemo(() => calculateSalaryComparison(input), [input]);

  const fmt = (n: number) =>
    '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const fmtWhole = (n: number) =>
    '£' + Math.round(n).toLocaleString('en-GB');

  const handleScenarioChange = (
    index: number,
    field: keyof SalaryComparisonScenario,
    val: string | number
  ) => {
    const updated = [...input.scenarios];
    updated[index] = { ...updated[index], [field]: val };
    setInput((prev) => ({ ...prev, scenarios: updated }));
  };

  const handleAddScenario = () => {
    if (input.scenarios.length >= 6) return;
    const lastSalary = input.scenarios[input.scenarios.length - 1]?.grossSalary || 40000;
    const nextSalary = lastSalary + 10000;
    const newScenario: SalaryComparisonScenario = {
      id: Date.now().toString(),
      label: `Option ${String.fromCharCode(65 + input.scenarios.length)}`,
      grossSalary: nextSalary,
      pensionPercentage: 5,
      studentLoanPlan: 'none',
    };
    setInput((prev) => ({ ...prev, scenarios: [...prev.scenarios, newScenario] }));
  };

  const handleRemoveScenario = (index: number) => {
    if (input.scenarios.length <= 2) return;
    const updated = input.scenarios.filter((_, i) => i !== index);
    setInput((prev) => ({ ...prev, scenarios: updated }));
  };

  const handleApplyPreset = (preset: (typeof PRESETS)[0]) => {
    setInput((prev) => ({
      ...prev,
      scenarios: preset.scenarios.map((s) => ({
        ...s,
        pensionPercentage: 5,
        studentLoanPlan: 'none',
      })),
    }));
  };

  const copyText = `PayWise UK — Salary Comparison Analysis:
Tax Year: ${result.taxYearLabel} | Region: ${input.region === 'scotland' ? 'Scotland' : input.region === 'wales' ? 'Wales' : 'England / NI'}
--------------------------------------------------
${result.items
  .map(
    (item, idx) =>
      `[${item.label}]
  Gross Salary: ${fmt(item.grossSalary)}
  Net Take-Home: ${fmt(item.takeHomeAnnual)}/yr (${fmt(item.takeHomeMonthly)}/mo)
  Income Tax: ${fmt(item.incomeTaxAnnual)} | NI: ${fmt(item.employeeNiAnnual)}
  Effective Tax Rate: ${item.effectiveTaxRate.toFixed(1)}%
  ${
    idx > 0
      ? `Diff from Baseline: +${fmt(item.diffAnnualFromBaseline)}/yr (+${fmt(item.diffMonthlyFromBaseline)}/mo) | Retention: ${item.retentionRateFromBaseline.toFixed(0)}%`
      : 'Baseline scenario'
  }`
  )
  .join('\n\n')}

Calculated via PayWise UK (https://paywiseuk.vercel.app/salary-comparison-calculator)`;

  return (
    <div className="space-y-8">
      {/* Top Controls Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.25)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
            Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="text-xs px-3 py-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#D4D4D4] hover:border-[#059669] dark:hover:border-[#10B981] hover:text-[#059669] font-medium transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Tax Region */}
          <div className="flex items-center rounded-lg border border-[#E5E5E5] dark:border-[#303030] p-0.5 bg-[#FAFAFA] dark:bg-[#151515]">
            {[
              { key: 'england_ni' as TaxRegion, label: 'rUK' },
              { key: 'scotland' as TaxRegion, label: 'Scotland' },
              { key: 'wales' as TaxRegion, label: 'Wales' },
            ].map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setInput((prev) => ({ ...prev, region: r.key }))}
                className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${
                  (input.region || 'england_ni') === r.key
                    ? 'bg-[#059669] text-white'
                    : 'text-[#737373] dark:text-[#A3A3A3] hover:text-[#111111]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={resetInput}
            className="flex items-center gap-1 text-xs text-[#737373] hover:text-[#111111] dark:hover:text-[#F5F5F5] px-2.5 py-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#303030] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Scenarios Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {input.scenarios.map((scenario, idx) => {
          const isBaseline = idx === 0;
          return (
            <div
              key={scenario.id}
              className={`relative rounded-2xl p-5 border transition-all ${
                isBaseline
                  ? 'bg-white dark:bg-[#171717] border-[#059669] dark:border-[#10B981] shadow-md ring-1 ring-[#059669]/20'
                  : 'bg-white dark:bg-[#171717] border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs hover:border-[#059669]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  value={scenario.label}
                  onChange={(e) => handleScenarioChange(idx, 'label', e.target.value)}
                  className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] bg-transparent border-b border-transparent hover:border-[#CCCCCC] focus:border-[#059669] focus:outline-none px-0.5 py-0.5 max-w-[150px]"
                />
                <div className="flex items-center gap-1.5">
                  {isBaseline && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#059669]/10 text-[#059669] dark:text-[#10B981]">
                      Baseline
                    </span>
                  )}
                  {!isBaseline && input.scenarios.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveScenario(idx)}
                      className="text-[#A3A3A3] hover:text-rose-600 transition-colors p-1"
                      aria-label="Remove scenario"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#737373] dark:text-[#A3A3A3] mb-1">
                    Gross Annual Salary
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#737373] font-bold text-sm">£</span>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={scenario.grossSalary || ''}
                      onChange={(e) =>
                        handleScenarioChange(idx, 'grossSalary', Math.max(0, parseFloat(e.target.value) || 0))
                      }
                      className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] pl-7 pr-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#737373] dark:text-[#A3A3A3] mb-1">
                      Pension %
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      value={scenario.pensionPercentage ?? 5}
                      onChange={(e) =>
                        handleScenarioChange(
                          idx,
                          'pensionPercentage',
                          Math.max(0, parseFloat(e.target.value) || 0)
                        )
                      }
                      className="block w-full rounded-lg border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] px-2.5 py-1.5 text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#737373] dark:text-[#A3A3A3] mb-1">
                      Student Loan
                    </label>
                    <select
                      value={scenario.studentLoanPlan || 'none'}
                      onChange={(e) =>
                        handleScenarioChange(idx, 'studentLoanPlan', e.target.value as StudentLoanPlan)
                      }
                      className="block w-full rounded-lg border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] px-1.5 py-1.5 text-[11px] font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] focus:outline-none"
                    >
                      <option value="none">No Loan</option>
                      <option value="plan1">Plan 1</option>
                      <option value="plan2">Plan 2</option>
                      <option value="plan4">Plan 4</option>
                      <option value="plan5">Plan 5</option>
                      <option value="postgrad">Postgrad</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {input.scenarios.length < 6 && (
          <button
            type="button"
            onClick={handleAddScenario}
            className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-[#E5E5E5] dark:border-[#303030] hover:border-[#059669] dark:hover:border-[#10B981] text-[#737373] dark:text-[#A3A3A3] hover:text-[#059669] dark:hover:text-[#10B981] transition-all group min-h-[160px]"
          >
            <Plus className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Add Another Scenario</span>
            <span className="text-[10px] text-[#A3A3A3]">Compare up to 6 salaries</span>
          </button>
        )}
      </div>

      {/* Comparison Results Table & Cards */}
      <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div>
            <h2 className="text-lg font-black text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
              Side-by-Side Take-Home Comparison Matrix
            </h2>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">
              Accurate for UK Tax Year {result.taxYearLabel} • All deductions and marginal thresholds factored
            </p>
          </div>

          <ExportActions
            title="Salary Comparison Analysis"
            copyText={copyText}
            variant="compact"
          />
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-left text-[#737373] dark:text-[#A3A3A3]">
                <th className="pb-3 font-bold">Scenario / Metric</th>
                {result.items.map((item, idx) => (
                  <th
                    key={item.id}
                    className={`pb-3 text-right font-bold ${
                      idx === 0 ? 'text-[#059669] dark:text-[#10B981]' : 'text-[#111111] dark:text-[#F5F5F5]'
                    }`}
                  >
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0] dark:divide-[#222222]">
              <tr className="bg-[#FAFAFA] dark:bg-[#151515] font-bold">
                <td className="py-2.5 px-2 text-[#111111] dark:text-[#F5F5F5]">Gross Annual Salary</td>
                {result.items.map((item) => (
                  <td key={item.id} className="py-2.5 text-right font-black text-sm text-[#111111] dark:text-[#F5F5F5]">
                    {fmtWhole(item.grossSalary)}
                  </td>
                ))}
              </tr>

              <tr className="bg-[#059669]/10 dark:bg-[#10B981]/15 font-black">
                <td className="py-3 px-2 text-[#059669] dark:text-[#10B981]">
                  Net Take-Home (Annual)
                </td>
                {result.items.map((item) => (
                  <td key={item.id} className="py-3 text-right text-base text-[#059669] dark:text-[#10B981]">
                    <AnimatedNumber value={item.takeHomeAnnual} prefix="£" />
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2.5 px-2 text-[#525252] dark:text-[#A3A3A3] font-semibold">Net Take-Home (Monthly)</td>
                {result.items.map((item) => (
                  <td key={item.id} className="py-2.5 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {fmt(item.takeHomeMonthly)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2 px-2 text-[#525252] dark:text-[#A3A3A3]">Net Take-Home (Weekly)</td>
                {result.items.map((item) => (
                  <td key={item.id} className="py-2 text-right text-[#737373] dark:text-[#A3A3A3]">
                    {fmt(item.takeHomeWeekly)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2 px-2 text-[#525252] dark:text-[#A3A3A3]">Income Tax</td>
                {result.items.map((item) => (
                  <td key={item.id} className="py-2 text-right text-rose-600 dark:text-rose-400 font-semibold">
                    -{fmt(item.incomeTaxAnnual)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2 px-2 text-[#525252] dark:text-[#A3A3A3]">National Insurance</td>
                {result.items.map((item) => (
                  <td key={item.id} className="py-2 text-right text-rose-600 dark:text-rose-400 font-semibold">
                    -{fmt(item.employeeNiAnnual)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2 px-2 text-[#525252] dark:text-[#A3A3A3]">Pension Contribution</td>
                {result.items.map((item) => (
                  <td key={item.id} className="py-2 text-right text-[#737373] dark:text-[#A3A3A3]">
                    -{fmt(item.pensionAnnual)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2 px-2 text-[#525252] dark:text-[#A3A3A3]">Student Loan Repayment</td>
                {result.items.map((item) => (
                  <td key={item.id} className="py-2 text-right text-[#737373] dark:text-[#A3A3A3]">
                    {item.studentLoanAnnual > 0 ? `-${fmt(item.studentLoanAnnual)}` : '£0.00'}
                  </td>
                ))}
              </tr>

              <tr className="bg-[#FAFAFA] dark:bg-[#151515]">
                <td className="py-2 px-2 text-[#525252] dark:text-[#A3A3A3] font-semibold">Effective Tax + NI Rate</td>
                {result.items.map((item) => (
                  <td key={item.id} className="py-2 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {item.effectiveTaxRate.toFixed(1)}%
                  </td>
                ))}
              </tr>

              {/* Delta relative to baseline */}
              <tr className="border-t-2 border-[#E5E5E5] dark:border-[#2A2A2A] bg-amber-500/5 dark:bg-amber-500/10">
                <td className="py-2.5 px-2 text-[#111111] dark:text-[#F5F5F5] font-bold">
                  Take-Home Difference vs Baseline
                </td>
                {result.items.map((item, idx) => (
                  <td key={item.id} className="py-2.5 text-right font-black text-xs">
                    {idx === 0 ? (
                      <span className="text-[#A3A3A3]">—</span>
                    ) : (
                      <span className={item.diffAnnualFromBaseline >= 0 ? 'text-[#059669] dark:text-[#10B981]' : 'text-rose-600'}>
                        {item.diffAnnualFromBaseline >= 0 ? '+' : ''}
                        {fmt(item.diffAnnualFromBaseline)}/yr
                        <span className="block text-[10px] font-normal text-[#737373]">
                          ({item.diffMonthlyFromBaseline >= 0 ? '+' : ''}{fmt(item.diffMonthlyFromBaseline)}/mo)
                        </span>
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              <tr className="bg-amber-500/5 dark:bg-amber-500/10">
                <td className="py-2 px-2 text-[#525252] dark:text-[#A3A3A3] font-semibold">
                  Retention Rate (% of extra gross kept)
                </td>
                {result.items.map((item, idx) => (
                  <td key={item.id} className="py-2 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {idx === 0 ? <span className="text-[#A3A3A3]">—</span> : `${item.retentionRateFromBaseline.toFixed(0)}% kept`}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Visual Waterfall/Bar Breakdown Cards */}
        <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] mb-4">
            Gross Salary Allocation Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {result.items.map((item) => {
              const netPct = item.grossSalary > 0 ? (item.takeHomeAnnual / item.grossSalary) * 100 : 0;
              const taxPct = item.grossSalary > 0 ? (item.incomeTaxAnnual / item.grossSalary) * 100 : 0;
              const niPct = item.grossSalary > 0 ? (item.employeeNiAnnual / item.grossSalary) * 100 : 0;
              const otherPct = Math.max(0, 100 - netPct - taxPct - niPct);

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] space-y-2.5"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">{item.label}</span>
                    <span className="font-mono font-bold text-[#059669] dark:text-[#10B981]">
                      {netPct.toFixed(0)}% Net
                    </span>
                  </div>

                  {/* Multi-segment progress bar */}
                  <div className="h-3 w-full bg-[#E5E5E5] dark:bg-[#303030] rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${netPct}%` }}
                      className="bg-[#059669] dark:bg-[#10B981] h-full"
                      title={`Take-Home: ${netPct.toFixed(1)}%`}
                    />
                    <div
                      style={{ width: `${taxPct}%` }}
                      className="bg-rose-500 h-full"
                      title={`Income Tax: ${taxPct.toFixed(1)}%`}
                    />
                    <div
                      style={{ width: `${niPct}%` }}
                      className="bg-amber-500 h-full"
                      title={`NI: ${niPct.toFixed(1)}%`}
                    />
                    <div
                      style={{ width: `${otherPct}%` }}
                      className="bg-indigo-500 h-full"
                      title={`Pension & Student Loan: ${otherPct.toFixed(1)}%`}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-[#737373] dark:text-[#A3A3A3] pt-1">
                    <span>Take-home: {fmtWhole(item.takeHomeAnnual)}</span>
                    <span>Deductions: {fmtWhole(item.totalDeductionsAnnual)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
