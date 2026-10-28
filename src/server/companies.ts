import { cache } from "react";
import { prisma } from "./db";
import { slugify } from "../lib/slugs";

export const PAGE_SIZE = 20;

export const COMPANY_SORTS = [
  { value: "reviews", label: "Most reviewed" },
  { value: "rating", label: "Highest rated" },
  { value: "name", label: "A–Z" },
] as const;

export type CompanySort = (typeof COMPANY_SORTS)[number]["value"];

export function parseSort(value: string | undefined): CompanySort {
  return COMPANY_SORTS.some((s) => s.value === value) ? (value as CompanySort) : "reviews";
}

export type CompanyRow = {
  id: string;
  name: string;
  slug: string;
  industry: string | null;
  hqLocation: string | null;
  reviewCount: number;
  overall: number | null;
  ghostedCount: number;
};

/**
 * One page of companies with their review stats. Sorting by review count or
 * rating needs the stats for every match, so stats come from two grouped
 * queries rather than one query per company.
 */
export async function listCompanies({
  q = "",
  sort = "reviews",
  page = 1,
}: {
  q?: string;
  sort?: CompanySort;
  page?: number;
}) {
  const query = q.trim();
  const companies = await prisma.company.findMany({
    where: query ? { name: { contains: query } } : undefined,
    select: { id: true, name: true, slug: true, industry: true, hqLocation: true },
  });

  const ids = companies.map((c) => c.id);
  const [stats, ghosted] = await Promise.all([
    prisma.review.groupBy({
      by: ["companyId"],
      where: { companyId: { in: ids } },
      _count: { _all: true },
      _avg: { overall: true },
    }),
    prisma.review.groupBy({
      by: ["companyId"],
      where: { companyId: { in: ids }, ending: "ghosted" },
      _count: { _all: true },
    }),
  ]);
  const statsById = new Map(stats.map((s) => [s.companyId, s]));
  const ghostedById = new Map(ghosted.map((g) => [g.companyId, g._count._all]));

  const rows: CompanyRow[] = companies.map((company) => {
    const stat = statsById.get(company.id);
    return {
      ...company,
      reviewCount: stat?._count._all ?? 0,
      overall: stat?._avg.overall ?? null,
      ghostedCount: ghostedById.get(company.id) ?? 0,
    };
  });

  const byName = (a: CompanyRow, b: CompanyRow) => a.name.localeCompare(b.name);
  rows.sort((a, b) => {
    if (sort === "reviews") return b.reviewCount - a.reviewCount || byName(a, b);
    if (sort === "rating") return (b.overall ?? -1) - (a.overall ?? -1) || byName(a, b);
    return byName(a, b);
  });

  const total = rows.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pageCount);
  const items = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  return { items, total, page: current, pageCount };
}

export const getCompanyBySlug = cache(async (slug: string) => {
  return prisma.company.findUnique({ where: { slug } });
});

export async function countCompanies() {
  return prisma.company.count();
}

export type CreateCompanyResult =
  | { ok: true; slug: string }
  | { ok: false; existing: { name: string; slug: string } };

export async function createCompany(input: {
  name: string;
  website?: string;
  industry?: string;
  hqLocation?: string;
}): Promise<CreateCompanyResult> {
  const base = slugify(input.name);
  const existing = await prisma.company.findUnique({
    where: { slug: base },
    select: { name: true, slug: true },
  });
  if (existing) return { ok: false, existing };

  let slug = base;
  let n = 2;
  while (await prisma.company.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${base}-${n}`;
    n += 1;
  }
  const company = await prisma.company.create({
    data: {
      name: input.name,
      slug,
      website: input.website,
      industry: input.industry,
      hqLocation: input.hqLocation,
    },
  });
  return { ok: true, slug: company.slug };
}
