export default class User extends EventTarget {
  constructor() {
    super();
    this.token = null;
    this.state = false;
  }

  setState(val) {
    this.state = val;
    this.dispatchEvent(
      new CustomEvent("userin", { detail: { state: "true" } })
    );
  }

  setUser(token) {
    sessionStorage.setItem("user", token);
  }

  getUser() {
    this.token = sessionStorage.getItem("user");
  }
}
