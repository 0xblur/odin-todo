import { DOMInterface } from "./dom.js";

class ToDoItem {
  // Fields
  #id;
  #name;
  #desc;
  #creationDate;
  #dueDate;
  #priority;
  #project;

  /**
   * @param {object} data - object literal with homonimous fields.
   * @param {ToDoProject} project - project parent
   */
  constructor(data, project) {
    this.#id = Utils.genUniqueId();
    this.#name = data.name;
    this.#desc = data.desc;
    this.#creationDate = data.creationDate;
    this.#dueDate = data.dueDate;
    this.#priority = data.priority;
    this.#project = project;
  }

  get id() {
    return this.#id;
  }

  set name(string) {
    this.#name = string;
  }

  get name() {
    return this.#name;
  }

  set desc(string) {
    this.#desc = string;
  }

  get desc() {
    return this.#desc;
  }

  set dueDate(date) {
    this.#dueDate = date;
  }

  get dueDate() {
    return this.#dueDate;
  }

  set priority(string) {
    this.#priority = string;
  }

  get priority() {
    return this.#priority;
  }

  set project(string) {
    this.#project = string;
  }

  get project() {
    return this.#project;
  }

  get creationDate() {
    return this.#creationDate;
  }

  set creationDate(date) {
    this.#creationDate = date;
  }
}

class ToDo {
  projects = []; // Array of project objects

  constructor() {
    //Init DOM interface
    this.dom = new DOMInterface();
    //Create default project
    this.createDefaultProject();
    //Custom events
    document.addEventListener("newProject", (e) =>
      this.createNewProject(e.detail),
    );
    document.addEventListener("newTask", (e) =>
      this.createNewTask(e.detail, e.detail.project),
    );
    document.addEventListener("allTasks", () =>
      this.dom.renderAllTasks(this.projects),
    );
  }

  //DONE
  createNewProject(projectData) {
    const project = new ToDoProject(projectData);
    this.projects.push(project);
    this.dom.renderProjects(this.projects);
  }

  //DONE
  createDefaultProject() {
    const project = new ToDoProject({
      name: "Default Project",
      color: "#808080",
    });
    this.projects.push(project);
    this.dom.renderProjects(this.projects);
  }

  /**
   * @param {ToDoProject} project
   * @param {string} newName
   */
  setProjectName(project, newName) {
    for (const project of this.projects) {
      if (project.id === projectId) {
        project.name = newName;
      } else {
        console.error(`Project with ID "${projectId}" hasn't been found`);
      }
    }
  }

  // Gets projectId and newColor variables from DOMInterface
  setProjectColor(project, newColor) {
    for (const project of this.projects) {
      if (project.id === projectId) {
        project.color = newColor;
      }
    }
  }

  createNewTask(taskData, project) {
    const task = new ToDoItem(taskData, project);
    project.tasks.push(task);
    this.dom.renderProjectTasks(project);
  }
}

