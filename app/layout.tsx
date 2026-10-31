import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { FlowEngine } from "@/components/flow/engine";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["300", "400", "500", "700"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: { default: "alro. — Make a good impression. Then make good on it.", template: "%s · alro." },
  description:
    "Independent creative technology studio. We build bespoke websites and AI-powered business systems. One helps your business show up better. The other helps your team work better.",
};

export const viewport: Viewport = { themeColor: "#fbfbf9" };

// Runs before first paint: opt into the motion layer, skip the preloader on repeat visits.
const prePaint = `try{var d=document.documentElement;d.classList.add('flow');if(sessionStorage.getItem('alro-pl')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('pl-skip')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>

        <div className="preloader" data-preloader aria-hidden="true">
          <div className="pl-logo">
            {["a", "l", "r", "o", "."].map((c, i) => (
              <span key={i} className={`pl-char${i === 4 ? " it" : ""}`}>
                {c}
              </span>
            ))}
          </div>
          <div className="pl-tag">design. engineering. intelligence.</div>
          <div className="pl-count">0</div>
        </div>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />

        <div className="grain" aria-hidden="true" />
        <div className="transition-layer" data-transition aria-hidden="true">
          <div className="t-panel back" />
          <div className="t-panel front" />
        </div>
        <FlowEngine />
      </body>
    </html>
  );
}
