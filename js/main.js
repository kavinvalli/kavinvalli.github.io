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

input.addEventListener("keyup", checkCtrlL);

const output = (el) => {
  mainElement.appendChild(el);
};

const renderHelp = () => {
  const helpDiv = document.createElement("div");
  helpDiv.className = "help-command";
  helpDiv.innerHTML = contents.help;
  output(helpDiv);
};

const renderAbout = () => {
  const aboutDiv = document.createElement("div");
  aboutDiv.className = "help-command";
  aboutDiv.innerHTML = contents.about;
  output(aboutDiv);
};

const renderContact = () => {
  const contactDiv = document.createElement("div");
  contactDiv.className = "help-command";
  contactMediums.forEach(
    (contact) => (contactDiv.innerHTML += contents.contact(contact))
  );
  output(contactDiv);
};

const renderCommandNotFound = () => {
  const errorDiv = document.createElement("div");
  errorDiv.innerHTML = contents.error(input);
  output(errorDiv);
};

function submitListener(e) {
  e.preventDefault();
  switch (input.value) {
    case "help":
      renderHelp();
      break;
    case "clear":
      removeAllMainNodes();
      break;
    case "about":
      renderAbout();
      break;
    case "contact":
      renderContact();
      break;
    case "blog":
      window.open("https://livecode247.com", "_blank");
      break;
    default:
      renderCommandNotFound();
      break;
  }
  renderNewForm();
}

form.addEventListener("submit", submitListener);
