import type { Metadata } from "next";
import Link from "next/link";
import { CompanyList } from "@/components/CompanyList";
import { buttonClass, PageTitle } from "@/components/ui";
import { COMPANY_SORTS, listCompanies, parseSort } from "@/server/companies";

export const metadata: Metadata = { title: "Companies" };

function href(params: { q?: string; sort?: string; page?: number }) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.sort && params.sort !== "reviews") search.set("sort", params.sort);
  if (params.page && params.page > 1) search.set("page", String(params.page));
  const query = search.toString();
  return query ? `/companies?${query}` : "/companies";
}

export default async function CompaniesPage({ searchParams }: PageProps<"/companies">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const sort = parseSort(typeof params.sort === "string" ? params.sort : undefined);
  const page = Number(params.page) || 1;
  const results = await listCompanies({ q, sort, page });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <PageTitle lead="Find a company to read how it hires, or add one that's missing.">Companies</PageTitle>
        <Link href={q ? `/companies/new?name=${encodeURIComponent(q)}` : "/companies/new"} className={buttonClass("secondary")}>
          Add a company
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <form action="/companies" method="get" role="search" className="flex w-full max-w-md gap-2">
          <label htmlFor="browse-search" className="sr-only">
            Search companies
          </label>
          <input
            id="browse-search"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search by name"
            className="min-w-0 flex-1 rounded-md border border-rule bg-surface px-3 py-2 placeholder:text-muted focus:border-ballpoint focus:outline-none"
          />
          {sort !== "reviews" ? <input type="hidden" name="sort" value={sort} /> : null}
          <button type="submit" className={buttonClass("primary")}>
            Search
          </button>
        </form>
        <nav aria-label="Sort companies" className="flex gap-1 rounded-md border border-rule bg-surface p-1 text-sm">
          {COMPANY_SORTS.map((option) => (
            <Link
              key={option.value}
              href={href({ q, sort: option.value })}
              aria-current={option.value === sort ? "true" : undefined}
              className="rounded px-3 py-1 font-medium text-muted hover:text-ink aria-[current]:bg-ballpoint aria-[current]:text-on-ballpoint"
            >
              {option.label}
            </Link>
          ))}
        </nav>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {q
          ? `${results.total} ${results.total === 1 ? "company matches" : "companies match"} “${q}”.`
          : `${results.total} companies.`}
      </p>

      <div className="mt-3">
        {results.items.length === 0 ? (
          <div className="rounded-[10px] border border-dashed border-rule p-8">
            <p className="font-semibold">No company called “{q}” yet.</p>
            <p className="mt-1 text-muted">Add it so you and others can review its hiring process.</p>
            <Link href={`/companies/new?name=${encodeURIComponent(q)}`} className={buttonClass("primary", "mt-4")}>
              Add {q || "a company"}
            </Link>
          </div>
        ) : (
          <CompanyList companies={results.items} />
        )}
      </div>

      {results.pageCount > 1 ? (
        <nav aria-label="Pages" className="mt-8 flex items-center gap-4 text-sm">
          {results.page > 1 ? (
            <Link href={href({ q, sort, page: results.page - 1 })} className={buttonClass("secondary", "py-1.5")}>
              Previous
            </Link>
          ) : null}
          <span className="text-muted">
            Page {results.page} of {results.pageCount}
          </span>
          {results.page < results.pageCount ? (
            <Link href={href({ q, sort, page: results.page + 1 })} className={buttonClass("secondary", "py-1.5")}>
              Next
            </Link>
          ) : null}
        </nav>
      ) : null}
    </div>
  );
}
