import { ENDINGS, type Ending } from "./scoring";

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

/** Share of items matching, from 0 to 1. Null when there is nothing to measure. */
export function share(matching: number, total: number): number | null {
  return total === 0 ? null : matching / total;
}

export function formatShare(value: number | null | undefined): string {
  return value == null ? "—" : `${Math.round(value * 100)}%`;
}

export type EndingCount = { ending: Ending; label: string; count: number };

/** Count of reviews per ending, in the fixed ENDINGS order, including zeros. */
export function endingDistribution(endings: string[]): EndingCount[] {
  return ENDINGS.map((item) => ({
    ending: item.value,
    label: item.label,
    count: endings.filter((value) => value === item.value).length,
  }));
}
