class DOMInterface {

  constructor() {
    // Initialize event listeners
    this.openNewProjectDialog();
  }
  renderNewProjectDialog() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("dialog");

    const h3 = document.createElement("h3");
    h3.textContent = "Create new project";

    const form = document.createElement("form")
    form.setAttribute("method", "dialog");
    const nameLabel = document.createElement("label");
    const nameField = document.createElement("input");
    nameLabel.textContent = "Name: ";
    nameField.setAttribute("type", "text");
    nameField.setAttribute("required", "");
    nameLabel.append(nameField);
    const descLabel = document.createElement("label");
    const descField = document.createElement("textarea");
    descLabel.textContent = "Description: ";
    descField.setAttribute("required", "");
    descLabel.append(descField);
    const colorLabel = document.createElement("label");
    const colorField = document.createElement("input");
    colorLabel.textContent = "Color: ";
    colorField.setAttribute("type", "color");
    colorLabel.append(colorField);
    const btnsDiv = document.createElement("div");
    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "+";
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "-";


    btnsDiv.append(submitBtn, closeBtn);
    dialog.append(h3, form);
    form.append(nameLabel, descLabel, colorLabel, btnsDiv);


    //DONE
    submitBtn.addEventListener("click", (e) => {
      const project = {};
      project.name = nameField.value;
      project.desc = descField.value;
      project.color = colorField.value;

      const event = new CustomEvent("newProject", { detail: project });
      document.dispatchEvent(event);

      dialog.close()
    });

    //DONE
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.close();
      dialog.remove();
    });

    document.body.append(dialog);
    dialog.showModal();

  }

  //INFO: EVENTS
  openNewProjectDialog() {
    const newProjectBtn = document.querySelector("#new-project");
    newProjectBtn.addEventListener("click", () => {
      this.renderNewProjectDialog();
    })
  }

};

export { DOMInterface };
