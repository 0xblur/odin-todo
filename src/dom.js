import { generateRandomHEXColor } from "./utils";
import { format, formatDistanceToNow, parseISO } from "date-fns";

class Templater {
  /**
   * Takes a project object and uses its data to create a HTMLElement that then will be rendered in the sidebar of the application.
   * @param {ToDoProject} project the project in question.
   * @returns {HTMLDivElement} a div.
   */
  genProjectTemplate(project) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.dataset.id = project.id;
    const h3 = document.createElement("h3");
    h3.textContent = project.name;
    const p = document.createElement("p");
    p.classList.add("project-desc", "hidden");
    p.textContent = project.desc;
    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("project-btns", "hidden", "expandable");
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    const delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    delBtn.textContent = "Delete";

    btnsDiv.append(editBtn, delBtn);
    projectDiv.append(h3, p, btnsDiv);

    projectDiv.addEventListener("click", () => {
      renderer.renderProjectTasks(project);
      renderer.renderAddNewTaskBtn(project);
      renderer.expandProject(projectDiv);
    });

    editBtn.addEventListener("click", () => {
      renderer.renderEditProjectDialog(project);
    });

    delBtn.addEventListener("click", () => {
      const event = new CustomEvent("deleteProject", {
        detail: {
          project: project,
        },
      });
      document.dispatchEvent(event);
    });

    return projectDiv;
  }

  /**
   * @param {ToDoItem} task
   */
  genTaskTemplate(task) {
    const tasks = task.project.tasks;
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task", `priority-${task.priority}`);
    taskDiv.dataset.id = task.id;
    //Regular view
    const h3 = document.createElement("h3");
    h3.style.display = "inline-block";
    h3.textContent = task.name;
    const desc = document.createElement("p");
    desc.classList.add("task-desc");
    desc.textContent = task.desc;
    const dueDateDiv = document.createElement("p");
    const dueDate = parseISO(task.dueDate);
    const diff = formatDistanceToNow(dueDate, { addSuffix: true });
    dueDateDiv.classList.add("task-due-date");
    dueDateDiv.textContent = `Due: ${diff}`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("del-btn");

    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("task-btns");
    btnsDiv.append(editBtn, delBtn);

    //Expanded view
    const expandedContent = document.createElement("div");
    expandedContent.classList.add("expandable", "hidden");
    expandedContent.append(desc, dueDateDiv, btnsDiv);

    //TODO: Implement edit task dialog
    editBtn.addEventListener("click", () => {
      renderer.renderEditTaskDialog(task);
    });

    delBtn.addEventListener("click", () => {
      const event = new CustomEvent("deleteTask", {
        detail: {
          project: task.project,
          task: task,
        },
      });
      document.dispatchEvent(event);
    });

    taskDiv.addEventListener("click", () => {
      renderer.expandTask(taskDiv);
    });

    taskDiv.append(h3, expandedContent);

    return taskDiv;
  }
}

class Renderer {
  renderProjects(projects) {
    const projectsDiv = document.querySelector("#projects");
    projectsDiv.innerHTML = "";
    for (const project of projects) {
      const projectHtml = templater.genProjectTemplate(project);
      projectsDiv.append(projectHtml);
    }
  }

  //DONE
  renderAddNewTaskBtn(project) {
    const tasksHeader = document.querySelector("#tasks-header");
    // We don't want to collide with a previous button render
    // or with the initial button rendering.
    let newTaskBtn = document.querySelector("#new-task");
    if (newTaskBtn) {
      newTaskBtn.remove();
    }
    newTaskBtn = document.createElement("button");
    newTaskBtn.id = "new-task";
    newTaskBtn.textContent = "+";
    tasksHeader.append(newTaskBtn);
    // A new click listener is initialized in every button
    // rendering because the referenced project can change.
    newTaskBtn.addEventListener("click", () => {
      this.renderNewTaskDialog(project);
    });
  }

  renderProjectTasks(project) {
    const tasks = project.tasks;
    const h2 = document.querySelector("#tasks-header>h2");
    const tasksDiv = document.querySelector("#tasks");
    tasksDiv.innerHTML = "";
    h2.textContent = `Tasks in ${project.name}`;
    if (tasks) {
      for (const task of tasks) {
        const taskHtml = templater.genTaskTemplate(task);
        tasksDiv.append(taskHtml);
      }
    }
  }

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

      const event = new CustomEvent("newTask", {
        detail: {
          data: taskData,
          project: project,
        },
      });
      document.dispatchEvent(event);

