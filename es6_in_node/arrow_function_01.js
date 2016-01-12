var arr = [1,2,3];

arr.forEach( (i) => {console.log(i)});
arr.forEach( i => console.log(i));



var a = {
  name : 'william',
  func : function() {
    setTimeout(function() {
      console.log(this);
    }/*.bind(this)*/,1000);
  }
};

a.func();

var b = {
  name : 'william',
  func : function() {
    setTimeout(() => console.log(this),1000);
  }
};

b.func();