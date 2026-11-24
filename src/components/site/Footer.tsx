import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-hairline">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" aria-hidden="true" />
      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-medium leading-tight sm:text-4xl">
              Let's build something
              <span className="font-serif italic font-normal text-gold"> meaningful.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              ICT Apprentice at FFC Port Qasim, freelancer and computing student — open to collaboration,
              freelance work and conversations about technology.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block border-b border-gold/40 pb-1 font-display text-lg text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm md:grid-cols-1">
              {navItems.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-muted-foreground transition-colors hover:text-foreground">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow">Connect</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Linkedin className="size-4" aria-hidden="true" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Github className="size-4" aria-hidden="true" /> GitHub
                </a>
              </li>
              <li>
                <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Mail className="size-4" aria-hidden="true" /> Email
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow">Currently</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>ICT Apprentice, FFC</li>
              <li>ADP Computing, VU</li>
              <li>
                <Link to="/projects/$slug" params={{ slug: "skill-serve" }} className="hover:text-gold">
                  Building Skill Serve
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 select-none font-display text-[clamp(3.5rem,17vw,15rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-fade opacity-60" aria-hidden="true">
          Ali Hassan
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Designed & built with care in Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}
