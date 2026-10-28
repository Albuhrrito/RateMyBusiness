export const SCORE_DIMENSIONS = [
  { key: "communication", label: "Communication" },
  { key: "timeliness", label: "Timeliness" },
  { key: "interviewQuality", label: "Interview quality" },
  { key: "processClarity", label: "Process clarity" },
  { key: "professionalism", label: "Professionalism" },
] as const;

export type DimensionKey = (typeof SCORE_DIMENSIONS)[number]["key"];

export type DimensionScores = Record<DimensionKey, number>;

/** Mean of the five dimension scores, rounded to one decimal. */
export function overallFromDimensions(scores: DimensionScores): number {
  const sum = SCORE_DIMENSIONS.reduce((total, dim) => total + scores[dim.key], 0);
  return Math.round((sum / SCORE_DIMENSIONS.length) * 10) / 10;
}

export function formatScore(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  return value.toFixed(1);
}

/** How far a Candidate got, in order. */
export const STAGES = [
  { value: "applied", label: "Applied" },
  { value: "screened", label: "Screened" },
  { value: "interviewed", label: "Interviewed" },
  { value: "final_round", label: "Final round" },
  { value: "offered", label: "Offer" },
] as const;

/** How the process ended for the Candidate. */
export const ENDINGS = [
  { value: "hired", label: "Hired", description: "Accepted the offer" },
  { value: "declined", label: "Declined offer", description: "Got an offer and turned it down" },
  { value: "rejected", label: "Rejected", description: "The company said no" },
  { value: "withdrew", label: "Withdrew", description: "You pulled out" },
  { value: "ghosted", label: "Ghosted", description: "They stopped replying" },
] as const;

export type Stage = (typeof STAGES)[number]["value"];
export type Ending = (typeof ENDINGS)[number]["value"];

export const STAGE_VALUES = STAGES.map((s) => s.value) as [Stage, ...Stage[]];
export const ENDING_VALUES = ENDINGS.map((e) => e.value) as [Ending, ...Ending[]];

/** Endings that only make sense once an offer was made. */
export const OFFER_ENDINGS: readonly Ending[] = ["hired", "declined"];

export function stageLabel(value: string): string {
  return STAGES.find((item) => item.value === value)?.label ?? value;
}

export function endingLabel(value: string): string {
  return ENDINGS.find((item) => item.value === value)?.label ?? value;
}

export function stageIndex(value: string): number {
  const index = STAGES.findIndex((item) => item.value === value);
  return index === -1 ? 0 : index;
}

export type TrackState = {
  /** Index into STAGES of the furthest stage reached. */
  reached: number;
  ending: Ending;
  /** One sentence describing the outcome, e.g. "Reached the final round, then ghosted." */
  caption: string;
};

const ENDING_PHRASES: Record<Ending, string> = {
  hired: "accepted it",
  declined: "turned it down",
  rejected: "rejected",
  withdrew: "withdrew",
  ghosted: "ghosted",
};

const STAGE_PHRASES: Record<Stage, string> = {
  applied: "Applied",
  screened: "Passed screening",
  interviewed: "Interviewed",
  final_round: "Reached the final round",
  offered: "Got an offer",
};

export function trackState(stage: string, ending: string): TrackState {
  const reached = stageIndex(stage);
  const stageValue = STAGES[reached].value;
  const endingValue = (ENDING_VALUES as readonly string[]).includes(ending)
    ? (ending as Ending)
    : "rejected";
  const caption = `${STAGE_PHRASES[stageValue]}, then ${ENDING_PHRASES[endingValue]}.`;
  return { reached, ending: endingValue, caption };
}
