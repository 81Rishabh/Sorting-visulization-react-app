import React, { useState } from 'react';

import './App.css';
import Header from './components/header/Header';
import Bars from './components/Bars/Bars';

function App() {
   // initial array for random value 
   const [randomHeights, setrandomHeights] = useState([]);
  return (
    <div className="main">
       <Header
         randomHeights={randomHeights}
        />
       <Bars 
         randomHeights={randomHeights} 
         setrandomHeights={setrandomHeights}
       />
    </div>
  );
}

export default App;

