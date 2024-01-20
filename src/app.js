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

  init() {
    // Create new project
    // const projectBtn = document.querySelector(".create-project");
    // projectBtn.addEventListener("click", (e) => {
    //   this.todo.dom.createNewProject();
    // })
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

}

const app = new App();
window["app"] = app;
