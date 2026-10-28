import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EndingBar } from "@/components/EndingBar";
import { ReportButton } from "@/components/ReportButton";
import { ReviewEntry } from "@/components/ReviewEntry";
import { ScoreBars } from "@/components/ScoreBars";
import { buttonClass } from "@/components/ui";
import { formatScore } from "@/lib/scoring";
import { formatShare } from "@/lib/stats";
import { auth } from "@/server/auth";
import { getCompanyBySlug } from "@/server/companies";
import { aggregatesForCompany, listReviewsForCompany } from "@/server/reviews";

function hostFromWebsite(website?: string | null) {
  if (!website) return null;
  try {
    return new URL(website.startsWith("http") ? website : `https://${website}`).host.replace(/^www\./, "");
  } catch {
    return website;
  }
}

export async function generateMetadata({ params }: PageProps<"/companies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) return { title: "Company not found" };
  return {
    title: `${company.name} hiring process`,
    description: `How ${company.name} runs its hiring process, rated by candidates.`,
  };
}

export default async function CompanyDossierPage({ params, searchParams }: PageProps<"/companies/[slug]">) {
  const { slug } = await params;
  const { published } = await searchParams;
  const company = await getCompanyBySlug(slug);
  if (!company) notFound();

  const [aggregates, reviews, session] = await Promise.all([
    aggregatesForCompany(company.id),
    listReviewsForCompany(company.id),
    auth(),
  ]);

  const candidateId = session?.candidateId;
  const alreadyReviewed = Boolean(candidateId && reviews.some((r) => r.candidateId === candidateId));
  const host = hostFromWebsite(company.website);

  return (
    <div>
      <p className="text-sm">
        <Link href="/companies" className="text-muted hover:text-ink">
          Companies
        </Link>
      </p>

      {published ? (
        <p role="status" className="mt-4 rounded-md border border-ballpoint/40 bg-ballpoint/10 px-4 py-3 text-sm font-medium">
          Review published. Thanks for writing it.
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-[-0.025em] sm:text-5xl">{company.name}</h1>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-muted">
            {host ? (
              <a href={company.website!} target="_blank" rel="noopener noreferrer" className="hover:text-ink hover:underline">
                {host}
              </a>
            ) : null}
            {company.industry ? <span>{company.industry}</span> : null}
            {company.hqLocation ? <span>{company.hqLocation}</span> : null}
          </p>
        </div>
        {alreadyReviewed ? (
          <p className="text-sm text-muted">
            You reviewed this company.{" "}
            <Link href="/me" className="text-ballpoint hover:underline">
              See your reviews
            </Link>
          </p>
        ) : (
          <Link href={`/reviews/new?company=${company.slug}`} className={buttonClass("primary")}>
            Rate this hiring process
          </Link>
        )}
      </div>

      <section
        aria-label="Summary"
        className="mt-10 grid gap-10 rounded-[10px] border border-rule bg-surface p-6 sm:p-8 lg:grid-cols-2 lg:gap-14"
      >
        <div>
          <p className="flex items-baseline gap-3">
            <span className="text-6xl font-bold tracking-[-0.03em] tabular-nums">
              <span className={aggregates.count > 0 ? "marker" : ""}>{formatScore(aggregates.overall)}</span>
            </span>
            <span className="text-muted">
              {aggregates.count === 0
                ? "No reviews yet"
                : `out of 5, from ${aggregates.count} ${aggregates.count === 1 ? "review" : "reviews"}`}
            </span>
          </p>
          <div className="mt-8">
            <ScoreBars scores={aggregates} />
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold">Where candidates ended up</h2>
          <div className="mt-4">
            <EndingBar endings={aggregates.endings} total={aggregates.count} />
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            <Fact label="Would apply again" value={formatShare(aggregates.wouldApplyAgainShare)} />
            <Fact
              label="Typical length"
              value={aggregates.medianWeeks == null ? "—" : `${aggregates.medianWeeks} weeks`}
            />
            <Fact
              label="Take-home given"
              value={aggregates.count === 0 ? "—" : `${aggregates.takeHomeCount} of ${aggregates.count}`}
            />
            <Fact label="Ghosted after the final round" value={String(aggregates.ghostedAfterFinalRound)} />
          </dl>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-[-0.015em]">
          Reviews <span className="font-semibold text-muted tabular-nums">{reviews.length}</span>
        </h2>
        {reviews.length === 0 ? (
          <div className="mt-6 rounded-[10px] border border-dashed border-rule p-8">
            <p className="font-semibold">Nobody has reviewed {company.name} yet.</p>
            <p className="mt-1 text-muted">If you went through its hiring process, your review will be the first.</p>
          </div>
        ) : (
          <div className="mt-2">
            {reviews.map((review) => (
              <ReviewEntry
                key={review.id}
                review={review}
                actions={
                  candidateId && review.candidateId !== candidateId ? <ReportButton reviewId={review.id} /> : null
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-0.5 text-2xl font-bold tabular-nums">{value}</dd>
    </div>
  );
}
