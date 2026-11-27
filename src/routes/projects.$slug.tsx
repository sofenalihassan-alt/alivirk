import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Github, Globe } from "lucide-react";
import { ProjectPreview } from "@/components/home/ProjectPreview";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ContactInvite } from "@/components/site/ContactInvite";
import { PlaceholderTag } from "@/components/site/Placeholder";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetail,
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — Ali Hassan" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    const title = `${p.title} — Project by Ali Hassan`;
    return {
      meta: [
        { title },
        { name: "description", content: p.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p.isPlaceholder ? [{ name: "robots", content: "noindex" }] : []),
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.title,
            description: p.summary,
            author: { "@type": "Person", name: "Ali Hassan" },
            ...(p.liveUrl ? { url: p.liveUrl } : {}),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Projects", item: "/projects" },
              { "@type": "ListItem", position: 3, name: p.title, item: `/projects/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const others = projects.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="container-page pt-36 sm:pt-44">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold">
            <ArrowLeft className="size-4" aria-hidden="true" /> All projects
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="eyebrow text-gold">{p.category}</span>
            {p.isPlaceholder && <PlaceholderTag />}
          </div>
          <h1 className="mt-5 page-title leading-[1.02] font-medium">
            <SplitText text={p.title} immediate />
          </h1>
          <Reveal className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{p.summary}</Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>*]:justify-center">
            {p.liveUrl ? (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-display text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft">
                <Globe className="size-4" aria-hidden="true" /> Visit live site
              </a>
            ) : (
              <span className="inline-flex min-h-12 items-center gap-2 rounded-full border border-dashed border-hairline px-6 text-sm text-muted-foreground">
                <Globe className="size-4" aria-hidden="true" /> Live link not available yet
              </span>
            )}
            {p.githubUrl ? (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="glass inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm">
                <Github className="size-4" aria-hidden="true" /> View on GitHub
              </a>
            ) : (
              <span className="inline-flex min-h-12 items-center gap-2 rounded-full border border-dashed border-hairline px-6 text-sm text-muted-foreground">
                <Github className="size-4" aria-hidden="true" /> Repository not public
              </span>
            )}
          </Reveal>
        </header>

        <Reveal className="container-page mt-16" y={50}>
          <ProjectPreview project={p} className="mx-auto max-w-5xl" />
        </Reveal>

        <section className="container-page mt-24 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="border-t border-gold py-6 lg:sticky lg:top-28">
              <dl className="grid gap-6 text-sm sm:grid-cols-3 lg:block lg:space-y-6">
                <div>
                  <dt className="eyebrow text-[0.6rem]">Category</dt>
                  <dd className="mt-2">{p.category}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.6rem]">Technologies</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {p.technologies.map((t) => (
                      <span key={t} className="rounded-full border border-hairline px-2.5 py-1 text-xs">{t}</span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.6rem]">Type</dt>
                  <dd className="mt-2">{p.isPlaceholder ? "To be added" : "Personal project"}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="eyebrow">Overview</h2>
            <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {p.description.map((d) => (
                <p key={d.slice(0, 24)}>{d}</p>
              ))}
            </Reveal>
            <h2 className="eyebrow mt-16">{p.isPlaceholder ? "Details to add" : "Key features"}</h2>
            <Stagger as="ul" className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <StaggerItem as="li" key={f} className="flex items-start gap-3 border-b border-hairline py-5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  {f}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </article>

      <section className="container-page mt-32" aria-labelledby="more-title">
        <h2 id="more-title" className="eyebrow">More projects</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link to="/projects/$slug" params={{ slug: o.slug }} className="group flex items-center justify-between gap-4 border-b border-hairline py-6">
                <span>
                  <span className="block text-xs text-muted-foreground">{o.category}</span>
                  <span className="mt-1 block font-display text-2xl font-medium transition-colors group-hover:text-gold sm:text-3xl">{o.title}</span>
                </span>
                <ArrowLeft className="size-5 rotate-180 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-gold" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContactInvite />
    </>
  );
}
