import Link from "next/link";
import type { ReactNode } from "react";
import { formatScore, SCORE_DIMENSIONS } from "@/lib/scoring";
import type { ReviewListItem } from "@/server/reviews";
import { OutcomeTrack } from "./OutcomeTrack";

export function ReviewEntry({
  review,
  company,
  actions,
}: {
  review: ReviewListItem;
  /** Shown when the list mixes companies, e.g. on the home page. */
  company?: { name: string; slug: string };
  actions?: ReactNode;
}) {
  const month = review.createdAt.toLocaleString("en-US", { month: "short", year: "numeric" });
  const facts = [
    review.processLengthWeeks != null
      ? `${review.processLengthWeeks} ${review.processLengthWeeks === 1 ? "week" : "weeks"}`
      : null,
    review.takeHomeAssigned ? "Take-home assignment" : "No take-home",
    review.wouldApplyAgain ? "Would apply again" : "Wouldn't apply again",
  ].filter(Boolean);

  return (
    <article className="max-w-3xl border-t border-rule py-7">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {company ? (
            <p className="text-sm">
              <Link href={`/companies/${company.slug}`} className="font-semibold text-ballpoint hover:underline">
                {company.name}
              </Link>
            </p>
          ) : null}
          <h3 className="text-lg font-semibold leading-snug">{review.roleTitle}</h3>
          <p className="text-sm text-muted">
            <time dateTime={review.createdAt.toISOString()}>{month}</time>
          </p>
        </div>
        <p className="shrink-0 text-right">
          <span className="block text-2xl font-bold tabular-nums">{formatScore(review.overall)}</span>
          <span className="text-xs text-muted">out of 5</span>
        </p>
      </header>

      <OutcomeTrack stage={review.stageReached} ending={review.ending} className="mt-5 max-w-xl" />

      <p className="mt-5 max-w-[68ch] leading-relaxed">{review.body}</p>

      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {SCORE_DIMENSIONS.map((dim) => (
          <div key={dim.key} className="flex gap-1.5">
            <dt className="text-muted">{dim.label}</dt>
            <dd className="font-semibold tabular-nums">{review[dim.key]}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
        {facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>

      {review.sourceUrl ? (
        <p className="mt-4 text-sm text-muted">
          Summarized from{" "}
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-ballpoint underline decoration-ballpoint/40 underline-offset-4 hover:decoration-ballpoint"
          >
            a public account on {review.sourceName ?? "the web"}
          </a>
          . Scores are estimated from the account.
        </p>
      ) : null}

      {actions ? <div className="mt-4">{actions}</div> : null}
    </article>
  );
}
