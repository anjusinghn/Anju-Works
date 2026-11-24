import { projectsConfig } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { getNpmWeeklyDownloads } from "@/lib/npm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectContent } from "./project-content";

export const revalidate = 3600;

export async function generateStaticParams() {
  return projectsConfig.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projectsConfig.find((p) => p.id === resolvedParams.id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const url = `${siteConfig.meta.url}/project/${project.id}`;
  const title = `${project.title}: ${project.tagline}`;

  return {
    title,
    description: project.description,
    keywords: [
      ...siteConfig.meta.keywords,
      ...project.tags,
      "portfolio project",
      "developer project",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description: project.description,
      siteName: siteConfig.meta.shortTitle,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      creator: siteConfig.meta.twitterCreator || undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = projectsConfig.find(
    (p) => p.id === resolvedParams.id && p.enabled !== false,
  );

  if (!project) {
    notFound();
  }

  const weeklyDownloads = project.npmPackage
    ? await getNpmWeeklyDownloads(project.npmPackage)
    : null;

  const url = `${siteConfig.meta.url}/project/${project.id}`;
  const sameAs = [project.liveUrl, project.githubUrl].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    name: project.title,
    headline: `${project.title}: ${project.tagline}`,
    description: project.description,
    image: `${url}/opengraph-image`,
    keywords: project.tags.join(", "),
    inLanguage: "en",
    ...(sameAs.length ? { sameAs } : {}),
    creator: { "@id": `${siteConfig.meta.url}/#person` },
    isPartOf: { "@id": `${siteConfig.meta.url}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectContent project={project} weeklyDownloads={weeklyDownloads} />
    </>
  );
}
