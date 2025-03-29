import React, { useEffect } from 'react';
import { RotateExtraLeft, RotateExtraRight, RotateLeft, RotateRight, ZoomIn, ZoomOut, Trash, Hoist, Mirror } from "../../assets/icons";
import ExpandHeight from "../../assets/icons/ExpandHeight";
import ExpandWidth from "../../assets/icons/ExpandWidth";
import ReduceHeight from "../../assets/icons/ReduceHeight";
import ReduceWidth from "../../assets/icons/ReduceWidth";
import style from './EditPanel.module.css';

const EditPanel = ({ currentTextElement, setCurrentTextElement, handleRemoveAsset, selectedAsset, setSelectedAssets, editMode  }) => {
    const { src, rotation, width, height, mirrorDeg, zIndex } = selectedAsset


    const handleRotateLeft = () => { 
      setSelectedAssets(prevAssets =>
        prevAssets.map((asset, index) =>
          index === selectedAsset.index 
            ? { ...asset, rotation: asset.rotation - 15 }
            : asset
        )
      )
  }


  const handleRotateRight = () => {
    setSelectedAssets(prevAssets =>
      prevAssets.map((asset, index) =>
        index === selectedAsset.index 
          ? { ...asset, rotation: asset.rotation + 15 }
          : asset
      )
    )
  }

  const handleRotateExtraLeft = () => {
    setSelectedAssets(prevAssets =>
        prevAssets.map((asset, index) =>
          index === selectedAsset.index 
            ? { ...asset, rotation: asset.rotation - 45 }
            : asset
        )
      )
  };
  const handleRotateExtraRight = () => {
    setSelectedAssets(prevAssets =>
      prevAssets.map((asset, index) =>
        index === selectedAsset.index 
          ? { ...asset, rotation: asset.rotation + 45 }
          : asset
      )
    )
  }
  const handleBringToFront = () => {
    setSelectedAssets(prevAssets =>
      prevAssets.map((asset, index) =>
        index === selectedAsset.index 
          ? { ...asset, zIndex: asset.zIndex + 1 }
          : asset
      )
    )
  };
  const handleEnlarge = () => {
    setSelectedAssets(prevAssets =>
      prevAssets.map((asset, index) =>
        index === selectedAsset.index 
          ? { ...asset, width: asset.width + 10, height: asset.height + 10 }
          : asset
      )
    )
  };
  const handleReduce = () => {
    setSelectedAssets(prevAssets =>
      prevAssets.map((asset, index) =>
        index === selectedAsset.index 
          ? { ...asset, width: asset.width - 10, height: asset.height - 10 }
          : asset
      )
    )
  };
  const handleMirror = () => {
    setSelectedAssets(prevAssets =>
      prevAssets.map((asset, index) =>
        index === selectedAsset.index 
          ? { ...asset, mirrorDeg: asset.mirrorDeg + 180 }
          : asset
      )
    )
  };
  const handleReduceWidth = () => {
    setSelectedAssets(prevAssets =>
      prevAssets.map((asset, index) =>
        index === selectedAsset.index 
          ? { ...asset, width: asset.width - 10 }
          : asset
      )
    )
  };
  const handleAugmentWidth = () => {
    setSelectedAssets(prevAssets =>
      prevAssets.map((asset, index) =>
        index === selectedAsset.index 
          ? { ...asset, width: asset.width + 10 }
          : asset
      )
    )
  };
  const handleReduceHeight = () => {
    setSelectedAssets(prevAssets =>
      prevAssets.map((asset, index) =>
        index === selectedAsset.index 
          ? { ...asset, height: asset.height - 10 }
          : asset
      )
    )
  };
  const handleAugmentHeight = () => {
    setSelectedAssets(prevAssets =>
      prevAssets.map((asset, index) =>
        index === selectedAsset.index 
          ? { ...asset, height: asset.height + 10 }
          : asset
      )
    )
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", width: "5%", height: "100%", background: 'gray' }}>
      <div>
        <img src={`${selectedAsset.src}`} style={{ height: "50px", width: "100px" }} alt="Selected Asset" />
      </div>
      <button onClick={handleRotateLeft} onTouchStart={handleRotateLeft} className={style.panelBtn}><RotateLeft /></button>
      <button onClick={handleRotateRight} onTouchStart={handleRotateRight} className={style.panelBtn}><RotateRight /></button>
      <button onClick={handleRotateExtraLeft} onTouchStart={handleRotateExtraLeft} className={style.panelBtn}><RotateExtraLeft /></button>
      <button onClick={handleRotateExtraRight} onTouchStart={handleRotateExtraRight} className={style.panelBtn}><RotateExtraRight /></button>
      <button onClick={handleBringToFront} onTouchStart={handleBringToFront} className={style.panelBtn}><Hoist /></button>
      <button onClick={handleEnlarge} onTouchStart={handleEnlarge} className={style.panelBtn}><ZoomIn /></button>
      <button onClick={handleReduce} onTouchStart={handleReduce} className={style.panelBtn}><ZoomOut /></button>
      <button onClick={handleMirror} onTouchStart={handleMirror} className={style.panelBtn}><Mirror /></button>
      <button onClick={handleAugmentHeight} onTouchStart={handleAugmentHeight} className={style.panelBtn}><ExpandHeight /></button>
      <button onClick={handleReduceHeight} onTouchStart={handleReduceHeight} className={style.panelBtn}><ReduceHeight /></button>
      <button onClick={handleAugmentWidth} onTouchStart={handleAugmentWidth} className={style.panelBtn}><ExpandWidth /></button>
      <button onClick={handleReduceWidth} onTouchStart={handleReduceWidth} className={style.panelBtn}><ReduceWidth /></button>
      <button onClick={()=>handleRemoveAsset(selectedAsset.index)} onTouchStart={handleRemoveAsset} className={style.panelBtn}><Trash /></button>
    </div>
  );
};

export default EditPanel;
