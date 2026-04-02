export async function GET(request) {
  const projects = [
    {
      name: "Helicone",
      description:
        "Open-source LLM observability platform (YC W23). Shipped developer tooling including multilingual SDKs, production Next.js features, and core observability functionality. 5.4K+ stars on GitHub.",
      stack: ["TypeScript", "Next.js", "PostgreSQL", "ClickHouse"],
      link: "https://github.com/Helicone/helicone",
      image: "ndss.png",
    },
    {
      name: "Helicone AI Gateway",
      description:
        "The fastest, lightest, and easiest-to-integrate open-source AI gateway. Built with Rust for high performance. Supports caching, rate-limiting, load balancing, and observability. 550+ stars.",
      stack: ["Rust", "TypeScript"],
      link: "https://github.com/Helicone/ai-gateway",
      image: "ndss.png",
    },
    {
      name: "Typewind",
      description:
        "Core maintainer of Typewind - bringing the safety of TypeScript to the magic of Tailwind CSS. 2.2K+ stars on GitHub.",
      stack: ["TypeScript"],
      link: "https://typewind.dev/",
      image: "ndss.png",
    },
    {
      name: "Liberty: Experience the ISS like never before.",
      description:
        "A browser-based 3D visualisation of the International Space Station in realtime. Won second place in the NASA Space Apps Regional Round among 90+ teams.",
      stack: ["TypeScript", "Next.js", "Rust", "WASM"],
      link: "https://space-apps-eosin.vercel.app",
      image: "ndss.png",
      largeImage: "liberty-lg.png",
    },
    {
      name: "gh-repo-fzf",
      description:
        "A GitHub CLI extension to fuzzy search your repositories and perform actions on them. 45+ stars.",
      stack: ["Shell", "GitHub CLI"],
      link: "https://github.com/kavinvalli/gh-repo-fzf",
      image: "ndss.png",
    },
    {
      name: "Sudocrypt v11.0",
      description:
        "Developed the platform for Sudocrypt v11.0, a cryptic hunt organized by Exun Clan. It had over 1.5K participants and more than 50K attempts over the course of two days.",
      stack: ["PHP", "Laravel", "TypeScript", "React"],
      link: "https://github.com/kavinvalli/sudocrypt-v11",
      image: "sudocrypt.png",
    },
    {
      name: "RITA - React, Inertia, TypeScript, Adonis",
      description:
        "Batteries-included starter for full-stack AdonisJS apps with React, Inertia.js, and TypeScript. 38 stars.",
      stack: ["TypeScript", "AdonisJS", "React", "Inertia.js"],
      link: "https://github.com/kavinvalli/rita",
      image: "ndss.png",
    },
    {
      name: "Wunderkind - DPS Goethe Quiz",
      description:
        "Platform for a quiz conducted by Goethe Institut in collaboration with DPS Society. Used by over 9,000 students across 2 iterations with 99% availability.",
      stack: ["PHP", "Laravel", "TypeScript", "React"],
      link: "https://dpsgoethequiz.com",
      image: "cognizer.png",
    },
    {
      name: "Discord Task Manager Bot",
      description:
        "A task management bot for Discord servers. Open source with community contributions. 18 stars.",
      stack: ["JavaScript", "Node.js", "Discord.js"],
      link: "https://task-manager-bot.github.io",
      image: "task-bot.png",
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
