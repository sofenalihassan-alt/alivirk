import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import portrait from "@/assets/ali-hassan-suit-portrait.webp.asset.json";
import { site } from "@/lib/site";

/** Unframed photographic cover, with a restrained frosted caption. */
export function HeroObject() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div ref={ref} className="portrait-cover relative size-full">
      <motion.img
        src={portrait.url}
        alt="Ali Hassan in a black three-piece suit, white shirt and tinted glasses"
        width={1168}
        height={1346}
        fetchPriority="high"
        className="size-full object-cover object-top"
        style={reduced ? {} : { scale }}
      />
      {!reduced && <div className="portrait-sweep pointer-events-none absolute inset-0" aria-hidden="true" />}
      <div className="portrait-cover-mask pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="portrait-caption glass-lens absolute rounded-sm px-5 py-4">
        <p className="flex items-center gap-2 text-xs text-foreground">
          <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
          ICT Apprentice · FFC Port Qasim
        </p>
        <p className="mt-2 text-xs text-muted-foreground">{site.location} <span className="mx-2 text-gold">/</span> {site.role}</p>
      </div>
    </div>
  );
}