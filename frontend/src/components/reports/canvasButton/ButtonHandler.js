import { RectanlgeButton } from "./Button";
import { TextCanvas } from "./Text";
import { ToolTips } from "./ToolTips";
import {
  getColor,
  getAllDays,
  getMouseLocation,
  getRandomColor,
  numToMonth,
  numToDay,
} from "./utils";

export class ButtonHandler {
  static days = [];
  static canvas;
  static hitCanvas;
  static scale;
  static day = 7;
  static weeks = 53;
  static distances = [];
  static tooltip = undefined;
  static fontSize = 0.07;
  static startLocation;
  static gap;

  static create52Weeks(size, year) {
    // reset it everytime window reloads
    ButtonHandler.days = [];
    ButtonHandler.distances = [];
    const dates = getAllDays(year);

    for (let x = 0; x <= ButtonHandler.weeks; x++) {
      for (let y = 0; y < ButtonHandler.day; y++) {
        ButtonHandler.days.push(
          new RectanlgeButton(
            size,
            [
              x * size +
                (ButtonHandler.startLocation[0] + x * ButtonHandler.gap),
              y * size +
                (ButtonHandler.startLocation[1] + y * ButtonHandler.gap),
            ],
            getRandomColor(),
            dates[x * ButtonHandler.day + y]
          )
        );
      }
    }

    // Creating a text
    const monthsAndLocations = ButtonHandler.getDatesDistance();

    for (const monthAndLocation of monthsAndLocations) {
      ButtonHandler.distances.push(
        new TextCanvas(ButtonHandler.fontSize, monthAndLocation)
      );
    }

    const daysAndLocations = ButtonHandler.getDaysDistance();
    for (const dayAndLocation of daysAndLocations) {
      ButtonHandler.distances.push(
        new TextCanvas(ButtonHandler.fontSize, dayAndLocation, false)
      );
    }
  }

  static draw(ctx) {
    for (const day of ButtonHandler.days) {
      day.draw(ctx);
      day.drawHitArea(ButtonHandler.hitCanvas.getContext("2d"));
    }

    for (const text of ButtonHandler.distances) {
      text.draw(ctx);
    }

    if (ButtonHandler.tooltip) {
      ButtonHandler.tooltip.draw(ctx);
    }
  }

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

  /**
   * returns a list of distance between start and end of the month
   */
  static getDatesDistance() {
    const distances = [];
    const dec = "Dec";
    let start = -1,
      end = -1,
      currentMonth = "";

    for (let i = 0; i < ButtonHandler.days.length; i++) {
      if (!ButtonHandler.days[i].date && currentMonth !== dec) continue;

      let month;
      if (ButtonHandler.days[i].date) {
        month = numToMonth(ButtonHandler.days[i].date);
      }

      if (currentMonth === month && currentMonth !== dec) continue;

      if (currentMonth === dec && i !== ButtonHandler.days.length - 2) continue;

      if (currentMonth) {
        end = ButtonHandler.days[i - 1].location[0];
        distances.push([[start, end], currentMonth]);
      }

      start = ButtonHandler.days[i].location[0];
      currentMonth = month;
    }

    return distances;
  }

  /**
   * returns a list of distance between start and end of the day
   */
  static getDaysDistance() {
    const distance = [];
    const dayFound = new Set();

    let start = -1,
      end = -1,
      day = "";

    for (let i = 0; i < 14; i++) {
      start = ButtonHandler.days[i].location[1];
      end = start + ButtonHandler.days[i].size * 2;

      if (ButtonHandler.days[i].date) {
        day = numToDay(ButtonHandler.days[i].date);
        distance.push([[start, end], day]);
        dayFound.add(day);
      }

      if (dayFound.size === 7) {
        break;
      }
    }

    return distance;
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
        if (day.tooltip) {
          ButtonHandler.tooltip = new ToolTips(
            day.size,
            day.location,
            ButtonHandler.startLocation,
            {
              date: day.date,
              session: 2,
            }
          );
        }
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
    if (day) console.log(day);
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
      ButtonHandler.tooltip = undefined;
    }
  }

  static resetHovering() {
    for (const day of ButtonHandler.days) {
      day.hover = false;
    }
  }
}
