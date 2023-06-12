import { User } from "./user.js";
import Dashboard from "./dashboard.js";

// Create a User instance
const user = new User();

window.addEventListener("load", function () {
  const params = new URLSearchParams(window.location.search);
  params.get("logged") === "true"
    ? user.setState("true")
    : console.log("no user");
});

// Add event listeners for "userin" and "userwrite"
user.addEventListener("userin", function (event) {
  const state = event.detail.state;
  console.log("User state changed:", state);
  const dash = new Dashboard();
});

user.addEventListener("userwrite", function (event) {
  const write = event.detail.write;
  console.log("User write state changed:", write);
});
