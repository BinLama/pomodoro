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

export const numToDay = (date) => {
  const weekday = ["S", "M", "T", "W", "TH", "F", "Sa"];

  const day = new Date(date).getDay();
  return weekday[day];
};

export const getAllDays = (year) => {
  const gaps = {
    S: 6,
    M: 0,
    T: 1,
    W: 2,
    TH: 3,
    F: 4,
    Sa: 5,
  };

  const date = new Date(year, 0, 1);
  const dayStarted = numToDay(date);

  // creating gaps so that day starts on correct day
  const dates = Array(gaps[dayStarted]).fill(false);

  while (date.getFullYear() <= year) {
    const copiedDate = new Date(date);
    dates.push(copiedDate);
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const numToMonth = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = new Date(date).getMonth();
  return months[month];
};

export const lerp = (a, b, t) => {
  return (1 - t) * a + t * b;
};
