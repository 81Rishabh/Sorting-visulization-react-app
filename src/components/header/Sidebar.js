import React, { useState } from "react";

function Navbar({ randomHeights }) {
  const COMPARSION_COLOR = "blue";
  const SORTED_COLOR = "lightgreen";
  const DEFAULT = "lightblue";
  const CURRENT = "yellow"
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
      default: {
        setTime(1);
      }
    }
  }


  function addStyle(e) {
    e.target.style.cursor = "wait"
    e.target.disabled = true;
    e.target.style.backgroundColor = "#5e34f6";
    e.target.style.color = "#fff";
  }
    
  function removeStyle(e) {
    e.target.disabled = false;
    e.target.style.cursor = "pointer"
    e.target.style.backgroundColor = "#fff";
    e.target.style.color = "#a84de9";

    const buttons = document.querySelectorAll('.list-item button');
    Array.from(buttons).filter(btn => e.target !== btn).forEach(btn => {
      btn.setAttribute('disabled' , false);
      btn.style.cursor = 'pointer';
      btn.style.opacity = '1';
    });
  }

  //  bubble Sort
  function bubbleSort(e) {
    disableButtons(e.target);
    const n = randomHeights.length;
    const array_bars = document.querySelectorAll(".bars");
    addStyle(e);
   

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
              if (j + 1 === n - i - 1) {
                array_bars[j + 1].style.backgroundColor = SORTED_COLOR;
              } else {
                array_bars[j + 1].style.backgroundColor = DEFAULT;
              }
            }, Math.floor(time / 2));
          }, time * j);
        }
        
        
        if (i === n - 2) {
          removeStyle(e);
        }
      }, time * n * i);
    }
  }

  //  insertionSort
  function insertionSort(e) {
    disableButtons(e.target);
    const n = randomHeights.length;
    const array_bars = document.querySelectorAll(".bars");
    addStyle(e);
   

    for (let i = 1; i < n; i++) {
      setTimeout(function () {
        var temp = randomHeights[i];
        array_bars[i].style.backgroundColor = "blue";

        for (let j = i - 1, k = 0; j >= 0; j--, k++) {
          setTimeout(function () {
            if (randomHeights[j] > temp) {

              // swaping heights between this bars
              randomHeights[j + 1] = randomHeights[j];
              array_bars[j + 1].style.height = randomHeights[j] + "px";
              randomHeights[j] = temp;
              array_bars[j].style.backgroundColor = "rgb(252, 78, 78)";
              array_bars[j].style.height = temp + "px";
            }
            // set background after comparing and swaping heights
            setTimeout(function () {
              array_bars[j].style.backgroundColor = SORTED_COLOR;
            }, Math.floor(time / 2));

          }, Math.floor(time / 2) * k);
        }

        setTimeout(function () {
          array_bars[i].style.backgroundColor = DEFAULT;
        }, time);

        // check is array is sorted
        if (i === n - 2) { removeStyle(e) }
        
      }, time * i - 1);
    }
  }

  // selection sort
  function selectionSort(e) {
    disableButtons(e.target);
    const n = randomHeights.length;
    const array_bars = document.querySelectorAll(".bars");

    addStyle(e);
   
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        let minimum = i;
        array_bars[i].style.backgroundColor = CURRENT;

        for (let j = i + 1; j < n; j++) {
          setTimeout(() => {
            array_bars[j].style.backgroundColor = COMPARSION_COLOR;
            
            if (randomHeights[minimum] > randomHeights[j]) {
              minimum = j;
              array_bars[j].style.backgroundColor = SORTED_COLOR;
            }

            // swaping valus
            setTimeout(() => {
              array_bars[j].style.backgroundColor = DEFAULT;
            }, time / 2);
          }, (j * time));
        }

        setTimeout(() => {
          //  swap values 
          let temp = randomHeights[minimum];
          randomHeights[minimum] = randomHeights[i];
          randomHeights[i] = temp;

          // swap the heights
          array_bars[i].style.height = randomHeights[i] + "px";
          array_bars[minimum].style.height = randomHeights[minimum] + "px";
          array_bars[i].style.backgroundColor = SORTED_COLOR;
        }, time * n);

        // check is array is sorted
        if (i === n - 2) { removeStyle(e) }
      }, i * time * n);
    }
  }


  // merge sort
  function mergeSort(e) {
    disableButtons(e.target);
    const n = randomHeights.length;
    const array_bars = document.querySelectorAll(".bars");
    const animations = [];
    mergeSortHelper(randomHeights, 0, n - 1, animations);
    

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [oneIdx, twoIdx] = animations[i];
        const oneIdxStyle = array_bars[oneIdx].style;
        const twoIdxStyle = array_bars[twoIdx].style;
        const color = i % 3 !== 0 ? SORTED_COLOR : DEFAULT;

        setTimeout(function () {
          oneIdxStyle.backgroundColor = color;
          twoIdxStyle.backgroundColor = color;
        }, i * time)
      }
      else {
        setTimeout(function () {
          const [barIdx, barHeight] = animations[i];
          const barOneStyle = array_bars[barIdx].style;
          barOneStyle.height = barHeight + 'px';
        }, i * time)
      }
    }

  }

  function mergeSortHelper(arr, low, high, animations) {
    if (low >= high) return;

    // calculate mid index
    let mid = Math.floor((low + high) / 2);

    // solve for left to mid
    mergeSortHelper(arr, low, mid, animations);

    // solve for mid to high
    mergeSortHelper(arr, mid + 1, high, animations);

    // merge array
    merge(arr, low, mid, high, animations);
  }

  function merge(arr, low, mid, high, animations) {
    var i = low;
    var j = mid + 1;
    var k = i;

    // auxillary arr for storing sorted element
    var ans = [];
    while (i <= mid && j <= high) {
      // These are the value that we are comparint;
      // to change their color
      animations.push([i, j]);

      // These are the value that we are comparint;
      // to revert their color
      animations.push([i, j]);
      if (arr[i] < arr[j]) {

        // we overwrite the value of index k in original array with the
        // value at index i in the auxillary array
        animations.push([k, arr[i]]);
        ans[k++] = arr[i++];
      } else {

        // we overwrite the value of index k in original array with the
        // value at index i in the auxillary array
        animations.push([k, arr[j]]);
        ans[k++] = arr[j++];
      }
    }

    //    if first half arr has an elements
    while (i <= mid) {
      // These are the value that we are comparint;
      // to change their color
      animations.push([i, i]);

      // These are the value that we are comparint;
      // to revert their color
      animations.push([i, i]);

      // we overwrite the value of index k in original array with the
      // value at index i in the auxillary array
      animations.push([k, arr[i]]);
      ans[k++] = arr[i++];
    }

    // if second  half arr has an elements
    while (j <= high) {
      // These are the value that we are comparint;
      // to change their color
      animations.push([j, j]);

      // These are the value that we are comparint;
      // to revert their color
      animations.push([j, j]);

      // we overwrite the value of index k in original array with the
      // value at index i in the auxillary array
      animations.push([k, arr[j]]);
      ans[k++] = arr[j++];
    }

    //  coping Array element form auxillary arr to original array
    for (let k = low; k <= high; k++) {
      arr[k] = ans[k];
    }
  }

  // get the buttons
  function disableButtons(button) {
    const buttons = document.querySelectorAll('.list-item button');
    Array.from(buttons).filter(btn => button !== btn).forEach(btn => {
      btn.setAttribute('disabled' , true);
      btn.style.cursor = 'not-allowed';
      btn.style.opacity = '.7';
    });
  }



  return (
    <ul className="links">
      <li className="list-item">
        <button type="button" className="bubbleSort" onClick={bubbleSort}>
          Bubble Sort
        </button>
      </li>
      <li className="list-item">
        <button type="button" className="InsertionSort" onClick={insertionSort}>
          Insertion Sort
        </button>
      </li>
      <li className="list-item">
        <button type="button" className="SelectionSort" onClick={selectionSort}>
          Selection Sort
        </button>
      </li>
      <li className="list-item">
        <button type="button" className="mergeSort" onClick={mergeSort}>
          Merge Sort
        </button>
      </li>
      <li className="list-item">
        <select id="speed-category" onChange={(e) => speedHandler(e)}>
          <option value="">Select Speed</option>
          <option value="default">Default</option>
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
