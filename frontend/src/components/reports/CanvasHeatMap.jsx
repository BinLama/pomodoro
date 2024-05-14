import React, { useEffect, useRef } from "react";
import { ButtonHandler } from "./canvasButton/ButtonHandler";
import { createHitCanvas } from "./canvasButton/utils";

const CanvasHeatMap = (props) => {
  const { height, width } = props;

  const canvasRef = useRef(null);
  const hitTestRef = useRef(null);

  const main = () => {
    const size = 12 / height; // 12px
    const startLocaiton = [18 / height, 22 / height]; // x: 18px, 22px
    const gap = 2 / height; // 2px
    ButtonHandler.scale = [width, height];
    ButtonHandler.addEventListeners();
    ButtonHandler.create52Weeks(size, startLocaiton, gap);
  };

  const drawScene = (ctx) => {
    ctx.clearRect(0, 0, width, height);
    ButtonHandler.drawRectangles(ctx);
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.height = height;
    canvas.width = width;

    return canvas;
  };

  const initializeHitest = () => {
    const canvas = hitTestRef.current;
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
    main();

    const render = () => {
      drawScene(ctx);

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawScene]);

  return (
    <>
      <canvas className="canvas__heatmap" ref={canvasRef} {...props} />
    </>
  );
};

export default CanvasHeatMap;
