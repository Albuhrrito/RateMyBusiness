import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CompanyForm } from "@/components/CompanyForm";
import { PageTitle } from "@/components/ui";
import { auth } from "@/server/auth";

export const metadata: Metadata = { title: "Add a company" };

export default async function NewCompanyPage({ searchParams }: PageProps<"/companies/new">) {
  const session = await auth();
  if (!session?.candidateId) {
    redirect("/login?callbackUrl=/companies/new");
  }
  const { name } = await searchParams;

  return (
    <div>
      <PageTitle lead="Add the employer whose hiring process you went through. We'll tell you if it's already listed.">
        Add a company
      </PageTitle>
      <CompanyForm defaultName={typeof name === "string" ? name : ""} />
    </div>
  );
}
