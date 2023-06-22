import {
  Scene,
  Engine,
  HemisphericLight,
  Vector3,
  FreeCamera,
  Color4,
} from "@babylonjs/core";

/**
 * Create a basic babylonJS Scene on the canvas element
 */
export const initializeScene = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);

  scene.clearColor = new Color4(0, 0, 0, 0);

  //scene.debugLayer.show(); - Display babylonJS DebugLayer

  new FreeCamera("Camera", new Vector3(0, 0, 0), scene);
  new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

  /** Here we put the code for the rendering loop **/
  engine.runRenderLoop(() => {
    scene.render();
  });

  return scene;
};
