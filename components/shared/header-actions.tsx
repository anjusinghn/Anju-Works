"use client";

import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "motion/react";
import { revealOnMount } from "@/lib/motion";
import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";
import { sampleDataConfig } from "@/config/sample";
import type { GitHubStarsResponse } from "@/app/api/github-stars/route";
import { trackEvent } from "@/lib/analytics";
import { Moon, Search, Sun } from "@/components/shared/site-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigationConfig } from "@/config/navigation";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { socialsConfig } from "@/config/socials";
import { Starfish } from "trazo-stickers";
import styles from "./site-header.module.css";

const SiteCommandPalette = dynamic(
  () =>
    import("@/components/shared/site-command-palette").then(
      (mod) => mod.SiteCommandPalette,
    ),
  { ssr: false },
);

function GitHubStarIcon() {
  return (
    <span aria-hidden="true" className="relative block size-[16.2px] shrink-0 perspective-near">
      <span className="relative block size-full transform-3d motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-safe:pointer-fine:group-hover:rotate-x-12 motion-safe:pointer-fine:group-hover:rotate-y-180 motion-safe:group-focus-visible:rotate-x-12 motion-safe:group-focus-visible:rotate-y-180">
        <span className="absolute inset-0 backface-hidden">
          <FaGithub className="block size-full" focusable="false" />
        </span>
        <span className="absolute inset-0 rotate-y-180 backface-hidden">
          <Starfish size={16.2} style={{ display: "block" }} focusable="false" />
        </span>
      </span>
    </span>
  );
}

function GitHubNavLink() {
  const [starCount, setStarCount] = useState<string | null>(null);
  const [isSample, setIsSample] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/github-stars", { signal: controller.signal })
      .then((response) =>
        response.ok ? (response.json() as Promise<GitHubStarsResponse>) : null,
      )
      .then((data) => {
        if (!data || data.stars === null) return;
        setIsSample(data.isSample);
        setStarCount(
          new Intl.NumberFormat("en", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(data.stars),
        );
      })
      .catch(() => {
        // silently fail to keep UI stable
      });

    return () => controller.abort();
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={siteConfig.banner.openSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={navigationConfig.githubLabel}
          onClick={() => {
            trackEvent("github_repo_clicked", {
              repo_url: siteConfig.banner.openSourceUrl,
              star_count: starCount,
            });
          }}
          className={`group ${styles.githubLink} outline-none`}
        >
          <span className={styles.githubFace}>
            <GitHubStarIcon />
            {starCount !== null && (
              <span
                className="font-mono text-[10px]"
                title={isSample ? `${sampleDataConfig.label} star count` : undefined}
              >
                {starCount}
              </span>
            )}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent><p>{siteConfig.banner.openSourceTooltip}</p></TooltipContent>
    </Tooltip>
  );
}

const headerSocials = [
  { id: "linkedin", Icon: FaLinkedinIn },
  { id: "instagram", Icon: FaInstagram },
].flatMap(({ id, Icon }) => {
  const social = socialsConfig.find((item) => item.id === id && item.enabled && item.href);
  return social ? [{ ...social, Icon }] : [];
});

function SocialNavLinks() {
  return headerSocials.map((social) => (
    <Tooltip key={social.id}>
      <TooltipTrigger asChild>
        <Link
          href={social.href!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.platform}
          onClick={() => trackEvent("social_link_clicked", { platform: social.platform, url: social.href!, location: "header" })}
          className={`${styles.utility} outline-none`}
        >
          <span className={styles.utilityFace}>
            <social.Icon className="size-[14.4px]" focusable="false" />
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{social.tooltipDefault ?? social.platform}</p>
      </TooltipContent>
    </Tooltip>
  ));
}

export function HeaderActions() {
  const { setTheme, resolvedTheme } = useTheme();
  const themeAudioRef = useRef<HTMLAudioElement>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteMounted, setPaletteMounted] = useState(false);

  const playThemeAudio = () => {
    if (themeAudioRef.current) {
      themeAudioRef.current.currentTime = 0;
      themeAudioRef.current.play().catch(() => {});
    }
  };

  const toggleTheme = useCallback((method: "button" | "shortcut_key" = "button") => {
    playThemeAudio();
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    trackEvent("theme_toggled", {
      theme: nextTheme,
      method,
    });
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteMounted(true);
        setPaletteOpen((prev) => !prev);
        return;
      }

      if (
        e.key.toLowerCase() === siteConfig.banner.themeShortcut.toLowerCase()
      ) {
        e.preventDefault();
        toggleTheme("shortcut_key");
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [toggleTheme]);

  useEffect(() => {
    const themeAudio = themeAudioRef.current;
    return () => {
      themeAudio?.pause();
    };
  }, []);

  return (
    <>
      <motion.div
        {...revealOnMount({ y: -10 })}
        className="pointer-events-auto flex shrink-0 items-center"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={navigationConfig.search}
              onClick={() => {
                setPaletteMounted(true);
                setPaletteOpen(true);
              }}
              className={`${styles.utility} ${styles.searchUtility} cursor-pointer`}
            >
              <span className={styles.utilityFace}><Search className="size-[14.4px]" /></span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-1">{navigationConfig.search} <Kbd>Ctrl / ⌘</Kbd> <Kbd>K</Kbd></p>
          </TooltipContent>
        </Tooltip>
        <GitHubNavLink />
        <SocialNavLinks />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={siteConfig.banner.themeToggleLabel}
              className={`${styles.utility} cursor-pointer`}
              onClick={() => toggleTheme("button")}
            >
              <span className={styles.utilityFace}>
                <Sun className="size-[14.4px] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0 motion-reduce:transition-none" />
                <Moon className="absolute size-[14.4px] rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100 motion-reduce:transition-none" />
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{siteConfig.banner.themeTooltip} <Kbd>{siteConfig.banner.themeShortcut}</Kbd></p>
          </TooltipContent>
        </Tooltip>
      </motion.div>

      <audio
        ref={themeAudioRef}
        src={siteConfig.banner.switchAudioSrc}
        preload="none"
      />

      {paletteMounted && (
        <SiteCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      )}
    </>
  );
}
