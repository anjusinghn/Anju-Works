"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Lock,
  Pause,
  PanelLeft,
  Play,
  Plus,
  RotateCw,
  ScanLine,
  Share,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { acceluteConfig } from "@/config/accelute";
import { cn } from "@/lib/utils";

type LessonVideoConfig = (typeof acceluteConfig)["lessonVideo"];

function AcceluteFavicon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-[4px] bg-[#0b1620] text-[#7cc4ef]",
        className,
      )}
    >
      <ScanLine className="size-2.5" />
    </span>
  );
}

function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function LessonVideo({ video }: { video: LessonVideoConfig }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [heardFromStart, setHeardFromStart] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const reduceMotion = useReducedMotion();
  const { browser } = video;

  useEffect(() => {
    const node = videoRef.current;
    if (node && node.readyState >= 1) setDuration(node.duration);
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || reduceMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !userPaused.current) {
          node.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          node.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const togglePlay = () => {
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) {
      userPaused.current = false;
      node.play().catch(() => {});
    } else {
      userPaused.current = true;
      node.pause();
    }
  };

  const toggleSound = () => {
    const node = videoRef.current;
    if (!node) return;
    if (node.muted && !heardFromStart) {
      node.currentTime = 0;
      setHeardFromStart(true);
    }
    node.muted = !node.muted;
    setMuted(node.muted);
    if (node.paused) {
      userPaused.current = false;
      node.play().catch(() => {});
    }
  };

  const seek = (value: number) => {
    const node = videoRef.current;
    if (!node || !duration) return;
    node.currentTime = value;
    setTime(value);
  };

  const SoundIcon = muted ? VolumeX : Volume2;

  return (
    <figure className="overflow-hidden rounded-xl border bg-background shadow-[0_12px_40px_-12px_rgb(0_0_0/0.25)] dark:shadow-[0_12px_40px_-12px_rgb(0_0_0/0.7)]">
      <div className="bg-muted/60 dark:bg-muted/40">
        <div className="flex h-11 items-center gap-3 px-3.5 text-muted-foreground">
          <span aria-hidden="true" className="flex shrink-0 gap-2">
            <span className="size-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10 ring-inset" />
            <span className="size-3 rounded-full bg-[#febc2e] ring-1 ring-black/10 ring-inset" />
            <span className="size-3 rounded-full bg-[#28c840] ring-1 ring-black/10 ring-inset" />
          </span>
          <span aria-hidden="true" className="flex shrink-0 items-center gap-2.5 max-sm:hidden">
            <PanelLeft className="size-4" strokeWidth={1.6} />
            <ChevronLeft className="size-4" strokeWidth={1.8} />
            <ChevronRight className="size-4 opacity-40" strokeWidth={1.8} />
          </span>
          <Link
            href={browser.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto flex h-7 w-full max-w-[19rem] min-w-0 items-center justify-center gap-1.5 rounded-lg bg-background/90 px-3 text-[13px] text-foreground shadow-[0_0_0_0.5px_rgb(0_0_0/0.08)] transition-colors hover:bg-background dark:shadow-[0_0_0_0.5px_rgb(255_255_255/0.1)]"
          >
            <Lock aria-hidden="true" className="size-3 shrink-0 text-muted-foreground" strokeWidth={2} />
            <span className="truncate">{browser.url}</span>
            <span className="sr-only">(opens in a new tab)</span>
            <RotateCw aria-hidden="true" className="ml-auto size-3 shrink-0 text-muted-foreground" strokeWidth={2} />
          </Link>
          <span aria-hidden="true" className="flex shrink-0 items-center gap-2.5 max-sm:hidden">
            <Share className="size-4" strokeWidth={1.6} />
            <Plus className="size-4" strokeWidth={1.6} />
            <Copy className="size-4" strokeWidth={1.6} />
          </span>
        </div>

        <div className="flex h-9 items-stretch gap-px px-1.5 pb-1.5 text-xs">
          <div className="flex min-w-0 flex-[1.4] items-center gap-2 rounded-md bg-background px-2.5 text-foreground shadow-[0_0_0_0.5px_rgb(0_0_0/0.08)] dark:shadow-[0_0_0_0.5px_rgb(255_255_255/0.1)]">
            <AcceluteFavicon />
            <span className="truncate">{browser.activeTab}</span>
            {video.hasAudio && <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Turn sound on" : "Mute"}
              className="ml-auto flex size-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <SoundIcon className="size-3.5" strokeWidth={1.8} />
            </button>}
            <X aria-hidden="true" className="size-3 shrink-0 text-muted-foreground/70" strokeWidth={2} />
          </div>
          <div
            aria-hidden="true"
            className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2.5 text-muted-foreground max-sm:hidden"
          >
            <AcceluteFavicon className="opacity-70" />
            <span className="truncate">{browser.otherTab}</span>
          </div>
          <span aria-hidden="true" className="flex w-7 shrink-0 items-center justify-center text-muted-foreground">
            <Plus className="size-3.5" strokeWidth={1.8} />
          </span>
        </div>
      </div>

      <div className="group/video relative border-t bg-[#0b0b0c]">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          width={video.width}
          height={video.height}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={video.label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onDurationChange={(event) => setDuration(event.currentTarget.duration)}
          className="block h-auto w-full"
        />

        {video.hasAudio && muted && (
          <button
            type="button"
            onClick={toggleSound}
            className="absolute bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-sm font-medium text-white shadow-lg ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-black/90 max-sm:bottom-12 max-sm:px-3 max-sm:py-1.5 max-sm:text-xs"
          >
            <Volume2 aria-hidden="true" className="size-4" strokeWidth={1.8} />
            {heardFromStart ? "Turn sound back on" : "Hear this lesson"}
          </button>
        )}

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pt-10 pb-2.5 text-white transition-opacity duration-200",
            playing &&
              "pointer-fine:opacity-0 pointer-fine:group-hover/video:opacity-100 pointer-fine:focus-within:opacity-100",
          )}
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
          >
            {playing ? (
              <Pause className="size-3.5" fill="currentColor" strokeWidth={0} />
            ) : (
              <Play className="size-3.5 translate-x-px" fill="currentColor" strokeWidth={0} />
            )}
          </button>
          <div className="relative h-1 min-w-0 grow rounded-full bg-white/25 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white/60">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white"
              style={{ width: duration ? `${(time / duration) * 100}%` : 0 }}
            />
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={time}
              onChange={(event) => seek(Number(event.currentTarget.value))}
              aria-label="Seek"
              aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
              className="absolute -inset-y-2 inset-x-0 h-5 w-full cursor-pointer opacity-0"
            />
          </div>
          <span className="shrink-0 text-xs tabular-nums text-white/80">
            {formatTime(time)} / {formatTime(duration)}
          </span>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Turn sound on" : "Mute"}
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
          >
            <SoundIcon className="size-3.5" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </figure>
  );
}
