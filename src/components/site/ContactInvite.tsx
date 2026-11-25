import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { CtaAnchor, CtaLink } from "./Cta";
import { site } from "@/lib/site";

export function ContactInvite() {
  return (
    <section className="contact-invitation relative mt-32 border-y border-hairline sm:mt-44" aria-labelledby="invite-title">
      <div className="container-page relative overflow-hidden py-16 sm:py-24">
        <span className="invitation-mark pointer-events-none absolute right-8 bottom-8 font-serif italic text-gold/15" aria-hidden="true">↗</span>
        <Reveal>
          <p className="eyebrow">Open to opportunities</p>
        </Reveal>
        <h2 id="invite-title" className="invitation-title relative mt-6 max-w-4xl font-medium">
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
