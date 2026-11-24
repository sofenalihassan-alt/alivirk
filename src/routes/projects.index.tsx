import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ProjectPreview } from "@/components/home/ProjectPreview";
import { Reveal } from "@/components/motion/Reveal";
import { ContactInvite } from "@/components/site/ContactInvite";
import { CtaAnchor } from "@/components/site/Cta";
import { PageHeader } from "@/components/site/PageHeader";
import { PlaceholderTag } from "@/components/site/Placeholder";
import { projectCategories, projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects — Skill Serve & More | Ali Hassan" },
      {
        name: "description",
        content:
          "Projects by Ali Hassan, led by Skill Serve — a bilingual platform concept connecting customers with skilled local service providers.",
      },
      { property: "og:title", content: "Projects — Ali Hassan" },
      { property: "og:description", content: "Skill Serve and other web, SEO, IT and learning projects." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
});

function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");
  const flagship = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);
  const visible = filter === "All" ? rest : rest.filter((p) => p.category === filter);
  const showFlagship = filter === "All" || filter === flagship.category;
  const filters = ["All", ...projectCategories];

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Selected"
        accent="work."
        intro="My flagship project, Skill Serve, alongside space for the web, SEO, IT and learning work I'm adding over time. Placeholders are clearly marked."
      />

      <section className="container-page" aria-label="Project list">
        <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter projects by category">
          <LayoutGroup id="project-filters">
            <div className="flex w-max gap-2">
              {filters.map((f) => {
                const on = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "relative min-h-11 rounded-full px-5 text-sm whitespace-nowrap transition-colors",
                      on ? "text-primary-foreground" : "glass-subtle text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {on && <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                    <span className="relative">{f}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <AnimatePresence mode="popLayout">
          {showFlagship && (
            <motion.article
              key="flagship"
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass relative mt-10 grid gap-10 overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:grid-cols-12 lg:items-center"
            >
              <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
              <div className="relative lg:col-span-5">
                <span className="eyebrow text-[0.62rem] text-gold">Flagship · {flagship.category}</span>
                <h2 className="mt-4 text-5xl font-medium sm:text-6xl">{flagship.title}</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">{flagship.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {flagship.technologies.map((t) => (
                    <span key={t} className="rounded-full bg-glass px-3 py-1 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: flagship.slug }}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-display text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft"
                  >
                    View case study
                  </Link>
                  {flagship.liveUrl && <CtaAnchor href={flagship.liveUrl}>Live site</CtaAnchor>}
                </div>
              </div>
              <div className="relative lg:col-span-7">
                <ProjectPreview project={flagship} />
              </div>
            </motion.article>
          )}
        </AnimatePresence>

        <motion.ul layout className="mt-6 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && !showFlagship && (
          <p className="mt-12 text-center text-muted-foreground">No projects in this category yet.</p>
        )}

        <Reveal className="mt-12">
          <p className="text-sm text-muted-foreground">
            More work is on its way. You can also follow what I'm building on{" "}
            <a href="https://github.com/sofenalihassan-alt" target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">
              GitHub
            </a>
            .
          </p>
        </Reveal>
      </section>

      <ContactInvite />
    </>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className="group flex h-full flex-col rounded-[1.75rem] border border-hairline bg-glass p-4 transition-colors duration-500 hover:border-gold/40 sm:p-5"
    >
      <div className="overflow-hidden rounded-2xl">
        <div className="transition-transform duration-700 group-hover:scale-[1.03]">
          <ProjectPreview project={p} />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-2 pt-6 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow text-[0.6rem]">{p.category}</span>
          {p.isPlaceholder && <PlaceholderTag />}
        </div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-medium">{p.title}</h3>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" aria-hidden="true" />
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.technologies.map((t) => (
            <span key={t} className="rounded-full border border-hairline px-2.5 py-1 text-[0.7rem] text-muted-foreground">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
