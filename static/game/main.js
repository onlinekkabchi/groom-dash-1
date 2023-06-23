import { Controller } from "./controller.js";
import { Model } from "./model.js";
import { View } from "./view.js";

window.onload = function () {
  const model = new Model();
  const view = new View();

  const controller = new Controller(model, view);
};
