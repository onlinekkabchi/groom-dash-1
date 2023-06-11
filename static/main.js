import Router from "./router.js";
import {
  loginCMT,
  registerCMT,
  dashCMT,
  failCMT,
  dashFormCMT,
} from "./components.js";
import { User } from "./user.js";
import Dashboard from "./dashboard.js";

const router = new Router(loginCMT, registerCMT, dashCMT, failCMT, dashFormCMT);
const user = new User();
const dash = new Dashboard();

router.init();

window.addEventListener("hashchange", function () {
  if (user.state === true) {
    router.handler(window.location.hash);
  } else {
    console.log(`user state: ${user.state}`);
  }
});
window.addEventListener("load", function () {
  const params = new URLSearchParams(window.location.search);
  params.get("logged") === "true"
    ? user.setUser(true)
    : console.log("no user logged in");
});

function handleUserEvent() {
  console.log(user.state);
  dash.get();
}

user.addEventListener("userin", handleUserEvent);
user.addEventListener("userwrite", handleUserEvent);

// const registerBTN = document.querySelector("#form-login > input[type=button]");
// registerBTN.addEventListener("click", function () {
//   window.location.href = "/#register";
// });
