class DOMInterface {

  constructor() {
    // Initialize event listeners
    this.openNewProjectDialog();
  }
  renderNewProjectDialog() {
    //TODO: Add form validation for required fields
    //TODO: Style form
    //TODO: Style buttons

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

  renderNewTaskDialog(project) {
    const dialog = document.createElement("dialog");
    dialog.classList.add("dialog");
    const h3 = document.createElement("h3");
    h3.textContent = "Create new task";
    const form = document.createElement("form");
    form.setAttribute("method", "dialog");
    const nameLabel = document.createElement("label");
    const nameField = document.createElement("input");
    nameLabel.textContent = "Name: ";
    nameField.setAttribute("type", "text");
    nameField.setAttribute("required", "");
    nameLabel.append(nameField);

    const descLabel = document.createElement("label");
    descLabel.textContent = "Description: ";
    const descField = document.createElement("textarea");
    descLabel.append(descField);

    const priorityLabel = document.createElement("label");
    const priorityField = document.createElement("select");
    priorityField.setAttribute("name", "priority");
    const low = document.createElement("option");
    low.textContent = "Low";
    low.setAttribute("value", "low");
    low.setAttribute("selected", "");
    const medium = document.createElement("option");
    medium.textContent = "Medium";
    medium.setAttribute("value", "medium");
    const high = document.createElement("option");
    high.textContent = "High";
    high.setAttribute("value", "high");
    priorityLabel.textContent = "Priority: ";
    priorityField.append(low, medium, high);
    priorityLabel.append(priorityField);

    const dueDateLabel = document.createElement("label");
    const dueDateField = document.createElement("input");
    dueDateLabel.textContent = "Due Date: ";
    //TODO: Modify date picker using date-fns library
    dueDateField.setAttribute("type", "datetime-local");
    const dateFormat = "yyyy-MM-dd'T'HH:mm";
    const testDate = format(new Date(Date.now()), dateFormat);
    dueDateField.setAttribute("min", format(new Date(Date.now()), dateFormat));
    console.log(testDate);
    dueDateLabel.append(dueDateField);

    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("dialog-btns");
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "+";
    submitBtn.setAttribute("type", "submit");
    submitBtn.classList.add("submit-btn");
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("cancel-btn");
    closeBtn.textContent = "-";

    btnsDiv.append(submitBtn, closeBtn);
    form.append(nameLabel, descLabel, priorityLabel, dueDateLabel, btnsDiv);
    dialog.append(h3, form);

    submitBtn.addEventListener("click", (e) => {
      const taskData = {};
      taskData.name = nameField.value;
      taskData.desc = descField.value;
      taskData.priority = priorityField.value;
      taskData.creationDate = Date(Date.now());
      taskData.dueDate = dueDateField.value;
      taskData.project = project;

      const event = new CustomEvent("newTask", { detail: taskData });
      document.dispatchEvent(event);

      // project.createNewTask(taskData);

      dialog.close();
      dialog.remove();
    });

    closeBtn.addEventListener("click", (e) => {
      dialog.close();
      dialog.remove();
    });

    document.body.append(dialog);
    dialog.showModal();
  }

  renderEditTaskDialog(task) {
    const dialog = document.createElement("dialog");
    dialog.classList.add("dialog");
    const h3 = document.createElement("h3");
    h3.textContent = "Create new task";
    const form = document.createElement("form");
    form.setAttribute("method", "dialog");
    const nameLabel = document.createElement("label");
    const nameField = document.createElement("input");
    nameLabel.textContent = "Name: ";
    nameField.setAttribute("type", "text");
    nameField.setAttribute("required", "");
    nameLabel.append(nameField);

    const descLabel = document.createElement("label");
    descLabel.textContent = "Description: ";
    const descField = document.createElement("textarea");
    descLabel.append(descField);

    const priorityLabel = document.createElement("label");
    const priorityField = document.createElement("select");
    priorityField.setAttribute("name", "priority");
    const low = document.createElement("option");
    low.textContent = "Low";
    low.setAttribute("value", "low");
    low.setAttribute("selected", "");
    const medium = document.createElement("option");
    medium.textContent = "Medium";
    medium.setAttribute("value", "medium");
    const high = document.createElement("option");
    high.textContent = "High";
    high.setAttribute("value", "high");
    priorityLabel.textContent = "Priority: ";
    priorityField.append(low, medium, high);
    priorityLabel.append(priorityField);

    const dueDateLabel = document.createElement("label");
    const dueDateField = document.createElement("input");
    dueDateLabel.textContent = "Due Date: ";
    //TODO: Modify date picker using date-fns library
    dueDateField.setAttribute("type", "datetime-local");
    const dateFormat = "yyyy-MM-dd'T'HH:mm";
    const testDate = format(new Date(Date.now()), dateFormat);
    dueDateField.setAttribute("min", format(new Date(Date.now()), dateFormat));
    console.log(testDate);
    dueDateLabel.append(dueDateField);

    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("dialog-btns");
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "+";
    submitBtn.setAttribute("type", "submit");
    submitBtn.classList.add("submit-btn");
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("cancel-btn");
    closeBtn.textContent = "-";

    btnsDiv.append(submitBtn, closeBtn);
    form.append(nameLabel, descLabel, priorityLabel, dueDateLabel, btnsDiv);
    dialog.append(h3, form);

    submitBtn.addEventListener("click", (e) => {
      const taskData = {};
      taskData.name = nameField.value;
      taskData.desc = descField.value;
      taskData.priority = priorityField.value;
      taskData.creationDate = Date(Date.now());
      taskData.dueDate = dueDateField.value;
      taskData.project = project;

      const event = new CustomEvent("editTask", { detail: taskData });
      document.dispatchEvent(event);

      // project.createNewTask(taskData);

      dialog.close();
      dialog.remove();
    });

    closeBtn.addEventListener("click", (e) => {
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
