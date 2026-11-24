"use client";

import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  ImageIcon,
  ListFilter,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from "react";

export type ProjectStatus = "building" | "new" | "shipped";

export interface ProjectExplorerItem {
  id: string;
  title: string;
  /** Secondary text beside the name. Falls back to the part of `title` after " — ". */
  subtitle?: string;
  description?: string;
  category?: string;
  status?: ProjectStatus;
  href?: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  imageAlt?: string;
  /** "github" marks a 2:1 repository card, shown whole instead of cropped. */
  imageSource?: "screenshot" | "github";
  showImage?: boolean;
  /** Pinned projects get their own entry in the filter dropdown. */
  featured?: boolean;
  enabled?: boolean;
  order?: number;
}

const defaultSampleProjects: ProjectExplorerItem[] = [
  {
    id: "zeno",
    title: "Zeno — AI Assistant for PostgreSQL",
    status: "building",
    category: "AI tools",
    href: "https://zeno.example.com",
    image: "/zeno.png",
  },
  {
    id: "gridly",
    title: "Gridly — Modern UI Component Library",
    status: "new",
    category: "Design systems",
    href: "https://gridly.example.com",
  },
  {
    id: "rixel",
    title: "Rixel — High Performance Pixel Canvas",
    status: "shipped",
    category: "Graphics",
    href: "https://rixel.example.com",
    image: "/rixel.png",
  },
  {
    id: "aura",
    title: "Aura — Ambient Audio Workspace",
    status: "shipped",
    category: "Audio",
    href: "https://aura.example.com",
  },
];

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeHoverCapability(callback: () => void) {
  const mql = window.matchMedia(HOVER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

const getHoverSnapshot = () => window.matchMedia(HOVER_QUERY).matches;
const getServerSnapshot = () => false;

const PREVIEW_WIDTH = 300;
const PREVIEW_HEIGHT = 240;
const PAPER_EDGE =
  "polygon(1% 2%, 12% 0.5%, 25% 1.5%, 38% 0%, 54% 1%, 69% 0.5%, 83% 1.5%, 98% 0%, 99% 14%, 98.5% 31%, 100% 48%, 99% 65%, 99.5% 82%, 98% 99%, 84% 98%, 70% 100%, 55% 98.5%, 40% 99.5%, 25% 98%, 11% 99.5%, 0% 98%, 1% 82%, 0% 65%, 1.5% 48%, 0.5% 31%, 1% 15%)";
const PAPER_TEXTURE = {
  backgroundImage:
    "radial-gradient(var(--foreground, #171717) 0.45px, transparent 0.65px)",
  backgroundSize: "3px 3px",
};

function PaperFolderIcon({
  open,
  className,
}: {
  open: boolean;
  className?: string;
}) {
  const patternId = useId();
  const silhouette = "m4 7 15-2 5 5 17-1 2 5 3 1-6 21-33 1-3-5Z";
  const front = open
    ? "M4 17 15 16 18 18 43 15 37 33 8 34Z"
    : "M7 15 18 14 21 16 39 15 38 33 8 34Z";

  return (
    <svg
      viewBox="0 0 48 40"
      aria-hidden="true"
      focusable="false"
      color="var(--cutout-ink, var(--foreground))"
      className={cn(
        "h-8 w-10 shrink-0 overflow-visible",
        "[--cutout-paper:var(--background)] dark:[--cutout-paper:var(--foreground)] dark:[--cutout-ink:var(--background)]",
        className,
      )}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <pattern
          id={patternId}
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.5" className="fill-current opacity-30" />
        </pattern>
      </defs>
      <g stroke="currentColor">
        <path
          d={silhouette}
          transform="translate(1 2)"
          fill="currentColor"
          strokeWidth="4"
          opacity="0.1"
        />
        <path
          d={silhouette}
          fill="var(--cutout-paper, var(--background))"
          stroke="var(--cutout-paper, var(--background))"
          strokeWidth="4"
        />
        <path
          d={silhouette}
          fill="color-mix(in oklch, var(--chart-2, #3b82f6) 14%, var(--cutout-paper, var(--background)))"
        />
        {open && (
          <path
            d="m7 12 12-2 5 5 15-1-1 19-29 2Z"
            fill="currentColor"
            fillOpacity="0.12"
            strokeWidth="1"
          />
        )}
        <path
          d="m8 10 9-1 3 3-12 1Z"
          fill="var(--chart-2, #3b82f6)"
          fillOpacity="0.85"
          strokeWidth="0.8"
        />
        <path
          d={front}
          fill="var(--cutout-paper, var(--background))"
          strokeWidth="1.2"
        />
        <path d={front} fill={`url(#${patternId})`} stroke="none" />
        <path
          d="m12 21 10-1v4l-10 1Z"
          fill="var(--chart-1, #f97316)"
          fillOpacity="0.7"
          stroke="none"
        />
        <path
          d="m12 28 20-1m-20 3 14-1"
          strokeWidth="0.7"
          opacity="0.55"
        />
      </g>
    </svg>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  if (status === "shipped") return null;

  if (status === "building") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-blue-500/10 px-1.5 py-0.5 font-sans text-[10px] leading-none text-blue-600 dark:text-blue-400">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-1.5 rounded-full bg-blue-500" />
        </span>
        building&hellip;
      </span>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center rounded-sm bg-amber-500/10 px-1.5 py-0.5 font-sans text-[10px] leading-none text-amber-600 dark:text-amber-400">
      new
    </span>
  );
}

interface PreviewHandlers {
  onPreviewStart: (project: ProjectExplorerItem, anchor?: DOMRect) => void;
  onPreviewEnd: () => void;
  showHoverPreview: boolean;
  onProjectClick?: (project: ProjectExplorerItem, targetType: "project_page" | "external_url", url: string) => void;
  linkIcon?: ReactNode;
}

function WorkRow({
  project,
  onPreviewStart,
  onPreviewEnd,
  showHoverPreview,
  onProjectClick,
  linkIcon,
}: { project: ProjectExplorerItem } & PreviewHandlers) {
  const [titleName, titleSubtitle] = project.title.split(" — ");
  const name = project.subtitle ? project.title : titleName;
  const subtitle = project.subtitle ?? titleSubtitle;
  const href = project.href ?? project.liveUrl ?? (project.id ? `/project/${project.id}` : "#");
  const isExternal = Boolean(
    project.liveUrl ||
      (project.href &&
        (project.href.startsWith("http://") ||
          project.href.startsWith("https://"))),
  );

  const handleClick = () => {
    onProjectClick?.(project, isExternal ? "external_url" : "project_page", href);
  };

  return (
    <li className="relative">
      <Link
        href={href}
        onClick={handleClick}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        onMouseEnter={
          showHoverPreview ? () => onPreviewStart(project) : undefined
        }
        onMouseLeave={showHoverPreview ? onPreviewEnd : undefined}
        onFocus={
          showHoverPreview
            ? (event) =>
                onPreviewStart(
                  project,
                  event.currentTarget.getBoundingClientRect(),
                )
            : undefined
        }
        onBlur={showHoverPreview ? onPreviewEnd : undefined}
        className="group micro-transition flex min-h-11 items-center gap-2 rounded-sm px-3 py-2 hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20"
      >
        <span className="min-w-0 flex-1 truncate text-sm font-medium transition-colors group-hover:text-primary group-focus-visible:text-primary">
          {subtitle ? (
            <>
                <span className="inline font-medium text-foreground group-hover:text-primary group-focus-visible:text-primary">
                {name}
              </span>
              <span className="ml-2 inline font-normal text-muted-foreground md:ml-4">
                {subtitle}
              </span>
            </>
          ) : (
            name
          )}
        </span>

        {project.status ? <StatusBadge status={project.status} /> : null}

        <span
          aria-hidden="true"
          className="inline-flex shrink-0 text-muted-foreground/30 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:text-primary"
        >
          {linkIcon ?? <ArrowUpRight className="size-3.5" />}
        </span>
      </Link>
    </li>
  );
}

export type ProjectExplorerProps = {
  /** The list of projects to display. If omitted, sample projects will be shown. */
  projects?: ProjectExplorerItem[];
  /** Section heading text. Default: "Featured Projects". */
  title?: string;
  /** Hide the section label when the explorer lives inside an already-labelled surface.
   *  Also drops the section's top rule. */
  showHeading?: boolean;
  /** Choose whether every category or only the first category starts expanded. */
  defaultOpen?: "all" | "first";
  /** Enable or disable the floating cursor hover image preview card. Default: true */
  showHoverPreview?: boolean;
  /** Show a toolbar with a category filter dropdown and an open/close-all toggle. */
  filterable?: boolean;
  /** Cap each open category at this many rows. Longer groups scroll inside their folder. */
  maxVisibleRows?: number;
  /** Optional callback fired when a project link is clicked. */
  onProjectClick?: (project: ProjectExplorerItem, targetType: "project_page" | "external_url", url: string) => void;
  /** Optional callback fired when a category folder is expanded or collapsed. */
  onCategoryToggle?: (category: string, action: "expand" | "collapse") => void;
  /** Replace the arrow shown at the end of each row. Default: lucide `ArrowUpRight`. */
  linkIcon?: ReactNode;
  /** Artwork for the category toggle, with the current expanded state. */
  folderIcon?: ComponentType<{ open: boolean; className?: string }>;
  /** Optional DOM id for the section container */
  id?: string;
  /** Additional classes for the container section */
  className?: string;
};

type CategoryGroup = { category: string; projects: ProjectExplorerItem[] };

const ALL_FILTER = "all";
const PINNED_FILTER = "pinned";
/** Matches the `min-h-11` row height. */
const ROW_HEIGHT = 44;
const PEEK_COUNT = 3;

function groupByCategory(projects: ProjectExplorerItem[]): CategoryGroup[] {
  const groups = new Map<string, ProjectExplorerItem[]>();
  const sorted = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  for (const project of sorted) {
    const category = project.category ?? "Other";
    const group = groups.get(category);
    if (group) group.push(project);
    else groups.set(category, [project]);
  }

  return [...groups].map(([category, projects]) => ({ category, projects }));
}

function matchesFilter(project: ProjectExplorerItem, filter: string) {
  if (filter === ALL_FILTER) return true;
  if (filter === PINNED_FILTER) return Boolean(project.featured);
  return project.category === filter;
}

function initialOpenCategories(groups: CategoryGroup[], mode: "all" | "first") {
  return Object.fromEntries(
    groups.map((group, index) => [group.category, mode === "all" || index === 0]),
  ) as Record<string, boolean>;
}

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

function FolderRows({
  category,
  count,
  maxVisibleRows,
  onScroll,
  onClose,
  children,
}: {
  category: string;
  count: number;
  maxVisibleRows?: number;
  onScroll: () => void;
  onClose: () => void;
  children: ReactNode;
}) {
  const [showAll, setShowAll] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const overflows = maxVisibleRows !== undefined && count > maxVisibleRows;
  const capped = overflows && !showAll;
  const fade = capped && !atEnd
    ? "linear-gradient(to bottom, #000 calc(100% - 3.5rem), transparent)"
    : undefined;

  return (
    <>
      <div
        onScroll={(event) => {
          const el = event.currentTarget;
          setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
          onScroll();
        }}
        className={cn(
          capped &&
            "overflow-y-auto [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]",
        )}
        style={
          capped
            ? {
                maxHeight: (maxVisibleRows + 0.5) * ROW_HEIGHT,
                maskImage: fade,
                WebkitMaskImage: fade,
              }
            : undefined
        }
      >
        <ul>{children}</ul>
      </div>
      {overflows && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-3 pt-2 pb-1 font-mono text-[10px] tracking-wider text-muted-foreground">
          <span aria-hidden={capped ? undefined : true}>
            {capped && !atEnd
              ? `Scroll for ${count - maxVisibleRows} more`
              : `All ${plural(count, "project")}`}
          </span>
          <span className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="min-h-6 cursor-pointer underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              {showAll ? "Fit in folder" : `Show all ${count}`}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-6 cursor-pointer items-center gap-1 transition-colors hover:text-foreground"
            >
              Close {category}
              <ChevronUp aria-hidden="true" className="size-3" />
            </button>
          </span>
        </div>
      )}
    </>
  );
}

export function ProjectExplorer({
  projects = defaultSampleProjects,
  title = "Featured Projects",
  showHeading = true,
  defaultOpen = "all",
  showHoverPreview = true,
  filterable = false,
  maxVisibleRows,
  id,
  onProjectClick,
  onCategoryToggle,
  linkIcon,
  folderIcon: FolderIcon = PaperFolderIcon,
  className,
}: ProjectExplorerProps) {
  const [activeProject, setActiveProject] = useState<ProjectExplorerItem | null>(null);
  const [filter, setFilter] = useState(ALL_FILTER);
  const headerRefs = useRef(new Map<string, HTMLButtonElement>());
  const panelIdBase = useId();

  const enabledProjects = useMemo(
    () => projects.filter((item) => item.enabled !== false),
    [projects],
  );

  const filterOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of enabledProjects) {
      if (project.category) {
        counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([category, count]) => ({ value: category, label: category, count }));
  }, [enabledProjects]);

  const pinnedCount = enabledProjects.filter((project) => project.featured).length;

  const projectsByCategory = useMemo(
    () => groupByCategory(enabledProjects.filter((project) => matchesFilter(project, filter))),
    [enabledProjects, filter],
  );

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() =>
    initialOpenCategories(groupByCategory(enabledProjects), defaultOpen),
  );

  const visibleCount = projectsByCategory.reduce((sum, group) => sum + group.projects.length, 0);
  const allOpen = projectsByCategory.every((group) => openCategories[group.category]);

  const applyFilter = useCallback(
    (next: string) => {
      setFilter(next);
      const groups = groupByCategory(enabledProjects.filter((project) => matchesFilter(project, next)));
      setOpenCategories(
        next === ALL_FILTER
          ? initialOpenCategories(groups, defaultOpen)
          : initialOpenCategories(groups, "all"),
      );
    },
    [enabledProjects, defaultOpen],
  );

  const setCategoryOpen = useCallback(
    (category: string, open: boolean) => {
      onCategoryToggle?.(category, open ? "expand" : "collapse");
      setOpenCategories((prev) => ({ ...prev, [category]: open }));
    },
    [onCategoryToggle],
  );

  const closeCategory = useCallback(
    (category: string) => {
      setCategoryOpen(category, false);
      const header = headerRefs.current.get(category);
      if (header && header.getBoundingClientRect().top < 0) {
        header.scrollIntoView({ block: "start", behavior: "smooth" });
      }
      header?.focus({ preventScroll: true });
    },
    [setCategoryOpen],
  );

  const filterLabel =
    filter === ALL_FILTER
      ? "All work"
      : filter === PINNED_FILTER
        ? "Pinned"
        : filter;

  const canHover = useSyncExternalStore(
    subscribeHoverCapability,
    getHoverSnapshot,
    getServerSnapshot,
  );
  const prefersReducedMotion = useReducedMotion();

  const springX = useSpring(0, { stiffness: 260, damping: 26, mass: 0.6 });
  const springY = useSpring(0, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const hide = () => setActiveProject(null);
    window.addEventListener("scroll", hide, { passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!showHoverPreview || !activeProject) return;
      const flip = event.clientX > window.innerWidth - PREVIEW_WIDTH - 48;
      springX.set(event.clientX + (flip ? -(PREVIEW_WIDTH + 24) : 24));
      springY.set(
        Math.max(
          16,
          Math.min(
            event.clientY - PREVIEW_HEIGHT / 2,
            window.innerHeight - PREVIEW_HEIGHT - 24,
          ),
        ),
      );
    },
    [springX, springY, showHoverPreview, activeProject],
  );

  const handlePreviewStart = useCallback(
    (project: ProjectExplorerItem, anchor?: DOMRect) => {
      if (!showHoverPreview) return;
      setActiveProject(project);
      if (anchor) {
        const flip = anchor.right > window.innerWidth - PREVIEW_WIDTH - 48;
        springX.set(
          flip ? anchor.left - PREVIEW_WIDTH - 16 : anchor.right + 16,
        );
        springY.set(
          Math.max(
            16,
            Math.min(anchor.top, window.innerHeight - PREVIEW_HEIGHT - 24),
          ),
        );
      }
    },
    [springX, springY, showHoverPreview],
  );

  const handlePreviewEnd = useCallback(() => setActiveProject(null), []);

  const showPreview = showHoverPreview && canHover && !prefersReducedMotion && Boolean(activeProject);

  const hasImage = Boolean(
    activeProject?.image && activeProject?.showImage !== false,
  );

  return (
    <section
      id={id}
      className={cn(showHeading && "border-t border-dashed", "pt-6", className)}
    >
      {showHeading ? (
        <h2 className="no-js-visible section-heading mb-3">
          {title}
        </h2>
      ) : null}

      {filterable && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 pb-3 sm:px-6">
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
            {plural(visibleCount, "project")} · {projectsByCategory.length} {projectsByCategory.length === 1 ? "category" : "categories"}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                setOpenCategories(
                  Object.fromEntries(projectsByCategory.map((group) => [group.category, !allOpen])),
                )
              }
              className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30"
            >
              <ChevronsUpDown aria-hidden="true" className="size-3.5" />
              {allOpen ? "Close all" : "Open all"}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label={`Filter projects: ${filterLabel}`}
                  className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-dashed px-3 text-xs text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 data-[state=open]:bg-muted/40 data-[state=open]:text-foreground"
                >
                  <ListFilter aria-hidden="true" className="size-3.5" />
                  <span className={cn(filter !== ALL_FILTER && "text-foreground")}>{filterLabel}</span>
                  <ChevronDown aria-hidden="true" className="size-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" theme="inherit" className="w-56">
                <DropdownMenuRadioGroup value={filter} onValueChange={applyFilter}>
                  <DropdownMenuRadioItem value={ALL_FILTER}>
                    All work
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                      {enabledProjects.length}
                    </span>
                  </DropdownMenuRadioItem>
                  {pinnedCount > 0 && (
                    <DropdownMenuRadioItem value={PINNED_FILTER}>
                      Pinned
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                        {pinnedCount}
                      </span>
                    </DropdownMenuRadioItem>
                  )}
                  {filterOptions.length > 0 && <DropdownMenuSeparator />}
                  {filterOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                      {option.label}
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                        {option.count}
                      </span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      <div
        className="flex flex-col gap-3 px-4 sm:px-6"
        onMouseMove={handleMouseMove}
        onMouseLeave={handlePreviewEnd}
      >
        {projectsByCategory.map((group) => {
          const isOpen = openCategories[group.category] ?? false;
          const panelId = `${panelIdBase}-${encodeURIComponent(group.category)}`;
          const peek = group.projects.slice(0, PEEK_COUNT).map((project) => project.title.split(" — ")[0]);
          const more = group.projects.length - peek.length;

          return (
            <div key={group.category}>
              <button
                ref={(node) => {
                  if (node) headerRefs.current.set(group.category, node);
                  else headerRefs.current.delete(group.category);
                }}
                type="button"
                onClick={() => setCategoryOpen(group.category, !isOpen)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={cn(
                  "group flex min-h-12 w-full cursor-pointer select-none items-center gap-1.5 rounded-md px-1 py-1 text-left transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40",
                  !isOpen && "ring-1 ring-inset ring-transparent hover:ring-border/60",
                )}
              >
                <FolderIcon
                  open={isOpen}
                  className="-rotate-6 transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:-rotate-12 motion-safe:group-focus-visible:-translate-y-0.5 motion-safe:group-focus-visible:-rotate-12 motion-reduce:rotate-0 motion-reduce:transition-none"
                />
                <span className="relative isolate shrink-0 -rotate-2 px-2.5 py-1 font-serif text-xl italic leading-none text-foreground transition-transform duration-200 motion-safe:group-hover:rotate-0 motion-safe:group-focus-visible:rotate-0 motion-reduce:rotate-0 motion-reduce:transition-none">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-muted/70"
                    style={{ clipPath: PAPER_EDGE }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 opacity-[0.08]"
                    style={{ ...PAPER_TEXTURE, clipPath: PAPER_EDGE }}
                  />
                  {group.category}
                </span>
                <span className="ml-1.5 shrink-0 font-mono text-[10px] tracking-wider text-muted-foreground">
                  {plural(group.projects.length, "project")}
                </span>
                {!isOpen && (
                  <span className="ml-3 min-w-0 flex-1 truncate text-xs text-muted-foreground/70 max-sm:hidden">
                    {peek.join(", ")}
                    {more > 0 && ` +${more} more`}
                  </span>
                )}
                <span className="ml-auto flex shrink-0 items-center gap-1 pl-2 text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
                  <span className="max-sm:hidden">{isOpen ? "Close" : "Open"}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-4 transition-transform duration-200 motion-reduce:transition-none",
                      isOpen && "rotate-180",
                    )}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="ml-2 overflow-hidden"
                  >
                    <FolderRows
                      key={filter}
                      category={group.category}
                      count={group.projects.length}
                      maxVisibleRows={maxVisibleRows}
                      onScroll={handlePreviewEnd}
                      onClose={() => closeCategory(group.category)}
                    >
                      {group.projects.map((project) => (
                        <WorkRow
                          key={project.id}
                          project={project}
                          onPreviewStart={handlePreviewStart}
                          onPreviewEnd={handlePreviewEnd}
                          showHoverPreview={showHoverPreview}
                          onProjectClick={onProjectClick}
                          linkIcon={linkIcon}
                        />
                      ))}
                    </FolderRows>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        {projectsByCategory.length === 0 && (
          <p className="px-1 py-6 text-center text-sm text-muted-foreground">
            Nothing here yet.
          </p>
        )}
      </div>

      <AnimatePresence>
        {showPreview && activeProject ? (
          <motion.div
            key={activeProject.id}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
            exit={{ opacity: 0, scale: 0.95, rotate: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: springX, y: springY }}
            className="pointer-events-none fixed left-0 top-0 z-50 w-[300px] drop-shadow-[2px_4px_6px_var(--border)]"
          >
            <div
              className="relative isolate bg-card p-3 text-card-foreground"
              style={{ clipPath: PAPER_EDGE }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
                style={PAPER_TEXTURE}
              />
              <div
                className={cn(
                  "relative overflow-hidden",
                  activeProject.imageSource === "github" ? "bg-white" : "bg-muted/40",
                )}
              >
                {hasImage ? (
                  <Image
                    src={activeProject.image!}
                    alt={activeProject.imageAlt ?? ""}
                    width={600}
                    height={338}
                    sizes="276px"
                    className={cn(
                      "aspect-video w-full",
                      activeProject.imageSource === "github"
                        ? "object-contain"
                        : "object-cover saturate-[0.7]",
                    )}
                  />
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center text-muted-foreground">
                    <ImageIcon aria-hidden="true" className="size-8 stroke-[1.25]" />
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply dark:mix-blend-screen"
                  style={PAPER_TEXTURE}
                />
              </div>
              <div className="flex items-start gap-3 pt-2">
                <div className="line-clamp-2 min-w-0 flex-1 font-serif text-lg italic leading-5">
                  {activeProject.title}
                </div>
                <span className="shrink-0 pt-1 font-mono text-[10px] text-muted-foreground">
                  {activeProject.imageSource === "github" ? "GitHub" : activeProject.category}
                </span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default ProjectExplorer;
