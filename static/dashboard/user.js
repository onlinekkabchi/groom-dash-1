export default class User extends EventTarget {
  constructor() {
    super();
    this.token = null;
  }

  setUser(token) {
    this.setToken(token);
    sessionStorage.setItem("user", token);
    this.dispatchEvent(
      new CustomEvent("userToken", { detail: { token: !null } })
    );
  }

  setToken(token) {
    this.token = token;
  }
}
