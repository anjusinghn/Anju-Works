import type { Project } from "@/config/types";

export const projectsSectionConfig = {
  title: "Work",
  liveButtonLabel: "Live site",
  sourceButtonLabel: "Source code",
  /** Rows shown in an open category before the rest scroll inside the folder. */
  maxVisibleRows: 7,
};

export const projectsConfig: Project[] = [
  {
    "id": "distributed-version-control",
    "title": "Distributed Version Control",
    "tagline": "Git-inspired repository hosting",
    "description": "A Git-inspired platform for staging files, committing snapshots, and synchronizing repositories with AWS S3.",
    "githubUrl": "https://github.com/anjusinghn/distributed-vcs-backend",
    "tags": [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "AWS S3",
      "JWT"
    ],
    "order": 1,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "Developer tools",
    "image": "/images/projects/distributed-version-control.webp",
    "imageAlt": "Distributed Version Control repository preview",
    "imageSource": "github"
  },
  {
    "id": "github-intelligence",
    "title": "Agentic GitHub Intelligence",
    "tagline": "Repository insights and issue triage",
    "description": "A GitHub assistant for repository summaries, issue triage, and release-note drafts, with approval for multi-step actions.",
    "githubUrl": "https://github.com/anjusinghn/agentic-github-intelligence-platform",
    "tags": [
      "Python",
      "LangGraph",
      "MCP",
      "GitHub API",
      "A2A",
      "Ollama"
    ],
    "order": 2,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "Developer tools",
    "image": "/images/projects/github-intelligence.webp",
    "imageAlt": "Agentic GitHub Intelligence repository preview",
    "imageSource": "github"
  },
  {
    "id": "hr-assistant",
    "title": "AI HR Recruitment Assistant",
    "tagline": "Local policy search and résumé extraction",
    "description": "A local assistant that looks up HR policies and extracts structured information from résumés.",
    "githubUrl": "https://github.com/anjusinghn/AI_HR_Assistant",
    "tags": [
      "Python",
      "LangChain",
      "Ollama",
      "FAISS",
      "RAG",
      "Pydantic"
    ],
    "order": 3,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "Applied AI",
    "image": "/images/projects/hr-assistant.webp",
    "imageAlt": "AI HR Recruitment Assistant repository preview",
    "imageSource": "github"
  },
  {
    "id": "customer-support-automation",
    "title": "Multi-Agent Customer Support",
    "tagline": "Agent routing with human approvals",
    "description": "A support workflow that routes requests to specialist agents and pauses for human review when a decision needs it.",
    "githubUrl": "https://github.com/anjusinghn/multi-agent-customer-support-automation",
    "tags": [
      "Python",
      "LangGraph",
      "LangChain",
      "SQLite",
      "RAG"
    ],
    "order": 4,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "Applied AI",
    "image": "/images/projects/customer-support-automation.webp",
    "imageAlt": "Multi-Agent Customer Support repository preview",
    "imageSource": "github"
  },
  {
    "id": "product-recommender",
    "title": "AI Product Recommender",
    "tagline": "Plain-language shopping recommendations",
    "description": "A product finder that turns plain-language preferences into ranked picks from a small catalog.",
    "githubUrl": "https://github.com/anjusinghn/product-recommender-ai",
    "liveUrl": "https://product-recommender-ai-ochre.vercel.app",
    "tags": [
      "React",
      "Vite",
      "OpenAI",
      "Groq",
      "Vercel"
    ],
    "order": 5,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "Applied AI",
    "image": "/images/projects/product-recommender.webp",
    "imageAlt": "AI Product Recommender repository preview",
    "imageSource": "github"
  },
  {
    "id": "smart-resume-screener",
    "title": "Smart Résumé Screener",
    "tagline": "Batch screening with explainable scores",
    "description": "A prototype that compares batches of PDF résumés against a job requisition and shows how each score was calculated.",
    "githubUrl": "https://github.com/anjusinghn/triage",
    "liveUrl": "https://anju-smart-screener.vercel.app",
    "tags": [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL"
    ],
    "order": 6,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "Applied AI",
    "image": "/images/projects/smart-resume-screener.webp",
    "imageAlt": "Smart Résumé Screener repository preview",
    "imageSource": "github"
  },
  {
    "id": "stonksy",
    "title": "Stonksy",
    "tagline": "Full-stack trading website",
    "description": "A trading website with a separate frontend and backend.",
    "githubUrl": "https://github.com/anjusinghn/stonksy",
    "tags": [
      "JavaScript"
    ],
    "order": 7,
    "enabled": true,
    "status": "shipped",
    "category": "Full-stack"
  },
  {
    "id": "wanderlust",
    "title": "Wanderlust",
    "tagline": "Travel listings web app",
    "description": "Travel listings built with Express, MongoDB, and EJS, using an MVC architecture.",
    "githubUrl": "https://github.com/anjusinghn/Wanderlust",
    "tags": [
      "Node.js",
      "Express",
      "MongoDB",
      "EJS"
    ],
    "order": 8,
    "enabled": true,
    "status": "shipped",
    "category": "Full-stack"
  },
  {
    "id": "besafe",
    "title": "BeSafe",
    "tagline": "Women’s safety project",
    "description": "A women’s safety module built with TypeScript.",
    "githubUrl": "https://github.com/anjusinghn/BeSafe",
    "tags": [
      "TypeScript"
    ],
    "order": 9,
    "enabled": true,
    "status": "shipped",
    "category": "Full-stack"
  }
];
