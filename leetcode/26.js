/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  var count = 0,pre;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== pre) {
      nums[count] = nums[i];
      count ++;
      pre = nums[i];
    }
  }
  return count;
};

var nums = [1,2,2,2,3,4,5,5,6];

removeDuplicates(nums);
console.log(nums);