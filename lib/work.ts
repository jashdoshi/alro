/**
 * Work entries. Every piece carries an honest label for what it is and
 * what it does — and doesn't — demonstrate.
 */

export type WorkKind = "demonstration" | "experiment" | "portfolio";

export type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  label: string;
  kind: WorkKind;
  practice: "Digital Experiences" | "Intelligent Systems";
  year: string;
  image: string;
  readingNote: string;
  sections: { title: string; body?: string; list?: string[] }[];
  externalLink?: { label: string; href: string };
};

export const workKinds: Record<WorkKind, { title: string; body: string }> = {
  portfolio: {
    title: "Previous work by the founders",
    body: "Made by each founder before ALRO, with their role and context stated. Not presented as studio commissions.",
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
    practice: "Intelligent Systems",
    year: "[Year]",
    image: "/img/laptop-night.jpg",
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
    slug: "birthday-website",
    title: "A Birthday, Told as a Website",
    summary: "A personal, narrative website made as a gift — an exercise in story, personalisation, motion and mobile layout.",
    label: "Independent project · Not client work",
    kind: "experiment",
    practice: "Digital Experiences",
    year: "[Year]",
    image: "/img/candle-desk.jpg",
    readingNote: "A personal project with an audience of one. No user testing or measurement took place.",
    sections: [
      {
        title: "Context",
        body: "A one-off website made for a birthday. Never commissioned — it exists because the medium allowed a kind of message a card couldn’t.",
      },
      { title: "Role", body: "[Which founder made it, and what they personally did: concept, design, development, writing.]" },
      {
        title: "The challenge",
        body: "Turn a personal story into a sequence that unfolds well on a phone — where it would most likely be opened — without the motion overwhelming the message.",
      },
      {
        title: "The approach",
        body: "[Explain the structure of the story, the motion decisions, and how the layout was rethought for small screens rather than shrunk.]",
      },
      { title: "The work", body: "[Add screenshots or a short capture of the key moments, on mobile and desktop.]" },
      {
        title: "What it demonstrates",
        list: ["Narrative structure on the web", "Personalisation and tone", "Purposeful motion", "Mobile-first layout"],
      },
      { title: "Limitations", body: "A personal project with an audience of one. No user testing or measurement took place." },
    ],
  },
  {
    slug: "founder-one-portfolio",
    title: "Selected work by [Founder One]",
    summary: "Design and frontend work made before ALRO, with role and context clearly attributed.",
    label: "Individual portfolio · [Founder One]",
    kind: "portfolio",
    practice: "Digital Experiences",
    year: "[Years]",
    image: "/img/sketch.jpg",
    readingNote: "This work predates ALRO and was not commissioned from the studio.",
    sections: [
      { title: "Context", body: "[For each piece: what it was, and whether it was made independently, for an employer, or with another team.]" },
      { title: "Role", body: "[What this founder personally did on each piece.]" },
      { title: "The challenge", body: "[What each piece set out to achieve.]" },
      { title: "The approach", body: "[The key design or technical decisions, and why.]" },
      { title: "The work", body: "[Selected images, at their native proportions.]" },
      { title: "What it demonstrates", body: "[Specific, substantiated capabilities.]" },
      { title: "Limitations", body: "This work predates ALRO and was not commissioned from the studio." },
    ],
    externalLink: { label: "View the full portfolio", href: "#" },
  },
  {
    slug: "founder-two-portfolio",
    title: "Selected work by [Founder Two]",
    summary: "Systems, automation and engineering work made before ALRO, with role and context clearly attributed.",
    label: "Individual portfolio · [Founder Two]",
    kind: "portfolio",
    practice: "Intelligent Systems",
    year: "[Years]",
    image: "/img/keyboard.jpg",
    readingNote: "This work predates ALRO and was not commissioned from the studio.",
    sections: [
      { title: "Context", body: "[For each piece: what it was, and whether it was made independently, for an employer, or with another team.]" },
      { title: "Role", body: "[What this founder personally did on each piece.]" },
      { title: "The challenge", body: "[What each piece set out to achieve.]" },
      { title: "The approach", body: "[The key technical decisions, and why.]" },
      { title: "The work", body: "[Diagrams, screenshots or demos.]" },
      { title: "What it demonstrates", body: "[Specific, substantiated capabilities.]" },
      { title: "Limitations", body: "This work predates ALRO and was not commissioned from the studio." },
    ],
    externalLink: { label: "View the full portfolio", href: "#" },
  },
];

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}

export function nextWork(slug: string) {
  const i = work.findIndex((w) => w.slug === slug);
  return work[(i + 1) % work.length];
}
