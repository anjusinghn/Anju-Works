import type { Project } from "@/config/types";

export const projectsSectionConfig = {
  title: "Work",
  liveButtonLabel: "Live site",
  sourceButtonLabel: "Source code",
  caseStudyButtonLabel: "Read the case study",
  /** Which year folders start expanded on the home page. */
  defaultOpen: "latest" as "all" | "latest",
  /** Rows shown in an open year before the rest scroll inside the folder. */
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
    "year": 2026,
    "order": 1,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "Developer tools",
    "image": "/images/projects/distributed-version-control.webp",
    "imageAlt": "Distributed Version Control repository preview",
    "imageSource": "github",
    "content": "### The challenge\n\nHow much of a version control system can you reconstruct from first principles? This project follows a file from local staging through a commit snapshot to a hosted repository.\n\n### How it works\n\nAn Express API and MongoDB handle accounts, repository metadata, and issues. AWS S3 stores the snapshots exchanged by push and pull. A separate React interface lets users browse repositories and inspect history.\n\n- Initialize a local repository and stage changes before committing.\n- Restore historical snapshots and synchronize them with remote storage.\n- Use JWT-authenticated routes for repository management.\n\n[GitHub frontend repository](https://github.com/anjusinghn/distributed-vcs-frontend)"
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
    "year": 2026,
    "order": 2,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "Developer tools",
    "image": "/images/projects/github-intelligence.webp",
    "imageAlt": "Agentic GitHub Intelligence repository preview",
    "imageSource": "github",
    "content": "### The challenge\n\nFinding the context for an issue or a release often means moving between multiple GitHub views. This project explores bringing those reads and summaries into one assistant.\n\n### How it works\n\nLangGraph coordinates GitHub REST API calls and an Ollama model. An MCP server exposes tools, resources, and prompts for external agents, alongside an A2A integration and human approval for multi-step actions.\n\n- Summarize repository activity using GitHub data.\n- Triage issues and draft release notes.\n- Expose reusable tools for other agents."
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
    "year": 2026,
    "order": 3,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "AI",
    "image": "/images/projects/hr-assistant.webp",
    "imageAlt": "AI HR Recruitment Assistant repository preview",
    "imageSource": "github",
    "content": "### The challenge\n\nHR questions span both unstructured policy documents and tasks with concrete inputs, such as checking whether a résumé meets a set of requirements.\n\n### How it works\n\nA LangChain agent retrieves passages from a local FAISS index and calls task-specific tools. Ollama runs the model locally, and Pydantic defines the fields returned by résumé extraction.\n\n- Search handbooks, leave policies, and job descriptions.\n- Extract candidate names, experience, and skills into a defined schema.\n- Calculate experience and check eligibility against required skills."
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
    "year": 2026,
    "order": 4,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "AI",
    "image": "/images/projects/customer-support-automation.webp",
    "imageAlt": "Multi-Agent Customer Support repository preview",
    "imageSource": "github",
    "content": "### The challenge\n\nA single support inbox mixes sales questions, billing issues, and requests such as refunds. Each needs a different answer, and some need explicit approval.\n\n### How it works\n\nLangGraph classifies the request and routes it to a specialist. The specialist retrieves supporting material from the knowledge base, while SQLite keeps the conversation history and a supervisor reviews responses.\n\n- Route sales, technical support, billing, and account requests.\n- Retrieve knowledge-base passages with TF-IDF search.\n- Pause for approval on refunds, cancellations, or escalations."
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
    "year": 2026,
    "order": 5,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "AI",
    "image": "/images/projects/product-recommender.webp",
    "imageAlt": "AI Product Recommender repository preview",
    "imageSource": "github",
    "content": "### The challenge\n\nA shopper may describe a budget and a preference in one sentence. This demo explores how to turn that input into a shortlist with clear reasoning.\n\n### How it works\n\nA React interface sends preferences to a serverless endpoint. The endpoint validates the model’s recommendations against real catalog IDs. A labeled local fallback handles basic price, brand, and category matching when the model is unavailable.\n\n- Accept plain-language queries alongside sample searches.\n- Show the reasoning behind ranked recommendations.\n- Keep the product finder usable when the API is unavailable."
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
    "year": 2026,
    "order": 6,
    "featured": true,
    "status": "shipped",
    "enabled": true,
    "category": "AI",
    "image": "/images/projects/smart-resume-screener.webp",
    "imageAlt": "Smart Résumé Screener repository preview",
    "imageSource": "github",
    "content": "### The challenge\n\nReviewing a batch of résumés is time-consuming, and a raw match score gives reviewers little context for evaluating a shortlist.\n\n### How it works\n\nThe app extracts PDF text, combines constrained model output with rule-based checks, and streams progress to a Next.js dashboard. The scoring rules are designed to credit skills that appear explicitly in the résumé.\n\n- Screen a batch against a defined requisition.\n- Break down scores by skills, experience, résumé quality, and fit.\n- Inspect the ranked list and individual candidate details."
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
    "year": 2025,
    "order": 7,
    "enabled": true,
    "status": "shipped",
    "category": "Full stack"
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
    "year": 2025,
    "order": 8,
    "enabled": true,
    "status": "shipped",
    "category": "Full stack"
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
    "year": 2024,
    "order": 9,
    "enabled": true,
    "status": "shipped",
    "category": "Full stack"
  }
];
