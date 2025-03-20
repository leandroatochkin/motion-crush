import React, { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import style from "./TextAsset.module.css";
import { RotateExtraLeft, RotateExtraRight, RotateLeft, RotateRight, ZoomIn, ZoomOut, Trash, Hoist, Mirror} from "../../assets/icons";
import Edit from "../../assets/icons/Edit";


const TextAsset = ({ handleRemoveAsset, clear }) => {
    const nodeRef = useRef(null);
  const [text, setText] = useState("Doble click para editar");
  const [isEditing, setIsEditing] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zIndex, setZIndex] = useState(1);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [mirrorDeg, setMirrorDeg] = useState(0);
  const [visible, setVisible] = useState(false);
  const [cursor, setCursor] = useState("grab");
  const [textColor, setTextColor] = useState("black");
  const [fontSize, setFontSize] = useState(10);

  const handleRotateLeft = () => setRotation((prev) => prev - 15);
  const handleRotateRight = () => setRotation((prev) => prev + 15);
  const handleRotateExtraLeft = () => setRotation((prev) => prev - 45);
  const handleRotateExtraRight = () => setRotation((prev) => prev + 45);
  const handleBringToFront = () => setZIndex((prev) => prev + 1);
  const handleEnlargeFont = () => setFontSize((prev) => prev + 2);
  const handleReduceFont = () => setFontSize((prev) => prev - 2);


  useEffect(() => {
    if (clear) {
      setVisible(false);
    }
  }, [clear]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <Draggable
    nodeRef={nodeRef}
    >
      <div
      className={style.container}
      ref={nodeRef}
        style={{
          position: "absolute",
          zIndex,
          width: `${width}px`,
          height: `${height}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          cursor: "grab",
          color: textColor,
          
          
        }}
        onDoubleClick={() => setIsEditing(true)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            onBlur={handleBlur}
            autoFocus
            style={{
                height: "2rem",
            }}
          />
        ) : (
          <span style={{ color: textColor, transform: `rotateZ(${rotation}deg)`, fontSize:`${fontSize}px`, }}>{text}</span>
        )}

        {visible && (
     
             
            <div className={style.assetPanel}>
            <button onClick={()=>setIsEditing(true)} onTouchStart={()=>setIsEditing(true)}  className={style.panelBtn}><Edit/></button>
            <button onClick={handleRotateLeft} onTouchStart={handleRotateLeft} className={style.panelBtn}><RotateLeft/></button>
            <button onClick={handleRotateRight} onTouchStart={handleRotateRight} className={style.panelBtn}><RotateRight/></button>
            <button onClick={handleRotateExtraLeft} onTouchStart={handleRotateExtraLeft} className={style.panelBtn}><RotateExtraLeft/></button>
            <button onClick={handleRotateExtraRight} onTouchStart={handleRotateExtraRight} className={style.panelBtn}><RotateExtraRight/></button>
          <button onClick={handleBringToFront} onTouchStart={handleBringToFront} className={style.panelBtn}><Hoist/></button>
          <button onClick={handleEnlargeFont} onTouchStart={handleEnlargeFont} className={style.panelBtn}><ZoomIn/></button>
          <button onClick={handleReduceFont} onTouchStart={handleReduceFont} className={style.panelBtn}><ZoomOut/></button>
          <button onClick={handleRemoveAsset} onTouchStart={handleRemoveAsset}  className={style.panelBtn}><Trash/></button>
              <button onClick={() => setTextColor("black")} onTouchStart={() => setTextColor("black")} className={style.panelBtn} style={{ background: "black", color: "white" }}>N</button>
              <button onClick={() => setTextColor("white")} onTouchStart={() => setTextColor("white")} className={style.panelBtn} style={{ background: "white", color: "black" }}>B</button>
              <button onClick={() => setTextColor("orange")} onTouchStart={() => setTextColor("orange")} className={style.panelBtn} style={{ background: "orange", color: "black" }}>Nr</button>
            </div>
  
        )}
      </div>
    </Draggable>
  );
};

export default TextAsset;

