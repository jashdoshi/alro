/**
 * Shared copy. Rewritten from the original site for the new layout:
 * same intent and claims, shorter wording. Bracketed text is a placeholder
 * the founders still need to fill in — keep it bracketed until then.
 */

export const site = {
  name: "ALRO",
  email: "hello@alro.studio",
  tagline: "Digital experiences with feeling. Intelligent systems with purpose.",
  descriptor: "Digital Craft & Intelligence",
};

export const nav = {
  left: [
    { href: "/work", label: "Work" },
    { href: "/digital-experiences", label: "Digital Experiences" },
    { href: "/intelligent-systems", label: "Intelligent Systems" },
  ],
  right: [
    { href: "/company-intelligence", label: "Company Intelligence" },
    { href: "/studio", label: "Studio" },
  ],
};

export const footerMenu = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/digital-experiences", label: "Digital Experiences" },
  { href: "/intelligent-systems", label: "Intelligent Systems" },
  { href: "/company-intelligence", label: "Company Intelligence" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

/** Five-step working method, shared by both practices. */
export const process = [
  {
    title: "Understand",
    body: "We learn the business, the audience, the tools you already use, the constraints, and the outcome you actually need.",
  },
  {
    title: "Define",
    body: "Scope, creative direction or workflow design, deliverables, timeline and success criteria — agreed in writing.",
  },
  {
    title: "Craft",
    body: "We design and build, sharing progress as we go and testing the decisions that matter before they set.",
  },
  {
    title: "Validate",
    body: "We test the finished work against the requirements we agreed — not against how it looks in a demo.",
  },
  {
    title: "Evolve",
    body: "Where it helps, we stay on for maintenance, monitoring and improvements. Where it doesn’t, we hand over cleanly.",
  },
];

export const tracks = {
  digital: {
    label: "Digital Experiences",
    title: "A scoped project, then a handover",
    steps: [
      { title: "Written proposal", body: "Deliverables, revision rounds, timeline and price — agreed before anything starts." },
      { title: "Design and build", body: "Discovery, messaging, art direction, responsive design and development." },
      { title: "Launch and handover", body: "Analytics set up, code and files handed over, decisions documented." },
      { title: "Optional: ongoing care", body: "Maintenance, analytics or optimisation, under a separate agreement." },
    ],
  },
  systems: {
    label: "Intelligent Systems",
    title: "Start small, prove it, then build",
    steps: [
      { title: "Discovery", body: "We map one workflow: the tools, the data, and where it should run." },
      { title: "Proof of concept or paid pilot", body: "A scoped version on your sources, judged against criteria agreed up front." },
      { title: "Implementation", body: "Integration, testing, documentation and onboarding for your team." },
      { title: "Optional: support", body: "Monitoring and improvement, with what’s covered — including external failures — written down." },
    ],
  },
};

export const deployment = {
  options: [
    { title: "Managed cloud", body: "Runs in an environment operated by ALRO or its hosting provider, with every data flow documented for you." },
    { title: "Your cloud account", body: "Deployed inside cloud infrastructure your company already owns and controls." },
    { title: "Your own hardware", body: "Runs on infrastructure you operate, once the architecture and operating requirements are agreed." },
  ],
  answered: [
    "Where documents, embeddings, logs and backups are stored",
    "Which model providers or services receive data — and exactly what",
    "How permissions from your source systems are enforced",
    "What is retained, for how long, and how it’s deleted",
    "How credentials and secrets are protected",
    "What happens when a connector or a model fails",
    "Which actions need a person’s approval first",
  ],
  honesty:
    "We won’t claim your data never leaves your network, or that no one can see it, unless the agreed architecture genuinely supports it.",
};

export const ciJobs = [
  {
    title: "Find what the company already knows",
    body: "Ask what was agreed with a client, find a project decision, or pull the latest document — with a pointer to where it came from.",
    example: "What did we agree with the supplier about the autumn reorder?",
  },
  {
    title: "Surface what needs attention",
    body: "Pull actions, owners and deadlines from connected sources, and flag anything incomplete or overdue for a person to review.",
    example: "Three actions from Tuesday’s review have no owner.",
  },
  {
    title: "Move work forward",
    body: "Draft a follow-up, create a task or trigger a connected workflow — only once a person has approved it.",
    example: "Draft the follow-up to the supplier for me to check.",
  },
];

export const ciStatus = [
  {
    title: "Working in our prototype",
    note: "Built and running, tested with [sample / internal] data.",
    items: [
      "Live connectors to selected tools [list the connectors that work today]",
      "Extraction of decisions, actions, owners and dates",
      "Chat over the information it has connected",
      "Automatic triggers, notifications and events",
    ],
    cta: "See the walkthrough",
    href: "/company-intelligence#walkthrough",
  },
  {
    title: "Through a scoped pilot",
    note: "Configured with you, for one defined workflow, under an agreed scope.",
    items: [
      "Your own sources, with the permissions they already have",
      "A deployment model agreed during discovery",
      "A person approves every action that leaves the company",
      "Evaluation against criteria agreed before the build",
    ],
    cta: "Explore a pilot",
    href: "/contact",
    hot: true,
  },
  {
    title: "Future direction",
    note: "Where we intend to go. Not available, and not part of any current offer.",
    items: ["Agents dedicated to individual departments", "Shared memory across agents", "Agents that coordinate work between teams"],
    cta: "Talk about the roadmap",
    href: "/contact",
  },
];

export type Faq = { q: string; a: string };

export const faqGeneral: Faq[] = [
  {
    q: "Can you guarantee AI will save us time or money?",
    a: "No blanket guarantee. We define the workflow and the outcome first, then validate against criteria we agree together. Any savings claim should come from real usage, not a forecast.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on scope, complexity, integrations and delivery requirements. After a first conversation you get a written proposal with deliverables, timeline and price. AI work usually starts with a smaller, scoped pilot.",
  },
  {
    q: "Who owns the work? Do we get the source code?",
    a: "You do. Design files, source code and documentation are handed over at the end. If a system is built on a reusable core of ours, the proposal states exactly what’s yours, what’s licensed, and on what terms.",
  },
  {
    q: "What third-party costs should we expect?",
    a: "Hosting, domains, fonts, subscriptions and AI model or API usage are listed separately, with estimates where possible. Where we can, accounts are opened in your name so you pay providers directly.",
  },
  {
    q: "Where will it be hosted?",
    a: "Websites usually live on a managed platform in your name. For AI systems, where data and models run is agreed in discovery and written down before anything is connected.",
  },
  {
    q: "What happens after launch?",
    a: "Every project ends with a documented handover. Ongoing care is optional and agreed separately, with a clear description of what it covers — including when an external service changes or fails.",
  },
  {
    q: "Can you work with our existing tools?",
    a: "Where practical, yes. Integrations, permissions and constraints are assessed before work begins, and we only commit to integrations we’ve tested.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes, when scope and budget fit. Early-stage teams that need a considered digital presence or a well-defined operational fix are a good match.",
  },
];

export const faqCI: Faq[] = [
  {
    q: "Is it a product or a custom build?",
    a: "Both, deliberately. The core is reusable; each deployment is configured for your tools, sources, permissions and branding. The proposal sets out what’s configured, what’s built for you, and what’s licensed.",
  },
  {
    q: "Which tools can it connect to?",
    a: "[List the connectors that are working and tested.] Others are assessed during discovery. We only commit to connectors we’ve built and tested.",
  },
  {
    q: "Will it act on its own?",
    a: "It can raise notifications and trigger internal events automatically. Anything that leaves your company — an email, a booking, a change in another system — waits for a person to approve it.",
  },
  {
    q: "Where does our data go?",
    a: "That’s agreed in discovery and written down before anything is connected: where it’s stored, which providers receive it, how long it’s kept and how it’s deleted.",
  },
  {
    q: "Can we try it?",
    a: "We can walk you through the prototype on a call using sample data. A pilot then runs on your own sources, under an agreed scope.",
  },
  {
    q: "Has it been deployed for a client?",
    a: "Not yet. It’s a working prototype, and we’re looking for the first teams to pilot it with. We’d rather say that than imply otherwise.",
  },
];

export const founders = [
  {
    name: "[Founder One]",
    role: "Design & Development",
    bio: "[A short, factual description of this founder’s strengths in visual design, interface design and frontend development.]",
    href: "/work/founder-one-portfolio",
    image: "/img/sketch.jpg",
  },
  {
    name: "[Founder Two]",
    role: "AI & Systems",
    bio: "[A short, factual description of this founder’s strengths in AI systems, integrations and automation.]",
    href: "/work/founder-two-portfolio",
    image: "/img/keyboard.jpg",
  },
];

export const founderNote =
  "[A short personal note in your own words: why you started ALRO, and what a client can expect from working with the two of you.]";
