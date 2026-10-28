"use client";

import { Button, PageTitle } from "@/components/ui";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <PageTitle lead="The page couldn't load. Try again, and if it keeps failing, check that the database is set up with npm run setup.">
        Something went wrong
      </PageTitle>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </div>
  );
}
