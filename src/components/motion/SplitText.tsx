import { motion } from "motion/react";

type SplitTextProps = {
  text: string;
  className?: string | undefined;
  wordClassName?: string;
  delay?: number;
  /** Animate immediately instead of waiting for scroll. */
  immediate?: boolean;
};

/** Word-by-word masked reveal for headings. Keeps the full text accessible. */
export function SplitText({ text, className, wordClassName, delay = 0, immediate = false }: SplitTextProps) {
  const words = text.split(" ");
  const animateProps = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "-10% 0px" } };
  return (
    <motion.span
      className={className}
      aria-label={text}
      role="text"
      initial="hidden"
      {...animateProps}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
