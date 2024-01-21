import "normalize.css";
import { ToDoInterface } from "./app";
import * as dom from "./dom.js";
import "./style.css";
import { storageAvailable } from "./utils.js";

class App {
	constructor() {
		this.todo = new ToDoInterface();
		this.dom = dom;
	}
}

const app = new App();
app.dom.init();
//For testing
