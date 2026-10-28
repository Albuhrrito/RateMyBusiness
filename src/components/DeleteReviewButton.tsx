"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteReviewAction } from "@/app/actions";
import { Button, buttonClass } from "./ui";

export function DeleteReviewButton({ reviewId, companyName }: { reviewId: string; companyName: string }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)} className={buttonClass("quiet", "text-sm")}>
        Delete review
      </button>
    );
  }

  return (
    <form action={deleteReviewAction} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="reviewId" value={reviewId} />
      <span className="text-sm">Delete your review of {companyName}? This can&apos;t be undone.</span>
      <ConfirmButton />
      <button type="button" onClick={() => setConfirming(false)} className={buttonClass("quiet", "text-sm")}>
        Keep it
      </button>
    </form>
  );
}

function ConfirmButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="secondary" disabled={pending} className="py-1.5 text-rejected">
      {pending ? "Deleting…" : "Delete"}
    </Button>
  );
}
