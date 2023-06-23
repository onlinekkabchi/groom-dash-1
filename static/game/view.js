function rotate(x, y, sin, cos, reverse) {
  return {
    x: reverse ? x * cos + y * sin : x * cos - y * sin,
    y: reverse ? y * cos - x * sin : y * cos + x * sin,
  };
}

export class View {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.dx = 5; // velocity
    this.dy = 5; // velocity
    this.bounce = 1.1;
    this.frictionX = 0.98;
    this.frictionY = 0.9;
    this.acceleration = 1;
    this.ballRadius = 10;
    this.fingerRadius = 15;

    this.header = this.getElement("header");
    this.app = this.getElement("#app");

    this.video = this.createElement("video", "webcam");

    this.video.style.videoWidth = "100vh";
    this.video.setAttribute("autoplay", "");
    this.video.setAttribute("playsinline", "");

    this.webcamButton = this.createElement("button");
    // this.webcamButton.classList = "mdc-button mdc-button--raised";
    this.webcamButton.setAttribute(
      "style",
      "background-color: transparent; z-index: 10; padding-inline: 10px; border: 1px solid black"
    );
    this.webcamButton.textContent = "ENABLE WEBCAM";

    this.canvas = this.createElement("canvas", "canvas-output");
    this.ctx = this.canvas.getContext("2d");

    this.video.addEventListener("loadedmetadata", () => {
      this.canvas.style.width = this.video.videoWidth + "px";
      this.canvas.style.height = this.video.videoHeight + "px";
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
    });

    this.header.append(this.webcamButton);
    this.app.append(this.canvas, this.video);
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

  move() {
    this.dx *= this.frictionX;
    this.dy *= this.frictionY;

    this.x += this.dx;
    this.y += this.dy;
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
    for (let i = 5; i <= 8; i++) {
      const point = landmark[i];

      this.ctx.beginPath();
      this.ctx.arc(
        // 손가락
        point.x * this.canvas.width,
        point.y * this.canvas.height,
        this.fingerRadius,
        0,
        Math.PI * 2,
        false
      );
      this.ctx.fillStyle = "blue";
      this.ctx.fill();
      this.ctx.closePath();

      const distanceX = point.x * this.canvas.width - this.x;
      const distanceY = point.y * this.canvas.height - this.y;

      if (
        Math.sqrt(distanceX * distanceX + distanceY * distanceY) <
        this.ballRadius + this.fingerRadius
      ) {
        // const angle = Math.atan2(distanceY, distanceX);
        // const sin = Math.sin(angle);
        // const cos = Math.cos(angle);

        // collision
        // this.dx = (Math.abs(this.dx) + this.bounce) * -1;
        this.dy = (Math.abs(this.dy) + 1) * -this.bounce;
      }
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
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.move();
    this.drawBall();

    for (const landmark of result.landmarks) {
      this.drawBalls(landmark);
    }

    if (
      this.x + this.dx > this.canvas.width - this.ballRadius ||
      this.x + this.dx < this.ballRadius * 2
    ) {
      this.dx = this.dx * -1;
    }

    if (this.y + this.dy > this.canvas.height - this.ballRadius) {
      this.y = 0;
      alert("game over");
    } else if (this.y < this.ballRadius) {
      this.dy = 0;
      const timer = () =>
        setTimeout(() => {
          this.dy += this.bounce;
        }, 1000);
      timer();
    }

    if (this.dy < 0.1) {
      this.dy += this.acceleration * -1 * Math.random();
    }

    if (Math.abs(this.dx) < 0.1) {
      this.dx = (this.dx + Math.random() + 1) * -2;
    }

    this.ctx.restore();
  }
}
