import React, { useState, useRef, useEffect } from 'react';

import './App.css';
import Header from './components/header/Header';
import Bars from './components/Bars/Bars';

function App() {
  // initial array for random value 
  const [randomHeights, setrandomHeights] = useState([]);
  const [show, setShowSidebar] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    window.addEventListener('resize', e => {
      let width = e.target.innerWidth;
      if (width >= 600) {
        sidebarRef.current.style.transform = 'translateX(0px)';
      }
    });
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

