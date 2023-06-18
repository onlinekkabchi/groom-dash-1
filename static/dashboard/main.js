import User from "./user.js";
import { router } from "./router.js";

const user = new User();

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const userLogged = params.get("logged");
  if (userLogged) {
    user.setUser(userLogged);
  } else if (sessionStorage.getItem("user")) {
    user.getUser();
  } else {
    alert("유저정보없음");
  }

  router.user = user;
  router.init();
};

window.addEventListener("hashchange", () => router.hashchange());

user.addEventListener("userin", function () {
  console.log("User state changed:", user.state);
});
