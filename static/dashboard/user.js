export default class User extends EventTarget {
  constructor() {
    super();
    this.token = null;
    this.state = false;
  }

  setState(val) {
    this.state = val;
    this.dispatchEvent(new CustomEvent("userin", { detail: { state: true } }));
  }

  setToken(token) {
    this.token = token;
    this.dispatchEvent(
      new CustomEvent("userToken", { detail: { token: !null } })
    );
  }

  setUser(token) {
    sessionStorage.setItem("user", token);
    this.setToken(token);
  }

  getUser() {
    this.token = sessionStorage.getItem("user");
  }
}
