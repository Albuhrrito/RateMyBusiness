"use server";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { safeCallbackUrl } from "@/lib/redirects";
import {
  companyInputSchema,
  registerSchema,
  reportInputSchema,
  reviewInputSchema,
} from "@/lib/review-schema";
import { auth, signIn, signOut } from "@/server/auth";
import { createCandidateWithPassword, DuplicateEmailError } from "@/server/candidates";
import { createCompany, getCompanyBySlug } from "@/server/companies";
import { createReview, deleteOwnReview, DuplicateReviewError, reportReview } from "@/server/reviews";

export type FormState = { error?: string; existing?: { name: string; slug: string } } | null;
export type ReportState = { error?: string; reported?: boolean } | null;

function formObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

function firstIssue(error: { issues: { message: string }[] }) {
  return error.issues[0]?.message ?? "Check the form and try again.";
}

export async function registerAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = registerSchema.safeParse(formObject(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  try {
    await createCandidateWithPassword(parsed.data);
  } catch (error) {
    if (error instanceof DuplicateEmailError) return { error: error.message };
    throw error;
  }
  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created. Sign in with your email and password." };
    }
    throw error;
  }
  return null;
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = safeCallbackUrl(formData.get("callbackUrl"));
  try {
    await signIn("credentials", { email, password, redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "That email and password don't match an account." };
    }
    throw error;
  }
  return null;
}

export async function googleSignInAction(formData: FormData) {
  await signIn("google", { redirectTo: safeCallbackUrl(formData.get("callbackUrl")) });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createCompanyAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await auth();
  if (!session?.candidateId) {
    redirect("/login?callbackUrl=/companies/new");
  }
  const parsed = companyInputSchema.safeParse(formObject(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const result = await createCompany(parsed.data);
  if (!result.ok) {
    return { error: `${result.existing.name} is already listed.`, existing: result.existing };
  }
  redirect(`/companies/${result.slug}`);
}

export async function createReviewAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await auth();
  const parsed = reviewInputSchema.safeParse(formObject(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const { companySlug, wouldApplyAgain, ...data } = parsed.data;
  if (!session?.candidateId) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/reviews/new?company=${companySlug}`)}`);
  }
  const company = await getCompanyBySlug(companySlug);
  if (!company) return { error: "That company isn't listed anymore." };
  try {
    await createReview({
      companyId: company.id,
      candidateId: session.candidateId,
      scores: {
        communication: data.communication,
        timeliness: data.timeliness,
        interviewQuality: data.interviewQuality,
        processClarity: data.processClarity,
        professionalism: data.professionalism,
      },
      roleTitle: data.roleTitle,
      stageReached: data.stageReached,
      ending: data.ending,
      processLengthWeeks: data.processLengthWeeks,
      takeHomeAssigned: data.takeHomeAssigned,
      wouldApplyAgain: wouldApplyAgain === "yes",
      body: data.body,
    });
  } catch (error) {
    if (error instanceof DuplicateReviewError) return { error: error.message };
    throw error;
  }
  redirect(`/companies/${company.slug}?published=1`);
}

export async function reportReviewAction(_prev: ReportState, formData: FormData): Promise<ReportState> {
  const session = await auth();
  if (!session?.candidateId) return { error: "Sign in to report a review." };
  const parsed = reportInputSchema.safeParse(formObject(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const ok = await reportReview({ candidateId: session.candidateId, ...parsed.data });
  if (!ok) return { error: "You can't report this review." };
  return { reported: true };
}

export async function deleteReviewAction(formData: FormData) {
  const session = await auth();
  if (!session?.candidateId) redirect("/login?callbackUrl=/me");
  const reviewId = String(formData.get("reviewId") ?? "");
  const slug = await deleteOwnReview({ reviewId, candidateId: session.candidateId });
  revalidatePath("/me");
  if (slug) revalidatePath(`/companies/${slug}`);
}
