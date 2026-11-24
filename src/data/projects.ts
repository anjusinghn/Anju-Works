import { profile } from "./profile";

export type Project = {
  id: string;
  title: string;
  category: "Developer tools" | "Applied AI";
  description: string;
  technologies: string[];
  repositories: { label: string; url: string }[];
  liveUrl?: string;
  challenge: string;
  approach: string;
  highlights: string[];
};

const repo = (name: string, label = "GitHub") => ({ label, url: profile.github + "/" + name });

export const projects: Project[] = [
  {
    id: "distributed-version-control",
    title: "Distributed Version Control",
    category: "Developer tools",
    description: "A Git-inspired platform for staging files, committing snapshots, and synchronizing repositories with AWS S3.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "AWS S3", "JWT"],
    repositories: [repo("distributed-vcs-frontend", "Frontend"), repo("distributed-vcs-backend", "Backend")],
    challenge: "How much of a version control system can you reconstruct from first principles? This project follows a file from local staging through a commit snapshot to a hosted repository.",
    approach: "An Express API and MongoDB handle accounts, repository metadata, and issues. AWS S3 stores the snapshots exchanged by push and pull. A separate React interface lets users browse repositories and inspect history.",
    highlights: ["Initialize a local repository and stage changes before committing.", "Restore historical snapshots and synchronize them with remote storage.", "Use JWT-authenticated routes for repository management."],
  },
  {
    id: "github-intelligence",
    title: "Agentic GitHub Intelligence",
    category: "Developer tools",
    description: "A GitHub assistant for repository summaries, issue triage, and release-note drafts, with approval for multi-step actions.",
    technologies: ["Python", "LangGraph", "MCP", "GitHub API", "A2A", "Ollama"],
    repositories: [repo("agentic-github-intelligence-platform")],
    challenge: "Finding the context for an issue or a release often means moving between multiple GitHub views. This project explores bringing those reads and summaries into one assistant.",
    approach: "LangGraph coordinates GitHub REST API calls and an Ollama model. An MCP server exposes tools, resources, and prompts for external agents, alongside an A2A integration and human approval for multi-step actions.",
    highlights: ["Summarize repository activity using GitHub data.", "Triage issues and draft release notes.", "Expose reusable tools for other agents."],
  },
  {
    id: "hr-assistant",
    title: "AI HR Recruitment Assistant",
    category: "Applied AI",
    description: "A local assistant that looks up HR policies and extracts structured information from résumés.",
    technologies: ["Python", "LangChain", "Ollama", "FAISS", "RAG", "Pydantic"],
    repositories: [repo("AI_HR_Assistant")],
    challenge: "HR questions span both unstructured policy documents and tasks with concrete inputs, such as checking whether a résumé meets a set of requirements.",
    approach: "A LangChain agent retrieves passages from a local FAISS index and calls task-specific tools. Ollama runs the model locally, and Pydantic defines the fields returned by résumé extraction.",
    highlights: ["Search handbooks, leave policies, and job descriptions.", "Extract candidate names, experience, and skills into a defined schema.", "Calculate experience and check eligibility against required skills."],
  },
  {
    id: "customer-support-automation",
    title: "Multi-Agent Customer Support",
    category: "Applied AI",
    description: "A support workflow that routes requests to specialist agents and pauses for human review when a decision needs it.",
    technologies: ["Python", "LangGraph", "LangChain", "SQLite", "RAG"],
    repositories: [repo("multi-agent-customer-support-automation")],
    challenge: "A single support inbox mixes sales questions, billing issues, and requests such as refunds. Each needs a different answer, and some need explicit approval.",
    approach: "LangGraph classifies the request and routes it to a specialist. The specialist retrieves supporting material from the knowledge base, while SQLite keeps the conversation history and a supervisor reviews responses.",
    highlights: ["Route sales, technical support, billing, and account requests.", "Retrieve knowledge-base passages with TF-IDF search.", "Pause for approval on refunds, cancellations, or escalations."],
  },
  {
    id: "product-recommender",
    title: "AI Product Recommender",
    category: "Applied AI",
    description: "A product finder that turns plain-language preferences into ranked picks from a small catalog.",
    technologies: ["React", "Vite", "OpenAI", "Groq", "Vercel"],
    repositories: [repo("product-recommender-ai")],
    liveUrl: "https://product-recommender-ai-ochre.vercel.app",
    challenge: "A shopper may describe a budget and a preference in one sentence. This demo explores how to turn that input into a shortlist with clear reasoning.",
    approach: "A React interface sends preferences to a serverless endpoint. The endpoint validates the model’s recommendations against real catalog IDs. A labeled local fallback handles basic price, brand, and category matching when the model is unavailable.",
    highlights: ["Accept plain-language queries alongside sample searches.", "Show the reasoning behind ranked recommendations.", "Keep the product finder usable when the API is unavailable."],
  },
  {
    id: "smart-resume-screener",
    title: "Smart Résumé Screener",
    category: "Applied AI",
    description: "A prototype that compares batches of PDF résumés against a job requisition and shows how each score was calculated.",
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL"],
    repositories: [repo("triage")],
    liveUrl: "https://anju-smart-screener.vercel.app",
    challenge: "Reviewing a batch of résumés is time-consuming, and a raw match score gives reviewers little context for evaluating a shortlist.",
    approach: "The app extracts PDF text, combines constrained model output with rule-based checks, and streams progress to a Next.js dashboard. The scoring rules are designed to credit skills that appear explicitly in the résumé.",
    highlights: ["Screen a batch against a defined requisition.", "Break down scores by skills, experience, résumé quality, and fit.", "Inspect the ranked list and individual candidate details."],
  },
];
