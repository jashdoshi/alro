import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { GlassFilters, GlassRuntime } from "@/components/glass";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "ALRO — Digital Craft & Intelligence",
    template: "%s · ALRO",
  },
  description:
    "An independent, founder-led studio. Bespoke websites and practical AI systems for ambitious businesses — and you work directly with the people doing the work.",
};

export const viewport: Viewport = {
  themeColor: "#100101",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-orange focus:px-4 focus:py-2">
          Skip to content
        </a>
        <GlassFilters />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <GlassRuntime />
      </body>
    </html>
  );
}
