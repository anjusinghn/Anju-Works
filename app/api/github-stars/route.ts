import { sampleGithubStars } from "@/config/sample";
import { siteConfig } from "@/config/site";
import { NextResponse } from "next/server";

/** `stars` is null when `banner.openSourceUrl` points at a profile rather than a repo. */
export type GitHubStarsResponse = { stars: number | null; isSample: boolean };

/* One cached server request per hour instead of one unauthenticated GitHub
   call per visitor, which hits the 60 requests/hour limit quickly. Falls back
   to the sample count when GitHub is unreachable or rate limited. */
export const revalidate = 3600;

export async function GET() {
  const [owner, repo] = new URL(siteConfig.banner.openSourceUrl).pathname
    .split("/")
    .filter(Boolean);

  if (!owner || !repo) {
    return NextResponse.json<GitHubStarsResponse>({ stars: null, isSample: false });
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (response.ok) {
      const data = (await response.json()) as { stargazers_count?: number };
      if (typeof data.stargazers_count === "number") {
        return NextResponse.json<GitHubStarsResponse>({
          stars: data.stargazers_count,
          isSample: false,
        });
      }
    }
  } catch {
    // fall through to the sample count
  }

  return NextResponse.json<GitHubStarsResponse>({
    stars: sampleGithubStars,
    isSample: true,
  });
}
