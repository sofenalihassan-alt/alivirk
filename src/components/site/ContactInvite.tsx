import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { CtaAnchor, CtaLink } from "./Cta";
import { site } from "@/lib/site";

export function ContactInvite() {
  return (
    <section className="container-page mt-32 sm:mt-44" aria-labelledby="invite-title">
      <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 sm:rounded-[3rem] sm:px-12 sm:py-24 lg:px-20">
        <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-gold/15 blur-[100px]" aria-hidden="true" />
        <div className="motion-safe-anim pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full border border-gold/20 [animation:spin_40s_linear_infinite]" aria-hidden="true">
          <span className="absolute top-1/2 -left-1 size-2 rounded-full bg-gold" />
        </div>
        <Reveal>
          <p className="eyebrow">Open to opportunities</p>
        </Reveal>
        <h2 id="invite-title" className="mt-6 max-w-4xl text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] font-medium">
          <SplitText text="Have an idea, a project or a question?" />{" "}
          <SplitText text="Let's talk." delay={0.2} wordClassName="font-serif italic font-normal tracking-normal text-gold" />
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-muted-foreground sm:text-lg">
            Whether it is a WordPress site, an SEO review, design work or simply a conversation about technology —
            I reply to every message personally.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink to="/contact">Start a conversation</CtaLink>
            <CtaAnchor href={site.whatsapp.href}>WhatsApp me</CtaAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
