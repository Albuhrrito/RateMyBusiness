import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReviewForm } from "@/components/ReviewForm";
import { PageTitle } from "@/components/ui";
import { auth } from "@/server/auth";
import { getCompanyBySlug } from "@/server/companies";
import { candidateReviewedCompany } from "@/server/reviews";

export const metadata: Metadata = { title: "Write a review" };

export default async function NewReviewPage({ searchParams }: PageProps<"/reviews/new">) {
  const session = await auth();
  const { company: slugParam } = await searchParams;
  const slug = typeof slugParam === "string" ? slugParam : "";
  if (!slug) redirect("/companies");
  if (!session?.candidateId) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/reviews/new?company=${slug}`)}`);
  }
  const company = await getCompanyBySlug(slug);
  if (!company) redirect("/companies");
  if (await candidateReviewedCompany(session.candidateId, company.id)) {
    redirect(`/companies/${company.slug}`);
  }

  return (
    <div>
      <p className="text-sm">
        <Link href={`/companies/${company.slug}`} className="text-muted hover:text-ink">
          {company.name}
        </Link>
      </p>
      <div className="mt-3">
        <PageTitle lead="Four short steps. Describe the process, not the people in it.">
          Review {company.name}&apos;s hiring process
        </PageTitle>
      </div>
      <ReviewForm companySlug={company.slug} companyName={company.name} />
    </div>
  );
}
