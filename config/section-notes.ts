import type { SectionId, SectionNoteConfig } from "@/config/types";

export const heroNote: SectionNoteConfig = {
  text: "That's me,\nAnju",
  side: "right",
};

export const sectionNotes: Partial<Record<SectionId, SectionNoteConfig>> = {
  projects: {
    text: "A few things\nI've built",
    side: "left",
  },
  opensource: {
    text: "Find the\nsource code",
    side: "right",
  },
  socials: {
    text: "Come say hi!",
    side: "left",
  },
  skills: {
    text: "What I reach\nfor every day",
    side: "right",
  },
  about: {
    text: "A little\nabout me",
    side: "left",
  },
  github: {
    text: "My GitHub\nactivity",
    side: "right",
  },
};
