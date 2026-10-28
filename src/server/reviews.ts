import { Prisma } from "@prisma/client";
import { overallFromDimensions, type DimensionScores, type Ending, type Stage } from "../lib/scoring";
import { endingDistribution, median, share } from "../lib/stats";
import { prisma } from "./db";

export class DuplicateReviewError extends Error {
  constructor() {
    super("You already reviewed this company.");
    this.name = "DuplicateReviewError";
  }
}

const reviewListSelect = {
  id: true,
  createdAt: true,
  roleTitle: true,
  stageReached: true,
  ending: true,
  wouldApplyAgain: true,
  takeHomeAssigned: true,
  processLengthWeeks: true,
  overall: true,
  communication: true,
  timeliness: true,
  interviewQuality: true,
  processClarity: true,
  professionalism: true,
  body: true,
  sourceUrl: true,
  sourceName: true,
  candidateId: true,
} satisfies Prisma.ReviewSelect;

export type ReviewListItem = Prisma.ReviewGetPayload<{ select: typeof reviewListSelect }>;

export async function aggregatesForCompany(companyId: string) {
  const [agg, rows] = await Promise.all([
    prisma.review.aggregate({
      where: { companyId },
      _count: true,
      _avg: {
        overall: true,
        communication: true,
        timeliness: true,
        interviewQuality: true,
        processClarity: true,
        professionalism: true,
      },
    }),
    prisma.review.findMany({
      where: { companyId },
      select: {
        ending: true,
        stageReached: true,
        wouldApplyAgain: true,
        takeHomeAssigned: true,
        processLengthWeeks: true,
      },
    }),
  ]);

  const count = agg._count;
  const weeks = rows.flatMap((r) => (r.processLengthWeeks == null ? [] : [r.processLengthWeeks]));

  return {
    count,
    overall: agg._avg.overall,
    communication: agg._avg.communication,
    timeliness: agg._avg.timeliness,
    interviewQuality: agg._avg.interviewQuality,
    processClarity: agg._avg.processClarity,
    professionalism: agg._avg.professionalism,
    endings: endingDistribution(rows.map((r) => r.ending)),
    wouldApplyAgainShare: share(rows.filter((r) => r.wouldApplyAgain).length, count),
    takeHomeCount: rows.filter((r) => r.takeHomeAssigned).length,
    medianWeeks: median(weeks),
    ghostedAfterFinalRound: rows.filter(
      (r) => r.ending === "ghosted" && (r.stageReached === "final_round" || r.stageReached === "offered"),
    ).length,
  };
}

export type CompanyAggregates = Awaited<ReturnType<typeof aggregatesForCompany>>;

export async function listReviewsForCompany(companyId: string) {
  return prisma.review.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
    select: reviewListSelect,
  });
}

export async function listRecentReviews(take = 6) {
  return prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    take,
    select: { ...reviewListSelect, company: { select: { name: true, slug: true } } },
  });
}

export async function listReviewsByCandidate(candidateId: string) {
  return prisma.review.findMany({
    where: { candidateId },
    orderBy: { createdAt: "desc" },
    select: { ...reviewListSelect, company: { select: { name: true, slug: true } } },
  });
}

export async function countReviews() {
  return prisma.review.count();
}

export async function candidateReviewedCompany(candidateId: string, companyId: string) {
  const existing = await prisma.review.findUnique({
    where: { candidateId_companyId: { candidateId, companyId } },
    select: { id: true },
  });
  return Boolean(existing);
}

export async function createReview(input: {
  companyId: string;
  candidateId: string;
  scores: DimensionScores;
  roleTitle: string;
  stageReached: Stage;
  ending: Ending;
  processLengthWeeks?: number;
  takeHomeAssigned: boolean;
  wouldApplyAgain: boolean;
  body: string;
}) {
  const { scores, ...rest } = input;
  try {
    return await prisma.review.create({
      data: { ...rest, ...scores, overall: overallFromDimensions(scores) },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new DuplicateReviewError();
    }
    throw error;
  }
}

/** Deletes the review only if it belongs to the candidate. Returns the company slug, or null. */
export async function deleteOwnReview(input: { reviewId: string; candidateId: string }) {
  const review = await prisma.review.findFirst({
    where: { id: input.reviewId, candidateId: input.candidateId },
    select: { id: true, company: { select: { slug: true } } },
  });
  if (!review) return null;
  await prisma.review.delete({ where: { id: review.id } });
  return review.company.slug;
}

/** Records a report. Returns false when the review is missing or is the reporter's own. */
export async function reportReview(input: {
  reviewId: string;
  candidateId: string;
  reason: string;
}) {
  const review = await prisma.review.findUnique({
    where: { id: input.reviewId },
    select: { candidateId: true },
  });
  if (!review || review.candidateId === input.candidateId) return false;
  await prisma.reviewReport.upsert({
    where: {
      reviewId_candidateId: { reviewId: input.reviewId, candidateId: input.candidateId },
    },
    create: input,
    update: { reason: input.reason },
  });
  return true;
}
