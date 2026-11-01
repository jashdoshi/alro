"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import { Arrow, Swap } from "./flow/bits";

/** The final CTA (skeleton §10). Hidden on /contact, where the page itself is the CTA. */
export function FooterCta() {
  const pathname = usePathname();
  if (pathname === routes.contact) return <div className="pt-[clamp(3rem,6vw,4rem)]" />;
  return (
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
  );
}
