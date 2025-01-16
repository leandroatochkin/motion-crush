import React, { useEffect, useState } from "react";
import Canvas from "../../components/Canvas/Canvas";
import Asset from "../../components/Asset/Asset";
import {
  animals,
  arrows,
  bikes,
  bridges,
  busses,
  cars,
  events,
  pedestrians,
  streets,
  trafficlights,
  trucks,
} from '../../utils/data';
import style from './Main.module.css'

// Mapping internal keys to human-readable labels
const categories = {
  animals: { name: "Animales", data: animals },
  arrows: { name: "Flechas", data: arrows },
  bikes: { name: "Bicicletas & Motos", data: bikes },
  bridges: { name: "Puentes", data: bridges },
  busses: { name: "Colectivos", data: busses },
  cars: { name: "Autos", data: cars },
  events: { name: "Eventos", data: events },
  pedestrians: { name: "Peatones", data: pedestrians },
  streets: { name: "Calles & Rutas", data: streets },
  trafficlights: { name: "Semáforos", data: trafficlights },
  trucks: { name: "Camiones", data: trucks },
};

const Main = () => {
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("cars");

  const handleRemoveAsset = (index) => {
    setSelectedAsset(selectedAsset.filter((asset, i) => i !== index));
  };

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  return (
    <div
      className={style.appContainer}
    >
      <div className={style.canvasContainer}>
        <Canvas>
          {selectedAsset &&
            selectedAsset.map((src, index) => (
              <Asset
                key={index}
                src={src}
                handleRemoveAsset={() => handleRemoveAsset(index)}
              />
            ))}
        </Canvas>
      </div>

      {/* Sidebar */}
      <div
        className={style.sidebar}
      >
        {/* Category Selector */}
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className={style.categorySelector}

        >
          {Object.entries(categories).map(([key, { name }]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>

        {/* Assets Display */}
        <div
          className={style.assetsDisplay}
        >
          {categories[selectedCategory].data.map((src, index) => (
            <div
              key={index}
              onClick={() => setSelectedAsset((prev) => [...prev, src])}
              className={style.assetItem}
              style={{
                backgroundImage: `url(${src})`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Side (Diagonal Bar) */}
      <div className={style.diagonalBar}>
        <div
          className={style.diagonalBarContent}
        >
          <h1
            className={style.diagonalBarTitle}
          >
            MOTION CRUSH 1.0
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Main;
