const helpCommands = [
  {
    command: "about",
    description: "About Me",
  },
  {
    command: "education",
    description: "My Education (ongoing)",
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
    command: "contact",
    description: "Contact Me",
  },
  {
    command: "blog",
    description: "Visit my blog",
  },
  {
    command:
      'clear <span style="color: var(--primary)">(Ctrl+L shortcut)</span>',
    description: "Clear the terminal",
  },
];

const projects = [
  {
    name: "Enship Website",
    description:
      "I designed and developed the website for my school’s entrepreneurship club - Enship",
    stack: ["Javascript", "NextJS"],
    link: "https://enship-club.github.com/",
    image: "enship.jpeg",
    largeImage: "enship-lg.png",
  },
  {
    name: "New Delhi Space Society Website",
    description:
      "I designed and developed New Delhi Space Society’s Website - A chapter of the National Space Society",
    stack: ["Typescript", "NextJS"],
    link: "https://new-delhi-space-society.github.com/",
    image: "ndss.png",
    largeImage: "ndss-lg.png",
  },
  {
    name: "Cognizer",
    description:
      "A Chrome Extension that allows you to connect with people during and also soon after the conference or meet ends. Second Runner's up at Code Warriors soBig.s Hackathon 2021",
    stack: ["Javascript", "NodeJS", "Adonis", "Chrome Extension API"],
    link: "https://cognizer.kavin.me/",
    image: "cognizer.png",
  },
  {
    name: "Exun Notifications Platform (Cannot share code/link)",
    description:
      "Notification management and realtime notification platform built with NodeJS and Express. Used to send push notifications to the Exun 2020 App during the 25th International Tech Symposium, Exun 2020",
    stack: ["Javascript", "NodeJS", "Express"],
    link: "https://exunclan.com",
    image: "exun.png",
  },
  {
    name: "Discord Task Manager Bot",
    description:
      "A Task Manager Bot you can add to your discord servers (created with the help of the Discord API)",
    stack: ["Javascript", "NodeJS"],
    link: "https://task-manager-bot.github.io",
    image: "task-bot.png",
  },
  {
    name: "Job Application Portal",
    description:
      "[e-Lite 2020] Complete solution for applying to new and managing existing jobs of the KoolKidsKlub (fluff)",
    stack: ["Python", "Django"],
    link: "https://github.com/kavin25/koolkidsexun",
    image: "kke.jpeg",
  },
  {
    name: "Trivy",
    description:
      "Airbnb for Tour Guides. Explore the city with people who know it the best. Finalist in XINO's Exquisite hackathon.",
    stack: ["Python", "Django"],
    link: "https://github.com/kavin25/Xino-Hackathon2020",
    image: "trivy.png",
  },
  {
    name: "Ambulify Landing Page",
    description:
      'The landing page for "Ambulify", a product created at Innovate@trix 2021 competition',
    stack: ["Javascript", "NextJS"],
    link: "https://github.com/kavin25/innovate-trix-2021-static",
    image: "ambulify.png",
  },
  {
    name: "DPS Notices Tracker Discord Bot",
    description:
      "A Discord bot to track my school's notices and send a discord msg when it's been updated",
    stack: ["Python"],
    link: "https://github.com/kavin25/dps-notices-discord",
    image: "dps.jpeg",
  },
  {
    name: "DPS Notices Tracker Email Bot",
    description:
      "A bot to track my school's notices and send an email when it's been updated",
    stack: ["Python"],
    link: "https://github.com/kavin25/dps-notices-discord",
    image: "dps.jpeg",
  },
  {
    name: "Snapix",
    description:
      "A landing page (and discussion section), for a Video Editing Software. Winner of Script@trix 2020",
    stack: ["Python", "Django"],
    link: "https://github.com/kavin25/scriptatrix20",
    image: "snapix.png",
  },
  {
    name: "Cricket VSCode Extension",
    description:
      "A VSCode Extension to show Cricket News and LiveScores from inside the editor",
    stack: ["Javascript"],
    link: "https://github.com/kavin25/cricket-vscode-extension",
    image: "cricket-vscode.png",
  },
  {
    name: "URL Shortener",
    description: "A URL Shortener written in NodeJS and Express with MongoDB",
    stack: ["Javascript", "NodeJS", "Express"],
    link: "https://github.com/kavin25/url-shortener",
    image: "url.png",
  },
  {
    name: "FourEss Games",
    description: "A screenshare based quiz app for friends and family",
    stack: ["Python", "Django"],
    link: "https://github.com/kavin25/jeopardyquiz-with-django",
    image: "quiz.png",
  },
];

const contactMediums = [
  {
    medium: "github",
    username: "kavin25",
    link: "https://github.com/kavin25",
  },
  {
    medium: "email",
    username: "mail@kavin.me",
    link: "mailto:mail@kavin.me",
  },
  {
    medium: "facebook",
    username: "kavin.valli.25",
    link: "https://www.facebook.com/kavin.valli.25/",
  },
  {
    medium: "linkedin",
    username: "kavinvalli",
    link: "https://www.linkedin.com/in/kavinvalli/",
  },
];

const contents = {
  help:
    helpCommands
      .map(
        (command) => `<div class="help-flex">
        <p class="command">${command.command}</p>
        <p class="meaning">${command.description}</p>
      </div>`
      )
      .join("") +
    `<br />
      <div class="command">Type one of the above to view. For eg. <span style="color: var(--secondary)">about</span></div>`,
  about: `
    My name is Kavin and I\'m a fullstack web developer
    <br/><br/>
    I love coding in Javascript, Typescript and Python, and have worked with frameworks like ReactJS, VueJS, Express, and Django.
    <br /><br />
    I am a developer at <a href="https://tricycle.life" target="_blank">Tricycle</a> and <a href="https://exunclan.com" target="_blank">Exun Clan</a>, and a student at <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram</a>
    <br />
    I am also a volunteer(developer) at the <a href="https://new-delhi-space-society.github.io" target="_blank">New Delhi Space Society</a>, a chapter of the <a href="https://space.nss.org" target="_blank">National Space Society</a>
  `,
  education: `I am a Grade 11 student at <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram<\a>
    <br />
    I am a member of <a href="https://enship-club.github.io" target="_blank">Enship</a> and <a href="https://exunclan.com">Exun Clan</a>, the Tech Club.`,
  skills: `
  I am experienced with Javascript, Typescript and Python and the web technologies dominating at the time:<br />
  <div class="skill"><b>core</b>: HTML, CSS and Node.js<br /></div>
  <div class="skill"><b>frameworks</b>: Express, React, Gatsby, NextJS and Django<br /></div>
  <div class="skill"><b>database</b>: MongoDB, PostgreSQL, MySQL, and SQLite<br /></div>
  I also have knowledge of basic shell scripting and my dotfiles can be found <a href="https://github.com/kavin25/.dotfiles" target="_blank">here</a>.
<br /><br />
  I also have experience with Mobile Development with Flutter.
  `,
  projects:
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
      .join(""),
  contact: contactMediums
    .map(
      (contact) => `<div class="help-flex">
      <p class="command">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank">${contact.username}</a>
    </div>`
    )
    .join(""),
  error: (input) =>
    `<div class="help-command">sh: Unknown command: ${input.value}</div><div class="help-command">See \`help\` for info`,
};
