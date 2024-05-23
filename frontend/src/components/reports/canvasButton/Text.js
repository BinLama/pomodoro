import { lerp } from "./utils";

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
    ctx.fillStyle = `rgb(0,0,0)`;
    if (this.x) {
      ctx.translate(
        lerp(this.location[0], this.location[1] - this.size, 0.5),
        0.1
      );
      ctx.fillText(this.text, 0, 0);
    } else {
      // 0.055 makes MWF align in center
      ctx.translate(0.055, lerp(this.location[0], this.location[1], 0.5));
      ctx.textAlign = "center";
      if (["M", "W", "F"].includes(this.text)) {
        ctx.fillText(this.text, 0, 0);
      }
    }
    ctx.restore();
  }

  // average() {
  //   // a + (b - a) * t aka Lerp (t is the percentage)
  //   return (1 - 0.5) * this.location[0] + 0.5 * this.location[1];
  // }
}
