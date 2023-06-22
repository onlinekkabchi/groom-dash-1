import { Mesh, MeshBuilder, Scene } from "@babylonjs/core";

export const buildSpheres = (scene: Scene, landMarkPoints: number) => {
  const spheresLeft: Mesh[] = [];
  const spheresRight: Mesh[] = [];

  for (let i = 0; i < landMarkPoints; i++) {
    spheresLeft.push(
      MeshBuilder.CreateSphere("Sphere" + i, { diameter: 2 }, scene)
    );
    spheresRight.push(
      MeshBuilder.CreateSphere("Sphere" + i, { diameter: 2 }, scene)
    );
  }

  return [spheresLeft, spheresRight];
};
