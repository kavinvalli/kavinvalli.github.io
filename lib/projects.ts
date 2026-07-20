// Single source of truth for projects — consumed by the homepage and /api/projects.
export type Project = {
  name: string;
  description: string;
  stack: string[];
  link: string;
};

export const projects: Project[] = [
  {
    name: "Liberty",
    description:
      "A browser-based 3D visualisation of the International Space Station in realtime. Won 2nd place at the NASA Space Apps regional round among 90+ teams.",
    stack: ["TypeScript", "Next.js", "Rust", "WASM"],
    link: "https://space-apps-eosin.vercel.app",
  },
  {
    name: "Typewind",
    description:
      "The strictly typed companion for Tailwind CSS — write Tailwind with the full power of TypeScript. Core maintainer.",
    stack: ["TypeScript"],
    link: "https://typewind.vercel.app",
  },
  {
    name: "Wunderkind — DPS Goethe Quiz",
    description:
      "A quiz platform for Goethe Institut × DPS Society, used by 9,000+ students across two iterations with a 99% availability rating.",
    stack: ["PHP", "Laravel", "TypeScript", "React"],
    link: "https://dpsgoethequiz.com",
  },
  {
    name: "Sudocrypt v11.0",
    description:
      "The platform for Exun Clan's cryptic hunt — 1.5k+ participants and 50k+ attempts over two days.",
    stack: ["PHP", "Laravel", "TypeScript", "React"],
    link: "https://github.com/kavinvalli/sudocrypt-v11",
  },
  {
    name: "Cognizer",
    description:
      "A Chrome extension to connect with people during and after conferences. 2nd runner-up at Code Warriors soBig Hackathon 2021.",
    stack: ["JavaScript", "Node.js", "Chrome Extension API"],
    link: "https://cognizer.kavin.me/",
  },
  {
    name: "Cricket VSCode Extension",
    description:
      "Live cricket news and scores from inside your editor, without breaking flow.",
    stack: ["JavaScript"],
    link: "https://github.com/kavin25/cricket-vscode-extension",
  },
];
