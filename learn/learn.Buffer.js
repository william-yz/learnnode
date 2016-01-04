var assert = require('assert');
// Buffer class is a global

//new Buffer(str[,encoding]); encoding : defaults to 'utf8'
var strBuffer = new Buffer('buffer');


var arrBuffer = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);


assert.deepEqual(strBuffer,arrBuffer);
assert.strictEqual(arrBuffer.toString(),'buffer');
assert(strBuffer.equals(arrBuffer));
assert.equal(strBuffer.compare(arrBuffer),0);
assert(Buffer.isEncoding('utf8'));

assert(!Buffer.isBuffer({}));
assert(Buffer.isBuffer(strBuffer));
var source = new Buffer('!!'),
	target = new Buffer('target');
//copy(targetBuffer[, targetStart(0)][, sourceStart(0)][, sourceEnd(source.length)])
source.copy(target);
assert.strictEqual(target.toString(),'!!rget');

source.copy(target,target.length-1);
assert.strictEqual(target.toString(),'!!rge!');

