export const projectCategories = [
  "Web Development",
  "SEO & Optimization",
  "Personal Experiments",
  "IT & Technical",
  "Learning Projects",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  category: ProjectCategory;
  technologies: string[];
  features: string[];
  /** Live URL, or null when not available. */
  liveUrl: string | null;
  /** Public repository URL, or null when not public. */
  githubUrl: string | null;
  /** Placeholder entries are clearly labelled until real work is supplied. */
  isPlaceholder: boolean;
  featured?: boolean;
  /** Visual style of the generated preview. */
  preview: "skillserve" | "portfolio" | "placeholder";
};

export const projects: Project[] = [
  {
    slug: "skill-serve",
    title: "Skill Serve",
    summary:
      "A bilingual platform concept that connects customers with skilled local service providers — plumbers, electricians, cleaners and more.",
    description: [
      "Finding a trustworthy electrician or plumber nearby still mostly depends on word of mouth. Skill Serve is my answer to that: a single place where people can discover skilled local professionals, compare them, and reach out with confidence.",
      "The experience is designed in both English and Urdu so it works for the people who actually need it — not only for those comfortable with English-first apps. It is built around two journeys: customers looking for help, and providers who want to be found.",
      "Skill Serve is my flagship project and an ongoing build. It is where I bring together web development, UX thinking and the practical side of how local services work in Pakistan.",
    ],
    category: "Web Development",
    technologies: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vercel"],
    features: [
      "Bilingual English and Urdu experience",
      "Service discovery and search",
      "Provider profiles",
      "Ratings and reviews",
      "Location-based discovery",
      "Booking-oriented functionality",
      "Emergency service concept",
      "Separate customer and provider experiences",
    ],
    liveUrl: "https://skillserve.store",
    githubUrl: null,
    isPlaceholder: false,
    featured: true,
    preview: "skillserve",
  },
  {
    slug: "personal-portfolio",
    title: "This Portfolio",
    summary:
      "The site you are on — a multi-page personal brand built with a custom midnight-and-gold design system, motion and glass surfaces.",
    description: [
      "I wanted a portfolio that felt personal rather than templated. Every page is designed around my real background: the DAE journey, my apprenticeship at FFC, freelancing and what I am learning next.",
      "It is built as a full multi-page site with route transitions, scroll-based storytelling, a working contact form and SEO metadata on every page.",
    ],
    category: "Personal Experiments",
    technologies: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "Motion"],
    features: [
      "Custom design system with selective glassmorphism",
      "Animated page transitions and scroll reveals",
      "Working contact form with validation",
      "Per-page SEO metadata and sitemap",
    ],
    liveUrl: null,
    githubUrl: null,
    isPlaceholder: false,
    preview: "portfolio",
  },
  {
    slug: "wordpress-website-placeholder",
    title: "WordPress Website",
    summary: "Placeholder for a WordPress site I have built or managed. Details will be added soon.",
    description: [
      "This is a placeholder. Replace it with a real WordPress project: what the site was for, what you set up (theme, plugins, pages), and what you were responsible for.",
    ],
    category: "Web Development",
    technologies: ["WordPress", "HTML", "CSS"],
    features: ["Add the key things you built or configured"],
    liveUrl: null,
    githubUrl: null,
    isPlaceholder: true,
    preview: "placeholder",
  },
  {
    slug: "seo-optimization-placeholder",
    title: "SEO & Site Optimization",
    summary: "Placeholder for an on-page or technical SEO project. Details will be added soon.",
    description: [
      "This is a placeholder. Describe a site you optimised: what you audited, which on-page and technical fixes you made, and what you learned. Only add results you can verify.",
    ],
    category: "SEO & Optimization",
    technologies: ["On-page SEO", "Technical SEO", "Keyword research"],
    features: ["Add the audit and optimisation steps you carried out"],
    liveUrl: null,
    githubUrl: null,
    isPlaceholder: true,
    preview: "placeholder",
  },
  {
    slug: "it-technical-placeholder",
    title: "IT & Networking Project",
    summary: "Placeholder for a hands-on IT, networking or troubleshooting project. Details will be added soon.",
    description: [
      "This is a placeholder. Use it for a technical project such as a network setup, a lab exercise or a system you configured — without sharing anything confidential from your workplace.",
    ],
    category: "IT & Technical",
    technologies: ["Networking", "Hardware", "Troubleshooting"],
    features: ["Add the setup, tools and outcome"],
    liveUrl: null,
    githubUrl: null,
    isPlaceholder: true,
    preview: "placeholder",
  },
  {
    slug: "learning-project-placeholder",
    title: "Learning Project",
    summary: "Placeholder for a project built while learning React, TypeScript or another new skill.",
    description: [
      "This is a placeholder. Add a small project from your learning — a coursework assignment, a React experiment or a practice app — and link the GitHub repository.",
    ],
    category: "Learning Projects",
    technologies: ["React", "TypeScript"],
    features: ["Add what you built and what it taught you"],
    liveUrl: null,
    githubUrl: null,
    isPlaceholder: true,
    preview: "placeholder",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
