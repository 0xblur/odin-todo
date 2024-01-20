import { genUniqueId } from "./utils.js";
import * as dom from "./dom.js";

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
    this.#id = genUniqueId();
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
      dom.renderer.renderAllTasks(this.projects),
    );
  }

  //DONE
  createNewProject(projectData) {
    const project = new ToDoProject(projectData);
    this.projects.push(project);
    dom.renderer.renderProjects(this.projects);
  }

  //DONE
  createDefaultProject() {
    const project = new ToDoProject({
      name: "Default Project",
      color: "#808080",
    });
    this.projects.push(project);
    dom.renderer.renderProjects(this.projects);
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
  /**
   * @param {object} data - object literal with homonimous properties.
   * @param {ToDoProject} project - the project in which you'll introduce the task.
   */
  createNewTask(data, project) {
    const task = new ToDoItem(data, project);
    project.tasks.push(task);
    //TODO: Implement rendering with an observer or a dedicated object.
    dom.renderer.renderProjectTasks(project);
  }
}

class ToDoProject {
  #name;
  #desc;
  #color;
  #id;
  #tasks = [];

  constructor(data) {
    this.name = data.name;
    this.desc = data.desc;
    this.color = data.color || "#808080";
    this.#id = genUniqueId();
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

  get id() {
    return this.#id;
  }

  set color(newColor) {
    this.#color = newColor;
  }

  get color() {
    return this.#color;
  }

  get tasks() {
    return this.#tasks;
  }
}

export { ToDo as ToDoInterface };