      dialog.close();
      dialog.remove();
    });

    closeBtn.addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });

    document.body.append(dialog);
    dialog.showModal();
  }

  expandTask(task) {
    const expandableContent = task.querySelector(".expandable");
    expandableContent.classList.toggle("hidden");
    task.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /**
   * @param {HTMLDivElement} project
   */
  expandProject(project) {
    const expandableContent = project.querySelector(".expandable");
    expandableContent.classList.toggle("hidden");
    project.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /**
   * @param {Array} projects
   */
  renderAllTasks(projects) {
    const tasksDiv = document.querySelector("#tasks");
    const tasksHeader = document.querySelector("#tasks-header>h2");
    tasksHeader.textContent = "All tasks";
    tasksDiv.innerHTML = "";
    for (const project of projects) {
      for (const task of project.tasks) {
        const taskHtml = templater.genTaskTemplate(task);
        tasksDiv.append(taskHtml);
      }
    }
  }

  renderNewProjectDialog() {
    //TODO: Add form validation for required fields
    //TODO: Style form
    //TODO: Style buttons

    // Dialog construction
    const dialog = document.createElement("dialog");
    dialog.classList.add("dialog");

    const h3 = document.createElement("h3");
    h3.textContent = "Create new project";

    const form = document.createElement("form");
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
    descLabel.append(descField);

    const colorLabel = document.createElement("label");
    const colorField = document.createElement("input");
    colorLabel.textContent = "Color: ";
    colorField.setAttribute("type", "color");
    colorField.value = generateRandomHEXColor();
    colorLabel.append(colorField);

    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("dialog-btns");
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("submit-btn");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "+";
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("cancel-btn");
    closeBtn.textContent = "-";

    btnsDiv.append(submitBtn, closeBtn);
    form.append(nameLabel, descLabel, colorLabel, btnsDiv);
    dialog.append(h3, form);

    // Dialog event listeners
    submitBtn.addEventListener("click", (e) => {
      const projectData = {};
      projectData.name = nameField.value;
      projectData.desc = descField.value;
      projectData.color = colorField.value;

      const event = new CustomEvent("newProject", { detail: projectData });
      document.dispatchEvent(event);

      dialog.close();
    });

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.close();
      dialog.remove();
    });

    // Returns constructed dialog and shows it to the user.
    document.body.append(dialog);
    dialog.showModal();
  }
  renderEditProjectDialog(project) {
    // Dialog construction
    const dialog = document.createElement("dialog");
    dialog.classList.add("dialog");

    const h3 = document.createElement("h3");
    h3.textContent = `${project.name}`;

    const form = document.createElement("form");
    form.setAttribute("method", "dialog");

    const nameLabel = document.createElement("label");
    const nameField = document.createElement("input");
    nameLabel.textContent = "Name: ";
    nameField.setAttribute("type", "text");
    nameField.setAttribute("required", "");
    nameField.value = project.name;
    nameLabel.append(nameField);

    const descLabel = document.createElement("label");
    const descField = document.createElement("textarea");
    descField.value = project.desc || "";
    descLabel.textContent = "Description: ";
    descLabel.append(descField);

    const colorLabel = document.createElement("label");
    const colorField = document.createElement("input");
    colorLabel.textContent = "Color: ";
    colorField.setAttribute("type", "color");
    colorField.value = project.color;
    colorLabel.append(colorField);

    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("dialog-btns");
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("submit-btn");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "+";
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("cancel-btn");
    closeBtn.textContent = "-";

    btnsDiv.append(submitBtn, closeBtn);
    form.append(nameLabel, descLabel, colorLabel, btnsDiv);
    dialog.append(h3, form);

    // Dialog event listeners
    submitBtn.addEventListener("click", (e) => {
      const projectData = {};
      projectData.name = nameField.value;
      projectData.desc = descField.value;
      projectData.color = colorField.value;

      const event = new CustomEvent("editProject", {
        detail: {
          data: projectData,
          project: project,
        },
      });
      document.dispatchEvent(event);

      dialog.close();
    });

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.close();
      dialog.remove();
    });

    // Returns constructed dialog and shows it to the user.
    document.body.append(dialog);
    dialog.showModal();
  }
}

function init() {
  // Initialize event listeners
  //TODO: I believe event listeners should be added
  // in the main app module.
  renderNewProjectDialogListener();
  renderAllTasksListener();

  //INFO: Listeners
  function renderNewProjectDialogListener() {
    const newProjectBtn = document.querySelector("#new-project");
    newProjectBtn.addEventListener("click", () => {
      renderer.renderNewProjectDialog();
    });
  }

  function renderAllTasksListener() {
    const allProjectsDiv = document.querySelector("#all-projects");
    allProjectsDiv.addEventListener("click", () => {
      const event = new CustomEvent("allTasks", {});
      document.dispatchEvent(event);
    });
  }
}

const renderer = new Renderer();
const templater = new Templater();

export { init, renderer, templater };
