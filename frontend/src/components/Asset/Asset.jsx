import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

const Asset = ({ 
  src, 
  handleRemoveAsset, 
  id,
  clear,
  rotation,
  height,
  width,
  mirrorDeg,
  zIndex,
  style

}) => {
const [cursor, setCursor] = useState("grab");
useEffect(()=>{
  if (clear === true) {
  setVisible(false);
}

},[clear]);





  return (
    <Draggable>
      <div
        style={{
          position: "absolute",
          cursor: cursor,
          zIndex,
        }}
        onClick={() => setCursor("grabbing")}
      >
 <div
  style={{
    position: "relative",
    display: "inline-block",
    border: "1px solid red", // For debugging, remove later
  }}
>
  {/* Glow effect div (placed behind the image) */}
  <div
    style={{
      ...style, // This should contain the glow effect
      position: "absolute",
      top: 0,
      left: 0,
      width: `${width}px`,
      height: `${height}px`,
      zIndex: 0, // Ensures it's behind the image
    }}
  ></div>

  {/* Image on top */}
  <img
    src={src}
    alt="Asset"
    style={{
      pointerEvents: "none",
      transform: `rotateZ(${rotation}deg) rotateY(${mirrorDeg}deg)`,
      height: `${height}px`,
      width: `${width}px`,
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1, // Ensures it's above the glow effect
    }}
  />
</div>

       
      </div>
    </Draggable>
  );
};

export default Asset;
