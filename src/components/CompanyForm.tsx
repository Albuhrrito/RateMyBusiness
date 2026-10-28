"use client";

import Link from "next/link";
import { createCompanyAction, type FormState } from "@/app/actions";
import { Button, FormError, TextInput } from "./ui";
import { useFormAction } from "./useFormAction";

export function CompanyForm({ defaultName = "" }: { defaultName?: string }) {
  const [state, onSubmit, pending] = useFormAction<FormState>(createCompanyAction, null);

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-md space-y-5">
      <TextInput label="Company name" name="name" required minLength={2} defaultValue={defaultName} />
      <TextInput label="Website" name="website" placeholder="example.com" hint="Optional." />
      <TextInput label="Industry" name="industry" placeholder="Software" hint="Optional." />
      <TextInput label="Headquarters" name="hqLocation" placeholder="Toronto" hint="Optional." />
      <FormError message={state?.error} />
      {state?.existing ? (
        <p className="-mt-3 text-sm">
          <Link href={`/companies/${state.existing.slug}`} className="font-semibold text-ballpoint hover:underline">
            Go to {state.existing.name}
          </Link>
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Adding…" : "Add company"}
      </Button>
    </form>
  );
}
