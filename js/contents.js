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
    I love coding in Javascript and Python, and have worked with frameworks like ReactJS, VueJS, Express, and Django.
    <br /><br />
    I am a developer at <a href="https://tricycle.life" target="_blank">Tricycle</a> and <a href="https://exunclan.com" target="_blank">Exun Clan</a>
    <br />
    I am a student at <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram</a>
  `,
  education: `I am a Grade 11 student at <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram<\a>
    <br />
    I am a member of <a href="https://enship-club.github.io" target="_blank">Enship</a> and <a href="https://exunclan.com">Exun Clan</a>, the Tech Club.`,
  skills: `
  I am experienced with Javascript and Python and the web technologies dominating at the time:<br />
  <b>core</b>: HTML, CSS and Node.js<br />
  <b>frameworks</b>: Express, React, Gatsby, NextJS and Django<br />
  <b>database</b>: MongoDB, PostgreSQL, MySQL, and SQLite<br />
  I also have knowledge of basic shell scripting and my dotfiles can be found <a href="https://github.com/kavin25/.dotfiles" target="_blank">here</a>.
<br /><br />
  I also have experience with Mobile Development with Flutter.
  `,
  contact: (contact) => `<div class="help-flex">
      <p class="command">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank">${contact.username}</a>
    </div>`,
  error: (input) =>
    `<div class="help-command">sh: Unknown command: ${input.value}</div><div class="help-command">See \`help\` for info`,
};
