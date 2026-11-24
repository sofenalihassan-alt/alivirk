export type SkillLevel = "Practical experience" | "Working knowledge" | "Fundamentals" | "Currently exploring";

export type Skill = { name: string; level: SkillLevel; description: string };

export type SkillCategory = {
  id: string;
  letter: string;
  title: string;
  intro: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "web",
    letter: "A",
    title: "Web Development",
    intro: "Building and running websites people can actually use — mostly with WordPress, increasingly with code.",
    skills: [
      { name: "WordPress", level: "Practical experience", description: "Setting up sites, configuring themes and plugins, building pages and keeping them updated as a freelancer." },
      { name: "HTML", level: "Working knowledge", description: "Writing clean, semantic page structure and understanding what a page builder produces underneath." },
      { name: "CSS", level: "Working knowledge", description: "Styling layouts, spacing and typography, and adjusting themes when the defaults are not enough." },
      { name: "JavaScript", level: "Fundamentals", description: "Core language concepts and small interactive features; growing this through React and TypeScript." },
      { name: "Responsive design", level: "Working knowledge", description: "Making sure layouts read well on phones first, then tablets and desktops." },
      { name: "Website management", level: "Practical experience", description: "Content updates, backups, plugin hygiene and keeping a site healthy after launch." },
    ],
  },
  {
    id: "seo",
    letter: "B",
    title: "Search Engine Optimization",
    intro: "Helping the right people find a website — through structure, content and technical care.",
    skills: [
      { name: "On-page SEO", level: "Practical experience", description: "Titles, meta descriptions, headings, internal links and content structure that match search intent." },
      { name: "Technical SEO fundamentals", level: "Fundamentals", description: "Indexing, sitemaps, robots rules, page speed basics and fixing common crawl issues." },
      { name: "Keyword research", level: "Working knowledge", description: "Finding what people actually search for and mapping it to the right pages." },
      { name: "Website optimization", level: "Working knowledge", description: "Improving load times, images and page structure so sites feel faster and rank better." },
      { name: "Search visibility", level: "Working knowledge", description: "Understanding how a site appears in search and what can be improved over time." },
    ],
  },
  {
    id: "it",
    letter: "C",
    title: "IT & Infrastructure",
    intro: "The practical side of technology — the work I am developing every day as an ICT Apprentice.",
    skills: [
      { name: "IT support", level: "Practical experience", description: "Helping users with everyday technical issues in a professional workplace environment." },
      { name: "Troubleshooting", level: "Practical experience", description: "Working methodically from symptom to cause across hardware, software and connectivity." },
      { name: "Computer hardware & software", level: "Working knowledge", description: "Assembling, maintaining and configuring computers and the software that runs on them." },
      { name: "Networking fundamentals", level: "Fundamentals", description: "How networks are structured, addressed and connected, and how to diagnose common problems." },
      { name: "System administration fundamentals", level: "Fundamentals", description: "User accounts, system settings and the routines that keep computers running reliably." },
    ],
  },
  {
    id: "creative",
    letter: "D",
    title: "Creative & Digital",
    intro: "Design and digital work that supports the websites and brands I help with.",
    skills: [
      { name: "Graphic design", level: "Working knowledge", description: "Social graphics, simple brand visuals and layouts that look clean and consistent." },
      { name: "Digital marketing fundamentals", level: "Fundamentals", description: "How content, search and social channels work together to reach an audience." },
      { name: "Content & website management", level: "Practical experience", description: "Organising, publishing and maintaining content so a site stays current." },
      { name: "MS Office & productivity tools", level: "Practical experience", description: "Documents, spreadsheets and presentations for everyday professional work." },
    ],
  },
  {
    id: "exploring",
    letter: "E",
    title: "Currently Exploring",
    intro: "Where I am heading next. These are learning areas, not claims of expertise.",
    skills: [
      { name: "React & TypeScript", level: "Currently exploring", description: "Learning component-based development and typed JavaScript — the stack behind Skill Serve." },
      { name: "Software engineering", level: "Currently exploring", description: "Programming foundations and good engineering habits through my ADP Computing studies." },
      { name: "Artificial intelligence", level: "Currently exploring", description: "Understanding how modern AI tools work and where they genuinely help." },
      { name: "Cybersecurity", level: "Currently exploring", description: "Security basics: how systems are attacked, and how they are protected." },
      { name: "Ethical hacking", level: "Currently exploring", description: "Studying responsible security testing concepts in a learning context." },
    ],
  },
];

export const levelOrder: SkillLevel[] = [
  "Practical experience",
  "Working knowledge",
  "Fundamentals",
  "Currently exploring",
];
