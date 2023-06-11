export default class Router {
  constructor(loginCMT, registerCMT, dashCMT, failCMT) {
    this.app = document.querySelector("#app");
    this.routes = {
      "#home": this.homehandler.bind(this),
      "#dash": this.dashhandler.bind(this),
      "#fail": this.failhandler.bind(this),
      "#register": this.registerhandler.bind(this),
    };
    this.loginCMT = loginCMT;
    this.registerCMT = registerCMT;
    this.dashCMT = dashCMT;
    this.failCMT = failCMT;
  }

  init() {
    const hash = window.location.hash;
    this.handler(hash);
  }

  origin() {
    this.app.innerHTML = this.loginCMT;
  }

  handler(hash) {
    hash ? this.routes[hash]() : this.origin();
  }

  defaultHandler() {
    console.log("Page not found");
  }

  homehandler() {
    this.app.innerHTML = this.loginCMT;
  }

  registerhandler() {
    this.app.innerHTML = this.registerCMT;
  }

  dashhandler() {
    console.log("dashhandler");
    this.app.innerHTML = this.dashCMT;
  }

  failhandler() {
    this.app.innerHTML = this.failCMT;
  }
}
