import Router from "./router.js";
import { loginCMT, registerCMT, failCMT } from "./components.js";

const router = new Router(loginCMT, registerCMT, failCMT);

window.addEventListener("hashchange", function () {
  router.handler(window.location.hash);
});

window.onload = function () {
  const user = sessionStorage.getItem("user");
  user ? router.handler("#logged") : router.handler(window.location.hash);
  // router.handler(window.location.hash);
};
