/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  var min = p.val < q.val && p.val || q.val,
      max = p.val > q.val && p.val || q.val;
  while (true) {
    if (root.val < min) {
      root = root.right;
    } else if (root.val > max) {
      root = root.left;
    } else {
      return root;
    }
  }
};