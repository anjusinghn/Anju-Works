import { openGraphConfig } from "@/config/opengraph";
import { siteConfig } from "@/config/site";
import { findWriting, writingConfig } from "@/config/writing";
import { getOgFonts, OG_CONTENT_TYPE, OG_SIZE, OgCard } from "@/lib/og/card";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const alt = "A post by Anju Singh";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return writingConfig
    .filter((entry) => entry.kind === "post")
    .map((entry) => ({ slug: entry.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = findWriting(slug);
  if (!entry || entry.kind !== "post") notFound();

  return new ImageResponse(
    <OgCard
      eyebrow={openGraphConfig.routes.post.eyebrow}
      title={entry.title}
      description={entry.summary}
      footer={`${new URL(siteConfig.meta.url).host}${entry.href}`}
    />,
    { ...OG_SIZE, fonts: getOgFonts() },
  );
}
