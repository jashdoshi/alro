import Link from "next/link";
import { Arrow } from "@/components/flow/bits";

export type Offer = { title: string; line: string };

/**
 * Editorial index list (the teardown's "work index" rows): big serif titles on
 * hairlines. On hover or keyboard focus an ink fill wipes up from the bottom,
 * the title slides 14px and the arrow nudges. CSS only, so reduced motion is
 * handled by the global transition override, and touch never sticks on hover.
 */
export function OfferIndex({ offers, href }: { offers: Offer[]; href: string }) {
  return (
    <ul className="border-t border-ink/12" data-reveal-group>
      {offers.map((o, k) => (
        <li key={o.title} className="border-b border-ink/12">
          <Link href={href} className="group relative block overflow-hidden no-underline outline-offset-[-2px]" data-cursor-invert>
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-[600ms] ease-[var(--flow-ease)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
            />
            <span className="relative grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-1 py-6 sm:px-3 md:grid-cols-[3.5rem_minmax(0,1.15fr)_minmax(0,1fr)_auto] md:gap-x-8 md:px-6 md:py-8">
              <span className="tiny transition-colors duration-500 group-hover:text-mist/60 group-focus-visible:text-mist/60">{String(k + 1).padStart(2, "0")}</span>
              <span className="font-serif text-[clamp(1.6rem,3.6vw,2.75rem)] leading-[1.15] text-ink transition-[color,transform] duration-[600ms] ease-[var(--flow-ease)] group-hover:translate-x-[14px] group-hover:text-paper group-focus-visible:translate-x-[14px] group-focus-visible:text-paper">
                {o.title}
              </span>
              <span className="body col-span-2 col-start-2 row-start-2 max-w-[32rem] transition-colors duration-500 group-hover:text-mist/70 group-focus-visible:text-mist/70 md:col-span-1 md:col-start-3 md:row-start-1">
                {o.line}
              </span>
              <span className="col-start-3 row-start-1 grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-500 group-hover:border-mist/30 group-hover:text-paper group-focus-visible:border-mist/30 group-focus-visible:text-paper md:col-start-4">
                <Arrow className="h-4 w-4 transition-transform duration-500 ease-[var(--flow-ease)] group-hover:-translate-y-[3px] group-hover:translate-x-[3px]" />
              </span>
            </span>
            <span className="sr-only">: start a project enquiry</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
