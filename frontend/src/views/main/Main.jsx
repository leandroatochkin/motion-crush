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
import EditPanel from "../../components/EditPanel/EditPanel";

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
  const [assets, setAssets] = useState([])
  useEffect(()=>console.log(assets),[assets])
  const [selectedCategory, setSelectedCategory] = useState("animals"); // Default category
  const [clearAssetPanel, setClearAssetPanel] = useState(false)
  const [currentView, setCurrentView] = useState(categories_aerial)
  const [openModal, setOpenModal] = useState(false)
  const [textAssets, setTextAssets] = useState([])


  const [currentElement, setCurrentElement] = useState({
    index: null,
    src: '',
  })

  const [currentTextElement, setCurrentTextElement] = useState({
    index: null,
    elem: {},
  })

  const loggedIn = userStore((state) => state.loggedIn)

  const handleRemoveAsset = (index) => {
    console.log(index)
    setAssets(assets.filter((asset, i) => i !== index));
  };

  const handleRemoveTextAsset = (index) => {
    setTextAssets(textAssets.filter((_, i) => i !== index));
  };

  const handleClearPanel = () => {
    setClearAssetPanel(true)
    setTimeout(() => setClearAssetPanel(false), 0)
  }

  const handleClearCanva = () => {
    if (confirm('¿Está seguro que quiere borrar todo?')) {
      setAssets([]);
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

  const glow = {
    width: '100%', // Matches the image width
    height: '100%', // Matches the image height
    borderRadius: '10px', // Slightly rounded corners
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Soft white background
    boxShadow: `
      0 0 20px 5px rgba(255, 255, 255, 0.6),  
      0 0 40px 10px rgba(255, 0, 255, 0.4), 
      0 0 60px 15px rgba(0, 255, 255, 0.3)
    `,
    filter: 'blur(5px)', // Adds a soft glow effect
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  };

  return (
    <>
      {openModal && <HelpModal closeFunction={setOpenModal} />}
      {loggedIn ? (
        <div className={style.appContainer}>
          <div className={style.canvasContainer}>
            <Canvas handleClearPanel={handleClearPanel} handleClearCanva={handleClearCanva}>
              {assets &&
                assets.map((asset, index) => (
                  <div onClick={() => { setCurrentElement((prev)=>({
                    ...prev,
                    index: index,
                    src: asset.src
                  })) }} key={index}
                 >
                  
                    <Asset
                      key={index}
                      src={asset.src}
                      id={index}

                      clear={clearAssetPanel}
                      rotation={asset.rotation}
                      height={asset.height}
                      width={asset.width}
                      mirrorDeg={asset.mirrorDeg}
                      zIndex={asset.zIndex}
                      style={index === currentElement.index ? glow : {}}
                    />
                  </div>
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

          <EditPanel
            setSelectedAssets={setAssets}
            selectedAsset={currentElement}
            handleRemoveAsset={handleRemoveAsset}
          />

          {/* Sidebar */}
          <div className={style.sidebar}>
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
                <button onClick={() => setCurrentView(categories_aerial)} className={style.btn}><TopView /></button>
                <button onClick={() => setCurrentView(categories_3d)} className={style.btn}><Isometric /></button>
                <button onClick={() => setOpenModal(true)} className={style.btn}><Help /></button>
                <button onClick={() => setTextAssets([...textAssets, {}])} className={style.btn}>➕ Texto</button>
              </div>
            </div>

            {/* Assets Display */}
            <div className={style.assetsDisplay}>
              {currentView[selectedCategory] && currentView[selectedCategory].data
                ? currentView[selectedCategory].data.map((src, index) => (
                  <div
                    key={index}
                    onClick={() => setAssets((prev) => [...prev, {
                      src: src,
                      rotation: 0,
                      width: 300,
                      height: 200,
                      mirrorDeg: 0,
                      zIndex: 1
                    }])}
                    className={style.assetItem}
                    style={{
                      backgroundImage: `url(${src})`,
                    }}
                  ></div>
                ))
                : <p>No assets available</p>}
            </div>
          </div>

          {/* Right Side (Diagonal Bar) */}
          <div className={style.diagonalBar}>
            <div className={style.diagonalBarContent}>
              <h1 className={style.diagonalBarTitle}>MOTION CRUSH 1.0</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.appContainer}>
          <h1 style={{ color: "black" }}>Por favor loguearse</h1>
        </div>
      )}
    </>
  );
};

export default Main;
