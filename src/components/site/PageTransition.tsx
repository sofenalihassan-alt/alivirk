import { useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Cinematic enter transition keyed by route: a gold sweep, then content rises in.
 * The first page load is left static (the intro loader covers it) so server-rendered
 * content is never hidden.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const firstPath = useRef(pathname);
  const isFirst = firstPath.current === pathname && !firstPath.current.startsWith("__nav");
  if (!isFirst) firstPath.current = "__nav";

  return (
    <div key={pathname} className="relative">
      {!isFirst && (
        <motion.div
          aria-hidden="true"
          className="page-curtain pointer-events-none fixed inset-0 z-[69] origin-top"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      {!isFirst && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        />
      )}
      <motion.div
        initial={isFirst ? false : { opacity: 0, y: 16, filter: typeof window !== "undefined" && window.innerWidth < 640 ? "blur(0px)" : "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
