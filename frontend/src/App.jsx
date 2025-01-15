import React, { useEffect, useState } from "react";
import Canvas from "./components/Canvas/Canvas";
import Asset from "./components/Asset/Asset";
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
} from "./utils/data";

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

const App = () => {
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
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "70%", height: "100vh" }}>
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
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "scroll",
          scrollbarWidth: "none",
          width: "25%",
        }}
      >
        {/* Category Selector */}
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          {Object.entries(categories).map(([key, { name }]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>

        {/* Assets Display */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: "10px",
            height: "100%",
            width: "100%",
          }}
        >
          {categories[selectedCategory].data.map((src, index) => (
            <div
              key={index}
              onClick={() => setSelectedAsset((prev) => [...prev, src])}
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                width: "200px",
                height: "150px",
                cursor: "pointer",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Side (Diagonal Bar) */}
      <div style={{ width: "10%", height: "100vh" }}>
        <div
          style={{
            top: "0",
            height: "70%",
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
            backgroundColor: "red",
          }}
        >
          <h1
            style={{
              transform: "rotate(90deg)",
              width: "100%",
              whiteSpace: "nowrap",
              paddingTop: "60%",
              paddingLeft: "70%",
            }}
          >
            MOTION CRUSH 1.0
          </h1>
        </div>
      </div>
    </div>
  );
};

export default App;
