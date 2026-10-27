import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { ArrowRight, Check, Sparkle } from "./icons";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/** ALRO lockup: sparkle mark + lowercase wordmark. */
export function Logo({ className, size = 26 }: { className?: string; size?: number }) {
  return (
    <span className={cx("inline-flex items-center gap-2 font-medium", className)} style={{ fontSize: size, letterSpacing: "-0.05em", lineHeight: 1 }}>
      <Sparkle style={{ width: size * 0.8, height: size * 0.8 }} className="text-accent" />
      alro
    </span>
  );
}

/** Frosted section label with the sparkle glyph. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx("chip", className)}>
      <Sparkle className="text-accent" />
      {children}
    </span>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function Button({ href, children, variant = "primary", size = "md", arrow, className, ...rest }: BtnProps) {
  return (
    <Link href={href} className={cx("btn", variant === "primary" ? "btn-primary" : "btn-ghost", size === "sm" && "btn-sm", className)} {...rest}>
      {children}
      {arrow && <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}

/** Round arrow button (link). */
export function RoundLink({ href, label, className, variant = "primary", large }: { href: string; label: string; className?: string; variant?: "primary" | "ghost"; large?: boolean }) {
  return (
    <Link href={href} aria-label={label} className={cx("btn btn-icon", large && "lg", variant === "primary" ? "btn-primary" : "btn-ghost", className)}>
      <ArrowRight className={large ? "h-7 w-7" : "h-5 w-5"} />
    </Link>
  );
}

/**
 * Standard section heading. `split` puts the aside copy on the right,
 * as in the reference's "Modernize How Your Business Works" header.
 */
export function SectionHead({
  chip,
  title,
  lead,
  aside,
  center,
  className,
}: {
  chip: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  if (center) {
    return (
      <div className={cx("mx-auto flex max-w-3xl flex-col items-center gap-5 text-center", className)} data-reveal>
        <Chip>{chip}</Chip>
        <h2 className="h2">{title}</h2>
        {lead && <p className="lead max-w-2xl">{lead}</p>}
      </div>
    );
  }
  return (
    <div className={cx("grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end", className)} data-reveal>
      <div className="flex flex-col items-start gap-5">
        <Chip>{chip}</Chip>
        <h2 className="h2 max-w-[16ch]">{title}</h2>
        {lead && <p className="lead max-w-xl">{lead}</p>}
      </div>
      {aside && <div className="flex flex-col items-start gap-6 md:items-end md:text-right">{aside}</div>}
    </div>
  );
}

/** Background photo with fades into the black canvas. */
export function Photo({
  src,
  alt = "",
  className,
  imgClassName,
  priority,
  sizes = "100vw",
  style,
  position = "center",
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  style?: CSSProperties;
  position?: string;
}) {
  return (
    <div className={cx("relative overflow-hidden", className)} style={style}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={priority} className={cx("object-cover", imgClassName)} style={{ objectPosition: position }} />
    </div>
  );
}

export function CheckItem({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "hot" | "dim" }) {
  return (
    <li className="flex items-start gap-3 text-[0.97rem] leading-snug text-fg">
      <span className={cx("check mt-[2px]", tone === "hot" && "hot", tone === "dim" && "dim")}>
        <Check className="h-3 w-3" />
      </span>
      <span>{children}</span>
    </li>
  );
}

/** Numbered marker like "01" in a small frosted ring. */
export function Num({ n, className }: { n: string | number; className?: string }) {
  return (
    <span className={cx("inline-grid h-9 min-w-9 place-items-center rounded-full border border-line-2 px-2 text-[0.78rem] tabular-nums text-fg-2", className)}>
      {String(n).padStart(2, "0")}
    </span>
  );
}
