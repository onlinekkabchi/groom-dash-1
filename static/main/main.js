import Router from "./router.js";
import {
  loginCMT,
  registerCMT,
  dashCMT,
  failCMT,
  dashFormCMT,
} from "./components.js";

const router = new Router(loginCMT, registerCMT, dashCMT, failCMT, dashFormCMT);

window.addEventListener("hashchange", function () {
  router.handler(window.location.hash);
});

window.onload = function () {
  // const user = sessionStorage.getItem("user");
  // user ? router.handler("#logged") : router.handler();

  router.handler();
};
