import type { ExperienceItem } from "@/config/types";

export const experienceSectionConfig = { title: "Experience" };

export const experienceConfig: ExperienceItem[] = [
  {
    id: "radialrust",
    role: "AI Engineer Intern",
    company: "Radialrust Technologies",
    period: "May – June 2026",
    summary: "Built AI workflows for HR knowledge retrieval and automation.",
    highlights: [
      "Built Python, LangChain, and Ollama workflows that answer questions about internal documents.",
      "Used FAISS for semantic search and function calling for structured actions.",
    ],
    order: 1,
    enabled: true,
  },
  {
    id: "tech-to-green",
    role: "Industrial Product Design & Simulation Intern",
    company: "Tech To Green Drone & Robotics",
    period: "June – July 2025",
    summary: "Designed and simulated engineering prototypes in Fusion 360.",
    highlights: [
      "Modeled an AI-enabled Smart Safety Helmet through iterative prototyping.",
      "Prepared technical reports and presentations for MSME Idea Hackathon 5.0.",
    ],
    order: 2,
    enabled: true,
  },
];
