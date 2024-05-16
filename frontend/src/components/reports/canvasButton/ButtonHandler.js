import { RectanlgeButton } from "./Button";
import {
  getColor,
  getAllDays,
  getMouseLocation,
  getRandomColor,
  numToMonth,
} from "./utils";

export class ButtonHandler {
  static days = [];
  static canvas;
  static hitCanvas;
  static scale;
  static day = 7;
  static weeks = 52;
  static distances;

  static create52Weeks(size, location, gap, year) {
    // reset it everytime window reloads
    ButtonHandler.days = [];

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
    ButtonHandler.distances = ButtonHandler.getDatesDistance();
  }

  static drawRectangles(ctx) {
    for (const day of ButtonHandler.days) {
      day.draw(ctx);
      day.drawHitArea(ButtonHandler.hitCanvas.getContext("2d"));
    }
  }

  // TODO: need to draw names on the distance found using get distance
  static drawNames(ctx) {}

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

  // return a list of distance from start of the month to the end
  static getDatesDistance() {
    const distances = [];
    const dec = "Dec";
    let start = -1,
      end = -1,
      currentMonth = "";
    console.log(ButtonHandler.days.length);
    for (let i = 0; i < ButtonHandler.days.length; i++) {
      if (!ButtonHandler.days[i].date) continue;

      const month = numToMonth(ButtonHandler.days[i].date.getMonth());
      console.log(currentMonth);
      if (currentMonth === month && currentMonth !== dec) continue;

      if (currentMonth === dec && i !== ButtonHandler.days.length - 2) continue;

      if (currentMonth) {
        end = ButtonHandler.days[i - 1].location[0];
        distances.push([start, end, currentMonth]);
      }

      start = ButtonHandler.days[i].location[0];
      currentMonth = month;
    }

    return distances;
  }

  static onMouseMove(event) {
    // get the values current location
    const location = getMouseLocation(event, ButtonHandler.scale);
    const color = getColor(ButtonHandler.hitCanvas.getContext("2d"), location);

    // reset states
    ButtonHandler.resetHovering();
    ButtonHandler.removeTooltip();
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
