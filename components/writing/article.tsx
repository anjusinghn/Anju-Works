import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarkdownAsync, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Footer } from "@/components/landing/footer";
import { PaperFrame } from "@/components/shared/paper-frame";
import { PortfolioSticker } from "@/components/shared/portfolio-sticker";
import { handwriting } from "@/components/shared/doodles";
import { ArrowUpRight } from "@/components/shared/site-icons";
import { siteConfig } from "@/config/site";
import type { WritingEntry } from "@/config/types";
import { writingDateFormatter, writingSectionConfig } from "@/config/writing";
import { markdownComponents } from "@/lib/markdown/markdown-components";
import { cn } from "@/lib/utils";

const articleComponents: Components = {
  ...markdownComponents,
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      <Image
        src={src}
        alt={alt ?? ""}
        width={1600}
        height={1000}
        sizes="(min-width: 640px) 608px, 100vw"
        className="h-auto w-full"
        unoptimized={src.endsWith(".svg")}
      />
    ) : null,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
};

export function readWriting(slug: string) {
  return readFile(
    path.join(process.cwd(), "content", "writing", `${slug}.md`),
    "utf8",
  );
}

function writingUrl(entry: WritingEntry) {
  return `${siteConfig.meta.url}${entry.href}`;
}

// Entries without a cover fall back to the route's generated opengraph-image.
function writingImageUrl(entry: WritingEntry) {
  return entry.cover
    ? `${siteConfig.meta.url}${entry.cover.src}`
    : `${writingUrl(entry)}/opengraph-image`;
}

export function writingMetadata(entry: WritingEntry): Metadata {
  const url = writingUrl(entry);
  const images = entry.cover && [
    {
      url: entry.cover.src,
      width: entry.cover.width,
      height: entry.cover.height,
      alt: entry.cover.alt,
    },
  ];
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: entry.title,
      description: entry.summary,
      siteName: siteConfig.meta.shortTitle,
      locale: siteConfig.meta.locale,
      authors: [siteConfig.meta.url],
      ...(entry.date ? { publishedTime: entry.date } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.summary,
      creator: siteConfig.meta.twitterCreator || undefined,
      ...(images ? { images } : {}),
    },
  };
}

function writingJsonLd(entry: WritingEntry) {
  const url = writingUrl(entry);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: entry.title,
    description: entry.summary,
    image: writingImageUrl(entry),
    inLanguage: "en",
    ...(entry.date ? { datePublished: entry.date } : {}),
    author: { "@id": `${siteConfig.meta.url}/#person` },
    publisher: { "@id": `${siteConfig.meta.url}/#person` },
    isPartOf: { "@id": `${siteConfig.meta.url}/#website` },
  };
}

export async function WritingArticle({ entry }: { entry: WritingEntry }) {
  const body = await readWriting(entry.slug);
  const eyebrow =
    entry.kind === "case-study"
      ? writingSectionConfig.caseStudyLabel
      : entry.date && writingDateFormatter.format(new Date(entry.date));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(writingJsonLd(entry)) }}
      />
      <main
        id="main-content"
        className="relative min-h-dvh overflow-x-clip border-x bg-background px-5 pt-16 pb-24 sm:px-8"
      >
        <article className="mx-auto flex w-full max-w-[38rem] flex-col">
          <Link
            href="/#writing"
            className="group mb-8 inline-flex min-h-11 items-center gap-1.5 self-start rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <PortfolioSticker
              name="work-closed"
              className="size-7 motion-safe:transition-transform motion-safe:group-focus-visible:-rotate-6 motion-safe:pointer-fine:group-hover:-rotate-6"
            />
            <span className={cn(handwriting.className, "text-xl leading-none")}>
              {writingSectionConfig.backLabel}
            </span>
          </Link>

          <header>
            {entry.date ? (
              <time
                dateTime={entry.date}
                className={cn(
                  handwriting.className,
                  "inline-block -rotate-2 text-xl leading-none text-muted-foreground motion-reduce:rotate-0",
                )}
              >
                {eyebrow}
              </time>
            ) : (
              eyebrow && (
                <p className="text-sm text-muted-foreground">
                  {eyebrow}
                </p>
              )
            )}
            <h1 className="mt-2 text-xl font-medium leading-snug tracking-tight text-foreground text-balance sm:text-2xl">
              {entry.title}
            </h1>
            <p className="mt-2 text-[15px] leading-7 text-muted-foreground text-pretty">
              {entry.summary}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              by {siteConfig.personal.fullName}
            </p>
          </header>

          {entry.cover && (
            <PaperFrame className="mt-6 aspect-[16/10] w-full">
              <Image
                src={entry.cover.src}
                alt={entry.cover.alt}
                fill
                priority
                sizes="(min-width: 640px) 608px, 100vw"
                className="object-cover object-top"
              />
            </PaperFrame>
          )}

          {entry.highlights && (
            <dl className="mt-6 grid grid-cols-1 border-y border-dashed sm:grid-cols-3">
              {entry.highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="border-dashed px-1 py-3 sm:px-3 sm:not-first:border-l max-sm:not-first:border-t"
                >
                  <dt className="text-sm font-medium text-foreground">{highlight.title}</dt>
                  <dd className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {highlight.body}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {entry.links && (
            <div className="mt-5 flex flex-wrap gap-2">
              {entry.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-[13px] text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          )}

          <div className="prose mt-8 text-[15px] leading-7">
            <MarkdownAsync remarkPlugins={[remarkGfm]} components={articleComponents}>
              {body}
            </MarkdownAsync>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
