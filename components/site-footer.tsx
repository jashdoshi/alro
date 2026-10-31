import Link from "next/link";
import { email, routes } from "@/lib/routes";
import { Arrow, Swap } from "./flow/bits";

/**
 * Final CTA + footer: the site's one black, full-width panel.
 * Copy from the skeleton, section 10.
 */
export function SiteFooter() {
  return (
    <footer id="contact" className="on-dark relative overflow-hidden" data-cursor-invert>
      <div className="wrap pt-[clamp(5rem,12vw,9rem)]">
        <span className="eyebrow wide" data-reveal="fade">
          Have something in mind?
        </span>
        <h2 className="mt-6 max-w-[14ch] font-serif text-[clamp(2.6rem,7.5vw,7rem)] leading-[1.02] tracking-[-0.02em] text-paper" data-reveal="lines">
          Something you want to make <em>better?</em>
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div className="grid max-w-[34rem] gap-4" data-reveal-group>
            <p className="lead">A website that undersells your business. A process that takes far too many tabs. Or something entirely different.</p>
            <p className="font-serif text-[1.5rem] italic text-paper">Tell us what you’re working on.</p>
          </div>
          <div className="grid gap-6 md:justify-items-end" data-reveal-group>
            <div className="flex flex-wrap gap-2 md:justify-end" aria-label="What is it about?">
              {[
                ["Websites", "websites"],
                ["Company Brain", "company-brain"],
                ["I’m not sure yet", "not-sure"],
              ].map(([label, topic]) => (
                <Link key={topic} href={`${routes.contact}?topic=${topic}`} className="ghost-btn">
                  {label}
                </Link>
              ))}
            </div>
            <div>
              <Link href={routes.contact} className="btn mist-btn" data-magnetic="0.3">
                <Swap>Start a conversation</Swap>
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee mt-[clamp(4rem,9vw,7rem)]" data-marquee aria-hidden="true">
        <div className="mtrack" data-marquee-track data-marquee-speed="60">
          <div className="mgroup">
            <span>Make a good impression</span>
            <span className="dot">✦</span>
            <span>Then make good on it</span>
            <span className="dot">✦</span>
          </div>
        </div>
      </div>

      <div className="wrap flex flex-col gap-6 py-10 text-[12px] uppercase tracking-[0.15em] text-mist/55 md:flex-row md:items-center md:justify-between">
        <p className="flex items-baseline gap-4">
          <span className="text-[1.15rem] font-bold normal-case tracking-[-0.03em] text-paper">alro.</span>
          <span>design. engineering. intelligence.</span>
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <a href={`mailto:${email}`} className="hover:text-paper">
            {email}
          </a>
          <Link href={routes.privacy} className="hover:text-paper">
            Privacy
          </Link>
          <span>© 2026 alro.</span>
        </div>
      </div>
    </footer>
  );
}
