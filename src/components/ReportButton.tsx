"use client";

import { useActionState, useState } from "react";
import { reportReviewAction } from "@/app/actions";
import { REPORT_REASONS } from "@/lib/review-schema";
import { Button, buttonClass, inputClass } from "./ui";

export function ReportButton({ reviewId }: { reviewId: string }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(reportReviewAction, null);

  if (state?.reported) {
    return <p className="text-sm text-muted">Reported. A moderator will look at it.</p>;
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className={buttonClass("quiet", "text-sm")}>
        Report
      </button>
    );
  }

  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <input type="hidden" name="reviewId" value={reviewId} />
      <label className="block">
        <span className="text-sm font-semibold">Why are you reporting this review?</span>
        <select name="reason" required defaultValue="" className={`${inputClass} py-1.5 text-sm`}>
          <option value="" disabled>
            Choose a reason
          </option>
          {REPORT_REASONS.map((reason) => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit" variant="secondary" disabled={pending} className="py-1.5">
        {pending ? "Sending…" : "Send report"}
      </Button>
      <button type="button" onClick={() => setOpen(false)} className={buttonClass("quiet", "text-sm")}>
        Cancel
      </button>
      {state?.error ? <p className="basis-full text-sm text-rejected">{state.error}</p> : null}
    </form>
  );
}
