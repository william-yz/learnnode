/*Given a binary tree, find its maximum depth.

The maximum depth is the 
number of nodes along the longest path from the root node down to the farthest leaf node.*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

 function TreeNode(val) {
      this.val = val;
      this.left = this.right = null;
  }
var maxDepth = function(root) {
    var max = 0;
    function _(node, curr) {
      if (!node) {
        return;
      }
      curr ++;
      if (curr > max) {
        max = curr;
      }
      if (node.left) {
        _(node.left, curr);
      }
      if (node.right) {
        _(node.right, curr);
      }
    }

    _(root, 0);
    return max;
};

var root = new TreeNode(3);
var node1 = new TreeNode(3);
var node2 = new TreeNode(3);
var node3 = new TreeNode(3);
var node4 = new TreeNode(3);
var node5 = new TreeNode(3);
var node6 = new TreeNode(3);

root.left = node1;
root.right = node2;
node1.left = node3;
node3.right = node4;
node6.right = node5;
node4.left = node6;
maxDepth(root)