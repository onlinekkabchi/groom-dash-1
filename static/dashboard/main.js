import User from "./user.js";
import { router } from "./router.js";

const user = new User();

window.addEventListener("hashchange", () => router.hashchange());

user.addEventListener("userToken", function () {
  router.init(user);
});

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const userLogged = params.get("logged");
  if (userLogged) {
    user.setUser(userLogged);
  } else {
    const userSession = sessionStorage.getItem("user");
    userSession ? user.setUser(userSession) : alert("유저정보없음");
  }
};
