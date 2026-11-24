import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

/** Animated monogram + name. The gold ring draws itself on load. */
export function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Ali Hassan — home">
      <span className="relative grid size-10 place-items-center">
        <svg viewBox="0 0 40 40" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
          <circle cx="20" cy="20" r="18.5" fill="none" stroke="var(--hairline)" strokeWidth="1" />
          <motion.circle
            cx="20"
            cy="20"
            r="18.5"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 0.72 }}
            transition={{ duration: 1.8, delay: 1.2, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>
        <span className="font-serif text-lg italic text-gold transition-transform duration-500 group-hover:scale-110">
          AH
        </span>
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-display text-[0.95rem] font-semibold tracking-[0.18em] uppercase">Ali Hassan</span>
        <span className="mt-1 text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground">Digital · IT · Web</span>
      </span>
    </Link>
  );
}
