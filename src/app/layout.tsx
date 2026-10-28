import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const dynamic = "force-dynamic";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "RateMyBusiness", template: "%s | RateMyBusiness" },
  description: "Rate the hiring process at a company: communication, pace, and interview quality.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${publicSans.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans text-ink antialiased">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">{children}</main>
        <footer className="border-t border-rule">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-4 py-6 text-sm text-muted sm:px-6">
            <span>Reviews describe hiring processes, not people.</span>
            <Link href="/guidelines" className="hover:text-ink">
              Review guidelines
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
