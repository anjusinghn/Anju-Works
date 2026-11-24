import { GitHubActivity } from "@/components/landing/github-activity";
import { githubSectionConfig } from "@/config/github";
import { githubSnapshotLabel, sampleGithubContributions } from "@/config/sample";
import { siteConfig } from "@/config/site";
import { fetchGithubData } from "@/lib/github/github";
import { buildActivityCalendar } from "@/lib/github/github-activity";

/* Live contributions need GITHUB_TOKEN. Without it the calendar renders the
   dated snapshot in `config/sample` and says so in its legend. */
export async function GitHubSection() {
  const isSample = !process.env.GITHUB_TOKEN;
  const contributions = isSample
    ? sampleGithubContributions
    : await fetchGithubData(siteConfig.personal.githubUsername);

  const calendar = buildActivityCalendar(
    contributions,
    githubSectionConfig.minWeeks,
  );
  if (!calendar) {
    return null;
  }

  return (
    <div className="border-t border-dashed p-2">
      <GitHubActivity
        key={calendar.end}
        calendar={calendar}
        sampleLabel={isSample ? githubSnapshotLabel : undefined}
      />
    </div>
  );
}
