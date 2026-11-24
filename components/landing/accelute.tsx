import Link from "next/link";
import { AcceluteTour } from "@/components/landing/accelute-tour";
import { LessonVideo } from "@/components/landing/lesson-video";
import { ArrowDoodle, handwriting } from "@/components/shared/doodles";
import { ArrowUpRight } from "@/components/shared/site-icons";
import { Button } from "@/components/ui/button";
import { acceluteConfig } from "@/config/accelute";
import { cn } from "@/lib/utils";
import { ScanLine } from "lucide-react";

const cellChrome = (
  <>
    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-muted-foreground/5" />
    <div className="blueprint-bg pointer-events-none absolute inset-0 opacity-50" />
  </>
);

function HandNote({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        handwriting.className,
        "flex items-end gap-1 text-xl leading-none text-primary",
        className,
      )}
    >
      {children}
      <ArrowDoodle aria-hidden="true" className="size-5 rotate-90" />
    </p>
  );
}

export function Accelute() {
  const {
    title,
    name,
    eyebrow,
    tagline,
    summary,
    primaryCta,
    caseStudy,
    productHunt,
    lessonVideo,
    tour,
    tourTitle,
    stats,
    statsTitle,
  } = acceluteConfig;

  return (
    <section className="border-t border-dashed pt-8">
      <h2 className="no-js-visible section-heading mb-3">{title}</h2>

      <div className="relative">
        <div className="relative z-10 flex flex-col gap-5 px-5 pt-7 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#0b1620] text-[#7cc4ef] shadow-sm ring-1 ring-black/5 dark:ring-white/10">
              <ScanLine aria-hidden="true" className="size-5" />
            </span>
            <div className="flex min-w-0 flex-col">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{eyebrow}</p>
            </div>
          </div>

          <div>
            <p className="font-serif text-3xl italic leading-tight text-foreground text-balance sm:text-4xl">
              {tagline}
            </p>
            <p className="mt-3 max-w-[38rem] text-sm leading-relaxed text-muted-foreground text-pretty">
              {summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button
              asChild
              className="group h-9 gap-1.5 rounded-full bg-foreground px-4 text-[13px] text-background hover:bg-foreground/85 [a]:hover:bg-foreground/85"
            >
              <Link href={primaryCta.href} target="_blank" rel="noopener noreferrer">
                {primaryCta.label}
                <ArrowDoodle aria-hidden="true" className="size-4" />
              </Link>
            </Button>
            <Link
              href={caseStudy.href}
              className={cn(
                handwriting.className,
                "group inline-flex items-center gap-1 text-xl leading-none text-foreground transition-colors hover:text-primary",
              )}
            >
              {caseStudy.label}
              <ArrowDoodle
                aria-hidden="true"
                className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href={productHunt.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[13px] text-muted-foreground underline decoration-dashed underline-offset-4 transition-colors hover:text-foreground"
            >
              {productHunt.label}
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
        {cellChrome}
      </div>

      <div className="relative px-5 pt-9 pb-6">
        <HandNote className="absolute top-2 right-6 rotate-3 motion-reduce:rotate-0">
          {lessonVideo.note}
        </HandNote>
        <LessonVideo video={lessonVideo} />
      </div>

      <div className="relative">
        <div className="relative z-10 px-5 pt-6 pb-7">
          <h3 className="mb-4 text-sm font-medium tracking-tight text-foreground">{tourTitle}</h3>
          <AcceluteTour steps={tour} />
        </div>
        {cellChrome}
      </div>

      <div className="relative px-5 pt-8 pb-2">
        <HandNote className="mb-1 -rotate-2 motion-reduce:rotate-0">{statsTitle}</HandNote>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label} className="relative">
            <div className="relative z-10 flex h-full flex-col gap-1.5 px-4 py-5">
              <p className="flex flex-wrap items-baseline gap-x-1.5 font-serif italic leading-none">
                <span className="text-lg text-muted-foreground line-through decoration-1">
                  <span className="sr-only">from </span>
                  {stat.before}
                </span>
                <ArrowDoodle aria-hidden="true" className="size-3.5 self-center text-primary" />
                <span className="text-2xl text-foreground">
                  <span className="sr-only">to </span>
                  {stat.after}
                  {stat.unit && <span className="ml-0.5 text-sm">{stat.unit}</span>}
                </span>
              </p>
              <p className="text-xs leading-snug text-muted-foreground text-pretty">{stat.label}</p>
            </div>
            {cellChrome}
          </li>
        ))}
      </ul>
    </section>
  );
}
