import "normalize.css";
import "./style.css";
import { ToDoInterface } from "./app";
import * as dom from "./dom.js";

class App {
  constructor() {
    this.todo = new ToDoInterface();
    this.dom = dom;
  }
}

const app = new App();
app.dom.init();
//For testing
