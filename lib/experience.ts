// Work history. Photos are optional — a card renders fine without any, so you
// can fill these in as you get them.
//
// One folder per company under /public/images/experience/<company>/, listed
// oldest-to-newest or best-first: the first image is the one the card shows.
export type Experience = {
  company: string;
  role: string;
  // free text: "winter 2026", "2026 — present". Omit if you'd rather not date it.
  period?: string;
  description: string;
  href?: string;
  // paths under /public, e.g. ["/images/experience/vercel/office.jpg"].
  // The first is the card's photo; the rest are there for later.
  images?: string[];
};

export const experience: Experience[] = [
  {
    company: "Replicas",
    role: "Software Engineer",
    period: "2026 — present",
    description: "Cloud coding agents for engineering teams. YC P26.",
    href: "https://tryreplicas.com",
    // images: ["/images/experience/replicas/1.jpg"],
  },
  {
    company: "Vercel",
    role: "Software Engineer, v0",
    period: "winter 2026",
    description:
      "Folders, version history, VM tiering, and the v0 Slack agent.",
    href: "https://v0.app",
    images: [
      "/images/experience/vercel/IMG_8786.png",
      "/images/experience/vercel/2.JPG",
      "/images/experience/vercel/3.PNG",
    ],
  },
  {
    company: "Helicone",
    role: "Software Engineer",
    // period: "",  ← fill in, I didn't want to guess the term
    description: "LLM observability tooling and multilingual SDKs. YC W23.",
    href: "https://helicone.ai",
    images: [
      "/images/experience/helicone/1.jpeg",
      "/images/experience/helicone/2.png",
      "/images/experience/helicone/3.png",
      "/images/experience/helicone/4.png",
    ],
  },
  {
    company: "Arcturus Networks",
    role: "Software Engineer",
    // period: "",  ← fill in
    description: "Embedded full-stack systems.",
    href: "https://www.arcturusnetworks.com",
    images: [
      "/images/experience/arcturus/1.jpg",
      "/images/experience/arcturus/2.jpg"
    ],
  },
];
