import React, { useEffect, useRef, useState } from "react";
import { ButtonHandler } from "./canvasButton/ButtonHandler";
import { createHitCanvas } from "./canvasButton/utils";

const CanvasHeatMap = (props) => {
  const { height, width } = props;
  const [year, setYear] = useState(2024);

  const canvasRef = useRef(null);

  const main = (year) => {
    const size = 30 / height; // 15px
    const startLocaiton = [62 / height, 54 / height]; // x: 18px, 22px
    const gap = 4 / height; // 2px
    ButtonHandler.scale = [width, height];
    ButtonHandler.startLocation = startLocaiton;
    ButtonHandler.gap = gap;
    ButtonHandler.addEventListeners();
    ButtonHandler.create52Weeks(size, year);
  };

  const drawScene = (ctx) => {
    ctx.clearRect(0, 0, width, height);
    ButtonHandler.draw(ctx);
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.height = height;
    canvas.width = width;

    return canvas;
  };

  useEffect(() => {
    ButtonHandler.canvas = initializeCanvas();
    ButtonHandler.hitCanvas = createHitCanvas(height, width);

    const ctx = ButtonHandler.canvas.getContext("2d");
    ctx.scale(height, height);
    ButtonHandler.hitCanvas.getContext("2d").scale(height, height);

    let animationFrameId;
    main(year);

    const render = () => {
      drawScene(ctx);

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawScene, year]);

  return (
    <>
      <canvas className="canvas__heatmap" ref={canvasRef} {...props} />
    </>
  );
};

export default CanvasHeatMap;
