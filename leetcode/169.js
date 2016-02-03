/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  var l = nums.length,
      i = 0,
      count = 0,
      n;
  for (; i < l; i ++) {
    if (count === 0) {
      n = nums[i];
      count ++;
    } else if (n === nums[i]) {
      count ++;
    } else {
      count --;
    }
  }
  return n;
};