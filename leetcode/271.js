/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  var c = {};
  for (var i = 0; i < nums.length; i++) {
    if (c[nums[i]] === undefined) {
      c[nums[i]] = null;
    } else {
      return true;
    }
  }
  return false;
};