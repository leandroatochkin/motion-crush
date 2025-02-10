import React, { useEffect, useState } from "react";
import Canvas from "../../components/Canvas/Canvas";
import Asset from "../../components/Asset/Asset";
import {
  animals_3d,
  arrows_3d,
  bikes_3d,
  bridges_3d,
  busses_3d,
  cars_3d,
  events_3d,
  pedestrians_3d,
  streets_3d,
  trafficlights_3d,
  trucks_3d,
  animals_aerial,
  bikes_aerial,
  busses_aerial,
  cars_aerial,
  events_aerial,
  streets_aerial,
  trucks_aerial
} from '../../utils/data';
import style from './Main.module.css'
import { userStore } from "../../utils/userStore";
import { TopView, Isometric, Help } from "../../assets/icons";
import HelpModal from "../../components/HelpModal/HelpModal";


// Mapping internal keys to human-readable labels
const categories_3d = {
  animals: { name: "Animales", data: animals_3d },
  arrows: { name: "Flechas", data: arrows_3d },
  bikes: { name: "Bicicletas & Motos", data: bikes_3d },
  bridges: { name: "Puentes", data: bridges_3d },
  busses: { name: "Colectivos", data: busses_3d },
  cars: { name: "Autos", data: cars_3d },
  events: { name: "Eventos", data: events_3d },
  pedestrians: { name: "Peatones", data: pedestrians_3d },
  streets: { name: "Calles & Rutas", data: streets_3d },
  trafficlights: { name: "Semáforos", data: trafficlights_3d },
  trucks: { name: "Camiones", data: trucks_3d },
};


const categories_aerial = {
  animals: { name: "Animales", data: animals_aerial },
  bikes: { name: "Bicicletas & Motos", data: bikes_aerial },
  bridges: { name: "Puentes", data: bikes_aerial },
  busses: { name: "Colectivos", data: busses_aerial },
  cars: { name: "Autos", data: cars_aerial },
  events: { name: "Eventos", data: events_aerial },
  streets: { name: "Calles & Rutas", data: streets_aerial },
  trucks: { name: "Camiones", data: trucks_aerial },
};

const Main = () => {
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("cars");
  const [clearAssetPanel, setClearAssetPanel] = useState(false)
  const [currentView, setCurrentView] = useState(categories_3d)
  const [openModal, setOpenModal] = useState(false)

  const loggedIn = userStore((state)=>state.loggedIn)

  const handleRemoveAsset = (index) => {
    setSelectedAsset(selectedAsset.filter((asset, i) => i !== index));
  };



  const handleClearPanel = () =>{
    setClearAssetPanel(true)
    setTimeout(() => setClearAssetPanel(false), 0)
  }
 
 const handleClearCanva = () => {
    if(confirm('¿Está seguro que quiere borrar todo?')){
        setSelectedAsset([])
    }
 }

  return (
    <>
    {openModal && <HelpModal closeFunction={setOpenModal}/>}
    {loggedIn ? (
        <div
        className={style.appContainer}
      >
        <div className={style.canvasContainer}>
          <Canvas handleClearPanel={handleClearPanel} handleClearCanva={handleClearCanva}>
            {selectedAsset &&
              selectedAsset.map((src, index) => (
                <Asset
                  key={index}
                  src={src}
                  handleRemoveAsset={() => handleRemoveAsset(index)}
                  clear={clearAssetPanel}
                />
              ))}
          </Canvas>
        </div>
  
        {/* Sidebar */}
        <div
          className={style.sidebar}
        >
          {/* Category Selector */}
              <div className={style.selectContainer}>
              <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className={style.categorySelector}
  
          >
            {Object.entries(currentView).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
            <div className={style.btnContainer}>
            <button onClick={()=>setCurrentView(categories_aerial)} className={style.btn}><TopView/></button>
            <button onClick={()=>setCurrentView(categories_3d)} className={style.btn}><Isometric/></button>
            <button onClick={()=>setOpenModal(true)} className={style.btn}><Help/></button>
            </div>
            </div>
          {/* Assets Display */}
          <div
            className={style.assetsDisplay}
          >
            {currentView[selectedCategory].data.map((src, index) => (
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
    ) : (
        <div className={style.appContainer}>
                <h1>Por favor loguearse</h1>
        </div>
    )}
    </>
  );
};

export default Main;
