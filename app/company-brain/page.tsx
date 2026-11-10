import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, type FaqItem } from "@/components/brain/faq-list";
import { Arrow, SectionHead, Swap } from "@/components/flow/bits";
import { PageHero } from "@/components/flow/page-hero";
import { BrainDemo } from "@/components/home/brain-demo";
import { Journey } from "@/components/home/journey";
import { ciJobs, ciStatus, deployment, faqCI, tracks } from "@/lib/content";
import { email, routes } from "@/lib/routes";

/*
 * /company-brain: problems, demo, use cases, integrations, security, pilot enquiry.
 * Copy: alro website skeleton (Company Brain, sections 03 + 05) and the honest
 * prototype/pilot material in lib/content.ts. Bracketed text is a placeholder
 * the founders still need to fill in. Keep it bracketed until then.
 * The closing CTA band lives in the layout footer.
 */

export const metadata: Metadata = {
  title: "Company Brain",
  description:
    "The answer is probably in there somewhere. Company Brain brings approved information from your existing tools into one useful place. A working prototype, offered as a scoped pilot.",
};

const pilotHref = `${routes.contact}?topic=company-brain`;

/** Enlarges a small text link's hit area to 44px without changing how it looks. */
const hit = "relative after:absolute after:-inset-x-1 after:-inset-y-3";

const frustrations = [
  { t: "The decision is in last Tuesday’s call notes.", c: "Somebody wrote it down. Nobody can remember where, so the conversation happens again." },
  { t: "The same update gets retyped into three tools every week.", c: "The CRM, the project tracker and the Friday email all want it, each in a slightly different shape." },
  { t: "Onboarding means asking around.", c: "New people learn how things work by interrupting the people who already know." },
  { t: "The latest version is the one called ‘final-v3’.", c: "Probably. Unless someone saved over it, or sent a newer one by email." },
];

const pillars = [
  { t: "Connected knowledge", c: "The information your team needs, without the scavenger hunt.", icon: "nodes" },
  { t: "Context-aware assistance", c: "Answers grounded in your business, not just plausible-sounding guesses.", icon: "chat" },
  { t: "Workflow automation", c: "Less copying, chasing and updating. More time for the work that matters.", icon: "loop" },
] as const;

const readingNotes = [
  { t: "Answers show their sources.", c: "Each answer points back to where it came from, so a person can check it rather than take it on trust." },
  { t: "It works from approved sources.", c: "Only the information you choose to connect, with the permissions it already has in the tools it lives in." },
  { t: "People approve what leaves.", c: "Drafts, emails and changes in other systems wait for a person to review them before anything is sent." },
];

const jobLabel = ["Find", "Surface", "Move"] as const;

const useCases = [
  {
    t: "Client account status",
    c: "Where things stand with a client, pulled from the CRM, the project tracker and the last few emails. Not three open tabs and a guess.",
    q: "Where are we with the Harbour account?",
    src: ["CRM", "Project tracker", "Email"],
    job: 0,
  },
  {
    t: "Meeting follow-ups",
    c: "Decisions, actions and owners taken from meeting notes, with anything that has no owner flagged for a person to sort out.",
    q: "What came out of Tuesday’s review?",
    src: ["Call notes", "Project tracker"],
    job: 1,
  },
  {
    t: "Policy and document lookup",
    c: "The current version of the policy, the contract clause or the process doc, with a pointer to where it actually lives.",
    q: "What’s our notice period for contractors?",
    src: ["Drive", "Handbook"],
    job: 0,
  },
  {
    t: "Weekly briefings",
    c: "A Monday summary of what moved, what’s stuck and what’s due, prepared for someone to check before it goes round the team.",
    q: "What needs attention this week?",
    src: ["Project tracker", "CRM", "Chat"],
    job: 1,
  },
  {
    t: "Drafting from approved context",
    c: "First drafts of follow-ups, proposal sections and replies, written from approved company context and reviewed before anything is sent.",
    q: "Draft a reply to the supplier for me to check.",
    src: ["Email", "Account notes"],
    job: 2,
  },
];

const toolCategories = ["Documents", "Chat", "Email", "CRM", "Project tracker"];

const integrationSteps = [
  "Map the tools your team already uses, and what lives in each.",
  "Assess the integration options, permissions and limitations of each one.",
  "Commit only to connectors we’ve built and tested.",
];

