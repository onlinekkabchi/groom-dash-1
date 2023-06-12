export default class Router {
  constructor(loginCMT, registerCMT, dashCMT, failCMT, dashFormCMT) {
    this.app = document.querySelector("#app");
    this.routes = {
      home: this.homehandler.bind(this),
      dash: this.dashhandler.bind(this),
      fail: this.failhandler.bind(this),
      register: this.registerhandler.bind(this),
    }; // The error indicates that the innerHTML property is being accessed on an undefined object. The issue is with the scope of this within the dashhandler method. When the dashhandler function is invoked as this.routes[hash](), the this context is not preserved correctly, causing this.app to be undefined.
    // By using the bind() method, you ensure that the this context is correctly set to the Router instance when the dashhandler method is invoked.
    this.loginCMT = loginCMT;
    this.registerCMT = registerCMT;
    this.dashCMT = dashCMT;
    this.failCMT = failCMT;
    this.dashFormCMT = dashFormCMT;
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
    window.location.href = "/dash";
  }

  failhandler() {
    this.app.innerHTML = this.failCMT;
  }
}
