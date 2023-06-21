export class View {
  constructor() {
    this.app = this.getElement("#app");

    this.video = this.createElement("video", "webcam");
    // this.video.width = 480;
    // this.video.height = 300;
    this.video.setAttribute("style", "position: absolute");
    this.video.setAttribute("autoplay", "");
    this.video.setAttribute("playsinline", "");

    this.webcamButton = this.createElement("button", "mdc-button");
    this.webcamButton.textContent = "Enable Webcam";
    this.webcamButton.style.zIndex = 2;

    this.canvas = this.createElement("canvas", "canvas-output");

    this.canvas.style.border = "3px dashed blue";

    this.ctx = this.canvas.getContext("2d");

    this.video.addEventListener("loadedmetadata", () => {
      //   this.canvas.style.width = this.video.videoWidth + "px";
      //   this.canvas.style.height = this.video.videoHeight + "px";
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
    });

    this.app.append(this.canvas, this.video, this.webcamButton);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  turnCamButton(signal) {
    if (signal) {
      this.webcamButton.innerText = "ENABLE PREDICTIONS";
      return false;
    } else {
      this.webcamButton.innerText = "DISABLE PREDICTIONS";
      return true;
    }
  }
}
