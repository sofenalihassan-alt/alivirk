import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Cpu, LifeBuoy, Network, Server, Users, Wrench, GraduationCap } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ContactInvite } from "@/components/site/ContactInvite";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Timeline } from "@/components/site/Timeline";
import { milestones } from "@/data/journey";

export const Route = createFileRoute("/experience")({
  component: ExperiencePage,
  head: () => ({
    meta: [
      { title: "Experience — ICT Apprentice at FFC Port Qasim | Ali Hassan" },
      {
        name: "description",
        content:
          "Ali Hassan's professional experience as ICT Apprentice at Fauji Fertilizer Company, Port Qasim, and his education: DAE CIT at GCT Bhakkar and ADP Computing at Virtual University.",
      },
      { property: "og:title", content: "Experience — Ali Hassan" },
      { property: "og:description", content: "ICT Apprentice at FFC Port Qasim, plus education at GCT Bhakkar and Virtual University." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/experience" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
});

const focusAreas = [
  { icon: Server, title: "Professional IT environment", text: "Working within the IT function of a large industrial organisation." },
  { icon: Cpu, title: "IT operations exposure", text: "Seeing how day-to-day IT operations keep teams productive." },
  { icon: Network, title: "Computer systems & networking", text: "Hands-on time with computers, network connectivity and related systems." },
  { icon: LifeBuoy, title: "IT support", text: "Helping colleagues resolve everyday technical issues." },
  { icon: Wrench, title: "Troubleshooting", text: "Diagnosing problems methodically, from symptom to root cause." },
  { icon: GraduationCap, title: "Technical learning", text: "Building practical skills alongside experienced professionals." },
  { icon: Users, title: "Workplace collaboration", text: "Learning how IT teams communicate, plan and work together." },
];

function ExperiencePage() {
  const education = milestones.filter((m) => m.kind === "Education");
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Learning on"
        accent="the job."
        intro="My professional path is just beginning — and it's beginning in a serious place. Here's what I'm doing now, and the education that led me here."
      />

      {/* Featured role */}
      <section className="container-page" aria-labelledby="role-title">
        <Reveal y={40}>
          <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-12">
            <div className="pointer-events-none absolute -top-32 -right-20 size-96 rounded-full bg-gold/10 blur-[100px]" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs text-success">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/60" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>
                  Current position
                </span>
                <h2 id="role-title" className="mt-6 text-5xl leading-none font-medium sm:text-6xl">ICT Apprentice</h2>
                <p className="mt-5 font-display text-xl">Fauji Fertilizer Company <span className="text-gold">(FFC)</span></p>
                <p className="mt-1 text-muted-foreground">Port Qasim, Pakistan</p>
                <p className="mt-8 leading-relaxed text-muted-foreground">
                  An apprenticeship in Information & Communication Technology, where I'm developing practical experience in a
                  professional IT environment and applying what I learned during my DAE.
                </p>
              </div>
              <Stagger as="ul" className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
                {focusAreas.map(({ icon: Icon, title, text }) => (
                  <StaggerItem as="li" key={title}>
                    <motion.div whileHover={{ y: -3 }} className="h-full rounded-2xl border border-hairline bg-background/30 p-5 transition-colors hover:border-gold/40">
                      <Icon className="size-5 text-gold" aria-hidden="true" />
                      <h3 className="mt-4 text-base font-medium tracking-tight">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Education */}
      <section className="container-page mt-32 sm:mt-40" aria-labelledby="edu-title">
        <SectionHeading index="02" eyebrow="Education" title="The foundations." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.1}>
              <article className="h-full rounded-[1.75rem] border border-hairline bg-glass p-8 transition-colors duration-500 hover:border-gold/40">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[0.62rem] text-gold">{e.status}</span>
                  <GraduationCap className="size-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl leading-snug font-medium sm:text-3xl">{e.title}</h3>
                <p className="mt-2 text-muted-foreground">{e.org}{e.place ? `, ${e.place}` : ""}</p>
                <ul className="mt-6 space-y-2 border-t border-hairline pt-6">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-page mt-32 sm:mt-40" aria-labelledby="tl-title">
        <SectionHeading index="03" eyebrow="Milestones" title="Every step," accent="in order." align="center" className="mb-20" />
        <Timeline items={milestones} />
        <Reveal className="mt-16 text-center text-xs text-muted-foreground">
          Dates are intentionally left out until confirmed — the sequence reflects my journey.
        </Reveal>
      </section>

      <ContactInvite />
    </>
  );
}
