import type { Ending } from "@/lib/scoring";
import type { EndingCount } from "@/lib/stats";

const SWATCH: Record<Ending, string> = {
  hired: "bg-ballpoint",
  declined: "bg-ballpoint/45",
  rejected: "bg-rejected",
  withdrew: "bg-muted",
  ghosted:
    "bg-[repeating-linear-gradient(135deg,var(--ghost)_0_3px,transparent_3px_6px)] ring-1 ring-inset ring-ghost",
};

/** Where Candidates ended up: one stacked bar plus a legend with counts. */
export function EndingBar({ endings, total }: { endings: EndingCount[]; total: number }) {
  if (total === 0) {
    return <p className="text-sm text-muted">No outcomes yet.</p>;
  }
  const present = endings.filter((e) => e.count > 0);
  const summary = present.map((e) => `${e.label} ${e.count}`).join(", ");

  return (
    <div>
      <div
        role="img"
        aria-label={`Outcomes of ${total} reviews: ${summary}`}
        className="flex h-3 gap-0.5 overflow-hidden rounded-full"
      >
        {present.map((e) => (
          <span
            key={e.ending}
            className={SWATCH[e.ending]}
            style={{ width: `${(e.count / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
        {endings.map((e) => (
          <li key={e.ending} className={`flex items-center gap-2 ${e.count === 0 ? "text-muted" : ""}`}>
            <span className={`inline-block size-2.5 rounded-sm ${SWATCH[e.ending]}`} aria-hidden="true" />
            {e.label}
            <span className="font-semibold tabular-nums">{e.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
