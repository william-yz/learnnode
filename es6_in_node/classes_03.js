'use strict';


/*function Animal(name) {
  this.name = name;
}
Animal.prototype = {
  showName : function() {
    console.log('Its name is ' + this.name);
  },
  speak : function() {
    console.log(this.name + ' makes a noise.');
  }
}

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = new Animal();
Dog.prototype.speak = function() {
  console.log(this.name + ' makes a barks.');
}*/


/*class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  showName () {
    console.log('Its name is ' + this.name);
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}*/




var animal = {
  showName() {
    console.log('Its name is ' + this.name);
  },
  speak() {
    console.log(this.name + ' makes a noise.');
  }
};
var name = 'Diandian';
var speak = function() {
    console.log(this.name + ' makes a barks.')
  };
var dog = {
  __proto__ : animal,
  name,
  speak
}

var dog = new Dog('Diandian');


dog.showName();
dog.speak();