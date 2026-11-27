import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-page pt-4">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-md px-3 py-2 transition-all duration-500 sm:px-4",
              scrolled || open ? "glass-lens" : "border-b border-hairline bg-background/55 backdrop-blur-md",
            )}
          >
            <Wordmark />

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navItems
                  .filter((n) => n.to !== "/contact")
                  .map((item) => {
                    const active = isActive(item.to);
                    return (
                      <li key={item.to} className="relative">
                        <Link
                          to={item.to}
                          className={cn(
                            "relative z-10 block px-3 py-2 text-sm transition-colors duration-300",
                            active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                        {active && (
                          <motion.span
                            layoutId="nav-indicator"
                            className="absolute inset-x-3 bottom-0 h-px bg-gold"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            aria-hidden="true"
                          >
                            <span className="sr-only">Active page</span>
                          </motion.span>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/contact"
                className="hidden min-h-10 items-center gap-2 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft sm:inline-flex"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-foreground/50" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary-foreground" />
                </span>
                Let's talk
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="grid size-11 place-items-center rounded-full glass-subtle lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-nav"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="container-page mobile-nav-safe flex flex-1 flex-col justify-center pt-24 pb-10 overflow-y-auto">
              <ul className="space-y-1">
                {navItems.map((item, i) => {
                  const active = isActive(item.to);
                  return (
                    <motion.li
                      key={item.to}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={item.to}
                        className="group flex items-baseline gap-4 py-2"
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="font-display text-xs text-gold">0{i + 1}</span>
                        <span
                          className={cn(
                            "font-display text-3xl font-medium leading-none sm:text-5xl transition-colors",
                            active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </span>
                        {active && <span className="size-2 rounded-full bg-gold" aria-hidden="true" />}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-10 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gold">LinkedIn</a>
                <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-gold">GitHub</a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
