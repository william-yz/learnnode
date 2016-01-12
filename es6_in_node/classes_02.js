'use strict';

class Circle {
    //constructor
    constructor(radius) {
        this._radius = radius;
        if (typeof Circle._count === 'undefined')
            Circle._count = 1;
        else 
            Circle._count ++;
    }

    //static method
    static draw(circle, canvas) {
        console.log('draw');
    }

    //getter setter
    static get circlesMade() {
       return !Circle._count ? 0 : Circle._count;
    }

    static set circlesMade(val) {
        console.log('Can not set value');
    }

    area() {
        return Math.pow(this.radius, 2) * Math.PI;
    }

    get radius() {
        return this._radius;
    }

    set radius(radius) {
        if (!Number.isInteger(radius))
            throw new Error("Circle radius must be an integer.");
        this._radius = radius;
    }
}

var circle1 = new Circle(10),
    circle2 = new Circle(20);

Circle.draw();

console.log('circle1 area : ' + circle1.area());
console.log('circle2 area : ' + circle2.area());

console.log('circlesMade : ' + Circle.circlesMade);

Circle.circlesMade = 10;
console.log('circlesMade : ' + Circle.circlesMade);

circle1.radius = 15;
console.log('circle1 area : ' + circle1.area());

try {
    circle1.radius = 'abc';
} catch (e) {
    console.log('error: ' + e.message);
}
