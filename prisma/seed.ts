import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { reviewInputSchema } from "../src/lib/review-schema";
import { overallFromDimensions } from "../src/lib/scoring";
import { slugify } from "../src/lib/slugs";
import { importedReviews } from "./seed-data/reviews";

const prisma = new PrismaClient();

const companies = [
  { name: "Google", website: "https://google.com", industry: "Technology", hqLocation: "Mountain View, CA" },
  { name: "Meta", website: "https://meta.com", industry: "Social media", hqLocation: "Menlo Park, CA" },
  { name: "Amazon", website: "https://amazon.com", industry: "Retail and cloud", hqLocation: "Seattle, WA" },
  { name: "Microsoft", website: "https://microsoft.com", industry: "Software", hqLocation: "Redmond, WA" },
  { name: "Apple", website: "https://apple.com", industry: "Consumer electronics", hqLocation: "Cupertino, CA" },
  { name: "Netflix", website: "https://netflix.com", industry: "Streaming", hqLocation: "Los Gatos, CA" },
  { name: "Stripe", website: "https://stripe.com", industry: "Payments", hqLocation: "South San Francisco, CA" },
  { name: "Shopify", website: "https://shopify.com", industry: "Commerce", hqLocation: "Ottawa, ON" },
  { name: "Airbnb", website: "https://airbnb.com", industry: "Travel", hqLocation: "San Francisco, CA" },
  { name: "Uber", website: "https://uber.com", industry: "Mobility", hqLocation: "San Francisco, CA" },
  { name: "Figma", website: "https://figma.com", industry: "Design software", hqLocation: "San Francisco, CA" },
  { name: "Notion", website: "https://notion.com", industry: "Productivity software", hqLocation: "San Francisco, CA" },
  { name: "Linear", website: "https://linear.app", industry: "Developer tools", hqLocation: "San Francisco, CA" },
  { name: "Vercel", website: "https://vercel.com", industry: "Developer tools", hqLocation: "San Francisco, CA" },
  { name: "Databricks", website: "https://databricks.com", industry: "Data and AI", hqLocation: "San Francisco, CA" },
  { name: "Datadog", website: "https://datadoghq.com", industry: "Observability", hqLocation: "New York, NY" },
  { name: "Coinbase", website: "https://coinbase.com", industry: "Crypto", hqLocation: "Remote" },
  { name: "Ramp", website: "https://ramp.com", industry: "Fintech", hqLocation: "New York, NY" },
  { name: "Plaid", website: "https://plaid.com", industry: "Fintech", hqLocation: "San Francisco, CA" },
  { name: "Discord", website: "https://discord.com", industry: "Communication", hqLocation: "San Francisco, CA" },
  { name: "Duolingo", website: "https://duolingo.com", industry: "Education", hqLocation: "Pittsburgh, PA" },
  { name: "Robinhood", website: "https://robinhood.com", industry: "Fintech", hqLocation: "Menlo Park, CA" },
  { name: "Canva", website: "https://canva.com", industry: "Design software", hqLocation: "Sydney, Australia" },
];

/** A stable, spread-out date within the review's year, never in the future. */
function reviewDate(year: number, index: number) {
  const date = new Date(Date.UTC(year, (index * 5) % 12, 1 + ((index * 7) % 27)));
  return date > new Date() ? new Date() : date;
}

async function main() {
  const passwordHash = await hash("password123", 10);
  for (const demo of [
    { email: "demo@ratemybusiness.test", displayName: "Alex Chen" },
    { email: "second@ratemybusiness.test", displayName: "Jordan Hale" },
  ]) {
    await prisma.candidate.upsert({
      where: { email: demo.email },
      update: {},
      create: { ...demo, passwordHash },
    });
  }

  const companyIds = new Map<string, string>();
  for (const company of companies) {
    const slug = slugify(company.name);
    const saved = await prisma.company.upsert({
      where: { slug },
      update: company,
      create: { ...company, slug },
    });
    companyIds.set(company.name, saved.id);
  }

  let imported = 0;
  for (const [index, review] of importedReviews.entries()) {
    const companyId = companyIds.get(review.company);
    if (!companyId) throw new Error(`Seed review references unknown company "${review.company}"`);

    // Imported reviews must pass the same rules as reviews written in the app.
    reviewInputSchema.parse({
      ...review.scores,
      companySlug: slugify(review.company),
      roleTitle: review.roleTitle,
      stageReached: review.stageReached,
      ending: review.ending,
      processLengthWeeks: review.processLengthWeeks ?? undefined,
      takeHomeAssigned: review.takeHomeAssigned,
      wouldApplyAgain: review.wouldApplyAgain ? "yes" : "no",
      body: review.body,
    });

    // One hidden Candidate per imported review; it has no password and cannot sign in.
    const candidate = await prisma.candidate.upsert({
      where: { email: `imported-${index + 1}@ratemybusiness.test` },
      update: {},
      create: { email: `imported-${index + 1}@ratemybusiness.test`, displayName: "Imported" },
    });

    const data = {
      ...review.scores,
      overall: overallFromDimensions(review.scores),
      roleTitle: review.roleTitle,
      stageReached: review.stageReached,
      ending: review.ending,
      processLengthWeeks: review.processLengthWeeks,
      takeHomeAssigned: review.takeHomeAssigned,
      wouldApplyAgain: review.wouldApplyAgain,
      body: review.body,
      sourceUrl: review.sourceUrl,
      sourceName: review.sourceName,
      createdAt: reviewDate(review.year, index),
    };
    await prisma.review.upsert({
      where: { candidateId_companyId: { candidateId: candidate.id, companyId } },
      update: data,
      create: { ...data, candidateId: candidate.id, companyId },
    });
    imported += 1;
  }

  console.log(`Seeded ${companies.length} companies and ${imported} imported reviews.`);
  console.log("Demo sign-in: demo@ratemybusiness.test / password123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
