import React, { useRef } from "react";
import {toJpeg} from "html-to-image";

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
        style={{
          position: "relative",
          width: "800px",
          height: "600px",
          border: "1px solid black",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      <button onClick={handleScreenshot}>Download JPG</button>
    </div>
  );
};

export default Canvas;
