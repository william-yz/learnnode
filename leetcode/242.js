/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  var length = s.length,c = {};
  if (length !== t.length) {
    return false;
  }
  for (var i = 0; i < length; i++) {
    c[s[i]] = (c[s[i]] === undefined ? 0 : c[s[i]]) + 1;
  }
  for (var i = 0; i < length; i++) {
    if (c[t[i]] !== undefined&& c[t[i]] > 0) {
      c[t[i]] --;
    } else {
      return false;
    }
  }
  return true;
};

console.log(isAnagram('yangzheshitiancai','caitianshizheyang'));