/**
 * @param {number} n
 * @return {number}
 */


var map = {

};
var climbStairs = function(n) {
  if (n == 1) return 1;
  if (n == 2) return 2;
  if (map[n] !== undefined) {
    return map[n];
  }
  var result = climbStairs(n-1) + climbStairs(n-2);
  map[n] = result;
  return result;
}; 
