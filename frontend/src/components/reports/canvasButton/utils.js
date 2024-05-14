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
