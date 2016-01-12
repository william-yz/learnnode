//Function.prototype.bind(thisArg,[,arg1[,arg2,…]])

var obj = {
  name : 'William',
  say : function() {
    setTimeout(function() {
      console.log(this.name);
    }, 1000);
  }
};
obj.say();

/*var obj = {
  name : 'William',
  say : function() {
    var self = this;
    setTimeout(function() {
      console.log(self.name);
    }, 1000);
  }
};
obj.say();*/

/*var obj = {
  name : 'William',
  say : function() {
    setTimeout(function() {
      console.log(this.name);
    }.bind(this), 1000);
  }
};
obj.say();*/

/*function onclick(event) {
  console.log(this.name + event)
}
var a = {name : 'william'};

onclick.apply(a,['click']);
onclick.call(a,'click');

//a.onclick('click')
onclick.bind(a, 'click')();*/