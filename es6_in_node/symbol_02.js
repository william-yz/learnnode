// var Circle = require('./classes_02');
var Circle = require('./symbol_01');



var circle1 = new Circle(10),
    circle2 = new Circle(20);


console.log(Circle.circlesMade);
Circle.circlesMade = 100;
console.log(Circle.circlesMade);
Circle._count = 100;
console.log(Circle.circlesMade);
