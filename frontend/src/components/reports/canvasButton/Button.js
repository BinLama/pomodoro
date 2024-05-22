export class RectanlgeButton {
  constructor(size, location, color, date = false) {
    this.size = size;
    this.location = location;
    this.color = color;
    this.date = date;
    this.hover = false;
    this.tooltip = false;
    this.interval;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = `rgb(216, 216, 216)`;

    if (this.tooltip) {
      ctx.rect(0, 0, this.size, this.size);
    }

    if (this.date && this.hover) {
      ctx.fillStyle = "red";
    }

    if (!this.date) {
      ctx.fillStyle = `transparent`;
    }

    ctx.translate(this.location[0], this.location[1]);
    ctx.rect(0, 0, this.size, this.size);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  drawHitArea(ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(this.location[0], this.location[1]);
    ctx.rect(0, 0, this.size, this.size);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
