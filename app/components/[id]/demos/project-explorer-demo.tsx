"use client";

import {
  ProjectExplorer,
  type ProjectExplorerProps,
} from "@/components/project-explorer";

/**
 * Which category starts expanded and whether the hover preview follows the cursor
 * are props now, driven by the detail page's props panel. The heading stays
 * hidden because the showcase shell already labels the preview, and both props
 * fall back to the values this demo always rendered.
 */
export function ProjectExplorerDemo({
  defaultOpen = "first",
  showHoverPreview = true,
}: Partial<ProjectExplorerProps> = {}) {
  return (
    <div className="w-full max-w-2xl">
      <ProjectExplorer
        showHeading={false}
        defaultOpen={defaultOpen}
        showHoverPreview={showHoverPreview}
      />
    </div>
  );
}
