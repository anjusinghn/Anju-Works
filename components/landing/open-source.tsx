"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowUpRight,
  ArrowUpRightCircle,
} from "@/components/shared/site-icons";
import { openSourceConfig, openSourceSectionConfig } from "@/config/open-source";
import { cn } from "@/lib/utils";

export function OpenSource() {
  const [showAll, setShowAll] = useState(false);
  const { title, previewCount, profileLabel, profileHref } = openSourceSectionConfig;

  if (openSourceConfig.length === 0) return null;

  const items = showAll
    ? openSourceConfig
    : openSourceConfig.slice(0, previewCount);
  const hasMore = openSourceConfig.length > previewCount;

  return (
    <section className="border-t border-dashed pt-8">
      <h2 className="no-js-visible section-heading mb-3">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-stretch"
          >
            <div className="relative z-10 flex h-full w-full items-center gap-4 px-4 py-5 transition-colors hover:bg-muted/10">
              <div className="micro-transition relative flex size-10 shrink-0 items-center justify-center rounded-sm bg-background motion-safe:pointer-fine:group-hover:[transform:translateY(-2px)_rotate(6deg)]">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt=""
                    width={24}
                    height={24}
                    unoptimized
                    className={cn(
                      "size-6 rounded-[3px] object-contain",
                      item.logoInvertInDark && "dark:invert",
                    )}
                  />
                ) : (
                  <FaGithub aria-hidden="true" className="size-5 text-foreground" />
                )}
                <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-muted-foreground/5" />
              </div>
              <div className="flex min-w-0 grow flex-col">
                <h3 className="truncate text-sm font-medium tracking-tight text-foreground">
                  {item.org}
                </h3>
                <p className="mt-0.5 truncate font-mono text-[10px] tracking-wider text-muted-foreground/60">
                  {item.repo}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>
              <ArrowUpRight className="ml-auto size-3.5 shrink-0 self-start text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-primary" />
            </div>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-muted-foreground/5" />
            <div className="blueprint-bg pointer-events-none absolute inset-0 opacity-50 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y py-4">
        {hasMore && (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="flex min-h-6 cursor-pointer items-center gap-2 font-sans text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {showAll
              ? "Show less"
              : `View all ${openSourceConfig.length} contributions`}
            {showAll ? (
              <ArrowBigUp className="size-3.5" />
            ) : (
              <ArrowBigDown className="size-3.5" />
            )}
          </button>
        )}
        <Link
          href={profileHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-6 items-center gap-2 font-sans text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {profileLabel}
          <ArrowUpRightCircle className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
