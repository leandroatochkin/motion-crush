import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { RotateExtraLeft, RotateExtraRight, RotateLeft, RotateRight, ZoomIn, ZoomOut, Trash, Hoist, Mirror } from "../../assets/icons";
import style from './Asset.module.css'
import ExpandHeight from "../../assets/icons/ExpandHeight";
import ExpandWidth from "../../assets/icons/ExpandWidth";
import ReduceHeight from "../../assets/icons/ReduceHeight";
import ReduceWidth from "../../assets/icons/ReduceWidth";

const Asset = ({ src, handleRemoveAsset, clear }) => {
  const [rotation, setRotation] = useState(0);
  const [zIndex, setZIndex] = useState(1);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [mirrorDeg, setMirrorDeg] = useState(0)
  const [visible, setVisible] = useState(false);
  const [cursor, setCursor] = useState("grab");

  const handleRotateLeft = () => setRotation((prev) => prev - 15);
  const handleRotateRight = () => setRotation((prev) => prev + 15);
  const handleRotateExtraLeft = () => setRotation((prev) => prev - 45);
  const handleRotateExtraRight = () => setRotation((prev) => prev + 45);
  const handleBringToFront = () => setZIndex((prev) => prev + 1);
  const handleEnlarge = () => {setHeight((prev)=>prev+10); setWidth((prev)=>prev+10)};
  const handleReduce = () => {setHeight((prev)=>prev-10); setWidth((prev)=>prev-10)};
  const handleMirror = () => setMirrorDeg((prev)=>prev+180);
  const handleReduceWidth = () => setWidth((prev)=>prev-20);
  const handleAugmentWidth = () => setWidth((prev)=>prev+20);
  const handleReduceHeight = () => setHeight((prev)=>prev-20);
  const handleAugmentHeight = () => setHeight((prev)=>prev+20);


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
        onMouseEnter={()=>setVisible(true)}
        onTouchStart={()=>setVisible(true)}
        >
        <img src={src} alt="Asset" style={{ pointerEvents: "none", transform: `rotateZ(${rotation}deg) rotateY(${mirrorDeg}deg)`, height: `${height}px`, width: `${width}px` }} />    
        </div>
        
        <div 
        style={visible ? {opacity: '1'} : {opacity: '0'}}
        onMouseLeave={()=>setVisible(false)}
        >

          <div 
          className={style.assetPanel}
          >
          <button onClick={handleRotateLeft} onTouchStart={handleRotateLeft} className={style.panelBtn}><RotateLeft/></button>
          <button onClick={handleRotateRight} onTouchStart={handleRotateRight} className={style.panelBtn}><RotateRight/></button>
          <button onClick={handleRotateExtraLeft} onTouchStart={handleRotateExtraLeft} className={style.panelBtn}><RotateExtraLeft/></button>
          <button onClick={handleRotateExtraRight} onTouchStart={handleRotateExtraRight} className={style.panelBtn}><RotateExtraRight/></button>
          <button onClick={handleBringToFront} onTouchStart={handleBringToFront} className={style.panelBtn}><Hoist/></button>
          <button onClick={handleEnlarge} onTouchStart={handleEnlarge} className={style.panelBtn}><ZoomIn/></button>
          <button onClick={handleReduce} onTouchStart={handleReduce} className={style.panelBtn}><ZoomOut/></button>
          <button onClick={handleMirror} onTouchStart={handleMirror} className={style.panelBtn}><Mirror/></button>
          <button onClick={handleAugmentHeight} onTouchStart={handleAugmentHeight} className={style.panelBtn}><ExpandHeight/></button>
          <button onClick={handleReduceHeight} onTouchStart={handleReduceHeight} className={style.panelBtn}><ReduceHeight/></button>
          <button onClick={handleAugmentWidth} onTouchStart={handleAugmentWidth} className={style.panelBtn}><ExpandWidth/></button>
          <button onClick={handleReduceWidth} onTouchStart={handleReduceWidth}  className={style.panelBtn}><ReduceWidth/></button>
          <button onClick={handleRemoveAsset} onTouchStart={handleRemoveAsset}  className={style.panelBtn}><Trash/></button>

          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Asset;
