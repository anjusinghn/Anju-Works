import { profile } from "./profile";

export type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  repositories: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    title: "Distributed Version Control Platform",
    category: "Full-stack engineering",
    description:
      "A Git-style platform for repositories, issues, and commit history. The React interface connects to an Express API with JWT authentication, MongoDB, and S3-backed push, pull, and revert workflows.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "AWS S3", "JWT"],
    repositories: [
      { label: "Frontend", url: profile.github + "/distributed-vcs-frontend" },
      { label: "Backend", url: profile.github + "/distributed-vcs-backend" },
    ],
  },
  {
    title: "Agentic GitHub Intelligence Platform",
    category: "Developer tools",
    description:
      "GitHub agents that summarize repositories, triage issues, and draft release notes. An MCP server makes tools available to other agents over A2A, with human approval for multi-step actions.",
    technologies: ["Python", "LangGraph", "MCP", "GitHub API", "A2A", "Ollama"],
    repositories: [
      { label: "GitHub", url: profile.github + "/agentic-github-intelligence-platform" },
    ],
  },
  {
    title: "AI HR Recruitment Assistant",
    category: "Applied AI",
    description:
      "A local LLM assistant that searches HR policies, checks eligibility, and calculates experience. It extracts names, skills, and experience from résumés into a Pydantic schema.",
    technologies: ["Python", "LangChain", "Ollama", "FAISS", "RAG", "Pydantic"],
    repositories: [{ label: "GitHub", url: profile.github + "/AI_HR_Assistant" }],
  },
  {
    title: "Multi-Agent Customer Support Automation",
    category: "Workflow automation",
    description:
      "A system that classifies and routes support requests using knowledge-base retrieval and SQLite memory. A supervisor agent and human review handle decisions such as refunds and escalations.",
    technologies: ["Python", "LangGraph", "LangChain", "SQLite", "RAG"],
    repositories: [
      { label: "GitHub", url: profile.github + "/multi-agent-customer-support-automation" },
    ],
  },
];
