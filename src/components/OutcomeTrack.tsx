import { STAGES, trackState } from "@/lib/scoring";

/**
 * How far a Candidate got and how it ended, drawn as a five-stage line.
 * The caption carries the same information as text.
 */
export function OutcomeTrack({
  stage,
  ending,
  className = "",
}: {
  stage: string;
  ending: string;
  className?: string;
}) {
  const track = trackState(stage, ending);

  return (
    <figure className={className} data-ending={track.ending}>
      <ol className="track-stages" aria-hidden="true">
        {STAGES.map((item, index) => {
          const state =
            index < track.reached ? "done" : index === track.reached ? "current" : "future";
          return (
            <li key={item.value} className="track-stage" data-state={state}>
              <span className="track-node">
                {state === "current" ? <EndMark ending={track.ending} /> : null}
              </span>
              <span className="track-label">
                {state === "current" ? <span className="marker">{item.label}</span> : item.label}
              </span>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-2 text-sm text-muted">{track.caption}</figcaption>
    </figure>
  );
}

function EndMark({ ending }: { ending: string }) {
  if (ending === "hired") {
    return (
      <svg viewBox="0 0 8 8" className="size-2 text-on-ballpoint" fill="none" aria-hidden="true">
        <path d="M1.2 4.2 3.1 6 6.8 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (ending === "rejected") {
    return (
      <svg viewBox="0 0 8 8" className="size-2 text-surface" fill="none" aria-hidden="true">
        <path d="M2 2 6 6M6 2 2 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return null;
}
