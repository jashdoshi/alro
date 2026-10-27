import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { Mail } from "@/components/icons";
import { Block, ContactSection } from "@/components/sections";
import { Chip } from "@/components/ui-legacy";
import { faqGeneral, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you’re looking to build. Every message is read by the founders, and every reply is personal.",
};

export default function ContactPage() {
  return (
    <>
      {/* Clears the fixed 64px header so the hero chip never sits under it. */}
      <div className="h-16 md:h-10" aria-hidden="true" />
      <ContactSection chip="Start a conversation" title="Have something worth building?" />

      <Block id="questions" className="border-t border-line">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="flex flex-col items-start gap-5 md:sticky md:top-28 md:self-start" data-reveal>
            <Chip>Questions</Chip>
            <h2 className="h2 max-w-[10ch]">Before you write.</h2>
            <p className="body max-w-[36ch]">Straight answers to what people usually ask first. Anything else, just ask.</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-flex items-center gap-2.5 text-[1.05rem] font-medium tracking-[-0.02em] text-fg transition-colors hover:text-accent"
            >
              <Mail className="h-5 w-5 text-accent" />
              {site.email}
            </a>
          </div>
          <div data-reveal style={{ ["--i" as string]: 1 }}>
            <Faq items={faqGeneral} />
          </div>
        </div>
      </Block>
    </>
  );
}
