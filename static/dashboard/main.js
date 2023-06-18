import User from "./user.js";
import { router } from "./router.js";

const user = new User();

// const observer = new MutationObserver(function (mutationsList) {
//   console.log(mutationsList);

//   //   for (let mutation of mutationsList) {
//   //     if (mutation.type === "childList") {
//   //       console.log("Child nodes have been added or removed.");
//   //     }
//   //   }
// });

// observer.observe(app, { childList: true });

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const userLogged = params.get("logged");

  userLogged ? (router.user = userLogged) : alert("유저정보없음");

  // user.setState("true"); // 유저 세팅

  router.init();
};

window.addEventListener("hashchange", () => router.hashchange());

user.addEventListener("userin", function () {
  console.log("User state changed:", user.state);
});
