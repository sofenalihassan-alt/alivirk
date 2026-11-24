import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SplitText } from "@/components/motion/SplitText";

/** Large editorial page intro shared by every inner page. */
export function PageHeader({
  eyebrow,
  title,
  accent,
  intro,
  aside,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="container-page relative pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div className="pointer-events-none absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-[120px]" aria-hidden="true" />
      <motion.p
        className="eyebrow flex items-center gap-3"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <span className="h-px w-10 bg-gold" aria-hidden="true" />
        {eyebrow}
      </motion.p>
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
        <h1 className="text-[clamp(2.75rem,9vw,8.5rem)] font-medium leading-[0.92] lg:col-span-8">
          <SplitText text={title} immediate delay={0.15} />
          {accent && (
            <>
              <br />
              <SplitText
                text={accent}
                immediate
                delay={0.35}
                wordClassName="font-serif italic font-normal tracking-normal text-gold"
              />
            </>
          )}
        </h1>
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
        >
          <div className="text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</div>
          {aside}
        </motion.div>
      </div>
      <motion.div
        className="hairline-x mt-16 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
        aria-hidden="true"
      />
    </header>
  );
}
