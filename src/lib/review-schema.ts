import { z } from "zod";
import { ENDING_VALUES, OFFER_ENDINGS, STAGE_VALUES } from "./scoring";

const scoreMessage = "Pick a score from 1 to 5 for every dimension.";
const score = z.coerce
  .number({ message: scoreMessage })
  .int(scoreMessage)
  .min(1, scoreMessage)
  .max(5, scoreMessage);

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);

export const reviewInputSchema = z
  .object({
    companySlug: z.string().min(1),
    roleTitle: z
      .string()
      .trim()
      .min(2, "Add the role you applied for.")
      .max(120, "Keep the role under 120 characters."),
    communication: score,
    timeliness: score,
    interviewQuality: score,
    processClarity: score,
    professionalism: score,
    stageReached: z.enum(STAGE_VALUES, { message: "Choose how far you got." }),
    ending: z.enum(ENDING_VALUES, { message: "Choose how it ended." }),
    processLengthWeeks: z.preprocess(
      (value) => (value === "" || value == null ? undefined : value),
      z.coerce
        .number()
        .int("Use whole weeks.")
        .min(0, "Weeks can't be negative.")
        .max(104, "Use 104 weeks or fewer.")
        .optional(),
    ),
    takeHomeAssigned: z.preprocess((value) => value === "on" || value === true, z.boolean()),
    wouldApplyAgain: z.enum(["yes", "no"], { message: "Say whether you would apply again." }),
    body: z
      .string()
      .trim()
      .min(50, "Write at least 50 characters about what happened.")
      .max(2000, "Keep it under 2000 characters."),
  })
  .refine((data) => !OFFER_ENDINGS.includes(data.ending) || data.stageReached === "offered", {
    message: "Hired and Declined offer need the stage set to Offer.",
    path: ["ending"],
  });

export type ReviewInput = z.infer<typeof reviewInputSchema>;

/** Adds https:// when missing; returns null for values that are not a web address. */
export function normalizeWebsite(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes(".")) return null;
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export const companyInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Company name needs at least 2 characters.")
    .max(120, "Keep the name under 120 characters."),
  website: z
    .string()
    .trim()
    .max(200, "Keep the website under 200 characters.")
    .optional()
    .transform((value, ctx) => {
      if (!value) return undefined;
      const normalized = normalizeWebsite(value);
      if (!normalized) {
        ctx.addIssue({ code: "custom", message: "Enter a website like example.com." });
        return z.NEVER;
      }
      return normalized;
    }),
  industry: optionalText(80),
  hqLocation: optionalText(120),
});

export const registerSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Display name needs at least 2 characters.")
    .max(80, "Keep the display name under 80 characters."),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address.")),
  password: z
    .string()
    .min(8, "Use at least 8 characters for the password.")
    .max(72, "Use 72 characters or fewer for the password."),
});

export const REPORT_REASONS = [
  { value: "names_person", label: "Names a person" },
  { value: "personal_data", label: "Shares personal data" },
  { value: "off_topic", label: "Not about the hiring process" },
  { value: "fake", label: "Spam or fake" },
] as const;

type ReportReason = (typeof REPORT_REASONS)[number]["value"];

export const reportInputSchema = z.object({
  reviewId: z.string().min(1),
  reason: z.enum(REPORT_REASONS.map((r) => r.value) as [ReportReason, ...ReportReason[]], {
    message: "Choose a reason.",
  }),
});
