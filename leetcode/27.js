/**
 * @constructor
 */
var Queue = function() {
  this.length = 0;
  this.top = null;
  this.tail = null;
};

function Node(val) {
  this.val = val;
  this.next = null;
}
/**
 * @param {number} x
 * @returns {void}
 */
Queue.prototype.push = function(x) {
  if (this.top === null) {
    this.top = new Node(x);
    this.tail = this.top;
  } else {
    var newNode = new Node(x);
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this.length ++;
};

/**
 * @returns {void}
 */
Queue.prototype.pop = function() {
  var v = this.top.val;
  this.top = this.top.next;
  this.length --;
  return v;
};

/**
 * @returns {number}
 */
Queue.prototype.peek = function() {
  return this.top.val;
};

/**
 * @returns {boolean}
 */
Queue.prototype.empty = function() {
  return this.length === 0;
};

