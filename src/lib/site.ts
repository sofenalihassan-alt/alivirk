/**
 * Personal information and links — edit this file to update details site-wide.
 * Anything set to `null` is shown as a clearly labelled placeholder.
 */
export const site = {
  name: "Ali Hassan",
  shortName: "AH",
  role: "ICT Apprentice · Freelancer · Computing Student",
  headline: "Building Digital Experiences. Exploring What's Next.",
  tagline:
    "An aspiring technology professional passionate about building meaningful digital solutions, exploring emerging technologies and turning ideas into reality.",
  location: "Pakistan",
  email: "spark@skillserve.store",
  whatsapp: {
    display: "+92 302 4942710",
    href: "https://wa.me/923024942710",
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/ali-hassan-a54a1028b/",
    github: "https://github.com/sofenalihassan-alt",
    /** Add further profiles here (e.g. Instagram, X, Fiverr, Upwork). */
    others: [] as { label: string; href: string }[],
  },
} as const;

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/expertise", label: "Expertise" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/learning", label: "Learning" },
  { to: "/contact", label: "Contact" },
] as const;

export type NavPath = (typeof navItems)[number]["to"];
