import Link from "next/link";
import { email, routes } from "@/lib/routes";
import { Logo } from "./flow/logo";
import { FooterCta } from "./footer-cta";

/**
 * Final CTA + footer: the site's one black, full-width panel.
 * Copy from the skeleton, section 10.
 */
export function SiteFooter() {
  return (
    <footer id="contact" className="on-dark relative overflow-hidden" data-cursor-invert>
      <FooterCta />

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
        <p className="flex items-center gap-4">
          <Logo className="h-[20px] w-auto self-center text-paper" />
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
