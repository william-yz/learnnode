/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    function _(node) {
      if (node) {
        var left = node.left;
        node.left = node.right;
        node.right = left;
        if (node.left) {
          _(node.left);
        }
        if (node.right) {
          _(node.right);
        }
      }
    }
    
    _(root);
    return root;
};