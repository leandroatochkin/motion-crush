import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const Asset = ({ src }) => {
  const [rotation, setRotation] = useState(0);
  const [zIndex, setZIndex] = useState(1);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [visible, setVisible] = useState(false);

  const handleRotate = (e) => setRotation(e.target.value);
  const handleBringToFront = () => setZIndex((prev) => prev + 1);
  const handleEnlarge = () => {setHeight((prev)=>prev+10); setWidth((prev)=>prev+10)};
const handleReduce = () => {setHeight((prev)=>prev-10); setWidth((prev)=>prev-10)};


useEffect(()=>{console.log(rotation)},[rotation, zIndex]);

  return (
    <Draggable>
      <div
        style={{
          position: "absolute",
          
          zIndex,
        }}
      >
        
        <div onMouseEnter={()=>setVisible(true)}>
        <img src={src} alt="Asset" style={{ pointerEvents: "none", transform: `rotate(${rotation}deg)`, height: `${height}px`, width: `${width}px` }} />    
        </div>
        
        <div 
        style={visible ? {opacity: '1'} : {opacity: '0'}}
        onMouseLeave={()=>setVisible(false)}
        >
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={handleRotate}
          />
          <button onClick={handleBringToFront}>^</button>
          <button onClick={handleEnlarge}>+</button>
          <button onClick={handleReduce}>-</button>
        </div>
      </div>
    </Draggable>
  );
};

export default Asset;
