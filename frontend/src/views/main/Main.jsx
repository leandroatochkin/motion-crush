import React, { useEffect, useState } from "react";
import Canvas from "../../components/Canvas/Canvas";
import Asset from "../../components/Asset/Asset";
import TextAsset from "../../components/Asset/TextAsset";
import {
  animals_3d,
  animals_aerial,
  bikes_aerial,
  busses_aerial,
  cars_aerial,
  events_aerial,
  signals_aerial,
  streets_aerial,
  trucks_aerial,
  arrows_aerial,
  people_aerial
} from '../../utils/data';
import style from './Main.module.css'
import { userStore } from "../../utils/userStore";
import { TopView, Isometric, Help } from "../../assets/icons";
import HelpModal from "../../components/HelpModal/HelpModal";


// Mapping internal keys to human-readable labels
const categories_3d = {
  animals: { name: "Animales", data: animals_3d },
};


const categories_aerial = {
  animals: { name: "Animales", data: animals_aerial },
  bikes: { name: "Bicicletas & Motos", data: bikes_aerial },
  arrows: {name: "Flechas", data: arrows_aerial },
  busses: { name: "Colectivos", data: busses_aerial },
  cars: { name: "Autos", data: cars_aerial },
  events: { name: "Eventos", data: events_aerial },
  people: { name: "Personas", data: people_aerial },
  signals: { name: "Señalización", data: signals_aerial },
  streets: { name: "Calles & Rutas", data: streets_aerial },
  trucks: { name: "Camiones", data: trucks_aerial },
};

const Main = () => {
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("animals"); // Default category
  const [clearAssetPanel, setClearAssetPanel] = useState(false)
  const [currentView, setCurrentView] = useState(categories_aerial)
  const [openModal, setOpenModal] = useState(false)
  const [textAssets, setTextAssets] = useState([]);

  const loggedIn = userStore((state)=>state.loggedIn)

  const handleRemoveAsset = (index) => {
    setSelectedAsset(selectedAsset.filter((asset, i) => i !== index));
  };

  const handleRemoveTextAsset = (index) => {
    setTextAssets(textAssets.filter((_, i) => i !== index));
  };

  const handleClearPanel = () =>{
    setClearAssetPanel(true)
    setTimeout(() => setClearAssetPanel(false), 0)
  }
 
 const handleClearCanva = () => {
    if(confirm('¿Está seguro que quiere borrar todo?')){
        setSelectedAsset([]);
        setTextAssets([]);
    }
 }

 const handleCategoryChange = (e) => {
  const selected = e.target.value;
  // Only set category if it's a valid option in the current view
  if (currentView[selected]) {
    setSelectedCategory(selected);
  } else {
    // Fallback if an invalid category is selected
    setSelectedCategory("animals");
  }
};

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
            {textAssets.map((_, index) => (
              <TextAsset
                key={index}
                handleRemoveAsset={() => handleRemoveTextAsset(index)}
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
  onChange={handleCategoryChange}
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
            <button onClick={() => setTextAssets([...textAssets, {}])} className={style.btn}>➕ Texto</button>
            </div>
            </div>
          {/* Assets Display */}
          <div className={style.assetsDisplay}>
  {currentView[selectedCategory] && currentView[selectedCategory].data
    ? currentView[selectedCategory].data.map((src, index) => (
        <div
          key={index}
          onClick={() => setSelectedAsset((prev) => [...prev, src])}
          className={style.assetItem}
          style={{
            backgroundImage: `url(${src})`,
          }}
        ></div>
      ))
    : <p>No assets available</p>} {/* Fallback message */}
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
                <h1
                style={{
                  color: "black",
                }}
                >Por favor loguearse</h1>
        </div>
    )}
    </>
  );
};

export default Main;
