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

const renderHelp = () => {
  const helpDiv = createContentElement(contents.help);
  output(helpDiv);
};

const renderAbout = () => {
  const aboutDiv = createContentElement(contents.about);
  output(aboutDiv);
};

const renderContact = () => {
  const contactDiv = createContentElement(
    contactMediums.map((contact) => contents.contact(contact)).join("")
  );
  output(contactDiv);
};

const renderCommandNotFound = () => {
  const errorDiv = createContentElement(contents.error(input));
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
