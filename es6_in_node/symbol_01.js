'use strict';
var a = Symbol('a'),
  b = Symbol('a'),
  c = Symbol.for('a'),
  d = Symbol.for('a');

/*console.log(a === b);
console.log(a === c);
console.log(b === c);
console.log(d === c);*/

/*var obj = {
  [Symbol.for('hidden')] : 'hidden',
  [a] : 'hidden',
  a : 'show',
  x : 'show',
  y : 'show'
};

var key = Symbol.for('hidden');
console.log(obj[key]);

for (let key in obj) {
  console.log(key);
}
*/

var key = Symbol('circlesMade');
class Circle {
    constructor(radius) {
      this._radius = radius;
      if (typeof Circle[key] === 'undefined')
          Circle[key] = 1;
      else 
          Circle[key] ++;
    }

    static draw(circle, canvas) {
      console.log('draw');
    }

    static get circlesMade() {
     return !Circle[key] ? 0 : Circle[key];
    }

    static set circlesMade(val) {
      console.log('Can not set value');
    }

    area() {
      return Math.pow(this.radius, 2) * Math.PI;
    }

    get radius() {
      return this._radius;
    }

    set radius(radius) {
      if (!Number.isInteger(radius))
          throw new Error("Circle radius must be an integer.");
      this._radius = radius;
    }
}

module.exports = Circle;
