/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {
  var n = 0;
  for (var i = 0; i < s.length; i++) {
    n = (s.charCodeAt(i) - 64) + n * 26;
  }
  return n;
};