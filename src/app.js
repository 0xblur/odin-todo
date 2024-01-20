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

  setProjectName(project, newName) {
    for (const project of this.projects) {
      if (project.id === projectId) {
        project.name = newName;
      } else {
        console.error(`Project with ID "${projectId}" hasn't been found`);
      }
    }
  }

}

const app = new App();
window["app"] = app;
