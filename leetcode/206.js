/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  var next = null,
    cursor = null;
  while (head) {
    next = head.next;
    head.next = cursor;
    cursor = head;
    head = next;
  }
  return cursor;
};