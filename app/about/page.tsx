import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, SectionHead, Swap } from "@/components/flow/bits";
import { Logo } from "@/components/flow/logo";
import { PageHero, Underlined } from "@/components/flow/page-hero";
import { LineIcon, type LineIconName } from "@/components/websites/line-icon";
import { founderNote, founders } from "@/lib/content";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "About",
  description:
    "Small by design. Thoughtful by default. alro is two founders with complementary strengths: design and frontend development, and AI and systems. Meet the people behind the studio and how we work.",
};

const expertise = [
  {
    n: "01",
    t: "Web craft",
    role: "Design & Development",
    c: "How a business shows up: what it says, how it looks and how it feels to use. From the first page plan to the last line of frontend code.",
    chips: ["Positioning", "Messaging", "Art direction", "Typography", "Interface design", "Responsive design", "Frontend development", "Motion", "Accessibility", "Performance"],
    href: routes.websites,
    cta: "Explore websites",
  },
  {
    n: "02",
    t: "AI and systems",
    role: "AI & Systems",
    c: "How a team gets things done: connecting company knowledge, building assistants that cite their sources and automating the copying, chasing and updating.",
    chips: ["Company knowledge", "Retrieval and search", "AI assistants", "Automations", "Integrations", "Permissions", "Evaluation", "Documentation"],
    href: routes.companyBrain,
    cta: "Explore Company Brain",
  },
];

const approach: { t: string; c: string; icon: LineIconName }[] = [
  { t: "A written proposal first.", c: "Deliverables, timeline and price, on paper. Nothing starts until you’ve agreed to it.", icon: "doc" },
  { t: "You own the work.", c: "Design files, source code and documentation are handed over at the end. If something is built on a reusable core of ours, the proposal says exactly what’s yours.", icon: "key" },
  { t: "You talk to the people doing it.", c: "You work directly with the founders, from the first call to handover. No account manager relaying messages in between.", icon: "people" },
  { t: "Honest advice.", c: "If AI isn’t the right tool, we’ll say so. Same goes for a new website when the old one only needs a few fixes.", icon: "compass" },
];

const fit = [
  "Your business is better than its website currently suggests.",
  "There’s one specific frustration worth fixing. A process that takes far too many tabs. An answer that lives in someone’s inbox.",
  "You care how things look and whether they actually work.",
  "You’d rather start small, prove it works, then build.",
  "You want to work directly with whoever is doing the work.",
];

const notFit = [
  "You need a templated site live this week.",
  "You want “AI everything”, without a defined problem to solve.",
  "You need guaranteed savings or growth figures before anything is scoped.",
  "Your procurement requires an established vendor with a large team.",
];

const philosophy: { t: string; c: string; icon: LineIconName }[] = [
  { t: "Taste matters.", c: "Especially when everyone has access to the same tools.", icon: "eye" },
  { t: "It has to work.", c: "Beyond the demo and after the launch.", icon: "check" },
  { t: "Keep it useful.", c: "Complexity isn’t the same thing as value.", icon: "minus" },
];

