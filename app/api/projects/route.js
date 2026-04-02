export async function GET(request) {
  const projects = [
    {
      name: "Helicone (YC W23)",
      description:
        "Shipped 250+ merged PRs as a Software Engineer. Built the AI gateway (multi-provider proxy), LLM observability dashboard, multilingual SDKs, and production Next.js features for the open-source LLM observability platform.",
      stack: ["TypeScript", "Next.js", "Cloudflare Workers", "PostgreSQL"],
      link: "https://www.helicone.ai",
      image: "exun.png",
    },
    {
      name: "gh-repo-fzf",
      description:
        "A GitHub CLI extension for fuzzy-searching your repositories and performing actions on them. 45+ stars on GitHub.",
      stack: ["Shell", "GitHub CLI"],
      link: "https://github.com/kavinvalli/gh-repo-fzf",
      image: "url.png",
    },
    {
      name: "RITA - React, Inertia, TypeScript, Adonis",
      description:
        "A batteries-included starter for AdonisJS apps with React, Inertia.js, and TypeScript. 38+ stars.",
      stack: ["TypeScript", "AdonisJS", "React", "Inertia.js"],
      link: "https://github.com/kavinvalli/rita",
      image: "cbse.png",
    },
    {
      name: "Liberty: Experience the ISS",
      description:
        "A browser-based 3D visualization of the International Space Station in real-time. Won 2nd place at the NASA Space Apps Regional Round among 90+ teams.",
      stack: ["TypeScript", "Next.js", "Rust", "WASM"],
      link: "https://space-apps-eosin.vercel.app",
      image: "ndss.png",
      largeImage: "liberty-lg.png",
    },
    {
      name: "Sudocrypt v11.0",
      description:
        "Developed the platform for Sudocrypt v11.0, a cryptic hunt organized by Exun Clan. 1.5k+ participants and 50k+ attempts over two days. 43+ stars.",
      stack: ["PHP", "Laravel", "TypeScript", "React"],
      link: "https://github.com/kavinvalli/sudocrypt-v11",
      image: "sudocrypt.png",
    },
    {
      name: "Wunderkind - DPS Goethe Quiz",
      description:
        "Platform for a quiz by Goethe Institut and DPS Society. Used by 9,000+ students across 2 iterations with 99% availability.",
      stack: ["PHP", "Laravel", "TypeScript", "React"],
      link: "https://dpsgoethequiz.com",
      image: "quiz.png",
    },
    {
      name: "shadcn-table-v2",
      description:
        "A shadcn/ui table component with server-side sorting, filtering, and pagination. 7+ stars.",
      stack: ["TypeScript", "Next.js", "shadcn/ui"],
      link: "https://github.com/kavinvalli/shadcn-table-v2",
      image: "url.png",
    },
    {
      name: "Stripe Subscriptions Demo",
      description:
        "A full-stack demo showcasing Stripe subscription integration with Next.js. 17+ stars.",
      stack: ["TypeScript", "Next.js", "Stripe"],
      link: "https://github.com/kavinvalli/stripe-subscriptions-demo",
      image: "url.png",
    },
  ];

  return Response.json(projects, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
