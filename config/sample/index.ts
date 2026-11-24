import type { InsightReport } from "@/config/types";
import type { Contribution } from "@/lib/github/github";
import type { LanyardData } from "@/lib/discord-status";
import githubContributions from "./github-contributions.json";

/**
 * Sample data for the widgets that read live services on the reference site
 * (Talvess analytics, GitHub GraphQL, Lanyard, the GitHub REST star count).
 *
 * These are frozen numbers, not live data. Each widget shows `label` while it
 * renders a sample. Set the matching environment variables (see README) to
 * switch a widget to its live source, or edit these values directly.
 */
export const sampleDataConfig = {
  label: "Sample data",
  capturedAt: "2026-11-24",
} as const;

export const sampleInsights: InsightReport = {
  points: [
    { date: "2026-11-18", visitors: 145, pageviews: 374 },
    { date: "2026-11-19", visitors: 168, pageviews: 398 },
    { date: "2026-11-20", visitors: 92, pageviews: 226 },
    { date: "2026-11-21", visitors: 130, pageviews: 358 },
    { date: "2026-11-22", visitors: 529, pageviews: 1560 },
    { date: "2026-11-23", visitors: 573, pageviews: 1476 },
    { date: "2026-11-24", visitors: 865, pageviews: 1799 },
  ],
  summary: {
    visitors: 2_222,
    sessions: 3_034,
    pageviews: 6_191,
    averageEngagedSeconds: 52,
  },
  previous: {
    visitors: 5_802,
    sessions: 7_156,
    pageviews: 12_163,
    averageEngagedSeconds: 35,
  },
};

export const sampleVisitorCount = 19_239;

/** Real contributions for `personal.githubUsername`, frozen on `capturedAt`.
    Refresh with `gh api graphql` (see README) or set GITHUB_TOKEN for live data. */
export const sampleGithubContributions = githubContributions as Contribution[];

export const githubSnapshotLabel = `Snapshot from ${new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(sampleDataConfig.capturedAt))}`;

export const sampleGithubStars = 89;

export const sampleDiscordPresence: LanyardData = {
  discord_status: "online",
  activities: [],
  spotify: null,
  listening_to_spotify: false,
};
