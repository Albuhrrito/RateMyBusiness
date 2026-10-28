import Link from "next/link";
import { CompanyList } from "@/components/CompanyList";
import { OutcomeTrack } from "@/components/OutcomeTrack";
import { ReviewEntry } from "@/components/ReviewEntry";
import { buttonClass } from "@/components/ui";
import { formatScore } from "@/lib/scoring";
import { listCompanies } from "@/server/companies";
import { countReviews, listRecentReviews } from "@/server/reviews";

export default async function HomePage() {
  const [companies, recent, reviewCount] = await Promise.all([
    listCompanies({ sort: "reviews" }),
    listRecentReviews(5),
    countReviews(),
  ]);
  const latest = recent[0];
  const mostReviewed = companies.items.filter((c) => c.reviewCount > 0).slice(0, 8);

  return (
    <div className="space-y-20">
      <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
            How did they hire you?
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Candidates rate the hiring process at real companies: who replied, how long it took, whether
            the interviews matched the job, and who went quiet after the final round.
          </p>
          <form action="/companies" method="get" role="search" className="mt-8 flex max-w-xl gap-2">
            <label htmlFor="home-search" className="sr-only">
              Search companies
            </label>
            <input
              id="home-search"
              name="q"
              type="search"
              placeholder="Search a company, like Stripe or Figma"
              className="min-w-0 flex-1 rounded-md border border-rule bg-surface px-4 py-3 text-lg placeholder:text-muted focus:border-ballpoint focus:outline-none"
            />
            <button type="submit" className={buttonClass("primary", "px-5 text-base")}>
              Search
            </button>
          </form>
          <p className="mt-4 text-sm text-muted">
            {reviewCount} {reviewCount === 1 ? "review" : "reviews"} of {companies.total} companies so far.
          </p>
        </div>

        {latest ? (
          <Link
            href={`/companies/${latest.company.slug}`}
            className="block rounded-[10px] border border-rule bg-surface p-6 transition-colors hover:border-ballpoint sm:p-8"
          >
            <span className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm text-muted">Latest review</span>
                <span className="mt-1 block text-xl font-semibold">{latest.company.name}</span>
                <span className="block text-sm text-muted">{latest.roleTitle}</span>
              </span>
              <span className="text-3xl font-bold tabular-nums">
                <span className="marker">{formatScore(latest.overall)}</span>
              </span>
            </span>
            <OutcomeTrack stage={latest.stageReached} ending={latest.ending} className="mt-8" />
            <span className="mt-6 line-clamp-3 block leading-relaxed">{latest.body}</span>
          </Link>
        ) : null}
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-[-0.015em]">Most reviewed</h2>
          <Link href="/companies" className="text-sm font-semibold text-ballpoint hover:underline">
            All companies
          </Link>
        </div>
        <div className="mt-5">
          {mostReviewed.length > 0 ? (
            <CompanyList companies={mostReviewed} />
          ) : (
            <p className="text-muted">
              No reviews yet.{" "}
              <Link href="/companies" className="text-ballpoint hover:underline">
                Pick a company
              </Link>{" "}
              and write the first one.
            </p>
          )}
        </div>
      </section>

      {recent.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold tracking-[-0.015em]">Recent reviews</h2>
          <div className="mt-2">
            {recent.map((review) => (
              <ReviewEntry key={review.id} review={review} company={review.company} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
