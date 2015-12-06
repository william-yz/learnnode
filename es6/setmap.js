"use strict"
var set = new Set();

[1,2,2,3,4,4,5].forEach(function(x) {
    set.add(x);
});



// [1,2,2,3,4,4,5].forEach(x => set.add(x));

// set.size; set.delete(value); set.has(value); set.clear(); 

console.log(set);
var map = new Map();

//map.size; map.set(key, value); map.get(key); map.has(key); map.delete(key); map.clear();
var key1 = {a : 1};
var value = 'a1';
map.set(key1, value);

var key2 = {a : 1};
map.set(key2, value);

var key3 = key2;
map.set(key3, value);
console.log(map);