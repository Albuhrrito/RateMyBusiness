import Link from "next/link";
import { formatScore } from "@/lib/scoring";
import { formatShare, share } from "@/lib/stats";
import type { CompanyRow } from "@/server/companies";

export function CompanyList({ companies }: { companies: CompanyRow[] }) {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {companies.map((company) => (
        <li key={company.id}>
          <Link
            href={`/companies/${company.slug}`}
            className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-4 sm:grid-cols-[1fr_6rem_6rem_6rem]"
          >
            <span className="min-w-0">
              <span className="block truncate text-lg font-semibold group-hover:text-ballpoint">
                {company.name}
              </span>
              <span className="flex flex-wrap gap-x-3 text-sm text-muted">
                {company.industry ? <span>{company.industry}</span> : null}
                {company.hqLocation ? <span>{company.hqLocation}</span> : null}
              </span>
            </span>
            <Stat label="overall" value={formatScore(company.overall)} strong />
            <Stat
              label={company.reviewCount === 1 ? "review" : "reviews"}
              value={String(company.reviewCount)}
              className="hidden sm:block"
            />
            <Stat
              label="ghosted"
              value={formatShare(share(company.ghostedCount, company.reviewCount))}
              className="hidden sm:block"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Stat({
  label,
  value,
  strong,
  className = "",
}: {
  label: string;
  value: string;
  strong?: boolean;
  className?: string;
}) {
  return (
    <span className={`text-right ${className}`}>
      <span className={`block tabular-nums ${strong ? "text-xl font-bold" : "text-base font-semibold"}`}>
        {value}
      </span>
      <span className="text-xs text-muted">{label}</span>
    </span>
  );
}
