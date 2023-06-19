import User from "./user.js";
import { router } from "./router.js";

const user = new User();

window.addEventListener("hashchange", () => router.hashchange());

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const userLogged = params.get("logged");
  if (userLogged) {
    user.setUser(userLogged);
  } else {
    user.getUser();
  }

  router.init(user);
};
