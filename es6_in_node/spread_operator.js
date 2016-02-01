'use strict';
var arr1 = [0,1,2];
var arr2 = [-1, ...arr1, 3, 4];

console.log(arr2);

var arr1 = [0,1,2],
  arr2 = [3,4,5];

// arr1 = arr1.concat(arr2);
// Array.prototype.push.apply(arr1, arr2);
arr1.push(...arr2);

console.log(arr1);


function func1(...args) {
  console.log(args);
  console.log(arguments);
}

func1(1,2,3,4);

function func2(x,y,z) {
  console.log(x);
  console.log(y);
  console.log(z);
}

func2(...[1,2]);