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
