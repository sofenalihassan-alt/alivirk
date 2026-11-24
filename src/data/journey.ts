export type Milestone = {
  id: string;
  kind: "Education" | "Professional" | "Freelance";
  status: "Completed" | "Current" | "In progress" | "Ongoing";
  title: string;
  org: string;
  place?: string;
  summary: string;
  highlights: string[];
};

export const milestones: Milestone[] = [
  {
    id: "dae",
    kind: "Education",
    status: "Completed",
    title: "DAE in Computer Information Technology",
    org: "Government College of Technology (GCT)",
    place: "Bhakkar",
    summary:
      "Three years of hands-on technical study that gave me my foundations in computers, programming, networking and IT systems.",
    highlights: [
      "First position in academics in all three DAE years",
      "2,125 / 2,250 marks overall",
      "4th position in the technical board examination",
    ],
  },
  {
    id: "freelance",
    kind: "Freelance",
    status: "Ongoing",
    title: "Freelancer — Web, SEO & Design",
    org: "Independent",
    summary:
      "Taking on WordPress, SEO and design work for people who need a reliable online presence, and learning how to manage projects end to end.",
    highlights: [
      "WordPress website development and management",
      "On-page and technical SEO",
      "Graphic design and digital marketing fundamentals",
    ],
  },
  {
    id: "ffc",
    kind: "Professional",
    status: "Current",
    title: "ICT Apprentice",
    org: "Fauji Fertilizer Company (FFC)",
    place: "Port Qasim, Pakistan",
    summary:
      "Building practical experience inside a professional IT environment at one of Pakistan's leading industrial organisations.",
    highlights: [
      "Exposure to IT operations in a professional environment",
      "Computer systems, networking and IT support",
      "Troubleshooting and continuous technical learning",
      "Collaborating with experienced IT professionals",
    ],
  },
  {
    id: "adp",
    kind: "Education",
    status: "In progress",
    title: "Associate Degree Program in Computing",
    org: "Virtual University of Pakistan",
    summary:
      "Studying computing alongside work to deepen my understanding of software, programming and computer science.",
    highlights: ["Currently pursuing", "Strengthening software and programming foundations"],
  },
];

export const academicFacts = [
  { value: "1st", label: "Position in academics", detail: "All three DAE years" },
  { value: "2,125", label: "Out of 2,250 marks", detail: "DAE CIT total" },
  { value: "4th", label: "Board position", detail: "Technical board examination" },
] as const;
