"use client";

import Link from "next/link";
import { googleSignInAction, loginAction, registerAction, type FormState } from "@/app/actions";
import { Button, FormError, TextInput } from "./ui";
import { useFormAction } from "./useFormAction";

export function LoginForm({ callbackUrl, googleEnabled }: { callbackUrl: string; googleEnabled: boolean }) {
  const [state, onSubmit, pending] = useFormAction<FormState>(loginAction, null);

  return (
    <AuthPanel
      title="Sign in"
      lead="Sign in to rate a hiring process or report a review."
      footer={
        <>
          New here?{" "}
          <Link href="/register" className="font-semibold text-ballpoint hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <TextInput label="Email" name="email" type="email" autoComplete="email" required />
        <TextInput label="Password" name="password" type="password" autoComplete="current-password" required />
        <FormError message={state?.error} />
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      {googleEnabled ? (
        <form action={googleSignInAction} className="mt-3">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <Button type="submit" variant="secondary" className="w-full">
            Continue with Google
          </Button>
        </form>
      ) : null}
    </AuthPanel>
  );
}

export function RegisterForm() {
  const [state, onSubmit, pending] = useFormAction<FormState>(registerAction, null);

  return (
    <AuthPanel
      title="Create an account"
      lead="Your display name is never shown on reviews."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-ballpoint hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <TextInput label="Display name" name="displayName" autoComplete="nickname" required minLength={2} />
        <TextInput label="Email" name="email" type="email" autoComplete="email" required />
        <TextInput
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          hint="At least 8 characters."
        />
        <FormError message={state?.error} />
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthPanel>
  );
}

function AuthPanel({
  title,
  lead,
  footer,
  children,
}: {
  title: string;
  lead: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold tracking-[-0.02em]">{title}</h1>
      <p className="mt-2 text-muted">{lead}</p>
      <div className="mt-8 rounded-[10px] border border-rule bg-surface p-6 sm:p-8">{children}</div>
      <p className="mt-6 text-center text-sm">{footer}</p>
    </div>
  );
}
