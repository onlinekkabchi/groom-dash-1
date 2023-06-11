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

const appDiv = document.querySelector("#app");

// Create a new MutationObserver
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList") {
      console.log("innerHTML of 'app' div has changed:", appDiv.innerHTML);
      // Perform actions or call functions when innerHTML changes
    }
  });
});

// Configure and start observing the "app" div
const observerConfig = {
  childList: true, // Watch for changes in the child nodes (including innerHTML changes)
  subtree: true, // Watch for changes in the entire subtree of the "app" div
};
observer.observe(appDiv, observerConfig);
// function handleUserEvent() {}

// function setDashForm() {}

// user.addEventListener("userin", handleUserEvent);
// user.addEventListener("userwrite", setDashForm);

// const registerBTN = document.querySelector("#form-login > input[type=button]");
// registerBTN.addEventListener("click", function () {
//   window.location.href = "/#register";
// });
