import { lerp } from "./utils";

export class ToolTips {
  constructor(size, location, data) {
    this.size = size;
    this.location = location;
    this.data = data;
    this.x = this.size * 7;
    this.xCurve = this.size * 7.5;
    this.y = this.size * 3;
    this.yCurve = this.size * 3.5;
    this.curve = 0.03;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 0.01;
    ctx.translate(
      this.location[0] - this.x / 2,
      this.location[1] - this.y - this.curve
    );
    // curve start
    ctx.moveTo(this.curve, 0);
    // move in x direction
    ctx.quadraticCurveTo(0, 0, this.x, 0);
    // top right curve
    ctx.quadraticCurveTo(this.xCurve, 0, this.xCurve, this.curve);
    // going down y
    ctx.quadraticCurveTo(this.xCurve, 0, this.xCurve, this.y);
    // bottom right curve
    ctx.quadraticCurveTo(this.xCurve, this.yCurve, this.x, this.y + this.curve);
    // going to the beginning of x
    ctx.quadraticCurveTo(
      0,
      this.y + this.curve,
      this.curve,
      this.y + this.curve
    );
    // bottom left curve
    ctx.quadraticCurveTo(0, this.y + this.curve, 0, this.y);
    // going from y to -x (start position ish)
    ctx.quadraticCurveTo(0, 0, 0, this.curve);
    // top left curve
    ctx.quadraticCurveTo(0, 0, this.curve, 0);
    ctx.stroke();
    ctx.closePath();

    // session completed
    ctx.save();
    ctx.translate(lerp(0, this.xCurve, 0.1), lerp(0, this.y, 0.45));
    ctx.fillStyle = "black";
    ctx.font = `${this.size * 1.2}px sans serif`;
    ctx.fillText("Session: 10", 0, 0);
    ctx.restore();

    ctx.translate(lerp(0, this.xCurve, 0.05), lerp(0, this.y, 0.95));
    ctx.fillStyle = "black";
    ctx.font = `${this.size * 1.2}px sans serif`;
    ctx.fillText("Date: 1/1/24", 0, 0);
    ctx.restore();
  }

  convertDateToNumbers() {}
}
