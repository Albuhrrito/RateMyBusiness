import type { Metadata } from "next";
import { PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Review guidelines" };

const RULES = [
  {
    title: "Review the process, not the job",
    body: "How the company communicated, how long it took, whether interviews matched the role, and how it ended. Pay, managers, and day-to-day work belong somewhere else.",
  },
  {
    title: "Don't name people",
    body: "Leave out interviewers, recruiters, and anyone else. Say “the recruiter” or “the second interviewer” instead.",
  },
  {
    title: "Only what you went through",
    body: "Write about a process you took part in yourself. One review per company.",
  },
  {
    title: "Keep personal data out",
    body: "No emails, phone numbers, offer letters, or anything that identifies you or someone else.",
  },
];

export default function GuidelinesPage() {
  return (
    <article className="max-w-2xl">
      <PageTitle lead="Reviews help the next candidate know what they're walking into.">Review guidelines</PageTitle>
      <dl className="mt-10 space-y-8">
        {RULES.map((rule) => (
          <div key={rule.title} className="border-l-2 border-ballpoint pl-5">
            <dt className="text-lg font-semibold">{rule.title}</dt>
            <dd className="mt-1 leading-relaxed text-muted">{rule.body}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12 rounded-[10px] border border-rule bg-surface p-6 leading-relaxed">
        <h2 className="font-semibold">About the sample reviews</h2>
        <p className="mt-2 text-muted">
          Many reviews here are summaries of interview experiences that candidates posted publicly. Each one
          links to its source. Their scores are our estimate from what the candidate wrote. If a review breaks
          these guidelines, sign in and use Report.
        </p>
      </div>
    </article>
  );
}
