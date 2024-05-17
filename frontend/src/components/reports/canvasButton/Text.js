export class TextCanvas {
  constructor(size, locationAndMonth) {
    this.size = size;
    this.location = locationAndMonth[0];
    this.month = locationAndMonth[1];
    // this.color = color;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.average(), 0.1);
    // console.log(this.average());
    ctx.font = `${this.size}px sans serif`;
    ctx.fillText(this.month, 0, 0);
    ctx.restore();
  }

  average() {
    // a + (b - a) * t aka Lerp (t is the percentage)
    return this.location[0] + (this.location[1] - this.location[0]) * 0.5;
  }
}
