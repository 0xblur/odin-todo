import "normalize.css";
import "./style.css";
import { ToDoInterface } from "./todo.js";

class App {
  constructor() {
    this.todo = new ToDoInterface();
  }

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
