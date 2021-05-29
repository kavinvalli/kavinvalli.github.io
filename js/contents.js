const contents = {
  help: `
      <div class="help-flex">
        <p class="command">about</p>
        <p class="meaning">About Me</p>
      </div>
      <div class="help-flex">
        <p class="command">contact</p>
        <p class="meaning">Contact Me</p>
      </div>
      <div class="help-flex">
        <p class="command">blog</p>
        <p class="meaning">Visit my blog</p>
      </div>
      <div class="help-flex">
        <p class="command">clear <span style="color: var(--primary)">(Ctrl+L shortcut)</span></p>
        <p class="meaning">Clear the terminal</p>
      </div>
      <br />
      <div class="help-command">Type one of the above to view. For eg. <span style="color: var(--secondary)">about</span></div>
    `,
  about: `
    My name is Kavin and I\'m a fullstack web developer
    <br/><br/>
    I love coding in Javascript and Python, and have worked with frameworks like ReactJS, VueJS, Express, and Django.
    <br /><br />
    I am a developer at <a href="https://tricycle.life" target="_blank">Tricycle</a> and <a href="https://exunclan.com" target="_blank">Exun Clan</a>
    <br />
    I am a student at <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram</a>
  `,
  contact: (contact) => `<div class="help-flex">
      <p class="command">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank">${contact.username}</a>
    </div>`,
  error: (input) =>
    `<div class="help-command">sh: Unknown command: ${input.value}</div><div class="help-command">See \`help\` for info`,
};
