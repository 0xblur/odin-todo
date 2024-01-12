import { DOMInterface } from "./dom.js";


class ToDoItem {
  // Fields
  id;
  title;
  description;
  creationDate;
  dueDate;
  priority;
  project;

  constructor(project, id = Utils.genUniqueId()) {
    this.id = id;
    this.project = project;
  }

  set title(string) {
    this.title = string;
  }

  get title() {
    return this.title;
  }

  set description(string) {
    this.description = string;
  }

  get description() {
    return this.description;
  }

  set dueDate(date) {
    this.dueDate = date;
  }

  get dueDate() {
    return this.dueDate
  }

  set project(string) {
    this.project = string;
  }

  //TODO: Implement the rest of getters and setters
  //
  //
}

class ToDoInterface {
  constructor() {
    this.dom = new DOMInterface();
    document.addEventListener("newProject", (e) => this.createNewProject(e.detail))
  }
  projects = [new ToDoProject("default")]; // Array of project objects

  //DONE
  createNewProject(projectData) {
    const project = new ToDoProject(projectData);
    this.projects.push(project)
  }

  setProjectName(projectId, newName) {
    this.projects.forEach((project) => {
      if (project.id === projectId) {
        project.name = newName;
      } else {
        console.error(`Project with ID "${projectId}" hasn't been found`)
      }
    })
  }

  // Gets projectId and newColor variables from DOMInterface
  setProjectColor(projectId, newColor) {
    this.projects.forEach((project) => {
      if (project.id === projectId) {
        project.color = newColor;
      };
    })
  };

  createNewItem(projectId = "default") {
    const item = new ToDoItem(projectId);

  }

}

class ToDoProject {
  #name;
  #desc;
  #color;
  #id;
  #tasks = [];

  constructor(data, id = Utils.genUniqueId()) {
    this.name = data.name;
    this.desc = data.desc;
    this.color = data.color || "#808080";
    this.id = id;
  }

  set name(string) {
    this.#name = string;
  }

  get name() {
    return this.#name;
  }

  set description(string) {
    this.#desc = string;
  }

  get description() {
    return this.#desc
  }

  set id(id) {
    this.#id = id;
  }
  get id() {
    return this.#id;
  }

  set color(newColor) {
    this.#color = newColor;
  };

  get color() {
    return this.#color;
  }

}

class Utils {
  //INFO: Useful functions used by most classes. It must be moved
  // into its appropiate module.
  static genUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

export { ToDoInterface };
