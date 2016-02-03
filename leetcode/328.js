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
var oddEvenList = function(head) {
  if (head === null) {
    return head;
  }
  var o = head,
      e = head.next;
  s = e;
  while(true) {
    if (o !== null && e!== null) {
      o.next = e.next;
      if (o.next !== null)
        o = o.next;
    }
    if (e !== null) {
      e.next = o.next;
      if (e.next !== null)
        e = e.next;
    }
    if (o.next === null || e.next === null) {
      break;
    }
  }
  o.next = s;
  return head;
};