const statusLinks = [
  { cta: "See the demo", href: "#demo" },
  { cta: "Explore a pilot", href: pilotHref },
  { cta: "Talk about the roadmap", href: pilotHref },
];

const deployIcons = ["cloud", "building", "server"] as const;

const faqs: FaqItem[] = [
  {
    q: "Is Company Brain another chatbot?",
    a: "It can include a conversational assistant, but the real value comes from connecting the right company knowledge and workflows. The scope depends on what your team actually needs.",
  },
  ...faqCI,
  {
    q: "Can you guarantee it will save us time or money?",
    a: "No blanket guarantee. We define the workflow and the outcome first, then judge the pilot against criteria we agree together. Any savings claim should come from real usage, not a forecast.",
  },
  {
    q: "How much does a pilot cost?",
    a: "It depends on the workflow, the sources involved and where it needs to run. After a first conversation you get a written proposal with scope, timeline and price, before anything starts.",
  },
];

export default function CompanyBrainPage() {
  return (
    <>
      {/* ═════════ HERO ═════════ */}
      <PageHero
        eyebrow="Company Brain"
        top="The answer is probably"
        bottom={<em>in there somewhere.</em>}
        lead="In a document. A spreadsheet. A conversation from last Tuesday. We connect your company knowledge and build intelligent workflows so your team can spend less time looking for things and more time getting things done."
        actions={
          <>
            <Link href={pilotHref} className="btn liquid" data-magnetic="0.3">
              <Swap>Explore a pilot</Swap>
              <Arrow />
            </Link>
            <Link href="#demo" className={`line-link ${hit}`}>
              See it work
              <Arrow />
            </Link>
          </>
        }
        aside={<HeroAssistant />}
      />

      {/* ═════════ THE PROBLEM ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              eyebrow="The problem"
              title={
                <>
                  None of it is <em>dramatic.</em> It just adds up.
                </>
              }
              lead="Most of what your team needs to know has already been written down somewhere. The trouble is the somewhere."
            />
          </div>
          <ol className="border-t border-ink/12" data-reveal-group>
            {frustrations.map((f, k) => (
              <li key={f.t} className="grid gap-3 border-b border-ink/12 py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-6 md:py-10">
                <span className="tiny pt-2">{String(k + 1).padStart(2, "0")}</span>
                <div className="grid gap-3">
                  <h3 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] leading-tight">{f.t}</h3>
                  <p className="body max-w-[34rem]">{f.c}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═════════ DEMO ═════════ */}
      <section id="demo" className="section scroll-mt-24 overflow-hidden bg-mist/55">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            eyebrow="Company Brain · See it work"
            title={
              <>
                Your business knows a lot. <em>Finding it</em> shouldn’t be a full-time job.
              </>
            }
            lead="Company Brain brings approved information from your existing tools into one useful place. Ask questions, find context and move work forward without digging through half your company’s digital history."
          />
          <div data-reveal="fade">
            <BrainDemo />
          </div>

          <div className="grid gap-8 border-t border-ink/12 pt-10 md:grid-cols-3 md:gap-10" data-reveal-group>
            {readingNotes.map((n, k) => (
              <div key={n.t} className="grid content-start gap-3">
                <span className="tiny">How to read it — {String(k + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.35rem] leading-snug">{n.t}</h3>
                <p className="body">{n.c}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/12 bg-ink/12 md:grid-cols-3" data-reveal-group>
            {pillars.map((p) => (
              <div key={p.t} className="grid content-start gap-4 bg-paper p-7">
                <span className="ico">
                  <Icon name={p.icon} />
                </span>
                <h3 className="text-[1.5rem]">{p.t}</h3>
                <p className="body">{p.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ USE CASES ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHead
              eyebrow="Use cases"
              title={
                <>
                  Three jobs. <em>Plenty of</em> everyday versions.
                </>
              }
              lead="Finding what the company already knows, surfacing what needs attention and moving work forward. Here’s how those jobs tend to show up in a working week."
            />
            <p className="tiny max-w-[22rem] md:text-right" data-reveal="fade">
              Illustrative examples with sample data — not client results.
            </p>
          </div>

          {/* the three jobs */}
          <div className="grid gap-10 border-t border-ink/12 pt-10 md:grid-cols-3" data-reveal-group>
            {ciJobs.map((j, k) => (
              <div key={j.title} className="grid content-start gap-4">
                <span className="tiny">
                  {String(k + 1).padStart(2, "0")} — {jobLabel[k]}
                </span>
                <h3 className="text-[1.6rem] leading-tight">{j.title}</h3>
                <p className="body">{j.body}</p>
                <p className="font-serif text-[1.15rem] italic leading-snug text-copy/80">“{j.example}”</p>
              </div>
            ))}
          </div>

          {/* illustrative cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, k) => (
              <article key={u.t} className="panel glass flex flex-col gap-6" data-reveal="fade">
                <span className="ghost-num" data-drift aria-hidden="true">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <span className="tiny relative">Illustrative · {jobLabel[u.job]}</span>
                <h3 className="relative text-[clamp(1.6rem,2.4vw,1.9rem)] leading-tight">{u.t}</h3>
                <p className="body relative">{u.c}</p>
                <div className="relative mt-auto grid gap-3 rounded-2xl border border-ink/10 bg-white/80 p-4">
                  <p className="ml-auto w-fit max-w-full rounded-2xl rounded-br-sm bg-ink/[0.06] px-3.5 py-2.5 text-[14px] leading-snug">{u.q}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tiny mr-1">Sources</span>
                    {u.src.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            <article className="flex flex-col justify-between gap-8 rounded-[1.5rem] border border-dashed border-ink/20 p-[clamp(1.75rem,4vw,3.5rem)]" data-reveal="fade">
              <div className="grid gap-4">
                <span className="tiny">Yours</span>
                <h3 className="text-[clamp(1.6rem,2.4vw,1.9rem)] leading-tight">
                  Something more <em>specific?</em>
                </h3>
                <p className="body">These are illustrations, not a menu. A pilot starts with one workflow that matters to your team, whatever it happens to be.</p>
              </div>
              <Link href={pilotHref} className={`line-link w-fit ${hit}`}>
                Tell us about yours
                <Arrow />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ═════════ HOW IT CONNECTS ═════════ */}
      <section className="section bg-white/60">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            eyebrow="How it connects"
            title={
              <>
                It works with the tools you have. <em>Not instead of them.</em>
              </>
            }
            lead="Company Brain sits between the tools your team already uses. Here’s one way that can look, from a new enquiry to the follow-up."
          />
          <div data-reveal="fade">
            <Journey />
          </div>
          <p className="tiny" data-reveal="fade">
            Illustrative workflow. Depends on each client’s tools, permissions and processes.
          </p>

          {/* integrations */}
          <div className="grid gap-10 border-t border-ink/12 pt-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="grid content-start gap-5" data-reveal="fade">
              <span className="eyebrow">Integrations</span>
              <h3 className="h3 max-w-[18ch]">
                We start with <em>what you already use.</em>
              </h3>
              <p className="lead">
                Most teams already have a home for documents, somewhere to chat, an inbox, a CRM and something that tracks the work. We start there, not with a
                new tool for everyone to learn.
              </p>
              <p className="body max-w-[36rem]">
                Every tool allows different things. Before we commit to an approach, we look at the integration options each one offers, the permissions it already
                has and where its limits are. Then we tell you plainly what we can connect properly, and what we can’t.
              </p>
            </div>

            <div className="panel glass grid content-start gap-8" data-reveal="fade">
              <div className="grid gap-4">
                <span className="tiny">Tool categories we typically assess</span>
                <div className="chips">
                  {toolCategories.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
                <p className="text-[12px] leading-relaxed text-copy/55">Categories, not a list of supported products.</p>
              </div>
              <ol className="grid gap-5 border-t border-ink/12 pt-6">
                {integrationSteps.map((s, k) => (
                  <li key={s} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3">
                    <span className="tiny">{String(k + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-[clamp(1.15rem,1.8vw,1.35rem)] leading-snug">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="body border-t border-ink/12 pt-6">
                <span className="tiny mb-2 block">Working in the prototype today</span>
                [list the connectors that work today]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ WHAT EXISTS TODAY ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            eyebrow="What exists today"
            title={
              <>
                What exists today. <em>And what doesn’t yet.</em>
              </>
            }
            lead="Finding, extracting and acting are different capabilities. We keep them apart, and say which is which."
          />
          <div className="grid gap-6 lg:grid-cols-3" data-reveal-group>
            {ciStatus.map((s, k) => (
              <div
                key={s.title}
                className={`flex flex-col gap-6 rounded-[1.5rem] border p-7 md:p-9 ${s.hot ? "border-ink bg-white shadow-[0_20px_60px_-15px_rgb(var(--shadow-rgb)/0.15)]" : "border-ink/12 bg-paper"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="tiny">{String(k + 1).padStart(2, "0")}</span>
                  {s.hot && <span className="chip !border-ink !text-copy">Where we start</span>}
                </div>
                <div className="grid gap-3">
                  <h3 className="text-[clamp(1.6rem,2.4vw,1.9rem)] leading-tight">{s.title}</h3>
                  <p className="body">{s.note}</p>
                </div>
                <ul className="grid gap-3 border-t border-ink/12 pt-6">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[15px] leading-snug text-copy/80">
                      <span className="mt-0.5 h-4 w-4 flex-none text-copy/60">
                        <Icon name={k === 2 ? "dash" : "tick"} className="h-4 w-4" />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href={statusLinks[k].href} className={`line-link mt-auto w-fit ${hit}`}>
                  {statusLinks[k].cta}
                  <Arrow />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ SECURITY & DEPLOYMENT ═════════ */}
      <section className="section overflow-hidden bg-mist/55">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            eyebrow="Security & deployment"
            title={
              <>
                Built around <em>your environment.</em>
              </>
            }
            lead="Where it runs and how your data is handled are agreed in discovery. We’ve built and deployed SaaS and on-premises software before, but for Company Brain no option below counts as proven until it’s validated with you."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {deployment.options.map((o, k) => (
              <article key={o.title} className="panel glass flex flex-col gap-6" data-reveal="fade">
                <span className="ghost-num" data-drift aria-hidden="true">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <span className="ico relative">
                  <Icon name={deployIcons[k]} />
                </span>
                <div className="relative grid gap-3">
                  <h3 className="text-[clamp(1.6rem,2.4vw,1.9rem)] leading-tight">{o.title}</h3>
                  <p className="body">{o.body}</p>
                </div>
                <span className="chip relative mt-auto w-fit">Validated during a pilot</span>
              </article>
            ))}
          </div>

          <div className="grid gap-10 rounded-[1.5rem] border border-ink/12 bg-paper p-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16" data-reveal="fade">
            <div className="grid content-start gap-5">
              <span className="eyebrow">Before anything is connected</span>
              <h3 className="h3 max-w-[16ch]">
                Answered <em>in writing.</em>
              </h3>
              <p className="body max-w-[30rem]">Each of these is agreed and written down during discovery, before a single source is connected.</p>
              <p className="quote mt-4">{deployment.honesty}</p>
            </div>
            <ul className="border-t border-ink/12">
              {deployment.answered.map((a) => (
                <li key={a} className="flex gap-4 border-b border-ink/12 py-4 text-[15px] leading-snug text-copy/80">
                  <span className="mt-0.5 h-4 w-4 flex-none text-copy">
                    <Icon name="tick" className="h-4 w-4" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═════════ HOW A PILOT WORKS ═════════ */}
      <section id="pilot" className="section scroll-mt-24">
        <div className="wrap grid gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="grid content-start gap-10 lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              eyebrow="How a pilot works"
              title={
                <>
                  Start small. Prove it. <em>Then build.</em>
                </>
              }
              lead="One workflow, not a company-wide transformation. Each stage is scoped and priced on its own, and you can stop after any of them."
            />
            <div className="glass grid gap-3 rounded-[1.5rem] p-6 md:p-8" data-reveal="fade">
              <span className="tiny">A first pilot includes</span>
              <p className="font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug">
                [One workflow, up to [n] connected sources, [n] weeks, a fixed price, and the criteria it will be judged against.]
              </p>
            </div>
          </div>
          <ol className="relative" data-steps>
            <span className="absolute bottom-16 left-[1.625rem] top-2 w-px bg-ink/12" aria-hidden="true">
              <span className="block h-full w-full origin-top bg-ink" data-steps-fill />
            </span>
            {tracks.systems.steps.map((p, k) => (
              <li key={p.title} className={`step ${k === 0 ? "is-active" : ""}`} data-step>
                <span className="dot">{String(k + 1).padStart(2, "0")}</span>
                <div className="grid gap-3 pt-2.5">
                  <h3 className="title text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{p.title}</h3>
                  <p className="copy body max-w-[32rem]">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═════════ FAQ ═════════ */}
      <section className="section bg-white/60">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              eyebrow="FAQ"
              title={
                <>
                  What teams <em>ask first.</em>
                </>
              }
              lead="Straight answers, including the ones that start with “not yet”."
            />
          </div>
          <div data-reveal="fade">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      {/* ═════════ PILOT ENQUIRY ═════════ */}
      <section className="section">
        <div className="wrap">
          <div className="panel glass grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end" data-reveal="fade">
            <span className="ghost-num" data-drift aria-hidden="true">
              a.
            </span>
            <div className="relative grid gap-5">
              <span className="eyebrow">Pilot enquiry</span>
              <h2 className="h2 max-w-[20ch]">
                One workflow worth <em>fixing first?</em>
              </h2>
              <p className="lead">
                Tell us which one. We’ll look at the tools involved, what a pilot could cover and whether it’s worth doing at all. If it isn’t, we’ll say so.
              </p>
            </div>
            <div className="relative flex flex-col items-start gap-6 lg:items-end">
              <Link href={pilotHref} className="btn liquid" data-magnetic="0.3">
                <Swap>Explore a pilot</Swap>
                <Arrow />
              </Link>
              <a href={`mailto:${email}`} className={`line-link ${hit}`}>
                {email}
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────── hero aside: a compact, sourced-answer window. Illustrative only. ───────── */
function HeroAssistant() {
  return (
    <figure className="relative mx-auto w-full max-w-[560px]" aria-label="Illustration: a Company Brain assistant answering a question with its sources">
      <div className="window">
        <div className="window-bar">
          <i />
          <i />
          <i />
          <span className="ml-3 flex min-w-0 flex-1 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-copy/55">
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-ink" />
            <span className="truncate">Company Brain</span>
          </span>
          <span className="hidden rounded-full border border-ink/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-copy/50 sm:inline">Sample data</span>
        </div>
        <div className="grid gap-5 p-5 sm:p-6">
          <p className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-ink/[0.06] px-4 py-3 text-[14px] leading-snug">
            What did we agree with the supplier about the autumn reorder?
          </p>
          <div className="flex gap-3">
            <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-ink text-[10px] font-bold text-paper" aria-hidden="true">
              a.
            </span>
            <div className="grid min-w-0 gap-3">
              <p className="font-serif text-[clamp(1.05rem,1.8vw,1.3rem)] leading-snug">
                Reorder confirmed for early September at last season’s prices. Final quantities are still to be sent.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="tiny mr-1">Sources</span>
                <span className="chip">Email thread</span>
                <span className="chip">Call notes · Tue</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/10 bg-ink/[0.02] px-4 py-3">
            <span className="flex items-center gap-2.5 text-[13px] text-copy/75">
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-ink/40" />
              Sending final quantities has no owner yet
            </span>
            <span className="rounded-full border border-ink/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-copy/70">Needs a person</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-[12px] text-copy/50">Illustrative interface with sample data.</figcaption>
    </figure>
  );
}

/* ───────── icons (line, 1.5px), same drawing style as the home page ───────── */
function Icon({ name, className }: { name: "nodes" | "chat" | "loop" | "cloud" | "building" | "server" | "tick" | "dash"; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      {name === "nodes" && (
        <g {...p}>
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M7 6h10M6 8l5 8M18 8l-5 8" />
        </g>
      )}
      {name === "chat" && (
        <g {...p}>
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M9 11l2 2 4-4" />
        </g>
      )}
      {name === "loop" && (
        <g {...p}>
          <path d="M4 12a8 8 0 0 1 14-5.3L20 9" />
          <path d="M20 4v5h-5" />
          <path d="M20 12a8 8 0 0 1-14 5.3L4 15" />
          <path d="M4 20v-5h5" />
        </g>
      )}
      {name === "cloud" && (
        <g {...p}>
          <path d="M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5z" />
        </g>
      )}
      {name === "building" && (
        <g {...p}>
          <path d="M5 21V5l7-2v18M12 8l7 2v11" />
          <path d="M3 21h18M8 8v.01M8 12v.01M8 16v.01M15.5 13v.01M15.5 17v.01" />
        </g>
      )}
      {name === "server" && (
        <g {...p}>
          <rect x="4" y="4" width="16" height="7" rx="2" />
          <rect x="4" y="13" width="16" height="7" rx="2" />
          <path d="M8 7.5h.01M8 16.5h.01M12 7.5h4M12 16.5h4" />
        </g>
      )}
      {name === "tick" && (
        <g {...p}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </g>
      )}
      {name === "dash" && (
        <g {...p}>
          <path d="M6 12h12" />
        </g>
      )}
    </svg>
  );
}
