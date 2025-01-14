import React, {useState} from "react";
import Canvas from "./components/Canvas/Canvas";
import Asset from "./components/Asset/Asset";
import { assets } from "./utils/data";



const App = () => {
  const [selectedAsset, setSelectedAsset] = useState([]);
  return (
    <div style={{display: 'flex', width: '100vw', height: '100vh'}}>
      <Canvas>
        {selectedAsset && selectedAsset.map((src, index) => (
          <Asset key={index} src={src} />
        ))}
      </Canvas>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)', 
        height: '10vh', 
        width: '50%',
        
        }}>
        {assets.map((src, index) => (
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
  );
};

export default App;
