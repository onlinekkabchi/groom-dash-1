import { hashHome } from "../hash.js";
import { formFetch } from "./fetch.js";

export default class DashFORM {
  constructor(dash, cancel, block) {
    this.dashForm = dash;
    this.cancelBtn = cancel;
    this.blockquote = block;
  }

  addEvent() {
    this.cancelBtn.addEventListener("click", () => hashHome());
    this.dashForm.addEventListener("submit", (e) => {
      this.formSubmit(e);
    });
    return this;
  }

  async formSubmit(e) {
    e.preventDefault();
    const formDATA = new FormData(e.target);
    const BODY = Object.fromEntries(formDATA);
    // const capture = (str) => {
    //   this.blockquote.innerText = str;
    // };
    formFetch(BODY);
  }
}
