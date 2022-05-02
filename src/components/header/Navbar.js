import React, { useState } from "react";

function Navbar({ randomHeights }) {
  const COMPARSION_COLOR = "blue";
  const SORTED_COLOR = "green";
  const DEFAULT = "lightpink";
  const [time, setTime] = useState(1);

  
  // spped handler
  function speedHandler(e) {
    let val = e.target.value;

    switch (val) {
      case "very-slow": {
        setTime(1000);
        break;
      }
      case "slow": {
        setTime(500);
        break;
      }
      case "midium": {
        setTime(100);
        break;
      }
      case "Fast": {
        setTime(1);
        break;
      }
    }
  }

  //  bubble Sort
  function bubbleSort() {
    var n = randomHeights.length;
    const array_bars = document.querySelectorAll(".bars");
    for (let i = 0; i < n - 1; i++) {
      setTimeout(function () {
        for (let j = 0; j < n - i - 1; j++) {
          setTimeout(function () {
            // j & j + 1 this are the index
            // That we are comparing
            var elementOne = randomHeights[j + 1];
            var elmentTwo = randomHeights[j];

            array_bars[j].style.backgroundColor = COMPARSION_COLOR;
            array_bars[j + 1].style.backgroundColor = COMPARSION_COLOR;

            if (elmentTwo > elementOne) {
              // This are the value that we are comparing
              var temp = randomHeights[j + 1];
              randomHeights[j + 1] = randomHeights[j];
              randomHeights[j] = temp;

              // seting up updated heights
              array_bars[j].style.height = randomHeights[j] + "px";
              array_bars[j + 1].style.height = randomHeights[j + 1] + "px";
            }

            //  revert the backgroundColor
            setTimeout(function () {
              array_bars[j].style.backgroundColor = DEFAULT;
              if (j + 1 == n - i - 1) {
                array_bars[j + 1].style.backgroundColor = SORTED_COLOR;
              } else {
                array_bars[j + 1].style.backgroundColor = DEFAULT;
              }
            }, Math.floor(time / 2));
          }, time * j);
        }
      }, time * n * i);
    }
  }

  return (
    <ul className="links">
      <li className="list-item">
        <button type="button" className="bubbleSort" onClick={bubbleSort}>
          Bubble Sort
        </button>
      </li>
      <li className="list-item">
        <button type="button" className="bubbleSort">
          Insertion Sort
        </button>
      </li>
      <li className="list-item">
        <button type="button" className="bubbleSort">
          Selection Sort
        </button>
      </li>
      <li className="list-item">
        <button type="button" className="bubbleSort">
          Merge Sort
        </button>
      </li>
      <li className="list-item">
        <button type="button" className="bubbleSort">
          Quick Sort
        </button>
      </li>
      <li className="list-item">
        <select id="speed-category" onChange={(e) => speedHandler(e)}>
          <option value="">Select Speed</option>
          <option value="very-slow">very slow</option>
          <option value="slow">slow</option>
          <option value="midium">Midium</option>
          <option value="fast">Fast</option>
        </select>
      </li>
    </ul>
  );
}

export default Navbar;
