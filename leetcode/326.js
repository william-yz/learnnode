/**
 * @param {number} n
 * @return {boolean}
 */

var map = {};
var isPowerOfThree = function(n) {
  if (n === 0) return false;
  while(n % 3 === 0) {
    if (map[n] !== undefined) {
      return map[n];
    }
    n /= 3;
  }
  var result = n === 1;
  map[n] = result;
  return n === 1;
};