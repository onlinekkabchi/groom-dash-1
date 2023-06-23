import { Controller } from "./controller.js";
import { Model } from "./model.js";
import { View } from "./view.js";

window.onload = function () {
  const model = new Model();
  const view = new View();

  const user = sessionStorage.getItem("user");
  user ? new Controller(model, view) : alert("유저정보없음");
};
