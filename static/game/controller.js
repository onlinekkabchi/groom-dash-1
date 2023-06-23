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
        this.webcamRunning ? this.disableCam() : this.enabelCam();
        this.signal();
      });
    }
  }

  disableCam() {
    this.view.video.pause();
  }

  predictHandler() {
    const result = this.model.predictWebcam(this.view.video);
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
