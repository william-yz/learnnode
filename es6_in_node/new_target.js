'use strict';
class A {
  constructor() {
    console.log(new.target.name);
  }
}

class B extends A { constructor() { super(); } }

var a = new A(); // logs "A"
var b = new B(); // logs "B"

function C() {
  console.log(new.target);
}

var c = new C();
C();