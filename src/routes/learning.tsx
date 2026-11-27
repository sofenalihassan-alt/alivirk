import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Compass, Flag, Sparkles } from "lucide-react";
import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ContactInvite } from "@/components/site/ContactInvite";
import { PageHeader } from "@/components/site/PageHeader";
import { PlaceholderTag } from "@/components/site/Placeholder";
import { SectionHeading } from "@/components/site/SectionHeading";
import { draftNotes, roadmap, roadmapStages, type RoadmapStage } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learning")({
  component: LearningPage,
  head: () => ({
    meta: [
      { title: "Learning & Insights — Roadmap and Notes | Ali Hassan" },
      {
        name: "description",
        content:
          "What Ali Hassan is learning now and exploring next: React and TypeScript, software development, AI, cybersecurity, ethical hacking and web technologies.",
      },
      { property: "og:title", content: "Learning & Insights — Ali Hassan" },
      { property: "og:description", content: "An honest learning roadmap and draft technical notes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/learning" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/learning" }],
  }),
});

const stageIcon: Record<RoadmapStage, typeof Sparkles> = {
  "Currently learning": Sparkles,
  "Exploring next": Compass,
  "Future goals": Flag,
};

function LearningPage() {
  const [stage, setStage] = useState<RoadmapStage>("Currently learning");
  const [selected, setSelected] = useState(0);
  const items = roadmap.filter((r) => r.stage === stage);
  const current = items[selected] ?? items[0];

  return (
    <>
      <PageHeader
        eyebrow="Learning & insights"
        title="Always"
        accent="a student."
        intro="Technology moves fast, so learning isn't a phase for me — it's the job. This is my roadmap, kept honest: what I'm learning now, what I'm exploring next, and where I want to go."
      />

      <section className="container-page" aria-labelledby="roadmap-title">
        <h2 id="roadmap-title" className="sr-only">Learning roadmap</h2>
        {/* Stage selector as a connected path */}
        <div className="relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none]" role="tablist" aria-label="Roadmap stages">
          <div className="hairline-x absolute top-1/2 right-[16%] left-[16%] hidden sm:block" aria-hidden="true" />
          {roadmapStages.map((s, i) => {
            const Icon = stageIcon[s];
            const on = s === stage;
            return (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setStage(s);
                  setSelected(0);
                }}
                className={cn(
                  "relative flex min-w-[78%] shrink-0 snap-start items-center gap-4 border-b-2 py-5 text-left transition-colors duration-500 sm:min-w-0",
                  on ? "border-gold text-foreground" : "border-hairline text-muted-foreground hover:border-gold/30",
                )}
              >
                <span className={cn("grid size-11 shrink-0 place-items-center rounded-full border transition-colors", on ? "border-gold bg-gold text-primary-foreground" : "border-hairline text-gold")}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-serif text-sm italic text-muted-foreground">Stage 0{i + 1}</span>
                  <span className="block font-display text-sm font-medium">{s}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <ul className="space-y-2 lg:col-span-5" aria-label={`${stage} topics`}>
            <AnimatePresence mode="popLayout">
              {items.map((it, i) => (
                <motion.li key={`${stage}-${it.title}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.06 }}>
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-pressed={current?.title === it.title}
                    className={cn(
                      "group flex w-full items-center justify-between gap-4 border-b border-hairline py-5 text-left transition-colors",
                      current?.title === it.title ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="font-display text-2xl font-medium tracking-tight">{it.title}</span>
                    <ArrowRight className={cn("size-5 shrink-0 transition-all", current?.title === it.title ? "text-gold" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100")} aria-hidden="true" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="lg:col-span-7" aria-live="polite">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45 }}
                  className="glass-lens learning-dossier relative h-full overflow-hidden rounded-lg p-7 sm:p-10"
                >
                  <p className="eyebrow text-[0.62rem] text-gold">{current.stage}</p>
                  <h3 className="mt-4 text-3xl font-medium sm:text-4xl">{current.title}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{current.why}</p>
                  <p className="eyebrow mt-8 text-[0.6rem]">Focus</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {current.focus.map((f) => (
                      <li key={f} className="border-b border-hairline py-2 pr-4 text-sm">{f}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="container-page mt-32 sm:mt-40" aria-labelledby="notes-title">
        <SectionHeading
          index="02"
          eyebrow="Articles & technical notes"
          title="Notes in"
          accent="progress."
          intro="I'm writing about what I learn. These pieces are drafts — titles and outlines that will be published as I finish them."
        />
        <Stagger as="ul" className="notes-index mt-12 grid gap-0">
          {draftNotes.map((n, i) => (
            <StaggerItem as="li" key={n.title}>
              <article className="group relative grid h-full gap-x-10 border-b border-hairline py-8 transition-colors duration-500 hover:border-gold/40 md:grid-cols-[1fr_1.4fr]">
                <div className="flex items-center justify-between gap-3">
                  <span className="eyebrow text-[0.6rem]">{n.topic}</span>
                  <PlaceholderTag>Draft</PlaceholderTag>
                </div>
                <h3 className="mt-5 text-2xl leading-snug font-medium transition-colors group-hover:text-gold md:col-start-1">{n.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground md:col-start-2 md:row-start-2">{n.excerpt}</p>
                <p className="mt-6 font-serif text-sm italic text-muted-foreground/70">Note 0{i + 1} · Coming soon</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 text-sm text-muted-foreground">
          Professional development is part of this too — every week at work and every course at VU adds something to these notes.
        </Reveal>
      </section>

      <ContactInvite />
    </>
  );
}
