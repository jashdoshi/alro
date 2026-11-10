import type { ComponentProps } from "react";
import type { LabMedia } from "@/components/home/lab-media";
import type { WorkItem } from "@/lib/work";

export type LabKind = ComponentProps<typeof LabMedia>["kind"];

/** Which interface illustration stands in for each lab piece (same pairing as the home page). */
const bySlug: Record<string, LabKind> = {
  "company-knowledge-assistant": "assistant",
  "promptly-app": "promptly-site",
  "founder-one-portfolio": "sumedh-portfolio",
  "founder-two-portfolio": "jash-portfolio",
};

export function labKind(item: Pick<WorkItem, "slug" | "practice">): LabKind {
  return bySlug[item.slug] ?? (item.practice === "Intelligent systems" ? "systems" : "design");
}
