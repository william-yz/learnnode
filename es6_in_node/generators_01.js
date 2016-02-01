function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}
var gen = generator(10);
console.log(gen.next());
console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
console.log(gen.next());

function* idMaker(){
  var index = 0;
  while(true)
    yield index++;
}

var gen = idMaker();
console.log(gen.next().value); 
console.log(gen.next().value); 
console.log(gen.next().value); 
console.log(gen.next().value); 
console.log(gen.next().value); 

 console.log(gen.next());
