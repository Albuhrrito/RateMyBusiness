"use client";

import { usePathname } from "next/navigation";

/** Company search in the header. Hidden on the home page, which has its own. */
export function HeaderSearch() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <form action="/companies" method="get" role="search" className="order-last w-full sm:order-none sm:w-auto sm:flex-1 sm:max-w-sm">
      <label className="sr-only" htmlFor="header-search">
        Search companies
      </label>
      <input
        id="header-search"
        name="q"
        type="search"
        placeholder="Search companies"
        className="w-full rounded-md border border-rule bg-paper px-3 py-1.5 text-sm placeholder:text-muted focus:border-ballpoint focus:outline-none"
      />
    </form>
  );
}
