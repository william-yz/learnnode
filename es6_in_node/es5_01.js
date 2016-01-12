//Object.create(proto, decorator)

var o = Object.create({
  say: function () {
      console.log('my name is ' +this.name);
  },
  type : 'human'
},{
  'name': {
    value : 'William',
    writable : true,
    enumerable : true,
    configurable : true
  },
  'age': {
    enumerable : true,
    configurable : true,
    get : function() {
      return this._age + 1;
    },
    set : function(value) {
      if (Number.isInteger(value)) {
        this._age = value
      }
    }
  }
});


console.log(o);
console.log(o.__proto__);
o.say();

o.age = 10;
console.log(o.age);

/*Object.defineProperty(o, 'sex', {
  value : 'M',
  writable : false,
  enumerable : true,
  configurable : false
});

o.sex = 'F';
console.log(o.sex);
delete o.sex;
console.log(o.sex);*/

// console.log(Object.keys(o));

/*Object.preventExtensions(o);
console.log(Object.isExtensible(o));
o.home = 'xxx';
console.log(o.home);*/

//Object.seal(o) / Object.isSealed

//Object.freeze(O) / Object.isFrozen