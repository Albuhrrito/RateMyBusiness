import assert from "node:assert/strict";
import { test } from "node:test";
import { companyInputSchema, normalizeWebsite, registerSchema, reviewInputSchema } from "./review-schema";

const validReview = {
  companySlug: "stripe",
  roleTitle: "Backend engineer",
  communication: "4",
  timeliness: "3",
  interviewQuality: "5",
  processClarity: "4",
  professionalism: "5",
  stageReached: "final_round",
  ending: "rejected",
  processLengthWeeks: "",
  wouldApplyAgain: "yes",
  body: "Recruiter call, a technical screen, then a four-round onsite. Feedback came within a week.",
};

test("a complete form submission parses and coerces", () => {
  const result = reviewInputSchema.parse(validReview);
  assert.equal(result.communication, 4);
  assert.equal(result.processLengthWeeks, undefined);
  assert.equal(result.takeHomeAssigned, false);
});

test("checkbox and number fields coerce from form values", () => {
  const result = reviewInputSchema.parse({ ...validReview, takeHomeAssigned: "on", processLengthWeeks: "6" });
  assert.equal(result.takeHomeAssigned, true);
  assert.equal(result.processLengthWeeks, 6);
});

test("hired and declined require the offer stage", () => {
  const hiredEarly = reviewInputSchema.safeParse({ ...validReview, ending: "hired" });
  assert.equal(hiredEarly.success, false);
  assert.match(hiredEarly.error!.issues[0].message, /Offer/);

  const hired = reviewInputSchema.safeParse({ ...validReview, stageReached: "offered", ending: "hired" });
  assert.equal(hired.success, true);
});

test("a missing score gives a readable message", () => {
  const { timeliness: _omit, ...rest } = validReview;
  void _omit;
  const result = reviewInputSchema.safeParse(rest);
  assert.equal(result.success, false);
  assert.equal(result.error!.issues[0].message, "Pick a score from 1 to 5 for every dimension.");
});

test("short bodies are rejected", () => {
  const result = reviewInputSchema.safeParse({ ...validReview, body: "Too short." });
  assert.equal(result.success, false);
});

test("websites are normalized to https URLs", () => {
  assert.equal(normalizeWebsite("stripe.com"), "https://stripe.com");
  assert.equal(normalizeWebsite("http://example.org/jobs/"), "http://example.org/jobs");
  assert.equal(normalizeWebsite("not a site"), null);
  assert.equal(normalizeWebsite("localhost"), null);
});

test("company form drops empty optional fields and validates the website", () => {
  assert.deepEqual(companyInputSchema.parse({ name: " Linear ", website: "", industry: "", hqLocation: "" }), {
    name: "Linear",
    website: undefined,
    industry: undefined,
    hqLocation: undefined,
  });
  assert.equal(companyInputSchema.safeParse({ name: "Linear", website: "nope" }).success, false);
});

test("register lowercases the email", () => {
  const result = registerSchema.parse({ displayName: "Sam", email: " Sam@Example.COM ", password: "longenough" });
  assert.equal(result.email, "sam@example.com");
});
