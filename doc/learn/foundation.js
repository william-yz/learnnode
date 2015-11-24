/**
 * Created by william on 11/21/15.
 */

// string boolean number null underfined

// array object function

// this in function

function Fruits(name) {

}

Fruits.prototype.getName = function() {
    console.log(this.name);
};
function Apple() {
    this.name = 'apple';
}
Apple.prototype = new Fruits();

var apple = new Apple();
Apple.ppp = 'A';

console.log(apple.ppp);
apple.getName();
