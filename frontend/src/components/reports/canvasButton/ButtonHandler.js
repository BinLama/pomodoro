import { RectanlgeButton } from "./Button";
import {
  getColor,
  getAllDays,
  getMouseLocation,
  getRandomColor,
} from "./utils";

export class ButtonHandler {
  static days = [];
  static canvas;
  static hitCanvas;
  static scale;
  static day = 7;
  static weeks = 52;

  static create52Weeks = (size, location, gap, year) => {
    const dates = getAllDays(year);
    for (let x = 0; x <= ButtonHandler.weeks; x++) {
      for (let y = 0; y < ButtonHandler.day; y++) {
        // console.log(dates[x * ButtonHandler.day + y]);
        ButtonHandler.days.push(
          new RectanlgeButton(
            size,
            [
              x * size + (location[0] + x * gap),
              y * size + (location[1] + y * gap),
            ],
            getRandomColor(),
            dates[x * ButtonHandler.day + y]
          )
        );
      }
    }
  };

  static drawRectangles = (ctx) => {
    for (const day of ButtonHandler.days) {
      day.draw(ctx);
      day.drawHitArea(ButtonHandler.hitCanvas.getContext("2d"));
    }
  };

  static addEventListeners() {
    ButtonHandler.canvas.addEventListener(
      "mousemove",
      ButtonHandler.onMouseMove
    );
    ButtonHandler.canvas.addEventListener(
      "mousedown",
      ButtonHandler.onMouseDown
    );
  }

  static onMouseMove(event) {
    // get the values current location
    const location = getMouseLocation(event, ButtonHandler.scale);
    const color = getColor(ButtonHandler.hitCanvas.getContext("2d"), location);

    // reset hovering
    ButtonHandler.resetHovering();
    ButtonHandler.removeTooltip();
    // remove timeout
    ButtonHandler.removeTimeout();

    const day = ButtonHandler.isHovering(color);

    if (day) {
      day.hover = true;
      day.interval = setTimeout(() => {
        day.tooltip = true;
      }, 350);

      ButtonHandler.canvas.style.cursor = "pointer";
    } else {
      ButtonHandler.canvas.style.cursor = "auto";
    }
  }

  static onMouseDown(event) {
    const location = getMouseLocation(event, ButtonHandler.scale);
    const color = getColor(ButtonHandler.hitCanvas.getContext("2d"), location);
    const day = ButtonHandler.isHovering(color);
    console.log(day);
  }

  static isHovering(color) {
    for (const day of ButtonHandler.days) {
      if (day.color === color && day.date) {
        return day;
      }
    }
    return false;
  }

  static removeTimeout() {
    for (const day of ButtonHandler.days) {
      if (day.interval) clearTimeout(day.interval);
    }
  }

  static removeTooltip() {
    for (const day of ButtonHandler.days) {
      day.tooltip = false;
    }
  }

  static resetHovering() {
    for (const day of ButtonHandler.days) {
      day.hover = false;
    }
  }
}
