import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const Asset = ({ src, handleRemoveAsset }) => {
  const [rotation, setRotation] = useState(0);
  const [zIndex, setZIndex] = useState(1);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [visible, setVisible] = useState(false);
  const [cursor, setCursor] = useState("grab");

  const handleRotateLeft = () => setRotation((prev) => prev - 15);
  const handleRotateRight = () => setRotation((prev) => prev + 15);
  const handleBringToFront = () => setZIndex((prev) => prev + 1);
  const handleEnlarge = () => {setHeight((prev)=>prev+10); setWidth((prev)=>prev+10)};
const handleReduce = () => {setHeight((prev)=>prev-10); setWidth((prev)=>prev-10)};


useEffect(()=>{console.log(rotation)},[rotation, zIndex]);

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
        
        <div onMouseEnter={()=>setVisible(true)}>
        <img src={src} alt="Asset" style={{ pointerEvents: "none", transform: `rotate(${rotation}deg)`, height: `${height}px`, width: `${width}px` }} />    
        </div>
        
        <div 
        style={visible ? {opacity: '1'} : {opacity: '0'}}
        onMouseLeave={()=>setVisible(false)}
        >

          <button onClick={handleRotateLeft}>{'<'}</button>
          <button onClick={handleRotateRight}>{'>'}</button>
          <button onClick={handleBringToFront}>^</button>
          <button onClick={handleEnlarge}>+</button>
          <button onClick={handleReduce}>-</button>
          <button onClick={handleRemoveAsset}>quitar</button>
        </div>
      </div>
    </Draggable>
  );
};

export default Asset;
