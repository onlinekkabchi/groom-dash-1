export class View {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.dx = 4;
    this.dy = 4;
    this.ballRadius = 15;

    this.app = this.getElement("#app");

    this.video = this.createElement("video", "webcam");

    this.video.setAttribute("autoplay", "");
    this.video.setAttribute("playsinline", "");

    this.webcamButton = this.createElement("button", "mdc-button");
    this.webcamButton.textContent = "Enable Webcam";

    this.canvas = this.createElement("canvas", "canvas-output");
    this.ctx = this.canvas.getContext("2d");

    this.video.addEventListener("loadedmetadata", () => {
      this.canvas.style.width = this.video.videoWidth + "px";
      this.canvas.style.height = this.video.videoHeight + "px";
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

  drawBall() {
    // play ball
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = "yellow";
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawBalls(landmark) {
    // player ball
    for (let i = 5; i <= 8; i++) {
      const point = landmark[i];
      this.ctx.beginPath();
      this.ctx.arc(
        point.x * this.canvas.width,
        point.y * this.canvas.height,
        30,
        0,
        Math.PI * 2,
        false
      );
      this.ctx.fillStyle = "blue";
      this.ctx.fill();
      this.ctx.closePath();

      return {
        x: point.x * this.canvas.width,
        y: point.y * this.canvas.height,
      };
    }
  }

  drawLine(landmark) {
    // Draw lines between the balls
    this.ctx.beginPath();
    this.ctx.moveTo(
      landmark[5].x * this.canvas.width,
      landmark[5].y * this.canvas.height
    );
    for (let i = 6; i < 8; i++) {
      const point = landmark[i];
      this.ctx.lineTo(
        point.x * this.canvas.width,
        point.y * this.canvas.height
      );
    }
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  draw(result) {
    // console.log(result);

    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBall();
    this.x += this.dx;
    this.y += this.dy;

    for (const landmark of result.landmarks) {
      // this.drawLine(landmark);
      const result = this.drawBalls(landmark);
      // const distance = result.x - this.x;
      console.log(this.x);
      console.log(result.x);
      // console.log(distance);
      if (Math.sqrt((result.x - this.x) ** 2 + (result.y - this.y) ** 2) < 1) {
        this.dx = this.dx * -1;
        this.dy = this.dy * -1;
      }

      // this.x - result.x < 0 ? console.log("ball hits!") : "";
    }

    if (
      this.x + this.dx > this.canvas.width - this.ballRadius ||
      this.x + this.dx < this.ballRadius
    ) {
      this.dx = this.dx * -1;
      console.log("x hits");
    }

    if (this.y + this.dy > this.canvas.height - this.ballRadius) {
      this.dy = this.dy * -1;
    } else if (this.y + this.dy < this.ballRadius) {
      this.dy = this.dy * -1;
      console.log("game over");
    }

    this.ctx.restore();
  }
}
