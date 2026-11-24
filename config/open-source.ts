import type { OpenSourceContribution } from "@/config/types";

export const openSourceSectionConfig = {
  title: "Open source",
  previewCount: 4,
  profileLabel: "All repositories on GitHub",
  profileHref: "https://github.com/anjusinghn?tab=repositories",
};

export const openSourceConfig: OpenSourceContribution[] = [
  {
    id: "openlinear",
    org: "OpenLinear",
    repo: "anjusinghn/openlinear",
    summary: "MIT-licensed desktop app that connects a kanban board with AI coding agents.",
    href: "https://github.com/anjusinghn/openlinear",
  },
  {
    id: "wp-ai-seo",
    org: "WordPress AI SEO Automation",
    repo: "anjusinghn/wp_ai_seo_automation",
    summary: "MIT-licensed WordPress SEO automation project.",
    href: "https://github.com/anjusinghn/wp_ai_seo_automation",
  },
];
