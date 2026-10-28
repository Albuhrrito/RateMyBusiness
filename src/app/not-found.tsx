import Link from "next/link";
import { buttonClass, PageTitle } from "@/components/ui";

export default function NotFound() {
  return (
    <div>
      <PageTitle lead="The page or company you were looking for isn't here. It may have been renamed or never added.">
        Page not found
      </PageTitle>
      <Link href="/companies" className={buttonClass("primary", "mt-8")}>
        Browse companies
      </Link>
    </div>
  );
}
