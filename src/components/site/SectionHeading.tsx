import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  intro,
  className,
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: ReactNode;
  className?: string | undefined;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <p className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center")}>
          {index && <span className="text-gold">{index}</span>}
          <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="section-title mt-5 font-medium leading-[1.12]">
        <SplitText text={title} />
        {accent && (
          <>
            {" "}
            <SplitText text={accent} delay={0.15} wordClassName="font-serif italic font-normal tracking-normal text-gold" />
          </>
        )}
      </h2>
      {intro && (
        <Reveal delay={0.1}>
          <div className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</div>
        </Reveal>
      )}
    </div>
  );
}
