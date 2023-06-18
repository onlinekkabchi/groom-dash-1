import { hashHome } from "../hash.js";

export default class DashFORM {
  constructor(user, dash, cancel, block) {
    this.user = user;
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

    try {
      await fetch(`/dash/writedash?${this.user}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(BODY),
      }).then((res) => (this.blockquote.innerText = res.message));
    } catch (err) {
      alert(err);
    } finally {
      window.location.hash = "#home";
    }
  }
}
