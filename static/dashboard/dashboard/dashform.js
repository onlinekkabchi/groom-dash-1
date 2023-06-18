import { hashHome } from "../hash.js";

export default class DashFORM {
  constructor(user, dash, cancel, block) {
    this.user = user;
    this.dashForm = dash;
    this.cancelBtn = cancel;
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

    try {
      await fetch(`/dash/writedash?logged=${this.user.token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BODY),
      });
    } catch (err) {
      alert(err);
    } finally {
      window.location.hash = "#home";
    }
  }
}
