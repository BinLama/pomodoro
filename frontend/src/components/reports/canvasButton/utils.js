// creating in memory canvas for hit test
export const createHitCanvas = (height, width) => {
  const canvas = document.createElement("canvas");
  canvas.id = "hitTestCanvas";
  canvas.height = height;
  canvas.width = width;
  return canvas;
};

export const getRandomColor = () => {
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, 255)`;
};

export const getColor = (ctx, location) => {
  const data = ctx.getImageData(location[0], location[1], 1, 1);
  return `rgba(${data.data[0]}, ${data.data[1]}, ${data.data[2]}, ${data.data[3]})`;
};

export const getMouseLocation = (event, size) => {
  let rect = event.currentTarget.getBoundingClientRect();
  const loc = [
    Math.floor(
      ((event.clientX - rect.left) / (rect.right - rect.left)) * size[0]
    ),
    Math.floor(
      ((event.clientY - rect.top) / (rect.bottom - rect.top)) * size[1]
    ),
  ];

  return loc;
};

const getStartDay = (date) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log(date.getDay());
  return weekday[date.getDay()];
};

export const getAllDays = (year) => {
  const gaps = {
    Sunday: 6,
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
  };

  const date = new Date(year, 0, 1);
  const dayStarted = getStartDay(date);

  // creating gaps so that day starts on correct day
  const dates = Array(gaps[dayStarted]).fill(false);

  while (date.getFullYear() <= year) {
    const copiedDate = new Date(date);
    dates.push(copiedDate);
    date.setDate(date.getDate() + 1);
  }

  return dates;
};
