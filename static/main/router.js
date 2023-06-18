export default class Router {
  constructor(loginCMT, registerCMT, failCMT) {
    this.app = document.querySelector("#app");
    this.routes = {
      home: this.homehandler.bind(this),
      "#fail": this.failhandler.bind(this),
      "#register": this.registerhandler.bind(this),
      "#logged": this.loggedhandler.bind(this),
    }; // The error indicates that the innerHTML property is being accessed on an undefined object. The issue is with the scope of this within the dashhandler method. When the dashhandler function is invoked as this.routes[hash](), the this context is not preserved correctly, causing this.app to be undefined.
    // By using the bind() method, you ensure that the this context is correctly set to the Router instance when the dashhandler method is invoked.
    this.loginCMT = loginCMT;
    this.registerCMT = registerCMT;
    this.failCMT = failCMT;
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
    // this.app.innerHTML = this.dashCMT;
    window.location.href = "/dash";
  }

  failhandler() {
    this.app.innerHTML = this.failCMT;
  }

  loggedhandler() {
    this.app.innerHTML = `<div>유저있음</div>`;
  }
}
