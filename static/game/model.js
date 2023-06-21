import {
  HandLandmarker,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

export class Model {
  constructor() {
    this.vision;
    this.handLandmarker;
    this.result;
    this.runningMode = "IMAGE";
    this.createHandLandMarker();
  }

  async createHandLandMarker() {
    this.vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    this.handLandmarker = await HandLandmarker.createFromOptions(this.vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 2,
    });
    // console.log(
    //   "model vision and landmarker created",
    //   this.vision,
    //   this.handLandmarker
    // );
    // console.log(this);
  }

  detectLandmarks(image) {
    return this.handLandmarker?.detect(image);
  }

  predictWebcam(video) {
    let startTimeMs = performance.now();
    this.result = this.handLandmarker.detectForVideo(video, startTimeMs);
    return this.result;
  }
}
