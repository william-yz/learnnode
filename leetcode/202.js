/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  var sum = 0;
  while(n > 0) {
    var nn = n % 10;
    sum += nn * nn;
    n = parseInt(n / 10);
  }
  if (sum > 9) {
    return isHappy(sum);
  }
  if (sum === 1) {
    return true;
  } 
  return false;
};

console.log(isHappy(68));