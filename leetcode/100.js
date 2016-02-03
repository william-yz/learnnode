/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    function _(n1, n2) {
      if (n1 !== null && n2 === null) {
        return false;
      }
      if (n1 === null && n2 !== null) {
        return false;
      }
      if (n1 === null && n2 === null) {
        return true;
      }
      return n1.val === n2.val && _(n1.left, n2.left) && _(n1.right, n2.right);
    }
    return _(p, q);
};
function TreeNode(val) {
      this.val = val;
      this.left = this.right = null;
  }
var root = new TreeNode(3);
var node1 = new TreeNode(2);
var node2 = new TreeNode(3);
var node3 = new TreeNode(5);
var node4 = new TreeNode(3);
var node5 = new TreeNode(8);
var node6 = new TreeNode(3);

root.left = node1;
root.right = node2;
node1.left = node3;
node3.right = node4;
node6.right = node5;
node4.left = node6;

var root2 = new TreeNode(3);
var node21 = new TreeNode(2);
var node22 = new TreeNode(3);
var node23 = new TreeNode(5);
var node24 = new TreeNode(3);
var node25 = new TreeNode(8);
var node26 = new TreeNode(3);

root2.left = node21;
root2.right = node22;
node21.left = node23;
node23.right = node24;
node26.right = node25;
node24.left = node26;

console.log(isSameTree(root2,root));