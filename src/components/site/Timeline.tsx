import { motion, useScroll, useSpring } from "motion/react";
import { Check } from "lucide-react";
import { useRef } from "react";
import type { Milestone } from "@/data/journey";
import { cn } from "@/lib/utils";

/** Vertical timeline whose gold line draws as you scroll; milestones animate in. */
export function Timeline({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <ol ref={ref} className="relative">
      <div className="absolute top-0 bottom-0 left-[1.1rem] w-px bg-hairline md:left-1/2" aria-hidden="true" />
      <motion.div
        className="absolute top-0 bottom-0 left-[1.1rem] w-px origin-top bg-[linear-gradient(var(--gold),var(--gold-deep))] md:left-1/2"
        style={{ scaleY }}
        aria-hidden="true"
      />
      {items.map((m, i) => {
        const right = i % 2 === 1;
        return (
          <li key={m.id} className="relative pb-16 last:pb-0 md:grid md:grid-cols-2 md:gap-16">
            <motion.span
              className={cn(
                "absolute top-1 left-[1.1rem] z-10 grid size-9 -translate-x-1/2 place-items-center rounded-full border md:left-1/2",
                m.status === "Current" ? "border-gold bg-gold text-primary-foreground" : "border-gold/50 bg-background text-gold",
              )}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              aria-hidden="true"
            >
              {m.status === "Completed" ? <Check className="size-4" /> : <span className="size-2 rounded-full bg-current" />}
              {m.status === "Current" && <span className="absolute inset-0 animate-ping rounded-full border border-gold" />}
            </motion.span>

            <motion.div
              className={cn("pl-14 md:pl-0", right ? "md:col-start-2" : "md:col-start-1 md:text-right")}
              initial={{ opacity: 0, x: right ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={cn("flex flex-wrap items-center gap-2", !right && "md:justify-end")}>
                <span className="eyebrow text-[0.62rem] text-gold">{m.kind}</span>
                <span className="rounded-full border border-hairline px-2.5 py-0.5 text-[0.65rem] text-muted-foreground">{m.status}</span>
              </div>
              <h3 className="mt-3 text-2xl leading-snug font-medium sm:text-3xl">{m.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {m.org}
                {m.place ? ` · ${m.place}` : ""}
              </p>
              <div className={cn("mt-5 border-t border-hairline pt-6 text-left", !right && "md:ml-auto")}>
                <p className="leading-relaxed text-muted-foreground">{m.summary}</p>
                <ul className="mt-4 space-y-2">
                  {m.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
