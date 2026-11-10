/**
 * Work entries. Every piece carries an honest label for what it is and
 * what it does — and doesn't — demonstrate.
 */

export type WorkKind = "demonstration" | "experiment" | "portfolio" | "product";

export type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  label: string;
  kind: WorkKind;
  practice: "Websites" | "Intelligent systems";
  year: string;
  readingNote: string;
  sections: { title: string; body?: string; list?: string[] }[];
  externalLink?: { label: string; href: string };
};

export const workKinds: Record<WorkKind, { title: string; body: string }> = {
  product: {
    title: "Live product websites",
    body: "Public product work shown as it exists today, with a direct link to the live experience.",
  },
  portfolio: {
    title: "Previous work by the founders",
    body: "Made by each founder before alro., with their role and context stated. Not presented as studio commissions.",
  },
  experiment: {
    title: "Independent experiments",
    body: "Personal concepts made to explore an idea. Not commissioned client work.",
  },
  demonstration: {
    title: "AI product demonstrations",
    body: "Working prototypes built with permitted sample data. They show functionality, not client outcomes.",
  },
};

export const work: WorkItem[] = [
  {
    slug: "company-knowledge-assistant",
    title: "Company Knowledge Assistant",
    summary: "A working assistant that answers questions from sample company documents, cites its sources, and prepares a weekly briefing.",
    label: "Product concept · Technical demonstration",
    kind: "demonstration",
    practice: "Intelligent systems",
    year: "[Year]",
    readingNote: "Built with fictional sample documents. It has not been deployed for a client, and no business outcomes have been measured.",
    sections: [
      {
        title: "Context",
        body: "Businesses rarely lack information — they lack a reliable way to find it. Decisions sit in meeting notes; context sits in chat threads and documents. This demonstration shows, concretely, what a bounded company knowledge system does, using permitted sample data.",
      },
      { title: "Role", body: "[Which founder built it, and what they personally did: retrieval pipeline, interface, evaluation, etc.]" },
      {
        title: "The challenge",
        body: "Answer only from approved sources, show where every answer came from, respect who can see what, and say plainly when the sources don’t contain an answer.",
      },
      {
        title: "The approach",
        body: "[Describe the real architecture: how documents are ingested, chunked and indexed, how retrieval and ranking work, which model is used and why, and how permissions are enforced.]",
      },
      { title: "The work", body: "[Add a short screen recording of the working prototype and one diagram of the architecture.]" },
      {
        title: "What it demonstrates",
        list: [
          "Retrieval over a defined set of documents",
          "Answers with source citations",
          "A scheduled briefing and a simple alert",
          "Clear handling of questions it can’t answer",
        ],
      },
      { title: "Limitations", body: "Built with fictional sample documents. Not deployed for a client; no business outcomes measured." },
    ],
  },
  {
    slug: "promptly-app",
    title: "Promptly",
    summary: "A dark, motion-led product website for an app that turns unclear intent into structured prompts.",
    label: "Live product · Website",
    kind: "product",
    practice: "Websites",
    year: "Live",
    readingNote: "A live product website by Team Promptly.",
    externalLink: { label: "Visit Promptly", href: "https://www.trypromptlyapp.com" },
    sections: [
      {
        title: "Context",
        body: "Promptly helps people turn an unclear idea into a structured prompt for text, image and video models.",
      },
      { title: "Attribution", body: "Visioned and crafted by Team Promptly, as credited on the live site." },
      {
        title: "The challenge",
        body: "Explain a multi-step AI product clearly while keeping the experience fast, focused and visually distinctive.",
      },
      {
        title: "The approach",
        body: "A dark product narrative uses a focused hero, a step-by-step process, concrete benefits and direct pricing to move from promise to proof.",
      },
      { title: "The work", body: "The live site is available at trypromptlyapp.com." },
      {
        title: "What it demonstrates",
        list: ["Product positioning", "Motion-led art direction", "Responsive web design", "Conversion-focused structure"],
      },
      { title: "Limitations", body: "Product claims, pricing and availability are controlled by Team Promptly and may change." },
    ],
  },
  {
    slug: "founder-one-portfolio",
    title: "Selected work by Sumedh Kudav",
    summary: "Design and frontend work made before alro., with role and context clearly attributed.",
    label: "Individual portfolio · Sumedh Kudav",
    kind: "portfolio",
    practice: "Websites",
    year: "[Years]",
    readingNote: "This work predates alro. and was not commissioned from the studio.",
    sections: [
      { title: "Context", body: "[For each piece: what it was, and whether it was made independently, for an employer, or with another team.]" },
      { title: "Role", body: "[What this founder personally did on each piece.]" },
      { title: "The challenge", body: "[What each piece set out to achieve.]" },
      { title: "The approach", body: "[The key design or technical decisions, and why.]" },
      { title: "The work", body: "[Selected images, at their native proportions.]" },
      { title: "What it demonstrates", body: "[Specific, substantiated capabilities.]" },
      { title: "Limitations", body: "This work predates alro. and was not commissioned from the studio." },
    ],
    externalLink: { label: "Visit Sumedh’s portfolio", href: "https://sumedhs-portfolio.vercel.app/" },
  },
  {
    slug: "founder-two-portfolio",
    title: "Selected work by Jash Doshi",
    summary: "Systems, automation and engineering work made before alro., with role and context clearly attributed.",
    label: "Individual portfolio · Jash Doshi",
    kind: "portfolio",
    practice: "Intelligent systems",
    year: "[Years]",
    readingNote: "This work predates alro. and was not commissioned from the studio.",
    sections: [
      { title: "Context", body: "[For each piece: what it was, and whether it was made independently, for an employer, or with another team.]" },
      { title: "Role", body: "[What this founder personally did on each piece.]" },
      { title: "The challenge", body: "[What each piece set out to achieve.]" },
      { title: "The approach", body: "[The key technical decisions, and why.]" },
      { title: "The work", body: "[Diagrams, screenshots or demos.]" },
      { title: "What it demonstrates", body: "[Specific, substantiated capabilities.]" },
      { title: "Limitations", body: "This work predates alro. and was not commissioned from the studio." },
    ],
    externalLink: { label: "Visit jashdoshi.in", href: "https://jashdoshi.in" },
  },
];

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}

export function nextWork(slug: string) {
  const i = work.findIndex((w) => w.slug === slug);
  return work[(i + 1) % work.length];
}
