import type { SocialLink } from "@/config/types";

export const socialSectionConfig = {
  title: "Socials",
};

export const socialsConfig: SocialLink[] = [
  {
    id: "github",
    platform: "GitHub",
    handle: "@anjusinghn",
    href: "https://github.com/anjusinghn",
    icon: "github",
    action: "external",
    order: 1,
    enabled: true,
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    handle: "in/anjusinghn",
    href: "https://www.linkedin.com/in/anjusinghn",
    icon: "linkedin",
    action: "external",
    tooltipDefault: "Connect on LinkedIn",
    order: 2,
    enabled: true,
  },
  {
    id: "email",
    platform: "Email",
    handle: "anjusinghno@gmail.com",
    href: "mailto:anjusinghno@gmail.com",
    icon: "gmail",
    action: "mailto",
    tooltipDefault: "Send email",
    order: 5,
    enabled: true,
  },
];
