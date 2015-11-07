var EventEmitter = require('events');

var listener = new EventEmitter();

listener.on('newListener',function(name){
	console.info('add ' + name);
}).
	on('removeListener',function(name){
		console.info('remove ' + name);
	});

listener.once('haha',function(arg){
	console.info(arg);
});
listener.on('haha',function(arg){
	console.info(arg);
});
listener.emit('haha','11');
listener.emit('haha','2');
console.info(listener);
//setMaxListeners  default max = 10; set to Infinity or 0 for unlimited