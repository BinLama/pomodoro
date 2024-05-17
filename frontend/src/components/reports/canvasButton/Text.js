export class TextCanvas {
  constructor(size, locationAndMonth, x = true) {
    this.size = size;
    this.location = locationAndMonth[0];
    this.text = locationAndMonth[1];
    this.x = x;
  }

  draw(ctx) {
    ctx.save();
    ctx.font = `${this.size}px sans serif`;
    if (this.x) {
      ctx.translate(this.average(), 0.1);
      ctx.fillText(this.text, 0, 0);
    } else {
      ctx.translate(0.055, this.average());
      ctx.textAlign = "center";
      if (["M", "W", "F"].includes(this.text)) {
        ctx.fillText(this.text, 0, 0);
      }
    }
    ctx.restore();
  }

  average() {
    // a + (b - a) * t aka Lerp (t is the percentage)
    return (1 - 0.5) * this.location[0] + 0.5 * this.location[1];
  }
}
