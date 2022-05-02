// // bubble sorte

// export function getBubbleSortAnimation(randomArray) {
//   var animation = [];
//   getBubbleSort(randomArray, animation);
//   return animation;
// }

// function getBubbleSort(randomArray, animation) {
//   var n = randomArray.length;
//   for (var i = 0; i < n; i++) {
//     for (var j = 0; j < n - i; j++) {
//       if (randomArray[j + 1] < randomArray[j]) {
//         // These are the value that we are comparing;
//         // to change their color
//         animation.push([j, j+1]);

//         // These are the value that we are comparint;
//         // to revert their color
//         animation.push([j, j+1]);
//         swap(j, j + 1, randomArray);

//         animation.push([j , j+1])
//       }
//     }
//   }
// }

// // swapping
// function swap(i, j, arr) {
//   var temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// }
