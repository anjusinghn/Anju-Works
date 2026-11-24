import { getEnabledComponents } from "@/config/components";
import { pagesConfig } from "@/config/pages";
import { projectsConfig } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { writingConfig } from "@/config/writing";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseEntries = siteConfig.meta.sitemap.map((item) => ({
    ...item,
  }));

  const pageEntries: MetadataRoute.Sitemap = (
    ["testimonials", "sponsor"] as const
  )
    .filter((page) => pagesConfig[page])
    .map((page) => ({
      url: `${siteConfig.meta.url}/${page}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const componentEntries: MetadataRoute.Sitemap = pagesConfig.components
    ? [
        {
          url: `${siteConfig.meta.url}/components`,
          changeFrequency: "monthly",
          priority: 0.7,
        },
        ...getEnabledComponents().map((c) => ({
          url: `${siteConfig.meta.url}/components/${c.id}`,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
      ]
    : [];

  const writingEntries: MetadataRoute.Sitemap = writingConfig.map((entry) => ({
    url: `${siteConfig.meta.url}${entry.href}`,
    ...(entry.date ? { lastModified: new Date(`${entry.date}T00:00:00Z`) } : {}),
    changeFrequency: "yearly" as const,
    priority: entry.kind === "case-study" ? 0.9 : 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = projectsConfig
    .filter((p) => p.enabled !== false)
    .map((p) => ({
      url: `${siteConfig.meta.url}/project/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [
    ...baseEntries,
    ...writingEntries,
    ...pageEntries,
    ...componentEntries,
    ...projectEntries,
  ];
}
