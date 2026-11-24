import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import portrait from "@/assets/ali-hassan-portrait.webp.asset.json";
import { introDelay } from "@/lib/intro";

/**
 * Hero visual: an arched, frosted portrait frame orbited by 3D glass rings.
 * Pure CSS 3D + pointer parallax — light enough for mobile, no WebGL needed.
 */
export function HeroObject() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 80, damping: 20 });
  const px = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 60, damping: 20 });
  const py = useSpring(useTransform(my, [-1, 1], [-14, 14]), { stiffness: 60, damping: 20 });
  const delay = introDelay();

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem] [perspective:1400px]">
      {/* Halo */}
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,oklch(0.79_0.09_85/22%),transparent)] blur-2xl" aria-hidden="true" />

      <motion.div
        className="relative size-full [transform-style:preserve-3d]"
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Orbit rings */}
        <div className="absolute inset-0 grid place-items-center [transform-style:preserve-3d]" aria-hidden="true">
          <div className="motion-safe-anim absolute size-[118%] rounded-full border border-gold/30 [animation:orbit-a_26s_linear_infinite] [box-shadow:0_0_40px_-10px_oklch(0.79_0.09_85/40%)_inset]" />
          <div className="motion-safe-anim absolute size-[104%] rounded-full border border-hairline [animation:orbit-b_34s_linear_infinite]" />
          <div className="motion-safe-anim absolute size-[92%] rounded-full border border-dashed border-gold/20 [animation:orbit-c_40s_linear_infinite]" />
        </div>

        {/* Arched portrait frame */}
        <div className="absolute inset-x-[12%] top-[6%] bottom-[8%] [transform:translateZ(40px)]">
          <div className="glass relative size-full overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] p-2">
            <div className="group relative size-full overflow-hidden rounded-t-[999px] rounded-b-[2rem]">
              <img
                src={portrait.url}
                alt="Portrait of Ali Hassan"
                width={900}
                height={1037}
                fetchPriority="high"
                className="size-full object-cover object-[50%_20%] grayscale-[0.55] contrast-[1.05] transition-[filter,transform] duration-[1.2s] group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,oklch(0.135_0.006_275/85%))]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,oklch(0.79_0.09_85/18%),transparent_55%)] mix-blend-soft-light" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="eyebrow text-[0.62rem] text-gold">Based in Pakistan</p>
                <p className="mt-1 font-display text-lg font-medium">Ali Hassan</p>
              </div>
            </div>
          </div>
        </div>

      </motion.div>

      {/* Floating glass prism */}
        <div className="pointer-events-none absolute top-0 right-2 z-20 sm:-right-2" aria-hidden="true">
          <motion.div style={{ x: px, y: py }}>
            <div className="animate-float relative size-16 sm:size-20">
              <div className="absolute inset-0 rotate-45 rounded-[1.2rem] border border-hairline bg-[linear-gradient(160deg,oklch(1_0_0/14%),oklch(1_0_0/3%))] shadow-[var(--shadow-glass)]" />
              <div className="absolute inset-3 rotate-45 rounded-xl border border-gold/40 bg-[linear-gradient(135deg,oklch(0.79_0.09_85/35%),transparent_60%)]" />
            </div>
          </motion.div>
        </div>

        {/* Floating glass chips with real achievements */}
        <div className="absolute top-[40%] left-0 z-20 sm:-left-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 1, duration: 0.9 }}
        >
          <div className="glass animate-float rounded-2xl px-4 py-3 [animation-delay:-3s]">
            <p className="font-display text-2xl font-semibold text-gold">1st</p>
            <p className="text-[0.7rem] leading-tight text-muted-foreground">Position, all three<br />DAE years</p>
          </div>
        </motion.div>
        </div>

        <div className="absolute right-0 bottom-[16%] z-20 sm:-right-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 1.15, duration: 0.9 }}
        >
          <div className="glass animate-float flex items-center gap-3 rounded-2xl px-4 py-3 [animation-delay:-6s]">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            <div>
              <p className="text-xs font-medium">ICT Apprentice</p>
              <p className="text-[0.7rem] text-muted-foreground">FFC · Port Qasim</p>
            </div>
          </div>
        </motion.div>
        </div>
    </div>
  );
}
