import type { WritingEntry } from "@/config/types";

export const writingSectionConfig = {
  title: "Writing",
  backLabel: "Writing",
  caseStudyLabel: "Case study",
};

export const writingConfig: WritingEntry[] = [];

export function findWriting(slug: string) {
  return writingConfig.find((entry) => entry.slug === slug);
}

export const writingDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
