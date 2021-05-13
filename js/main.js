let form = document.getElementById("command");
let input = document.getElementById("command-input");
const mainElement = document.querySelector("main");

const contactMediums = [
  {
    medium: "github",
    username: "kavin25",
    link: "https://github.com/kavin25",
  },
  {
    medium: "email",
    username: "kavinvalli@gmail.com",
    link: "mailto:kavinvalli@gmail.com",
  },
  {
    medium: "facebook",
    username: "kavin.valli.25",
    link: "https://www.facebook.com/kavin.valli.25/",
  },
];

const checkCtrlL = (e) => {
  if (e.getModifierState("Control") && e.key === "l") {
    removeAllMainNodes();
    newElement();
  }
};

function newElement() {
  const newForm = document.createElement("form");
  newForm.id = "command";
  const span = document.createElement("span");
  span.className = "prompt";
  span.innerText = "~/Users/kavinvalli ➜";
  const newInput = document.createElement("input");
  newInput.id = "command-input";
  newInput.autocomplete = "off";
  newForm.appendChild(span);
  newForm.appendChild(newInput);
  newForm.addEventListener("submit", submitListener);
  mainElement.appendChild(newForm);
  newInput.focus();
  newInput.addEventListener("keyup", checkCtrlL);
  form = newForm;
  input = newInput;
}

function removeAllMainNodes() {
  while (mainElement.firstChild) {
    mainElement.removeChild(mainElement.firstChild);
  }
}

input.addEventListener("keyup", checkCtrlL);

function submitListener(e) {
  e.preventDefault();
  switch (input.value) {
    case "help":
      const div = document.createElement("div");
      div.className = "help-command";
      div.innerHTML = `
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
        <br /><br />
        <div class="help-command">Type on of the above to view. For eg. <span style="color: var(--secondary)">about</span></div>
      `;
      mainElement.appendChild(div);
      break;
    case "clear":
      removeAllMainNodes();
      break;
    case "about":
      const aboutDiv = document.createElement("div");
      aboutDiv.className = "help-command";
      aboutDiv.innerHTML = `
        My name is Kavin and I\'m a fullstack web developer
        <br/><br/>
        I love coding in Javascript and Python, and have worked with frameworks like ReactJS, VueJS, Express, and Django.
        <br /><br />
        I am a developer at <a href="https://exunclan.com" target="_blank">Exun Clan</a>
        <br />
        I am a student at <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram</a>
      `;
      mainElement.appendChild(
        Div);
      break;
    case "contact":
      const contactDiv = document.createElement("div");
      contactDiv.className = "help-command";
      contactMediums.forEach(
        (contact) =>
          (contactDiv.innerHTML += `<div class="help-flex">
      <p class="command">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank">${contact.username}</a>
    </div>`)
      );
      mainElement.appendChild(contactDiv);
      break;
    case "blog":
      window.open("https://livecode247.com", "_blank");
      break;
    default:
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `<div class="help-command">sh: Unknown command: ${input.value}</div><div class="help-command">See \`help\` for info`;
      mainElement.appendChild(newDiv);
      break;
  }
  newElement();
}

form.addEventListener("submit", submitListener);
