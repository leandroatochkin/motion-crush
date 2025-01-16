import React, { useRef } from "react";
import {toJpeg} from "html-to-image";
import style from './Canvas.module.css'

const Canvas = ({ children }) => {
  const canvasRef = useRef(null);

  const handleScreenshot = () => {
    if (canvasRef.current) {
        toJpeg(canvasRef.current, { quality: 0.95 }).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "arrangement.jpg";
        link.click();
      });
    }
  };

  return (
    <div>
      <div
        ref={canvasRef}
        className={style.canvasContainer}
      >
        {children}
      </div>
      <button onClick={handleScreenshot}
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
      }}
      >Download JPG</button>
    </div>
  );
};

export default Canvas;
