import React, { useRef } from "react";
import { toJpeg } from "html-to-image";
import { Download, ClearPanel, Eraser } from "../../assets/icons";
import { userStore } from "../../utils/userStore";
import style from "./Canvas.module.css";
import EditPanel from "../EditPanel/EditPanel";

const Canvas = ({ children, handleClearPanel, handleClearCanva }) => {
  const canvasRef = useRef(null);
  const watermarkRef = useRef(null);
  const userName = userStore((state)=>state.username)


  const handleScreenshot = () => {
    const downloadTitle = prompt('Introduzca el nombre de la imagen')
    if (canvasRef.current) {
      // Temporarily show the watermark for screenshot
      if (watermarkRef.current) {
        watermarkRef.current.style.display = "block";
      }

      toJpeg(canvasRef.current, { quality: 0.95, backgroundColor: "#ffffff" })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${downloadTitle}.jpg`;
          link.click();
        })
        .finally(() => {
          // Hide the watermark after screenshot
          if (watermarkRef.current) {
            watermarkRef.current.style.display = "none";
          }
        });
    }
  };

  return (
    <div className={style.container}>
      <div ref={canvasRef} className={style.canvasContainer}>
        {children}
        {/* Watermark */}
        <div
          ref={watermarkRef}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "rgba(255, 255, 255, 0.5)",
            pointerEvents: "none",
            display: "none",
            zIndex: '999999' // Hidden during normal rendering
          }}
        >
          {`Motion-Crush 1.0`}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          display: "flex",
          gap: "10px",
        }}
      >
        {/* Screenshot Button */}
        <button onClick={handleScreenshot} className={style.canvaBtn}>
          <Download />
        </button>
        {/* Clear Panel Button */}
        <button onClick={handleClearPanel} className={style.canvaBtn}>
          <ClearPanel />
        </button>
        {/* Clear Canvas Button */}
        <button onClick={handleClearCanva} className={style.canvaBtn}>
          <Eraser />
        </button>
      </div>
    </div>
  );
};

export default Canvas;

