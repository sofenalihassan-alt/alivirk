import { Code2, Plus } from "lucide-react";
import type { Project } from "@/data/projects";
import { SkillServeMockup } from "./SkillServeMockup";
import { cn } from "@/lib/utils";

/** Visual preview for a project card. Real previews are built in code; placeholders are labelled. */
export function ProjectPreview({ project, className }: { project: Project; className?: string | undefined }) {
  if (project.preview === "skillserve") {
    return <SkillServeMockup className={className} />;
  }
  if (project.preview === "portfolio") {
    return (
      <div className={cn("glass relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl", className)} aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.79_0.09_85/20%),transparent_55%)]" />
        <div className="relative text-center">
          <p className="font-serif text-6xl italic text-gold">AH</p>
          <p className="eyebrow mt-2 text-[0.6rem]">Midnight Digital Universe</p>
        </div>
        <div className="motion-safe-anim absolute size-[70%] rounded-full border border-gold/20 [animation:orbit-a_30s_linear_infinite]" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl border border-dashed border-hairline bg-[repeating-linear-gradient(135deg,oklch(1_0_0/3%)_0_12px,transparent_12px_24px)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <span className="grid size-12 place-items-center rounded-full border border-dashed border-gold/50 text-gold">
          <Plus className="size-5" />
        </span>
        <span className="flex items-center gap-1.5 text-xs"><Code2 className="size-3.5" /> Preview coming soon</span>
      </div>
    </div>
  );
}
