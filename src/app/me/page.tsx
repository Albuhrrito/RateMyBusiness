import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteReviewButton } from "@/components/DeleteReviewButton";
import { ReviewEntry } from "@/components/ReviewEntry";
import { buttonClass, PageTitle } from "@/components/ui";
import { auth } from "@/server/auth";
import { listReviewsByCandidate } from "@/server/reviews";

export const metadata: Metadata = { title: "My reviews" };

export default async function MyReviewsPage() {
  const session = await auth();
  if (!session?.candidateId) redirect("/login?callbackUrl=/me");
  const reviews = await listReviewsByCandidate(session.candidateId);

  return (
    <div>
      <PageTitle lead={`Signed in as ${session.displayName}. Only you see this page.`}>My reviews</PageTitle>
      {reviews.length === 0 ? (
        <div className="mt-10 rounded-[10px] border border-dashed border-rule p-8">
          <p className="font-semibold">You haven&apos;t reviewed a company yet.</p>
          <p className="mt-1 text-muted">Find the company that interviewed you and rate how it went.</p>
          <Link href="/companies" className={buttonClass("primary", "mt-4")}>
            Find a company
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          {reviews.map((review) => (
            <ReviewEntry
              key={review.id}
              review={review}
              company={review.company}
              actions={<DeleteReviewButton reviewId={review.id} companyName={review.company.name} />}
            />
          ))}
        </div>
      )}
    </div>
  );
}
