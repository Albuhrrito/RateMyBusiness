import Link from "next/link";
import { signOutAction } from "@/app/actions";
import { auth } from "@/server/auth";
import { HeaderSearch } from "./HeaderSearch";

export async function SiteHeader() {
  const session = await auth();
  const signedIn = Boolean(session?.candidateId);

  return (
    <header className="border-b border-rule bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-base font-bold tracking-[-0.01em]">
          <Logo />
          RateMyBusiness
        </Link>
        <HeaderSearch />
        <nav className="ml-auto flex items-center gap-5 text-sm font-medium" aria-label="Main">
          <Link href="/companies" className="hover:text-ballpoint">
            Companies
          </Link>
          <Link href="/guidelines" className="hover:text-ballpoint">
            Guidelines
          </Link>
          {signedIn ? (
            <>
              <Link href="/me" className="hover:text-ballpoint">
                My reviews
              </Link>
              <form action={signOutAction}>
                <button type="submit" className="text-muted hover:text-ink">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="font-semibold text-ballpoint hover:underline">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
      <rect width="32" height="32" rx="7" className="fill-ballpoint" />
      <path d="M7 16h9" className="stroke-on-ballpoint" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M19 16h7"
        className="stroke-on-ballpoint"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2.5 3"
        opacity=".55"
      />
      <circle cx="7" cy="16" r="3" className="fill-on-ballpoint" />
      <circle cx="16" cy="16" r="3.4" fill="#f2e55c" />
    </svg>
  );
}
