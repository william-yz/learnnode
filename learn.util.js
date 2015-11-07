
var util = require('util');

console.info(util.format('%s  hhhh %s','aaa','bbb','ccc'));
console.info(util.format('%d  hhhh %s',111,'bbb','ccc'));
console.info(util.format('%j  hhhh %s','"aaa":"bbb"','bbb','ccc'));


var o = {a : 'abc',b : 2, c : {bcd : 'aaa'}, d : [123,23]};
console.log(util.inspect(o));

console.info(util.isNullOrUndefined(null));


function Parent() {
	this.a = 1;
	this.b = 2;
}

Parent.prototype.f1 = function() {
	console.info(this.a);
}

function Child(a , b) {
	Parent.call(this);
	this.a = a;
}

//Child.prototype = new Parent();
util.inherits(Child,Parent);


var child = new Child(100);
child.f1();