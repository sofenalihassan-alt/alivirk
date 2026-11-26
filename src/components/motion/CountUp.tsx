import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Counts the numeric part of a value ("1st", "2,125", "4th") up with spring-like easing
 * when scrolled into view. SSR and reduced-motion render the real final value.
 */
export function CountUp({ value, className }: { value: string; className?: string | undefined }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2]!.replace(/,/g, "")) : NaN;
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduce || !match || Number.isNaN(target)) return;
    const fmt = (n: number) => `${match[1]}${Math.round(n).toLocaleString("en-US")}${match[3]}`;
    setShown(fmt(0));
    const controls = animate(0, target, {
      type: "spring",
      stiffness: 40,
      damping: 18,
      restDelta: 0.5,
      onUpdate: (v) => setShown(fmt(Math.min(v, target))),
      onComplete: () => setShown(value),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true" className="tabular-nums">{shown}</span>
    </span>
  );
}
