/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  var map = {
    M : 1000,
    D : 500,
    C : 100,
    L : 50,
    X : 10,
    V : 5,
    I : 1
  };
  var result = 0,
    max = 1;
  for (var i = s.length - 1; i > -1; i --) {
    var cur = map[s[i]];
    if (cur < max) {
      result -= cur;
    } else if (cur > max) {
      max = cur;
      result += cur;
    } else {
      result += cur;
    }
  }
  console.log(result);
  return result;
};

romanToInt('DCXXI')