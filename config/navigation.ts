import type { SiteNavigationItem } from "@/config/types";

export const navigationConfig = {
  label: "Site navigation",
  menu: "Menu",
  close: "Close navigation",
  search: "Open command palette",
  backToTop: "Back to top",
  githubLabel: "anjusinghn on GitHub (opens in a new tab)",
};

export const navigationItems: SiteNavigationItem[] = [
  { id: "home", label: "Home", href: "/", icon: "home", order: 0 },
  { id: "work", label: "Work", href: "/#projects", icon: "stack", order: 1 },
  { id: "best-work", label: "Best work", href: "/#accelute", icon: "sparkles", order: 2 },
  { id: "writing", label: "Case studies", href: "/#writing", icon: "testimonial", order: 3 },
];
