// Imported reviews: summaries, in our own words, of interview experiences that
// candidates posted publicly. Each links to its source. Scores are estimated
// from the account. Collected October 2026.
import type { Ending, Stage } from "../../src/lib/scoring";

export type ImportedReview = {
  company: string;
  roleTitle: string;
  stageReached: Stage;
  ending: Ending;
  processLengthWeeks: number | null;
  takeHomeAssigned: boolean;
  wouldApplyAgain: boolean;
  scores: {
    communication: number;
    timeliness: number;
    interviewQuality: number;
    processClarity: number;
    professionalism: number;
  };
  body: string;
  sourceUrl: string;
  sourceName: string;
  /** Year the process happened. */
  year: number;
};

export const importedReviews: ImportedReview[] = [
  {
    "company": "Google",
    "roleTitle": "Software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 3,
      "interviewQuality": 5,
      "processClarity": 4,
      "professionalism": 5
    },
    "body": "Five technical rounds, one of them system design, plus a lunch with an engineer. The interviewers knew their stuff, were friendly, and put me at ease. It ended in an offer that I accepted, and overall it was a very positive experience.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/google/experiences/software-engineer-zurich-august-24-2025-accepted-offer-positive-94c05f0a/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Google",
    "roleTitle": "Software engineer (experienced)",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 2,
      "timeliness": 4,
      "interviewQuality": 4,
      "processClarity": 2,
      "professionalism": 3
    },
    "body": "Full loop of four coding rounds and one design round. I felt every session went well and I talked through optimizations and testing. About a week later the recruiter called to say the hiring committee would not recommend an offer, with no reason given. Not knowing what went wrong was the hardest part.",
    "sourceUrl": "https://www.teamblind.com/post/rejected-and-shocked-after-a-google-onsite-interview-z8vf0tsk",
    "sourceName": "Blind",
    "year": 2016
  },
  {
    "company": "Meta",
    "roleTitle": "Software engineer",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": 8,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 3,
      "interviewQuality": 3,
      "processClarity": 2,
      "professionalism": 3
    },
    "body": "Recruiter call, a 90-minute online assessment, a coding screen, then a four-round onsite. Afterward I was asked to do an extra behavioral interview because two areas showed weak signal, and was then rejected anyway, with only a vague technical gap as feedback. About two months end to end, and the extra round felt pointless.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/meta/experiences/software-engineer-menlo-park-california-october-1-2025-no-offer-negative-717b5adb/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Meta",
    "roleTitle": "Data engineering manager",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 5,
      "timeliness": 4,
      "interviewQuality": 4,
      "processClarity": 5,
      "professionalism": 5
    },
    "body": "Recruiter screen that explained the process and gave prep tips, two pre-screens (a leadership behavioral and a SQL-heavy technical), then a five-round loop covering schema design, system design, leadership and ownership. It was long, but I was kept informed and heard back quickly after each round.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/meta/experiences/data-engineering-manager-menlo-park-ca-january-1-2025-accepted-offer-positive-57cba0e8/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Meta",
    "roleTitle": "Software engineer",
    "stageReached": "offered",
    "ending": "declined",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 3,
      "timeliness": 3,
      "interviewQuality": 3,
      "processClarity": 3,
      "professionalism": 4
    },
    "body": "Phone screen, then coding interviews at a medium-to-hard level, then a final round with system design and a behavioral conversation with management about teamwork, disagreements and deadlines. I got an offer but turned it down. A fairly standard, middle-of-the-road experience.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/meta/experiences/software-engineer-united-states-february-24-2025-declined-offer-neutral-c85ff31b/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Amazon",
    "roleTitle": "Operations engineer",
    "stageReached": "final_round",
    "ending": "ghosted",
    "processLengthWeeks": 22,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 1,
      "timeliness": 1,
      "interviewQuality": 4,
      "processClarity": 3,
      "professionalism": 2
    },
    "body": "Remote intro call, then a two-day behavioral loop with five interviewers back to back. The recruiter's schedule and prep guidance were well organized, and I was told a decision would come the next week. It never did: two follow-ups went unanswered, and months later my application was silently switched to no longer under consideration.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/amazon/experiences/operations-engineer-united-states-november-1-2024-no-offer-negative-e48e88da/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Amazon",
    "roleTitle": "Software development engineer I",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 3,
      "timeliness": 3,
      "interviewQuality": 4,
      "processClarity": 3,
      "professionalism": 4
    },
    "body": "The coding questions were fair for anyone comfortable with data structures, but the behavioral side dominated: interviewers dug deep into the leadership principles and wanted several detailed examples. No offer, though I left with a positive impression and a clear lesson to prepare behavioral stories as seriously as coding.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/amazon/experiences/sde-i-vancouver-bc-september-2-2025-no-offer-positive-1310f1a2/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Amazon",
    "roleTitle": "Network development engineer II",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 3,
      "interviewQuality": 4,
      "processClarity": 4,
      "professionalism": 5
    },
    "body": "Interviews centered on my past experience and how I'd fit the team, including walking through a time-critical incident I had resolved. The atmosphere made it easy to talk openly, though it was not an easy interview. Smooth overall, and it ended in an offer I accepted.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/amazon/experiences/network-development-engineer-ii-london-england-november-24-2025-accepted-offer-positive-ef4a4fc3/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Microsoft",
    "roleTitle": "Software engineer II",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": 13,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 1,
      "timeliness": 1,
      "interviewQuality": 4,
      "processClarity": 2,
      "professionalism": 3
    },
    "body": "Hiring-event track: online assessment, then four 45-minute virtual interviews. The interviews were polite and well run, but everything around them dragged: over a week to get OA results, onsite confirmation one day before, six different recruiters, three weeks for a verbal offer, and a stalled background check. Roughly three months in all.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/microsoft/experiences/software-engineer-2-vancouver-bc-july-1-2020-accepted-offer-negative-bc74a5ff/",
    "sourceName": "Taro",
    "year": 2020
  },
  {
    "company": "Microsoft",
    "roleTitle": "Senior software engineer",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 3,
      "interviewQuality": 2,
      "processClarity": 1,
      "professionalism": 3
    },
    "body": "The recruiter told me to expect C++ coding and questions about my experience. Instead, the first-round call with the hiring manager was a deep system design dive into the team's own architecture, and I was told my background didn't fit. It felt aimed at someone already on the team rather than at assessing core skills.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/microsoft/experiences/senior-software-engineer-chicago-illinois-november-6-2025-no-offer-negative-10c3afe6/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Microsoft",
    "roleTitle": "Junior software engineer",
    "stageReached": "offered",
    "ending": "declined",
    "processLengthWeeks": 3,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 5,
      "interviewQuality": 4,
      "processClarity": 4,
      "professionalism": 4
    },
    "body": "Recruiter phone screen, then a single technical interview with an engineer: two coding problems in a shared editor while I explained my thinking, with time at the end for my questions about the team. About three weeks from application to decision. I received an offer and declined it.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/microsoft/experiences/junior-software-engineer-new-york-new-york-september-1-2024-declined-offer-positive-fbe9d16d/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Apple",
    "roleTitle": "Senior software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": 26,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 3,
      "timeliness": 1,
      "interviewQuality": 5,
      "processClarity": 3,
      "professionalism": 4
    },
    "body": "Seven rounds in total: five technical sessions with engineers and two with managers. Questions were varied and not recycled from LeetCode, ranging from easy to hard with several per session. It took about six months from start to offer, which I accepted.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/apple/experiences/senior-software-engineer-hong-kong-hong-kong-november-25-2025-accepted-offer-positive-2dd5e80f/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Apple",
    "roleTitle": "Machine learning engineer",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 3,
      "timeliness": 3,
      "interviewQuality": 3,
      "processClarity": 4,
      "professionalism": 4
    },
    "body": "Recruiter call, hiring manager screen, technical phone screen, then an onsite; a typical big-tech sequence. The onsite coding included a hard problem I hadn't seen and couldn't solve, and the behavioral questions went deep on my resume. No offer, but the process itself felt reasonable.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/apple/experiences/machine-learning-engineer-cupertino-california-november-17-2025-no-offer-positive-b49ee1c8/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Netflix",
    "roleTitle": "Site reliability engineer",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 3,
      "timeliness": 3,
      "interviewQuality": 1,
      "processClarity": 3,
      "professionalism": 1
    },
    "body": "The recruiter stage was good, with culture reading material and a few quick conceptual technical questions. The hiring manager round was the opposite: I was interrupted repeatedly while describing past projects, expected to know every detail of cross-team work, and the call ended early. It made me question how interviewers are trained.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/netflix/experiences/site-reliability-engineer-united-states-january-30-2025-no-offer-negative-a31a5725/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Netflix",
    "roleTitle": "Software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 3,
      "interviewQuality": 4,
      "processClarity": 4,
      "professionalism": 4
    },
    "body": "A recruiter reached out, then came a short phone screen and a hiring manager technical screen on past projects, data structures and libraries I had used. The onsite had three rounds: coding, system design with a director that probed edge cases, and a behavioral round built around the culture memo. Ended with an offer I accepted.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/netflix/experiences/software-engineer-los-gatos-ca-february-1-2025-accepted-offer-positive-89f9eeab/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Netflix",
    "roleTitle": "Software engineer",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 3,
      "timeliness": 2,
      "interviewQuality": 4,
      "processClarity": 3,
      "professionalism": 4
    },
    "body": "An initial interview followed by a second round. The recruiter was very helpful, but it took more than a week to hear back and get the next round booked, so communication between stages could have been tighter. They went with someone else; still a good experience overall.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/netflix/experiences/software-engineer-los-angeles-ca-may-2-2024-no-offer-positive-79a7b50d/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Stripe",
    "roleTitle": "Software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": 6,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 5,
      "timeliness": 4,
      "interviewQuality": 4,
      "processClarity": 5,
      "professionalism": 4
    },
    "body": "Applied by referral and a recruiter replied the next day. Short recruiter call, a quick-moving practical technical screen a week later, then a five-part virtual onsite: coding, bug bash, integration, system design and a hiring manager behavioral. I had results within a week and the offer two weeks after; about six weeks overall, with next steps always shared promptly.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/stripe/experiences/software-engineer-new-york-ny-march-1-2025-accepted-offer-positive-82507a7a/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Stripe",
    "roleTitle": "Senior software engineer",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 1,
      "timeliness": 2,
      "interviewQuality": 2,
      "processClarity": 1,
      "professionalism": 1
    },
    "body": "Seven rounds, including a phone screen, onsite coding, bug squash, system design, hiring manager and integration. Rules on looking things up online were inconsistent, one interviewer had audio problems and another joined late and left early, yet those rounds counted against me. I was rejected without clear feedback, and the recruiter pushed back on my survey rating.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/stripe/experiences/senior-software-engineer-india-july-1-2025-no-offer-negative-e7c2d236/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Stripe",
    "roleTitle": "Software engineer, new grad",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 3,
      "timeliness": 3,
      "interviewQuality": 4,
      "processClarity": 3,
      "professionalism": 4
    },
    "body": "A tough multi-part online assessment where the requirements changed at each level, then a practical, non-LeetCode team screen. The interviewer was warm and helped when I asked. I stumbled in places and was turned down, with feedback to keep sharpening my coding.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/stripe/experiences/software-engineer-new-grad-united-states-november-5-2025-no-offer-neutral-d8d78bbd/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Shopify",
    "roleTitle": "Software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": true,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 5,
      "timeliness": 5,
      "interviewQuality": 4,
      "processClarity": 4,
      "professionalism": 5
    },
    "body": "Two coding interviews grounded in data structures but not lifted from LeetCode, then a third round where I wrote a design document in advance and defended my decisions. Interviewers cared about reasoning more than perfect answers, and the recruiter was quick and friendly. It moved fast and ended in an offer I accepted.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/shopify/experiences/software-engineer-montreal-quebec-november-9-2025-accepted-offer-positive-f0cb6ab1/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Shopify",
    "roleTitle": "Site reliability engineer",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 3,
      "interviewQuality": 2,
      "processClarity": 1,
      "professionalism": 3
    },
    "body": "The coding round was billed as AI-friendly pair programming, so I prepared for that. It turned out to be a standard algorithm puzzle with no pairing, and the interviewer stopped me from using an LLM on the problem. I failed it; the gap between the advertised format and the real one was frustrating.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/shopify/experiences/site-reliability-engineer-united-states-may-13-2025-no-offer-negative-e294bc41/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Shopify",
    "roleTitle": "Senior software engineer",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 3,
      "timeliness": 3,
      "interviewQuality": 4,
      "processClarity": 4,
      "professionalism": 4
    },
    "body": "Recruiter call, then a one-on-one pairing session: write a fairly simple function, then refactor it and add caching. AI tools were permitted. The engineer was polite; I was rusty and nervous, didn't perform well, and wasn't moved forward.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/shopify/experiences/senior-software-engineer-toronto-on-march-1-2025-no-offer-positive-ca1773c8/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Airbnb",
    "roleTitle": "Software engineer (front-end leaning)",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 1,
      "interviewQuality": 1,
      "processClarity": 1,
      "professionalism": 2
    },
    "body": "A recruiter contacted me about a front-end-heavy role. Scheduling was slow and clunky, and while some onsite interviewers were great, the system design round matched neither the role nor the prep packet. The coding interviewer started late, struggled to explain the problem, then criticized my pace. Rejected, and it felt like wasted effort.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/airbnb/experiences/software-engineer-united-states-september-1-2025-no-offer-negative-8231f149/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Airbnb",
    "roleTitle": "Senior Android engineer",
    "stageReached": "final_round",
    "ending": "ghosted",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 1,
      "timeliness": 1,
      "interviewQuality": 3,
      "processClarity": 3,
      "professionalism": 1
    },
    "body": "Screening call, hiring manager call, four technical rounds (a live Android pairing build, an architecture whiteboard, behavioral, and a bug hunt), a values interview, hiring committee and a director chat. Around seven hours of interviews plus lots of prep, and then nothing: no decision and no rejection ever arrived.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/airbnb/experiences/senior-android-engineer-united-states-september-24-2025-no-offer-negative-3c7b7834/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Airbnb",
    "roleTitle": "Staff software engineer",
    "stageReached": "offered",
    "ending": "declined",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 3,
      "interviewQuality": 5,
      "processClarity": 5,
      "professionalism": 4
    },
    "body": "Recruiter screen on my background and motivation, a technical phone screen with coding and design, then a four-round onsite: deep system design, coding, behavioral, and cross-functional collaboration. Questions focused on real-world scaling trade-offs and clear communication. It felt thorough and open, and I came away with an offer.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/airbnb/experiences/staff-software-engineer-portland-or-march-1-2024-declined-offer-positive-02171208/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Uber",
    "roleTitle": "Software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": true,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 4,
      "interviewQuality": 5,
      "processClarity": 4,
      "professionalism": 4
    },
    "body": "It started with a take-home project, which I then walked through with the whole team on an in-office interview day. The rest of that day was five or so one-on-ones alternating between technical discussion and pseudocode problems. Tough, but I enjoyed it, and it ended with an offer.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/uber/experiences/software-engineer-aarhus-august-16-2023-accepted-offer-positive-51c8b679/",
    "sourceName": "Taro",
    "year": 2023
  },
  {
    "company": "Uber",
    "roleTitle": "Staff software engineer",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 3,
      "interviewQuality": 1,
      "processClarity": 2,
      "professionalism": 1
    },
    "body": "The recruiter set up a tech screen and said there would be time for my questions about the role. The interviewer skipped introductions, seemed dismissive of my project example, told me to reread the problem instead of answering clarifying questions, and hung up the moment time ran out. No offer; one of the worst interviews I've had.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/uber/experiences/staff-software-engineer-san-francisco-ca-may-1-2022-no-offer-negative-0ec36fbb/",
    "sourceName": "Taro",
    "year": 2022
  },
  {
    "company": "Uber",
    "roleTitle": "Software engineering intern",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 5,
      "timeliness": 4,
      "interviewQuality": 4,
      "processClarity": 4,
      "professionalism": 5
    },
    "body": "Recruiter screen about my background, a 45-minute technical with algorithms and some design, then a virtual onsite with two problem-solving sessions and a behavioral round. Scheduling was flexible and communication was clear. No offer, but the whole thing ran smoothly and professionally.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/uber/experiences/swe-intern-san-francisco-ca-june-1-2025-no-offer-positive-1125fdd0/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Figma",
    "roleTitle": "Software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 5,
      "timeliness": 5,
      "interviewQuality": 4,
      "processClarity": 5,
      "professionalism": 5
    },
    "body": "Short recruiter call, then a single coding screen the following week, then a four-part onsite: two product-flavored coding rounds, a collaborative system design session, a deep dive presenting a past project, and a behavioral chat. Recruiting explained what signals each round looked for, and the move from onsite to offer was very fast.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/figma/experiences/software-engineer-united-states-april-23-2024-accepted-offer-positive-1d1cd8c4/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Figma",
    "roleTitle": "Software engineer",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": 8,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 2,
      "interviewQuality": 2,
      "processClarity": 2,
      "professionalism": 2
    },
    "body": "Roughly two months from first recruiter call to rejection. After a live coding screen and a fairly shallow manager chat, I sat a five-hour virtual panel with two more coding rounds, a deep dive and an architecture session. One interviewer never showed, delaying things further, and the feedback that my coding was too weak felt like something the first screen should have caught.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/figma/experiences/software-engineer-london-england-october-1-2024-no-offer-negative-c45d2569/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Notion",
    "roleTitle": "Software engineer",
    "stageReached": "final_round",
    "ending": "ghosted",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 1,
      "timeliness": 1,
      "interviewQuality": 4,
      "processClarity": 3,
      "professionalism": 2
    },
    "body": "Three rounds: a coding screen judged heavily on code quality, a design round centered on data modeling and SQL, and a pair-programming exercise with follow-up discussion. Interviewers were professional and encouraging. The head recruiter promised a decision by the end of that week, then went silent; over a month later I had heard nothing at all.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/notion/experiences/software-engineer-india-june-1-2025-no-offer-negative-ad553f23/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Notion",
    "roleTitle": "Software engineer",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 1,
      "timeliness": 2,
      "interviewQuality": 2,
      "processClarity": 1,
      "professionalism": 2
    },
    "body": "Recruiter phone screen went well, then two weeks of silence despite follow-ups before a hiring manager chat that arguably should have come first. I had been slotted onto a team needing a language I don't use, without any discussion. The virtual onsite was cut off after two of four rounds with a same-hour rejection; the manager was engaging, the onsite interviewers much less so.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/notion/experiences/software-engineer-united-states-november-4-2025-no-offer-negative-58c8a5b4/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Notion",
    "roleTitle": "Software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": 4,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 5,
      "timeliness": 5,
      "interviewQuality": 4,
      "processClarity": 4,
      "professionalism": 5
    },
    "body": "Recruiter screen, a data wrangling exercise, a three-interview onsite, a conversation with the head of data, then references and an offer. It wrapped up in about three to four weeks, helped along by competing offers, and the recruiters were responsive and helpful the whole way. One onsite prompt was designing a high-volume ETL pipeline.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/notion/experiences/software-engineer-san-francisco-ca-june-1-2024-accepted-offer-positive-02404d40/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Vercel",
    "roleTitle": "Software engineer",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 3,
      "interviewQuality": 3,
      "processClarity": 2,
      "professionalism": 2
    },
    "body": "The process I saw was a recruiter conversation followed by a hiring manager interview with standard questions about my background. The hiring manager was friendly, but the recruiter was not pleasant to deal with, and the overall attitude came across as self-important, which put me off. It ended without an offer.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/vercel/experiences/software-engineer-united-states-august-11-2025-no-offer-neutral-337bb7c0/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Vercel",
    "roleTitle": "Software engineer intern",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 3,
      "interviewQuality": 5,
      "processClarity": 3,
      "professionalism": 5
    },
    "body": "A single conversation with the head of engineering instead of a coding round. We talked through system design ideas, what interns actually work on, and growth paths, and I was asked about a problem I had solved in an unusual way. It felt genuinely engaging even though it did not end in an offer.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/vercel/experiences/software-engineer-intern-united-states-october-21-2025-no-offer-positive-f2559339/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Databricks",
    "roleTitle": "Senior solutions architect",
    "stageReached": "offered",
    "ending": "declined",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 2,
      "interviewQuality": 3,
      "processClarity": 1,
      "professionalism": 3
    },
    "body": "A long, drawn-out process where I kept getting handed between different groups, which made it feel disorganized. Everyone I spoke with was friendly, but there was a strong expectation to already know the product well enough to demo it. I received an offer at the end and turned it down.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/databricks/experiences/senior-solutions-architect-united-states-march-1-2025-declined-offer-negative-b7bcf4c9/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Databricks",
    "roleTitle": "New grad software engineer",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 3,
      "timeliness": 3,
      "interviewQuality": 4,
      "processClarity": 3,
      "professionalism": 5
    },
    "body": "Recruiter call, one technical round, then a final round of four interviews including system design and a practical exercise to design and build an API. The questions were very hard, but the interviewers were kind and I genuinely enjoyed it despite being turned down after the final.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/databricks/experiences/software-engineer-san-francisco-ca-october-9-2025-no-offer-positive-a4b5f66e/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Datadog",
    "roleTitle": "Software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 5,
      "interviewQuality": 5,
      "processClarity": 4,
      "professionalism": 4
    },
    "body": "Fast and fair. The coding round skipped puzzle-style questions in favor of a practical log parsing task with a design angle, and much of the evaluation was a walkthrough of my resume and a past project. Turnaround between steps was very quick, and I ended up accepting the offer.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/datadog/experiences/software-engineer-new-york-ny-april-15-2025-accepted-offer-positive-50da00e3/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Datadog",
    "roleTitle": "Senior software engineer",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 3,
      "interviewQuality": 2,
      "processClarity": 2,
      "professionalism": 4
    },
    "body": "The recruiter said there would be at most two coding rounds; the loop had three, and my question to the coordinator about it went unanswered. The design and experience rounds were meant to let me lead with my infrastructure background but kept drifting into backend topics. Interviewers were courteous, but the rejection cited weak signal in exactly the areas the format sidelined.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/datadog/experiences/senior-software-engineer-united-states-november-23-2023-no-offer-negative-63082c31/",
    "sourceName": "Taro",
    "year": 2023
  },
  {
    "company": "Datadog",
    "roleTitle": "Software engineer",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": true,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 3,
      "timeliness": 3,
      "interviewQuality": 4,
      "processClarity": 3,
      "professionalism": 5
    },
    "body": "Started with a technical interview with one easy and one medium problem, then a short take-home, then a second technical round with a longer but simple problem. The tasks were practical, like walking a file tree and matching log lines. Staff were friendly and made it comfortable, though it did not lead to an offer.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/datadog/experiences/software-engineer-brazil-january-30-2025-no-offer-positive-b7d4e436/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Coinbase",
    "roleTitle": "Software engineering intern",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 4,
      "interviewQuality": 4,
      "processClarity": 4,
      "professionalism": 4
    },
    "body": "An online assessment with two medium coding problems, then a recruiter call that was mostly about explaining the internship program, then a technical interview with an engineer that was easier than the assessment. Straightforward and pleasant, and it ended with an offer I accepted.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/coinbase/experiences/software-engineering-intern-mountain-view-ca-august-29-2024-accepted-offer-positive-5a2f8688/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Coinbase",
    "roleTitle": "Software engineer (IC4)",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 2,
      "interviewQuality": 2,
      "processClarity": 1,
      "professionalism": 2
    },
    "body": "Phone screen, a cognitive test, a self-paced coding assessment, a prep meeting, then three interviews, two of them technical. I solved every technical problem, yet the rejection said I should have talked more while coding, an expectation nobody stated beforehand. The whole thing felt like filling in a rubric rather than assessing skill.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/coinbase/experiences/software-engineer-ic4-united-states-july-1-2025-no-offer-negative-08b4f7c1/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Coinbase",
    "roleTitle": "Engineering manager",
    "stageReached": "screened",
    "ending": "ghosted",
    "processLengthWeeks": null,
    "takeHomeAssigned": true,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 1,
      "timeliness": 2,
      "interviewQuality": 2,
      "processClarity": 2,
      "professionalism": 1
    },
    "body": "The screening call covered management in very generic terms, then I was asked to complete an assessment by the end of that same week while I was on a family holiday. After that, none of my follow-ups by email or direct message got a response. The recruiter came across as dismissive of my circumstances.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/coinbase/experiences/software-engineering-manager-london-england-february-1-2025-no-offer-negative-fb320ee8/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Ramp",
    "roleTitle": "Frontend software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": true,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 5,
      "timeliness": 4,
      "interviewQuality": 5,
      "processClarity": 4,
      "professionalism": 5
    },
    "body": "It began with a take-home that was actually enjoyable, followed by an hour of pair programming. The onsite had two more pairing sessions in React and JavaScript, a culture interview, and a system design round where I presented a past project. The recruiter who joined after the first round answered everything and kept it pleasant.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/ramp/experiences/frontend-software-engineer-edmonton-ab-november-1-2024-accepted-offer-positive-6baa0f4b/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Ramp",
    "roleTitle": "Staff software engineer",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 1,
      "timeliness": 2,
      "interviewQuality": 1,
      "processClarity": 2,
      "professionalism": 1
    },
    "body": "Came in through a referral, and the hiring manager and HR conversation went well. The single technical round, an API exercise about spotting failure patterns, felt one-sided, with an interviewer who seemed uninterested in a real conversation. My status emails went unanswered for about two weeks despite a visa deadline I had flagged, then a rejection email arrived.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/ramp/experiences/staff-software-engineer-new-york-new-york-august-1-2025-no-offer-negative-b117e621/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Ramp",
    "roleTitle": "Backend software engineer",
    "stageReached": "screened",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 1,
      "timeliness": 3,
      "interviewQuality": 2,
      "processClarity": 1,
      "professionalism": 2
    },
    "body": "The only stage was an automated coding assessment. I got a perfect score and was still rejected by an email that gave no reason, and the same thing happened on other engineering roles I applied to there. There was no human contact at any point.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/ramp/experiences/software-engineer-backend-united-states-february-1-2025-no-offer-negative-b1a49e18/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Plaid",
    "roleTitle": "Software engineer",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 1,
      "timeliness": 2,
      "interviewQuality": 2,
      "processClarity": 2,
      "professionalism": 1
    },
    "body": "Seven rounds in total. Coding meant getting a prompt and starter code over a video call, writing it locally, and emailing it back. The recruiter was often half an hour late to calls, and alternative approaches were not welcomed. At the end I was told headcount and a reorg meant there was no spot, with no feedback given.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/plaid/experiences/software-engineer-united-states-december-10-2024-no-offer-negative-9a197fa8/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Plaid",
    "roleTitle": "Staff software engineer",
    "stageReached": "offered",
    "ending": "declined",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 3,
      "timeliness": 3,
      "interviewQuality": 2,
      "processClarity": 3,
      "professionalism": 2
    },
    "body": "Hiring manager call, then a two-hour final: system design followed by coding. The coding round was good, but the design interviewer was on their phone and I kept having to win back their attention. There was no proper coding environment either; boilerplate arrived via chat and I emailed my solution back. I got an offer and declined it.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/plaid/experiences/staff-software-engineer-san-francisco-ca-september-1-2024-declined-offer-negative-bb88a12c/",
    "sourceName": "Taro",
    "year": 2024
  },
  {
    "company": "Plaid",
    "roleTitle": "Software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 5,
      "timeliness": 5,
      "interviewQuality": 5,
      "processClarity": 5,
      "professionalism": 5
    },
    "body": "Hiring manager call, two technical phone screens, then an onsite with multi-part coding problems tied to fintech work, system design, a behavioral round on company principles, and a past-project deep dive. Expectations were shared in advance, interviewers had clearly read my resume, and feedback came within days, with the offer about a week or so later.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/plaid/experiences/software-engineer-san-francisco-ca-june-1-2021-accepted-offer-positive-d4aa85e5/",
    "sourceName": "Taro",
    "year": 2021
  },
  {
    "company": "Discord",
    "roleTitle": "Software engineer",
    "stageReached": "interviewed",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 2,
      "interviewQuality": 2,
      "processClarity": 3,
      "professionalism": 3
    },
    "body": "The recruiter was slow and it took a while to get the technical screen booked. The screen was building a small server app and testing it with several clients; I got it working and did what was asked, yet was not moved on to the six-round onsite. It felt like a box-ticking exercise with little real discussion.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/discord/experiences/software-engineer-united-states-june-1-2025-no-offer-negative-f3c83c85/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Discord",
    "roleTitle": "Senior software engineer",
    "stageReached": "offered",
    "ending": "declined",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 3,
      "timeliness": 2,
      "interviewQuality": 3,
      "processClarity": 2,
      "professionalism": 3
    },
    "body": "The virtual onsite was six rounds, noticeably more than the larger tech companies I had interviewed with, and the hiring manager made the final call. I got an offer but declined it; the sheer length of the loop left me with a poor impression of how keen they were to hire.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/discord/experiences/senior-software-engineer-united-states-january-1-2025-declined-offer-negative-df7b6d63/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Duolingo",
    "roleTitle": "Senior software engineer",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 3,
      "timeliness": 3,
      "interviewQuality": 2,
      "processClarity": 3,
      "professionalism": 2
    },
    "body": "Recruiter screen, a HackerRank test, then pair programming, a code review exercise, technical design and a hiring manager chat, each with two interviewers, so I met a lot of engineers. Most went well, but in the last session the interviewer got up mid-interview and started bouncing a ball off the wall. Questions did not seem standardized across candidates.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/duolingo/experiences/senior-software-engineer-united-states-february-25-2025-no-offer-negative-c9511442/",
    "sourceName": "Taro",
    "year": 2025
  },
  {
    "company": "Duolingo",
    "roleTitle": "Senior software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 5,
      "timeliness": 4,
      "interviewQuality": 4,
      "processClarity": 4,
      "professionalism": 5
    },
    "body": "Two screens, then a six-hour onsite with two whiteboard sessions, system design, pair programming and an informal manager chat, followed by team matching and three references. Long and grueling overall, but the recruiter told me next steps by the following morning after every round, and interviewers were friendly and helpful.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/duolingo/experiences/senior-software-engineer-new-york-ny-october-1-2022-accepted-offer-positive-621c7497/",
    "sourceName": "Taro",
    "year": 2022
  },
  {
    "company": "Duolingo",
    "roleTitle": "Engineering manager",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 5,
      "timeliness": 4,
      "interviewQuality": 3,
      "processClarity": 5,
      "professionalism": 4
    },
    "body": "A thorough recruiter call laid out every stage up front, followed by a short hiring manager screen, a coding round, and finals on behavior and system design. Updates came promptly throughout. The downsides: no explanation for the rejection, and I was told I could not interview for technical roles there again.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/duolingo/experiences/engineering-manager-new-york-ny-april-1-2023-no-offer-positive-d83ab9b8/",
    "sourceName": "Taro",
    "year": 2023
  },
  {
    "company": "Robinhood",
    "roleTitle": "Staff software engineer",
    "stageReached": "offered",
    "ending": "hired",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 3,
      "interviewQuality": 4,
      "processClarity": 3,
      "professionalism": 4
    },
    "body": "I first went through the backend loop: a tech screen and three onsite rounds covering system design, a project deep dive, and coding. I passed, but no staff backend role was open, so when a frontend one appeared I did two more interviews, including adding a feature to a prebuilt mini app within an hour. That led to an offer I accepted.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/robinhood/experiences/staff-software-engineer-new-york-ny-december-1-2022-accepted-offer-positive-76b421d1/",
    "sourceName": "Taro",
    "year": 2022
  },
  {
    "company": "Robinhood",
    "roleTitle": "Engineering manager",
    "stageReached": "final_round",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": true,
    "scores": {
      "communication": 4,
      "timeliness": 3,
      "interviewQuality": 3,
      "processClarity": 4,
      "professionalism": 4
    },
    "body": "Several rounds after the recruiter screen, covering leadership scenarios, collaboration with a TPM, a slide-based project deep dive, and system design. Both the deep dive and the design session felt too short for what they had to cover. No offer, but it was a good experience overall and I would still recommend applying.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/robinhood/experiences/engineering-manager-seattle-wa-december-1-2023-no-offer-positive-0b24a627/",
    "sourceName": "Taro",
    "year": 2023
  },
  {
    "company": "Robinhood",
    "roleTitle": "Software engineer intern",
    "stageReached": "screened",
    "ending": "rejected",
    "processLengthWeeks": null,
    "takeHomeAssigned": false,
    "wouldApplyAgain": false,
    "scores": {
      "communication": 2,
      "timeliness": 1,
      "interviewQuality": 3,
      "processClarity": 2,
      "professionalism": 2
    },
    "body": "Online assessment, then a phone screen asking why I wanted to work there. Scheduling was the pain point: the booking tool glitched, reschedule requests went unanswered, and the next open slot was over a month out, as if far too many candidates had been pushed through at once. It did not end in an offer.",
    "sourceUrl": "https://www.jointaro.com/interviews/companies/robinhood/experiences/software-engineerinternship-new-york-ny-november-18-2024-no-offer-neutral-73b3cdc7/",
    "sourceName": "Taro",
    "year": 2024
  }
];
