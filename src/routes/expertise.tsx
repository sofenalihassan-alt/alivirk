import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactInvite } from "@/components/site/ContactInvite";
import { PageHeader } from "@/components/site/PageHeader";
import { levelOrder, skillCategories, type Skill, type SkillLevel } from "@/data/expertise";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/expertise")({
  component: ExpertisePage,
  head: () => ({
    meta: [
      { title: "Expertise — Web, SEO, IT & Design | Ali Hassan" },
      {
        name: "description",
        content:
          "Ali Hassan's skills across WordPress and web development, SEO, IT support and networking, graphic design — plus what he's currently exploring.",
      },
      { property: "og:title", content: "Expertise — Ali Hassan" },
      { property: "og:description", content: "Web development, SEO, IT & infrastructure, creative work and current learning areas." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/expertise" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/expertise" }],
  }),
});

const levelStyle: Record<SkillLevel, string> = {
  "Practical experience": "bg-gold text-primary-foreground",
  "Working knowledge": "border border-gold/60 text-gold",
  Fundamentals: "border border-hairline text-foreground",
  "Currently exploring": "border border-dashed border-hairline text-muted-foreground",
};

type Item = Skill & { categoryId: string; categoryTitle: string; letter: string };

function ExpertisePage() {
  const [filter, setFilter] = useState<string>("all");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const all: Item[] = useMemo(
    () =>
      skillCategories.flatMap((c) =>
        c.skills.map((s) => ({ ...s, categoryId: c.id, categoryTitle: c.title, letter: c.letter })),
      ),
    [],
  );
  const visible = filter === "all" ? all : all.filter((s) => s.categoryId === filter);
  const activeCat = skillCategories.find((c) => c.id === filter);

  const filters = [{ id: "all", title: "All skills", letter: "∗" }, ...skillCategories];

  return (
    <>
      <PageHeader
        eyebrow="Expertise"
        title="Skills, stated"
        accent="honestly."
        intro="A clear view of what I do, grouped by area. Each skill is labelled by how I use it today — from hands-on practical experience to topics I'm only beginning to explore."
      />

      <section className="container-page" aria-label="Skills explorer">
        {/* Level legend */}
        <Reveal className="mb-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
          {levelOrder.map((l) => (
            <span key={l} className="inline-flex items-center gap-2">
              <span className={cn("size-3 rounded-full", levelStyle[l])} aria-hidden="true" />
              {l}
            </span>
          ))}
        </Reveal>

        {/* Filters */}
        <div className="-mx-5 snap-x snap-mandatory overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0" role="tablist" aria-label="Filter by category">
          <LayoutGroup id="skill-filters">
            <div className="flex w-max gap-2">
              {filters.map((f) => {
                const on = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setFilter(f.id);
                      setOpenKey(null);
                    }}
                    className={cn(
                      "relative min-h-11 snap-start rounded-sm px-5 text-sm whitespace-nowrap transition-colors",
                      on ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {on && (
                      <motion.span layoutId="skill-filter" className="absolute inset-0 rounded-sm bg-primary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                    )}
                    <span className="relative flex items-center gap-2">
                      <span className="font-serif italic">{f.letter}</span>
                      {f.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <AnimatePresence mode="wait">
          {activeCat && (
            <motion.p
              key={activeCat.id}
              className="mt-8 max-w-2xl text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {activeCat.intro}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.ul layout className="expertise-ledger mt-10 grid border-t border-hairline">
          <AnimatePresence mode="popLayout">
            {visible.map((s) => {
              const key = `${s.categoryId}-${s.name}`;
              const open = openKey === key;
              return (
                <motion.li
                  key={key}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenKey(open ? null : key)}
                    aria-expanded={open}
                    className={cn(
                      "skill-row group relative grid w-full gap-3 border-b border-hairline py-5 text-left sm:gap-4 sm:py-6 transition-colors duration-500 sm:grid-cols-[1fr_1.3fr_auto]",
                      open ? "bg-glass" : "hover:bg-glass",
                    )}
                  >
                    <div className="flex items-center justify-between gap-4 sm:contents">
                      <span className="text-xs text-muted-foreground sm:col-start-1 sm:row-start-1">
                        <span className="font-serif text-sm normal-case italic text-gold">{s.letter}</span> · {s.categoryTitle}
                      </span>
                      <motion.span animate={{ rotate: open ? 45 : 0 }} className="grid size-8 shrink-0 place-items-center rounded-full border border-hairline sm:col-start-3 sm:row-start-1">
                        <Plus className="size-4" aria-hidden="true" />
                      </motion.span>
                    </div>
                    <h3 className="text-xl font-medium transition-transform sm:text-2xl duration-500 group-hover:translate-x-2 sm:col-start-2 sm:row-start-1">{s.name}</h3>
                    <span className={cn("inline-flex w-fit rounded-sm px-3 py-1 text-[0.7rem] font-medium sm:col-start-2", levelStyle[s.level])}>{s.level}</span>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden sm:col-start-2 sm:col-span-2"
                        >
                          <span className="block pt-5 leading-relaxed text-muted-foreground">{s.description}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="mt-16">
          <div className="border-l border-gold pl-6 text-sm leading-relaxed text-muted-foreground">
            <span className="text-foreground">A note on honesty:</span> I don't list proficiency percentages or certifications I
            don't hold. "Currently exploring" means exactly that — areas I'm studying, not services I offer yet.
          </div>
        </Reveal>
      </section>

      <ContactInvite />
    </>
  );
}
