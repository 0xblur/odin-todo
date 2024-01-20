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
