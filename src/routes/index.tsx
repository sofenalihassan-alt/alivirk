import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useRef, useState } from "react";
import { HeroObject } from "@/components/home/HeroObject";
import { SkillServeMockup } from "@/components/home/SkillServeMockup";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { CtaAnchor, CtaLink } from "@/components/site/Cta";
import { ContactInvite } from "@/components/site/ContactInvite";
import { SectionHeading } from "@/components/site/SectionHeading";
import { skillCategories } from "@/data/expertise";
import { milestones } from "@/data/journey";
import { getProject } from "@/data/projects";
import { introDelay } from "@/lib/intro";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Ali Hassan — Building Digital Experiences. Exploring What's Next." },
      {
        name: "description",
        content:
          "Ali Hassan — ICT Apprentice at FFC Port Qasim, freelancer in WordPress, SEO and design, and computing student at Virtual University of Pakistan.",
      },
      { property: "og:title", content: "Ali Hassan — Building Digital Experiences" },
      {
        property: "og:description",
        content: "ICT Apprentice, freelancer and computing student building meaningful digital solutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const disciplines = ["WordPress", "SEO", "IT Support", "Networking", "Graphic Design", "Web Development", "Troubleshooting", "Digital Marketing"];

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <ExpertisePreview />
      <FeaturedProject />
      <JourneyPreview />
      <LearningInterests />
      <ContactInvite />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const d = introDelay();

  return (
    <section ref={ref} className="container-page relative grid min-h-[100svh] items-center gap-12 pt-32 pb-16 lg:grid-cols-12 lg:gap-6 lg:pt-28">
      <motion.div className="relative z-10 lg:col-span-7" style={{ y: yText, opacity: fade }}>
        <motion.div
          className="glass-subtle inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full px-4 py-2 text-xs text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d, duration: 0.8 }}
        >
          <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
          ICT Apprentice · FFC Port Qasim
          <span className="hidden text-hairline sm:inline" aria-hidden="true">/</span>
          <span className="hidden sm:inline">Freelancer</span>
          <span className="hidden text-hairline sm:inline" aria-hidden="true">/</span>
          <span className="hidden sm:inline">Computing student</span>
        </motion.div>

        <h1 className="mt-8">
          <span className="block font-display text-[clamp(3.6rem,15vw,9.5rem)] leading-[0.86] font-semibold tracking-[-0.055em]">
            <SplitText text="Ali Hassan" immediate delay={d + 0.1} className="text-fade" />
          </span>
          <span className="mt-6 block max-w-2xl text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.05] font-medium tracking-[-0.03em]">
            <SplitText text="Building Digital Experiences." immediate delay={d + 0.35} />{" "}
            <SplitText
              text="Exploring What's Next."
              immediate
              delay={d + 0.55}
              wordClassName="font-serif italic font-normal tracking-normal text-gold"
            />
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d + 0.8, duration: 0.9 }}
        >
          {site.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d + 0.95, duration: 0.9 }}
        >
          <CtaLink to="/projects">Explore My Work</CtaLink>
          <CtaLink to="/contact" variant="glass">Let's Connect</CtaLink>
        </motion.div>
      </motion.div>

      <motion.div className="relative lg:col-span-5" style={{ y: yVisual }}>
        <HeroObject />
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.4 }}
        aria-hidden="true"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-hairline">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const row = [...disciplines, ...disciplines];
  return (
    <div className="relative z-10 overflow-hidden border-y border-hairline py-6" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-10">
        {row.map((d, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium whitespace-nowrap text-muted-foreground/70 sm:text-4xl">
            {i % 2 === 0 ? d : <span className="font-serif font-normal italic text-foreground/80">{d}</span>}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="container-page mt-32 grid gap-12 sm:mt-44 lg:grid-cols-12" aria-labelledby="intro-title">
      <div className="lg:col-span-4">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-gold">01</span>
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
            Introduction
          </p>
        </Reveal>
      </div>
      <div className="lg:col-span-8">
        <h2 id="intro-title" className="text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.12] font-medium tracking-[-0.03em]">
          <SplitText text="I work where practical IT meets digital creativity —" />{" "}
          <SplitText text="keeping systems running by day," delay={0.1} wordClassName="text-muted-foreground" />{" "}
          <SplitText text="and building for the web beyond it." delay={0.2} wordClassName="font-serif italic font-normal tracking-normal text-gold" />
        </h2>
        <Reveal delay={0.1} className="mt-10 grid gap-8 text-muted-foreground sm:grid-cols-2">
          <p className="leading-relaxed">
            I'm an ICT Apprentice at Fauji Fertilizer Company in Port Qasim, where I'm developing hands-on experience
            with computer systems, networking, IT support and troubleshooting in a professional environment.
          </p>
          <p className="leading-relaxed">
            Alongside that, I freelance in WordPress development, SEO and graphic design, and I'm studying for my
            Associate Degree in Computing at Virtual University of Pakistan — always learning what comes next.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <Link to="/about" className="group inline-flex items-center gap-3 font-display text-sm">
            <span className="border-b border-gold/40 pb-1 transition-colors group-hover:border-gold">More about my story</span>
            <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ExpertisePreview() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active] ?? skillCategories[0]!;
  return (
    <section className="container-page mt-32 sm:mt-44" aria-labelledby="expertise-title">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading index="02" eyebrow="Expertise" title="What I bring" accent="to the table." />
        <Reveal>
          <CtaLink to="/expertise" variant="glass">All skills</CtaLink>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6" role="tablist" aria-label="Skill categories" id="expertise-title">
          {skillCategories.map((c, i) => {
            const on = i === active;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="expertise-panel"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "group flex w-full items-center gap-5 border-b border-hairline py-5 text-left transition-colors sm:py-6",
                  on ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className={cn("font-serif text-xl italic transition-colors", on ? "text-gold" : "text-muted-foreground/60")}>{c.letter}</span>
                <span className="flex-1 font-display text-2xl font-medium tracking-tight sm:text-4xl">{c.title}</span>
                <motion.span animate={{ rotate: on ? 0 : -45, opacity: on ? 1 : 0.4 }} transition={{ duration: 0.4 }}>
                  <ArrowUpRight className={cn("size-6", on && "text-gold")} aria-hidden="true" />
                </motion.span>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-6 lg:pl-8" id="expertise-panel" role="tabpanel" aria-live="polite">
          <div className="glass relative min-h-[22rem] overflow-hidden rounded-3xl p-7 sm:p-10 lg:sticky lg:top-28">
            <div className="pointer-events-none absolute -top-20 -right-20 size-60 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-serif text-7xl leading-none italic text-gold/80">{cat.letter}</p>
                <p className="mt-6 text-lg leading-relaxed">{cat.intro}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {cat.skills.map((s, i) => (
                    <motion.li
                      key={s.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i }}
                      className="rounded-full border border-hairline bg-glass px-4 py-2 text-sm"
                    >
                      {s.name}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject() {
  const project = getProject("skill-serve")!;
  return (
    <section className="relative mt-32 sm:mt-44" aria-labelledby="featured-title">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Featured project"
          title="Skill Serve —"
          accent="skilled help, closer to home."
          intro={project.summary}
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7" y={50}>
            <motion.div whileHover={{ rotateX: 2, rotateY: -3 }} transition={{ type: "spring", stiffness: 120, damping: 15 }} className="[perspective:1200px]">
              <SkillServeMockup />
            </motion.div>
          </Reveal>
          <div className="lg:col-span-5">
            <Stagger as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {project.features.slice(0, 6).map((f) => (
                <StaggerItem as="li" key={f} className="flex items-start gap-3 border-b border-hairline pb-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  {f}
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="rounded-full bg-glass px-3 py-1 text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-display text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft"
                >
                  Case study <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                {project.liveUrl && <CtaAnchor href={project.liveUrl}>Visit live site</CtaAnchor>}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyPreview() {
  return (
    <section className="container-page mt-32 sm:mt-44" aria-labelledby="journey-title">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading index="04" eyebrow="Journey" title="From the classroom" accent="to the workplace." />
        <Reveal>
          <CtaLink to="/experience" variant="glass">Full experience</CtaLink>
        </Reveal>
      </div>
      <Stagger as="ol" className="relative mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="hairline-x absolute top-[1.15rem] right-0 left-0 hidden xl:block" aria-hidden="true" />
        {milestones.map((m, i) => (
          <StaggerItem as="li" key={m.id} className="relative">
            <div className="relative z-10 flex items-center gap-3">
              <span className={cn("grid size-9 place-items-center rounded-full border font-display text-xs", m.status === "Current" ? "border-gold bg-gold text-primary-foreground" : "border-hairline bg-background text-gold")}>
                0{i + 1}
              </span>
              <span className="eyebrow text-[0.62rem]">{m.status}</span>
            </div>
            <div className="mt-6 h-full rounded-3xl border border-hairline bg-glass p-6 transition-colors duration-500 hover:border-gold/40">
              <p className="text-xs text-gold">{m.kind}</p>
              <h3 className="mt-2 text-xl leading-snug font-medium">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.org}{m.place ? `, ${m.place}` : ""}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function LearningInterests() {
  const items = [
    { label: "React & TypeScript", stage: "Learning now" },
    { label: "Software engineering", stage: "Learning now" },
    { label: "Artificial intelligence", stage: "Exploring" },
    { label: "Cybersecurity", stage: "Exploring" },
    { label: "Ethical hacking", stage: "Exploring" },
    { label: "Modern IT infrastructure", stage: "Growing" },
  ];
  return (
    <section className="container-page mt-32 sm:mt-44" aria-labelledby="learning-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            index="05"
            eyebrow="Always learning"
            title="Curious about"
            accent="what's next."
            intro="I'm honest about where I am: these are areas I'm actively studying and exploring, not titles I claim. Learning in public keeps me accountable."
          />
          <Reveal delay={0.2} className="mt-8">
            <CtaLink to="/learning" variant="glass">Learning roadmap</CtaLink>
          </Reveal>
        </div>
        <Stagger as="ul" className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7">
          {items.map((it, i) => (
            <StaggerItem as="li" key={it.label}>
              <motion.div
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-hairline p-6 transition-colors duration-500 hover:border-gold/40",
                  i === 0 ? "glass" : "bg-glass",
                )}
              >
                <span className="eyebrow text-[0.6rem] text-gold">{it.stage}</span>
                <span className="mt-10 font-display text-2xl font-medium tracking-tight">{it.label}</span>
                <span className="absolute top-6 right-6 font-serif text-sm italic text-muted-foreground/60">0{i + 1}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
