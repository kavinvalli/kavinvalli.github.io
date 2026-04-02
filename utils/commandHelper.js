const COMMANDS = [
  {
    command: "about",
    description: "About Me",
  },
  {
    command: "education",
    description: "My Education",
  },
  {
    command: "experience",
    description: "Work Experience",
  },
  {
    command: "skills",
    description: "My Tech Skills",
  },
  {
    command: "projects",
    description: "My Tech Projects",
  },
  {
    command: "resume",
    description: "My Resume",
  },
  {
    command: "contact",
    description: "Contact Me",
  },
  {
    command: "blog",
    description: "Visit my blog",
  },
  {
    command: "youtube",
    description: "Visit my youtube channel (@livecode247)",
  },
  {
    command:
      // 'clear <span style="color: var(--primary)">(Ctrl+L shortcut)</span>',
      "clear",
    description: "Clear terminal",
  },
];

const getProjects = async () => {
  const projects = await (await fetch("/api/projects")).json();
  const projectHTML =
    `<h3>My Projects (You can scroll)</h3>` +
    projects
      .map(
        (project) => `<div class="command">
        <a href="${project.link}" target="_blank"><b class="command">${
          project.name
        }</b></a> - <b>${project.stack.join(", ")}</b>
        <p class="meaning">${project.description}</p>
      </div>`
      )
      .join("");
  return projectHTML;
};

const getContacts = async () => {
  const contactMediums = await (await fetch("/api/contacts")).json();
  return contactMediums
    .map(
      (contact) => `<div style="display: flex; justify-content: space-between;">
      <p style="font-size: 15px">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank">${contact.username}</a>
    </div>`
    )
    .join("");
};

export const CONTENTS = {
  help: () =>
    COMMANDS.map(
      (command) => `<div style="display: flex; justify-content: space-between;">
        <p style="font-size: 15px">${command.command}</p>
        <p>${command.description}</p>
      </div>`
    ).join("") +
    `<br />
      <div class="command">Type one of the above to view. For eg. <span style="color: var(--secondary)">about</span></div>`,
  about: () => `My name is Kavin Desi Valli. I'm a Computer Engineering student at the <a href="https://uwaterloo.ca" target="_blank">University of Waterloo</a> (CE '28) and a fullstack developer.
    <br/><br/>
    I'm currently a Software Engineer Intern at <a href="https://vercel.com" target="_blank">Vercel</a>, working on <a href="https://v0.dev" target="_blank">v0</a>. Previously, I shipped developer tooling at <a href="https://www.helicone.ai" target="_blank">Helicone</a> (YC W23) - LLM observability, an AI gateway, multilingual SDKs, and production Next.js features (250+ merged PRs). Before that, I built embedded full-stack systems at <a href="https://www.arcturusnetworks.com" target="_blank">Arcturus Networks</a>.
    <br /><br />
    I used to run <a href="https://youtube.com/@livecode247" target="_blank">LiveCode247</a> (202K+ views, 8K watch hours), and served as President of <a href="https://exunclan.com" target="_blank">Exun Clan</a> ('22-23). I am also a Chapter Officer at the <a href="https://new-delhi-space-society.github.io" target="_blank">New Delhi Space Society</a> and a core maintainer of <a href="https://typewind.vercel.app" target="_blank">Typewind</a>.
  `,
  experience: () => `
  <div class="command">
    <b class="command">Software Engineer Intern</b> @ <a href="https://vercel.com" target="_blank">Vercel</a> <span style="color: var(--secondary)">(2025 - Present)</span>
    <p class="meaning">Working on <a href="https://v0.dev" target="_blank">v0</a>, Vercel's generative UI product.</p>
  </div>
  <div class="command">
    <b class="command">Software Engineer</b> @ <a href="https://www.helicone.ai" target="_blank">Helicone</a> (YC W23) <span style="color: var(--secondary)">(2024 - 2025)</span>
    <p class="meaning">Shipped 250+ merged PRs. Built the AI gateway (multi-provider proxy), LLM observability dashboard, multilingual SDKs (Python, TypeScript, Rust), and production Next.js features.</p>
  </div>
  <div class="command">
    <b class="command">Software Engineer Intern</b> @ <a href="https://www.arcturusnetworks.com" target="_blank">Arcturus Networks</a> <span style="color: var(--secondary)">(2024)</span>
    <p class="meaning">Built embedded full-stack systems for network infrastructure.</p>
  </div>
  `,
  education:
    () => `I graduated from <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram</a> (New Delhi) and am currently pursuing a Bachelor's in Computer Engineering at the <a href="https://uwaterloo.ca" target="_blank">University of Waterloo</a> (Class of 2028).`,
  skills: () => `
  Experienced with TypeScript, JavaScript, Python, Rust, and PHP.<br /><br />
  <div class="skill"><b>languages</b>: TypeScript, JavaScript, Python, Rust, PHP, Lua, SQL<br /></div>
  <div class="skill"><b>frameworks</b>: Next.js, React, Node.js, Express, Django, Laravel, AdonisJS<br /></div>
  <div class="skill"><b>infrastructure</b>: Cloudflare Workers, Vercel, AWS, Docker<br /></div>
  <div class="skill"><b>databases</b>: PostgreSQL, MongoDB, MySQL, SQLite, ClickHouse<br /></div>
  <div class="skill"><b>tools</b>: Git, Neovim, tmux, fish shell (<a href="https://github.com/kavinvalli/dotfiles" target="_blank">dotfiles</a>)<br /></div>
  <br />
  Also experienced with Flutter for mobile development.
  `,
  projects: getProjects,
  contact: getContacts,
  resume: () => {
    window.open("https://kavin.me/resume.pdf", "_blank");
    return "";
  },
  error: (input) =>
    `<div class="help-command">sh: Unknown command: ${input}</div><div class="help-command">See \`help\` for info`,
  blog: () => {
    window.open("https://livecode247.com", "_blank");
    return "";
  },
  youtube: () => {
    window.open("https://youtube.com/@livecode247", "_blank");
    return "";
  },
};
