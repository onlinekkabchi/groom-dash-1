import {
  createFormElement,
  createDashboardElement,
} from "./dashboard/component.js";
import Dashboard from "./dashboard/dashboard.js";
import DashFORM from "./dashboard/dashform.js";
import { hashWrite } from "./hash.js";

export const router = {
  app: document.querySelector("#app"),
  dash: createDashboardElement(),
  board: null,
  list: null,
  writeBtb: null,
  formElement: createFormElement(),
  form: null,
  init() {
    this.app.appendChild(this.dash);
    this.list = this.dash.querySelector("ul");
    this.board = new Dashboard(this.app, this.dash, this.list);
    this.board.getList();
    this.writeBtb = this.dash.querySelector("#write-btn");
    this.writeBtb.addEventListener("click", () => hashWrite());
  },
  hashchange() {
    const hash = window.location.hash;
    switch (hash) {
      case "#home":
        this.app.removeChild(this.formElement);
        this.app.appendChild(this.dash);
        this.board.getList();
        console.log(this);
        break;
      case "#write":
        this.dash.remove();
        this.app.appendChild(this.formElement);
        this.form = new DashFORM(
          document.querySelector("#dash-form"),
          document.querySelector("#cancel-btn"),
          document.querySelector("blockquote")
        );
        this.form.addEvent();
        console.log(this);
        break;
      case "#tester":
        break;

      default:
        break;
    }
  },
};
