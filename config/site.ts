import { socialsConfig } from "@/config/socials";
import type {
  AboutGreetings,
  AboutItem,
  FooterConfig,
  PortfolioConfig,
  TrazoColophonConfig,
} from "@/config/types";

export const aboutGreetings: AboutGreetings = {
  morning: "Good morning !",
  afternoon: "Good afternoon !",
  evening: "Good evening !",
};

export const aboutItems: AboutItem[] = [
  {
    id: "build",
    lead: "I'm Anju. I build AI assistants",
    illustration: "browser",
    body: "and developer tools, from local document search to a Git-inspired platform backed by AWS S3.",
  },
  {
    id: "share",
    lead: "I'm studying computer science and engineering",
    illustration: "notebook",
    body: "at VIT-AP, where I have an 8.80/10 CGPA. I was an AI engineering intern at Radialrust Technologies and a product design and simulation intern at Tech To Green.",
  },
  {
    id: "learn",
    lead: "Beyond coursework,",
    illustration: "plane",
    body: "I've led research at NextGen Club, hosted NASA Space Apps Challenge in Amaravati, and solved 240+ LeetCode problems in Java.",
  },
];

export const footerConfig: FooterConfig = {
  quote: "AI assistants, developer tools, and full-stack software.",
  attribution: "Anju Singh",
  credit: "Anju Singh · Portfolio",
  contact: {
    lead: "Get in touch: email me at",
    email: "anjusinghno@gmail.com",
    after: "or follow me via my social links.",
  },
  showDiscordStatus: false,
  showColophon: false,
  showVisitorCounter: false,
  artwork: {
    src: "/images/footer-garden-strip.webp",
    width: 1264,
    height: 600,
  },
};

export const trazoColophonConfig: TrazoColophonConfig = {
  label: "Explore the Trazo sticker library",
  ctaLabel: "Explore Trazo",
  href: "https://trazo.akoder.xyz/library",
};

/** Schema.org Person data rendered as JSON-LD in the root layout. */
export const structuredDataConfig = {
  jobTitle: "AI & Software Engineering",
  knowsAbout: ["Python", "TypeScript", "React", "Node.js", "LangChain", "LangGraph", "Retrieval-augmented generation"],
  sameAs: socialsConfig
    .filter((social) => social.action === "external" && social.href)
    .map((social) => social.href!),
  image: "/anju-singh.webp",
};

const siteUrl = "https://anjusingh.space";

export const siteConfig: PortfolioConfig = {
  meta: {
    url: siteUrl,
    title: "Anju Singh | AI & Software Engineering",
    titleTemplate: "%s | Anju Singh",
    shortTitle: "Anju Singh",
    description:
      "Anju Singh studies computer science at VIT-AP and builds AI assistants, automation workflows, and developer tools.",
    keywords: [
      "Anju Singh",
      "anjusinghn",
      "AI tutor",
      "AI engineer",
      "LangGraph",
      "Next.js",
      "TypeScript",
      "India",
    ],
    authors: [{ name: "Anju Singh", url: siteUrl }],
    creator: "Anju Singh",
    publisher: "Anju Singh",
    classification: "Portfolio",
    category: "technology",
    locale: "en_US",
    ogImage: {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Anju Singh | AI & Software Engineering",
    },
    twitterCreator: "",
    icon: "/favicon.png",
    appleIcon: "/favicon.png",
    googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    manifest: {
      name: "Anju Singh | AI & Software Engineering",
      short_name: "Anju Singh",
      description: "Anju Singh’s portfolio of AI assistants, automation workflows, and developer tools.",
      start_url: "/",
      display: "standalone",
      background_color: "#fafafa",
      theme_color: "#18181b",
      icons: [{ src: "/favicon.png", sizes: "any", type: "image/png" }],
    },
    robots: {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    },
    sitemap: [
      { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ],
  },
  personal: {
    fullName: "Anju Singh",
    firstName: "Anju",
    avatar: {
      src: "/anju-singh.webp",
      alt: "Anju Singh",
      fallback: "AS",
    },
    location: {
      label: "India",
      timeZone: "Asia/Kolkata",
    },
    githubUsername: "anjusinghn",
  },
  sectionOrder: [
    "projects",
    "opensource",
    "socials",
    "skills",
    "about",
    "experience",
    "github",
  ],
  sectionFlags: {
    socials: true,
    skills: true,
    components: false,
    about: true,
    testimonials: false,
    projects: true,
    bookmarks: false,
    bookshelf: false,
    certifications: false,
    insights: false,
    sponsors: false,
    experience: true,
    services: false,
    workflow: false,
    github: true,
    contact: false,
    opensource: true,
  },
  sectionLabels: {
    github: "GitHub",
    opensource: "Open source",
    projects: "Work",
    skills: "Stack",
  },
  banner: {
    imageSrc: "/images/profile-banner-cutout.webp",
    imageAlt: "Paper cutouts of a keyboard, notebook, paper plane, and coffee cup",
    openSourceUrl: "https://github.com/anjusinghn",
    openSourceTooltip: "anjusinghn on GitHub",
    themeToggleLabel: "Toggle theme",
    themeShortcut: "D",
    themeTooltip: "Toggle theme",
    switchAudioSrc: "/switch.mp3",
  },
  about: {
    title: "Hello there !",
    body: aboutItems.map(({ lead, body }) => `${lead} ${body}`).join(" "),
  },
  services: {
    title: "What I build",
    items: [],
  },
  workflow: {
    title: "How I work",
    items: [],
  },
  contact: {
    title: "Get in touch",
    description: "Email me or follow me via my social links.",
    pricing: [],
    channels: socialsConfig.filter((item) =>
      ["email", "github", "linkedin"].includes(item.id),
    ),
  },
  bookmarks: {
    title: "Bookmarks",
    items: [],
  },
  certifications: {
    title: "Certificates",
    items: [],
  },
};
