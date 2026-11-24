import Image from "next/image";
import Link from "next/link";
import { ArrowDoodle, handwriting } from "@/components/shared/doodles";
import { PaperFrame } from "@/components/shared/paper-frame";
import { ArrowUpRight } from "@/components/shared/site-icons";
import {
  writingConfig,
  writingDateFormatter,
  writingSectionConfig,
} from "@/config/writing";
import { cn } from "@/lib/utils";

const cellChrome = (
  <>
    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-muted-foreground/5" />
    <div className="blueprint-bg pointer-events-none absolute inset-0 opacity-50 transition-opacity group-hover:opacity-100" />
  </>
);

export function Writing() {
  const [featured, ...posts] = [...writingConfig].sort(
    (a, b) => Number(b.kind === "case-study") - Number(a.kind === "case-study"),
  );

  if (!featured) return null;

  return (
    <section className="border-t border-dashed pt-8">
      <h2 className="no-js-visible section-heading mb-3">
        {writingSectionConfig.title}
      </h2>

      <Link href={featured.href} className="group relative block">
        <div className="relative z-10 grid gap-6 px-5 pt-8 pb-6 transition-colors hover:bg-muted/10 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-center sm:gap-7">
          {featured.cover && (
            <div className="relative">
              <PaperFrame className="aspect-[16/10] w-full -rotate-2 shadow-sm transition-transform duration-300 motion-safe:group-hover:rotate-0 motion-safe:group-hover:scale-[1.02] motion-reduce:rotate-0">
                <Image
                  src={featured.cover.src}
                  alt={featured.cover.alt}
                  fill
                  sizes="(min-width: 640px) 240px, 100vw"
                  className="object-cover object-top"
                />
              </PaperFrame>
              <span
                aria-hidden="true"
                className={cn(
                  handwriting.className,
                  "absolute -top-6 right-1 flex rotate-6 items-end gap-0.5 text-xl leading-none text-primary motion-reduce:rotate-0",
                )}
              >
                {featured.kind === "case-study" ? "Case study!" : "Latest"}
                <ArrowDoodle className="size-5 rotate-90" />
              </span>
            </div>
          )}

          <div className="flex min-w-0 flex-col">
            <p className="text-sm text-muted-foreground">
              {featured.kind === "case-study"
                ? writingSectionConfig.caseStudyLabel
                : featured.date && writingDateFormatter.format(new Date(featured.date))}
            </p>
            <h3 className="mt-1.5 font-serif text-2xl italic leading-tight text-foreground text-pretty">
              {featured.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
              {featured.summary}
            </p>
            {featured.highlights && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {featured.highlights.map((highlight) => (
                  <li
                    key={highlight.title}
                    className="rounded-lg border border-dashed px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {highlight.title}
                  </li>
                ))}
              </ul>
            )}
            <span
              className={cn(
                handwriting.className,
                "mt-4 inline-flex items-center gap-1 self-start text-xl leading-none text-foreground transition-colors group-hover:text-primary",
              )}
            >
              {featured.kind === "case-study" ? "Read the case study" : "Read the post"}
              <ArrowDoodle className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
        {cellChrome}
      </Link>

      {posts.map((post) => (
        <Link key={post.slug} href={post.href} className="group relative block">
          <div className="relative z-10 flex items-start gap-4 px-5 py-4 transition-colors hover:bg-muted/10">
            <div className="flex min-w-0 grow flex-col">
              <h3 className="text-sm font-medium tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
                {post.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground/80">
                {post.summary}
              </p>
            </div>
            {post.date && (
              <time
                dateTime={post.date}
                className={cn(
                  handwriting.className,
                  "shrink-0 -rotate-3 pt-0.5 text-lg leading-none whitespace-nowrap text-muted-foreground transition-colors group-hover:text-foreground motion-reduce:rotate-0",
                )}
              >
                {writingDateFormatter.format(new Date(post.date))}
              </time>
            )}
            <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-primary max-sm:hidden" />
          </div>
          {cellChrome}
        </Link>
      ))}
    </section>
  );
}
