/**
 * PayWise UK — single currency formatter.
 * Use for every displayed money value so a value like 5082.528 can never
 * render as £5,082.528. Non-currency numbers (percentages, years, counts)
 * must NOT use this helper.
 */
const formatters = new Map<number, Intl.NumberFormat>();

function getFormatter(decimals: number): Intl.NumberFormat {
  if (!formatters.has(decimals)) {
    formatters.set(
      decimals,
      new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    );
  }
  return formatters.get(decimals)!;
}

export function formatGBP(value: number | null | undefined, decimals = 2): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return getFormatter(decimals).format(0);
  }
  return getFormatter(decimals).format(value);
}
