import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { MotionConfig, motion } from "motion/react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { site } from "@/lib/site";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { PageTransition } from "@/components/site/PageTransition";
import { Atmosphere, CursorAura, IntroLoader } from "@/components/site/Ambient";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  const letters = ["4", "0", "4"];
  return (
    <section className="container-page relative flex min-h-[85vh] flex-col items-center justify-center pt-32 text-center">
      <p className="eyebrow">Lost in the midnight universe</p>
      <h1 className="mt-6 flex font-display text-9xl leading-none font-medium sm:text-[16rem]" aria-label="404">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className={i === 1 ? "font-serif font-normal italic text-gold" : "text-fade"}
            initial={{ y: 80, opacity: 0, rotate: i === 1 ? -20 : 0 }}
            animate={{ y: [0, -14, 0], opacity: 1, rotate: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: i * 0.1 },
              rotate: { duration: 0.8, delay: i * 0.1 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
            }}
          >
            {l}
          </motion.span>
        ))}
      </h1>
      <h2 className="mt-4 text-2xl font-medium sm:text-3xl">This page drifted out of orbit.</h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        The link may be old, or the page may have moved. Let's get you back to familiar ground.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-display text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft"
        >
          Return home
        </Link>
        <Link to="/projects" className="glass inline-flex min-h-12 items-center rounded-full px-6 font-display text-sm">
          See projects
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "ICT Apprentice",
  worksFor: { "@type": "Organization", name: "Fauji Fertilizer Company (FFC)" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Government College of Technology, Bhakkar" },
  email: `mailto:${site.email}`,
  sameAs: [site.socials.linkedin, site.socials.github],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#08090D" },
      { title: "Ali Hassan — Building Digital Experiences" },
      { name: "description", content: site.tagline },
      { name: "author", content: site.name },
      { property: "og:site_name", content: site.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(personJsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <IntroLoader />
        <Atmosphere />
        <CursorAura />
        <Header />
        <main id="main" className="relative z-10">
          <PageTransition>
            {/* Required: nested routes render here. */}
            <Outlet />
          </PageTransition>
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
        <BackToTop />
        <Toaster theme="dark" position="bottom-center" />
      </MotionConfig>
    </QueryClientProvider>
  );
}
