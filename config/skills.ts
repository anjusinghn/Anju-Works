import type { SkillCategoryConfig, SkillIcon, SkillItem } from "@/config/types";

export const skillsSectionConfig = {
  title: "Stack",
  categories: [
    { id: "language", label: "Language" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "workflow-ai", label: "AI & Automation" },
  ] as SkillCategoryConfig[],
};

const stack: Record<SkillItem["category"], [SkillIcon, string][]> = {
  language: [
    ["typescript", "TypeScript"],
    ["javascript", "JavaScript"],
    ["python", "Python"],
  ],
  frontend: [
    ["nextjs", "Next.js"],
    ["react", "React"],
  ],
  backend: [
    ["nodejs", "Node.js"],
    ["express", "Express"],
    ["prisma", "Prisma"],
    ["postgres", "PostgreSQL"],
    ["docker", "Docker"],
    ["aws", "AWS"],
  ],
  "workflow-ai": [
    ["langchain", "LangChain"],
    ["langgraph", "LangGraph"],
    ["openai", "OpenAI"],
    ["mcp", "MCP"],
  ],
};

export const skillsConfig: SkillItem[] = Object.entries(stack).flatMap(
  ([category, items]) =>
    items.map(([icon, name]) => ({
      id: icon,
      name,
      icon,
      category: category as SkillItem["category"],
      order: 0,
      enabled: true,
    })),
).map((skill, index) => ({ ...skill, order: index + 1 }));
