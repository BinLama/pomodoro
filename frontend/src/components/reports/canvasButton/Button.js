export class RectanlgeButton {
  constructor(size, location, color) {
    this.size = size;
    this.location = location;
    this.color = color;
    this.hover = false;
  }

  draw = (ctx) => {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = `rgb(216, 216, 216)`;
    if (this.hover) {
      ctx.fillStyle = "red";
    }
    ctx.translate(this.location[0], this.location[1]);
    ctx.rect(0, 0, this.size, this.size);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };

  drawHitArea = (ctx) => {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(this.location[0], this.location[1]);
    ctx.rect(0, 0, this.size, this.size);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };
}
