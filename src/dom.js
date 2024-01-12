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
    const nameField = document.createElement("input");
    const nameLabel = document.createElement("label");
    const descField = document.createElement("textarea");
    const descLabel = document.createElement("label");
    const colorField = document.createElement("input");
    const colorLabel = document.createElement("label");
    const btnsDiv = document.createElement("div");
    const submitBtn = document.createElement("button");
    const closeBtn = document.createElement("button");

    dialog.append(h3, form, btnsDiv);
    form.append(nameField, descField, colorField);

    //DONE
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const project = {};
      project.name = nameField.value;
      project.desc = descField.value;
      project.color = colorField.value;

      const event = new CustomEvent("newProject", { detail: project });
      document.dispatchEvent(event);
    });

    //DONE
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.close()
    });


  //INFO: EVENTS
  openNewProjectDialog() {
    const newProjectBtn = document.querySelector("#new-project");
    newProjectBtn.addEventListener("click", () => {
      this.renderNewProjectDialog();
    })
  }

};

export { DOMInterface };
