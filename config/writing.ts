import { projectsConfig } from "@/config/projects";
import type { WritingEntry } from "@/config/types";

export const writingSectionConfig = {
  title: "Case studies",
  backLabel: "Case studies",
  caseStudyLabel: "Case study",
};

export const writingConfig: WritingEntry[] = [
  {
    slug: "smart-resume-screener",
    href: "/case-study/smart-resume-screener",
    kind: "case-study",
    title: "Smart Résumé Screener",
    summary: "How the screener extracts text from PDF résumés, ranks them against a role, and explains each score.",
    cover: {
      src: "/images/screener/workflow.webp",
      width: 736,
      height: 400,
      alt: "Smart Résumé Screener dashboard",
    },
    highlights: [
      { title: "Batch upload", body: "Compare several PDFs with one requisition." },
      { title: "Live progress", body: "Inspect results as the batch completes." },
      { title: "Scoring breakdown", body: "See what contributed to each score." },
    ],
    links: [
      { label: "Open demo", href: "https://anju-smart-screener.vercel.app" },
      { label: "View source", href: "https://github.com/anjusinghn/triage" },
    ],
  },
  ...projectsConfig.filter(({ id, content }) => id !== "smart-resume-screener" && content).map(
    (project): WritingEntry => ({
      slug: project.id,
      href: `/project/${project.id}`,
      kind: "case-study",
      title: project.title,
      summary: project.description,
    }),
  ),
];

export function findWriting(slug: string) {
  return writingConfig.find((entry) => entry.slug === slug);
}

export const writingDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
