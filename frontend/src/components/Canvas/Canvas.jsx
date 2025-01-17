import React, { useRef } from "react";
import {toJpeg} from "html-to-image";
import { Download, ClearPanel, Eraser } from "../../assets/icons";
import style from './Canvas.module.css'

const Canvas = ({ children, handleClearPanel, handleClearCanva }) => {
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
    <div className={style.container}>
      <div
        ref={canvasRef}
        className={style.canvasContainer}
      >
        {children}
      </div>
      <div
            style={{
              position: "absolute",
              top: "10px",
              left: '10px'
            }}
      >
      <button onClick={handleScreenshot}
      >
        <Download />
      </button>
      <button onClick={handleClearPanel}
      >
        <ClearPanel />
      </button>
      <button onClick={handleClearCanva}
      >
        <Eraser />
      </button>
      </div>
    </div>
    
  );
};

export default Canvas;
