"use client";

import { useState, type ReactNode } from "react";
import { createReviewAction, type FormState } from "@/app/actions";
import { ENDINGS, OFFER_ENDINGS, SCORE_DIMENSIONS, STAGES, type Ending, type Stage } from "@/lib/scoring";
import { OutcomeTrack } from "./OutcomeTrack";
import { ScorePicker } from "./ScorePicker";
import { Button, FormError, inputClass, TextInput } from "./ui";
import { useFormAction } from "./useFormAction";

const BODY_MIN = 50;
const BODY_MAX = 2000;

const optionClass =
  "flex cursor-pointer items-start gap-2.5 rounded-md border border-rule bg-surface px-3 py-2.5 text-sm hover:border-ballpoint has-checked:border-ballpoint has-checked:ring-1 has-checked:ring-ballpoint has-focus-visible:outline-2 has-focus-visible:outline-ballpoint";

export function ReviewForm({ companySlug, companyName }: { companySlug: string; companyName: string }) {
  const [state, onSubmit, pending] = useFormAction<FormState>(createReviewAction, null);
  const [stage, setStage] = useState<Stage | "">("");
  const [ending, setEnding] = useState<Ending | "">("");
  const [bodyLength, setBodyLength] = useState(0);

  function chooseStage(value: Stage) {
    setStage(value);
    if (value !== "offered" && ending && OFFER_ENDINGS.includes(ending)) setEnding("");
  }

  function chooseEnding(value: Ending) {
    setEnding(value);
    if (OFFER_ENDINGS.includes(value)) setStage("offered");
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-2xl space-y-12">
      <input type="hidden" name="companySlug" value={companySlug} />

      <Step number={1} title="The role">
        <TextInput
          label="Role you applied for"
          name="roleTitle"
          required
          minLength={2}
          maxLength={120}
          placeholder="Backend engineer"
          autoComplete="off"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <TextInput
            label="How many weeks did it take?"
            name="processLengthWeeks"
            type="number"
            inputMode="numeric"
            min={0}
            max={104}
            hint="Optional. From first contact to the end."
          />
          <label className="flex items-center gap-2.5 self-center pt-2 text-sm">
            <input type="checkbox" name="takeHomeAssigned" className="size-4 accent-ballpoint" />
            They gave me a take-home assignment
          </label>
        </div>
      </Step>

      <Step number={2} title="How far you got">
        <fieldset>
          <legend className="text-sm font-semibold">Furthest stage you reached</legend>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {STAGES.map((item) => (
              <label key={item.value} className={optionClass}>
                <input
                  type="radio"
                  name="stageReached"
                  value={item.value}
                  required
                  checked={stage === item.value}
                  onChange={() => chooseStage(item.value)}
                  className="sr-only"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold">How it ended</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {ENDINGS.map((item) => (
              <label key={item.value} className={optionClass}>
                <input
                  type="radio"
                  name="ending"
                  value={item.value}
                  required
                  checked={ending === item.value}
                  onChange={() => chooseEnding(item.value)}
                  className="sr-only"
                />
                <span>
                  <span className="block font-semibold">{item.label}</span>
                  <span className="text-muted">{item.description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="rounded-lg border border-dashed border-rule p-4" aria-live="polite">
          {stage && ending ? (
            <OutcomeTrack stage={stage} ending={ending} />
          ) : (
            <p className="text-sm text-muted">Pick a stage and an ending to preview your track.</p>
          )}
        </div>
      </Step>

      <Step number={3} title="Scores">
        <p className="-mt-2 text-sm text-muted">Rate the process at {companyName}, not the job or the people.</p>
        <div className="grid gap-7 sm:grid-cols-2">
          {SCORE_DIMENSIONS.map((dim) => (
            <ScorePicker key={dim.key} name={dim.key} label={dim.label} />
          ))}
        </div>
      </Step>

      <Step number={4} title="What happened">
        <label className="block">
          <span className="text-sm font-semibold">Describe the process</span>
          <textarea
            name="body"
            required
            minLength={BODY_MIN}
            maxLength={BODY_MAX}
            rows={8}
            onChange={(event) => setBodyLength(event.target.value.trim().length)}
            placeholder="Recruiter call in week one, two technical rounds, then a final loop. Feedback arrived…"
            className={`${inputClass} leading-relaxed`}
          />
          <span className="mt-1.5 flex justify-between text-sm text-muted">
            <span>Stick to the process. Don&apos;t name interviewers or recruiters.</span>
            <span className={`tabular-nums ${bodyLength > 0 && bodyLength < BODY_MIN ? "text-rejected" : ""}`}>
              {bodyLength < BODY_MIN ? `${BODY_MIN - bodyLength} more to go` : `${bodyLength} / ${BODY_MAX}`}
            </span>
          </span>
        </label>
        <fieldset>
          <legend className="text-sm font-semibold">Would you apply here again?</legend>
          <div className="mt-2 flex gap-2">
            {[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ].map((option) => (
              <label key={option.value} className={`${optionClass} min-w-20 justify-center`}>
                <input type="radio" name="wouldApplyAgain" value={option.value} required className="sr-only" />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </Step>

      <div className="space-y-3 border-t border-rule pt-6">
        <FormError message={state?.error} />
        <Button type="submit" disabled={pending}>
          {pending ? "Publishing…" : "Publish review"}
        </Button>
      </div>
    </form>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="flex items-baseline gap-3 text-xl font-bold tracking-[-0.01em]">
        <span className="text-base font-semibold text-ballpoint tabular-nums">{number}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
