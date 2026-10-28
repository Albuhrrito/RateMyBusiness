import type { Metadata } from "next";
import { LoginForm } from "@/components/AuthForms";
import { safeCallbackUrl } from "@/lib/redirects";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { callbackUrl } = await searchParams;
  return (
    <LoginForm
      callbackUrl={safeCallbackUrl(callbackUrl)}
      googleEnabled={Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET)}
    />
  );
}
