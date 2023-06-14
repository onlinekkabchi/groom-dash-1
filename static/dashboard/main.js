import User from "./user.js";
import Dashboard from "./dashboard/dashboard.js";
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
  router.init();
  console.log(router);
  user.setState("true"); // 유저 세팅
};

window.addEventListener("hashchange", () => router.hashchange());

user.addEventListener("userin", function () {
  console.log("User state changed:", user.state);
  // dash.getList(); // 유저정보가 있을 경우 fetch로 데이터 받아옴
});
