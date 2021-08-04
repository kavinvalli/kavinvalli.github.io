function renderNewForm() {
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

const checkCtrlL = (e) => {
  if (e.getModifierState("Control") && e.key === "l") {
    removeAllMainNodes();
    renderNewForm();
  }
};

const output = (el) => {
  mainElement.appendChild(el);
};

const createContentElement = (content) => {
  const div = document.createElement("div");
  div.className = "command";
  div.innerHTML = content;

  return div;
};

const toggleCSS = (currentType) => {
  const links = document.querySelectorAll("link");
  const lastLink = links[links.length - 1];
  const newType = currentType === "normal" ? "terminal" : "normal";
  lastLink.href = `css/${newType}.min.css`;
};

const toggleHTML = (currentType) => {
  const currentElement = document.getElementById(currentType);
  currentElement.style.display = "none";
  const newType = currentType === "normal" ? "terminal" : "normal";
  const newElement = document.getElementById(newType);
  newElement.style.display = "block";

  const button = document.querySelector("button#change-type");
  button.innerText = `Change View (${
    currentType.charAt(0).toUpperCase() + currentType.slice(1)
  } Website Mode)`;
};

const toggleType = (currentType) => {
  window.location.pathname = "/";
  const newType = currentType === "normal" ? "terminal" : "normal";
  localStorage.setItem("KAVIN_WEBSITE_TYPE", newType);
  toggleCSS(currentType);
  toggleHTML(currentType);
  return newType;
};
