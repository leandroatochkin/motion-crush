import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { RotateExtraLeft, RotateExtraRight, RotateLeft, RotateRight, ZoomIn, ZoomOut, Trash, Hoist } from "../../assets/icons";

const Asset = ({ src, handleRemoveAsset }) => {
  const [rotation, setRotation] = useState(0);
  const [zIndex, setZIndex] = useState(1);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [visible, setVisible] = useState(false);
  const [cursor, setCursor] = useState("grab");

  const handleRotateLeft = () => setRotation((prev) => prev - 15);
  const handleRotateRight = () => setRotation((prev) => prev + 15);
  const handleRotateExtraLeft = () => setRotation((prev) => prev - 45);
  const handleRotateExtraRight = () => setRotation((prev) => prev + 45);
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

          <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}
          >
          <button onClick={handleRotateLeft}><RotateLeft/></button>
          <button onClick={handleRotateRight}><RotateRight/></button>
          <button onClick={handleRotateExtraLeft}><RotateExtraLeft/></button>
          <button onClick={handleRotateExtraRight}><RotateExtraRight/></button>
          <button onClick={handleBringToFront}><Hoist/></button>
          <button onClick={handleEnlarge}><ZoomIn/></button>
          <button onClick={handleReduce}><ZoomOut/></button>
          <button onClick={handleRemoveAsset}><Trash/></button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Asset;
