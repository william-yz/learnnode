// var Circle = require('./classes_02');
const Circle = require('./symbol_01');

Circle = 'a';

var circle1 = new Circle(10),
    circle2 = new Circle(20);


console.log(Circle.circlesMade);
Circle.circlesMade = 100;
console.log(Circle.circlesMade);
Circle._count = 100;
console.log(Circle.circlesMade);
