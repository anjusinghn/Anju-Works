"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PaperFrame } from "@/components/shared/paper-frame";
import type { AcceluteTourStep } from "@/config/accelute";
import { cn } from "@/lib/utils";

export function AcceluteTour({ steps }: { steps: AcceluteTourStep[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const step = steps[active];

  if (!step) return null;

  const select = (index: number) => {
    const next = (index + steps.length) % steps.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: steps.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target);
  };

  return (
    <div className="grid gap-5 sm:grid-cols-[minmax(0,16.5rem)_minmax(0,1fr)] sm:gap-6">
      <div
        role="tablist"
        aria-label="Project features"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-col sm:gap-0 sm:overflow-visible sm:px-0 sm:pb-0"
      >
        {steps.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "group/tab shrink-0 text-left transition-colors focus-visible:outline-none",
                "rounded-full border border-dashed px-3.5 py-1 font-serif text-base whitespace-nowrap focus-visible:ring-2 focus-visible:ring-ring/50",
                "sm:rounded-none sm:border-0 sm:border-l-2 sm:border-solid sm:px-4 sm:py-2 sm:text-[1.3rem] sm:leading-snug sm:whitespace-normal",
                selected
                  ? "border-primary/60 text-foreground sm:border-primary"
                  : "text-muted-foreground/80 hover:text-foreground sm:border-border",
              )}
            >
              <span className="flex items-baseline gap-2.5">
                <span className="w-5 shrink-0 font-serif text-base text-muted-foreground/50 italic max-sm:hidden">
                  {index + 1}.
                </span>
                <span>{item.title}</span>
              </span>
              {selected && (
                <span className="mt-1.5 mb-1 block pl-[1.875rem] font-sans text-[13px] leading-relaxed text-muted-foreground text-pretty max-sm:hidden">
                  {item.body}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${step.id}`}
        className="min-w-0"
      >
        <PaperFrame className="aspect-[1700/1017] w-full shadow-sm">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={step.id}
              className="absolute inset-0"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            >
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="(min-width: 640px) 480px, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </PaperFrame>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground text-pretty sm:hidden">
          {step.body}
        </p>
      </div>
    </div>
  );
}