const founderImages = ["/images/sumedh-kudav.jpg", "/images/jash-doshi.jpg"] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        top="Small by design."
        bottom={
          <>
            <Underlined>Thoughtful</Underlined> by default.
          </>
        }
        lead="alro is two founders with complementary strengths. One makes businesses show up better: design and frontend development. The other makes teams work better: AI and systems. You get both in the same conversation, and you work with us directly."
        actions={
          <>
            <Link href={routes.contact} className="btn liquid min-h-11" data-magnetic="0.3">
              <Swap>Start a conversation</Swap>
              <Arrow />
            </Link>
            <Link href="#founders" className="line-link relative after:absolute after:inset-x-0 after:-inset-y-3">
              Meet the founders
              <Arrow />
            </Link>
          </>
        }
        aside={<Overlap />}
      />

      {/* ═════════ FOUNDERS ═════════ */}
      <section id="founders" className="section scroll-mt-24">
        <div className="wrap">
          <SectionHead
            eyebrow="The founders"
            title={
              <>
                Two people. Two specialisms. <em>One studio.</em>
              </>
            }
            lead="No layers, no handoffs between departments. The people you meet on the first call are the people who do the work."
          />
          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-14 md:grid-cols-2 md:gap-12 md:[&>*:nth-child(even)]:mt-24">
            {founders.map((f, k) => (
              <article key={f.name} className="grid content-start gap-6">
                <div className="relative aspect-[4/3] max-h-[420px] w-full overflow-hidden rounded-[1.25rem]" data-clip>
                  <Image
                    src={founderImages[k]}
                    alt={k === 0 ? "Sumedh Kudav seated at a café" : "Jash Doshi seated outdoors"}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={`object-cover ${k === 0 ? "object-[center_30%]" : "object-[center_65%]"}`}
                    data-clip-img
                  />
                  <span className="tiny absolute bottom-5 left-5 !text-white/70">Portrait</span>
                  <span className="tiny absolute right-5 top-5">{String(k + 1).padStart(2, "0")}</span>
                </div>
                <div className="grid gap-3" data-reveal="fade">
                  <span className="eyebrow">{f.role}</span>
                  <h3 className="h3">{f.name}</h3>
                  <p className="body max-w-[32rem]">{f.bio}</p>
                  <Link
                    href={f.href}
                    className="line-link relative after:absolute after:inset-x-0 after:-inset-y-3 mt-3 w-fit"
                    target={f.href.startsWith("http") ? "_blank" : undefined}
                    rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    See {f.name}’s work
                    <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ FOUNDERS' NOTE ═════════ */}
      <section className="section bg-white/60">
        <div className="wrap grid gap-[clamp(2rem,4vw,3rem)]">
          <span className="eyebrow" data-reveal="fade">
            A note from the founders
          </span>
          <blockquote className="grid gap-8">
            <p className="font-serif text-[clamp(1.6rem,3.6vw,2.75rem)] italic leading-[1.35] text-ink/85 max-w-[34ch]" data-scrub-words>
              {founderNote}
            </p>
            <footer className="tiny" data-reveal="fade">
              Sumedh Kudav &amp; Jash Doshi
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ═════════ EXPERTISE ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            eyebrow="Expertise"
            title={
              <>
                What we’re good at. <em>Specifically.</em>
              </>
            }
            lead="Two disciplines that rarely sit at the same table. AI is one of the things we do well. It isn’t the only thing we talk about."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {expertise.map((e) => (
              <article key={e.n} className="panel glass flex flex-col gap-8" data-reveal="fade">
                <span className="ghost-num" data-drift aria-hidden="true">
                  {e.n}
                </span>
                <span className="tiny relative">{e.role}</span>
                <div className="relative grid gap-4">
                  <h3 className="h3">{e.t}</h3>
                  <p className="body max-w-[30rem]">{e.c}</p>
                </div>
                <div className="chips relative">
                  {e.chips.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
                <Link href={e.href} className="line-link relative after:absolute after:inset-x-0 after:-inset-y-3 mt-auto w-fit">
                  {e.cta}
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ WORKING APPROACH ═════════ */}
      <section className="section bg-mist/55">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            eyebrow="Working approach"
            title={
              <>
                What you can <em>hold us to.</em>
              </>
            }
            lead="Not a list of values for the wall. These are the things that happen on every project, whether it’s a website or a system."
          />
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {approach.map((a) => (
              <div key={a.t} className="grid content-start gap-4 bg-paper p-7">
                <span className="ico">
                  <LineIcon name={a.icon} />
                </span>
                <h3 className="text-[1.5rem] leading-tight">{a.t}</h3>
                <p className="body">{a.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ FIT ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            eyebrow="Fit"
            title={
              <>
                Better to know <em>now</em> than three meetings in.
              </>
            }
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="panel glass grid content-start gap-6" data-reveal="fade">
              <h3 className="font-serif text-[1.75rem]">A good fit</h3>
              <ul className="grid">
                {fit.map((t) => (
                  <li key={t} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-4 border-t border-ink/12 py-4">
                    <LineIcon name="check" className="mt-0.5 h-6 w-6 text-ink" />
                    <span className="body">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel grid content-start gap-6 border border-ink/12" data-reveal="fade">
              <h3 className="font-serif text-[1.75rem] text-ink/70">Probably not the right studio</h3>
              <ul className="grid">
                {notFit.map((t) => (
                  <li key={t} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-4 border-t border-ink/12 py-4">
                    <LineIcon name="minus" className="mt-0.5 h-6 w-6 text-ink/45" />
                    <span className="body">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="tiny">If that’s you, we’ll say so early, and point you somewhere better suited if we can.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ PHILOSOPHY (compact) ═════════ */}
      <section className="section bg-white/60">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            eyebrow="Philosophy"
            title={
              <>
                Good technology should make things simpler. <em>Not</em> give you another thing to manage.
              </>
            }
          />
          <div className="grid gap-10 border-t border-ink/12 pt-10 md:grid-cols-3" data-reveal-group>
            {philosophy.map((p) => (
              <div key={p.t} className="grid content-start gap-4">
                <span className="ico">
                  <LineIcon name={p.icon} />
                </span>
                <h3 className="text-[1.6rem]">{p.t}</h3>
                <p className="body">{p.c}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center pt-[clamp(1rem,3vw,2rem)]">
            <Link href={routes.contact} className="btn liquid min-h-11" data-magnetic="0.3">
              <Swap>Start a conversation</Swap>
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────── hero aside: two disciplines, one studio ───────── */

function Overlap() {
  return (
    <figure
      className="group relative mx-auto aspect-[56/36] w-full max-w-[560px]"
      role="img"
      aria-label="Diagram: design and development overlapping with AI and systems, with alro where they meet"
    >
      <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden="true">
        <defs>
          <clipPath id="venn-left">
            <circle cx="205" cy="180" r="155" />
          </clipPath>
        </defs>
        {/* shared ground */}
        <circle
          cx="355"
          cy="180"
          r="155"
          clipPath="url(#venn-left)"
          className="fill-ink/[0.06] transition-[fill] duration-700 ease-[var(--quint)] group-hover:fill-ink/[0.11]"
        />
        <circle cx="205" cy="180" r="155" className="stroke-ink/25 transition-[stroke] duration-700 group-hover:stroke-ink/45" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx="355" cy="180" r="155" className="stroke-ink/25 transition-[stroke] duration-700 group-hover:stroke-ink/45" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      <div aria-hidden="true">
        <div className="absolute left-[22.5%] top-1/2 grid -translate-x-1/2 -translate-y-1/2 justify-items-center gap-1.5 text-center">
          <span className="tiny !text-[9px]">01</span>
          <span className="font-serif text-[clamp(0.74rem,3.4vw,1.2rem)] leading-tight">
            Design &amp;
            <br />
            Development
          </span>
        </div>
        <div className="absolute left-[77.5%] top-1/2 grid -translate-x-1/2 -translate-y-1/2 justify-items-center gap-1.5 text-center">
          <span className="tiny !text-[9px]">02</span>
          <span className="font-serif text-[clamp(0.74rem,3.4vw,1.2rem)] leading-tight">
            AI &amp;
            <br />
            Systems
          </span>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-ink">
          <Logo className="h-auto w-[clamp(52px,12vw,76px)] transition-transform duration-700 ease-[var(--quint)] group-hover:scale-[1.06]" />
        </div>
      </div>
    </figure>
  );
}
