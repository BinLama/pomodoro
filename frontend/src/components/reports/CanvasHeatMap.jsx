import React, { useEffect, useRef } from "react";

const CanvasHeatMap = (props) => {
  const { height, width } = props;

  const canvasRef = useRef(null);

  const draw = (ctx) => {};

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.height = height;
    canvas.width = width;

    return canvas;
  };

  useEffect(() => {
    const canvas = initializeCanvas();
    const context = canvas.getContext("2d");
    let animationFrameId;

    const render = () => {
      draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    };

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas className="canvas__heatmap" ref={canvasRef} {...props} />;
};

export default CanvasHeatMap;
