export default class User extends EventTarget {
  constructor() {
    super();
    this.token = null;
  }

  getUser() {
    const userSession = sessionStorage.getItem("user");
    userSession ? this.setToken(userSession) : alert("유저정보없음");
  }

  setUser(token) {
    sessionStorage.setItem("user", token);
    this.setToken(token);
  }

  setToken(token) {
    this.token = token;
  }
}
