'use strict';

function Circle(radius) {
    this._radius = radius;
    if (typeof Circle._count === 'undefined')
        Circle._count = 1;
    else 
        Circle._count ++;
}

Circle.draw = function draw(circle, canvas) {
    console.log('draw');
}

Object.defineProperty(Circle, 'circlesMade', {
    get : function() {
        return !Circle._count ? 0 : Circle._count;
    },
    set : function() {
        console.log('Can not set value');
    }
});

Circle.prototype = {
    area : function area() {
        return Math.pow(this.radius, 2) * Math.PI;
    }
};

Object.defineProperty(Circle.prototype, "radius", {
    get: function() {
        return this._radius;
    },

    set: function(radius) {
        if (!Number.isInteger(radius))
            throw new Error("Circle radius must be an integer.");
        this._radius = radius;
    }
});

var circle1 = new Circle(10),
    circle2 = new Circle(20);

Circle.draw();  //'draw'

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
