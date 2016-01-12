var a = 1,
  b = { c : 1},
  d = [1,2,3];

var key = Symbol('foo');
var obj = {
  a,b,d,
  [key]: 2
};


var copy = Object.assign({}, obj);
console.log(obj);

obj.a = 2;
console.log(copy);

b.c = 2;
d.push(4);
console.log(copy);

// console.log(copy[key]);


//Inherit properties and non-enumerable properties cannot be copied
var obj = Object.create({ foo: 1 }, { // foo is an inherit property.
  bar: {
    value: 2  // bar is a non-enumerable property.
  },
  baz: {
    value: 3,
    enumerable: true  // baz is an own enumerable property.
  }
});

var copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }