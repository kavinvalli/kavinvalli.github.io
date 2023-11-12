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
  about: () => `My name is Kavin. I am ${getAge(
    "December 25, 2005"
  )} and I\'m a fullstack web developer
    <br/><br/>
    I love coding in Javascript, Typescript and Python, and have worked with frameworks like ReactJS, VueJS, Express, and Django. I currently use NextJS, Laravel, and NodeJS in a lot of my projects.
    <br /><br />
    I am a former President of <a href="https://exunclan.com" target="_blank">Exun Clan</a> ('22-23). I am a freshman at <a href="https://uwaterloo.ca/content/home" target="_blank">University of Waterloo</a>.
    <br />
    I am also the Chapter Officer at the <a href="https://new-delhi-space-society.github.io" target="_blank">New Delhi Space Society</a>, a chapter of the <a href="https://space.nss.org" target="_blank">National Space Society</a>. I am a core maintainer of <a href="https://typewind.vercel.app" target="_new">Typewind</a>
  `,
  education:
    () => `I am a high school graduate from <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram</a> and a freshman at <a href="https://uwaterloo.ca/content/home" target="_blank">University of Waterloo</a>.`,
  skills: () => `
  I am experienced with Javascript, Typescript and Python and the web technologies dominating at the time:<br />
  <div class="skill"><b>core</b>: HTML, CSS, Node.js and PHP<br /></div>
  <div class="skill"><b>frameworks</b>: React, NextJS, Django, Express and Laravel<br /></div>
  <div class="skill"><b>database</b>: MongoDB, PostgreSQL, MySQL, and SQLite<br /></div>
  I also have knowledge of basic shell scripting and my dotfiles can be found <a href="https://github.com/kavinvalli/.dotfiles" target="_blank">here</a>.
<br /><br />
  I also have experience with Mobile Development with Flutter.
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

function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return age;
}
