export default class User extends EventTarget {
  constructor() {
    super();
    this.info = null;
    this.state = false;
  }

  setState(val) {
    this.state = val;
    this.dispatchEvent(
      new CustomEvent("userin", { detail: { state: "true" } })
    );
  }

  setUser(info) {
    sessionStorage.setItem("user", info);
    this.setInfo();
  }

  setInfo() {
    this.info = sessionStorage.getItem("user");
  }
}
