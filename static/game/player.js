import {
  HandLandmarker,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

export class Player {
  constructor() {
    this.video = document.getElementById("webcam");
    // this.canvasElement = document.getElementById("output_canvas");
    // this.canvasCtx = canvasElement.getContext("2d");
    // this.imageContainers = document.getElementsByClassName("detectOnClick");

    this.vision;
    this.handLandmarker = null;
    this.runningMode = "IMAGE";

    this.webcamRunning = false;
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
      runningMode: this.runningMode,
      numHands: 2,
    });
    // this.demoSection?.classList.remove("invisible");
    console.log(this.vision, this.handLandmarker);
  }

  //   addEventToImageContainer() {
  //     for (let i = 0; i < this.imageContainers.length; i++) {
  //       this.imageContainers[i].child[0].addEventListener(
  //         "click",
  //         this.handleClick
  //       );
  //     }
  //   }

  //   async handleClick(event) {
  //     if (this.runningMode === "VIDEO") {
  //       this.runningMode = "IMAGE";
  //       await this.handLandmarker.setOptions({ runningMode: "IMAGE" });
  //     }

  //     if (this.runningMode === "VIDEO") {
  //       this.runningMode = "IMAGE";
  //       await this.handLandmarker.setOptions({ runningMode: "IMAGE" });
  //     }

  //     const allCanvas = event?.target.parentNode.getElementsByClassName("canvas");
  //     for (var i = allCanvas.length - 1; i >= 0; i--) {
  //       const n = allCanvas[i];
  //       n.parentNode.removeChild(n);
  //     }

  //     const handLandmarkerResult = handLandmarker.detect(event.target);
  //     const canvas = document.createElement("canvas");
  //     canvas.setAttribute("class", "canvas");
  //     canvas.setAttribute("width", event.target.naturalWidth + "px");
  //     canvas.setAttribute("height", event.target.naturalHeight + "px");
  //     canvas.style =
  //       "left: 0px;" +
  //       "top: 0px;" +
  //       "width: " +
  //       event.target.width +
  //       "px;" +
  //       "height: " +
  //       event.target.height +
  //       "px;";

  //     event.target.parentNode.appendChild(canvas);
  //     const cxt = canvas.getContext("2d");

  //     for (const landmarks of handLandmarkerResult.landmarks) {
  //       drawConnectors(cxt, landmarks, HAND_CONNECTIONS, {
  //         color: "#00FF00",
  //         lineWidth: 5,
  //       });
  //       drawLandmarks(cxt, landmarks, { color: "#FF0000", lineWidth: 1 });
  //     }
  //   }

  enableCam(event) {
    // if (!this.handLandmarker) {
    //   console.log("Wait! objectDetector not loaded yet.");
    //   return;
    // }

    // if (this.webcamRunning === true) {
    //   this.webcamRunning = false;
    //   enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    // } else {
    //   this.webcamRunning = true;
    //   enableWebcamButton.innerText = "DISABLE PREDICTIONS";
    // }

    // getUsermedia parameters.
    const constraints = {
      video: true,
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      video.addEventListener("loadeddata", this.predictWebcam);
    });
  }

  async predictWebcam() {
    canvasElement.style.width = video.videoWidth;
    canvasElement.style.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;

    // Now let's start detecting the stream.
    if (this.runningMode === "IMAGE") {
      this.runningMode = "VIDEO";
      await handLandmarker.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();
    if (this.lastVideoTime !== video.currentTime) {
      this.lastVideoTime = video.currentTime;
      this.results = handLandmarker.detectForVideo(this.video, startTimeMs);
    }

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawConnectors(this.canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(this.canvasCtx, landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }
    }
    canvasCtx.restore();

    // Call this function again to keep predicting when the browser is ready.
    if (this.webcamRunning === true) {
      window.requestAnimationFrame(this.predictWebcam);
    }
  }
}
