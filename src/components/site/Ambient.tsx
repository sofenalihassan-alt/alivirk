import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Soft gold light that trails the cursor on desktop (fine pointers only). */
export function CursorAura() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });
  const dx = useSpring(x, { stiffness: 900, damping: 50 });
  const dy = useSpring(y, { stiffness: 900, damping: 50 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches && !reduce);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[60] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-difference"
        style={{ x: dx, y: dy }}
      />
    </>
  );
}

/** Sparse drifting particles on a canvas. Pauses when hidden; off for reduced motion. */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const count = window.innerWidth < 768 ? 26 : 60;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: -Math.random() * 0.00018 - 0.00004,
      a: Math.random() * 0.5 + 0.15,
      gold: Math.random() < 0.25,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.02) p.y = 1.02;
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(214,184,117,${p.a})` : `rgba(245,245,247,${p.a * 0.6})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}

/** Fixed atmospheric backdrop: midnight gradients + grain. */
export function Atmosphere() {
  return (
    <div aria-hidden="true" className="editorial-atmosphere grain pointer-events-none fixed inset-0 z-0" />
  );
}

export function IntroLoader() {
  return (
    <div
      aria-hidden="true"
      className="intro-loader pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <p className="intro-mark font-display text-sm font-medium uppercase text-foreground">
        Ali <span className="font-serif text-lg normal-case italic text-gold">Hassan</span>
      </p>
      <div className="mt-6 h-px w-40 overflow-hidden bg-hairline">
        <div className="intro-line h-full w-full bg-gold" />
      </div>
    </div>
  );
}
