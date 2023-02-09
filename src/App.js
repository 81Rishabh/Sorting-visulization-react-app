import React, { useState, useRef, useEffect } from 'react';

import './App.css';
import Header from './components/header/Header';
import Bars from './components/Bars/Bars';
const BARS_COUNT = 100;


function App() {
  // initial array for random value 
  const [randomHeights, setrandomHeights] = useState([]);
  const [show, setShowSidebar] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    const array = [];
    for (let i = 0; i < BARS_COUNT; i++) {
      const randomVal = Math.floor(Math.random() * BARS_COUNT);
      array.push(Math.max(5, randomVal));
    }
    setrandomHeights(array);
  },[]);

  useEffect(() => {
    function Resize(e) {
        let width = e.target.innerWidth;
        if (width >= 600) {
          sidebarRef.current.style.transform = 'translateX(0px)';
        }
      
    }
    window.addEventListener('resize', Resize);
    return () => {
      window.removeEventListener('resize' ,Resize);
    }
  }, []);

   
    
  return (
    <div className="main">
      <Header
        show={show}
        setShowSidebar={setShowSidebar}
        sidebarRef={sidebarRef}
      />
      <Bars
        randomHeights={randomHeights}
        setrandomHeights={setrandomHeights}
        setShowSidebar={setShowSidebar}
        show={show}
        sidebarRef={sidebarRef}
      />
    </div>
  );
}

export default App;

