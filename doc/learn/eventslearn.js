/**
 * Created by william on 11/21/15.
 */

var EventEmitter = require('events').EventEmitter,
    util = require('util');

function MyEventEmitter() {
    EventEmitter.call(this);
}

util.inherits(MyEventEmitter, EventEmitter);

var listener = new MyEventEmitter();



listener.on('newListener', function() {
   console.log('new!!');
});
listener.on('click', function(){
    console.log('click!!!');
});