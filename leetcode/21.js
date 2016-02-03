/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  var head = l1.val < l2.val ? l1 : l2;
  var nonHead = l1.val < l2.val ? l2 : l1;
  head.next = mergeTwoLists(head.next, nonHead);

  return head;
};