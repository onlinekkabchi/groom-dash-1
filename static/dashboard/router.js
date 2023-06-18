import {
  createFormElement,
  createDashboardElement,
} from "./dashboard/component.js";
import Dashboard from "./dashboard/dashboard.js";
import DashFORM from "./dashboard/dashform.js";
import { hashWrite } from "./hash.js";

export const router = {
  user: null,
  app: null,
  dash: createDashboardElement(),
  board: null,
  list: null,
  writeBtb: null,
  formElement: createFormElement(),
  form: null,
  preparedash() {
    this.app.appendChild(this.dash);
    this.board.getList();
  },
  preparewritebtn() {
    this.writeBtb = this.dash.querySelector("#write-btn");
    this.writeBtb.addEventListener("click", () => hashWrite());
  },
  init(user) {
    console.log("init");
    this.user = user;
    this.app = document.querySelector("#app");
    this.list = this.dash.querySelector("ul");
    this.board = new Dashboard(this.user, this.app, this.dash, this.list);
    this.preparedash();
    this.preparewritebtn();
  },
  hashchange() {
    const hash = window.location.hash;
    switch (hash) {
      case "#home":
        this.app.removeChild(this.formElement);
        this.preparedash();

        break;
      case "#write":
        this.dash.remove();
        this.app.appendChild(this.formElement);
        this.form = new DashFORM(
          this.user,
          document.querySelector("#dash-form"),
          document.querySelector("#cancel-btn"),
          document.querySelector("blockquote")
        );
        this.form.addEvent();

        break;
      case "#tester":
        break;

      default:
        break;
    }
  },
};
