// export class Model {
//   constructor() {
//     this.vision;
//     this.handLandmarker;
//     this.result;
//     this.runningMode = "IMAGE";
//     this.createHandLandMarker();
//   }

//   async createHandLandMarker() {
//     this.vision = await FilesetResolver.forVisionTasks(
//       "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//     );
//     this.handLandmarker = await HandLandmarker.createFromOptions(this.vision, {
//       baseOptions: {
//         modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
//         delegate: "GPU",
//       },
//       runningMode: "VIDEO",
//       numHands: 2,
//     });
//     // console.log(
//     //   "model vision and landmarker created",
//     //   this.vision,
//     //   this.handLandmarker
//     // );
//     // console.log(this);
//   }

//   detectLandmarks(image) {
//     return this.handLandmarker?.detect(image);
//   }

//   predictWebcam(video) {
//     let startTimeMs = performance.now();
//     this.result = this.handLandmarker.detectForVideo(video, startTimeMs);
//     return this.result;
//   }
// }

// export class View {
//   constructor() {
//     this.app = this.getElement("#app");

//     this.video = this.createElement("video", "webcam");
//     this.video.width = 480;
//     // this.video.height = 300;
//     this.video.setAttribute("style", "position: absolute");
//     this.video.setAttribute("autoplay", "");
//     this.video.setAttribute("playsinline", "");

//     this.webcamButton = this.createElement("button", "mdc-button");
//     this.webcamButton.textContent = "Enable Webcam";

//     this.canvas = this.createElement("canvas", "canvas-output");
//     // this.canvas.style.width = this.video.videoWidth;
//     // this.canvas.style.height = this.video.videoHeight;
//     // this.canvas.width = this.video.videoWidth;
//     // this.canvas.height = this.video.videoHeight;
//     this.canvas.style.position = "absolute";
//     this.canvas.style.top = "0";
//     this.canvas.style.left = "0";
//     this.canvas.style.border = "3px dashed blue";
//     this.canvas.style.zIndex = 10;
//     this.ctx = this.canvas.getContext("2d");

//     this.video.addEventListener("loadedmetadata", () => {
//       this.canvas.style.width = this.video.videoWidth + "px";
//       this.canvas.style.height = this.video.videoHeight + "px";
//       this.canvas.width = this.video.videoWidth;
//       this.canvas.height = this.video.videoHeight;
//     });

//     this.app.append(this.canvas, this.video, this.webcamButton);
//   }

//   createElement(tag, className) {
//     const element = document.createElement(tag);
//     if (className) element.classList.add(className);
//     return element;
//   }

//   getElement(selector) {
//     return document.querySelector(selector);
//   }

//   turnCamButton(signal) {
//     if (signal) {
//       this.webcamButton.innerText = "ENABLE PREDICTIONS";
//       return false;
//     } else {
//       this.webcamButton.innerText = "DISABLE PREDICTIONS";
//       return true;
//     }
//   }
// }

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.webcamRunning = false;
    this.initialize();
    this.checkGetUserMedia();
    this.lastFrame;
  }

  async initialize() {
    await this.model.createHandLandMarker();
  }

  signal() {
    const signal = this.view.turnCamButton(this.webcamRunning);
    this.webcamRunning = signal;
  }

  checkGetUserMedia() {
    if (navigator.mediaDevices?.getUserMedia) {
      this.view.webcamButton.addEventListener("click", () => {
        if (this.webcamRunning) {
          this.signal();
          this.disableCam();
        } else {
          this.signal();
          this.enabelCam();
        }
      });
    }
  }

  disableCam() {
    this.view.video.pause();
  }

  predictHandler() {
    const result = this.model.predictWebcam(this.view.video);
    console.log(result);
    this.view.draw(result);
  }

  requestLoop() {
    const predictFrame = () => {
      this.predictHandler();
      this.webcamRunning
        ? window.requestAnimationFrame(predictFrame)
        : () => {
            return;
          };
    };
    window.requestAnimationFrame(predictFrame);
  }

  enabelCam() {
    this.initialize()
      .then(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          this.view.video.srcObject = stream;
        });
      })
      // .then(() => {
      //   this.view.video.play();
      // })
      .then(() => {
        this.view.video.addEventListener("loadeddata", () => {
          this.requestLoop();
        });
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }
}
