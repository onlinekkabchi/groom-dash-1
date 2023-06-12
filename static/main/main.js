import Router from "./router.js";
import {
  loginCMT,
  registerCMT,
  dashCMT,
  failCMT,
  dashFormCMT,
} from "./components.js";

const router = new Router(loginCMT, registerCMT, dashCMT, failCMT, dashFormCMT);

router.init();

window.addEventListener("hashchange", function () {
  router.handler(window.location.hash);
});
