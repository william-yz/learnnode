'use strict';

//for of
/*var arr = [1, 'a' , 2];
for (var val of arr) {
  console.log(val);
}*/


/*var str = 'abcde';
for (var val of str) {
  console.log(val);
}*/




/*var set = new Set([4,1,2,3]);
set.add(2);
for (var val of set) {
  console.log(val);
}
*/

/*
var map = new Map();
map.set('a', 1);
map.set('b', 'b');

for (var val of map) {
  console.log(val);
}
*/


/*function* generator(n) {
  for (var i = 0; i < n; i ++) {
    yield i;
  }
}

var gen = generator(10);

for (var val of gen) {
  console.log(val);
}
console.log(gen[Symbol.iterator]);*/




var myiterator = {
  datas : [{
    name : 'william',
    sex : 'M'
  },{
    name : 'young',
    sex : 'M'
  }],
  index : -1,
  [Symbol.iterator] : function() {
    return this;
  },
  next : function() {
    this.index ++ ;
    return {done : this.index === this.datas.length, value : this.datas[this.index]};
  }
};

console.log(Array.prototype[Symbol.iterator])
for (var data of myiterator.datas ) {
  console.log(data);
}