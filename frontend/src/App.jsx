import React, {useState} from "react";
import Canvas from "./components/Canvas/Canvas";
import Asset from "./components/Asset/Asset";
import { vehicles, traffic, people, scenarios } from "./utils/data";



const App = () => {
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(vehicles);


  const handleRemoveAsset = (index) => {
    setSelectedAsset(selectedAsset.filter((asset, i) => i !== index));
  }


  return (
    <div style={{display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <div style={{width: '70%', height: '100vh'}}>
      <Canvas>
        {selectedAsset && selectedAsset.map((src, index) => (
          <Asset key={index} src={src} handleRemoveAsset={()=>handleRemoveAsset(index)}/>
        ))}
      </Canvas>
      </div>
      {/*-------------------vehicles--------------------*/}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'scroll',
        scrollbarWidth: 'none',
        width: '25%',
      }}>
      <div>
        <button onClick={()=>setSelectedCategory(vehicles)}>Vehículos</button>
        <button onClick={()=>setSelectedCategory(traffic)}>Tráfico</button>
        <button onClick={()=>setSelectedCategory(people)}>Personas</button>
        <button onClick={()=>setSelectedCategory(scenarios)}>Escenarios</button>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '10px',
        height: '100%', 
        width: '20%',
        
        }}>
        
        {selectedCategory.map((src, index) => (
          <div key={index}
            onClick={() => setSelectedAsset((prev)=>[...prev, src])} 
            style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            width: '200px',
            height: '150px',
            cursor: 'pointer',
          }}>
          </div>
        ))}
      </div>
      </div>
      <div style={{
        width: '10%',
        height: '100vh',
      }}>
        <div style={{
          top: '0',
          height: '70%',
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
          backgroundColor: 'red'
        }}>
        <h1 style={{
          transform: 'rotate(90deg)',
          width: '100%',
          whiteSpace: 'nowrap',
          paddingTop: '60%',
          paddingLeft: '70%'
        }}>MOTION CRUSH 1.0</h1>
        </div>

      </div>
    </div>
  );
};

export default App;
