import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import portrait from "@/assets/ali-hassan-portrait.webp.asset.json";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ContactInvite } from "@/components/site/ContactInvite";
import { PageHeader } from "@/components/site/PageHeader";
import { ImagePlaceholder } from "@/components/site/Placeholder";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Timeline } from "@/components/site/Timeline";
import { academicFacts, milestones } from "@/data/journey";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Ali Hassan — Story, Values & Vision" },
      {
        name: "description",
        content:
          "From first position in DAE CIT at GCT Bhakkar to ICT Apprentice at FFC Port Qasim — Ali Hassan's background, approach to technology, values and long-term vision.",
      },
      { property: "og:title", content: "About Ali Hassan — Story, Values & Vision" },
      { property: "og:description", content: "Background, educational journey, values and ambitions of Ali Hassan." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const values = [
  { title: "Honesty over hype", text: "I describe what I can do accurately. Clear expectations build more trust than big claims." },
  { title: "Learn by doing", text: "Classroom knowledge becomes real when it is applied. I look for chances to practise, break things and fix them." },
  { title: "Reliability", text: "In IT, people depend on systems working. I bring that same mindset to every website and freelance project." },
  { title: "Useful, not just impressive", text: "Good technology solves a real problem for real people — like finding a trusted electrician nearby." },
];

function AboutPage() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <>
      <PageHeader
        eyebrow="About me"
        title="A technologist"
        accent="in the making."
        intro="I'm Ali Hassan — an ICT Apprentice, freelancer and computing student who believes the best way to understand technology is to work with it every day."
      />

      {/* Background — editorial split */}
      <section className="container-page grid gap-12 lg:grid-cols-12" aria-labelledby="bg-title">
        <div ref={imgRef} className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:sticky lg:top-28">
            <motion.img
              src={portrait.url}
              alt="Ali Hassan"
              width={900}
              height={1037}
              loading="lazy"
              style={{ y, scale: 1.18 }}
              className="size-full object-cover object-top"
            />
            <div className="absolute inset-0 portrait-shade" />
            <div className="glass-lens absolute right-4 bottom-4 left-4 rounded-sm p-4">
              <p className="eyebrow text-[0.6rem] text-gold">Ali Hassan</p>
              <p className="mt-1 text-sm">ICT Apprentice · Freelancer · Computing student</p>
            </div>
          </div>
        </div>
        <div className="space-y-16 lg:col-span-7 lg:pt-6">
          <div>
            <SectionHeading index="01" eyebrow="Background" title="Where it started" />
            <Reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                My interest in computers turned into a direction when I enrolled in the{" "}
                <span className="text-foreground">Diploma of Associate Engineering in Computer Information Technology</span> at
                Government College of Technology, Bhakkar.
              </p>
              <p>
                Over three years I studied programming, networking, hardware and IT systems — and I committed fully to it.
                I finished first in academics in every one of those three years, scored 2,125 out of 2,250, and secured
                4th position in the technical board examination.
              </p>
            </Reveal>
          </div>

          <Stagger className="academic-ledger grid gap-6 border-y border-hairline py-8 sm:grid-cols-3">
            {academicFacts.map((f) => (
              <StaggerItem key={f.label} className="sm:border-r sm:border-hairline sm:pr-4 sm:last:border-0">
                <p className="font-display text-4xl font-medium text-gold">{f.value}</p>
                <p className="mt-3 text-sm font-medium">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.detail}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div>
            <SectionHeading index="02" eyebrow="The transition" title="From diploma" accent="to the workplace." />
            <Reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                After DAE, I wanted to see how IT works where it really matters. Today I'm an{" "}
                <span className="text-foreground">ICT Apprentice at Fauji Fertilizer Company (FFC), Port Qasim</span>,
                gaining exposure to IT operations, computer systems, networking, support and troubleshooting in a
                professional environment.
              </p>
              <p>
                It is a different kind of classroom — one where reliability matters, problems are real and I learn from
                experienced professionals every day.
              </p>
            </Reveal>
          </div>

          <div>
            <SectionHeading index="03" eyebrow="Freelancing" title="Building for" accent="real people." />
            <Reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Freelancing is where I practise the creative side of technology: building and managing WordPress websites,
                improving search visibility with on-page and technical SEO, and designing graphics that help small brands
                look professional.
              </p>
              <p>
                It also led to <span className="text-foreground">Skill Serve</span> — my own platform concept for connecting
                people with skilled local service providers, designed in English and Urdu.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <ImagePlaceholder label="Add a photo of your workspace, a project in progress or you at work." className="aspect-[16/9]" />
          </Reveal>
        </div>
      </section>

      {/* Approach statement */}
      <section className="container-page mt-32 sm:mt-44" aria-labelledby="approach-title">
        <Reveal>
          <p className="eyebrow flex items-center gap-3"><span className="text-gold">04</span><span className="h-px w-8 bg-gold/50" aria-hidden="true" />My approach to technology</p>
        </Reveal>
        <h2 id="approach-title" className="mt-8 max-w-5xl editorial-statement leading-[1.16] font-medium">
          <SplitText text="Understand the problem first. Choose the simplest tool that solves it." />{" "}
          <SplitText text="Then keep learning until there's a better one." delay={0.2} wordClassName="font-serif italic font-normal tracking-normal text-gold" />
        </h2>
      </section>

      {/* Values */}
      <section className="container-page mt-24" aria-label="Professional values">
        <Stagger as="ol" className="values-ledger grid border-t border-hairline">
          {values.map((v, i) => (
            <StaggerItem
              as="li"
              key={v.title}
              className="group border-b border-hairline py-8"
            >
              <div className="grid items-baseline gap-5 sm:grid-cols-[3rem_1fr]">
                <span className="font-serif text-2xl italic text-gold">0{i + 1}</span>
                <div className="grid gap-4 md:grid-cols-2">
                  <h3 className="text-2xl font-medium transition-colors group-hover:text-gold">{v.title}</h3>
                  <p className="max-w-md leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Timeline */}
      <section className="container-page mt-32 sm:mt-44" aria-labelledby="timeline-title">
        <SectionHeading index="05" eyebrow="My journey" title="The path" accent="so far." align="center" className="mb-20" />
        <Timeline items={milestones} />
      </section>

      {/* Vision */}
      <section className="container-page mt-32 sm:mt-44" aria-labelledby="vision-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading index="06" eyebrow="Ambition & vision" title="Where I'm" accent="heading." />
          </div>
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
            <p>
              In the near term, I want to make the most of my apprenticeship, complete my ADP in Computing and grow my
              development skills with React and TypeScript.
            </p>
            <p>
              Longer term, I want to become a well-rounded technology professional — someone who understands both the
              infrastructure that keeps organisations running and the software that people use every day. I'm especially
              drawn to software engineering, artificial intelligence and cybersecurity.
            </p>
            <p className="text-foreground">
              And I want to ship Skill Serve — to build something that makes everyday life a little easier for people in
              Pakistan.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactInvite />
    </>
  );
}
