import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight } from "./icons";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/** Stagger helper for scroll reveals. */
export const st = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

/**
 * The stadium glyph: a horizontal rounded-rectangle outline drawn at cap
 * height. It is the "O" in the ALRO logo and the occasional "D" or "O"
 * inside headings, echoing the reference identity.
 */
export function Glyph({ className, w = 1.42, shape = "o" }: { className?: string; w?: number; shape?: "o" | "d" }) {
  return (
    <span
      aria-hidden="true"
      className={cx("relative inline-block align-baseline", className)}
      style={{
        width: `${w}em`,
        height: "0.72em",
        border: "0.1em solid currentColor",
        borderRadius: shape === "d" ? "0.04em 999px 999px 0.04em" : "999px",
        marginInline: "0.04em",
      }}
    />
  );
}

/** ALRO wordmark: "ALR" + stadium O. */
export function Logo({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <span className={cx("inline-flex items-baseline font-semibold uppercase leading-none tracking-[0.02em]", className)} style={{ fontSize: size }} aria-label="ALRO">
      <span aria-hidden="true">ALR</span>
      <Glyph w={1.5} />
    </span>
  );
}

/** Heading word whose D is drawn as the glyph, e.g. word="AND" at={2}. */
export function GlyphWord({ word, at }: { word: string; at: number }) {
  return (
    <span className="whitespace-nowrap" aria-label={word}>
      <span aria-hidden="true">{word.slice(0, at)}</span>
      <Glyph w={1.25} shape="d" />
      <span aria-hidden="true">{word.slice(at + 1)}</span>
    </span>
  );
}

/** Staggered uppercase heading: later lines indent, as in the references. */
export function Stagger({
  lines,
  className,
  as: Tag = "h2",
  indent = ["0", "0", "clamp(1rem, 12vw, 9rem)", "clamp(1rem, 12vw, 9rem)"],
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  indent?: string[];
}) {
  return (
    <Tag className={className} data-reveal>
      {lines.map((l, i) => (
        <span key={i} className="block" style={{ paddingLeft: indent[i] ?? indent[indent.length - 1] }}>
          {l}
        </span>
      ))}
    </Tag>
  );
}

type SplitProps = {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  arrow?: "up" | "right";
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/** Split pill: label + circular arrow puck. */
export function SplitButton({ href, children, tone = "light", className, arrow = "up", ...rest }: SplitProps) {
  return (
    <Link href={href} className={cx("btn", tone === "light" ? "btn-light" : "btn-dark", className)} {...rest}>
      <span>{children}</span>
      <span className="puck">{arrow === "up" ? <ArrowUpRight /> : <ArrowRight />}</span>
    </Link>
  );
}

export function GhostButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cx("btn btn-ghost", className)}>
      {children}
    </Link>
  );
}

/** Round arrow — link or button. */
export function Round({
  dir = "up",
  tone = "dark",
  label,
  href,
  onClick,
  className,
}: {
  dir?: "up" | "down" | "left" | "right";
  tone?: "dark" | "white" | "orange";
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const Icon = { up: ArrowUpRight, down: ArrowDownRight, left: ArrowLeft, right: ArrowRight }[dir];
  const cls = cx("round", `round-${tone}`, className);
  if (href)
    return (
      <Link href={href} aria-label={label} className={cls}>
        <Icon />
      </Link>
    );
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cls}>
      <Icon />
    </button>
  );
}

/** Tiny gray corner label ("Philosophy", "Founder statement / 001"). */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("t-label", className)}>{children}</p>;
}
