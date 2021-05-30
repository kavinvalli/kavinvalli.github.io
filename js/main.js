let form = document.getElementById("command");
let input = document.getElementById("command-input");
const mainElement = document.querySelector("main");
const changeTypeButton = document.getElementById("change-type");

let currentType =
  localStorage.getItem("KAVIN_WEBSITE_TYPE") === "normal"
    ? "normal"
    : "terminal";

const head = document.querySelector("head");
const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = `css/${currentType}.css`;
head.appendChild(link);
toggleHTML(currentType === "normal" ? "terminal" : "normal");

//document.getElementById("change-type-link").addEventListener("click", () => {
//currentType = toggleType(currentType);
//});

changeTypeButton.addEventListener("click", () => {
  currentType = toggleType(currentType);
});

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

const renderEducation = () => {
  const educationDiv = createContentElement(contents.education);
  output(educationDiv);
};

const renderSkills = () => {
  const skillsDiv = createContentElement(contents.skills);
  output(skillsDiv);
};

const renderProjects = () => {
  const projectsDiv = createContentElement(contents.projects);
  output(projectsDiv);
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
  switch (input.value.toLowerCase()) {
    case "help":
      renderHelp();
      break;
    case "clear":
      removeAllMainNodes();
      break;
    case "about":
      renderAbout();
      break;
    case "education":
      renderEducation();
      break;
    case "skills":
      renderSkills();
      break;
    case "contact":
      renderContact();
      break;
    case "blog":
      window.open("https://livecode247.com", "_blank");
      break;
    case "projects":
      renderProjects();
      break;
    default:
      renderCommandNotFound();
      break;
  }
  renderNewForm();
}

form.addEventListener("submit", submitListener);
