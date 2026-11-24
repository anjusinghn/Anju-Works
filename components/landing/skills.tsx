import { skillsConfig, skillsSectionConfig } from "@/config/skills";
import type { SkillIcon, SkillItem } from "@/config/types";
import { cn } from "@/lib/utils";
import NextjsIcon from "@/public/stacks/nextjs";
import PrismaIcon from "@/public/stacks/prisma";
import ReactIcon from "@/public/stacks/react";
import ShadcnIcon from "@/public/stacks/shadcn";
import TSIcon from "@/public/stacks/ts";
import JSIcon from "@/public/stacks/js";
import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  SiApachekafka,
  SiDocker,
  SiElevenlabs,
  SiExpress,
  SiGo,
  SiHono,
  SiLangchain,
  SiLanggraph,
  SiLivekit,
  SiModelcontextprotocol,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiTauri,
  SiThreedotjs,
  SiWebrtc,
} from "react-icons/si";

/** Brand marks without a color follow the text color, so they read in both themes. */
function brand(Icon: IconType, color?: string) {
  function BrandIcon({ size }: { size: string }) {
    return <Icon size={size} color={color} aria-hidden="true" />;
  }
  return BrandIcon;
}

const skillIconMap: Record<SkillIcon, ComponentType<{ size: string }>> = {
  typescript: TSIcon,
  javascript: JSIcon,
  python: brand(SiPython, "#3776AB"),
  go: brand(SiGo, "#00ADD8"),
  nextjs: NextjsIcon,
  react: ReactIcon,
  tauri: brand(SiTauri, "#24C8D8"),
  threejs: brand(SiThreedotjs),
  shadcn: ShadcnIcon,
  nodejs: brand(SiNodedotjs, "#5FA04E"),
  express: brand(SiExpress),
  hono: brand(SiHono, "#E36002"),
  prisma: PrismaIcon,
  postgres: brand(SiPostgresql, "#4169E1"),
  redis: brand(SiRedis, "#FF4438"),
  kafka: brand(SiApachekafka),
  webrtc: brand(SiWebrtc, "#3A8DDE"),
  docker: brand(SiDocker, "#2496ED"),
  aws: brand(FaAws, "#FF9900"),
  langchain: brand(SiLangchain),
  langgraph: brand(SiLanggraph),
  openai: brand(SiOpenai),
  livekit: brand(SiLivekit),
  elevenlabs: brand(SiElevenlabs),
  mcp: brand(SiModelcontextprotocol),
};

const enabledSkills = skillsConfig
  .filter((skill) => skill.enabled !== false)
  .sort((a, b) => a.order - b.order);

function SkillChip({ skill }: { skill: SkillItem }) {
  const Icon = skillIconMap[skill.icon];

  // Deliberately no hover:/focus-visible: styles here. These chips are labels,
  // not controls: there is nothing to click and nothing to focus (a div with
  // no tabIndex can never receive focus, so a focus ring is unreachable CSS).
  // Styling them like interactive filter chips made users click them, which
  // PostHog then recorded as $dead_click. If these ever become filters or
  // links, restore the affordances along with the handler.
  const chipClasses =
    "no-js-visible inline-flex items-center gap-1.5 rounded-lg border border-dashed px-3 py-1 text-sm text-muted-foreground";

  return (
    <div className={chipClasses} aria-label={skill.name}>
      <Icon size="18" />
      <span className="font-medium">{skill.name}</span>
    </div>
  );
}

export function Skills() {
  const skills = enabledSkills;
  const categories = skillsSectionConfig.categories;

  return (
    <section className="border-t border-dashed pt-6">
      <h2 className="no-js-visible section-heading">
        {skillsSectionConfig.title}
      </h2>
      {categories.map((category, groupIndex) => {
        const categorySkills = skills.filter(
          (skill) => skill.category === category.id,
        );

        if (categorySkills.length === 0) return null;

        return (
          <div
            key={category.id}
            className={cn(
              "flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-6 px-6 py-3.5 border-b",
              groupIndex === 3 ? "border-none" : "",
            )}
          >
            <span className="shrink-0 w-36 font-mono text-xs tracking-wider text-muted-foreground">
              {`0${groupIndex + 1}`.padStart(2, "0") + " " + category.label}
            </span>

            <div className="flex flex-wrap gap-2 flex-1">
              {categorySkills.map((skill) => (
                <SkillChip key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
