var arr = [1, 2, 3, 4, 5];


//Array.isArray(element)

//.indexOf(element) / .lastIndexOf(element)

//.forEach(element,index,array)

//.every(function(element,index,array)) / .some(function(element,index,array))
console.log(arr.every(function(i) {
  return Number.isInteger(i);
}));
console.log(arr.every(function(i) {
  return i % 2 === 0;
}));

console.log(arr.some(function(i) {
  return i > 5;
}));

console.log(arr.some(function(i) {
  return i % 2 === 0;
}));

//.map(function(element))
/*var newArr = arr.map(function(i) {
  return i * 2;
});
console.log(newArr);*/

//.filter(function(element))
/*newArr = arr.filter(function(i) {
  return i % 2 === 0;
});
console.log(newArr);*/

//.reduce(function(v1,v2),value) / .reduceRight(function(v1,v2),value)
/*var sum = arr.reduce(function(v1, v2) {
  return v1 + v2;
});
console.log(sum);*/