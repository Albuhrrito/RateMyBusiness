import { formatScore, SCORE_DIMENSIONS, type DimensionKey } from "@/lib/scoring";

export function ScoreBars({ scores }: { scores: Record<DimensionKey, number | null> }) {
  return (
    <dl className="space-y-3">
      {SCORE_DIMENSIONS.map((dim) => {
        const value = scores[dim.key];
        return (
          <div key={dim.key} className="grid grid-cols-[8.5rem_1fr_2.25rem] items-center gap-3">
            <dt className="text-sm text-muted">{dim.label}</dt>
            <dd className="h-1.5 overflow-hidden rounded-full bg-rule" aria-hidden="true">
              <span
                className="block h-full rounded-full bg-ballpoint"
                style={{ width: `${((value ?? 0) / 5) * 100}%` }}
              />
            </dd>
            <dd className="text-right text-sm font-semibold tabular-nums">{formatScore(value)}</dd>
          </div>
        );
      })}
    </dl>
  );
}
