export class circleBase {
  constructor(canvas) {
    let radiusFactor = 4;
    if (canvas.width < 540) {
      radiusFactor = 3;
    }

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * radiusFactor + 0.2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.speedR = 0.05;
    this.colors = ["#ff0084", "#843ea1", "#00e1d9"];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  update(canvas) {
    if (this.y - this.radius < 0) {
      this.speedY *= -1;
    }
    if (this.y + this.radius > canvas.height) {
      this.speedY *= -1;
    }
    if (this.x - this.radius < 0) {
      this.speedX *= -1;
    }
    this.canvas = canvas;
    if (this.x + this.radius > canvas.width) {
      this.speedX *= -1;
    }

    if (canvas.width > 539) {
      if (this.radius >= 4.2) {
        this.speedR *= -1;
      }
      if (this.radius <= 0.2) {
        this.speedR *= -1;
      }
    } else {
      if (this.radius >= 3.2) {
        this.speedR *= -1;
      }
      if (this.radius <= 0.2) {
        this.speedR *= -1;
      }
    }
    this.x += this.speedX;
    this.y += this.speedY;
    this.radius += this.speedR;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function init(canvas) {
  let circles = [];
  for (let i = 0; i < 50; i++) {
    circles.push(new circleBase(canvas));
  }
  return circles;
}

export function handleCircles(circles, ctx, canvas) {
  // console.log(circles)
}
// handleCircles();

export function animate(canvas, ctx, circles) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((element) => {
    element.update(canvas);
    element.draw(ctx);
  });
}
