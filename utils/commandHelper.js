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
    command: "work",
    description: "My Work Experience",
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
  about: () => `My name is Kavin Desi Valli. I'm a Computer Engineering student at the <a href="https://uwaterloo.ca/content/home" target="_blank">University of Waterloo</a> (CE '28) and a fullstack developer.
    <br/><br/>
    I'm currently a SWE Intern at <a href="https://vercel.com" target="_blank">Vercel</a>. Previously, I shipped developer tooling at <a href="https://www.helicone.ai" target="_blank">Helicone</a> (YC W23), building LLM observability features, multilingual SDKs, and an open-source <a href="https://github.com/Helicone/ai-gateway" target="_blank">AI Gateway</a> in Rust. Before that, I built embedded full-stack systems at <a href="https://www.arcturusnetworks.com" target="_blank">Arcturus Networks</a>.
    <br /><br />
    I ran <a href="https://youtube.com/@livecode247" target="_blank">LiveCode247</a> (202K+ views, 8K watch hours), and served as President of <a href="https://exunclan.com" target="_blank">Exun Clan</a> ('22-23).
    <br />
    I am also the Chapter Officer at the <a href="https://new-delhi-space-society.github.io" target="_blank">New Delhi Space Society</a>, a chapter of the <a href="https://space.nss.org" target="_blank">National Space Society</a>. I am a core maintainer of <a href="https://typewind.vercel.app" target="_new">Typewind</a> (2.2K+ stars).
  `,
  work: () => `<h3>Work Experience</h3>
    <div class="command">
      <b class="command"><a href="https://vercel.com" target="_blank">Vercel</a></b> - SWE Intern (2025 - Present)
      <p class="meaning">Building developer tools and infrastructure at Vercel.</p>
    </div>
    <div class="command">
      <b class="command"><a href="https://www.helicone.ai" target="_blank">Helicone</a></b> - Software Engineer (YC W23) (2024)
      <p class="meaning">Shipped LLM observability features, multilingual SDKs, production Next.js features, and built an open-source AI Gateway in Rust.</p>
    </div>
    <div class="command">
      <b class="command"><a href="https://www.arcturusnetworks.com" target="_blank">Arcturus Networks</a></b> - Software Engineer (2024)
      <p class="meaning">Built embedded full-stack systems.</p>
    </div>
  `,
  education:
    () => `I am a high school graduate from <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram</a> and a Computer Engineering student at the <a href="https://uwaterloo.ca/content/home" target="_blank">University of Waterloo</a> (Class of 2028).`,
  skills: () => `
  I am experienced with Typescript, Javascript, Python and Rust and the web technologies dominating at the time:<br />
  <div class="skill"><b>languages</b>: TypeScript, JavaScript, Python, Rust, PHP<br /></div>
  <div class="skill"><b>frameworks</b>: React, Next.js, Django, Express, Laravel, AdonisJS<br /></div>
  <div class="skill"><b>database</b>: PostgreSQL, MongoDB, MySQL, SQLite, ClickHouse<br /></div>
  <div class="skill"><b>infra & tools</b>: Vercel, AWS, Docker, GitHub Actions, Neovim<br /></div>
  I also have knowledge of shell scripting and my dotfiles can be found <a href="https://github.com/kavinvalli/dotfiles" target="_blank">here</a>.
<br /><br />
  I also have experience with Mobile Development with Flutter and building developer tools & SDKs.
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
