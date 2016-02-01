var str1 = `string text`;
console.log(str1);

var str2 = `string text line 1
 string text line 2`
console.log(str2);

var expression = {a : 10000+10000+1000};
var str3 = `string text ${expression.a} string text`
console.log(str3);



var a = 5;
var b = 10;

function tag(strings, ...values) {
  console.log(strings[0]); // "Hello "
  console.log(strings[1]); // " world "
  console.log(values[0]);  // 15
  console.log(values[1]);  // 50

  return "Bazinga!";
}

console.log(tag`Hello world `);
