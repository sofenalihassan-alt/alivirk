export type RoadmapStage = "Currently learning" | "Exploring next" | "Future goals";

export type RoadmapItem = {
  stage: RoadmapStage;
  title: string;
  why: string;
  focus: string[];
};

export const roadmap: RoadmapItem[] = [
  {
    stage: "Currently learning",
    title: "React & TypeScript",
    why: "The stack behind Skill Serve. I want to move from page builders to building products in code.",
    focus: ["Components and state", "Typed JavaScript", "Routing and data"],
  },
  {
    stage: "Currently learning",
    title: "Software development foundations",
    why: "My ADP Computing studies are giving me the programming and computer science base I need.",
    focus: ["Programming fundamentals", "Problem solving", "Clean, readable code"],
  },
  {
    stage: "Currently learning",
    title: "Web technologies",
    why: "Understanding how the modern web works — performance, accessibility and search — makes every site better.",
    focus: ["Performance", "Accessibility basics", "Technical SEO"],
  },
  {
    stage: "Exploring next",
    title: "AI & machine learning",
    why: "AI is changing how software is built and used. I want to understand it beyond the headlines.",
    focus: ["How models work", "Practical AI tools", "Responsible use"],
  },
  {
    stage: "Exploring next",
    title: "Cybersecurity",
    why: "My IT work shows me every day how much depends on systems being secure.",
    focus: ["Security fundamentals", "Network security", "Good security habits"],
  },
  {
    stage: "Exploring next",
    title: "Ethical hacking",
    why: "Learning how attacks work, in a responsible learning context, is the best way to understand defence.",
    focus: ["Security testing concepts", "Lab-based practice"],
  },
  {
    stage: "Future goals",
    title: "Ship Skill Serve",
    why: "Turn my flagship concept into a product that genuinely helps people find local services.",
    focus: ["Complete core journeys", "Test with real users"],
  },
  {
    stage: "Future goals",
    title: "Grow as a technology professional",
    why: "Combine IT infrastructure experience with development skills to become a well-rounded professional.",
    focus: ["Deeper infrastructure knowledge", "Professional development", "Continuous learning"],
  },
];

export const roadmapStages: RoadmapStage[] = ["Currently learning", "Exploring next", "Future goals"];

export type DraftNote = { title: string; topic: string; excerpt: string; readTime: string };

/** Draft articles — replace with real writing when ready. */
export const draftNotes: DraftNote[] = [
  {
    title: "From DAE to a professional IT environment",
    topic: "Professional development",
    excerpt: "What changed when classroom knowledge met a real workplace — and what I wish I had known earlier.",
    readTime: "Draft",
  },
  {
    title: "Why I am building Skill Serve in two languages",
    topic: "Product thinking",
    excerpt: "Notes on designing for English and Urdu users, and why bilingual is more than translation.",
    readTime: "Draft",
  },
  {
    title: "On-page SEO checklist for small WordPress sites",
    topic: "SEO",
    excerpt: "The practical steps I go through before calling a small business website ready.",
    readTime: "Draft",
  },
  {
    title: "Troubleshooting is a way of thinking",
    topic: "IT support",
    excerpt: "A simple method for moving from symptom to cause without guessing.",
    readTime: "Draft",
  },
];
