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
  }
}

const app = new App();
window["app"] = app;
